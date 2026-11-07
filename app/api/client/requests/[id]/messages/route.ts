import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { getSupabaseAdmin } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { content } = await req.json().catch(() => ({}));
  if (!content?.trim()) return NextResponse.json({ error: 'Message content required' }, { status: 400 });

  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ error: 'DB unavailable' }, { status: 503 });

  // Verify this request belongs to the client
  const { data: request } = await supabase
    .from('client_requests')
    .select('id, client_email')
    .eq('id', params.id)
    .eq('client_email', session.user.email)
    .single();

  if (!request) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const { data: message, error } = await supabase
    .from('request_messages')
    .insert({
      request_id:   params.id,
      sender_id:    session.user.email,
      sender_name:  session.user.name ?? '',
      sender_role:  'client',
      client_email: session.user.email,
      content:      content.trim(),
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true, message }, { status: 201 });
}

