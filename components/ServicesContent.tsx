'use client';

import Link from 'next/link';
import type { BrandConfig } from '@/config/brands';
import { METHOD_GUIDES, INDUSTRY_GUIDES, HOT_PRODUCTS_KE, type IndustrySector, type BrandingMethod } from '@/config/branding-knowledge';
import { ServicesGrid } from './ServicesGrid';
import { CrossSellBanner } from './CrossSellBanner';
import { CTASection } from './CTASection';
import { Reveal } from './Reveal';
import { ZoneDetector } from './ZoneDetector';

export function ServicesContent({ brand }: { brand: BrandConfig }) {
  return (
    <>
      {/* Hero */}
      <section className="section-py-lg">
        <div className="max-w-content mx-auto px-6">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--accent)] mb-3 font-mono">// Services</p>
            <h1 className="font-display text-3xl md:text-4xl max-w-2xl mb-4">{brand.about}</h1>
            <p className="text-lg text-[var(--text-muted)] max-w-2xl">
              From concept to delivery — we handle sourcing, branding, and quality control across Kenya.
            </p>
          </Reveal>
        </div>
      </section>

      <div className="section-divider" />

      {/* All Services */}
      <section className="section-py section-alt">
        <ServicesGrid brand={brand} />
      </section>

      <div className="section-divider" />

      {/* Zone-Aware Recommendations */}
      <section className="section-py bg-[var(--bg)]">
        <div className="max-w-content mx-auto px-6">
          <Reveal>
            <div className="text-center mb-12">
              <span className="font-mono text-xs text-[var(--accent)] uppercase tracking-[0.2em] mb-4 block">
                // Location matters
              </span>
              <h2 className="font-display text-3xl md:text-4xl text-[var(--text)] mb-4">
                Zone-aware <span className="accent-word">recommendations</span>
              </h2>
              <p className="text-lead max-w-xl mx-auto">
                Kenya&apos;s climate varies from coastal humidity to highland frost. Your materials should match.
              </p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <ZoneDetector />
          </Reveal>
        </div>
      </section>

      <div className="section-divider" />

      {/* Branding Methods Guide */}
      <section className="section-py section-alt">
        <div className="max-w-content mx-auto px-6">
          <Reveal>
            <div className="text-center mb-12">
              <span className="font-mono text-xs text-[var(--accent)] uppercase tracking-[0.2em] mb-4 block">
                // How we brand
              </span>
              <h2 className="font-display text-3xl md:text-4xl text-[var(--text)] mb-4">
                <span className="accent-word">Branding methods</span> compared
              </h2>
              <p className="text-lead max-w-xl mx-auto">
                Each method has its strengths. Choose based on your product, budget, and timeline.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(Object.keys(METHOD_GUIDES) as BrandingMethod[]).slice(0, 6).map((methodKey, i) => {
              const method = METHOD_GUIDES[methodKey];
              return (
                <Reveal key={methodKey} delay={i * 80}>
                  <div className="card-theme rounded-[var(--radius-lg)] p-6 h-full">
                    <h3 className="font-display text-lg text-[var(--text)] mb-2">{method.name}</h3>
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase ${
                        method.costLevel === 'Low' ? 'bg-green-500/20 text-green-400' :
                        method.costLevel === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {method.costLevel}
                      </span>
                      <span className="text-xs text-[var(--text-muted)]">{method.turnaround}</span>
                      <span className="text-xs text-[var(--text-muted)]">Min: {method.minQty}</span>
                    </div>
                    <p className="text-xs text-[var(--text-muted)] mb-3">
                      Best for: {method.bestFor.join(', ')}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {method.climateConsiderations.slice(0, 2).map((tip) => (
                        <span key={tip} className="text-[9px] text-[var(--accent)] bg-[var(--accent)]/10 px-2 py-0.5 rounded-full">
                          {tip}
                        </span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* Industry Guides */}
      <section className="section-py bg-[var(--bg)]">
        <div className="max-w-content mx-auto px-6">
          <Reveal>
            <div className="text-center mb-12">
              <span className="font-mono text-xs text-[var(--accent)] uppercase tracking-[0.2em] mb-4 block">
                // By industry
              </span>
              <h2 className="font-display text-3xl md:text-4xl text-[var(--text)] mb-4">
                Tailored for <span className="accent-word">your sector</span>
              </h2>
              <p className="text-lead max-w-xl mx-auto">
                Different industries have different branding needs. We understand yours.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(['banking', 'ngo', 'retail', 'hospitality', 'manufacturing', 'tech'] as IndustrySector[]).map((sector, i) => {
              const guide = INDUSTRY_GUIDES[sector];
              return (
                <Reveal key={sector} delay={i * 80}>
                  <div className="card-theme rounded-[var(--radius-lg)] p-6 h-full">
                    <h3 className="font-display text-lg text-[var(--text)] mb-2">{guide.name}</h3>
                    <p className="text-xs text-[var(--text-muted)] mb-3 line-clamp-2">
                      {guide.keyNeeds.slice(0, 2).join(' • ')}
                    </p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {guide.recommendedMethods.slice(0, 3).map((m) => (
                        <span key={m} className="px-2 py-0.5 rounded bg-[var(--accent)]/10 text-[var(--accent)] text-[9px] font-mono uppercase">
                          {m.replace(/-/g, ' ')}
                        </span>
                      ))}
                    </div>
                    {guide.complianceNotes && (
                      <p className="text-[10px] text-yellow-500/80 italic">
                        {guide.complianceNotes[0]}
                      </p>
                    )}
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* Hot Products */}
      <section className="section-py section-alt">
        <div className="max-w-content mx-auto px-6">
          <Reveal>
            <div className="text-center mb-12">
              <span className="font-mono text-xs text-[var(--accent)] uppercase tracking-[0.2em] mb-4 block">
                // What&apos;s popular
              </span>
              <h2 className="font-display text-3xl md:text-4xl text-[var(--text)] mb-4">
                Top products in <span className="accent-word">Kenya 2026</span>
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {HOT_PRODUCTS_KE.map((product: typeof HOT_PRODUCTS_KE[number], i: number) => (
              <Reveal key={product.name} delay={i * 60}>
                <div className="card-theme rounded-[var(--radius-md)] p-4 text-center h-full">
                  <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-widest block mb-1">
                    #{product.rank}
                  </span>
                  <h4 className="font-display text-sm text-[var(--text)] mb-1">{product.name}</h4>
                  <span className="font-mono text-[10px] text-[var(--accent)] block">{product.priceRange}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* Cross-sell */}
      <section className="section-py">
        <CrossSellBanner brand={brand} />
      </section>

      <div className="section-divider" />

      {/* CTA */}
      <section className="section-py section-alt">
        <CTASection brand={brand} />
      </section>
    </>
  );
}
