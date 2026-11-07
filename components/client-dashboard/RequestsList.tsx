'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

type Request = {
  id: string; type: string; title: string; description: string;
  status: string; division: string; reference_number: string; priority: string; created_at: string;
};

const statusColors: Record<string, string> = {
  pending:   'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
  in_review: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
  approved:  'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400',
  rejected:  'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
  completed: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
};

const typeIcons: Record<string, string> = {
  quote: '💼', invoice: '🧾', delivery_note: '📦', general: '📋',
};

const FILTERS = ['all', 'pending', 'in_review', 'approved', 'completed'];

export default function RequestsList() {
  const searchParams = useSearchParams();
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    setLoading(true);
    const url = filter === 'all' ? '/api/client/requests' : `/api/client/requests?status=${filter}`;
    fetch(url)
      .then((r) => r.json())
      .then(({ requests: data }) => setRequests(data ?? []))
      .finally(() => setLoading(false));
  }, [filter]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text)]">Requests</h1>
          <p className="text-sm text-[var(--text-muted)] mt-0.5">Track quotations, invoices & delivery notes</p>
        </div>
        <Link
          href="/client-dashboard/requests/new"
          className="btn-primary text-sm font-semibold py-2.5 px-5 self-start sm:self-auto"
        >
          + New Request
        </Link>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide transition-all ${
              filter === f
                ? 'bg-[var(--accent)] text-[var(--accent-ink)] shadow-sm'
                : 'bg-[var(--surface)] text-[var(--text-muted)] border border-[var(--border)] hover:border-[var(--accent)]'
            }`}
          >
            {f.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Loading skeletons */}
      {loading && (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => <div key={i} className="h-24 rounded-2xl bg-[var(--surface)] animate-pulse" />)}
        </div>
      )}

      {/* Empty */}
      {!loading && requests.length === 0 && (
        <div className="text-center py-16 rounded-2xl border border-dashed border-[var(--border)]">
          <p className="text-4xl mb-3">📭</p>
          <p className="text-sm font-medium text-[var(--text)]">No requests found</p>
          <p className="text-xs text-[var(--text-muted)] mt-1 mb-5">Create your first request to get started</p>
          <Link href="/client-dashboard/requests/new" className="btn-primary text-sm py-2.5 px-6">Create Request</Link>
        </div>
      )}

      {/* List */}
      {!loading && requests.length > 0 && (
        <div className="space-y-3">
          {requests.map((r) => (
            <Link
              key={r.id}
              href={`/client-dashboard/requests/${r.id}`}
              className="flex items-start justify-between gap-4 p-4 md:p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--accent)] transition-all group"
            >
              <div className="flex items-start gap-3 min-w-0">
                <span className="text-2xl mt-0.5 shrink-0">{typeIcons[r.type] ?? '📋'}</span>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-[var(--text-muted)]">{r.reference_number}</span>
                    <span className="text-xs text-[var(--text-muted)] capitalize border border-[var(--border)] px-1.5 py-0.5 rounded">
                      {r.type.replace('_', ' ')}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-[var(--text)] truncate">{r.title}</p>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5 line-clamp-1">{r.description}</p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2 shrink-0">
                <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full whitespace-nowrap ${statusColors[r.status] ?? ''}`}>
                  {r.status.replace('_', ' ')}
                </span>
                <span className="text-xs text-[var(--text-muted)]">
                  {new Date(r.created_at).toLocaleDateString('en-KE', { day: 'numeric', month: 'short' })}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

