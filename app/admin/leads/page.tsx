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

// Terminal-style left-border color per status
const STATUS_BORDER: Record<string, string> = {
  new: "border-l-[var(--accent)]",
  contacted: "border-l-amber-400",
  converted: "border-l-emerald-400",
  closed: "border-l-[var(--border)]",
};

const STATUS_LABEL: Record<string, string> = {
  new: "NEW",
  contacted: "CONTACTED",
  converted: "CONVERTED",
  closed: "CLOSED",
};

const STATUS_COLOR: Record<string, string> = {
  new: "text-[var(--accent)]",
  contacted: "text-amber-400",
  converted: "text-emerald-400",
  closed: "text-[var(--text-muted)]",
};

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [brandFilter, setBrandFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [converting, setConverting] = useState<string | null>(null);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-10">

      {/* Page Header */}
      <div className="flex items-end justify-between flex-wrap gap-4 pb-6 border-b border-[var(--border)]">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--accent)] mb-2">// OPERATIONS CENTER</p>
          <h1 className="font-display text-4xl md:text-5xl uppercase">ENQUIRIES</h1>
        </div>
        <div className="flex gap-2">
          {leads.length > 0 && (
            <div className="flex items-center gap-2 border border-[var(--border)] px-4 py-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent)]"></span>
              </span>
              <span className="font-mono text-xs text-[var(--text-muted)]">{leads.length} RECORD{leads.length !== 1 ? "S" : ""}</span>
            </div>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-3 flex-wrap">
        <div className="flex flex-col gap-1">
          <label className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)]">BRAND</label>
          <select
            value={brandFilter}
            onChange={(e) => setBrandFilter(e.target.value)}
            className="appearance-none bg-[var(--surface)] border border-[var(--border)] px-4 py-2 font-mono text-sm text-[var(--text)] focus:border-[var(--accent)] focus:outline-none rounded-none min-w-[160px]"
          >
            <option value="">ALL BRANDS</option>
            <option value="branding">BRANDING</option>
            <option value="signage">SIGNAGE</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)]">STATUS</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="appearance-none bg-[var(--surface)] border border-[var(--border)] px-4 py-2 font-mono text-sm text-[var(--text)] focus:border-[var(--accent)] focus:outline-none rounded-none min-w-[160px]"
          >
            <option value="">ALL STATUSES</option>
            <option value="new">NEW</option>
            <option value="contacted">CONTACTED</option>
            <option value="converted">CONVERTED</option>
            <option value="closed">CLOSED</option>
          </select>
        </div>
      </div>

      {/* Error state */}
      {error && (
        <div className="border-l-2 border-[var(--accent2)] pl-4 py-2">
          <span className="font-mono text-xs text-[var(--accent2)] uppercase tracking-widest block mb-1">// SYSTEM ERROR</span>
          <p className="font-mono text-sm text-[var(--text-muted)]">{error}</p>
        </div>
      )}

      {/* Loading state */}
      {loading && (
        <div className="flex items-center gap-3 py-8">
          <span className="font-mono text-xs text-[var(--text-muted)] uppercase tracking-widest animate-pulse">LOADING RECORDS...</span>
        </div>
      )}

      {/* Empty state */}
      {!loading && !error && leads.length === 0 && (
        <div className="border border-[var(--border)] p-12 text-center">
          <p className="font-display text-3xl text-[var(--text-muted)] mb-3">NO RECORDS FOUND</p>
          <p className="font-mono text-xs text-[var(--text-muted)] uppercase tracking-widest">Enquiries submitted via the public forms will appear here.</p>
        </div>
      )}

      {/* Lead Cards */}
      {!loading && leads.length > 0 && (
        <div className="space-y-4">
          {leads.map((lead, index) => (
            <div
              key={lead.id}
              className={`border border-[var(--border)] border-l-4 ${STATUS_BORDER[lead.status]} bg-[var(--surface)] p-6 transition-colors hover:bg-[var(--bg)]`}
            >
              {/* Card Header */}
              <div className="flex flex-wrap items-start justify-between gap-4 mb-5 pb-5 border-b border-[var(--border)]">
                <div className="flex items-center gap-4 flex-wrap">
                  <span className="font-mono text-xs text-[var(--text-muted)]">#{String(index + 1).padStart(3, '0')}</span>
                  <h3 className="font-display text-2xl">{lead.full_name}</h3>
                  <span className={`font-mono text-xs uppercase tracking-widest ${STATUS_COLOR[lead.status]}`}>
                    [ STATUS: {STATUS_LABEL[lead.status]} ]
                  </span>
                  <span className="font-mono text-xs uppercase tracking-widest border border-[var(--border)] px-2 py-0.5 text-[var(--text-muted)]">
                    {lead.brand}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex flex-col items-end gap-3 shrink-0">
                  <div className="flex flex-col gap-1">
                    <label className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)]">UPDATE STATUS</label>
                    <select
                      value={lead.status}
                      onChange={(e) => updateStatus(lead.id, e.target.value)}
                      className="appearance-none bg-[var(--bg)] border border-[var(--border)] px-3 py-1.5 font-mono text-xs text-[var(--text)] focus:border-[var(--accent)] focus:outline-none rounded-none"
                    >
                      <option value="new">NEW</option>
                      <option value="contacted">CONTACTED</option>
                      <option value="converted">CONVERTED</option>
                      <option value="closed">CLOSED</option>
                    </select>
                  </div>

                  {lead.converted_task_id ? (
                    inventoryBaseUrl ? (
                      <a
                        href={`${inventoryBaseUrl.replace(/\/$/, "")}/tasks/${lead.converted_task_id}`}
                        target="_blank"
                        rel="noreferrer"
                        className="font-mono text-xs uppercase tracking-widest text-[var(--accent)] hover:underline flex items-center gap-1"
                      >
                        VIEW TASK IN SOURCING BOARD →
                      </a>
                    ) : (
                      <span className="font-mono text-xs text-emerald-400 uppercase tracking-widest">[ TASK CREATED ]</span>
                    )
                  ) : (
                    <button
                      onClick={() => convertToTask(lead.id)}
                      disabled={converting === lead.id}
                      className="group relative overflow-hidden border border-[var(--border)] bg-transparent px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-[var(--text)] disabled:opacity-50 disabled:cursor-wait"
                    >
                      <div className="absolute inset-0 bg-[var(--accent)] transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-out z-0"></div>
                      <span className="relative z-10 group-hover:text-[var(--bg)] transition-colors duration-300">
                        {converting === lead.id ? "CONVERTING..." : "→ CONVERT TO TASK"}
                      </span>
                    </button>
                  )}
                </div>
              </div>

              {/* Card Body — Metadata grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-widest block mb-1">PHONE</span>
                  <span className="font-mono text-sm text-[var(--text)]">{lead.phone}</span>
                </div>
                {lead.email && (
                  <div>
                    <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-widest block mb-1">EMAIL</span>
                    <span className="font-mono text-sm text-[var(--text)] break-all">{lead.email}</span>
                  </div>
                )}
                {lead.service && (
                  <div>
                    <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-widest block mb-1">SERVICE REQ.</span>
                    <span className="font-mono text-sm text-[var(--text)]">{lead.service}</span>
                  </div>
                )}
                {lead.location && (
                  <div>
                    <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-widest block mb-1">LOCATION</span>
                    <span className="font-mono text-sm text-[var(--text)]">{lead.location}</span>
                  </div>
                )}
                {lead.preferred_date && (
                  <div>
                    <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-widest block mb-1">PREFERRED DATE</span>
                    <span className="font-mono text-sm text-[var(--text)]">{lead.preferred_date}</span>
                  </div>
                )}
                <div>
                  <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-widest block mb-1">RECEIVED</span>
                  <span className="font-mono text-sm text-[var(--text-muted)]">{new Date(lead.created_at).toLocaleString()}</span>
                </div>
              </div>

              {lead.message && (
                <div className="mt-5 pt-5 border-t border-[var(--border)]">
                  <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-widest block mb-2">// SPECIFICATIONS</span>
                  <p className="font-mono text-sm text-[var(--text-muted)] leading-relaxed max-w-3xl">{lead.message}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [brandFilter, setBrandFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [converting, setConverting] = useState<string | null>(null);
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
    // Public task link base, if the deployment exposes it — optional, purely cosmetic.
    fetch("/api/admin/config")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d && setInventoryBaseUrl(d.inventoryPlatformPublicUrl || null))
      .catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h1 className="font-display text-2xl">Enquiries</h1>
        <div className="flex gap-2 text-sm">
          <select
            value={brandFilter}
            onChange={(e) => setBrandFilter(e.target.value)}
            className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-sm)] px-3 py-2"
          >
            <option value="">All brands</option>
            <option value="branding">Branding</option>
            <option value="signage">Signage</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-sm)] px-3 py-2"
          >
            <option value="">All statuses</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="converted">Converted</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </div>

      {error && (
        <div className="text-sm border border-[var(--accent2)] rounded-[var(--radius-sm)] px-4 py-3">{error}</div>
      )}

      {loading ? (
        <p className="text-sm text-[var(--text-muted)]">Loading…</p>
      ) : leads.length === 0 ? (
        <p className="text-sm text-[var(--text-muted)]">No enquiries yet.</p>
      ) : (
        <div className="space-y-3">
          {leads.map((lead) => (
            <div key={lead.id} className="border border-[var(--border)] rounded-[var(--radius-md)] p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold">{lead.full_name}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${STATUS_STYLES[lead.status]}`}>
                      {lead.status}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--surface)] border border-[var(--border)]">
                      {lead.brand}
                    </span>
                  </div>
                  <div className="text-sm text-[var(--text-muted)] mt-1">
                    {lead.phone} {lead.email ? `· ${lead.email}` : ""}
                  </div>
                  {lead.service && (
                    <div className="text-sm mt-1">
                      <span className="text-[var(--text-muted)]">Wants:</span> {lead.service}
                    </div>
                  )}
                  {lead.location && (
                    <div className="text-sm">
                      <span className="text-[var(--text-muted)]">Location:</span> {lead.location}
                    </div>
                  )}
                  {lead.preferred_date && (
                    <div className="text-sm">
                      <span className="text-[var(--text-muted)]">Preferred date:</span> {lead.preferred_date}
                    </div>
                  )}
                  {lead.message && (
                    <div className="text-sm mt-2 text-[var(--text-muted)] max-w-xl">{lead.message}</div>
                  )}
                  <div className="text-xs text-[var(--text-muted)] mt-2">
                    {new Date(lead.created_at).toLocaleString()}
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2 shrink-0">
                  <select
                    value={lead.status}
                    onChange={(e) => updateStatus(lead.id, e.target.value)}
                    className="text-xs bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-sm)] px-2 py-1"
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
                        className="text-xs underline text-[var(--accent)]"
                      >
                        View task →
                      </a>
                    ) : (
                      <span className="text-xs text-[var(--text-muted)]">Converted</span>
                    )
                  ) : (
                    <button
                      onClick={() => convertToTask(lead.id)}
                      disabled={converting === lead.id}
                      className="text-xs rounded-[var(--radius-sm)] bg-[var(--accent)] text-[var(--accent-ink)] px-3 py-1.5 font-semibold disabled:opacity-60"
                    >
                      {converting === lead.id ? "Converting…" : "Convert to Task"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
