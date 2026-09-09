'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Reveal } from './Reveal';

const BUSINESS_HOURS = [
  { id: 'daytime', label: 'Daytime Only (8am-6pm)', hours: '8-18', nightHours: 0 },
  { id: 'evening', label: 'Evening (8am-10pm)', hours: '8-22', nightHours: 4 },
  { id: 'late-night', label: 'Late Night (8am-2am)', hours: '8-2', nightHours: 8 },
  { id: '24-7', label: '24/7 Operation', hours: '24/7', nightHours: 12 },
];

const ILLUMINATION_OPTIONS = [
  {
    name: 'Front-Lit Channel Letters',
    description: 'LED modules inside each letter shine forward. Most common, cost-effective, maximum visibility.',
    bestFor: ['Retail stores', 'Restaurants', 'Shopping malls', 'Any business with evening hours'],
    visibility: 'High',
    energyCost: 'Low (8-12W per module)',
    lifespan: '7-10 years',
    priceRange: 'KES 8,000-15,000/letter',
    nightScore: 9,
    icon: '💡',
  },
  {
    name: 'Back-Lit / Halo Letters',
    description: 'LED light projects backward against the wall, creating a soft glowing halo around each letter.',
    bestFor: ['Hotels', 'Corporate lobbies', 'Upscale restaurants', 'Premium retail'],
    visibility: 'Medium-High',
    energyCost: 'Low (6-10W per module)',
    lifespan: '7-10 years',
    priceRange: 'KES 12,000-25,000/letter',
    nightScore: 8,
    icon: '✨',
  },
  {
    name: 'LED Neon Flex',
    description: 'Flexible LED tubes that mimic traditional neon. Custom shapes, warm glow, no fragility.',
    bestFor: ['Cafes', 'Bars', 'Restaurants', 'Instagram walls', 'Creative spaces'],
    visibility: 'High',
    energyCost: 'Very Low (3-5W per metre)',
    lifespan: '5-7 years',
    priceRange: 'KES 5,000-15,000/metre',
    nightScore: 10,
    icon: '🌈',
  },
  {
    name: 'Edge-Lit Panels',
    description: 'Acrylic panels lit from the edges for a sleek, modern illuminated effect.',
    bestFor: ['Reception areas', 'Retail displays', 'Modern interiors', 'Wayfinding'],
    visibility: 'Medium',
    energyCost: 'Low (10-15W per panel)',
    lifespan: '5-7 years',
    priceRange: 'KES 10,000-30,000',
    nightScore: 7,
    icon: '🔲',
  },
  {
    name: 'Lightbox',
    description: 'Enclosed sign box with translucent face and even LED illumination. Full-colour, cost-effective.',
    bestFor: ['Retail chains', 'Storefronts', 'Mall directories', 'Full-colour logos'],
    visibility: 'Very High',
    energyCost: 'Medium (15-25W per sqm)',
    lifespan: '5-7 years',
    priceRange: 'KES 15,000-60,000',
    nightScore: 9,
    icon: '📦',
  },
  {
    name: 'No Illumination',
    description: 'Non-illuminated signs relying on ambient light. Cost-effective for daytime-only businesses.',
    bestFor: ['Daytime businesses', 'Budget-conscious', 'Interior wayfinding', 'Temporary signage'],
    visibility: 'Low (daytime only)',
    energyCost: 'None',
    lifespan: '5-10 years',
    priceRange: 'KES 3,000-15,000',
    nightScore: 2,
    icon: '🔇',
  },
];

