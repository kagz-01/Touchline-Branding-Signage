"use client";

import { useEffect, useState } from "react";

type Lead = {
  id: string;
  created_at: string;
  brand: "branding" | "signage";
  full_name: string;
  phone: string;
  email: string | null;
  service: string | null;
  preferred_date: string | null;
  location: string | null;
  message: string | null;
  status: "new" | "contacted" | "converted" | "closed";
  converted_task_id: string | null;
};

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  new: { label: "New", color: "var(--accent)", bg: "var(--accent)" },
  contacted: { label: "Contacted", color: "#f59e0b", bg: "#f59e0b" },
  converted: { label: "Converted", color: "#10b981", bg: "#10b981" },
  closed: { label: "Closed", color: "var(--text-muted)", bg: "var(--text-muted)" },
};

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [brandFilter, setBrandFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [converting, setConverting] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [inventoryBaseUrl, setInventoryBaseUrl] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    const params = new URLSearchParams();
    if (brandFilter) params.set("brand", brandFilter);
    if (statusFilter) params.set("status", statusFilter);
    const res = await fetch(`/api/admin/leads?${params.toString()}`);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Failed to load enquiries.");
      setLoading(false);
      return;
    }
    setLeads(await res.json());
    setLoading(false);
  }

  useEffect(() => {
    load();
    fetch("/api/admin/config")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d && setInventoryBaseUrl(d.inventoryPlatformPublicUrl || null))
      .catch(() => {});
  }, [brandFilter, statusFilter]);

  async function updateStatus(id: string, status: string) {
    await fetch(`/api/admin/leads/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    load();
  }

  async function convertToTask(id: string) {
    setConverting(id);
    const res = await fetch(`/api/admin/leads/${id}/convert`, { method: "POST" });
    setConverting(null);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      alert(data.error || "Couldn't convert this lead to a task.");
      return;
    }
    load();
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-8">
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--accent)] mb-2">// Leads</p>
          <h1 className="font-display text-3xl md:text-4xl text-[var(--text)]">Enquiries</h1>
        </div>
        {leads.length > 0 && (
          <span className="font-mono text-xs text-[var(--text-muted)]">{leads.length} records</span>
        )}
      </div>

      {/* Filters */}
      <div className="flex gap-3 flex-wrap">
        <select
          value={brandFilter}
          onChange={(e) => setBrandFilter(e.target.value)}
          className="appearance-none bg-[var(--surface)] border border-[var(--border)] px-4 py-2 text-sm text-[var(--text)] focus:border-[var(--accent)] focus:outline-none rounded-[var(--radius-sm)] min-w-[140px]"
        >
          <option value="">All brands</option>
          <option value="branding">Branding</option>
          <option value="signage">Signage</option>
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="appearance-none bg-[var(--surface)] border border-[var(--border)] px-4 py-2 text-sm text-[var(--text)] focus:border-[var(--accent)] focus:outline-none rounded-[var(--radius-sm)] min-w-[140px]"
        >
          <option value="">All statuses</option>
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="converted">Converted</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      {error && (
        <div className="bg-[var(--accent)]/5 border border-[var(--accent)]/20 p-4 rounded-[var(--radius-sm)]">
          <p className="text-sm text-[var(--accent)]">{error}</p>
        </div>
      )}

      {loading && (
        <div className="py-12 text-center text-[var(--text-muted)] text-sm">Loading leads...</div>
      )}

      {!loading && leads.length === 0 && (
        <div className="card-surface p-12 text-center">
          <p className="font-display text-xl text-[var(--text-muted)] mb-2">No leads found</p>
          <p className="text-sm text-[var(--text-muted)]">
            {brandFilter || statusFilter ? "Try adjusting your filters." : "Enquiries from the public forms will appear here."}
          </p>
        </div>
      )}

      {!loading && leads.length > 0 && (
        <div className="space-y-3">
          {leads.map((lead) => {
            const isExpanded = expandedId === lead.id;
            const config = STATUS_CONFIG[lead.status];

            return (
              <div
                key={lead.id}
                className="card-surface overflow-hidden"
              >
                {/* Row */}
                <button
                  onClick={() => setExpandedId(isExpanded ? null : lead.id)}
                  className="w-full text-left p-5 flex items-center gap-4 hover:bg-[var(--bg-soft)] transition-colors"
                >
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: config.bg }} />

                  <div className="flex-1 min-w-0 grid grid-cols-2 md:grid-cols-4 gap-4 items-center">
                    <div className="truncate">
                      <p className="font-medium text-[var(--text)] truncate">{lead.full_name}</p>
                    </div>
                    <div className="hidden md:block">
                      <span className="font-mono text-xs px-2 py-0.5 border border-[var(--border)] text-[var(--text-muted)]">
                        {lead.brand}
                      </span>
                    </div>
                    <div className="hidden md:block">
                      <span className="font-mono text-xs" style={{ color: config.color }}>
                        {config.label}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-[var(--text-muted)]">
                        {new Date(lead.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <svg
                    className={`w-4 h-4 text-[var(--text-muted)] transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Expanded */}
                {isExpanded && (
                  <div className="px-5 pb-5 border-t border-[var(--border)] pt-5 space-y-5 animate-fade-in">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-widest block mb-1">Phone</span>
                        <span className="text-sm text-[var(--text)]">{lead.phone}</span>
                      </div>
                      {lead.email && (
                        <div>
                          <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-widest block mb-1">Email</span>
                          <span className="text-sm text-[var(--text)] break-all">{lead.email}</span>
                        </div>
                      )}
                      {lead.service && (
                        <div>
                          <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-widest block mb-1">Service</span>
                          <span className="text-sm text-[var(--text)]">{lead.service}</span>
                        </div>
                      )}
                      {lead.location && (
                        <div>
                          <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-widest block mb-1">Location</span>
                          <span className="text-sm text-[var(--text)]">{lead.location}</span>
                        </div>
                      )}
                    </div>

                    {lead.message && (
                      <div>
                        <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-widest block mb-2">Specifications</span>
                        <p className="text-sm text-[var(--text-muted)] leading-relaxed bg-[var(--bg-soft)] p-3 rounded-[var(--radius-sm)]">
                          {lead.message}
                        </p>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center gap-3 pt-3 border-t border-[var(--border)]">
                      <select
                        value={lead.status}
                        onChange={(e) => updateStatus(lead.id, e.target.value)}
                        className="appearance-none bg-[var(--bg)] border border-[var(--border)] px-3 py-1.5 text-xs text-[var(--text)] focus:border-[var(--accent)] focus:outline-none rounded-[var(--radius-sm)]"
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="converted">Converted</option>
                        <option value="closed">Closed</option>
                      </select>

                      {lead.converted_task_id ? (
                        inventoryBaseUrl ? (
                          <a
                            href={`${inventoryBaseUrl.replace(/\/$/, "")}/tasks/${lead.converted_task_id}`}
                            target="_blank"
                            rel="noreferrer"
                            className="text-xs text-[var(--accent)] hover:underline"
                          >
                            View task →
                          </a>
                        ) : (
                          <span className="text-xs text-emerald-500">Task created</span>
                        )
                      ) : (
                        <button
                          onClick={() => convertToTask(lead.id)}
                          disabled={converting === lead.id}
                          className="text-xs border border-[var(--border)] px-3 py-1.5 hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors disabled:opacity-50 rounded-[var(--radius-sm)]"
                        >
                          {converting === lead.id ? "Converting..." : "Convert to task"}
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
