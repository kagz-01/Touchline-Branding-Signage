'use client';

import { useState } from 'react';
import { Reveal } from './Reveal';

const PRODUCTS: { name: string; cost: number; impressionsPerDay: number; lifespanDays: number; icon: React.ReactNode }[] = [
  { name: 'Branded T-Shirt', cost: 500, impressionsPerDay: 3000, lifespanDays: 365, icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6"><path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.47a1 1 0 00.99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.47a2 2 0 00-1.34-2.23z" /></svg> },
  { name: 'Branded Pen', cost: 30, impressionsPerDay: 2000, lifespanDays: 730, icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6"><path d="M17 3a2.83 2.83 0 114 4L7.5 20.5 2 22l1.5-5.5L17 3z" /></svg> },
  { name: 'Branded Mug', cost: 250, impressionsPerDay: 1500, lifespanDays: 1825, icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6"><path d="M17 8h1a4 4 0 110 8h-1" /><path d="M3 8h14v9a4 4 0 01-4 4H7a4 4 0 01-4-4V8z" /><line x1="6" y1="2" x2="6" y2="4" /><line x1="10" y1="2" x2="10" y2="4" /><line x1="14" y1="2" x2="14" y2="4" /></svg> },
  { name: 'Branded Tote Bag', cost: 200, impressionsPerDay: 5000, lifespanDays: 365, icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 01-8 0" /></svg> },
  { name: 'Branded Water Bottle', cost: 400, impressionsPerDay: 2500, lifespanDays: 1095, icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6"><path d="M8 2h8v4H8z" /><path d="M6 6h12l-1 16H7L6 6z" /><path d="M10 2v2" /><path d="M14 2v2" /></svg> },
  { name: 'Branded Cap', cost: 250, impressionsPerDay: 3500, lifespanDays: 365, icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6"><path d="M4 18V12a8 8 0 0116 0v6" /><path d="M4 18h16" /><path d="M2 14h20" /></svg> },
  { name: 'Branded Notebook', cost: 200, impressionsPerDay: 1000, lifespanDays: 365, icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6"><path d="M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2z" /><line x1="8" y1="2" x2="8" y2="22" /><line x1="12" y1="8" x2="18" y2="8" /><line x1="12" y1="12" x2="18" y2="12" /></svg> },
  { name: 'Branded Power Bank', cost: 800, impressionsPerDay: 4000, lifespanDays: 730, icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6"><rect x="2" y="7" width="16" height="10" rx="2" /><line x1="22" y1="11" x2="22" y2="13" /><line x1="6" y1="11" x2="6" y2="13" /><line x1="10" y1="11" x2="10" y2="13" /></svg> },
];

export function BrandingROICalculator() {
  const [selectedProduct, setSelectedProduct] = useState(0);
  const [quantity, setQuantity] = useState(100);
  const [impressionsMultiplier, setImpressionsMultiplier] = useState(1);

  const product = PRODUCTS[selectedProduct];
  const totalCost = product.cost * quantity;
  const totalImpressions = product.impressionsPerDay * product.lifespanDays * impressionsMultiplier * quantity;
  const costPerImpression = totalCost / totalImpressions;
  const impressionsPerKES = Math.round(totalImpressions / totalCost);

  return (
    <div className="space-y-6">
      {/* Product Selection */}
      <div className="card-surface rounded-2xl p-6 sm:p-8 border border-[var(--border)] shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-4 border-b border-[var(--border)]">
          <div>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-[var(--text)]">
              Branded Merchandise ROI Simulator
            </h3>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1">
              Calculate impressions and true cost-per-reach for staff apparel and corporate merchandise.
            </p>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] font-semibold w-fit">
            Walking Billboard Engine
          </span>
        </div>

        {/* Product selector grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 mb-8">
          {PRODUCTS.map((p, i) => (
            <button
              key={p.name}
              onClick={() => setSelectedProduct(i)}
              className={`p-3.5 rounded-xl text-left transition-all duration-200 border flex flex-col justify-between min-h-[88px] ${
                selectedProduct === i
                  ? 'bg-[var(--accent)] text-neutral-950 font-bold border-[var(--accent)] shadow-md shadow-[var(--accent)]/20 scale-[1.02]'
                  : 'bg-[var(--bg-soft)] text-[var(--text)] border-[var(--border)] hover:border-[var(--accent)]/50 hover:bg-[var(--surface)]'
              }`}
            >
              <span className={`block mb-2 ${selectedProduct === i ? 'text-neutral-950' : 'text-[var(--accent)]'}`}>
                {p.icon}
              </span>
              <span className="text-xs leading-snug">{p.name}</span>
            </button>
          ))}
        </div>

        {/* Controls: Quantity & Staff Multiplier */}
        <div className="grid sm:grid-cols-2 gap-6 pt-6 border-t border-[var(--border)]">
          {/* Quantity */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="font-mono text-xs text-[var(--text-muted)] uppercase tracking-wider font-semibold">
                Order Quantity
              </label>
              <div className="font-mono text-sm font-bold text-[var(--accent)] bg-[var(--bg-soft)] px-2.5 py-0.5 rounded border border-[var(--border)]">
                {quantity.toLocaleString()} units
              </div>
            </div>
            <input
              type="range"
              min="20"
              max="2000"
              step="20"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full h-2 rounded-lg bg-[var(--border)] appearance-none cursor-pointer accent-[var(--accent)]"
            />
            <div className="flex justify-between text-[10px] font-mono text-[var(--text-muted)] mt-1.5">
              <button onClick={() => setQuantity(50)} className="hover:text-[var(--text)]">50</button>
              <button onClick={() => setQuantity(100)} className="hover:text-[var(--text)]">100</button>
              <button onClick={() => setQuantity(250)} className="hover:text-[var(--text)]">250</button>
              <button onClick={() => setQuantity(500)} className="hover:text-[var(--text)]">500</button>
              <button onClick={() => setQuantity(1000)} className="hover:text-[var(--text)]">1,000</button>
              <button onClick={() => setQuantity(2000)} className="hover:text-[var(--text)]">2,000</button>
            </div>
          </div>

          {/* Visibility Multiplier */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="font-mono text-xs text-[var(--text-muted)] uppercase tracking-wider font-semibold">
                Daily Field Visibility
              </label>
              <div className="font-mono text-sm font-bold text-[var(--accent)] bg-[var(--bg-soft)] px-2.5 py-0.5 rounded border border-[var(--border)]">
                {impressionsMultiplier}x multiplier
              </div>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              step="1"
              value={impressionsMultiplier}
              onChange={(e) => setImpressionsMultiplier(Number(e.target.value))}
              className="w-full h-2 rounded-lg bg-[var(--border)] appearance-none cursor-pointer accent-[var(--accent)]"
            />
            <div className="flex justify-between text-[10px] font-mono text-[var(--text-muted)] mt-1.5">
              <span>Standard (1x)</span>
              <span>High Traffic (5x)</span>
              <span>Regional Campaign (10x)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Primary KPI Results */}
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="card-surface rounded-xl p-5 border border-[var(--border)] text-center shadow-xs">
          <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-wider block mb-1">
            Total Sourcing Cost
          </span>
          <span className="font-display text-2xl sm:text-3xl font-bold text-[var(--text)] block mb-1">
            KES {totalCost.toLocaleString()}
          </span>
          <span className="text-[11px] font-mono text-[var(--text-muted)]">
            KES {product.cost.toLocaleString()} × {quantity} units
          </span>
        </div>

        <div className="card-surface rounded-xl p-5 border border-[var(--border)] text-center shadow-xs">
          <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-wider block mb-1">
            Est. Total Impressions
          </span>
          <span className="font-display text-2xl sm:text-3xl font-bold text-[var(--accent)] block mb-1">
            {totalImpressions.toLocaleString()}
          </span>
          <span className="text-[11px] font-mono text-[var(--text-muted)]">
            Over {product.lifespanDays} usage days
          </span>
        </div>

        <div className="card-surface rounded-xl p-5 border-2 border-[var(--accent)] text-center shadow-md bg-[var(--surface)]">
          <span className="font-mono text-[10px] text-[var(--accent)] uppercase tracking-wider font-bold block mb-1">
            Cost Per Impression (CPI)
          </span>
          <span className="font-display text-2xl sm:text-3xl font-bold text-[var(--accent)] block mb-1">
            KES {costPerImpression < 0.01 ? '< 0.01' : costPerImpression.toFixed(2)}
          </span>
          <span className="text-[11px] font-mono text-[var(--text-muted)]">
            {impressionsPerKES.toLocaleString()} impressions / KES
          </span>
        </div>
      </div>

      {/* Comparison against Paid Digital Ads */}
      <div className="card-surface rounded-2xl p-6 border border-[var(--border)] shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-display text-base sm:text-lg font-bold text-[var(--text)]">
            Cost Per Impression vs. Paid Advertising Channels
          </h4>
          <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded">
            Up to 88% Cost Advantage
          </span>
        </div>

        <div className="space-y-3 font-mono text-xs">
          {[
            { channel: `${product.name} (Physical Impression)`, cpi: costPerImpression, isWinner: true },
            { channel: 'Facebook / Meta Feed Ad', cpi: 0.05, isWinner: false },
            { channel: 'Highway Billboard (Monthly Space)', cpi: 0.08, isWinner: false },
            { channel: 'Google Search & Display Ad', cpi: 0.12, isWinner: false },
          ].map((item) => (
            <div key={item.channel} className="flex items-center gap-3">
              <span className={`w-44 sm:w-56 truncate ${item.isWinner ? 'text-[var(--accent)] font-bold' : 'text-[var(--text-muted)]'}`}>
                {item.channel}
              </span>
              <div className="flex-1 h-2.5 bg-[var(--bg-soft)] rounded-full overflow-hidden border border-[var(--border)]">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${item.isWinner ? 'bg-[var(--accent)]' : 'bg-neutral-400 dark:bg-neutral-600'}`}
                  style={{ width: `${Math.max(Math.min((item.cpi / 0.12) * 100, 100), 5)}%` }}
                />
              </div>
              <span className={`w-20 text-right ${item.isWinner ? 'text-[var(--accent)] font-bold' : 'text-[var(--text)]'}`}>
                KES {item.cpi < 0.01 ? '< 0.01' : item.cpi.toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
