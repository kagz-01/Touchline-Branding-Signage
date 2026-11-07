'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';

type Message = {
  id: string; sender_name: string; sender_role: 'client' | 'admin';
  content: string; created_at: string;
};
type Request = {
  id: string; type: string; title: string; description: string; status: string;
  reference_number: string; priority: string; division: string; created_at: string;
};

const statusColors: Record<string, string> = {
  pending:   'text-amber-600 bg-amber-50 dark:bg-amber-900/20',
  in_review: 'text-blue-600 bg-blue-50 dark:bg-blue-900/20',
  approved:  'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20',
  rejected:  'text-red-600 bg-red-50 dark:bg-red-900/20',
  completed: 'text-gray-600 bg-gray-50 dark:bg-gray-800',
};

export default function RequestDetail({ id }: { id: string }) {
  const [request, setRequest]   = useState<Request | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading]   = useState(true);
  const [msg, setMsg]           = useState('');
  const [sending, setSending]   = useState(false);
  const bottomRef               = useRef<HTMLDivElement>(null);

  const load = () => {
    fetch(`/api/client/requests/${id}`)
      .then((r) => r.json())
      .then(({ request: r, messages: m }) => {
        if (r) setRequest(r);
        if (m) setMessages(m);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, [id]);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  // Poll for new messages every 15s
  useEffect(() => {
    const timer = setInterval(load, 15000);
    return () => clearInterval(timer);
  }, [id]);

  const send = async () => {
    if (!msg.trim()) return;
    setSending(true);
    await fetch(`/api/client/requests/${id}/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: msg }),
    });
    setMsg('');
    setSending(false);
    load();
  };

  if (loading) return (
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => <div key={i} className="h-20 rounded-2xl bg-[var(--surface)] animate-pulse" />)}
    </div>
  );

  if (!request) return (
    <div className="text-center py-16">
      <p className="text-sm text-[var(--text-muted)]">Request not found.</p>
      <Link href="/client-dashboard/requests" className="mt-4 btn-primary text-sm py-2 px-5 inline-block">Back to Requests</Link>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Breadcrumb */}
      <nav className="text-xs text-[var(--text-muted)] flex items-center gap-1.5">
        <Link href="/client-dashboard" className="hover:text-[var(--accent)]">Dashboard</Link>
        <span>/</span>
        <Link href="/client-dashboard/requests" className="hover:text-[var(--accent)]">Requests</Link>
        <span>/</span>
        <span className="text-[var(--text)]">{request.reference_number}</span>
      </nav>

      {/* Request details card */}
      <div className="p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border)] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
          <div>
            <span className="text-xs font-mono text-[var(--text-muted)]">{request.reference_number}</span>
            <h1 className="text-xl font-bold text-[var(--text)] mt-1">{request.title}</h1>
          </div>
          <span className={`self-start text-xs font-bold uppercase px-3 py-1 rounded-full ${statusColors[request.status] ?? ''}`}>
            {request.status.replace('_', ' ')}
          </span>
        </div>
        <p className="text-sm text-[var(--text)] whitespace-pre-wrap">{request.description}</p>
        <div className="flex flex-wrap gap-4 pt-2 border-t border-[var(--border)]">
          <div>
            <p className="text-[10px] font-mono uppercase text-[var(--text-muted)]">Type</p>
            <p className="text-sm capitalize text-[var(--text)]">{request.type.replace('_', ' ')}</p>
          </div>
          <div>
            <p className="text-[10px] font-mono uppercase text-[var(--text-muted)]">Division</p>
            <p className="text-sm capitalize text-[var(--text)]">{request.division}</p>
          </div>
          <div>
            <p className="text-[10px] font-mono uppercase text-[var(--text-muted)]">Priority</p>
            <p className="text-sm capitalize text-[var(--text)]">{request.priority}</p>
          </div>
          <div>
            <p className="text-[10px] font-mono uppercase text-[var(--text-muted)]">Submitted</p>
            <p className="text-sm text-[var(--text)]">{new Date(request.created_at).toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
          </div>
        </div>
      </div>

      {/* Messaging thread */}
      <div className="rounded-2xl border border-[var(--border)] overflow-hidden flex flex-col">
        <div className="px-4 py-3 border-b border-[var(--border)] bg-[var(--bg-soft)]">
          <p className="text-sm font-semibold text-[var(--text)]">Conversation</p>
          <p className="text-xs text-[var(--text-muted)]">Messages are visible to you and the Touchline team</p>
        </div>

        {/* Message list */}
        <div className="flex-1 p-4 space-y-4 max-h-96 overflow-y-auto bg-[var(--bg)]">
          {messages.length === 0 && (
            <div className="text-center py-8">
              <p className="text-3xl mb-2">💬</p>
              <p className="text-xs text-[var(--text-muted)]">No messages yet. Start the conversation below.</p>
            </div>
          )}
          {messages.map((m) => {
            const isClient = m.sender_role === 'client';
            return (
              <div key={m.id} className={`flex ${isClient ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  isClient
                    ? 'bg-[var(--accent)] text-[var(--accent-ink)] rounded-br-sm'
                    : 'bg-[var(--surface)] border border-[var(--border)] text-[var(--text)] rounded-bl-sm'
                }`}>
                  {!isClient && (
                    <p className="text-[10px] font-bold uppercase tracking-wider mb-1 opacity-70">{m.sender_name} · Touchline</p>
                  )}
                  <p className="text-sm whitespace-pre-wrap">{m.content}</p>
                  <p className={`text-[10px] mt-1.5 ${isClient ? 'text-[var(--accent-ink)]/70 text-right' : 'text-[var(--text-muted)]'}`}>
                    {new Date(m.created_at).toLocaleTimeString('en-KE', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            );
          })}
          <div ref={bottomRef} />
        </div>

        {/* Message input */}
        <div className="p-3 border-t border-[var(--border)] bg-[var(--bg-soft)] flex gap-2">
          <input
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } }}
            placeholder="Type your message…"
            className="flex-1 px-4 py-2.5 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-sm text-[var(--text)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition-colors"
          />
          <button
            onClick={send}
            disabled={sending || !msg.trim()}
            className="btn-primary px-4 py-2.5 text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {sending ? '…' : '↑'}
          </button>
        </div>
      </div>
    </div>
  );
}

