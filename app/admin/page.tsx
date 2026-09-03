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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/leads")
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => {
        setLeads(data);
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
    { label: "Total Leads", value: metrics.total, color: "var(--text)" },
    { label: "New", value: metrics.newLeads, color: "var(--accent)" },
    { label: "Contacted", value: metrics.contacted, color: "#f59e0b" },
    { label: "Converted", value: metrics.converted, color: "#10b981" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-10">
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--accent)] mb-2">// Dashboard</p>
        <h1 className="font-display text-3xl md:text-4xl text-[var(--text)]">Welcome back</h1>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metricCards.map((card) => (
          <div key={card.label} className="card-surface p-5">
            <span className="text-xs text-[var(--text-muted)] block mb-2">{card.label}</span>
            <span className="font-display text-3xl" style={{ color: card.color }}>
              {loading ? "—" : card.value}
            </span>
          </div>
        ))}
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
