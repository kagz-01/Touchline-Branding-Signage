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

const STATUS_STYLES: Record<string, string> = {
  new: "bg-blue-500/20 text-blue-300",
  contacted: "bg-amber-500/20 text-amber-300",
  converted: "bg-green-500/20 text-green-300",
  closed: "bg-gray-500/20 text-gray-400",
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
