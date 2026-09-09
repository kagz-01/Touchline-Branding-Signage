import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getSupabaseAdmin } from '@/lib/supabase';
import nodemailer from 'nodemailer';

// ── Zod schema — single source of truth for validation ──────────────────────
const LeadSchema = z.object({
  brand: z.enum(['branding', 'signage']),
  fullName: z.string().min(2, 'Name must be at least 2 characters').max(100),
  phone: z.string().regex(/^\+?[0-9()\-\s]{7,20}$/, 'Please enter a valid phone number'),
  email: z.string().email('Please enter a valid email address').optional().or(z.literal('')),
  service: z.string().max(100).optional(),
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
    from: process.env.EMAIL_FROM ?? '"Touchline Website" <no-reply@touchline.co.ke>',
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

  // 6. Store in Supabase (if configured)
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    // Supabase not configured yet — log and return success so dev flow is testable
    console.warn('[leads] Supabase not configured — logging lead instead of storing:', body);
    recentSubmissions.set(ip, Date.now());
    // Still try to send email even without Supabase
    sendLeadEmail(body).catch((err) => console.error('[leads] Email failed:', err));
    return NextResponse.json({ ok: true, stored: false });
  }

  const { error } = await supabase.from('leads').insert({
    brand: body.brand,
    full_name: body.fullName.trim(),
    phone: body.phone.trim(),
    email: body.email?.trim() || null,
    service: body.service || null,
    preferred_date: body.preferredDate || null,
    location: body.location || null,
    message: body.message || null,
  });

  if (error) {
    console.error('[leads] Supabase insert failed:', error.message);
    return NextResponse.json(
      { error: 'Could not save your request. Please try again.' },
      { status: 500 }
    );
  }

  // 7. Send email notification (non-blocking — don't fail the response if email fails)
  sendLeadEmail(body).catch((err) => console.error('[leads] Email failed:', err));

  recentSubmissions.set(ip, Date.now());
  return NextResponse.json({ ok: true, stored: true });
}
