'use client';

import { useState } from 'react';

interface ColorPreset {
  name: string;
  hex: string;
  pantone: string;
}

const PRESET_COLORS: ColorPreset[] = [
  { name: 'Corporate Gold', hex: '#c8960c', pantone: 'PMS 1245 C' },
  { name: 'Safari Emerald', hex: '#008542', pantone: 'PMS 348 C' },
  { name: 'Heritage Maroon', hex: '#8b0000', pantone: 'PMS 188 C' },
  { name: 'Enterprise Royal Blue', hex: '#0a3875', pantone: 'PMS 287 C' },
  { name: 'Crimson Scarlet', hex: '#d91b24', pantone: 'PMS 186 C' },
  { name: 'Graphite Charcoal', hex: '#2d3436', pantone: 'PMS 446 C' },
];

interface Substrate {
  id: string;
  name: string;
  baseColor: string;
  material: string;
  underbaseRequired: boolean;
  recommendedPrintTech: string;
  colorShiftRisk: 'Zero' | 'Low' | 'Moderate' | 'High';
  fidelityNotes: string;
  threadMatch: string;
}

const SUBSTRATES: Substrate[] = [
  {
    id: 'white-cotton',
    name: '100% Optical White Cotton',
    baseColor: '#ffffff',
    material: 'Single Jersey / Pique',
    underbaseRequired: false,
    recommendedPrintTech: 'Direct Plastisol / High-Res DTF / Water-Based Discharge',
    colorShiftRisk: 'Zero',
    fidelityNotes:
      'Pure chromatic ground. 99.8% Pantone delta-E match achievable without base bleed.',
    threadMatch: 'Direct Madeira Polyneon shade matching',
  },
  {
    id: 'black-pique',
    name: 'Jet Black Heavy Pique',
    baseColor: '#121212',
    material: '65/35 Poly-Cotton Pique',
    underbaseRequired: true,
    recommendedPrintTech: 'High-Density Tajima Embroidery or Double-Hit White Discharge Plastisol',
    colorShiftRisk: 'Low',
    fidelityNotes:
      'Discharge underbase or 100% polyester thread mandatory to prevent dark fiber show-through.',
    threadMatch: 'High-luster Coats Astra poly thread with underlay stabilization',
  },
  {
    id: 'heather-grey',
    name: 'Heather Melange Grey',
    baseColor: '#8a8d91',
    material: 'Blended Ring-Spun Cotton',
    underbaseRequired: true,
    recommendedPrintTech: 'DTF Transfer or 6,000-Stitch Chest Embroidery',
    colorShiftRisk: 'Moderate',
    fidelityNotes:
      'Grey heather fibers can absorb light pigment. White barrier layer applied automatically on all prints.',
    threadMatch: 'High contrast thread outline recommended for small text (<6mm)',
  },
  {
    id: 'neon-poly',
    name: 'Fluorescent Hi-Vis Yellow / Orange',
    baseColor: '#dfff00',
    material: '100% Polyester Eyelet / Mesh',
    underbaseRequired: true,
    recommendedPrintTech: 'Low-Bleed Silicone Screen Ink or EN471 Reflective Silver Vinyl',
    colorShiftRisk: 'Moderate',
    fidelityNotes:
      'Standard plastisol will experience dye migration (bleed) from neon polyester. Touchline applies anti-migration carbon block base.',
    threadMatch: 'EN ISO 20471 high-visibility certified thread',
  },
  {
    id: 'matte-drinkware',
    name: 'Matte Powder-Coated Stainless Steel',
    baseColor: '#1f2421',
    material: 'SS304 Double-Wall Vacuum Flask',
    underbaseRequired: false,
    recommendedPrintTech: 'Fiber Laser Deep Annealing or 360° Rotary UV Cured Ink',
    colorShiftRisk: 'Zero',
    fidelityNotes:
      'Laser removes powder coat to reveal mirror stainless base or creates permanent gold annealing. Zero scratch-off.',
    threadMatch: 'Not applicable (Rotary UV primer pre-applied)',
  },
  {
    id: 'natural-canvas',
    name: 'Unbleached Raw Beige Canvas',
    baseColor: '#e3dac9',
    material: 'Heavy 320 GSM Cotton Twill',
    underbaseRequired: false,
    recommendedPrintTech: 'Eco-Pigment Screen Print or Vegan Leather Relief Deboss',
    colorShiftRisk: 'Low',
    fidelityNotes:
      'Organic rustic look. Dark corporate inks (Navy, Maroon, Emerald) pair with exceptionally high organic contrast.',
    threadMatch: 'Heavy 30-weight matte embroidery thread',
  },
];

