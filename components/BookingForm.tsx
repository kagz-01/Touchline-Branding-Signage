'use client';

import { useState, useRef } from 'react';
import { useBrand } from './BrandProvider';

export function BookingForm() {
  const brand = useBrand();
  const [status, setStatus] = useState<'idle' | 'submitting' | 'sent' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const renderedAt = useRef(Date.now());

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');

    const form = e.currentTarget;
    const data = new FormData(form);

    const payload = {
      brand: brand.id,
      fullName: String(data.get('fullName') || ''),
      phone: String(data.get('phone') || ''),
      email: String(data.get('email') || ''),
      service: String(data.get('service') || ''),
      preferredDate: String(data.get('preferredDate') || ''),
      location: String(data.get('location') || ''),
      message: String(data.get('message') || ''),
      // Spam defenses: honeypot (real visitors never see or fill this field)
      // and a fill-time check (bots tend to submit near-instantly).
      website: String(data.get('website') || ''),
      renderedAt: renderedAt.current
    };

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || 'Something went wrong.');
      }

      setStatus('sent');
      form.reset();
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong.');
    }
  }

  if (status === 'sent') {
    return (
      <div className="rounded-[var(--radius-md)] border border-[var(--accent)] bg-[var(--surface)] p-8 text-center">
        <h3 className="font-display text-2xl mb-2">Request received.</h3>
        <p className="text-[var(--text-muted)]">
          We'll call you on the number you gave us to confirm a time. If it's urgent, call{' '}
          {brand.contactPhone} directly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5 max-w-xl">
      {/* Honeypot \u2014 hidden from real visitors via CSS (not just visually, so
          screen readers skip it too), left unlabeled so autofill ignores it. */}
      <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, overflow: 'hidden' }}>
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Full name" name="fullName" required placeholder="Jane Wanjiru" />
        <Field label="Phone number" name="phone" required placeholder="07XX XXX XXX" type="tel" />
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Email (optional)" name="email" type="email" placeholder="jane@company.co.ke" />
        <Field label="Preferred date (optional)" name="preferredDate" type="date" />
      </div>

      <label className="grid gap-1.5 text-sm">
        <span className="text-[var(--text-muted)]">What do you need?</span>
        <select
          name="service"
          className="rounded-[var(--radius-sm)] border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-[var(--text)]"
        >
          <option value="">Select a service</option>
          {brand.services.map((s) => (
            <option key={s.name} value={s.name}>
              {s.name}
            </option>
          ))}
          <option value="Not sure / other">Not sure / other</option>
        </select>
      </label>

      <Field
        label="Site / delivery location (optional)"
        name="location"
        placeholder="e.g. Westlands, Nairobi \u2014 or a building name"
      />

      <label className="grid gap-1.5 text-sm">
        <span className="text-[var(--text-muted)]">Tell us more (optional)</span>
        <textarea
          name="message"
          rows={4}
          placeholder="Quantities, sizes, deadline, tender reference \u2014 whatever helps us quote accurately."
          className="rounded-[var(--radius-sm)] border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-[var(--text)] placeholder:text-[var(--text-muted)]"
        />
      </label>

      {status === 'error' && (
        <p role="alert" className="text-sm text-[var(--accent2)]">
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="rounded-[var(--radius-sm)] bg-[var(--accent)] text-[var(--accent-ink)] px-6 py-3 font-semibold hover:opacity-90 transition-opacity disabled:opacity-60"
      >
        {status === 'submitting' ? 'Sending\u2026' : 'Send request'}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = 'text',
  required,
  placeholder
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="grid gap-1.5 text-sm">
      <span className="text-[var(--text-muted)]">
        {label}
        {required && <span className="text-[var(--accent2)]"> *</span>}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="rounded-[var(--radius-sm)] border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-[var(--text)] placeholder:text-[var(--text-muted)]"
      />
    </label>
  );
}
