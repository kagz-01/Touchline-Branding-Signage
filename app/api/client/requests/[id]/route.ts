import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { getSupabaseAdmin } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ error: 'DB unavailable' }, { status: 503 });

  const { data: request, error } = await supabase
    .from('client_requests')
    .select('*')
    .eq('id', params.id)
    .eq('client_email', session.user.email)
    .single();

  if (error || !request) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  // Fetch messages for this request
  const { data: messages } = await supabase
    .from('request_messages')
    .select('*')
    .eq('request_id', params.id)
    .order('created_at', { ascending: true });

  // Mark admin messages as read
  await supabase
    .from('request_messages')
    .update({ read_at: new Date().toISOString() })
    .eq('request_id', params.id)
    .eq('sender_role', 'admin')
    .is('read_at', null);

  return NextResponse.json({ request, messages: messages ?? [] });
}

