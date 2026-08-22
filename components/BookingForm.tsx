'use client';

import { useState, useRef, useEffect } from 'react';
import { useBrand } from './BrandProvider';

export function BookingForm() {
  const brand = useBrand();
  const [status, setStatus] = useState<'idle' | 'submitting' | 'sent' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const renderedAt = useRef(Date.now());
  
  // Live Tracker State
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
      <div className="py-24 text-center animate-fade-in-up">
        <h3 className="font-display text-4xl md:text-6xl mb-6 text-[var(--accent)] tracking-wider">PROJECT INITIATED</h3>
        <p className="text-theme-body text-xl max-w-2xl mx-auto mb-12">
          Specifications logged successfully. Operations team notified.
        </p>
        <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
          <div className="card-theme p-6 w-full max-w-xs border border-[var(--accent)]">
            <span className="font-mono text-[var(--accent)] mb-2 block">STATUS: COMPLETE</span>
            <span className="font-display text-2xl">Specifications Logged</span>
          </div>
          <div className="w-8 h-px bg-[var(--border)] hidden md:block"></div>
          <div className="card-theme p-6 w-full max-w-xs border border-[var(--border)] animate-pulse">
            <span className="font-mono text-[var(--text-muted)] mb-2 block">STATUS: PENDING</span>
            <span className="font-display text-2xl text-[var(--text-muted)]">Site Visit / Call (ETA: 24h)</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-12 gap-16 w-full max-w-7xl mx-auto">
      {/* Form Section */}
      <form ref={formRef} onSubmit={handleSubmit} onChange={checkProgress} className="md:col-span-8 flex flex-col gap-12">
        <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, overflow: 'hidden' }}>
          <label>
            Website
            <input type="text" name="website" tabIndex={-1} autoComplete="off" />
          </label>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <Field label="FULL NAME // POINT OF CONTACT" name="fullName" required placeholder="Jane Wanjiru" />
          <Field label="PHONE NUMBER" name="phone" required placeholder="07XX XXX XXX" type="tel" />
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <Field label="EMAIL ADDRESS" name="email" type="email" placeholder="jane@company.co.ke" />
          <Field label="PREFERRED TIMELINE" name="preferredDate" type="date" />
        </div>

        <label className="flex flex-col gap-4 group">
          <span className="font-mono text-sm uppercase tracking-widest text-[var(--text-muted)] group-focus-within:text-[var(--accent)] transition-colors">
            REQUIRED SERVICE
          </span>
          <select
            name="service"
            className="appearance-none bg-transparent border-0 border-b border-[var(--border)] pb-4 text-xl md:text-2xl text-[var(--text)] font-display tracking-wide focus:border-[var(--accent)] focus:outline-none transition-colors rounded-none"
          >
            <option value="" className="bg-[var(--bg)]">Select a service</option>
            {brand.services.map((s) => (
              <option key={s.name} value={s.name} className="bg-[var(--bg)]">
                {s.name}
              </option>
            ))}
            <option value="Not sure / other" className="bg-[var(--bg)]">Not sure / other</option>
          </select>
        </label>

        <Field
          label="SITE / DELIVERY LOCATION"
          name="location"
          placeholder="e.g. Westlands, Nairobi — or a building name"
        />

        <label className="flex flex-col gap-4 group">
          <span className="font-mono text-sm uppercase tracking-widest text-[var(--text-muted)] group-focus-within:text-[var(--accent)] transition-colors">
            SPECIFICATIONS (OPTIONAL)
          </span>
          <textarea
            name="message"
            rows={3}
            placeholder="Quantities, sizes, deadline, tender reference..."
            className="bg-transparent border-0 border-b border-[var(--border)] pb-4 text-xl text-[var(--text)] placeholder:text-[var(--border)] focus:border-[var(--accent)] focus:outline-none transition-colors resize-none rounded-none"
          />
        </label>

        {status === 'error' && (
          <p role="alert" className="text-sm font-mono text-[var(--accent2)]">
            // ERROR: {errorMsg}
          </p>
        )}

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="self-start mt-8 card-theme group px-12 py-6 relative overflow-hidden"
        >
          <span className="relative z-10 font-mono text-sm uppercase tracking-widest group-hover:text-[var(--bg)] transition-colors duration-300 font-bold">
            {status === 'submitting' ? 'TRANSMITTING...' : 'TRANSMIT SPECIFICATIONS'}
          </span>
          <div className="absolute inset-0 bg-[var(--accent)] transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out z-0"></div>
        </button>
      </form>

      {/* Live Operations Tracker */}
      <div className="md:col-span-4 hidden md:block">
        <div className="sticky top-32 card-theme p-8 border-t border-[var(--accent)] bg-[var(--surface)]">
          <h4 className="font-display text-xl mb-8 tracking-wider">OPERATIONS TRACKER</h4>
          
          <div className="flex flex-col gap-8 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
            
            {/* Step 1 */}
            <div className="relative flex items-start gap-6">
              <div className={`w-4 h-4 rounded-full border-2 mt-1 flex-shrink-0 transition-colors duration-500 ${formProgress > 0 ? 'bg-[var(--accent)] border-[var(--accent)] shadow-[0_0_10px_var(--accent)]' : 'bg-[var(--bg)] border-[var(--border)]'}`}></div>
              <div>
                <span className={`font-mono text-xs uppercase tracking-widest block mb-1 transition-colors duration-500 ${formProgress > 0 ? 'text-[var(--accent)]' : 'text-[var(--text-muted)]'}`}>
                  {formProgress > 0 ? (status === 'submitting' ? 'TRANSMITTING' : 'LOGGING') : 'PENDING'}
                </span>
                <span className={`font-display text-lg transition-colors duration-500 ${formProgress > 0 ? 'text-[var(--text)]' : 'text-[var(--text-muted)]'}`}>
                  Specifications Received
                </span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative flex items-start gap-6">
              <div className={`w-4 h-4 rounded-full border-2 mt-1 flex-shrink-0 transition-colors duration-500 ${status === 'submitting' ? 'border-[var(--accent)] animate-pulse' : 'bg-[var(--bg)] border-[var(--border)]'}`}></div>
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-[var(--text-muted)] block mb-1">
                  PENDING
                </span>
                <span className="font-display text-lg text-[var(--text-muted)]">
                  Site Visit / Call Scheduled (ETA: 24h)
                </span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative flex items-start gap-6">
              <div className="w-4 h-4 rounded-full bg-[var(--bg)] border-2 border-[var(--border)] mt-1 flex-shrink-0"></div>
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-[var(--text-muted)] block mb-1">
                  PENDING
                </span>
                <span className="font-display text-lg text-[var(--text-muted)]">
                  Quotation Generated
                </span>
              </div>
            </div>

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
    <label className="flex flex-col gap-4 group">
      <span className="font-mono text-sm uppercase tracking-widest text-[var(--text-muted)] group-focus-within:text-[var(--accent)] transition-colors">
        {label}
        {required && <span className="text-[var(--accent2)]"> *</span>}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="bg-transparent border-0 border-b border-[var(--border)] pb-4 text-xl md:text-2xl text-[var(--text)] font-display tracking-wide placeholder:text-[var(--border)] placeholder:font-sans focus:border-[var(--accent)] focus:outline-none transition-colors rounded-none"
      />
    </label>
  );
}
