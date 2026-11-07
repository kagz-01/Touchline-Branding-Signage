'use client';

import { useState } from 'react';
import { Reveal } from './Reveal';

interface FabricProfile {
  id: string;
  name: string;
  category: string;
  recommendedGsm: number;
  minGsm: number;
  maxGsm: number;
  composition: string;
  bestMethod: string;
  durabilityScore: number; // out of 10
  breathability: string;
  washCycles: string;
  shrinkageRisk: string;
  idealFor: string;
}

const FABRIC_PROFILES: FabricProfile[] = [
  {
    id: 'polo',
    name: 'Executive Pique Polo',
    category: 'Corporate Apparel',
    recommendedGsm: 220,
    minGsm: 180,
    maxGsm: 260,
    composition: '65% Combed Cotton / 35% Polyester Pique',
    bestMethod: 'Tajima High-Density Embroidery (5,000 - 8,000 stitches)',
    durabilityScore: 9.5,
    breathability: 'High (Pique waffle weave allows air circulation)',
    washCycles: '80+ commercial washes with zero collar curling',
    shrinkageRisk: '< 2.5% (Pre-shrunk reactive dye finish)',
    idealFor: 'Banking staff, corporate sales teams, boardroom meetings, dealership staff',
  },
  {
    id: 'tshirt',
    name: 'Heavyweight Premium Crewneck',
    category: 'Promotional & Staff',
    recommendedGsm: 190,
    minGsm: 150,
    maxGsm: 240,
    composition: '100% Ring-Spun Combed Cotton Single Jersey',
    bestMethod: 'Plastisol Screen Print or Direct-to-Film (DTF)',
    durabilityScore: 8.8,
    breathability: 'Very High (100% natural organic cotton fibers)',
    washCycles: '50+ standard washes without graphic crack or fade',
    shrinkageRisk: '< 3.0% (Combed yarn with silicone wash soft-touch)',
    idealFor: 'Product launches, conference delegate packs, marketing campaigns, retail merch',
  },
  {
    id: 'workwear',
    name: 'Industrial Heavy Twill Overall / Dustcoat',
    category: 'Industrial PPE & Safety',
    recommendedGsm: 280,
    minGsm: 240,
    maxGsm: 340,
    composition: '100% Heavy Cotton Drill or 80/20 Polycotton Twill',
    bestMethod: 'Direct Embroidery with Poly-core thread or Heavy Plastisol Badge',
    durabilityScore: 9.8,
    breathability: 'Medium (Dense mechanical abrasion barrier)',
    washCycles: '120+ rigorous industrial grease & detergent wash cycles',
    shrinkageRisk: '< 1.8% (Sanforized industrial weave)',
    idealFor: 'Warehousing, construction engineers, automotive garages, factory floor operators',
  },
  {
    id: 'hoodie',
    name: 'Brushed Fleece Executive Hoodie',
    category: 'Corporate Winter & Teamwear',
    recommendedGsm: 320,
    minGsm: 280,
    maxGsm: 380,
    composition: '80% Cotton / 20% Polyester Brushed Back Fleece',
    bestMethod: '3D Puff Embroidery or Screen Print Chest Emblem',
    durabilityScore: 9.2,
    breathability: 'Thermal Insulated (Brushed inner warmth lining)',
    washCycles: '60+ cold cycles without fleece shedding or pilling',
    shrinkageRisk: '< 2.0% (Tumble dry low resistant)',
    idealFor: 'Tech company retreats, executive staff gifts, cooler highland branches (Limuru/Eldoret)',
  },
  {
    id: 'tote',
    name: 'Heavyweight Canvas Event Tote',
    category: 'Eco & Event Merchandise',
    recommendedGsm: 300,
    minGsm: 200,
    maxGsm: 380,
    composition: '100% Unbleached Heavy Cotton Canvas',
    bestMethod: 'Single or Multi-Color Screen Print with Eco Pigment Inks',
    durabilityScore: 9.4,
    breathability: 'High (Open woven organic cotton weave)',
    washCycles: '40+ hand or machine cold wash cycles',
    shrinkageRisk: '< 4.0% if hot washed (Spot clean recommended)',
    idealFor: 'NGO summit delegate kits, university fairs, high-end corporate hampers',
  },
];

