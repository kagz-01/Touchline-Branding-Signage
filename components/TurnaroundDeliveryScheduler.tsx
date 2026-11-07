'use client';

import { useState } from 'react';

interface CountyZone {
  id: string;
  name: string;
  transitHours: number;
  transitLabel: string;
  courierPartner: string;
}

const COUNTY_ZONES: CountyZone[] = [
  { id: 'nairobi', name: 'Nairobi Metro (CBD, Westlands, Industrial Area, Karen)', transitHours: 6, transitLabel: 'Same-Day Direct Factory Dispatch', courierPartner: 'Touchline Dedicated Fleet' },
  { id: 'central', name: 'Kiambu, Thika, Machakos & Kajiado', transitHours: 18, transitLabel: 'Next-Morning Delivery', courierPartner: 'Touchline Regional Van' },
  { id: 'coast', name: 'Mombasa, Kilifi, Diani & Malindi', transitHours: 24, transitLabel: 'Overnight Dedicated Freight', courierPartner: 'Fargo Courier / G4S Secure' },
  { id: 'rift', name: 'Nakuru, Naivasha & Central Rift', transitHours: 20, transitLabel: 'Next-Day Delivery', courierPartner: 'Speedaf / Fargo' },
  { id: 'western', name: 'Kisumu, Kakamega & Lake Region', transitHours: 28, transitLabel: '24-48h Freight Schedule', courierPartner: 'G4S / Standard Courier' },
  { id: 'north_rift', name: 'Eldoret, Kitale & North Rift', transitHours: 24, transitLabel: 'Overnight Freight', courierPartner: 'Fargo / Wells Fargo' },
  { id: 'frontier', name: 'Garissa, Isiolo, Turkana & Frontier Counties', transitHours: 48, transitLabel: '48h Secure Regional Transit', courierPartner: 'Dedicated Bush Freight / G4S' },
];

