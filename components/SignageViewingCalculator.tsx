'use client';

import { useState, useMemo } from 'react';
import { Reveal } from './Reveal';

const VIEWING_SCENARIOS = [
  { name: 'Pedestrian', distance: 10, description: 'Sidewalk, foot traffic' },
  { name: 'Parking Lot', distance: 30, description: 'Car park, drive-through' },
  { name: 'Road Side', distance: 50, description: 'Main road, highway approach' },
  { name: 'Highway', distance: 100, description: 'Expressway, major highway' },
];

const SIGN_TYPES: { name: string; multiplier: number; icon: React.ReactNode }[] = [
  {
    name: 'Channel Letters',
    multiplier: 1.0,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <polyline points="4 7 4 4 20 4 20 7" />
        <line x1="9" y1="20" x2="15" y2="20" />
        <line x1="12" y1="4" x2="12" y2="20" />
      </svg>
    ),
  },
  {
    name: 'Dimensional Letters',
    multiplier: 0.9,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path d="M12 3v18" />
        <path d="M8 7l4-4 4 4" />
        <rect x="4" y="14" width="16" height="7" rx="1" />
      </svg>
    ),
  },
  {
    name: 'Lightbox',
    multiplier: 1.2,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="12" cy="12" r="3" />
        <line x1="12" y1="3" x2="12" y2="6" />
        <line x1="12" y1="18" x2="12" y2="21" />
        <line x1="3" y1="12" x2="6" y2="12" />
        <line x1="18" y1="12" x2="21" y2="12" />
      </svg>
    ),
  },
  {
    name: 'Monument',
    multiplier: 1.3,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path d="M3 21h18" />
        <path d="M5 21V7l7-4 7 4v14" />
        <path d="M9 21v-4h6v4" />
        <line x1="9" y1="10" x2="9" y2="10.01" />
        <line x1="15" y1="10" x2="15" y2="10.01" />
        <line x1="9" y1="14" x2="9" y2="14.01" />
        <line x1="15" y1="14" x2="15" y2="14.01" />
      </svg>
    ),
  },
  {
    name: 'Pylon',
    multiplier: 1.5,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path d="M12 2v4" />
        <path d="M8 6h8l-1 16H9L8 6z" />
        <path d="M6 22h12" />
        <line x1="10" y1="10" x2="14" y2="10" />
        <line x1="10" y1="14" x2="14" y2="14" />
      </svg>
    ),
  },
];

const ILLUMINATION_BONUS = {
  'none': 1.0,
  'front-lit': 1.2,
  'back-lit': 1.3,
  'halo': 1.1,
  'edge-lit': 1.15,
};

