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
  const impressionsPerKES = totalImpressions / totalCost;

  return (
    <div className="space-y-8">
      {/* Product Selection */}
      <div className="glass rounded-[var(--radius-lg)] p-8">
        <h3 className="font-display text-xl mb-4 text-[var(--text)]">Branded Merchandise ROI</h3>
        <p className="text-sm text-[var(--text-muted)] mb-6">
          See how many impressions your branded items generate. Every item is a walking billboard.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {PRODUCTS.map((p, i) => (
            <button
              key={p.name}
              onClick={() => setSelectedProduct(i)}
              className={`p-4 rounded-[var(--radius-md)] text-left transition-all duration-300 ${
                selectedProduct === i
                  ? 'bg-[var(--accent)] text-[var(--accent-ink)]'
                  : 'bg-[var(--bg-soft)] text-[var(--text)] border border-[var(--border)] hover:border-[var(--accent)]'
              }`}
            >
              <span className="block mb-2">{p.icon}</span>
              <span className="text-xs font-medium block">{p.name}</span>
            </button>
          ))}
        </div>

        {/* Quantity Input */}
        <div className="mb-8">
          <label className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-widest block mb-3">
            Quantity
          </label>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min="10"
              max="1000"
              step="10"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="flex-1 accent-[var(--accent)]"
            />
            <div className="w-24 text-right">
              <span className="font-display text-2xl text-[var(--accent)]">{quantity}</span>
              <span className="text-xs text-[var(--text-muted)] block">units</span>
            </div>
          </div>
        </div>

        {/* Visibility Multiplier */}
        <div className="mb-8">
          <label className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-widest block mb-3">
            Staff Size (for staff-worn items)
          </label>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min="1"
              max="50"
              value={impressionsMultiplier}
              onChange={(e) => setImpressionsMultiplier(Number(e.target.value))}
              className="flex-1 accent-[var(--accent)]"
            />
            <div className="w-24 text-right">
              <span className="font-display text-2xl text-[var(--accent)]">{impressionsMultiplier}x</span>
              <span className="text-xs text-[var(--text-muted)] block">visibility</span>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="grid md:grid-cols-3 gap-6">
        <Reveal>
          <div className="glass rounded-[var(--radius-lg)] p-6 text-center">
            <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-widest block mb-2">
              Total Cost
            </span>
            <span className="font-display text-3xl text-[var(--accent)] block">
              KES {totalCost.toLocaleString()}
            </span>
            <span className="text-xs text-[var(--text-muted)]">
              {quantity} × KES {product.cost}
            </span>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="glass rounded-[var(--radius-lg)] p-6 text-center">
            <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-widest block mb-2">
              Total Impressions
            </span>
            <span className="font-display text-3xl text-[var(--accent)] block">
              {totalImpressions.toLocaleString()}
            </span>
            <span className="text-xs text-[var(--text-muted)]">
              Over {product.lifespanDays} days
            </span>
          </div>
        </Reveal>

        <Reveal delay={200}>
          <div className="glass rounded-[var(--radius-lg)] p-6 text-center border-2 border-[var(--accent)]">
            <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-widest block mb-2">
              Cost Per Impression
            </span>
            <span className="font-display text-3xl text-[var(--accent)] block">
              KES {costPerImpression < 0.01 ? '<0.01' : costPerImpression.toFixed(3)}
            </span>
            <span className="text-xs text-[var(--text-muted)]">
              {impressionsPerKES.toLocaleString()} impressions per KES
            </span>
          </div>
        </Reveal>
      </div>

      {/* Comparison */}
      <Reveal>
        <div className="glass rounded-[var(--radius-lg)] p-6">
          <h4 className="font-display text-lg mb-4 text-[var(--text)]">vs Other Channels</h4>
          <div className="space-y-3">
            {[
              { channel: 'Branded Merchandise', cpi: costPerImpression, isWinner: true },
              { channel: 'Facebook Ad', cpi: 0.05, isWinner: false },
              { channel: 'Google Ad', cpi: 0.12, isWinner: false },
              { channel: 'Billboard (monthly)', cpi: 0.08, isWinner: false },
            ].map((item) => (
              <div key={item.channel} className="flex items-center gap-4">
                <span className={`text-sm font-medium ${item.isWinner ? 'text-[var(--accent)]' : 'text-[var(--text)]'}`}>
                  {item.channel}
                </span>
                <div className="flex-1 h-2 bg-[var(--bg-soft)] rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${item.isWinner ? 'bg-[var(--accent)]' : 'bg-[var(--border)]'}`}
                    style={{ width: `${Math.min((item.cpi / 0.12) * 100, 100)}%` }}
                  />
                </div>
                <span className="font-mono text-xs text-[var(--text-muted)]">
                  KES {item.cpi < 0.01 ? '<0.01' : item.cpi.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
          <p className="text-xs text-[var(--text-muted)] mt-4 italic">
            Branded merchandise costs up to 90% less per impression than digital ads.
          </p>
        </div>
      </Reveal>
    </div>
  );
}
