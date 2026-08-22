import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';

type LeadPayload = {
  brand: 'branding' | 'signage';
  fullName: string;
  phone: string;
  email?: string;
  service?: string;
  preferredDate?: string;
  location?: string;
  message?: string;
  // Spam defenses (both invisible to real visitors \u2014 see components/BookingForm.tsx):
  website?: string; // honeypot field; bots tend to fill every input, humans never see this one
  renderedAt?: number; // ms timestamp when the form mounted; a real human can't submit in <2s
};

const PHONE_RE = /^\+?[0-9()\-\s]{7,20}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_FILL_TIME_MS = 2000;

// Simple in-memory rate limit \u2014 fine for a single serverless region's warm
// instances; swap for Upstash/Redis if you need it to hold across cold starts
// or multiple regions.
const recentSubmissions = new Map<string, number>();
const RATE_LIMIT_WINDOW_MS = 60_000;

function getClientIp(req: NextRequest) {
  return req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
}

export async function POST(req: NextRequest) {
  let body: LeadPayload;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  // Honeypot: any real visitor leaves this empty since it's hidden via CSS,
  // not just an unlabeled field a screen reader would announce.
  if (body.website) {
    // Pretend success so the bot doesn't learn its submission was rejected.
    return NextResponse.json({ ok: true, stored: false });
  }

  // Fast-fill check: real humans take more than ~2 seconds to fill this out.
  if (body.renderedAt && Date.now() - body.renderedAt < MIN_FILL_TIME_MS) {
    return NextResponse.json({ ok: true, stored: false });
  }

  const ip = getClientIp(req);
  const lastSubmission = recentSubmissions.get(ip);
  if (lastSubmission && Date.now() - lastSubmission < RATE_LIMIT_WINDOW_MS) {
    return NextResponse.json(
      { error: 'Please wait a moment before submitting again.' },
      { status: 429 }
    );
  }

  if (!body.fullName?.trim() || !body.phone?.trim()) {
    return NextResponse.json({ error: 'Name and phone number are required.' }, { status: 400 });
  }
  if (!PHONE_RE.test(body.phone.trim())) {
    return NextResponse.json({ error: 'Please enter a valid phone number.' }, { status: 400 });
  }
  if (body.email && !EMAIL_RE.test(body.email.trim())) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
  }
  if (body.brand !== 'branding' && body.brand !== 'signage') {
    return NextResponse.json({ error: 'Missing or invalid brand.' }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();

  if (!supabase) {
    // Supabase isn't configured yet. Don't fail the visitor's request in dev/demo \u2014
    // log it server-side and return success so the flow is testable end-to-end.
    console.warn('[leads] Supabase not configured \u2014 logging lead instead of storing it:', body);
    recentSubmissions.set(ip, Date.now());
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
    message: body.message || null
  });

  if (error) {
    console.error('[leads] Supabase insert failed:', error.message);
    return NextResponse.json({ error: 'Could not save your request. Please try again.' }, { status: 500 });
  }

  recentSubmissions.set(ip, Date.now());
  return NextResponse.json({ ok: true, stored: true });
}
