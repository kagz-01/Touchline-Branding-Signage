'use client';

import Link from 'next/link';
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
      {/* ── 1. HERO SECTION ───────────────────────────────────────── */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden pt-12 pb-20 border-b border-[var(--border)]">
        {/* Warm Gold Background Ambiance */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="parallax-slow absolute top-1/4 -right-32 w-[600px] h-[600px] rounded-full bg-[#c8960c] opacity-[0.08] blur-[160px]" data-speed="0.14" />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                'repeating-linear-gradient(0deg, var(--text) 0px, var(--text) 1px, transparent 1px, transparent 50px), repeating-linear-gradient(90deg, var(--text) 0px, var(--text) 1px, transparent 1px, transparent 50px)',
            }}
          />
        </div>

        <div className="relative z-10 max-w-content mx-auto px-6 w-full">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7">
              <Reveal>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-950/30 border border-amber-800/30 mb-6">
                  <span className="w-2 h-2 rounded-full bg-[#c8960c] animate-pulse" />
                  <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#d4a820]">
                    Touchline Branding // Division 01
                  </span>
                </div>

                <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-tight text-[var(--text)] mb-6">
                  PUT YOUR BRAND <br />
                  IN THEIR <span className="text-[#c8960c]">HANDS.</span>
                </h1>
              </Reveal>

              <Reveal delay={120}>
                <p className="text-base sm:text-lg text-[var(--text-muted)] leading-relaxed mb-8 max-w-xl font-normal">
                  From executive embroidered staff uniforms and corporate gift kits to tender-scale apparel rollouts across Kenya — we source, brand, inspect, and deliver with zero middlemen.
                </p>
              </Reveal>

              <Reveal delay={200}>
                <div className="flex flex-wrap gap-4 mb-10">
                  <Link href="/book?brand=branding" className="btn-primary shadow-lg shadow-[#c8960c]/15 px-7 py-3.5 text-sm">
                    Request Branding Quote <span>→</span>
                  </Link>
                  <a href="#methods" className="btn-secondary glass-subtle px-6 py-3.5 text-sm">
                    Compare Print Methods
                  </a>
                </div>
              </Reveal>

              {/* Trust badges */}
              <Reveal delay={280}>
                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[var(--border)] max-w-lg">
                  <div>
                    <span className="font-display text-xl sm:text-2xl text-[var(--accent)] block">500+</span>
                    <span className="text-xs text-[var(--text-muted)] font-mono">Items Sourced</span>
                  </div>
                  <div>
                    <span className="font-display text-xl sm:text-2xl text-[var(--accent)] block">4-Day</span>
                    <span className="text-xs text-[var(--text-muted)] font-mono">Avg Turnaround</span>
                  </div>
                  <div>
                    <span className="font-display text-xl sm:text-2xl text-[var(--accent)] block">47 Counties</span>
                    <span className="text-xs text-[var(--text-muted)] font-mono">Kenya-Wide Supply</span>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right Visual Image Showcase */}
            <div className="lg:col-span-5">
              <Reveal delay={200} direction="right">
                <div className="relative">
                  <ProjectPhoto
                    src="/images/branding/hero-merch.jpg"
                    alt="Touchline Premium Branded Apparel & Merch"
                    division="branding"
                    badge="Production Quality"
                    aspect="aspect-[4/3] sm:aspect-square"
                    className="shadow-2xl"
                  />
                  {/* Floating TouchDesk Operations Badge */}
                  <div className="absolute -bottom-4 -left-4 glass rounded-[var(--radius-md)] p-4 border border-amber-900/30 shadow-xl max-w-[220px] animate-float glass-interactive">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-[#c8960c] block mb-1">
                      Operations Engine
                    </span>
                    <p className="text-xs font-semibold text-[var(--text)]">
                      TouchDesk Proofing &amp; Biometric Handover
                    </p>
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

                    <h3 className="font-display text-2xl text-[var(--text)] mb-2">{domain.name}</h3>
                    <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-6 font-normal">
                      {domain.description}
                    </p>

                    <ul className="grid sm:grid-cols-2 gap-2 text-xs font-mono text-[var(--text-muted)] mb-6">
                      {domain.specs.map((spec) => (
                        <li key={spec} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#c8960c]" />
                          {spec}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-[var(--border)] flex items-center justify-between">
                    <Link
                      href={`/book?brand=branding&service=${encodeURIComponent(domain.name)}`}
                      className="text-xs font-display uppercase tracking-wider text-[var(--accent)] hover:underline flex items-center gap-1.5"
                    >
                      Configure &amp; Quote <span>→</span>
                    </Link>
                    <span className="font-mono text-[10px] text-[var(--text-muted)]">Verified Production</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. HOW IT WORKS ───────────────────────────────────────── */}
      <section className="section-py bg-[var(--bg-soft)] border-b border-[var(--border)]">
        <div className="max-w-content mx-auto px-6">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="font-mono text-xs uppercase tracking-widest text-[var(--accent)] block mb-2">
                // The Operational Protocol
              </span>
              <h2 className="font-display text-3xl sm:text-4xl text-[var(--text)]">
                From Raw Cotton to <span className="grad-text">Verified Delivery</span>
              </h2>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {BRANDING_STEPS.map((step, i) => (
              <Reveal key={step.num} delay={i * 100}>
                <div className="card-surface p-6 rounded-[var(--radius-md)] border border-[var(--border)] h-full">
                  <div className="w-12 h-12 rounded-full bg-amber-950/30 border border-amber-800/40 text-[#c8960c] flex items-center justify-center font-mono font-bold text-sm mb-4">
                    {step.num}
                  </div>
                  <h3 className="font-display text-lg mb-2 text-[var(--text)]">{step.title}</h3>
                  <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. INTERACTIVE PRINTING METHODS CONSOLE (HCI UX) ──────── */}
      <section id="methods" className="section-py bg-[var(--bg)] border-b border-[var(--border)] scroll-section">
        <div className="max-w-content mx-auto px-6">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="font-mono text-xs uppercase tracking-widest text-[var(--accent)] block mb-2">
                // Technical Decision Matrix
              </span>
              <h2 className="font-display text-3xl sm:text-5xl text-[var(--text)] mb-3">
                Select Your <span className="grad-text">Branding Method</span>
              </h2>
              <p className="text-sm text-[var(--text-muted)]">
                Compare durability, volume thresholds, and turnaround before submitting your production brief.
              </p>
            </div>
          </Reveal>

          {/* Interactive Method Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {COMPARISON_DATA.map((item, i) => (
              <button
                key={item.method}
                onClick={() => setActiveComparison(i)}
                className={`px-5 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider transition-all duration-300 ${
                  activeComparison === i
                    ? 'bg-[#c8960c] text-white shadow-lg font-bold scale-105'
                    : 'bg-[var(--bg-soft)] text-[var(--text-muted)] hover:text-[var(--text)] border border-[var(--border)]'
                }`}
              >
                {item.method}
              </button>
            ))}
          </div>

          {/* Active Method Console Card */}
          <div className="card-surface rounded-[var(--radius-lg)] p-8 sm:p-12 border border-amber-900/30 max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-[var(--border)]">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#c8960c] block mb-1">
                  Technique Profile
                </span>
                <h3 className="font-display text-3xl text-[var(--text)]">
                  {COMPARISON_DATA[activeComparison].method}
                </h3>
              </div>
              <Link
                href={`/book?brand=branding&service=${encodeURIComponent(COMPARISON_DATA[activeComparison].method)}`}
                className="btn-primary text-xs px-5 py-2.5 whitespace-nowrap self-start sm:self-auto"
              >
                Quote this Method <span>→</span>
              </Link>
            </div>

            <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-8 bg-[var(--bg-soft)] p-4 rounded-[var(--radius-sm)] border border-[var(--border)]">
              <span className="font-semibold text-[var(--text)] font-mono text-xs block mb-1">Process Mechanics:</span>
              {COMPARISON_DATA[activeComparison].technique}
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div className="p-4 rounded-[var(--radius-sm)] bg-[var(--bg)] border border-[var(--border)]">
                <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-widest block mb-1">
                  Best Suited For
                </span>
                <span className="text-sm font-medium text-[var(--text)] leading-snug block">
                  {COMPARISON_DATA[activeComparison].bestFor}
                </span>
              </div>

              <div className="p-4 rounded-[var(--radius-sm)] bg-[var(--bg)] border border-[var(--border)]">
                <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-widest block mb-1">
                  Durability Rating
                </span>
                <span className="text-sm font-medium text-amber-400 block">
                  {COMPARISON_DATA[activeComparison].durability}
                </span>
              </div>

              <div className="p-4 rounded-[var(--radius-sm)] bg-[var(--bg)] border border-[var(--border)]">
                <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-widest block mb-1">
                  Cost Structure
                </span>
                <span className="text-sm font-medium text-[var(--text)] block">
                  {COMPARISON_DATA[activeComparison].cost}
                </span>
              </div>

              <div className="p-4 rounded-[var(--radius-sm)] bg-[var(--bg)] border border-[var(--border)]">
                <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-widest block mb-1">
                  Turnaround Timeline
                </span>
                <span className="text-sm font-medium text-[var(--text)] block">
                  {COMPARISON_DATA[activeComparison].turnaround}
                </span>
              </div>

              <div className="p-4 rounded-[var(--radius-sm)] bg-[var(--bg)] border border-[var(--border)]">
                <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-widest block mb-1">
                  Minimum Order (MOQ)
                </span>
                <span className="text-sm font-medium text-[var(--text)] block">
                  {COMPARISON_DATA[activeComparison].minQty}
                </span>
              </div>

              <div className="p-4 rounded-[var(--radius-sm)] bg-[var(--bg)] border border-[var(--border)]">
                <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-widest block mb-1">
                  Color Flexibility
                </span>
                <span className="text-sm font-medium text-[var(--text)] block">
                  {COMPARISON_DATA[activeComparison].colorLimit}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. FAST-TRACK ESTIMATOR (TouchDesk Embedded) ─────────── */}
      <section className="section-py bg-[var(--bg-soft)] border-b border-[var(--border)]">
        <div className="max-w-content mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <FastQuoteWidget />
          </div>
        </div>
      </section>

      {/* ── 7. ROI CALCULATOR ─────────────────────────────────────── */}
      <section id="roi-calculator" className="section-py bg-[var(--bg)] border-b border-[var(--border)] scroll-section">
        <div className="max-w-content mx-auto px-6">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="font-mono text-xs uppercase tracking-widest text-[var(--accent)] block mb-2">
                // Physical Media Economics
              </span>
              <h2 className="font-display text-3xl sm:text-5xl text-[var(--text)] mb-3">
                Cost Per Impression <span className="grad-text">Calculator</span>
              </h2>
              <p className="text-sm text-[var(--text-muted)]">
                Branded merchandise costs up to 90% less per impression over its lifespan compared to digital ads.
              </p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <BrandingROICalculator />
          </Reveal>
        </div>
      </section>

      {/* ── 8. TENDER COMPLIANCE CHECKER ──────────────────────────── */}
      <section id="tender-checker" className="section-py bg-[var(--bg-soft)] border-b border-[var(--border)] scroll-section">
        <div className="max-w-content mx-auto px-6">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="font-mono text-xs uppercase tracking-widest text-[var(--accent)] block mb-2">
                // Government &amp; Institutional Tenders
              </span>
              <h2 className="font-display text-3xl sm:text-5xl text-[var(--text)] mb-3">
                Tender Compliance <span className="grad-text">Audit Checklist</span>
              </h2>
              <p className="text-sm text-[var(--text-muted)]">
                Verify if your technical documentation and specs meet Kenya Public Procurement (PPRA) and County criteria.
              </p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <TenderComplianceChecker />
          </Reveal>
        </div>
      </section>

      {/* ── 9. KENYA CLIMATE ZONE RECOMMENDATIONS ─────────────────── */}
      <section id="climate-zones" className="section-py bg-[var(--bg)] border-b border-[var(--border)] scroll-section">
        <div className="max-w-content mx-auto px-6">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="font-mono text-xs uppercase tracking-widest text-[var(--accent)] block mb-2">
                // Location &amp; Environment Intelligence
              </span>
              <h2 className="font-display text-3xl sm:text-5xl text-[var(--text)] mb-3">
                Climate-Smart <span className="grad-text">Fabric Selection</span>
              </h2>
              <p className="text-sm text-[var(--text-muted)]">
                Kenya’s climate ranges from coastal humidity to highland cold. Select materials that withstand your specific operating conditions.
              </p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <ZoneDetector />
          </Reveal>
        </div>
      </section>

      {/* ── 10. HOT PRODUCTS & MARKET DEMAND ──────────────────────── */}
      <section className="section-py bg-[var(--bg-soft)] border-b border-[var(--border)]">
        <div className="max-w-content mx-auto px-6">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="font-mono text-xs uppercase tracking-widest text-[var(--accent)] block mb-2">
                // Kenyan Procurement Intelligence
              </span>
              <h2 className="font-display text-3xl sm:text-4xl text-[var(--text)] mb-3">
                Trending Corporate Products in Kenya
              </h2>
              <p className="text-xs sm:text-sm text-[var(--text-muted)]">
                Aggregate order volume across {MARKET_DATA.kenya.totalSuppliers} verified suppliers nationwide.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {HOT_PRODUCTS_KE.map((product, i) => (
              <Reveal key={product.name} delay={i * 50}>
                <div className="card-surface rounded-[var(--radius-md)] p-4 text-center h-full border border-[var(--border)] hover:border-[#c8960c]/40 transition-colors">
                  <span className="font-mono text-[10px] text-[#c8960c] uppercase tracking-widest block mb-1">
                    Rank #{product.rank}
                  </span>
                  <h4 className="font-display text-sm text-[var(--text)] mb-1">{product.name}</h4>
                  <span className="font-mono text-[11px] text-[var(--accent)] block mb-2 font-semibold">
                    {product.priceRange}
                  </span>
                  <p className="text-[10px] text-[var(--text-muted)] leading-tight">{product.reason}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 11. CROSS-SELL TO SIGNAGE DIVISION ────────────────────── */}
      <section className="section-py bg-gradient-to-r from-[#0b131f] to-[#060b12] text-white border-b border-blue-900/30">
        <div className="max-w-content mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="max-w-xl">
              <span className="font-mono text-xs uppercase tracking-widest text-[#0070f3] block mb-2">
                Need Architectural Signage Too?
              </span>
              <h3 className="font-display text-3xl sm:text-4xl text-blue-50 mb-3">
                Touchline Signage &amp; Structural Fabrication
              </h3>
              <p className="text-sm text-blue-200/70 leading-relaxed font-normal">
                Opening a branch or rebranding a fleet? Combine your uniforms with 3D illuminated letters, high-output LED lightboxes, and commercial vehicle wraps under one invoice.
              </p>
            </div>

            <a
              href="https://signage.touchlineltd.co.ke/"
              className="btn-primary text-xs px-6 py-3 whitespace-nowrap self-start md:self-auto shadow-lg"
              style={{ background: '#0070f3', borderColor: '#0070f3' }}
            >
              Explore Signage Division <span>→</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── 12. FINAL HIGH-CONVERSION CTA ─────────────────────────── */}
      <section className="section-py bg-gradient-to-b from-[var(--bg)] to-[var(--bg-soft)]">
        <div className="max-w-content mx-auto px-6 text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--bg-soft)] border border-[var(--border)] mb-6">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span className="font-mono text-[11px] uppercase tracking-widest text-[var(--text-muted)]">
                TouchDesk Instant Quote Intake
              </span>
            </div>

            <h2 className="font-display text-4xl sm:text-6xl text-[var(--text)] mb-6 max-w-3xl mx-auto leading-tight">
              Ready to Put Your Brand <br />
              <span className="text-[#c8960c]">In Their Hands?</span>
            </h2>
          </Reveal>

          <Reveal delay={80}>
            <p className="text-base sm:text-lg text-[var(--text-muted)] max-w-xl mx-auto mb-10 leading-relaxed font-normal">
              Whether you need 50 corporate polos, a complete executive gift batch, or a tender supply run — submit your specifications and receive an estimate directly from our desk team.
            </p>
          </Reveal>

          <Reveal delay={160}>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/book?brand=branding" className="btn-primary shadow-xl shadow-[#c8960c]/20 px-8 py-3.5 text-sm">
                Get a Comprehensive Quote <span>→</span>
              </Link>
              <a
                href="https://wa.me/254722668696?text=Hi%20Touchline%20Branding%2C%20I%20would%20like%20to%20request%20a%20quotation%20for%20branded%20merchandise."
                target="_blank"
                rel="noreferrer"
                className="btn-secondary glass-subtle px-7 py-3.5 text-sm flex items-center gap-2"
              >
                <span>💬</span> WhatsApp Branding Desk
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
