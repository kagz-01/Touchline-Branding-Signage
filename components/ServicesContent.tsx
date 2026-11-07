'use client';

import Link from 'next/link';
import type { BrandConfig } from '@/config/brands';
import {
  METHOD_GUIDES,
  INDUSTRY_GUIDES,
  HOT_PRODUCTS_KE,
  type IndustrySector,
  type BrandingMethod,
} from '@/config/branding-knowledge';
import { ServicesGrid } from './ServicesGrid';
import { CrossSellBanner } from './CrossSellBanner';
import { Reveal } from './Reveal';
import { ZoneDetector } from './ZoneDetector';
import { ProjectPhoto } from './ProjectPhoto';
import { FastQuoteWidget } from './FastQuoteWidget';
import { FabricGsmInspector } from './FabricGsmInspector';
import { BulkPricingMatrix } from './BulkPricingMatrix';
import { ColorSubstrateAdvisor } from './ColorSubstrateAdvisor';
import { TurnaroundDeliveryScheduler } from './TurnaroundDeliveryScheduler';

export function ServicesContent({ brand }: { brand: BrandConfig }) {
  return (
    <div className="relative">
      {/* ── 1. SERVICES HERO ─────────────────────────────────────── */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden grad-hero-subtle border-b border-[var(--border)]">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 right-1/4 w-[600px] h-[600px] rounded-full bg-[var(--accent)] opacity-[0.04] blur-[150px]" />
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage:
                'repeating-linear-gradient(0deg, var(--border) 0px, var(--border) 1px, transparent 1px, transparent 48px), repeating-linear-gradient(90deg, var(--border) 0px, var(--border) 1px, transparent 1px, transparent 48px)',
            }}
          />
        </div>

        <div className="relative z-10 max-w-content mx-auto px-6">
          <div className="max-w-3xl">
            <Reveal>
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/25 mb-6">
                <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
                <span className="font-mono text-[11px] font-semibold text-[var(--accent)] tracking-widest uppercase">
                  Manufacturing Capabilities & Services
                </span>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl leading-[1.05] mb-6 text-[var(--text)] tracking-tight">
                Corporate apparel, workwear & merch{' '}
                <span className="grad-text">engineered without compromise.</span>
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className="text-lg md:text-xl text-[var(--text-muted)] leading-relaxed mb-8">
                From precision Tajima embroidery on 240 GSM pique polos to industrial safety PPE and nationwide tender merchandise rollouts. Explore our technical capabilities, test fabrics in our lab specifier, and calculate bulk factory pricing.
              </p>
            </Reveal>

            <Reveal delay={240}>
              <div className="flex flex-wrap items-center gap-4">
                <a href="#bulk-calculator" className="btn-primary glow-accent px-7 py-3.5 text-sm font-semibold">
                  Calculate Bulk Pricing <span>→</span>
                </a>
                <a href="#capabilities" className="btn-secondary glass-subtle px-6 py-3.5 text-sm font-medium">
                  Browse Capabilities
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 2. STICKY WAYFINDER NAV ──────────────────────────────── */}
      <nav
        aria-label="Branding Services Navigation"
        className="sticky top-16 z-30 bg-[var(--bg)]/90 backdrop-blur-md border-b border-[var(--border)] py-3 px-6 overflow-x-auto"
      >
        <div className="max-w-content mx-auto flex items-center justify-start md:justify-center gap-2 text-xs font-mono whitespace-nowrap">
          <a
            href="#capabilities"
            className="px-3 py-1.5 rounded-full hover:bg-[var(--bg-soft)] text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
          >
            01. Capabilities Grid
          </a>
          <a
            href="#fabric-inspector"
            className="px-3 py-1.5 rounded-full hover:bg-[var(--bg-soft)] text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
          >
            02. Fabric & GSM Lab
          </a>
          <a
            href="#bulk-calculator"
            className="px-3 py-1.5 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] font-semibold border border-[var(--accent)]/20 hover:bg-[var(--accent)]/20 transition-colors"
          >
            03. Bulk Price Matrix
          </a>
          <a
            href="#color-fidelity"
            className="px-3 py-1.5 rounded-full hover:bg-[var(--bg-soft)] text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
          >
            04. Color Fidelity Advisor
          </a>
          <a
            href="#turnaround-scheduler"
            className="px-3 py-1.5 rounded-full hover:bg-[var(--bg-soft)] text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
          >
            05. Delivery Scheduler
          </a>
          <a
            href="#methods-guide"
            className="px-3 py-1.5 rounded-full hover:bg-[var(--bg-soft)] text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
          >
            06. Print Methods
          </a>
          <a
            href="#industry-guides"
            className="px-3 py-1.5 rounded-full hover:bg-[var(--bg-soft)] text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
          >
            07. Sector Guides
          </a>
        </div>
      </nav>

      {/* ── 3. VISUAL CAPABILITIES SHOWCASE ──────────────────────── */}
      <section id="capabilities" className="section-py bg-[var(--bg)] scroll-section border-b border-[var(--border)]">
        <div className="max-w-content mx-auto px-6">
          <Reveal>
            <div className="text-center mb-16">
              <span className="font-mono text-xs uppercase tracking-widest text-[var(--accent)] block mb-2 font-semibold">
                In-House Production Divisions
              </span>
              <h2 className="font-display text-3xl md:text-5xl text-[var(--text)] mb-4">
                Core Branding <span className="grad-text">Specializations</span>
              </h2>
              <p className="text-lead max-w-xl mx-auto">
                Fabricated, printed, and inspected in our Nairobi facility under strict ISO quality standards.
              </p>
            </div>
          </Reveal>

          {/* 4 Pillars with ProjectPhoto slots */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="card-theme rounded-[var(--radius-lg)] p-6 border border-[var(--border)] space-y-4">
              <ProjectPhoto
                src="/images/branding/corporate-polos.jpg"
                alt="Touchline Executive Corporate Polos and Uniforms"
                division="branding"
                badge="Apparel Division"
                aspect="aspect-[16/10]"
              />
              <div className="pt-2">
                <span className="font-mono text-[10px] text-[var(--accent)] uppercase tracking-wider block mb-1">
                  Pique & Combed Cotton
                </span>
                <h3 className="font-display text-xl text-[var(--text)] font-semibold mb-2">
                  Executive Corporate Polos & Staff Apparel
                </h3>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-4">
                  Custom-milled 220-240 GSM pique knit with reactive anti-shrink dyes, non-curling knit collars, and multi-position high-density embroidery.
                </p>
                <div className="flex flex-wrap gap-1.5 text-[11px] font-mono text-[var(--text-muted)]">
                  <span className="px-2 py-0.5 rounded bg-[var(--bg-soft)]">Tajima Embroidery</span>
                  <span className="px-2 py-0.5 rounded bg-[var(--bg-soft)]">Pre-Shrunk</span>
                  <span className="px-2 py-0.5 rounded bg-[var(--bg-soft)]">80+ Wash Lifespan</span>
                </div>
              </div>
            </div>

            <div className="card-theme rounded-[var(--radius-lg)] p-6 border border-[var(--border)] space-y-4">
              <ProjectPhoto
                src="/images/branding/workwear-ppe.jpg"
                alt="Touchline Heavy Duty Safety Overalls and Reflective Vests"
                division="branding"
                badge="Safety & PPE Division"
                aspect="aspect-[16/10]"
              />
              <div className="pt-2">
                <span className="font-mono text-[10px] text-[var(--accent)] uppercase tracking-wider block mb-1">
                  DOSH / OSHA Compliant
                </span>
                <h3 className="font-display text-xl text-[var(--text)] font-semibold mb-2">
                  Heavy Industrial Workwear & Reflective PPE
                </h3>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-4">
                  280-340 GSM heavy cotton twill overalls, dustcoats, and EN471 Class 2 reflective vests engineered for construction, oil & gas, and manufacturing floors.
                </p>
                <div className="flex flex-wrap gap-1.5 text-[11px] font-mono text-[var(--text-muted)]">
                  <span className="px-2 py-0.5 rounded bg-[var(--bg-soft)]">Triple-Needle Stitch</span>
                  <span className="px-2 py-0.5 rounded bg-[var(--bg-soft)]">Acid / Flame Retardant</span>
                  <span className="px-2 py-0.5 rounded bg-[var(--bg-soft)]">Heavy Poly Thread</span>
                </div>
              </div>
            </div>

            <div className="card-theme rounded-[var(--radius-lg)] p-6 border border-[var(--border)] space-y-4">
              <ProjectPhoto
                src="/images/branding/executive-gifts.jpg"
                alt="Touchline Laser Engraved Stainless Drinkware and PU Notebooks"
                division="branding"
                badge="Executive Gifts"
                aspect="aspect-[16/10]"
              />
              <div className="pt-2">
                <span className="font-mono text-[10px] text-[var(--accent)] uppercase tracking-wider block mb-1">
                  Fiber Laser & Blind Debossing
                </span>
                <h3 className="font-display text-xl text-[var(--text)] font-semibold mb-2">
                  Premium Executive Gift Sets & Drinkware
                </h3>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-4">
                  Double-wall vacuum insulated SS304 flasks, wireless charging desk organizers, PU leather debossed diaries, and weighted brass ballpoint pens.
                </p>
                <div className="flex flex-wrap gap-1.5 text-[11px] font-mono text-[var(--text-muted)]">
                  <span className="px-2 py-0.5 rounded bg-[var(--bg-soft)]">Deep Laser Annealing</span>
                  <span className="px-2 py-0.5 rounded bg-[var(--bg-soft)]">Bespoke Hardbox Packaging</span>
                  <span className="px-2 py-0.5 rounded bg-[var(--bg-soft)]">Zero Scratch-Off</span>
                </div>
              </div>
            </div>

            <div className="card-theme rounded-[var(--radius-lg)] p-6 border border-[var(--border)] space-y-4">
              <ProjectPhoto
                src="/images/branding/promotional-merch.jpg"
                alt="Touchline Event Totes, Lanyards and Large Scale Promotional Merch"
                division="branding"
                badge="Tender & Events"
                aspect="aspect-[16/10]"
              />
              <div className="pt-2">
                <span className="font-mono text-[10px] text-[var(--accent)] uppercase tracking-wider block mb-1">
                  100k+ Units Scale
                </span>
                <h3 className="font-display text-xl text-[var(--text)] font-semibold mb-2">
                  Promotional Event Kits & Tender Merchandise
                </h3>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-4">
                  Full delegate kits, satin woven lanyards, heavy canvas shopper totes, water-resistant umbrellas, and mass distribution marketing collateral across 47 counties.
                </p>
                <div className="flex flex-wrap gap-1.5 text-[11px] font-mono text-[var(--text-muted)]">
                  <span className="px-2 py-0.5 rounded bg-[var(--bg-soft)]">High-Speed Automated Screen</span>
                  <span className="px-2 py-0.5 rounded bg-[var(--bg-soft)]">Staggered Delivery</span>
                  <span className="px-2 py-0.5 rounded bg-[var(--bg-soft)]">KRA ETR Compliant</span>
                </div>
              </div>
            </div>
          </div>

          {/* Full Detailed Grid */}
          <ServicesGrid brand={brand} />
        </div>
      </section>

      {/* ── 4. INNOVATIVE FEATURE 1: FABRIC & GSM INSPECTOR ──────── */}
      <section id="fabric-inspector" className="section-py bg-[var(--bg-soft)] scroll-section border-b border-[var(--border)]">
        <div className="max-w-content mx-auto px-6">
          <Reveal>
            <div className="text-center mb-12">
              <span className="font-mono text-xs uppercase tracking-widest text-[var(--accent)] block mb-2 font-semibold">
                Interactive Specifier Tool
              </span>
              <h2 className="font-display text-3xl md:text-5xl text-[var(--text)] mb-4">
                Fabric Weight & <span className="grad-text">GSM Durability Inspector</span>
              </h2>
              <p className="text-lead max-w-2xl mx-auto">
                Test fabric grades in real time. Compare yarn density, wash-cycle endurance, and optimal decoration compatibility.
              </p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <FabricGsmInspector />
          </Reveal>
        </div>
      </section>

      {/* ── 5. INNOVATIVE FEATURE 2: BULK PRICING MATRIX ─────────── */}
      <section id="bulk-calculator" className="section-py bg-[var(--bg)] scroll-section border-b border-[var(--border)]">
        <div className="max-w-content mx-auto px-6">
          <Reveal>
            <div className="text-center mb-12">
              <span className="font-mono text-xs uppercase tracking-widest text-[var(--accent)] block mb-2 font-semibold">
                Direct TouchDesk Quotation Engine
              </span>
              <h2 className="font-display text-3xl md:text-5xl text-[var(--text)] mb-4">
                Real-Time <span className="grad-text">Bulk Volume & Pricing Matrix</span>
              </h2>
              <p className="text-lead max-w-2xl mx-auto">
                Adjust quantity and decoration techniques to see real factory tier pricing. Setup fees are automatically waived on 100+ units.
              </p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <BulkPricingMatrix />
          </Reveal>
        </div>
      </section>

      {/* ── 6. INNOVATIVE FEATURE 3: COLOR SUBSTRATE ADVISOR ─────── */}
      <section id="color-fidelity" className="section-py bg-[var(--bg-soft)] scroll-section border-b border-[var(--border)]">
        <div className="max-w-content mx-auto px-6">
          <Reveal>
            <div className="text-center mb-12">
              <span className="font-mono text-xs uppercase tracking-widest text-[var(--accent)] block mb-2 font-semibold">
                Colorfast Science
              </span>
              <h2 className="font-display text-3xl md:text-5xl text-[var(--text)] mb-4">
                Pantone & Substrate <span className="grad-text">Color Fidelity Advisor</span>
              </h2>
              <p className="text-lead max-w-2xl mx-auto">
                See how corporate inks translate across optical white cotton, dark pique, and stainless drinkware without color shifting.
              </p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <ColorSubstrateAdvisor />
          </Reveal>
        </div>
      </section>

      {/* ── 7. INNOVATIVE FEATURE 4: TURNAROUND & DELIVERY SCHEDULER */}
      <section id="turnaround-scheduler" className="section-py bg-[var(--bg)] scroll-section border-b border-[var(--border)]">
        <div className="max-w-content mx-auto px-6">
          <Reveal>
            <div className="text-center mb-12">
              <span className="font-mono text-xs uppercase tracking-widest text-[var(--accent)] block mb-2 font-semibold">
                Nationwide Logistics Engine
              </span>
              <h2 className="font-display text-3xl md:text-5xl text-[var(--text)] mb-4">
                Turnaround & <span className="grad-text">County Delivery Scheduler</span>
              </h2>
              <p className="text-lead max-w-2xl mx-auto">
                Select your county and production batch to calculate guaranteed delivery dates and pre-production sample milestones.
              </p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <TurnaroundDeliveryScheduler />
          </Reveal>
        </div>
      </section>

      {/* ── 8. METHODS COMPARATOR ─────────────────────────────────── */}
      <section id="methods-guide" className="section-py bg-[var(--bg-soft)] scroll-section border-b border-[var(--border)]">
        <div className="max-w-content mx-auto px-6">
          <Reveal>
            <div className="text-center mb-12">
              <span className="font-mono text-xs uppercase tracking-widest text-[var(--accent)] block mb-2 font-semibold">
                Technical Comparison
              </span>
              <h2 className="font-display text-3xl md:text-4xl text-[var(--text)] mb-4">
                Branding Methods <span className="grad-text">Compared</span>
              </h2>
              <p className="text-lead max-w-xl mx-auto">
                Compare cost level, min order quantities, and best applications across each printing method.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(Object.keys(METHOD_GUIDES) as BrandingMethod[]).map((methodKey, i) => {
              const method = METHOD_GUIDES[methodKey];
              return (
                <Reveal key={methodKey} delay={i * 80}>
                  <div className="card-theme rounded-[var(--radius-lg)] p-6 h-full border border-[var(--border)] flex flex-col justify-between">
                    <div>
                      <h3 className="font-display text-lg text-[var(--text)] mb-2 font-semibold">
                        {method.name}
                      </h3>
                      <div className="flex items-center gap-2 mb-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-semibold ${
                            method.costLevel === 'Low'
                              ? 'bg-emerald-500/20 text-emerald-400'
                              : method.costLevel === 'Medium'
                              ? 'bg-amber-500/20 text-amber-400'
                              : 'bg-blue-500/20 text-blue-400'
                          }`}
                        >
                          {method.costLevel} Cost
                        </span>
                        <span className="text-xs text-[var(--text-muted)]">{method.turnaround}</span>
                        <span className="text-xs text-[var(--text-muted)] font-mono">MOQ: {method.minQty}</span>
                      </div>
                      <p className="text-xs text-[var(--text-muted)] mb-3">
                        <strong className="text-[var(--text)]">Best for:</strong> {method.bestFor.join(', ')}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1 pt-3 border-t border-[var(--border)]">
                      {method.climateConsiderations.map((tip) => (
                        <span
                          key={tip}
                          className="text-[9px] text-[var(--accent)] bg-[var(--accent)]/10 px-2 py-0.5 rounded-full"
                        >
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

      {/* ── 9. SECTOR GUIDES ─────────────────────────────────────── */}
      <section id="industry-guides" className="section-py bg-[var(--bg)] scroll-section border-b border-[var(--border)]">
        <div className="max-w-content mx-auto px-6">
          <Reveal>
            <div className="text-center mb-12">
              <span className="font-mono text-xs uppercase tracking-widest text-[var(--accent)] block mb-2 font-semibold">
                Industry Solutions
              </span>
              <h2 className="font-display text-3xl md:text-4xl text-[var(--text)] mb-4">
                Tailored for <span className="grad-text">Your Sector</span>
              </h2>
              <p className="text-lead max-w-xl mx-auto">
                Specialized compliance and material specifications for Kenyan commercial and public institutions.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(['banking', 'ngo', 'retail', 'hospitality', 'manufacturing', 'tech'] as IndustrySector[]).map(
              (sector, i) => {
                const guide = INDUSTRY_GUIDES[sector];
                return (
                  <Reveal key={sector} delay={i * 80}>
                    <div className="card-theme rounded-[var(--radius-lg)] p-6 h-full border border-[var(--border)]">
                      <h3 className="font-display text-lg text-[var(--text)] mb-2 font-semibold">
                        {guide.name}
                      </h3>
                      <p className="text-xs text-[var(--text-muted)] mb-3 line-clamp-2">
                        {guide.keyNeeds.slice(0, 2).join(' • ')}
                      </p>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {guide.recommendedMethods.slice(0, 3).map((m) => (
                          <span
                            key={m}
                            className="px-2 py-0.5 rounded bg-[var(--accent)]/10 text-[var(--accent)] text-[9px] font-mono uppercase"
                          >
                            {m.replace(/-/g, ' ')}
                          </span>
                        ))}
                      </div>
                      {guide.complianceNotes && (
                        <p className="text-[10px] text-amber-500/90 italic pt-2 border-t border-[var(--border)]">
                          {guide.complianceNotes[0]}
                        </p>
                      )}
                    </div>
                  </Reveal>
                );
              }
            )}
          </div>
        </div>
      </section>

      {/* ── 10. CLIMATE ZONE DETECTOR ────────────────────────────── */}
      <section className="section-py bg-[var(--bg-soft)] border-b border-[var(--border)]">
        <div className="max-w-content mx-auto px-6">
          <Reveal>
            <div className="text-center mb-12">
              <span className="font-mono text-xs uppercase tracking-widest text-[var(--accent)] block mb-2 font-semibold">
                Climate Adaptation
              </span>
              <h2 className="font-display text-3xl md:text-4xl text-[var(--text)] mb-4">
                Zone-Aware <span className="grad-text">Material Recommendations</span>
              </h2>
              <p className="text-lead max-w-xl mx-auto">
                Kenya&apos;s climate varies from coastal humidity to highland frost. Ensure your inks and fabrics endure.
              </p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <ZoneDetector />
          </Reveal>
        </div>
      </section>

      {/* ── 11. FAST QUOTE DIRECT INGESTION WIDGET ───────────────── */}
      <section className="section-py bg-[var(--bg)] border-b border-[var(--border)]">
        <div className="max-w-content mx-auto px-6">
          <Reveal>
            <div className="text-center mb-12">
              <span className="font-mono text-xs uppercase tracking-widest text-[var(--accent)] block mb-2 font-semibold">
                TouchDesk Intake
              </span>
              <h2 className="font-display text-3xl md:text-4xl text-[var(--text)] mb-4">
                Ready for a formal quote? <span className="grad-text">Submit your brief</span>
              </h2>
              <p className="text-lead max-w-xl mx-auto">
                Connect directly to our Nairobi estimation desk for immediate job creation and sample scheduling.
              </p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <FastQuoteWidget initialBrand="branding" />
          </Reveal>
        </div>
      </section>

      {/* ── 12. CROSS SELL & FINAL CTA ────────────────────────────── */}
      <section className="section-py bg-[var(--bg-soft)]">
        <div className="max-w-content mx-auto px-6">
          <CrossSellBanner brand={brand} />
        </div>
      </section>
    </div>
  );
}
