'use client';

import { useState } from 'react';
import Link from 'next/link';

interface ProductPricingConfig {
  id: string;
  name: string;
  baseUnitCost: number; // base cost at 25 units
  methods: {
    id: string;
    label: string;
    costAdd: number;
    setupFee: number;
  }[];
}

const PRODUCTS: ProductPricingConfig[] = [
  {
    id: 'polo',
    name: 'Executive Pique Polo (220 GSM)',
    baseUnitCost: 1450,
    methods: [
      { id: 'embroidery_chest', label: 'Chest Embroidery (~6k stitches)', costAdd: 200, setupFee: 1500 },
      { id: 'embroidery_multi', label: 'Multi-Location (Chest + Sleeve + Nape)', costAdd: 420, setupFee: 2500 },
      { id: 'dtf_print', label: 'High-Definition DTF Full Color', costAdd: 250, setupFee: 1000 },
      { id: 'screen_print', label: 'Plastisol Screen Print (2 Colors)', costAdd: 150, setupFee: 1800 },
    ],
  },
  {
    id: 'tshirt',
    name: 'Combed Cotton Crewneck T-Shirt (190 GSM)',
    baseUnitCost: 850,
    methods: [
      { id: 'screen_print', label: 'Screen Print (2 Spot Colors)', costAdd: 120, setupFee: 1600 },
      { id: 'dtf_print', label: 'Full Color Front DTF Graphic', costAdd: 220, setupFee: 1000 },
      { id: 'embroidery_chest', label: 'Left Chest Micro-Embroidery', costAdd: 180, setupFee: 1500 },
    ],
  },
  {
    id: 'jacket',
    name: 'Executive Softshell / Fleece Jacket (320 GSM)',
    baseUnitCost: 2850,
    methods: [
      { id: 'embroidery_chest', label: 'Direct Tajima Chest Embroidery', costAdd: 250, setupFee: 1500 },
      { id: 'embroidery_multi', label: 'Chest Crest + Full Back Branding', costAdd: 650, setupFee: 3000 },
      { id: 'laser_emboss', label: 'Subtle Matte Silicone Heat Seal', costAdd: 350, setupFee: 2000 },
    ],
  },
  {
    id: 'tumbler',
    name: 'Thermal Vacuum Tumbler (500ml SS304)',
    baseUnitCost: 1250,
    methods: [
      { id: 'laser_engrave', label: 'Fiber Laser Deep Annealing (Silver/Gold)', costAdd: 180, setupFee: 1200 },
      { id: 'uv_rotary', label: '360° Rotary UV Full-Color Print', costAdd: 320, setupFee: 2000 },
      { id: 'pad_print', label: 'High-Adhesion Pad Print (1 Color)', costAdd: 120, setupFee: 1500 },
    ],
  },
  {
    id: 'notebook',
    name: 'PU Leather Executive Notebook & Pen Set',
    baseUnitCost: 1100,
    methods: [
      { id: 'debossing', label: 'Blind Debossing / Hot Foil Stamping', costAdd: 160, setupFee: 2200 },
      { id: 'uv_dtf', label: 'Metallic UV DTF Relief Badge', costAdd: 220, setupFee: 1200 },
      { id: 'laser_pen', label: 'Laser Engraved Pen + Blind Debossed Book', costAdd: 280, setupFee: 2500 },
    ],
  },
  {
    id: 'ppe',
    name: 'Reflective Safety Vest / Heavy Twill Overall',
    baseUnitCost: 950,
    methods: [
      { id: 'screen_heavy', label: 'Heavy Rubber Screen Print (Back + Front)', costAdd: 140, setupFee: 1600 },
      { id: 'embroidery_heavy', label: 'Industrial Poly-Thread Embroidery', costAdd: 220, setupFee: 1500 },
      { id: 'reflective_transfer', label: 'EN471 Class 2 Reflective Heat Transfer', costAdd: 300, setupFee: 1800 },
    ],
  },
];

