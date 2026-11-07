'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

type RequestType = 'quote' | 'delivery_note' | 'invoice' | 'general';
type Priority = 'low' | 'normal' | 'high' | 'urgent';

const TYPES: { value: RequestType; label: string; desc: string; icon: string }[] = [
  { value: 'quote',         label: 'Request a Quote',   desc: 'Get pricing for a new project',           icon: '💼' },
  { value: 'invoice',       label: 'Request Invoice',   desc: 'Get an invoice for completed work',        icon: '🧾' },
  { value: 'delivery_note', label: 'Delivery Note',     desc: 'Request a delivery note for your order',   icon: '📦' },
  { value: 'general',       label: 'General Request',   desc: 'Any other inquiry or support needed',      icon: '📋' },
];

export default function NewRequestForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preType = (searchParams?.get('type') ?? 'quote') as RequestType;

  const [step, setStep]           = useState(1);
  const [type, setType]           = useState<RequestType>(preType);
  const [title, setTitle]         = useState('');
  const [description, setDesc]    = useState('');
  const [priority, setPriority]   = useState<Priority>('normal');
  const [division, setDivision]   = useState<'branding' | 'signage' | 'hub'>('hub');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError]         = useState('');
  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => { if (step === 2) titleRef.current?.focus(); }, [step]);

  const submit = async () => {
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch('/api/client/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, title, description, priority, division }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Something went wrong');
      router.push(`/client-dashboard/requests/${data.request.id}`);
    } catch (e: any) {
      setError(e.message);
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[var(--text)]">New Request</h1>
        <p className="text-sm text-[var(--text-muted)] mt-1">We'll review and get back to you within 24 hours.</p>
      </div>

      {/* Step indicator */}
      <div className="flex items-center gap-2">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${
              step > s ? 'bg-[var(--accent)] border-[var(--accent)] text-[var(--accent-ink)]' :
              step === s ? 'border-[var(--accent)] text-[var(--accent)]' :
              'border-[var(--border)] text-[var(--text-muted)]'
            }`}>{step > s ? '✓' : s}</span>
            {s < 3 && <div className={`flex-1 h-px w-8 ${step > s ? 'bg-[var(--accent)]' : 'bg-[var(--border)]'}`} />}
          </div>
        ))}
        <span className="ml-2 text-xs text-[var(--text-muted)]">
          {step === 1 ? 'Request type' : step === 2 ? 'Details' : 'Review'}
        </span>
      </div>

      {/* Step 1: Type selection */}
      {step === 1 && (
        <div className="space-y-3">
          <p className="text-sm font-medium text-[var(--text)]">What do you need?</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {TYPES.map((t) => (
              <button
                key={t.value}
                onClick={() => setType(t.value)}
                className={`text-left p-4 rounded-2xl border-2 transition-all ${
                  type === t.value
                    ? 'border-[var(--accent)] bg-[var(--accent)]/5'
                    : 'border-[var(--border)] bg-[var(--surface)] hover:border-[var(--accent)]/50'
                }`}
              >
                <span className="text-2xl">{t.icon}</span>
                <p className="mt-2 font-semibold text-sm text-[var(--text)]">{t.label}</p>
                <p className="text-xs text-[var(--text-muted)] mt-0.5">{t.desc}</p>
              </button>
            ))}
          </div>
          <button onClick={() => setStep(2)} className="btn-primary w-full py-3 font-semibold">
            Continue →
          </button>
        </div>
      )}

      {/* Step 2: Details */}
      {step === 2 && (
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-[var(--text)] mb-2">Request title *</label>
            <input
              ref={titleRef}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={type === 'quote' ? 'e.g. 500 branded polo shirts for AGM' : type === 'invoice' ? 'e.g. Invoice for signage installation' : 'Brief title…'}
              className="w-full px-4 py-3 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-[var(--text)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--text)] mb-2">Description *</label>
            <textarea
              value={description}
              onChange={(e) => setDesc(e.target.value)}
              rows={5}
              placeholder="Provide as much detail as possible — quantities, specifications, deadlines, budget range…"
              className="w-full px-4 py-3 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-[var(--text)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition-colors resize-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[var(--text)] mb-2">Division</label>
              <select
                value={division}
                onChange={(e) => setDivision(e.target.value as any)}
                className="w-full px-4 py-3 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-[var(--text)] focus:outline-none focus:border-[var(--accent)] transition-colors"
              >
                <option value="hub">Not sure</option>
                <option value="branding">Branding</option>
                <option value="signage">Signage</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--text)] mb-2">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as Priority)}
                className="w-full px-4 py-3 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-[var(--text)] focus:outline-none focus:border-[var(--accent)] transition-colors"
              >
                <option value="low">Low</option>
                <option value="normal">Normal</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={() => setStep(1)} className="flex-1 py-3 rounded-xl border border-[var(--border)] text-[var(--text)] hover:bg-[var(--surface)] transition-colors font-medium text-sm">
              ← Back
            </button>
            <button
              onClick={() => { if (title.trim() && description.trim()) setStep(3); }}
              disabled={!title.trim() || !description.trim()}
              className="flex-1 btn-primary py-3 font-semibold disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Review →
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Review */}
      {step === 3 && (
        <div className="space-y-5">
          <div className="p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border)] space-y-4">
            <div className="flex justify-between items-start">
              <span className="text-2xl">{TYPES.find((t) => t.value === type)?.icon}</span>
              <span className="text-xs font-mono uppercase text-[var(--text-muted)] bg-[var(--bg-soft)] px-2 py-1 rounded">{type.replace('_', ' ')}</span>
            </div>
            <div>
              <p className="text-xs text-[var(--text-muted)] uppercase font-mono tracking-wider mb-1">Title</p>
              <p className="font-semibold text-[var(--text)]">{title}</p>
            </div>
            <div>
              <p className="text-xs text-[var(--text-muted)] uppercase font-mono tracking-wider mb-1">Description</p>
              <p className="text-sm text-[var(--text)] whitespace-pre-wrap">{description}</p>
            </div>
            <div className="flex gap-6">
              <div>
                <p className="text-xs text-[var(--text-muted)] uppercase font-mono tracking-wider mb-1">Division</p>
                <p className="text-sm capitalize text-[var(--text)]">{division}</p>
              </div>
              <div>
                <p className="text-xs text-[var(--text-muted)] uppercase font-mono tracking-wider mb-1">Priority</p>
                <p className="text-sm capitalize text-[var(--text)]">{priority}</p>
              </div>
            </div>
          </div>
          {error && <p className="text-sm text-red-500 bg-red-50 dark:bg-red-900/20 px-4 py-3 rounded-xl">{error}</p>}
          <div className="flex gap-3">
            <button onClick={() => setStep(2)} className="flex-1 py-3 rounded-xl border border-[var(--border)] text-[var(--text)] hover:bg-[var(--surface)] transition-colors font-medium text-sm">
              ← Edit
            </button>
            <button
              onClick={submit}
              disabled={submitting}
              className="flex-1 btn-primary py-3 font-semibold disabled:opacity-50"
            >
              {submitting ? 'Sending…' : 'Submit Request ✓'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

