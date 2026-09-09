'use client';

import { useState } from 'react';
import { Reveal } from './Reveal';

const PRODUCTS = [
  { name: 'Branded T-Shirt', cost: 500, impressionsPerDay: 3000, lifespanDays: 365, icon: '👕' },
  { name: 'Branded Pen', cost: 30, impressionsPerDay: 2000, lifespanDays: 730, icon: '🖊️' },
  { name: 'Branded Mug', cost: 250, impressionsPerDay: 1500, lifespanDays: 1825, icon: '☕' },
  { name: 'Branded Tote Bag', cost: 200, impressionsPerDay: 5000, lifespanDays: 365, icon: '👜' },
  { name: 'Branded Water Bottle', cost: 400, impressionsPerDay: 2500, lifespanDays: 1095, icon: '🧴' },
  { name: 'Branded Cap', cost: 250, impressionsPerDay: 3500, lifespanDays: 365, icon: '🧢' },
  { name: 'Branded Notebook', cost: 200, impressionsPerDay: 1000, lifespanDays: 365, icon: '📓' },
  { name: 'Branded Power Bank', cost: 800, impressionsPerDay: 4000, lifespanDays: 730, icon: '🔋' },
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
              <span className="text-2xl block mb-2">{p.icon}</span>
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
