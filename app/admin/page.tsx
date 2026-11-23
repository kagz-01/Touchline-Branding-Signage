"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Lead = {
  id: string;
  created_at: string;
  brand: "branding" | "signage";
  full_name: string;
  status: "new" | "contacted" | "converted" | "closed";
};

type Metrics = {
  total: number;
  newLeads: number;
  contacted: number;
  converted: number;
};

export default function AdminDashboardPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [catalogCount, setCatalogCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/leads").then((r) => (r.ok ? r.json() : [])),
      fetch("/api/admin/catalog").then((r) => (r.ok ? r.json() : [])),
    ])
      .then(([leadsData, catalogData]) => {
        setLeads(leadsData);
        setCatalogCount(Array.isArray(catalogData) ? catalogData.length : 0);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const metrics: Metrics = {
    total: leads.length,
    newLeads: leads.filter((l) => l.status === "new").length,
    contacted: leads.filter((l) => l.status === "contacted").length,
    converted: leads.filter((l) => l.status === "converted").length,
  };

  const recentLeads = leads.slice(0, 5);

  const metricCards = [
    { label: "Total RFQs & Leads", value: metrics.total, color: "var(--text)" },
    { label: "New Unprocessed", value: metrics.newLeads, color: "var(--accent)" },
    { label: "Converted to Desk", value: metrics.converted, color: "#10b981" },
    { label: "Live Catalog Items", value: catalogCount ?? "—", color: "#0070f3" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-10">
      <div>
        <h1 className="font-display text-3xl md:text-4xl text-[var(--text)]">Welcome back</h1>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metricCards.map((card) => (
          <div key={card.label} className="card-surface p-5 rounded-2xl border border-[var(--border)]">
            <span className="text-xs text-[var(--text-muted)] block mb-2">{card.label}</span>
            <span className="font-display text-3xl font-bold" style={{ color: card.color }}>
              {loading ? "—" : card.value}
            </span>
          </div>
        ))}
      </div>

      {/* Quick Actions Bar */}
      <div className="card-theme p-6 rounded-2xl border border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-display text-base font-bold text-[var(--text)]">Catalog &amp; Procurement Inventory</h3>
          <p className="text-xs text-[var(--text-muted)] mt-0.5">
            Manage your live products, upload high-res photography to Supabase bucket, and change pricing in real time.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/catalog"
            className="btn-primary px-5 py-2.5 rounded-xl text-xs font-semibold shadow-xs"
          >
            Manage Catalog →
          </Link>
          <Link
            href="/admin/leads"
            className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-[var(--surface)] border border-[var(--border)] hover:bg-[var(--bg-soft)] text-[var(--text)] transition-colors"
          >
            Process RFQs →
          </Link>
        </div>
      </div>

      {/* Recent Leads */}
      <div>
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-[var(--border)]">
          <h2 className="font-display text-xl text-[var(--text)]">Recent leads</h2>
          <Link href="/admin/leads" className="text-sm text-[var(--accent)] hover:underline">
            View all →
          </Link>
        </div>

        {loading ? (
          <div className="py-12 text-center text-[var(--text-muted)] text-sm">Loading...</div>
        ) : recentLeads.length === 0 ? (
          <div className="card-surface p-12 text-center">
            <p className="font-display text-xl text-[var(--text-muted)] mb-2">No leads yet</p>
            <p className="text-sm text-[var(--text-muted)]">
              Enquiries submitted via the public forms will appear here.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--border)]">
                  <th className="text-left py-3 px-4 font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-normal">Name</th>
                  <th className="text-left py-3 px-4 font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-normal">Brand</th>
                  <th className="text-left py-3 px-4 font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-normal">Status</th>
                  <th className="text-left py-3 px-4 font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-normal">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentLeads.map((lead) => (
                  <tr key={lead.id} className="border-b border-[var(--border)] hover:bg-[var(--bg-soft)] transition-colors">
                    <td className="py-3 px-4 font-medium text-[var(--text)]">{lead.full_name}</td>
                    <td className="py-3 px-4">
                      <span className="font-mono text-xs px-2 py-0.5 border border-[var(--border)] text-[var(--text-muted)]">
                        {lead.brand}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`font-mono text-xs uppercase ${
                        lead.status === 'new' ? 'text-[var(--accent)]' :
                        lead.status === 'contacted' ? 'text-amber-500' :
                        lead.status === 'converted' ? 'text-emerald-500' :
                        'text-[var(--text-muted)]'
                      }`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-[var(--text-muted)] text-xs">
                      {new Date(lead.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
