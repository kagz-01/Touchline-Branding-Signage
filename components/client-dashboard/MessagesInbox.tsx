'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';

type Request = {
  id: string; title: string; reference_number: string; type: string;
  status: string; unread?: number;
};

type Message = {
  id: string; request_id: string; sender_name: string; sender_role: string;
  content: string; created_at: string;
};

export default function MessagesInbox() {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    fetch('/api/client/requests')
      .then((r) => r.json())
      .then(({ requests: data }) => setRequests(data ?? []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--text)]">Messages</h1>
        <p className="text-sm text-[var(--text-muted)] mt-0.5">Your conversations with the Touchline team</p>
      </div>

      {loading && (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => <div key={i} className="h-20 rounded-2xl bg-[var(--surface)] animate-pulse" />)}
        </div>
      )}

      {!loading && requests.length === 0 && (
        <div className="text-center py-16 rounded-2xl border border-dashed border-[var(--border)]">
          <p className="text-4xl mb-3">💬</p>
          <p className="text-sm font-medium text-[var(--text)]">No conversations yet</p>
          <p className="text-xs text-[var(--text-muted)] mt-1 mb-5">Create a request to start a conversation</p>
          <Link href="/client-dashboard/requests/new" className="btn-primary text-sm py-2.5 px-6">New Request</Link>
        </div>
      )}

      {!loading && requests.length > 0 && (
        <div className="space-y-2">
          {requests.map((r) => (
            <Link key={r.id} href={`/client-dashboard/requests/${r.id}`}
              className="flex items-center justify-between p-4 md:p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--accent)] transition-all group">
              <div className="flex items-center gap-3 min-w-0">
                <span className="w-10 h-10 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)] text-lg shrink-0">💬</span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-[var(--text)] truncate">{r.title}</p>
                  <p className="text-xs text-[var(--text-muted)] font-mono">{r.reference_number}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0 ml-2">
                <span className="text-xs capitalize text-[var(--text-muted)]">{r.status.replace('_', ' ')}</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 text-[var(--text-muted)] group-hover:translate-x-0.5 transition-transform">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

