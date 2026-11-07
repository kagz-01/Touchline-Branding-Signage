'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { getBrand } from '@/config/brands';
import {
  HOT_PRODUCTS_KE,
  GLOBAL_TRENDS_2026,
  MARKET_DATA,
} from '@/config/branding-knowledge';
import { Logo } from './Logo';
import { Reveal } from './Reveal';
import { ZoneDetector } from './ZoneDetector';
import { BrandingROICalculator } from './BrandingROICalculator';
import { TenderComplianceChecker } from './TenderComplianceChecker';
import { ProjectPhoto } from './ProjectPhoto';
import { FastQuoteWidget } from './FastQuoteWidget';

const brand = getBrand('branding');

/* ------------------------------------------------------------------ */
/* Data Definitions                                                   */
/* ------------------------------------------------------------------ */

const SERVICE_DOMAINS = [
  {
    name: 'Apparel & Uniforms',
    image: '/images/branding/apparel-embroidery.jpg',
    badge: 'Apparel & Textiles',
    description: 'Executive polos, staff overalls, cotton tees, and hoodies designed for heavy daily wear and commercial laundering.',
    specs: ['Screen Printing (1-6 colours)', 'Computerized Embroidery', 'Direct-to-Film (DTF)', 'All-Over Sublimation'],
    href: '/services#apparel',
  },
  {
    name: 'Executive Gifts & Drinkware',
    image: '/images/branding/corporate-gifts.jpg',
    badge: 'Hard Goods',
    description: 'Double-walled thermal flasks, matte executive notebooks, engraved metal pens, and tech accessories for VIP gifting.',
    specs: ['UV Full-Color Print', 'Precision Laser Engraving', 'Pad Printing', 'Debossed Leatherette'],
    href: '/services#hard-goods',
  },
  {
    name: 'Woven Labels & Patches',
    image: '/images/branding/labels-patches.jpg',
    badge: 'Identification',
    description: 'Custom woven damask labels, 3D puff embroidered patches, and debossed faux-leather crests for custom merchandise.',
    specs: ['Heat-Seal / Iron-On', 'Velcro-Backed Tactical', 'High-Density Woven', 'Laser-Cut Edges'],
    href: '/services#labels',
  },
  {
    name: 'Tender-Scale Procurement',
    image: '/images/branding/tender-rollout.jpg',
    badge: 'Institutional',
    description: 'Large-scale uniform and supply rollouts for County Governments, NGOs, financial institutions, and nationwide campaigns.',
    specs: ['100% KRA Tax Compliant', 'Certificate of Origin', 'Quality Batch Testing', 'Milestone Delivery'],
    href: '/services#tenders',
  },
];

const BRANDING_STEPS = [
  {
    num: '01',
    title: 'Raw Material Selection',
    desc: 'Commercial-grade cotton, durable poly-blends, and certified double-wall drinkware. No flimsy stock.',
  },
  {
    num: '02',
    title: 'In-House Digitization',
    desc: 'Your vector artwork is digitized for embroidery stitch density or separated for screen color channels.',
  },
  {
    num: '03',
    title: 'Precision Production',
    desc: 'Automated embroidery machines and high-temperature DTF heat presses ensure sharp, crack-resistant finishes.',
  },
  {
    num: '04',
    title: 'TouchDesk Verification',
    desc: 'Counted, batch-inspected, and delivered with digital dispatch notes and sign-off confirmation.',
  },
];

