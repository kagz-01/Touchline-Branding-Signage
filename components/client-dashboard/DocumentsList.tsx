'use client';

import { useEffect, useState } from 'react';

type Doc = {
  id: string; type: string; title: string; status: string;
  amount?: number; issued_at: string; reference_number: string; file_url?: string; due_date?: string;
};

const statusColors: Record<string, string> = {
  draft:    'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
  sent:     'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
  viewed:   'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
  paid:     'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400',
  overdue:  'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
};

const typeIcons: Record<string, string> = {
  invoice: '🧾', delivery_note: '📦', quotation: '💼', receipt: '✅', other: '📄',
};

const FILTERS = ['all', 'invoice', 'quotation', 'delivery_note', 'receipt'];

export default function DocumentsList() {
  const [documents, setDocs] = useState<Doc[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter]   = useState('all');

  useEffect(() => {
    setLoading(true);
    fetch('/api/client/documents')
      .then((r) => r.json())
      .then(({ documents: d }) => {
        const filtered = filter === 'all' ? d : d?.filter((x: Doc) => x.type === filter);
        setDocs(filtered ?? []);
      })
      .finally(() => setLoading(false));
  }, [filter]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--text)]">Documents</h1>
        <p className="text-sm text-[var(--text-muted)] mt-0.5">Invoices, delivery notes & quotations from Touchline</p>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {FILTERS.map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide transition-all ${
              filter === f
                ? 'bg-[var(--accent)] text-[var(--accent-ink)]'
                : 'bg-[var(--surface)] text-[var(--text-muted)] border border-[var(--border)] hover:border-[var(--accent)]'
            }`}>
            {f.replace('_', ' ')}
          </button>
        ))}
      </div>

      {loading && (
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => <div key={i} className="h-20 rounded-2xl bg-[var(--surface)] animate-pulse" />)}
        </div>
      )}

      {!loading && documents.length === 0 && (
        <div className="text-center py-16 rounded-2xl border border-dashed border-[var(--border)]">
          <p className="text-4xl mb-3">📂</p>
          <p className="text-sm font-medium text-[var(--text)]">No documents yet</p>
          <p className="text-xs text-[var(--text-muted)] mt-1">Documents shared by Touchline will appear here</p>
        </div>
      )}

      {!loading && documents.length > 0 && (
        <div className="rounded-2xl border border-[var(--border)] overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border)] bg-[var(--bg-soft)]">
                <th className="text-left px-5 py-3.5 text-xs font-mono uppercase text-[var(--text-muted)]">Document</th>
                <th className="text-left px-5 py-3.5 text-xs font-mono uppercase text-[var(--text-muted)] hidden sm:table-cell">Date</th>
                <th className="text-left px-5 py-3.5 text-xs font-mono uppercase text-[var(--text-muted)]">Status</th>
                <th className="text-right px-5 py-3.5 text-xs font-mono uppercase text-[var(--text-muted)]">Amount</th>
                <th className="px-5 py-3.5"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {documents.map((d) => (
                <tr key={d.id} className="bg-[var(--surface)] hover:bg-[var(--bg-soft)] transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{typeIcons[d.type] ?? '📄'}</span>
                      <div>
                        <p className="font-medium text-[var(--text)]">{d.title}</p>
                        <p className="text-xs text-[var(--text-muted)] font-mono">{d.reference_number}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-[var(--text-muted)] hidden sm:table-cell">
                    {new Date(d.issued_at).toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="px-5 py-4">
                    <span className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-full ${statusColors[d.status] ?? ''}`}>{d.status}</span>
                  </td>
                  <td className="px-5 py-4 text-right font-mono text-[var(--text)]">
                    {d.amount ? `KES ${d.amount.toLocaleString()}` : '—'}
                  </td>
                  <td className="px-5 py-4">
                    {d.file_url ? (
                      <a href={d.file_url} target="_blank" rel="noopener noreferrer"
                        className="text-xs text-[var(--accent)] hover:underline font-semibold">
                        Download
                      </a>
                    ) : (
                      <span className="text-xs text-[var(--text-muted)]">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

