'use client';

import { useState, useRef } from 'react';
import { useBrand } from './BrandProvider';

export function BookingForm() {
  const brand = useBrand();
  const [status, setStatus] = useState<'idle' | 'submitting' | 'sent' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const renderedAt = useRef(Date.now());
  const [formProgress, setFormProgress] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);

  const checkProgress = () => {
    if (!formRef.current) return;
    const data = new FormData(formRef.current);
    let filled = 0;
    if (data.get('fullName')) filled++;
    if (data.get('phone')) filled++;
    if (data.get('service')) filled++;
    setFormProgress(filled);
  };

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
      setFormProgress(0);
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong.');
    }
  }

  if (status === 'sent') {
    return (
      <div className="section-py text-center animate-fade-in-up">
        <div className="w-16 h-16 rounded-full bg-[var(--accent)]/10 flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-display text-3xl md:text-4xl mb-4 text-[var(--text)]">Quote request sent.</h3>
        <p className="text-[var(--text-muted)] text-lg max-w-xl mx-auto mb-8">
          We&apos;ve received your specifications. Our team will reach out within 24 hours to schedule a site visit or call.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <div className="card-surface p-5 w-full max-w-xs border border-[var(--accent)]/30">
            <span className="font-mono text-[var(--accent)] text-xs mb-1 block">STATUS: RECEIVED</span>
            <span className="font-display text-lg text-[var(--text)]">Specifications logged</span>
          </div>
          <div className="w-px h-8 bg-[var(--border)] hidden sm:block" />
          <div className="card-surface p-5 w-full max-w-xs animate-pulse-subtle">
            <span className="font-mono text-[var(--text-muted)] text-xs mb-1 block">STATUS: NEXT</span>
            <span className="font-display text-lg text-[var(--text-muted)]">Site visit / call (ETA: 24h)</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-12 gap-12 w-full max-w-7xl mx-auto">
      <form ref={formRef} onSubmit={handleSubmit} onChange={checkProgress} className="md:col-span-8 flex flex-col gap-10">
        <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, overflow: 'hidden' }}>
          <label>
            Website
            <input type="text" name="website" tabIndex={-1} autoComplete="off" />
          </label>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          <Field label="Full name" name="fullName" required placeholder="Jane Wanjiru" />
          <Field label="Phone number" name="phone" required placeholder="07XX XXX XXX" type="tel" />
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          <Field label="Email address" name="email" type="email" placeholder="jane@company.co.ke" />
          <Field label="Preferred timeline" name="preferredDate" type="date" />
        </div>

        <label className="flex flex-col gap-3 group">
          <span className="text-sm font-medium text-[var(--text-muted)] group-focus-within:text-[var(--accent)] transition-colors">
            Required service <span className="text-[var(--accent)]">*</span>
          </span>
          <select
            name="service"
            required
            className="appearance-none bg-transparent border-b border-[var(--border)] pb-3 text-[var(--text)] focus:border-[var(--accent)] focus:outline-none transition-colors rounded-none"
          >
            <option value="" className="bg-[var(--bg)]">Select a service</option>
            {brand.serviceCategories.map((cat) => (
              <optgroup key={cat.name} label={cat.name}>
                {cat.services.map((s) => (
                  <option key={s.name} value={s.name} className="bg-[var(--bg)]">
                    {s.name}
                  </option>
                ))}
              </optgroup>
            ))}
            <option value="Not sure / other" className="bg-[var(--bg)]">Not sure / other</option>
          </select>
        </label>

        <Field
          label="Site / delivery location"
          name="location"
          placeholder="e.g. Westlands, Nairobi — or a building name"
        />

        <label className="flex flex-col gap-3 group">
          <span className="text-sm font-medium text-[var(--text-muted)] group-focus-within:text-[var(--accent)] transition-colors">
            Specifications (optional)
          </span>
          <textarea
            name="message"
            rows={3}
            placeholder="Quantities, sizes, deadline, tender reference..."
            className="bg-transparent border-b border-[var(--border)] pb-3 text-[var(--text)] placeholder:text-[var(--border)] focus:border-[var(--accent)] focus:outline-none transition-colors resize-none rounded-none"
          />
        </label>

        {status === 'error' && (
          <p role="alert" className="text-sm text-[var(--accent)] bg-[var(--accent)]/5 p-3 rounded-[var(--radius-sm)]">
            {errorMsg}
          </p>
        )}

        {/* Progress */}
        <div className="flex items-center gap-3">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center gap-2">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-mono transition-all duration-300 ${
                formProgress >= step
                  ? 'bg-[var(--accent)] text-[var(--accent-ink)]'
                  : 'bg-[var(--bg-soft)] text-[var(--text-muted)] border border-[var(--border)]'
              }`}>
                {formProgress >= step ? '✓' : step}
              </div>
              {step < 3 && (
                <div className={`w-8 h-px transition-colors duration-300 ${
                  formProgress >= step ? 'bg-[var(--accent)]' : 'bg-[var(--border)]'
                }`} />
              )}
            </div>
          ))}
          <span className="font-mono text-[10px] text-[var(--text-muted)] ml-2">
            {formProgress === 0 ? 'Get started' : formProgress < 3 ? 'Keep going' : 'Ready to send'}
          </span>
        </div>

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="self-start btn-primary group relative overflow-hidden"
        >
          <span className="relative z-10">
            {status === 'submitting' ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Sending...
              </span>
            ) : (
              'Send Quote Request'
            )}
          </span>
        </button>
      </form>

      {/* Sidebar */}
      <div className="md:col-span-4 hidden md:block">
        <div className="sticky top-32 card-surface p-8">
          <h4 className="font-display text-lg mb-6 text-[var(--text)]">What happens next</h4>

          <div className="space-y-6 relative">
            <div className="absolute left-[11px] top-4 bottom-4 w-px bg-[var(--border)]" />

            {[
              { step: 1, title: 'Specifications received', desc: 'We review your requirements and confirm receipt.' },
              { step: 2, title: 'Site visit or call', desc: 'Our team reaches out within 24 hours to schedule.' },
              { step: 3, title: 'Quotation delivered', desc: 'You receive a detailed quote with timeline and pricing.' },
            ].map((item) => (
              <div key={item.step} className="relative flex items-start gap-4">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 z-10 transition-colors duration-300 ${
                  formProgress >= item.step
                    ? 'bg-[var(--accent)] text-[var(--accent-ink)]'
                    : 'bg-[var(--bg)] text-[var(--text-muted)] border border-[var(--border)]'
                }`}>
                  <span className="font-mono text-[10px]">{item.step}</span>
                </div>
                <div>
                  <span className="text-sm font-semibold text-[var(--text)] block">{item.title}</span>
                  <span className="text-xs text-[var(--text-muted)]">{item.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
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
    <label className="flex flex-col gap-3 group">
      <span className="text-sm font-medium text-[var(--text-muted)] group-focus-within:text-[var(--accent)] transition-colors">
        {label}
        {required && <span className="text-[var(--accent)]"> *</span>}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="bg-transparent border-b border-[var(--border)] pb-3 text-[var(--text)] placeholder:text-[var(--border)] focus:border-[var(--accent)] focus:outline-none transition-colors rounded-none"
      />
    </label>
  );
}
