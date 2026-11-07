'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

type Stats = { pending_requests: number; unread_messages: number; total_documents: number; active_projects: number };
type Request = { id: string; type: string; title: string; status: string; division: string; reference_number: string; created_at: string };
type Document = { id: string; type: string; title: string; status: string; amount?: number; issued_at: string; reference_number: string };

const statusColors: Record<string, string> = {
  pending:   'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
  in_review: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
  approved:  'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400',
  rejected:  'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
  completed: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
};

function KpiCard({ label, value, icon, href }: { label: string; value: number; icon: React.ReactNode; href: string }) {
  return (
    <Link href={href} className="card-surface group flex items-center gap-4 p-5 rounded-2xl hover:border-[var(--accent)] transition-all">
      <span className="w-11 h-11 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-[var(--accent-ink)] transition-all">
        {icon}
      </span>
      <div>
        <p className="text-2xl font-bold text-[var(--text)]">{value}</p>
        <p className="text-xs text-[var(--text-muted)] mt-0.5">{label}</p>
      </div>
    </Link>
  );
}

export default function Overview() {
  const { data: session } = useSession();
  const [stats, setStats] = useState<Stats>({ pending_requests: 0, unread_messages: 0, total_documents: 0, active_projects: 0 });
  const [requests, setRequests] = useState<Request[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/client/dashboard')
      .then((r) => r.json())
      .then(({ stats: s, requests: r, documents: d }) => {
        if (s) setStats(s);
        if (r) setRequests(r.slice(0, 5));
        if (d) setDocuments(d.slice(0, 5));
      })
      .finally(() => setLoading(false));
  }, []);

  const firstName = session?.user?.name?.split(' ')[0] ?? 'there';

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-[var(--text)]">
          Welcome back, {firstName} 👋
        </h1>
        <p className="text-sm text-[var(--text-muted)] mt-1">
          Here's what's happening with your projects.
        </p>
      </div>

      {/* KPIs */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-24 rounded-2xl bg-[var(--surface)] animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <KpiCard label="Active Projects" value={stats.active_projects} href="/client-dashboard/projects"
            icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5"><polyline points="22,12 18,12 15,21 9,3 6,12 2,12" /></svg>} />
          <KpiCard label="Pending Requests" value={stats.pending_requests} href="/client-dashboard/requests"
            icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14,2 14,8 20,8" /></svg>} />
          <KpiCard label="Unread Messages" value={stats.unread_messages} href="/client-dashboard/messages"
            icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" /></svg>} />
          <KpiCard label="Documents" value={stats.total_documents} href="/client-dashboard/documents"
            icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5"><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" /></svg>} />
        </div>
      )}

      {/* Quick actions */}
      <div>
        <h2 className="text-sm font-mono uppercase tracking-widest text-[var(--text-muted)] mb-3">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'Request a Quote', href: '/client-dashboard/requests/new?type=quote', color: 'var(--accent)' },
            { label: 'Request Invoice', href: '/client-dashboard/requests/new?type=invoice', color: 'var(--accent2)' },
            { label: 'Delivery Note', href: '/client-dashboard/requests/new?type=delivery_note', color: 'var(--accent2)' },
            { label: 'General Request', href: '/client-dashboard/requests/new?type=general', color: 'var(--text-muted)' },
          ].map((a) => (
            <Link key={a.href} href={a.href}
              className="flex items-center justify-center gap-2 p-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--accent)] hover:bg-[var(--bg-soft)] text-sm font-medium text-[var(--text)] transition-all text-center"
              style={{ '--hover-color': a.color } as React.CSSProperties}>
              + {a.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Recent requests */}
      {requests.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-mono uppercase tracking-widest text-[var(--text-muted)]">Recent Requests</h2>
            <Link href="/client-dashboard/requests" className="text-xs text-[var(--accent)] hover:underline">View all</Link>
          </div>
          <div className="space-y-2">
            {requests.map((r) => (
              <Link key={r.id} href={`/client-dashboard/requests/${r.id}`}
                className="flex items-center justify-between p-4 rounded-xl bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--accent)] transition-all group">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-xs font-mono text-[var(--text-muted)] shrink-0">{r.reference_number}</span>
                  <span className="text-sm font-medium text-[var(--text)] truncate">{r.title}</span>
                </div>
                <div className="flex items-center gap-2 shrink-0 ml-2">
                  <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full ${statusColors[r.status] ?? 'bg-gray-100 text-gray-600'}`}>
                    {r.status.replace('_', ' ')}
                  </span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 text-[var(--text-muted)] group-hover:translate-x-0.5 transition-transform"><path d="M9 18l6-6-6-6" /></svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Empty state */}
      {!loading && requests.length === 0 && (
        <div className="text-center py-16 rounded-2xl border border-dashed border-[var(--border)]">
          <p className="text-4xl mb-3">📋</p>
          <p className="text-sm font-medium text-[var(--text)]">No requests yet</p>
          <p className="text-xs text-[var(--text-muted)] mt-1 mb-5">Start by requesting a quotation, invoice or delivery note</p>
          <Link href="/client-dashboard/requests/new?type=quote" className="btn-primary text-sm font-semibold py-2.5 px-6">
            Create First Request
          </Link>
        </div>
      )}

      {/* Recent documents */}
      {documents.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-mono uppercase tracking-widest text-[var(--text-muted)]">Recent Documents</h2>
            <Link href="/client-dashboard/documents" className="text-xs text-[var(--accent)] hover:underline">View all</Link>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-[var(--border)]">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--border)] bg-[var(--bg-soft)]">
                  <th className="text-left px-4 py-3 text-xs font-mono uppercase text-[var(--text-muted)]">Reference</th>
                  <th className="text-left px-4 py-3 text-xs font-mono uppercase text-[var(--text-muted)]">Type</th>
                  <th className="text-left px-4 py-3 text-xs font-mono uppercase text-[var(--text-muted)]">Status</th>
                  <th className="text-right px-4 py-3 text-xs font-mono uppercase text-[var(--text-muted)]">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {documents.map((d) => (
                  <tr key={d.id} className="bg-[var(--surface)] hover:bg-[var(--bg-soft)] transition-colors">
                    <td className="px-4 py-3 font-mono text-xs text-[var(--text-muted)]">{d.reference_number}</td>
                    <td className="px-4 py-3 capitalize text-[var(--text)]">{d.type.replace('_', ' ')}</td>
                    <td className="px-4 py-3">
                      <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full ${statusColors[d.status] ?? 'bg-gray-100 text-gray-600'}`}>
                        {d.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right text-[var(--text)]">
                      {d.amount ? `KES ${d.amount.toLocaleString()}` : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
