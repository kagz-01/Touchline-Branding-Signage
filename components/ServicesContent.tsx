'use client';

import Link from 'next/link';
import Image from 'next/image';
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
      {/* ── 1. SERVICES HERO (ASYMMETRICAL SPLIT STAGE) ─────────── */}
      <section className="relative pt-20 pb-16 md:pt-28 md:pb-20 overflow-hidden grad-hero-subtle border-b border-[var(--border)]">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 right-1/4 w-[600px] h-[600px] rounded-full bg-[var(--accent)] opacity-[0.05] blur-[150px]" />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                'repeating-linear-gradient(0deg, var(--border) 0px, var(--border) 1px, transparent 1px, transparent 48px), repeating-linear-gradient(90deg, var(--border) 0px, var(--border) 1px, transparent 1px, transparent 48px)',
            }}
          />
        </div>

        <div className="relative z-10 max-w-content mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column: Heading, Subtext, Actions & Production Metrics */}
            <div className="lg:col-span-7 space-y-6">
              <Reveal>
                <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/25">
                  <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
                  <span className="font-mono text-[11px] font-semibold text-[var(--accent)] tracking-widest uppercase">
                    Manufacturing Capabilities & Services
                  </span>
                </div>
              </Reveal>

              <Reveal delay={80}>
                <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.08] text-[var(--text)] tracking-tight font-bold">
                  Corporate apparel, workwear & merch{' '}
                  <span className="grad-text">engineered without compromise.</span>
                </h1>
              </Reveal>

              <Reveal delay={160}>
                <p className="text-base sm:text-lg text-[var(--text-muted)] leading-relaxed max-w-2xl">
                  From precision Tajima embroidery on 240 GSM pique polos to industrial safety PPE and nationwide tender merchandise rollouts. Explore our technical capabilities, test fabrics in our lab specifier, and calculate bulk factory pricing.
                </p>
              </Reveal>

              <Reveal delay={220}>
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <a href="#bulk-calculator" className="btn-primary glow-accent px-6 py-3 text-sm font-semibold">
                    Calculate Bulk Pricing <span>→</span>
                  </a>
                  <Link
                    href="/catalog/branding/pdf"
                    target="_blank"
                    className="btn-secondary px-5 py-3 text-sm font-semibold flex items-center gap-2 border border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--bg-soft)] text-[var(--text)] transition-all shadow-xs"
                  >
                    <span>Download Spec PDF</span>
                    <span className="text-xs text-[var(--accent)]">↓</span>
                  </Link>
                  <a href="#capabilities" className="btn-secondary glass-subtle px-5 py-3 text-sm font-medium">
                    Browse Capabilities
                  </a>
                </div>
              </Reveal>

              {/* Manufacturing Metrics Strip */}
              <Reveal delay={280}>
                <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[var(--border)] max-w-xl">
                  <div className="p-3 rounded-xl bg-[var(--surface)] border border-[var(--border)] shadow-xs">
                    <span className="block font-mono text-lg sm:text-xl font-bold text-[var(--text)]">100K+</span>
                    <span className="text-[11px] text-[var(--text-muted)] font-medium leading-tight block">Monthly Unit Throughput</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[var(--surface)] border border-[var(--border)] shadow-xs">
                    <span className="block font-mono text-lg sm:text-xl font-bold text-[var(--text)]">47 Counties</span>
                    <span className="text-[11px] text-[var(--text-muted)] font-medium leading-tight block">Scheduled Drop Logistics</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[var(--surface)] border border-[var(--border)] shadow-xs">
                    <span className="block font-mono text-lg sm:text-xl font-bold text-[var(--text)]">KRA / DOSH</span>
                    <span className="text-[11px] text-[var(--text-muted)] font-medium leading-tight block">Full Tender Compliant</span>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right Column: Visual Technical Specimen Card */}
            <div className="lg:col-span-5">
              <Reveal delay={140}>
                <div className="card-theme rounded-2xl border border-[var(--border)] overflow-hidden shadow-xl p-5 space-y-4 bg-[var(--surface)]">
                  {/* Card Header Spec Tag */}
                  <div className="flex items-center justify-between border-b border-[var(--border)] pb-3 text-xs">
                    <span className="font-mono text-[11px] font-bold text-[var(--accent)] tracking-wider">
                      SPEC-APP-001 // NAIROBI PLANT
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-mono text-[10px] font-semibold">
                      Production Ready
                    </span>
                  </div>

                  {/* High Res Product Specimen with Technical Badges */}
                  <div className="relative rounded-xl overflow-hidden border border-[var(--border)] group">
                    <Image
                      src="/images/branding/apparel-executive-polo.webp"
                      alt="Touchline Executive Corporate Polo Specimen"
                      width={600}
                      height={420}
                      className="w-full h-64 sm:h-72 object-cover transition-transform duration-500 group-hover:scale-105"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

                    {/* Floating Technical Badges */}
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-md border border-white/20 text-white font-mono text-[10px] font-semibold">
                      240 GSM Pique Knit
                    </div>
                    <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-md border border-white/20 text-white font-mono text-[10px] font-semibold">
                      Tajima 12-Needle Embroidery
                    </div>
                    <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md bg-[var(--accent)] text-[var(--accent-ink)] font-mono text-[10px] font-bold">
                      80+ Wash Endurance
                    </div>
                  </div>

                  {/* Production Blueprint Specs Breakdown */}
                  <div className="space-y-2 pt-1">
                    <div className="flex items-center justify-between text-xs py-1 border-b border-[var(--border)]/60">
                      <span className="text-[var(--text-muted)]">Stitch Density</span>
                      <span className="font-mono font-semibold text-[var(--text)]">11,200 High-Def Stitches</span>
                    </div>
                    <div className="flex items-center justify-between text-xs py-1 border-b border-[var(--border)]/60">
                      <span className="text-[var(--text-muted)]">Dye Chemistry</span>
                      <span className="font-mono font-semibold text-[var(--text)]">Reactive Anti-Bleed Grade 4.5</span>
                    </div>
                    <div className="flex items-center justify-between text-xs py-1">
                      <span className="text-[var(--text-muted)]">Turnaround Target</span>
                      <span className="font-mono font-semibold text-[var(--accent)]">3-5 Days Milestone Batch</span>
                    </div>
                  </div>

                  {/* Quick Action Footer */}
                  <div className="pt-2">
                    <a
                      href="#fabric-inspector"
                      className="w-full py-2.5 px-4 rounded-xl bg-[var(--bg-soft)] hover:bg-[var(--accent)]/15 border border-[var(--border)] hover:border-[var(--accent)]/30 text-xs font-semibold text-[var(--text)] flex items-center justify-between transition-colors"
                    >
                      <span>Test Fabric Density in Lab Specifier</span>
                      <span>↓</span>
                    </a>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. STICKY WAYFINDER NAV ──────────────────────────────── */}
      <nav
        aria-label="Branding Services Navigation"
        className="sticky top-[57px] sm:top-[61px] z-30 bg-[var(--bg)]/95 backdrop-blur-xl border-b border-[var(--border)] py-2.5 px-4 sm:px-6 shadow-xs"
      >
        <div className="max-w-content mx-auto flex items-center justify-start md:justify-center gap-2 overflow-x-auto scrollbar-none py-0.5">
          <a
            href="#capabilities"
            className="px-3.5 py-1.5 rounded-full text-xs font-medium text-[var(--text-muted)] hover:text-[var(--text)] bg-[var(--surface)] hover:bg-[var(--bg-soft)] border border-[var(--border)] transition-all whitespace-nowrap shadow-xs"
          >
            Capabilities
          </a>
          <a
            href="#fabric-inspector"
            className="px-3.5 py-1.5 rounded-full text-xs font-medium text-[var(--text-muted)] hover:text-[var(--text)] bg-[var(--surface)] hover:bg-[var(--bg-soft)] border border-[var(--border)] transition-all whitespace-nowrap shadow-xs"
          >
            Fabric & GSM Lab
          </a>
          <a
            href="#bulk-calculator"
            className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[var(--accent)] text-[var(--accent-ink)] hover:opacity-90 transition-all whitespace-nowrap shadow-xs"
          >
            Bulk Price Matrix
          </a>
          <a
            href="#color-fidelity"
            className="px-3.5 py-1.5 rounded-full text-xs font-medium text-[var(--text-muted)] hover:text-[var(--text)] bg-[var(--surface)] hover:bg-[var(--bg-soft)] border border-[var(--border)] transition-all whitespace-nowrap shadow-xs"
          >
            Color Advisor
          </a>
          <a
            href="#turnaround-scheduler"
            className="px-3.5 py-1.5 rounded-full text-xs font-medium text-[var(--text-muted)] hover:text-[var(--text)] bg-[var(--surface)] hover:bg-[var(--bg-soft)] border border-[var(--border)] transition-all whitespace-nowrap shadow-xs"
          >
            Delivery Scheduler
          </a>
          <a
            href="#methods-guide"
            className="px-3.5 py-1.5 rounded-full text-xs font-medium text-[var(--text-muted)] hover:text-[var(--text)] bg-[var(--surface)] hover:bg-[var(--bg-soft)] border border-[var(--border)] transition-all whitespace-nowrap shadow-xs"
          >
            Print Methods
          </a>
          <a
            href="#industry-guides"
            className="px-3.5 py-1.5 rounded-full text-xs font-medium text-[var(--text-muted)] hover:text-[var(--text)] bg-[var(--surface)] hover:bg-[var(--bg-soft)] border border-[var(--border)] transition-all whitespace-nowrap shadow-xs"
          >
            Sector Guides
          </a>
          <Link
            href="/catalog/branding/pdf"
            target="_blank"
            className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-[var(--accent)] bg-[var(--accent)]/10 hover:bg-[var(--accent)]/20 border border-[var(--accent)]/30 transition-all whitespace-nowrap shadow-xs flex items-center gap-1"
          >
            <span>Full Catalog PDF</span>
            <span className="text-[10px]">↗</span>
          </Link>
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
                src="/images/branding/apparel-executive-polo.webp"
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
                src="/images/branding/apparel-heavyweight-tee.webp"
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
                src="/images/branding/gift-executive-vip-set.webp"
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
                src="/images/branding/merch-tote-bag.webp"
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
