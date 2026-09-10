'use client';

import Link from 'next/link';
import type { BrandConfig } from '@/config/brands';
import { SIGNAGE_TYPES, INDUSTRY_GUIDES, HOT_PRODUCTS_KE, WAYFINDING_STANDARDS, type IndustrySector, type SignageType } from '@/config/signage-knowledge';
import { ServicesGrid } from './ServicesGrid';
import { CrossSellBanner } from './CrossSellBanner';
import { CTASection } from './CTASection';
import { Reveal } from './Reveal';
import { SignageZoneDetector } from './SignageZoneDetector';

export function SignageContent({ brand }: { brand: BrandConfig }) {
  return (
    <>
      {/* Hero */}
      <section className="section-py-lg">
        <div className="max-w-content mx-auto px-6">
          <Reveal>
            <h1 className="font-display text-3xl md:text-4xl max-w-2xl mb-4">{brand.about}</h1>
            <p className="text-lg text-[var(--text-muted)] max-w-2xl">
              From site survey to installation — we handle design, fabrication, and professional mounting across Kenya.
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
              <h2 className="font-display text-3xl md:text-4xl text-[var(--text)] mb-4">
                Zone-aware <span className="accent-word">recommendations</span>
              </h2>
              <p className="text-lead max-w-xl mx-auto">
                Kenya&apos;s climate varies from coastal humidity to highland frost. Your signage materials should match.
              </p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <SignageZoneDetector />
          </Reveal>
        </div>
      </section>

      <div className="section-divider" />

      {/* Signage Types Guide */}
      <section className="section-py section-alt">
        <div className="max-w-content mx-auto px-6">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl text-[var(--text)] mb-4">
                <span className="accent-word">Signage types</span> compared
              </h2>
              <p className="text-lead max-w-xl mx-auto">
                Each type has its strengths. Choose based on your location, budget, and visibility needs.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(['channel-letters', 'led-neon', 'lightbox', 'vinyl-wrap', 'wayfinding', 'monument'] as SignageType[]).map((typeKey, i) => {
              const type = SIGNAGE_TYPES[typeKey];
              return (
                <Reveal key={typeKey} delay={i * 80}>
                  <div className="card-theme rounded-[var(--radius-lg)] p-6 h-full">
                    <h3 className="font-display text-lg text-[var(--text)] mb-2">{type.name}</h3>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs text-[var(--text-muted)]">{type.priceRange}</span>
                      <span className="text-xs text-[var(--text-muted)]">{type.lifespan}</span>
                    </div>
                    <p className="text-xs text-[var(--text-muted)] mb-3">
                      Best for: {type.bestFor.join(', ')}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {type.materials.slice(0, 2).map((mat) => (
                        <span key={mat} className="text-[9px] text-[var(--accent)] bg-[var(--accent)]/10 px-2 py-0.5 rounded-full">
                          {mat.replace(/-/g, ' ')}
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
              <h2 className="font-display text-3xl md:text-4xl text-[var(--text)] mb-4">
                Tailored for <span className="accent-word">your sector</span>
              </h2>
              <p className="text-lead max-w-xl mx-auto">
                Different industries have different signage needs. We understand yours.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(['retail', 'hospitality', 'healthcare', 'corporate', 'industrial', 'government'] as IndustrySector[]).map((sector, i) => {
              const guide = INDUSTRY_GUIDES[sector];
              return (
                <Reveal key={sector} delay={i * 80}>
                  <div className="card-theme rounded-[var(--radius-lg)] p-6 h-full">
                    <h3 className="font-display text-lg text-[var(--text)] mb-2">{guide.name}</h3>
                    <p className="text-xs text-[var(--text-muted)] mb-3 line-clamp-2">
                      {guide.keyNeeds.slice(0, 2).join(' • ')}
                    </p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {guide.recommendedTypes.slice(0, 3).map((t) => (
                        <span key={t} className="px-2 py-0.5 rounded bg-[var(--accent)]/10 text-[var(--accent)] text-[9px] font-mono uppercase">
                          {t.replace(/-/g, ' ')}
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

      {/* Safety & Compliance */}
      <section className="section-py section-alt">
        <div className="max-w-content mx-auto px-6">
          <Reveal>
            <div className="card-theme rounded-[var(--radius-lg)] p-8 md:p-12 max-w-3xl mx-auto">
              <h2 className="font-display text-2xl md:text-3xl text-[var(--text)] mb-4">
                OSHA 2007 compliant signage
              </h2>
              <p className="text-[var(--text-muted)] leading-relaxed max-w-xl mx-auto mb-6">
                Kenya&apos;s Occupational Safety and Health Act 2007 requires specific signage in every workplace.
                We design and fabricate compliant safety signs that pass DOSH inspections.
              </p>
              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                {WAYFINDING_STANDARDS.osha2007.keyRequirements.slice(0, 6).map((req) => (
                  <div key={req} className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
                    <span className="text-[var(--accent)] mt-0.5">✓</span>
                    {req}
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-4">
                <span className="px-3 py-1 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] text-xs font-mono uppercase tracking-widest">
                  ISO 7010 Standard
                </span>
                <span className="px-3 py-1 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] text-xs font-mono uppercase tracking-widest">
                  Bilingual English/Kiswahili
                </span>
                <span className="px-3 py-1 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] text-xs font-mono uppercase tracking-widest">
                  Photoluminescent Options
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="section-divider" />

      {/* Hot Products */}
      <section className="section-py bg-[var(--bg)]">
        <div className="max-w-content mx-auto px-6">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl text-[var(--text)] mb-4">
                Top signage in <span className="accent-word">Kenya 2026</span>
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
      <section className="section-py section-alt">
        <CrossSellBanner brand={brand} />
      </section>

      <div className="section-divider" />

      {/* CTA */}
      <section className="section-py">
        <CTASection brand={brand} />
      </section>
    </>
  );
}