export function BulkPricingMatrix() {
  const [selectedProductId, setSelectedProductId] = useState<string>('polo');
  const [selectedMethodIdx, setSelectedMethodIdx] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(100);

  // Ingestion to TouchDesk
  const [submitting, setSubmitting] = useState(false);
  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [showDirectModal, setShowDirectModal] = useState(false);
  const [submissionError, setSubmissionError] = useState('');

  const product = PRODUCTS.find((p) => p.id === selectedProductId) || PRODUCTS[0];
  const method = product.methods[selectedMethodIdx] || product.methods[0];

  // Volume discount calculation curve
  const getVolumeMultiplier = (qty: number): number => {
    if (qty >= 2500) return 0.58; // 42% discount
    if (qty >= 1000) return 0.65; // 35% discount
    if (qty >= 500) return 0.72; // 28% discount
    if (qty >= 250) return 0.80; // 20% discount
    if (qty >= 100) return 0.88; // 12% discount
    if (qty >= 50) return 0.94; // 6% discount
    return 1.0; // standard at 25
  };

  const multiplier = getVolumeMultiplier(quantity);
  const unitPrice = Math.round((product.baseUnitCost + method.costAdd) * multiplier);
  const isSetupWaived = quantity >= 100;
  const effectiveSetupFee = isSetupWaived ? 0 : method.setupFee;
  const totalCost = unitPrice * quantity + effectiveSetupFee;

  // Turnaround days calculation
  const turnaroundText =
    quantity <= 100
      ? '3 - 4 Working Days'
      : quantity <= 500
      ? '5 - 7 Working Days'
      : quantity <= 2000
      ? '8 - 10 Working Days'
      : '10 - 14 Working Days (Staggered Delivery Available)';

  async function handleDirectSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!clientName.trim() || !clientPhone.trim()) {
      setSubmissionError('Please provide your name and phone number.');
      return;
    }

    setSubmitting(true);
    setSubmissionError('');

    try {
      const summaryMessage = `Bulk Pricing Configurator Order:
- Product: ${product.name}
- Decoration Method: ${method.label}
- Quantity: ${quantity} units
- Estimated Unit Price: KES ${unitPrice.toLocaleString()}
- Total Estimated Investment: KES ${totalCost.toLocaleString()}
- Setup Fee: ${isSetupWaived ? 'WAIVED (100+ units)' : `KES ${effectiveSetupFee}`}
- Expected Turnaround: ${turnaroundText}`;

      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          brand: 'branding',
          name: clientName,
          phone: clientPhone,
          company: companyName || undefined,
          service: `${product.name} (${quantity} units)`,
          message: summaryMessage,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit request');
      }

      setSubmittedId(data.id || data.reference || 'TD-TBR-CONFIRMED');
    } catch (err: any) {
      setSubmissionError(err.message || 'Error communicating with TouchDesk');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="card-theme rounded-[var(--radius-lg)] p-6 md:p-10 border border-[var(--border)] shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-[var(--border)]">
        <div>
          <span className="font-mono text-xs text-[var(--accent)] uppercase tracking-widest font-bold block mb-1">
            REAL-TIME VOLUME ALGORITHM
          </span>
          <h3 className="font-display text-2xl md:text-3xl text-[var(--text)]">
            Bulk Quantity & Decoration Pricing Matrix
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-mono text-xs text-emerald-500 font-semibold">
            Setup Fees Waived on 100+ Units
          </span>
        </div>
      </div>

      {/* Product Selection Chips */}
      <div className="mb-6">
        <label className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] block mb-2">
          Step 1: Choose Garment or Merchandise
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {PRODUCTS.map((p) => (
            <button
              key={p.id}
              onClick={() => {
                setSelectedProductId(p.id);
                setSelectedMethodIdx(0);
              }}
              className={`p-3 rounded-lg text-left text-xs font-medium transition-all ${
                selectedProductId === p.id
                  ? 'bg-[var(--accent)] text-[var(--accent-ink)] font-semibold shadow-md'
                  : 'bg-[var(--bg-soft)] text-[var(--text-muted)] hover:text-[var(--text)] border border-[var(--border)]'
              }`}
            >
              {p.name.split('(')[0].trim()}
            </button>
          ))}
        </div>
      </div>

      {/* Method Selection Chips */}
      <div className="mb-8">
        <label className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] block mb-2">
          Step 2: Choose Branding & Decoration Technique
        </label>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {product.methods.map((m, idx) => (
            <button
              key={m.id}
              onClick={() => setSelectedMethodIdx(idx)}
              className={`p-3 rounded-lg text-left text-xs transition-all ${
                selectedMethodIdx === idx
                  ? 'bg-[var(--accent)]/15 border-2 border-[var(--accent)] text-[var(--text)] font-semibold'
                  : 'bg-[var(--bg-soft)] text-[var(--text-muted)] hover:text-[var(--text)] border border-[var(--border)]'
              }`}
            >
              <div className="font-medium mb-1">{m.label}</div>
              <div className="text-[10px] text-[var(--text-muted)]">
                {isSetupWaived ? 'Setup fee: KES 0 (Waived)' : `Setup fee: KES ${m.setupFee}`}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Quantity Slider */}
      <div className="p-6 rounded-lg bg-[var(--bg-soft)] border border-[var(--border)] mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div>
            <label className="text-sm font-semibold text-[var(--text)] block">
              Step 3: Select Order Volume
            </label>
            <span className="text-xs text-[var(--text-muted)]">
              Higher volumes trigger automatic factory manufacturing price discounts
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-2xl font-bold text-[var(--accent)]">
              {quantity.toLocaleString()}
            </span>
            <span className="font-mono text-xs uppercase tracking-wider text-[var(--text-muted)]">
              Units
            </span>
          </div>
        </div>

        <input
          type="range"
          min={25}
          max={3000}
          step={25}
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="w-full accent-[var(--accent)] cursor-pointer h-2 bg-[var(--border)] rounded-lg mb-4"
        />

        {/* Quick Volume Preset Buttons */}
        <div className="flex flex-wrap gap-2">
          {[50, 100, 250, 500, 1000, 2500].map((preset) => (
            <button
              key={preset}
              onClick={() => setQuantity(preset)}
              className={`px-3 py-1 rounded text-xs font-mono transition-colors ${
                quantity === preset
                  ? 'bg-[var(--accent)] text-[var(--accent-ink)] font-bold'
                  : 'bg-[var(--bg)] text-[var(--text-muted)] hover:text-[var(--text)] border border-[var(--border)]'
              }`}
            >
              {preset} pcs
            </button>
          ))}
        </div>
      </div>

      {/* Calculation Summary Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="p-5 rounded-lg bg-[var(--bg-soft)] border border-[var(--border)]">
          <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-wider block mb-1">
            Unit Price (Factory Rate)
          </span>
          <div className="font-display text-2xl font-bold text-[var(--accent)]">
            KES {unitPrice.toLocaleString()}
          </div>
          <span className="text-[10px] text-emerald-500 font-mono">
            {Math.round((1 - multiplier) * 100)}% Volume Savings
          </span>
        </div>

        <div className="p-5 rounded-lg bg-[var(--bg-soft)] border border-[var(--border)]">
          <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-wider block mb-1">
            Setup & Digitizing Fee
          </span>
          <div className="font-display text-2xl font-bold text-[var(--text)]">
            {isSetupWaived ? 'KES 0' : `KES ${effectiveSetupFee.toLocaleString()}`}
          </div>
          <span className="text-[10px] text-[var(--text-muted)] font-mono">
            {isSetupWaived ? 'Waived for ≥ 100 pcs' : 'Applied on < 100 pcs'}
          </span>
        </div>

        <div className="p-5 rounded-lg bg-[var(--bg-soft)] border border-[var(--border)]">
          <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-wider block mb-1">
            Production Timeline
          </span>
          <div className="font-display text-lg font-bold text-[var(--text)] mt-1">
            {turnaroundText.split('(')[0]}
          </div>
          <span className="text-[10px] text-[var(--text-muted)]">Nairobi dispatch or nationwide freight</span>
        </div>

        <div className="p-5 rounded-lg bg-[var(--accent)]/10 border-2 border-[var(--accent)]">
          <span className="font-mono text-[10px] text-[var(--accent)] uppercase tracking-wider font-bold block mb-1">
            Total Project Estimate
          </span>
          <div className="font-display text-2xl font-bold text-[var(--accent)]">
            KES {totalCost.toLocaleString()}
          </div>
          <span className="text-[10px] text-[var(--text-muted)]">VAT inclusive / ETR compliant</span>
        </div>
      </div>

      {/* CTA: Direct TouchDesk Submission Modal Trigger */}
      {!submittedId ? (
        <div className="p-6 rounded-lg bg-gradient-to-r from-[var(--bg-soft)] via-[var(--bg)] to-[var(--bg-soft)] border border-[var(--border)] flex flex-wrap items-center justify-between gap-4">
          <div>
            <h4 className="font-display text-base font-semibold text-[var(--text)] mb-1">
              Lock in this factory estimate directly in TouchDesk
            </h4>
            <p className="text-xs text-[var(--text-muted)]">
              Submits directly to our production manager to generate your formal quote & sample proof.
            </p>
          </div>

          {!showDirectModal ? (
            <button
              onClick={() => setShowDirectModal(true)}
              className="btn-primary px-6 py-3 text-sm font-semibold glow-accent"
            >
              Dispatch to TouchDesk <span>→</span>
            </button>
          ) : null}
        </div>
      ) : null}

      {/* Inline Direct Ingestion Form */}
      {showDirectModal && !submittedId && (
        <form onSubmit={handleDirectSubmit} className="mt-6 p-6 rounded-lg bg-[var(--surface)] border-2 border-[var(--accent)] space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[var(--border)]">
            <h4 className="font-display text-sm font-bold text-[var(--text)]">
              Direct Production Dispatch: {product.name} ({quantity} units)
            </h4>
            <button
              type="button"
              onClick={() => setShowDirectModal(false)}
              className="text-xs text-[var(--text-muted)] hover:text-[var(--text)]"
            >
              ✕ Cancel
            </button>
          </div>

          {submissionError && (
            <div className="p-3 rounded bg-red-500/10 border border-red-500/30 text-xs text-red-400">
              {submissionError}
            </div>
          )}

          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-mono uppercase text-[var(--text-muted)] block mb-1">
                Your Full Name *
              </label>
              <input
                type="text"
                required
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="Jane Mwangi"
                className="w-full bg-[var(--bg-soft)] border border-[var(--border)] rounded px-3 py-2 text-sm text-[var(--text)] focus:outline-none focus:border-[var(--accent)]"
              />
            </div>

            <div>
              <label className="text-xs font-mono uppercase text-[var(--text-muted)] block mb-1">
                Phone Number (WhatsApp) *
              </label>
              <input
                type="tel"
                required
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                placeholder="+254 712 345 678"
                className="w-full bg-[var(--bg-soft)] border border-[var(--border)] rounded px-3 py-2 text-sm text-[var(--text)] focus:outline-none focus:border-[var(--accent)]"
              />
            </div>

            <div>
              <label className="text-xs font-mono uppercase text-[var(--text-muted)] block mb-1">
                Company / Organization (Optional)
              </label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Apex Holdings Ltd"
                className="w-full bg-[var(--bg-soft)] border border-[var(--border)] rounded px-3 py-2 text-sm text-[var(--text)] focus:outline-none focus:border-[var(--accent)]"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setShowDirectModal(false)}
              className="btn-ghost text-xs"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="btn-primary text-xs font-semibold py-2 px-6"
            >
              {submitting ? 'Connecting to TouchDesk...' : 'Confirm & Ingest to TouchDesk →'}
            </button>
          </div>
        </form>
      )}

      {/* Confirmation State */}
      {submittedId && (
        <div className="mt-6 p-6 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-center space-y-2">
          <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto text-lg font-bold">
            ✓
          </div>
          <h4 className="font-display text-lg font-bold text-[var(--text)]">
            Estimate Ingested into TouchDesk!
          </h4>
          <p className="text-xs text-[var(--text-muted)] max-w-md mx-auto">
            Your quotation request has been received by our production estimating team.
          </p>
          <div className="font-mono text-sm font-bold text-emerald-500">
            Reference ID: {submittedId}
          </div>
          <div className="pt-2">
            <a
              href={`https://wa.me/254722668696?text=Hi%20Touchline%2C%20I%20just%20submitted%20estimate%20${encodeURIComponent(
                submittedId
              )}%20for%20${quantity}%20${encodeURIComponent(product.name)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-xs font-mono text-[var(--accent)] hover:underline"
            >
              Send WhatsApp notification to desk →
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

