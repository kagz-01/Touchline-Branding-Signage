import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { getSupabaseAdmin } from '@/lib/supabase';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const schema = z.object({
  type: z.enum(['quote', 'delivery_note', 'invoice', 'general']),
  title: z.string().min(3).max(120),
  description: z.string().min(10).max(2000),
  priority: z.enum(['low', 'normal', 'high', 'urgent']).default('normal'),
  division: z.enum(['branding', 'signage', 'hub']).default('hub'),
});

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ error: 'DB unavailable' }, { status: 503 });

  const { searchParams } = new URL(req.url);
  const status = searchParams.get('status');
  const type   = searchParams.get('type');

  let query = supabase
    .from('client_requests')
    .select('*')
    .eq('client_email', session.user.email)
    .order('created_at', { ascending: false });

  if (status) query = query.eq('status', status);
  if (type)   query = query.eq('type', type);

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ requests: data ?? [] });
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 422 });

  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ error: 'DB unavailable' }, { status: 503 });

  // Generate reference number
  const prefix = parsed.data.type === 'quote' ? 'QT' : parsed.data.type === 'invoice' ? 'INV' : parsed.data.type === 'delivery_note' ? 'DN' : 'REQ';
  const ref = `${prefix}-${Date.now().toString(36).toUpperCase()}`;

  // Insert into client_requests (client-facing table)
  const { data: inserted, error } = await supabase
    .from('client_requests')
    .insert({
      client_email: session.user.email,
      client_name:  session.user.name ?? '',
      type:         parsed.data.type,
      title:        parsed.data.title,
      description:  parsed.data.description,
      priority:     parsed.data.priority,
      division:     parsed.data.division,
      reference_number: ref,
      status:       'pending',
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Mirror into requests table so it appears in admin TouchDesk
  await supabase.from('requests').insert({
    company_id:   null,
    source:       'client_portal',
    contact_name: session.user.name ?? '',
    company_name: '',
    email:        session.user.email,
    phone:        '',
    product:      parsed.data.title,
    quantity:     '',
    message:      `[${parsed.data.type.toUpperCase()}] ${parsed.data.description}`,
    division:     parsed.data.division === 'hub' ? 'branding' : parsed.data.division,
    status:       'new',
    quote_id:     ref,
  });

  return NextResponse.json({ ok: true, request: inserted }, { status: 201 });
}