export function SignageViewingCalculator() {
  const [distance, setDistance] = useState(30);
  const [selectedScenario, setSelectedScenario] = useState<number | null>(1);
  const [selectedSignType, setSelectedSignType] = useState(0);
  const [hasIllumination, setHasIllumination] = useState(true);

  const signType = SIGN_TYPES[selectedSignType];

  // Industry standard: 1 inch of letter height per 10 feet of viewing distance
  // In metric: ~1cm per 3m of distance
  const baseLetterHeight = useMemo(() => {
    const base = (distance / 3) * signType.multiplier;
    const illuminated = hasIllumination ? base * 1.2 : base;
    return Math.max(5, Math.ceil(illuminated));
  }, [distance, signType.multiplier, hasIllumination]);

  const totalSignWidth = useMemo(() => {
    // Assuming average word length of 6 characters + spacing
    const avgCharsPerWord = 6;
    const avgWordsInName = 2;
    const charWidth = baseLetterHeight * 0.7;
    return Math.ceil(avgCharsPerWord * avgWordsInName * charWidth + (avgWordsInName - 1) * baseLetterHeight * 0.5);
  }, [baseLetterHeight]);

  const estimatedPrice = useMemo(() => {
    const pricePerCm = signType.name === 'Monument' ? 800 : signType.name === 'Pylon' ? 1200 : 400;
    const illuminatedBonus = hasIllumination ? 1.5 : 1;
    return Math.ceil((totalSignWidth * baseLetterHeight * 0.1 * pricePerCm * illuminatedBonus) / 1000) * 1000;
  }, [totalSignWidth, baseLetterHeight, signType.name, hasIllumination]);

  return (
    <div className="space-y-8">
      {/* Calculator */}
      <div className="glass rounded-[var(--radius-lg)] p-8">
        <h3 className="font-display text-xl mb-4 text-[var(--text)]">Sign Size Calculator</h3>
        <p className="text-sm text-[var(--text-muted)] mb-6">
          Find the right letter height for your viewing distance. Too small = invisible. Too big = waste.
        </p>

        {/* Scenario Selection */}
        <div className="mb-8">
          <label className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-widest block mb-3">
            Viewing Scenario
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {VIEWING_SCENARIOS.map((scenario, i) => (
              <button
                key={scenario.name}
                onClick={() => {
                  setSelectedScenario(i);
                  setDistance(scenario.distance);
                }}
                className={`p-4 rounded-[var(--radius-md)] text-left transition-all duration-300 ${
                  selectedScenario === i
                    ? 'bg-[var(--accent)] text-[var(--accent-ink)]'
                    : 'bg-[var(--bg-soft)] text-[var(--text)] border border-[var(--border)] hover:border-[var(--accent)]'
                }`}
              >
                <span className="text-xs font-medium block">{scenario.name}</span>
                <span className="text-[10px] opacity-70 block">{scenario.description}</span>
                <span className="text-xs font-mono mt-2 block">{scenario.distance}m</span>
              </button>
            ))}
          </div>
        </div>

        {/* Distance Slider */}
        <div className="mb-8">
          <label className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-widest block mb-3">
            Viewing Distance (meters)
          </label>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min="5"
              max="150"
              value={distance}
              onChange={(e) => {
                setDistance(Number(e.target.value));
                setSelectedScenario(null);
              }}
              className="flex-1 accent-[var(--accent)]"
            />
            <div className="w-24 text-right">
              <span className="font-display text-2xl text-[var(--accent)]">{distance}</span>
              <span className="text-xs text-[var(--text-muted)] block">metres</span>
            </div>
          </div>
        </div>

        {/* Sign Type */}
        <div className="mb-8">
          <label className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-widest block mb-3">
            Sign Type
          </label>
          <div className="flex flex-wrap gap-3">
            {SIGN_TYPES.map((type, i) => (
              <button
                key={type.name}
                onClick={() => setSelectedSignType(i)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedSignType === i
                    ? 'bg-[var(--accent)] text-[var(--accent-ink)]'
                    : 'bg-[var(--bg-soft)] text-[var(--text-muted)] hover:text-[var(--text)] border border-[var(--border)]'
                }`}
              >
                <span className="inline-flex items-center justify-center mr-1">{type.icon}</span> {type.name}
              </button>
            ))}
          </div>
        </div>

        {/* Illumination Toggle */}
        <div className="mb-8">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={hasIllumination}
              onChange={(e) => setHasIllumination(e.target.checked)}
              className="w-4 h-4 accent-[var(--accent)]"
            />
            <span className="text-sm text-[var(--text)]">Add LED illumination (+50% visibility at night)</span>
          </label>
        </div>
      </div>

      {/* Results */}
      <div className="grid md:grid-cols-3 gap-6">
        <Reveal>
          <div className="glass rounded-[var(--radius-lg)] p-6 text-center">
            <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-widest block mb-2">
              Letter Height
            </span>
            <span className="font-display text-3xl text-[var(--accent)] block">
              {baseLetterHeight}cm
            </span>
            <span className="text-xs text-[var(--text-muted)]">
              {Math.round(baseLetterHeight / 2.54)} inches
            </span>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="glass rounded-[var(--radius-lg)] p-6 text-center">
            <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-widest block mb-2">
              Total Sign Width
            </span>
            <span className="font-display text-3xl text-[var(--accent)] block">
              ~{totalSignWidth}cm
            </span>
            <span className="text-xs text-[var(--text-muted)]">
              For 2-word business name
            </span>
          </div>
        </Reveal>

        <Reveal delay={200}>
          <div className="glass rounded-[var(--radius-lg)] p-6 text-center border-2 border-[var(--accent)]">
            <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-widest block mb-2">
              Estimated Price
            </span>
            <span className="font-display text-3xl text-[var(--accent)] block">
              KES {estimatedPrice.toLocaleString()}
            </span>
            <span className="text-xs text-[var(--text-muted)]">
              {signType.name} + {hasIllumination ? 'LED' : 'No LED'}
            </span>
          </div>
        </Reveal>
      </div>

      {/* Quick Reference */}
      <Reveal>
        <div className="glass rounded-[var(--radius-lg)] p-6">
          <h4 className="font-display text-lg mb-4 text-[var(--text)]">Quick Reference</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { distance: '5-10m', height: '5-10cm', use: 'Shopfront' },
              { distance: '10-30m', height: '10-20cm', use: 'Mall entrance' },
              { distance: '30-50m', height: '20-40cm', use: 'Road side' },
              { distance: '50-100m', height: '40-80cm', use: 'Highway' },
            ].map((ref) => (
              <div key={ref.distance} className="text-center p-3 rounded bg-[var(--bg-soft)]">
                <span className="font-mono text-xs text-[var(--accent)] block">{ref.distance}</span>
                <span className="font-display text-lg text-[var(--text)] block">{ref.height}</span>
                <span className="text-[10px] text-[var(--text-muted)]">{ref.use}</span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  );
}