export function ColorSubstrateAdvisor() {
  const [activeColor, setActiveColor] = useState<ColorPreset>(PRESET_COLORS[0]);
  const [activeSubstrateId, setActiveSubstrateId] = useState<string>('white-cotton');

  const substrate = SUBSTRATES.find((s) => s.id === activeSubstrateId) || SUBSTRATES[0];

  return (
    <div className="card-theme rounded-[var(--radius-lg)] p-6 md:p-10 border border-[var(--border)] shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-[var(--border)]">
        <div>
          <span className="font-mono text-xs text-[var(--accent)] uppercase tracking-widest font-bold block mb-1">
            CHROMATIC QUALITY CONTROL
          </span>
          <h3 className="font-display text-2xl md:text-3xl text-[var(--text)]">
            Pantone & Substrate Color Fidelity Advisor
          </h3>
        </div>
        <div className="px-3 py-1.5 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] font-mono text-xs font-semibold">
          ISO 105-C06 Colorfast Standard
        </div>
      </div>

      {/* Preset Corporate Colors */}
      <div className="mb-6">
        <label className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] block mb-2">
          Step 1: Select Brand Corporate Ink / Thread Hue
        </label>
        <div className="flex flex-wrap gap-2.5">
          {PRESET_COLORS.map((col) => (
            <button
              key={col.name}
              onClick={() => setActiveColor(col)}
              className={`flex items-center gap-2.5 px-3.5 py-2 rounded-lg text-xs font-medium border transition-all ${
                activeColor.name === col.name
                  ? 'border-[var(--accent)] bg-[var(--bg-soft)] text-[var(--text)] shadow-sm'
                  : 'border-[var(--border)] bg-[var(--bg)] text-[var(--text-muted)] hover:text-[var(--text)]'
              }`}
            >
              <span
                className="w-3.5 h-3.5 rounded-full border border-black/20"
                style={{ backgroundColor: col.hex }}
              />
              <span>{col.name}</span>
              <span className="font-mono text-[10px] text-[var(--text-muted)]">({col.pantone})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Substrate Selector */}
      <div className="mb-8">
        <label className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] block mb-2">
          Step 2: Choose Physical Substrate / Garment Ground
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {SUBSTRATES.map((sub) => (
            <button
              key={sub.id}
              onClick={() => setActiveSubstrateId(sub.id)}
              className={`p-3 rounded-lg text-left text-xs transition-all border ${
                activeSubstrateId === sub.id
                  ? 'border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--text)] font-semibold shadow-sm'
                  : 'border-[var(--border)] bg-[var(--bg-soft)] text-[var(--text-muted)] hover:text-[var(--text)]'
              }`}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span
                  className="w-3 h-3 rounded border border-black/30"
                  style={{ backgroundColor: sub.baseColor }}
                />
                <span className="font-medium truncate">{sub.name.split(' ')[0]}</span>
              </div>
              <span className="text-[10px] text-[var(--text-muted)] block truncate">{sub.material}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Live Interactive Fidelity Preview & Lab Diagnostics */}
      <div className="grid lg:grid-cols-12 gap-8 items-center">
        {/* Left: Visual Chromatic Simulator */}
        <div className="lg:col-span-5">
          <div
            className="rounded-[var(--radius-lg)] p-8 border border-[var(--border)] shadow-lg flex flex-col justify-between min-h-[260px] relative overflow-hidden"
            style={{ backgroundColor: substrate.baseColor }}
          >
            {/* Subtle fabric weave texture overlay */}
            <div
              className="absolute inset-0 opacity-[0.06] pointer-events-none"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(45deg, #000 0px, #000 1px, transparent 1px, transparent 4px)',
              }}
            />

            <div className="relative z-10 flex justify-between items-start">
              <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-black/40 text-white backdrop-blur-sm">
                Ground: {substrate.name}
              </span>
              <span
                className={`font-mono text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                  substrate.colorShiftRisk === 'Zero'
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : substrate.colorShiftRisk === 'Low'
                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                    : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                }`}
              >
                Fidelity Risk: {substrate.colorShiftRisk}
              </span>
            </div>

            {/* Simulated Logo Rendering */}
            <div className="relative z-10 py-8 text-center">
              <div
                className="font-display text-3xl font-extrabold tracking-tight transition-colors duration-300 drop-shadow-sm"
                style={{ color: activeColor.hex }}
              >
                TOUCHLINE BRAND
              </div>
              <span
                className="font-mono text-xs font-semibold tracking-widest uppercase block mt-1"
                style={{ color: activeColor.hex }}
              >
                {activeColor.pantone} · {activeColor.hex}
              </span>
            </div>

            <div className="relative z-10 flex justify-between items-end text-[11px] font-mono text-black/70 dark:text-white/70">
              <span>Touchline Calibration Unit #04</span>
              <span>100% Anti-Migration Block</span>
            </div>
          </div>
        </div>

        {/* Right: Technical Engineering Diagnostics */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-5 rounded-lg bg-[var(--bg-soft)] border border-[var(--border)]">
            <span className="font-mono text-[10px] text-[var(--accent)] uppercase tracking-wider font-bold block mb-1">
              Production Recommendation
            </span>
            <h4 className="font-display text-lg font-bold text-[var(--text)] mb-2">
              {substrate.recommendedPrintTech}
            </h4>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              {substrate.fidelityNotes}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-[var(--bg-soft)] border border-[var(--border)]">
              <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase block mb-1">
                Underbase Barrier Required?
              </span>
              <div className="text-sm font-bold text-[var(--text)]">
                {substrate.underbaseRequired ? (
                  <span className="text-amber-500">YES — Double White Barrier</span>
                ) : (
                  <span className="text-emerald-500">NO — Direct Pigment Strike</span>
                )}
              </div>
              <span className="text-[10px] text-[var(--text-muted)]">
                Prevents dye migration & color bleed
              </span>
            </div>

            <div className="p-4 rounded-lg bg-[var(--bg-soft)] border border-[var(--border)]">
              <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase block mb-1">
                Embroidery Thread Specification
              </span>
              <div className="text-xs font-semibold text-[var(--text)] mt-1">
                {substrate.threadMatch}
              </div>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between">
            <span className="text-xs text-[var(--text-muted)] font-mono">
              Have exact brand guidelines? We do spectrophotometer testing.
            </span>
            <a
              href={`/book?brand=branding&service=${encodeURIComponent(
                `Color Matching Consultation: ${activeColor.name} (${activeColor.pantone}) on ${substrate.name}`
              )}`}
              className="btn-secondary text-xs font-semibold py-2 px-4"
            >
              Order Lab Swatch Proof <span>→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