export function TurnaroundDeliveryScheduler() {
  const [selectedZoneId, setSelectedZoneId] = useState<string>('nairobi');
  const [batchVolume, setBatchVolume] = useState<'rush' | 'standard' | 'tender'>('standard');
  const [urgency, setUrgency] = useState<'standard' | 'express'>('standard');

  const zone = COUNTY_ZONES.find((z) => z.id === selectedZoneId) || COUNTY_ZONES[0];

  // Base factory production days
  const getBaseProductionDays = () => {
    let days = 4;
    if (batchVolume === 'rush') days = 2; // 24-48h rush
    if (batchVolume === 'tender') days = 8; // Large scale
    if (urgency === 'express') days = Math.max(1, Math.round(days * 0.6));
    return days;
  };

  const productionDays = getBaseProductionDays();
  const transitDays = Math.ceil(zone.transitHours / 24);
  const totalDays = productionDays + transitDays;

  // Compute calculated target date
  const now = new Date();
  const targetDate = new Date(now.getTime() + totalDays * 24 * 60 * 60 * 1000);
  const formattedTargetDate = targetDate.toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <div className="card-theme rounded-[var(--radius-lg)] p-6 md:p-10 border border-[var(--border)] shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-[var(--border)]">
        <div>
          <span className="font-mono text-xs text-[var(--accent)] uppercase tracking-widest font-bold block mb-1">
            KENYA NATIONWIDE LOGISTICS ENGINE
          </span>
          <h3 className="font-display text-2xl md:text-3xl text-[var(--text)]">
            Turnaround & County Delivery Scheduler
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span className="font-mono text-xs text-emerald-500 font-semibold">
            All 47 Counties Supported
          </span>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Left: Input Selection */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <label className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] block mb-2">
              Step 1: Select Delivery Destination County
            </label>
            <select
              value={selectedZoneId}
              onChange={(e) => setSelectedZoneId(e.target.value)}
              className="w-full bg-[var(--bg-soft)] border border-[var(--border)] rounded-lg p-3 text-sm text-[var(--text)] focus:border-[var(--accent)] focus:outline-none"
            >
              {COUNTY_ZONES.map((z) => (
                <option key={z.id} value={z.id}>
                  {z.name} ({z.transitLabel})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] block mb-2">
              Step 2: Production Batch Scale
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'rush', label: 'Rush Run', range: '25 - 100 pcs', desc: 'Rapid 48h turn' },
                { id: 'standard', label: 'Standard Batch', range: '100 - 500 pcs', desc: 'Most popular' },
                { id: 'tender', label: 'Tender Scale', range: '1,000 - 10,000+ pcs', desc: 'Staggered drops' },
              ].map((tier) => (
                <button
                  key={tier.id}
                  onClick={() => setBatchVolume(tier.id as any)}
                  className={`p-3 rounded-lg text-left text-xs transition-all border ${
                    batchVolume === tier.id
                      ? 'border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--text)] font-semibold'
                      : 'border-[var(--border)] bg-[var(--bg-soft)] text-[var(--text-muted)] hover:text-[var(--text)]'
                  }`}
                >
                  <div className="font-bold mb-0.5">{tier.label}</div>
                  <div className="text-[11px] text-[var(--accent)] font-mono">{tier.range}</div>
                  <div className="text-[10px] text-[var(--text-muted)]">{tier.desc}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] block mb-2">
              Step 3: Factory Queue Priority
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 text-xs text-[var(--text)] cursor-pointer">
                <input
                  type="radio"
                  name="urgency"
                  checked={urgency === 'standard'}
                  onChange={() => setUrgency('standard')}
                  className="accent-[var(--accent)]"
                />
                <span>Standard Production Schedule (Normal Rates)</span>
              </label>
              <label className="flex items-center gap-2 text-xs text-[var(--text)] cursor-pointer">
                <input
                  type="radio"
                  name="urgency"
                  checked={urgency === 'express'}
                  onChange={() => setUrgency('express')}
                  className="accent-[var(--accent)]"
                />
                <span className="font-semibold text-[var(--accent)]">
                  Express VIP Priority (+20% Rush Fee)
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Right: Milestone Timeline & Delivery Guarantee */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-lg bg-[var(--bg-soft)] border-2 border-[var(--accent)] shadow-md">
            <span className="font-mono text-[10px] text-[var(--accent)] uppercase tracking-wider font-bold block mb-1">
              ESTIMATED HANDOVER DATE
            </span>
            <div className="font-display text-2xl md:text-3xl font-bold text-[var(--text)] mb-2">
              {formattedTargetDate}
            </div>
            <div className="flex items-center gap-2 text-xs text-emerald-500 font-mono mb-6">
              <span>✓ Guaranteed On-Time or 5% Credit Note</span>
            </div>

            {/* Milestones */}
            <div className="space-y-3 text-xs border-t border-[var(--border)] pt-4">
              <div className="flex justify-between">
                <span className="text-[var(--text-muted)]">Digital Mockup Sign-Off:</span>
                <span className="font-mono font-bold text-[var(--text)]">Day 1 (Within 4 hrs)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-muted)]">Physical Swatch / Strike-Off:</span>
                <span className="font-mono font-bold text-[var(--text)]">Day 2 (Nairobi Workshop)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-muted)]">Mass Production & Finishing:</span>
                <span className="font-mono font-bold text-[var(--text)]">Days 2 to {productionDays}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-muted)]">Quality Assurance & Packaging:</span>
                <span className="font-mono font-bold text-[var(--text)]">Day {productionDays}</span>
              </div>
              <div className="flex justify-between text-emerald-500 font-bold">
                <span>Final Handover ({zone.name.split('(')[0].trim()}):</span>
                <span className="font-mono">Day {totalDays}</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[var(--border)]">
              <div className="text-[11px] text-[var(--text-muted)] mb-3">
                Carrier: <strong className="text-[var(--text)]">{zone.courierPartner}</strong>
              </div>
              <a
                href={`/book?brand=branding&service=${encodeURIComponent(
                  `Scheduled Run to ${zone.name.split('(')[0].trim()} by ${formattedTargetDate}`
                )}`}
                className="btn-primary w-full text-center text-xs font-semibold py-2.5 block"
              >
                Lock In Delivery Slot via TouchDesk <span>→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

