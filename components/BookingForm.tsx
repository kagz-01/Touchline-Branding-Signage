'use client';

import { useState, useRef, useCallback } from 'react';
import type { BrandConfig } from '@/config/brands';

type Step = 1 | 2 | 3;
type Status = 'idle' | 'submitting' | 'sent' | 'error';

const STEPS = [
  { id: 1, label: 'About you', description: 'Your contact details' },
  { id: 2, label: 'The project', description: 'What you need' },
  { id: 3, label: 'Details', description: 'Specs & timeline' },
] as const;

export function BookingForm({ brand }: { brand: BrandConfig }) {
  const [step, setStep] = useState<Step>(1);
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [direction, setDirection] = useState<'forward' | 'back'>('forward');
  const formRef = useRef<HTMLFormElement>(null);
  const renderedAt = useRef(Date.now());

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    service: '',
    preferredDate: '',
    location: '',
    message: '',
  });

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const canProceed = useCallback(() => {
    if (step === 1) return formData.fullName.trim() && formData.phone.trim();
    if (step === 2) return formData.service.trim();
    return true;
  }, [step, formData]);

  const goNext = () => {
    if (step < 3 && canProceed()) {
      setDirection('forward');
      setStep((s) => (s + 1) as Step);
    }
  };

  const goBack = () => {
    if (step > 1) {
      setDirection('back');
      setStep((s) => (s - 1) as Step);
    }
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (step < 3) {
      goNext();
      return;
    }

    setStatus('submitting');
    setErrorMsg('');

    const payload = {
      brand: brand.id,
      ...formData,
      website: '',
      renderedAt: renderedAt.current,
    };

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || 'Something went wrong.');
      }

      setStatus('sent');
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong.');
    }
  }

  if (status === 'sent') {
    return <SuccessState brand={brand} />;
  }

  return (
    <div className="grid md:grid-cols-12 gap-12 w-full">
      {/* Form */}
      <form ref={formRef} onSubmit={handleSubmit} className="md:col-span-8">
        {/* Step indicator */}
        <div className="flex items-center gap-2 mb-10">
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  if (s.id < step) {
                    setDirection('back');
                    setStep(s.id);
                  }
                }}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono transition-all duration-300 ${
                  step === s.id
                    ? 'bg-[var(--accent)] text-[var(--accent-ink)] scale-110'
                    : step > s.id
                    ? 'bg-[var(--accent)]/20 text-[var(--accent)]'
                    : 'bg-[var(--bg-soft)] text-[var(--text-muted)] border border-[var(--border)]'
                }`}
              >
                {step > s.id ? '✓' : s.id}
              </button>
              {i < STEPS.length - 1 && (
                <div className={`w-12 h-px transition-colors duration-500 ${
                  step > s.id ? 'bg-[var(--accent)]' : 'bg-[var(--border)]'
                }`} />
              )}
            </div>
          ))}
          <span className="ml-3 text-mono-label text-[9px]">
            {STEPS[step - 1].label}
          </span>
        </div>

        {/* Step content */}
        <div className="glass rounded-[var(--radius-lg)] p-8 md:p-10 min-h-[340px]">
          <div className={`animate-${direction === 'forward' ? 'fade-in-up' : 'fade-in'}`}>
            {step === 1 && <StepOne formData={formData} updateField={updateField} />}
            {step === 2 && <StepTwo formData={formData} updateField={updateField} brand={brand} />}
            {step === 3 && <StepThree formData={formData} updateField={updateField} />}
          </div>
        </div>

        {/* Error */}
        {status === 'error' && (
          <div className="mt-4 glass rounded-[var(--radius-md)] p-4 border border-red-500/20">
            <p className="text-sm text-red-400">{errorMsg}</p>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8">
          <button
            type="button"
            onClick={goBack}
            disabled={step === 1}
            className={`btn-ghost ${step === 1 ? 'opacity-0 pointer-events-none' : ''}`}
          >
            ← Back
          </button>

          <button
            type="submit"
            disabled={!canProceed() || status === 'submitting'}
            className="btn-primary glow-accent disabled:opacity-40 disabled:pointer-events-none"
          >
            {status === 'submitting' ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Sending...
              </span>
            ) : step < 3 ? (
              'Continue →'
            ) : (
              'Send Quote Request →'
            )}
          </button>
        </div>
      </form>

      {/* Sidebar */}
      <div className="md:col-span-4 hidden md:block">
        <div className="sticky top-32 space-y-6">
          {/* Process card */}
          <div className="glass rounded-[var(--radius-lg)] p-8">
            <h4 className="font-display text-lg mb-6 text-[var(--text)]">What happens next</h4>
            <div className="space-y-5 relative">
              <div className="absolute left-[11px] top-4 bottom-4 w-px bg-[var(--border)]" />
              {[
                { step: 1, title: 'Specs received', desc: 'We review your requirements immediately.' },
                { step: 2, title: 'Site visit or call', desc: 'Our team reaches out within 24 hours.' },
                { step: 3, title: 'Quote delivered', desc: 'Detailed pricing with timeline and materials.' },
              ].map((item) => (
                <div key={item.step} className="relative flex items-start gap-4">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 z-10 transition-all duration-500 ${
                    step > item.step
                      ? 'bg-[var(--accent)] text-[var(--accent-ink)]'
                      : step === item.step
                      ? 'bg-[var(--accent)] text-[var(--accent-ink)] scale-110 glow-accent'
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

          {/* Contact card */}
          <div className="glass rounded-[var(--radius-lg)] p-6">
            <p className="text-mono-label text-[9px] mb-3">Prefer to talk?</p>
            <a
              href={`tel:${brand.contactPhone}`}
              className="flex items-center gap-3 group"
            >
              <div className="w-10 h-10 rounded-full bg-[var(--accent)]/10 flex items-center justify-center group-hover:bg-[var(--accent)]/20 transition-colors">
                <svg className="w-4 h-4 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <span className="text-sm font-semibold text-[var(--text)] block group-hover:text-[var(--accent)] transition-colors">
                  {brand.contactPhone}
                </span>
                <span className="text-xs text-[var(--text-muted)]">Call us directly</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Step Components                                                      */
/* ------------------------------------------------------------------ */

function StepOne({ formData, updateField }: { formData: Record<string, string>; updateField: (f: string, v: string) => void }) {
  return (
    <div className="space-y-8">
      <div>
        <span className="text-mono-label text-[9px] block mb-2">Step 1 of 3</span>
        <h3 className="font-display text-2xl text-[var(--text)] mb-1">About you</h3>
        <p className="text-sm text-[var(--text-muted)]">How do we reach you?</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Field
          label="Full name"
          name="fullName"
          required
          placeholder="Jane Wanjiru"
          value={formData.fullName}
          onChange={(v) => updateField('fullName', v)}
        />
        <Field
          label="Phone number"
          name="phone"
          type="tel"
          required
          placeholder="07XX XXX XXX"
          value={formData.phone}
          onChange={(v) => updateField('phone', v)}
        />
      </div>

      <Field
        label="Email address"
        name="email"
        type="email"
        placeholder="jane@company.co.ke (optional)"
        value={formData.email}
        onChange={(v) => updateField('email', v)}
      />
    </div>
  );
}

function StepTwo({ formData, updateField, brand }: { formData: Record<string, string>; updateField: (f: string, v: string) => void; brand: BrandConfig }) {
  return (
    <div className="space-y-8">
      <div>
        <span className="text-mono-label text-[9px] block mb-2">Step 2 of 3</span>
        <h3 className="font-display text-2xl text-[var(--text)] mb-1">The project</h3>
        <p className="text-sm text-[var(--text-muted)]">What do you need us to do?</p>
      </div>

      <label className="flex flex-col gap-3 group">
        <span className="text-sm font-medium text-[var(--text-muted)] group-focus-within:text-[var(--accent)] transition-colors">
          Service required <span className="text-[var(--accent)]">*</span>
        </span>
        <select
          name="service"
          required
          value={formData.service}
          onChange={(e) => updateField('service', e.target.value)}
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
        value={formData.location}
        onChange={(v) => updateField('location', v)}
      />
    </div>
  );
}

function StepThree({ formData, updateField }: { formData: Record<string, string>; updateField: (f: string, v: string) => void }) {
  return (
    <div className="space-y-8">
      <div>
        <span className="text-mono-label text-[9px] block mb-2">Step 3 of 3</span>
        <h3 className="font-display text-2xl text-[var(--text)] mb-1">Details & timeline</h3>
        <p className="text-sm text-[var(--text-muted)]">Any specific requirements?</p>
      </div>

      <Field
        label="Preferred timeline"
        name="preferredDate"
        type="date"
        value={formData.preferredDate}
        onChange={(v) => updateField('preferredDate', v)}
      />

      <label className="flex flex-col gap-3 group">
        <span className="text-sm font-medium text-[var(--text-muted)] group-focus-within:text-[var(--accent)] transition-colors">
          Specifications & notes
        </span>
        <textarea
          name="message"
          rows={4}
          value={formData.message}
          onChange={(e) => updateField('message', e.target.value)}
          placeholder="Quantities, sizes, colours, deadline, tender reference — anything that helps us quote accurately."
          className="bg-transparent border-b border-[var(--border)] pb-3 text-[var(--text)] placeholder:text-[var(--border)] focus:border-[var(--accent)] focus:outline-none transition-colors resize-none rounded-none"
        />
      </label>

      {/* Summary */}
      <div className="glass-subtle rounded-[var(--radius-md)] p-5 mt-4">
        <p className="text-mono-label text-[9px] mb-3">Your request summary</p>
        <div className="space-y-2 text-sm">
          {formData.fullName && (
            <div className="flex justify-between">
              <span className="text-[var(--text-muted)]">Name</span>
              <span className="text-[var(--text)] font-medium">{formData.fullName}</span>
            </div>
          )}
          {formData.service && (
            <div className="flex justify-between">
              <span className="text-[var(--text-muted)]">Service</span>
              <span className="text-[var(--text)] font-medium">{formData.service}</span>
            </div>
          )}
          {formData.location && (
            <div className="flex justify-between">
              <span className="text-[var(--text-muted)]">Location</span>
              <span className="text-[var(--text)] font-medium">{formData.location}</span>
            </div>
          )}
          {formData.preferredDate && (
            <div className="flex justify-between">
              <span className="text-[var(--text-muted)]">Timeline</span>
              <span className="text-[var(--text)] font-medium">{formData.preferredDate}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Success State                                                        */
/* ------------------------------------------------------------------ */

function SuccessState({ brand }: { brand: BrandConfig }) {
  return (
    <div className="max-w-2xl mx-auto text-center py-12 animate-fade-in-up">
      {/* Checkmark */}
      <div className="w-20 h-20 rounded-full bg-[var(--accent)]/10 flex items-center justify-center mx-auto mb-8 glow-accent">
        <svg className="w-10 h-10 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <h2 className="text-display text-3xl md:text-4xl mb-4 text-balance">
        Request <span className="accent-word">received.</span>
      </h2>

      <p className="text-editorial-lg max-w-lg mx-auto mb-12">
        Our team has your specs. We&apos;ll be in touch within 24 hours to schedule a site visit or call.
      </p>

      {/* Timeline */}
      <div className="glass rounded-[var(--radius-lg)] p-8 text-left mb-8">
        <p className="text-mono-label text-[9px] mb-6">What happens next</p>
        <div className="space-y-6 relative">
          <div className="absolute left-[15px] top-6 bottom-6 w-px bg-[var(--border)]" />

          {[
            {
              step: 1,
              title: 'Specifications received',
              desc: 'Your request is logged and our team is reviewing it.',
              status: 'complete',
              time: 'Now',
            },
            {
              step: 2,
              title: 'Site visit or call',
              desc: `We'll reach out to schedule a convenient time.`,
              status: 'current',
              time: 'Within 24h',
            },
            {
              step: 3,
              title: 'Quotation delivered',
              desc: 'You receive a detailed quote with pricing, timeline, and materials.',
              status: 'upcoming',
              time: '1-3 days',
            },
          ].map((item) => (
            <div key={item.step} className="relative flex items-start gap-4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 z-10 transition-all duration-500 ${
                item.status === 'complete'
                  ? 'bg-[var(--accent)] text-[var(--accent-ink)]'
                  : item.status === 'current'
                  ? 'bg-[var(--accent)]/20 text-[var(--accent)] animate-pulse-subtle'
                  : 'bg-[var(--bg)] text-[var(--text-muted)] border border-[var(--border)]'
              }`}>
                {item.status === 'complete' ? (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <span className="font-mono text-[10px]">{item.step}</span>
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold text-[var(--text)]">{item.title}</span>
                  <span className="text-mono-label text-[8px]">{item.time}</span>
                </div>
                <span className="text-xs text-[var(--text-muted)]">{item.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reference number */}
      <div className="glass-subtle rounded-[var(--radius-md)] p-4 inline-flex items-center gap-3 mb-8">
        <span className="text-mono-label text-[9px]">Reference</span>
        <span className="font-mono text-sm text-[var(--text)]">
          TL-{brand.id.toUpperCase().slice(0, 2)}-{Date.now().toString(36).toUpperCase()}
        </span>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap justify-center gap-4">
        <a href="/" className="btn-secondary glass-subtle">
          ← Back to {brand.name}
        </a>
        <a href={`tel:${brand.contactPhone}`} className="btn-primary">
          Call Us Now →
        </a>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Field Component                                                      */
/* ------------------------------------------------------------------ */

function Field({
  label,
  name,
  type = 'text',
  required,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
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
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-transparent border-b border-[var(--border)] pb-3 text-[var(--text)] placeholder:text-[var(--border)] focus:border-[var(--accent)] focus:outline-none transition-colors rounded-none"
      />
    </label>
  );
}
