import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { getSupabaseAdmin } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ error: 'DB unavailable' }, { status: 503 });

  const email = session.user.email;

  // Fetch requests raised by this client
  const { data: requests, error } = await supabase
    .from('requests')
    .select('id, type, title, description, status, division, reference_number, created_at, updated_at')
    .eq('email', email)
    .order('created_at', { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Fetch unread message count
  const { count: unreadCount } = await supabase
    .from('request_messages')
    .select('id', { count: 'exact', head: true })
    .eq('client_email', email)
    .eq('sender_role', 'admin')
    .is('read_at', null);

  // Fetch documents (invoices, delivery notes, quotations)
  const { data: documents } = await supabase
    .from('client_documents')
    .select('id, type, status, title, amount, issued_at, reference_number')
    .eq('client_email', email)
    .order('issued_at', { ascending: false })
    .limit(5);

  const stats = {
    pending_requests: (requests ?? []).filter((r) => r.status === 'pending' || r.status === 'in_review').length,
    unread_messages: unreadCount ?? 0,
    total_documents: documents?.length ?? 0,
    active_projects: (requests ?? []).filter((r) => r.status === 'in_review' || r.status === 'approved').length,
  };

  return NextResponse.json({ stats, requests: requests ?? [], documents: documents ?? [] });
}

