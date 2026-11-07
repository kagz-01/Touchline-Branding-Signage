'use client';

import { useState } from 'react';
import Link from 'next/link';

interface FastQuoteWidgetProps {
  initialBrand?: 'branding' | 'signage';
}

export function FastQuoteWidget({ initialBrand = 'branding' }: FastQuoteWidgetProps = {}) {
  const [division, setDivision] = useState<'branding' | 'signage'>(initialBrand);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [service, setService] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const [error, setError] = useState('');

  const services =
    division === 'branding'
      ? [
          'Screen Printed & DTF T-Shirts',
          'Executive Embroidered Polos',
          'Corporate Gift Sets & Drinkware',
          'Staff Uniforms & Overalls',
          'Tender-Scale Bulk Merchandise',
          'Other / Custom Sourcing',
        ]
      : [
          '3D Fabricated Acrylic / Steel Letters',
          'Backlit LED Lightbox Signs',
          'Commercial Vehicle & Fleet Wraps',
          'Roadside Pylon & Monument Signs',
          'Interior Reception & Wayfinding',
          'Other / Full Site Signage',
        ];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim() || !service) {
      setError('Please fill in your name, phone number, and select a service.');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          brand: division,
          fullName: fullName.trim(),
          companyName: companyName.trim(),
          phone: phone.trim(),
          service,
          message: `Fast quote request submitted from Touchline Hub homepage.`,
          renderedAt: Date.now() - 3000,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit request.');
      }

      setSubmittedId(data.id || 'OK');
      setSubmitting(false);
    } catch (err: unknown) {
      setSubmitting(false);
      setError(err instanceof Error ? err.message : 'Could not submit. Please try again.');
    }
  }

  if (submittedId) {
    return (
      <div className="card-surface p-8 sm:p-10 rounded-[var(--radius-lg)] border border-emerald-500/30 text-center animate-fade-in">
        <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto mb-4 border border-emerald-500/20">
          <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-display text-2xl text-[var(--text)] mb-2">
          Request Logged with TouchDesk
        </h3>
        <p className="text-sm text-[var(--text-muted)] max-w-md mx-auto mb-6">
          Thank you, <span className="font-medium text-[var(--text)]">{fullName}</span>. Our desk operations team is reviewing your specs and will follow up with an initial quote via WhatsApp or phone within 2 business hours.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href={`https://wa.me/254722668696?text=Hi%20Touchline%2C%20I%20just%20submitted%20a%20quote%20request%20for%20${encodeURIComponent(service)}.%20Name%3A%20${encodeURIComponent(fullName)}`}
            target="_blank"
            rel="noreferrer"
            className="btn-primary text-xs px-5 py-2.5 flex items-center gap-2"
          >
            <span>💬</span> Expedite on WhatsApp
          </a>
          <button
            type="button"
            onClick={() => {
              setSubmittedId(null);
              setService('');
            }}
            className="btn-secondary text-xs px-5 py-2.5"
          >
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="card-surface p-8 sm:p-10 rounded-[var(--radius-lg)] border border-[var(--border)] shadow-xl relative overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--accent)] block mb-1">
            Fast-Track Estimator // TouchDesk Direct
          </span>
          <h3 className="font-display text-2xl sm:text-3xl text-[var(--text)]">
            Get an Initial Estimate
          </h3>
        </div>

        {/* Division Selector */}
        <div className="inline-flex p-1 rounded-xl bg-[var(--bg-soft)] border border-[var(--border)] gap-1">
          <button
            type="button"
            onClick={() => {
              setDivision('branding');
              setService('');
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              division === 'branding'
                ? 'bg-[#c8960c] text-white shadow font-semibold'
                : 'text-[var(--text-muted)] hover:text-[var(--text)]'
            }`}
          >
            Branding (Merch)
          </button>
          <button
            type="button"
            onClick={() => {
              setDivision('signage');
              setService('');
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              division === 'signage'
                ? 'bg-[#0070f3] text-white shadow font-semibold'
                : 'text-[var(--text-muted)] hover:text-[var(--text)]'
            }`}
          >
            Signage (Fabrication)
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid sm:grid-cols-2 gap-6">
          <label className="flex flex-col gap-2">
            <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)]">
              Your Name <span className="text-[var(--accent)]">*</span>
            </span>
            <input
              type="text"
              required
              placeholder="e.g. Samuel Mutua"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="bg-[var(--bg)] border border-[var(--border)] px-4 py-2.5 text-sm text-[var(--text)] rounded-[var(--radius-sm)] focus:border-[var(--accent)] focus:outline-none transition-colors"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)]">
              Phone / WhatsApp <span className="text-[var(--accent)]">*</span>
            </span>
            <input
              type="tel"
              required
              placeholder="07XX XXX XXX"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="bg-[var(--bg)] border border-[var(--border)] px-4 py-2.5 text-sm text-[var(--text)] rounded-[var(--radius-sm)] focus:border-[var(--accent)] focus:outline-none transition-colors"
            />
          </label>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <label className="flex flex-col gap-2">
            <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)]">
              Company / Organisation <span className="text-xs font-normal opacity-60">(Optional)</span>
            </span>
            <input
              type="text"
              placeholder="e.g. Apex Logistics Ltd"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="bg-[var(--bg)] border border-[var(--border)] px-4 py-2.5 text-sm text-[var(--text)] rounded-[var(--radius-sm)] focus:border-[var(--accent)] focus:outline-none transition-colors"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)]">
              Service Category <span className="text-[var(--accent)]">*</span>
            </span>
            <select
              required
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="bg-[var(--bg)] border border-[var(--border)] px-4 py-2.5 text-sm text-[var(--text)] rounded-[var(--radius-sm)] focus:border-[var(--accent)] focus:outline-none transition-colors appearance-none"
            >
              <option value="">Select a service category</option>
              {services.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>
        </div>

        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 rounded text-xs text-red-400">
            {error}
          </div>
        )}

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--text-muted)]">
            🔒 Direct SSL transmission to TouchDesk internal operations queue.
          </p>

          <button
            type="submit"
            disabled={submitting}
            className="w-full sm:w-auto btn-primary px-7 py-3 text-sm disabled:opacity-50"
          >
            {submitting ? 'Sending to Desk...' : 'Request Instant Estimate →'}
          </button>
        </div>
      </form>
    </div>
  );
}