export function FabricGsmInspector({ onSelectSpec }: { onSelectSpec?: (summary: string) => void }) {
  const [selectedProfileId, setSelectedProfileId] = useState<string>('polo');
  const activeProfile = FABRIC_PROFILES.find((p) => p.id === selectedProfileId) || FABRIC_PROFILES[0];
  const [currentGsm, setCurrentGsm] = useState<number>(activeProfile.recommendedGsm);

  // Switch profile and set initial GSM to its recommended weight
  const handleSelectProfile = (id: string) => {
    setSelectedProfileId(id);
    const p = FABRIC_PROFILES.find((x) => x.id === id);
    if (p) setCurrentGsm(p.recommendedGsm);
  };

  // Determine GSM status indicator
  const gsmWeightLabel =
    currentGsm < activeProfile.recommendedGsm - 15
      ? 'Lightweight / Economy Grade'
      : currentGsm > activeProfile.recommendedGsm + 15
      ? 'Ultra-Heavy / Premium Heavyweight'
      : 'Standard Commercial Optimal Weight';

  return (
    <div className="card-theme rounded-[var(--radius-lg)] p-6 md:p-10 border border-[var(--border)] shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-[var(--border)]">
        <div>
          <span className="font-mono text-xs text-[var(--accent)] uppercase tracking-widest font-bold block mb-1">
            LABORATORY FABRIC SPECIFIER
          </span>
          <h3 className="font-display text-2xl md:text-3xl text-[var(--text)]">
            Fabric & GSM Durability Inspector
          </h3>
        </div>
        <div className="px-3 py-1.5 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] font-mono text-xs font-semibold">
          KBS & Export Quality Standard
        </div>
      </div>

      {/* Garment Selector Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {FABRIC_PROFILES.map((profile) => (
          <button
            key={profile.id}
            onClick={() => handleSelectProfile(profile.id)}
            className={`px-4 py-2.5 rounded-lg text-xs md:text-sm font-medium transition-all duration-200 ${
              selectedProfileId === profile.id
                ? 'bg-[var(--accent)] text-[var(--accent-ink)] font-semibold shadow-md'
                : 'bg-[var(--bg-soft)] text-[var(--text-muted)] hover:text-[var(--text)] border border-[var(--border)]'
            }`}
          >
            {profile.name}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: GSM Controls & Composition */}
        <div className="lg:col-span-6 space-y-6">
          <div className="p-6 rounded-lg bg-[var(--bg-soft)] border border-[var(--border)]">
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-semibold text-[var(--text)]">
                Garment Weight (GSM - Grams per Square Meter)
              </label>
              <span className="font-mono text-lg font-bold text-[var(--accent)]">
                {currentGsm} GSM
              </span>
            </div>

            <input
              type="range"
              min={activeProfile.minGsm}
              max={activeProfile.maxGsm}
              step={5}
              value={currentGsm}
              onChange={(e) => setCurrentGsm(Number(e.target.value))}
              className="w-full accent-[var(--accent)] cursor-pointer h-2 bg-[var(--border)] rounded-lg mb-3"
            />

            <div className="flex justify-between text-[11px] font-mono text-[var(--text-muted)]">
              <span>Min: {activeProfile.minGsm} GSM</span>
              <span className="text-[var(--accent)] font-medium">{gsmWeightLabel}</span>
              <span>Max: {activeProfile.maxGsm} GSM</span>
            </div>
          </div>

          <div className="p-6 rounded-lg bg-[var(--bg-soft)] border border-[var(--border)] space-y-4">
            <div>
              <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-wider block mb-1">
                Yarn & Fiber Composition
              </span>
              <p className="text-sm font-medium text-[var(--text)]">{activeProfile.composition}</p>
            </div>

            <div className="pt-3 border-t border-[var(--border)]">
              <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-wider block mb-1">
                Optimal Decoration Application
              </span>
              <p className="text-sm font-bold text-[var(--accent)]">{activeProfile.bestMethod}</p>
            </div>

            <div className="pt-3 border-t border-[var(--border)]">
              <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-wider block mb-1">
                Corporate Fit & Target Usage
              </span>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">{activeProfile.idealFor}</p>
            </div>
          </div>
        </div>

        {/* Right Column: Lab Performance Ratings */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-6 rounded-lg bg-[var(--bg-soft)] border border-[var(--border)]">
            <h4 className="font-display text-base font-semibold text-[var(--text)] mb-4">
              Physical Durability & Wear Metrics
            </h4>

            <div className="space-y-4 text-xs">
              <div>
                <div className="flex justify-between mb-1.5">
                  <span className="text-[var(--text-muted)]">Fabric Abrasion & Tensile Strength</span>
                  <span className="font-mono font-bold text-[var(--accent)]">
                    {activeProfile.durabilityScore} / 10
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-[var(--border)] overflow-hidden">
                  <div
                    className="h-full bg-[var(--accent)] transition-all duration-300"
                    style={{ width: `${activeProfile.durabilityScore * 10}%` }}
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-[var(--border)]">
                <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase block mb-1">
                  Breathability Index
                </span>
                <span className="text-sm font-medium text-[var(--text)]">{activeProfile.breathability}</span>
              </div>

              <div className="pt-3 border-t border-[var(--border)]">
                <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase block mb-1">
                  Commercial Wash-Cycle Lifespan
                </span>
                <span className="text-sm font-medium text-[var(--text)]">{activeProfile.washCycles}</span>
              </div>

              <div className="pt-3 border-t border-[var(--border)]">
                <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase block mb-1">
                  Dimensional Stability & Shrinkage Resistance
                </span>
                <span className="text-sm font-medium text-emerald-500">{activeProfile.shrinkageRisk}</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-[var(--accent)]/5 border border-[var(--accent)]/20 flex flex-wrap items-center justify-between gap-4">
            <div className="text-xs">
              <strong className="block text-[var(--text)]">Ready to specify this in your quote?</strong>
              <span className="text-[var(--text-muted)]">
                {activeProfile.name} ({currentGsm} GSM)
              </span>
            </div>
            <a
              href={`/book?brand=branding&service=${encodeURIComponent(
                `${activeProfile.name} (${currentGsm} GSM - ${activeProfile.bestMethod})`
              )}`}
              className="btn-primary text-xs font-semibold py-2 px-4"
              onClick={() => {
                if (onSelectSpec) {
                  onSelectSpec(`${activeProfile.name} (${currentGsm} GSM)`);
                }
              }}
            >
              Configure in TouchDesk <span>→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