const COMPARISON_DATA = [
  {
    method: 'Screen Printing',
    bestFor: 'T-shirts, tote bags, and flat textiles in large batches',
    durability: '★★★★☆ (High — 50+ washes with proper cure)',
    cost: 'Most economical for 50+ units',
    turnaround: '3 - 5 business days',
    minQty: '50 units minimum',
    colorLimit: 'Up to 6 solid Pantone colors',
    technique: 'Plastisol or water-based inks pushed through fine tensioned mesh screens directly into fabric fibers.',
  },
  {
    method: 'Computerized Embroidery',
    bestFor: 'Executive polos, caps, corporate fleece jackets, and uniform crests',
    durability: '★★★★★ (Permanent — outlasts the garment itself)',
    cost: 'Medium (priced per 1,000 stitches)',
    turnaround: '4 - 7 business days',
    minQty: '10 units minimum',
    colorLimit: 'Up to 15 thread colors per design',
    technique: 'High-density rayon and polyester threads stitched directly into heavyweight garments for a rich tactile finish.',
  },
  {
    method: 'Direct-to-Film (DTF)',
    bestFor: 'Full-color photographic graphics, complex gradients, and dark fabrics',
    durability: '★★★★☆ (High stretch elasticity, wash-fast)',
    cost: 'Medium (no screen setup fees)',
    turnaround: '2 - 3 business days',
    minQty: '1 unit (ideal for samples & short runs)',
    colorLimit: 'Full CMYK + White ink backing',
    technique: 'Pigment inks printed on PET film, powdered with hot-melt adhesive, and heat-fused at 160°C.',
  },
  {
    method: 'Dye Sublimation',
    bestFor: 'Sportswear, cycling jerseys, performance dri-fit, and flags',
    durability: '★★★★★ (Permanent — zero feel, never peels or cracks)',
    cost: 'Medium',
    turnaround: '5 - 7 business days',
    minQty: '10 units minimum',
    colorLimit: 'Unlimited edge-to-edge full color',
    technique: 'Heat-activated dyes turn into gas under pressure, bonding molecularly with 100% polyester fibers.',
  },
];