export function IlluminationGuide() {
  const [selectedHours, setSelectedHours] = useState(1);
  const [selectedOption, setSelectedOption] = useState(0);

  const businessHours = BUSINESS_HOURS[selectedHours];
  const illumination = ILLUMINATION_OPTIONS[selectedOption];

  const getRecommendation = () => {
    if (businessHours.nightHours === 0) return 'No illumination needed — save your budget.';
    if (businessHours.nightHours <= 4) return 'Front-Lit or Lightbox — maximum visibility for evening hours.';
    if (businessHours.nightHours <= 8) return 'LED Neon or Halo — premium ambiance for late-night businesses.';
    return 'Front-Lit Channel Letters or Lightbox — 24/7 visibility is essential.';
  };

  return (
    <div className="space-y-8">
      {/* Business Hours Selection */}
      <div className="glass rounded-[var(--radius-lg)] p-8">
        <h3 className="font-display text-xl mb-4 text-[var(--text)]">Illumination Guide</h3>
        <p className="text-sm text-[var(--text-muted)] mb-6">
          Your business hours determine your lighting needs. More night hours = more illumination.
        </p>

        <div className="grid md:grid-cols-2 gap-3 mb-8">
          {BUSINESS_HOURS.map((hours, i) => (
            <button
              key={hours.id}
              onClick={() => setSelectedHours(i)}
              className={`p-4 rounded-[var(--radius-md)] text-left transition-all duration-300 ${
                selectedHours === i
                  ? 'bg-[var(--accent)] text-[var(--accent-ink)]'
                  : 'bg-[var(--bg-soft)] text-[var(--text)] border border-[var(--border)] hover:border-[var(--accent)]'
              }`}
            >
              <span className="text-sm font-medium block">{hours.label}</span>
              <span className="text-[10px] opacity-70 block">{hours.hours} — {hours.nightHours} night hours</span>
            </button>
          ))}
        </div>

        {/* Recommendation */}
        <div className="p-4 rounded-[var(--radius-md)] bg-[var(--accent)]/10 border border-[var(--accent)]/20">
          <span className="font-mono text-[10px] text-[var(--accent)] uppercase tracking-widest block mb-2">
            Recommendation
          </span>
          <p className="text-sm text-[var(--text)]">{getRecommendation()}</p>
        </div>
      </div>

      {/* Illumination Options */}
      <div className="glass rounded-[var(--radius-lg)] p-8">
        <h4 className="font-display text-lg mb-6 text-[var(--text)]">Compare Illumination Types</h4>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {ILLUMINATION_OPTIONS.map((option, i) => (
            <button
              key={option.name}
              onClick={() => setSelectedOption(i)}
              className={`p-4 rounded-[var(--radius-md)] text-left transition-all duration-300 ${
                selectedOption === i
                  ? 'bg-[var(--accent)] text-[var(--accent-ink)]'
                  : 'bg-[var(--bg-soft)] text-[var(--text)] border border-[var(--border)] hover:border-[var(--accent)]'
              }`}
            >
              <span className="text-2xl block mb-2">{option.icon}</span>
              <span className="text-xs font-medium block">{option.name}</span>
              <div className="flex items-center gap-1 mt-2">
                {Array.from({ length: 10 }).map((_, j) => (
                  <div
                    key={j}
                    className={`w-1 h-1 rounded-full ${
                      j < option.nightScore
                        ? 'bg-[var(--accent)]'
                        : selectedOption === i
                        ? 'bg-white/30'
                        : 'bg-[var(--border)]'
                    }`}
                  />
                ))}
              </div>
            </button>
          ))}
        </div>

        {/* Selected Option Details */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h5 className="font-display text-lg text-[var(--text)] mb-2">{illumination.name}</h5>
            <p className="text-sm text-[var(--text-muted)] mb-4">{illumination.description}</p>
            <div className="flex flex-wrap gap-2">
              {illumination.bestFor.map((use) => (
                <span key={use} className="px-2 py-0.5 rounded bg-[var(--accent)]/10 text-[var(--accent)] text-[10px] font-mono">
                  {use}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 rounded bg-[var(--bg-soft)]">
              <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase block">Visibility</span>
              <span className="text-sm font-medium text-[var(--text)]">{illumination.visibility}</span>
            </div>
            <div className="p-3 rounded bg-[var(--bg-soft)]">
              <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase block">Energy</span>
              <span className="text-sm font-medium text-[var(--text)]">{illumination.energyCost}</span>
            </div>
            <div className="p-3 rounded bg-[var(--bg-soft)]">
              <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase block">Lifespan</span>
              <span className="text-sm font-medium text-[var(--text)]">{illumination.lifespan}</span>
            </div>
            <div className="p-3 rounded bg-[var(--bg-soft)]">
              <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase block">Price</span>
              <span className="text-sm font-medium text-[var(--text)]">{illumination.priceRange}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Night Visibility Score */}
      <Reveal>
        <div className="glass rounded-[var(--radius-lg)] p-6">
          <h4 className="font-display text-lg mb-4 text-[var(--text)]">Night Visibility Score</h4>
          <div className="space-y-3">
            {ILLUMINATION_OPTIONS.sort((a, b) => b.nightScore - a.nightScore).map((option) => (
              <div key={option.name} className="flex items-center gap-4">
                <span className={`text-sm font-medium w-40 ${
                  selectedOption === ILLUMINATION_OPTIONS.indexOf(option) ? 'text-[var(--accent)]' : 'text-[var(--text)]'
                }`}>
                  {option.name}
                </span>
                <div className="flex-1 h-2 bg-[var(--bg-soft)] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[var(--accent)]"
                    style={{ width: `${option.nightScore * 10}%` }}
                  />
                </div>
                <span className="font-mono text-xs text-[var(--text-muted)] w-8 text-right">
                  {option.nightScore}/10
                </span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* CTA */}
      <Reveal>
        <div className="glass rounded-[var(--radius-lg)] p-8 text-center">
          <h4 className="font-display text-lg text-[var(--text)] mb-4">
            Ready to light up your brand?
          </h4>
          <p className="text-sm text-[var(--text-muted)] mb-6">
            We design, fabricate and install illuminated signage with energy-efficient LED modules.
          </p>
          <Link href="/book?service=Illuminated+Signage" className="btn-primary text-sm">
            Get a Quote <span>→</span>
          </Link>
        </div>
      </Reveal>
    </div>
  );
}
