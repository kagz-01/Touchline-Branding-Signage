import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getSupabaseAdmin } from '@/lib/supabase';
import nodemailer from 'nodemailer';

// ── Zod schema — single source of truth for validation ──────────────────────
const LeadSchema = z.object({
  brand: z.enum(['branding', 'signage', 'hub']),
  fullName: z.string().min(2, 'Name must be at least 2 characters').max(100),
  companyName: z.string().max(100).optional(),
  phone: z.string().regex(/^\+?[0-9()\-\s]{7,20}$/, 'Please enter a valid phone number'),
  email: z.string().email('Please enter a valid email address').optional().or(z.literal('')),
  service: z.string().max(100).optional(),
  quantity: z.string().max(100).optional(),
  preferredDate: z.string().optional(),
  location: z.string().max(200).optional(),
  message: z.string().max(2000).optional(),
  // Spam defenses (invisible to real visitors):
  website: z.string().optional(), // honeypot — bots fill every field; humans never see this
  renderedAt: z.number().optional(), // ms timestamp — real humans can't submit in < 2s
});

type LeadPayload = z.infer<typeof LeadSchema>;

const MIN_FILL_TIME_MS = 2000;

// In-memory rate limit — fine for a single serverless region's warm instances.
// Swap for Upstash/Redis if you need it to hold across cold starts or regions.
const recentSubmissions = new Map<string, number>();
const RATE_LIMIT_WINDOW_MS = 60_000;

function getClientIp(req: NextRequest) {
  return req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
}

async function sendLeadEmail(body: LeadPayload) {
  const host = process.env.EMAIL_SERVER_HOST;
  const user = process.env.EMAIL_SERVER_USER;
  const pass = process.env.EMAIL_SERVER_PASSWORD;

  if (!host || !user || !pass) return; // email not configured — skip silently

  const transporter = nodemailer.createTransport({
    host,
    port: Number(process.env.EMAIL_SERVER_PORT) || 587,
    auth: { user, pass },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_FROM ?? '"Touchline Website" <no-reply@touchlineltd.co.ke>',
    to: process.env.ADMIN_EMAILS?.split(',')[0] ?? user,
    subject: `New Lead: ${body.brand.toUpperCase()} — ${body.fullName}`,
    text: [
      `A new lead was submitted on the ${body.brand} website.`,
      '',
      `Name:           ${body.fullName}`,
      `Phone:          ${body.phone}`,
      `Email:          ${body.email || 'N/A'}`,
      `Service:        ${body.service || 'N/A'}`,
      `Preferred date: ${body.preferredDate || 'N/A'}`,
      `Location:       ${body.location || 'N/A'}`,
      '',
      'Message:',
      body.message || 'N/A',
    ].join('\n'),
  });
}

export async function POST(req: NextRequest) {
  // 1. Parse JSON
  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  // 2. Validate with Zod
  const parsed = LeadSchema.safeParse(raw);
  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message ?? 'Validation failed.';
    return NextResponse.json({ error: firstError }, { status: 400 });
  }
  const body = parsed.data;

  // 3. Honeypot — return fake success so bots don't learn they were rejected
  if (body.website) {
    return NextResponse.json({ ok: true, stored: false });
  }

  // 4. Fast-fill check — real humans take more than ~2 seconds
  if (body.renderedAt && Date.now() - body.renderedAt < MIN_FILL_TIME_MS) {
    return NextResponse.json({ ok: true, stored: false });
  }

  // 5. Per-IP rate limit
  const ip = getClientIp(req);
  const lastSubmission = recentSubmissions.get(ip);
  if (lastSubmission && Date.now() - lastSubmission < RATE_LIMIT_WINDOW_MS) {
    return NextResponse.json(
      { error: 'Please wait a moment before submitting again.' },
      { status: 429 }
    );
  }

  // 6. Store directly in TouchDesk (`requests` table in Supabase)
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    // Supabase not configured yet — log and return success so dev flow is testable
    console.warn('[leads] Supabase not configured — logging lead instead of storing:', body);
    recentSubmissions.set(ip, Date.now());
    // Still try to send email even without Supabase
    sendLeadEmail(body).catch((err) => console.error('[leads] Email failed:', err));
    return NextResponse.json({ ok: true, stored: false });
  }

  // Resolve active TouchDesk company id
  let companyId = '95a364bb-e3d2-40c0-8e23-91211320a848';
  try {
    const { data: comp } = await supabase.from('companies').select('id').limit(1);
    if (comp && comp[0]?.id) companyId = comp[0].id;
  } catch {
    // Keep fallback
  }

  // Determine division
  let division: 'branding' | 'signage' = 'branding';
  if (body.brand === 'signage') {
    division = 'signage';
  } else if (body.brand === 'branding') {
    division = 'branding';
  } else {
    // If submitted on the Hub, inspect service keywords to assign division
    const lowerService = (body.service || '').toLowerCase();
    if (
      lowerService.includes('sign') ||
      lowerService.includes('led') ||
      lowerService.includes('wrap') ||
      lowerService.includes('acrylic') ||
      lowerService.includes('pylon') ||
      lowerService.includes('neon')
    ) {
      division = 'signage';
    } else {
      division = 'branding';
    }
  }

  const requestId = crypto.randomUUID();
  const productLabel = body.service
    ? `${body.service}${body.quantity ? ` · ${body.quantity}` : ''}`
    : 'General Quotation Request';

  const messageParts = [
    body.message?.trim(),
    body.location ? `Delivery/Site Location: ${body.location.trim()}` : null,
    body.brand === 'hub' ? 'Submitted via: Touchline Hub (touchlineltd.co.ke)' : null,
  ].filter(Boolean);

  const { error: requestError } = await supabase.from('requests').insert({
    id: requestId,
    company_id: companyId,
    source: 'website',
    contact_name: body.fullName.trim(),
    company_name: body.companyName?.trim() || body.fullName.trim(),
    phone: body.phone.trim(),
    email: body.email?.trim() || '',
    product: productLabel,
    quantity: body.quantity || '',
    deadline: body.preferredDate || '',
    message: messageParts.join('\n\n'),
    division,
    status: 'new',
  });

  if (requestError) {
    console.error('[leads] TouchDesk requests insert failed:', requestError.message);
    return NextResponse.json(
      { error: 'Could not save your request. Please try again.' },
      { status: 500 }
    );
  }

  // Attempt sync to legacy leads table if present
  try {
    await supabase.from('leads').insert({
      id: requestId,
      brand: division,
      full_name: body.fullName.trim(),
      phone: body.phone.trim(),
      email: body.email?.trim() || null,
      service: body.service || null,
      preferred_date: body.preferredDate || null,
      location: body.location || null,
      message: messageParts.join('\n\n') || null,
      status: 'new',
    });
  } catch {
    // Non-fatal if legacy leads table is absent
  }

  // 7. Send email notification (non-blocking — don't fail the response if email fails)
  sendLeadEmail(body).catch((err) => console.error('[leads] Email failed:', err));

  recentSubmissions.set(ip, Date.now());
  return NextResponse.json({ ok: true, stored: true, id: requestId });
}