export function BrandingHome() {
  const [activeComparison, setActiveComparison] = useState(0);

  return (
    <div className="relative">
      {/* ── 1. HIGH-TECH BRANDING HERO (Wordings on Left Area · Blueprint Engineering Grid) ── */}
      {/* Engineered to occupy ~6/8 of the screen (~75-80vh) with NO vertical scrolling on desktop */}
      <section className="relative min-h-[82vh] lg:h-[calc(100vh-65px)] lg:max-h-[760px] flex items-center overflow-hidden py-6 sm:py-8 border-b border-white/10 bg-[#090b0e] text-white">
        {/* Subtle Ambient Blueprint Grid & Warm Amber Glow */}
        <div className="absolute inset-0 pointer-events-none z-0" aria-hidden="true">
          <div className="absolute top-1/4 -left-28 w-[500px] h-[500px] rounded-full bg-[#c8960c] opacity-[0.12] blur-[140px]" />
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage:
                'repeating-linear-gradient(0deg, #ffffff 0px, #ffffff 1px, transparent 1px, transparent 44px), repeating-linear-gradient(90deg, #ffffff 0px, #ffffff 1px, transparent 1px, transparent 44px)',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#090b0e]/30 to-[#090b0e]" />
        </div>

        <div className="relative z-10 max-w-content mx-auto px-4 sm:px-6 w-full">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* ── LEFT AREA: VALUE PROPOSITION (As requested: "branding left area") ── */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              <Reveal>
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 mb-3 sm:mb-4 shadow-xs backdrop-blur-md">
                  <span className="w-2 h-2 rounded-full bg-[#c8960c] animate-pulse" />
                  <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#d4a017] font-semibold">
                    Touchline Branding // Division 01
                  </span>
                </div>

                <h1 className="font-display text-3xl sm:text-5xl lg:text-[3.25rem] xl:text-[3.6rem] leading-[0.98] tracking-tight text-white mb-3 text-balance">
                  PUT YOUR BRAND <br />
                  IN THEIR <span className="bg-gradient-to-r from-[#c8960c] via-[#d4a017] to-[#e6af2e] bg-clip-text text-transparent">HANDS.</span>
                </h1>
              </Reveal>

              <Reveal delay={120}>
                <p className="text-xs sm:text-base text-neutral-300 leading-relaxed mb-4 sm:mb-6 max-w-xl font-normal text-balance">
                  From executive embroidered staff uniforms and corporate gift kits to tender-scale apparel rollouts across Kenya — we source, brand, inspect, and deliver with zero middlemen.
                </p>
              </Reveal>

              <Reveal delay={200}>
                <div className="flex flex-wrap gap-3 mb-6 sm:mb-8">
                  <Link
                    href="/book?brand=branding"
                    className="btn-primary btn-magnetic shadow-md shadow-[#c8960c]/25 px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold rounded-xl"
                  >
                    Request Branding Quote <span>→</span>
                  </Link>
                  <a
                    href="#methods"
                    className="px-5 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-medium bg-white/5 hover:bg-white/10 text-white border border-white/15 backdrop-blur-md transition-all"
                  >
                    Compare Print Methods
                  </a>
                </div>
              </Reveal>

              {/* Verified Production Proof */}
              <Reveal delay={280}>
                <div className="grid grid-cols-3 gap-4 sm:gap-6 pt-4 sm:pt-5 border-t border-white/10 w-full max-w-md">
                  <div>
                    <span className="font-display text-2xl sm:text-3xl text-[#d4a017] block">500+</span>
                    <span className="text-[10px] sm:text-xs text-neutral-400 font-mono">Items Sourced</span>
                  </div>
                  <div>
                    <span className="font-display text-2xl sm:text-3xl text-[#d4a017] block">4-Day</span>
                    <span className="text-[10px] sm:text-xs text-neutral-400 font-mono">Avg Turnaround</span>
                  </div>
                  <div>
                    <span className="font-display text-2xl sm:text-3xl text-[#d4a017] block">47 Counties</span>
                    <span className="text-[10px] sm:text-xs text-neutral-400 font-mono">Kenya-Wide Supply</span>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* ── RIGHT AREA: HIGH-TECH LIVE MERCHANDISE SPEC CARD ── */}
            <div className="lg:col-span-5 w-full">
              <Reveal delay={240}>
                <div className="relative rounded-2xl bg-gradient-to-br from-[#1a150a]/95 via-[#100e07]/95 to-[#080703]/98 border border-amber-500/30 p-5 sm:p-6 shadow-2xl backdrop-blur-md overflow-hidden">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

                  {/* Header / Division Tag */}
                  <div className="flex items-center justify-between pb-3.5 border-b border-amber-900/30 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#d4a017] animate-ping" />
                      <span className="font-mono text-xs uppercase tracking-wider font-semibold text-white">
                        Production Lab Spec
                      </span>
                    </div>
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-amber-500/15 text-[#d4a017] border border-amber-500/25">
                      Nairobi Factory
                    </span>
                  </div>

                  {/* Active Spec Matrix */}
                  <div className="space-y-2.5 mb-4">
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                      <span className="text-xs font-medium text-neutral-400">Category</span>
                      <span className="text-xs font-semibold text-white">Heavyweight Pique Polo (240 GSM)</span>
                    </div>

                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                      <span className="text-xs font-medium text-neutral-400">Branding Tech</span>
                      <span className="text-xs font-semibold text-[#d4a017]">12-Needle Tajima Embroidery</span>
                    </div>

                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                      <span className="text-xs font-medium text-neutral-400">Stitch Density</span>
                      <span className="text-xs font-mono font-semibold text-white">9,400 stitches / crest</span>
                    </div>

                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                      <span className="text-xs font-medium text-neutral-400">Lead Time</span>
                      <span className="text-xs font-semibold text-emerald-400">3-4 Working Days</span>
                    </div>
                  </div>

                  {/* Quick Action Footer */}
                  <div className="flex items-center justify-between pt-3 border-t border-amber-900/30">
                    <span className="text-[11px] font-mono text-neutral-400">
                      Min Batch: 10 Units
                    </span>
                    <Link
                      href="/book?brand=branding"
                      className="font-mono text-xs font-semibold text-[#d4a017] hover:underline flex items-center gap-1"
                    >
                      Configure This Item <span>→</span>
                    </Link>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. QUICK TOOLBAR WAYFINDER (Modern Pill Rail) ───────── */}
      <section className="bg-[var(--bg)]/90 border-b border-[var(--border)] py-2.5 sticky top-[57px] sm:top-[61px] z-30 backdrop-blur-xl">
        <div className="max-w-content mx-auto px-4 sm:px-6 overflow-x-auto scrollbar-none">
          <div className="flex items-center justify-between min-w-max gap-4 text-xs">
            <div className="flex items-center gap-1.5 p-1 rounded-full bg-[var(--surface)] border border-[var(--border)] shadow-xs">
              <a href="#services" className="px-3 py-1 rounded-full text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--bg-soft)] transition-colors font-medium">
                Services
              </a>
              <a href="#methods" className="px-3 py-1 rounded-full text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--bg-soft)] transition-colors font-medium">
                Print Methods
              </a>
              <a href="#roi-calculator" className="px-3 py-1 rounded-full text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--bg-soft)] transition-colors font-medium">
                ROI Calculator
              </a>
              <a href="#tender-checker" className="px-3 py-1 rounded-full text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--bg-soft)] transition-colors font-medium">
                Tender Checker
              </a>
              <a href="#climate-zones" className="px-3 py-1 rounded-full text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--bg-soft)] transition-colors font-medium">
                Climate Zones
              </a>
            </div>
            <Link
              href="/book?brand=branding"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-[var(--accent)] hover:bg-[var(--accent)]/10 transition-colors"
            >
              <span>Instant Quote</span>
              <span className="text-[10px]">↗</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── 3. FOUR SERVICE DOMAINS (With Image Cards) ─────────────── */}
      <section id="services" className="section-py bg-[var(--bg)] border-b border-[var(--border)] scroll-section">
        <div className="max-w-content mx-auto px-6">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="font-mono text-xs uppercase tracking-widest text-[var(--accent)] block mb-2">
                // Sourcing &amp; Finishing Domains
              </span>
              <h2 className="font-display text-3xl sm:text-5xl text-[var(--text)] mb-4">
                What We Source &amp; Brand
              </h2>
              <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
                Everything is manufactured and quality-checked under direct supervision in Kenya. Zero subcontracting ambiguity.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-8">
            {SERVICE_DOMAINS.map((domain, i) => (
              <Reveal key={domain.name} delay={i * 100}>
                <div className="card-surface rounded-[var(--radius-lg)] p-6 sm:p-8 border border-[var(--border)] hover:border-[#c8960c]/40 transition-all flex flex-col justify-between h-full">
                  <div>
                    <div className="mb-6">
                      <ProjectPhoto
                        src={domain.image}
                        alt={domain.name}
                        division="branding"
                        badge={domain.badge}
                        aspect="aspect-[16/9]"
                      />
                    </div>
                    <h3 className="font-display text-2xl text-[var(--text)] mb-3">{domain.name}</h3>
                    <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-6">{domain.description}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {domain.specs.map((spec) => (
                        <span key={spec} className="text-xs font-mono px-2.5 py-1 rounded bg-[var(--bg-soft)] text-[var(--text)] border border-[var(--border)]">
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="pt-4 border-t border-[var(--border)] flex items-center justify-between">
                    <Link href={domain.href} className="text-sm font-semibold text-[var(--accent)] hover:underline flex items-center gap-1">
                      Configure &amp; Quote <span>→</span>
                    </Link>
                    <span className="text-xs font-mono text-[var(--text-muted)]">Verified Production</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. PRODUCTION PIPELINE STEPS ──────────────────────────── */}
      <section className="section-py bg-[var(--bg-soft)] border-b border-[var(--border)]">
        <div className="max-w-content mx-auto px-6">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="font-mono text-xs uppercase tracking-widest text-[var(--accent)] block mb-2">
                // Industrial Production Standard
              </span>
              <h2 className="font-display text-3xl sm:text-5xl text-[var(--text)] mb-4">
                How We Manufacture
              </h2>
              <p className="text-sm sm:text-base text-[var(--text-muted)]">
                From raw textile inspection to the TouchDesk delivery note sign-off.
              </p>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {BRANDING_STEPS.map((step, i) => (
              <Reveal key={step.num} delay={i * 80}>
                <div className="card-surface p-6 sm:p-8 rounded-[var(--radius-lg)] border border-[var(--border)] h-full flex flex-col justify-between">
                  <div>
                    <span className="font-display text-4xl text-[var(--accent)]/30 block mb-4">
                      {step.num}
                    </span>
                    <h3 className="font-display text-xl text-[var(--text)] mb-3">{step.title}</h3>
                    <p className="text-sm text-[var(--text-muted)] leading-relaxed">{step.desc}</p>
                  </div>
                  <div className="pt-6 mt-6 border-t border-[var(--border)]">
                    <span className="text-[11px] font-mono text-[var(--accent)]">Step {step.num} of 04</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. PRINT & EMBROIDERY METHODS COMPARISON ──────────────── */}
      <section id="methods" className="section-py bg-[var(--bg)] border-b border-[var(--border)] scroll-section">
        <div className="max-w-content mx-auto px-6">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="font-mono text-xs uppercase tracking-widest text-[var(--accent)] block mb-2">
                // Technical Guide
              </span>
              <h2 className="font-display text-3xl sm:text-5xl text-[var(--text)] mb-4">
                Select Your Method
              </h2>
              <p className="text-sm sm:text-base text-[var(--text-muted)]">
                Direct comparison of durability, minimum orders, turnaround, and best use cases for Kenya&apos;s commercial market.
              </p>
            </div>
          </Reveal>

          {/* Method selector tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {COMPARISON_DATA.map((item, idx) => (
              <button
                key={item.method}
                onClick={() => setActiveComparison(idx)}
                className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider uppercase transition-all ${
                  activeComparison === idx
                    ? 'bg-[var(--accent)] text-[var(--accent-ink)] font-bold shadow-md'
                    : 'bg-[var(--surface)] text-[var(--text-muted)] border border-[var(--border)] hover:border-[var(--accent)]'
                }`}
              >
                {item.method}
              </button>
            ))}
          </div>

          {/* Active method display card */}
          <div className="card-surface rounded-[var(--radius-lg)] p-8 sm:p-12 border border-[var(--border)] max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-6 border-b border-[var(--border)] gap-4">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-[var(--accent)]">
                  Selected Production Method
                </span>
                <h3 className="font-display text-3xl text-[var(--text)] mt-1">
                  {COMPARISON_DATA[activeComparison].method}
                </h3>
              </div>
              <span className="font-mono text-xs text-[var(--text-muted)] bg-[var(--bg-soft)] px-3 py-1.5 rounded-full border border-[var(--border)]">
                {COMPARISON_DATA[activeComparison].minQty}
              </span>
            </div>

            <p className="text-base text-[var(--text)] leading-relaxed mb-8">
              {COMPARISON_DATA[activeComparison].technique}
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="p-4 rounded-xl bg-[var(--bg)] border border-[var(--border)]">
                <span className="text-xs font-mono text-[var(--text-muted)] block mb-1">BEST APPLICATION</span>
                <span className="text-sm font-semibold text-[var(--text)]">
                  {COMPARISON_DATA[activeComparison].bestFor}
                </span>
              </div>
              <div className="p-4 rounded-xl bg-[var(--bg)] border border-[var(--border)]">
                <span className="text-xs font-mono text-[var(--text-muted)] block mb-1">WASH DURABILITY</span>
                <span className="text-sm font-semibold text-[var(--text)]">
                  {COMPARISON_DATA[activeComparison].durability}
                </span>
              </div>
              <div className="p-4 rounded-xl bg-[var(--bg)] border border-[var(--border)]">
                <span className="text-xs font-mono text-[var(--text-muted)] block mb-1">TYPICAL TURNAROUND</span>
                <span className="text-sm font-semibold text-[var(--text)]">
                  {COMPARISON_DATA[activeComparison].turnaround}
                </span>
              </div>
              <div className="p-4 rounded-xl bg-[var(--bg)] border border-[var(--border)]">
                <span className="text-xs font-mono text-[var(--text-muted)] block mb-1">COLOR PALETTE</span>
                <span className="text-sm font-semibold text-[var(--text)]">
                  {COMPARISON_DATA[activeComparison].colorLimit}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. INTERACTIVE TOOLS: ROI & TENDER ─────────────────────── */}
      <section id="roi-calculator" className="section-py bg-[var(--bg-soft)] border-b border-[var(--border)] scroll-section">
        <div className="max-w-content mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <BrandingROICalculator />
            </div>
            <div id="tender-checker">
              <TenderComplianceChecker />
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. KENYA CLIMATE ZONE SELECTOR ────────────────────────── */}
      <section id="climate-zones" className="section-py bg-[var(--bg)] border-b border-[var(--border)] scroll-section">
        <div className="max-w-content mx-auto px-6">
          <ZoneDetector />
        </div>
      </section>

      {/* ── 8. FAST QUOTE WIDGET ──────────────────────────────────── */}
      <section className="section-py bg-[var(--bg-soft)] border-b border-[var(--border)]">
        <div className="max-w-content mx-auto px-6">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="font-mono text-xs uppercase tracking-widest text-[var(--accent)] block mb-2">
                // Instant Quotation
              </span>
              <h2 className="font-display text-3xl sm:text-5xl text-[var(--text)] mb-4">
                FastQuote Estimator
              </h2>
              <p className="text-sm sm:text-base text-[var(--text-muted)]">
                Calculate real volume pricing for branded apparel and promotional merchandise.
              </p>
            </div>
          </Reveal>
          <div className="max-w-3xl mx-auto">
            <FastQuoteWidget initialBrand="branding" />
          </div>
        </div>
      </section>
    </div>
  );
}
