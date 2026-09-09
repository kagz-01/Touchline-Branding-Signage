'use client';

import Link from 'next/link';
import { useState } from 'react';
import { getBrand } from '@/config/brands';
import { HOT_PRODUCTS_KE, GLOBAL_TRENDS_2026, getSeasonalRecommendations, MARKET_DATA } from '@/config/branding-knowledge';
import { Logo } from './Logo';
import { Reveal } from './Reveal';
import { HowItWorks } from './HowItWorks';
import { ZoneDetector } from './ZoneDetector';
import { BrandingROICalculator } from './BrandingROICalculator';
import { TenderComplianceChecker } from './TenderComplianceChecker';

const brand = getBrand('branding');

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

const SERVICE_CATEGORIES = [
  {
    name: 'Apparel & Textiles',
    description: 'Branded clothing that turns your staff and customers into walking billboards.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
    count: 8,
    highlight: 'Screen Printing, Embroidery, DTF, Sublimation',
  },
  {
    name: 'Hard Goods & Accessories',
    description: 'Branded items people use every day — keeping your name visible beyond the screen.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
    count: 5,
    highlight: 'UV Printing, Laser Engraving, Pad Printing',
  },
  {
    name: 'Labels & Patches',
    description: 'Branded identification that completes the product and reinforces your identity.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" />
        <line x1="7" y1="7" x2="7.01" y2="7" />
      </svg>
    ),
    count: 5,
    highlight: 'Embroidered Patches, Woven Labels, Leather Patches',
  },
  {
    name: 'Tender-Scale Sourcing',
    description: 'Bulk sourcing and fulfilment for county, corporate and NGO tenders — tracked from quote to delivery.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
        <rect x="9" y="3" width="6" height="4" rx="1" />
        <path d="M9 14l2 2 4-4" />
      </svg>
    ),
    count: 3,
    highlight: 'Government, Corporate, NGO Programmes',
  },
];

const BRANDING_STEPS = [
  { num: '01', title: 'Raw Materials', desc: 'We source commercial-grade materials — no substitutions, no compromises. Everything measured and staged for your production run.' },
  { num: '02', title: 'Digitization & Setup', desc: 'Your logo is digitized and prepared for production. Accuracy at this stage prevents failure in the field.' },
  { num: '03', title: 'Branding & Print', desc: 'The brand becomes visible. Whether it\'s an embroidery stitch or a screen print, quality is non-negotiable.' },
  { num: '04', title: 'Quality & Delivery', desc: 'Every item is quality-checked before it leaves our facility. Delivered on time, on spec, across Kenya.' },
];

const COMPARISON_DATA = [
  { method: 'Screen Printing', bestFor: 'T-shirts, tote bags, jerseys', durability: '★★★★☆', cost: 'Low', turnaround: '3-5 days', minQty: '50+', colorLimit: '4 colours' },
  { method: 'Embroidery', bestFor: 'Polos, caps, jackets, uniforms', durability: '★★★★★', cost: 'Medium', turnaround: '5-7 days', minQty: '10+', colorLimit: 'Unlimited' },
  { method: 'DTF (Direct-to-Film)', bestFor: 'Any fabric, full colour', durability: '★★★★☆', cost: 'Medium', turnaround: '2-3 days', minQty: '1+', colorLimit: 'Full colour' },
  { method: 'Sublimation', bestFor: 'Performance wear, jerseys', durability: '★★★★★', cost: 'Medium', turnaround: '5-7 days', minQty: '10+', colorLimit: 'Full colour' },
];

const TESTIMONIALS = brand.testimonials;

/* ------------------------------------------------------------------ */
/* BrandingHome                                                        */
/* ------------------------------------------------------------------ */

export function BrandingHome() {
  const [activeComparison, setActiveComparison] = useState(0);

  return (
    <div className="relative">
      {/* ── 1. HERO ──────────────────────────────────────────────── */}
      <section className="relative section-py-lg overflow-hidden grad-hero-subtle">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[var(--accent)] opacity-[0.03] blur-[150px]" />
        </div>

        <div className="relative z-10 max-w-content mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Reveal>
                <div className="flex items-center gap-3 mb-6">
                  <span className="line-accent" />
                  <span className="grad-kicker">{brand.heroKicker}</span>
                </div>
              </Reveal>

              <Reveal delay={80}>
                <h1 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[0.95] mb-6 text-[var(--text)]">
                  Put your brand
                  <br />
                  in their <span className="grad-text">hands.</span>
                </h1>
              </Reveal>

              <Reveal delay={160}>
                <p className="text-lg text-[var(--text-muted)] leading-relaxed mb-8 max-w-lg">
                  {brand.heroSub}
                </p>
              </Reveal>

              <Reveal delay={240}>
                <div className="flex flex-wrap gap-4 mb-10">
                  <Link href="/book" className="btn-grad">
                    Get a Quote <span>→</span>
                  </Link>
                  <a href="#what-we-do" className="btn-secondary glass-subtle">
                    See Our Services
                  </a>
                </div>
              </Reveal>

              {/* Trust signals */}
              <Reveal delay={320}>
                <div className="flex flex-wrap gap-6 text-sm text-[var(--text-muted)]">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
                    500+ items sourced
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
                    4-day avg turnaround
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
                    Nairobi + nationwide
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right side — brand visual */}
            <Reveal delay={200} direction="right">
              <div className="relative hidden md:block">
                <div className="aspect-square rounded-[var(--radius-lg)] bg-[var(--bg-soft)] border border-[var(--border)] p-12 flex items-center justify-center relative overflow-hidden">
                  {/* Decorative grid */}
                  <div className="absolute inset-0 opacity-[0.03]" aria-hidden="true">
                    <div className="absolute inset-0" style={{ backgroundImage: 'repeating-linear-gradient(0deg, var(--border) 0px, var(--border) 1px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, var(--border) 0px, var(--border) 1px, transparent 1px, transparent 40px)' }} />
                  </div>
                  <Logo brand="branding" className="text-4xl opacity-20" />
                </div>
                {/* Floating badge */}
                <div className="absolute -bottom-4 -left-4 glass rounded-[var(--radius-md)] px-4 py-3 shadow-lg">
                  <span className="font-mono text-xs text-[var(--accent)] uppercase tracking-widest block">Since 2024</span>
                  <span className="font-display text-sm text-[var(--text)]">Serving Kenya</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 2. PROBLEM ───────────────────────────────────────────── */}
      <section className="section-py bg-[var(--bg-soft)]">
        <div className="max-w-content mx-auto px-6">
          <div className="max-w-3xl">
            <Reveal>
              <span className="grad-kicker mb-6 block">
                // The problem
              </span>
              <h2 className="font-display text-3xl md:text-5xl leading-tight mb-6 text-[var(--text)]">
                The promo industry is full
                <br />
                of <span className="grad-text">middlemen.</span>
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="text-lg text-[var(--text-muted)] leading-relaxed max-w-2xl">
                You brief one vendor, chase another, and pray the embroidery matches the proof.
                We own the entire chain — from digitizing your logo to the final stitch.
                One partner. One timeline. One invoice.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 3. WHAT WE DO ────────────────────────────────────────── */}
      <section id="what-we-do" className="section-py bg-[var(--bg)] scroll-section">
        <div className="max-w-content mx-auto px-6">
          <Reveal>
            <div className="text-center mb-16">
              <span className="grad-kicker mb-4 block">
                // What we do
              </span>
              <h2 className="font-display text-3xl md:text-4xl text-[var(--text)] mb-4">
                Four ways to <span className="grad-text">brand</span> your world
              </h2>
              <p className="text-lead max-w-xl mx-auto">
                Every service is handled in-house from sourcing to delivery — no middlemen, no surprises.
              </p>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 gap-6">
            {SERVICE_CATEGORIES.map((cat, i) => (
              <Reveal key={cat.name} delay={i * 100}>
                <a href="/services" className="card-theme group p-8 rounded-[var(--radius-lg)] block h-full">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-[var(--radius-md)] bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-[var(--accent-ink)] group-hover:shadow-lg transition-all duration-300">
                      {cat.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display text-lg text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">
                        {cat.name}
                      </h3>
                      <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-widest">
                        {cat.count} services
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-4">
                    {cat.description}
                  </p>
                  <p className="font-mono text-[10px] text-[var(--accent)] uppercase tracking-widest">
                    {cat.highlight}
                  </p>
                </a>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-12 text-center">
              <Link href="/services" className="btn-ghost">
                View all services <span>→</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 4. HOW IT WORKS ──────────────────────────────────────── */}
      <section className="section-py bg-[var(--bg-soft)]">
        <div className="max-w-content mx-auto px-6">
          <Reveal>
            <div className="text-center mb-16">
              <span className="grad-kicker mb-4 block">
                // How it works
              </span>
              <h2 className="font-display text-3xl md:text-4xl text-[var(--text)]">
                From raw material to <span className="grad-text">delivered brand</span>
              </h2>
            </div>
          </Reveal>

          <div className="relative grid md:grid-cols-4 gap-8">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" aria-hidden="true" />

            {BRANDING_STEPS.map((step, i) => (
              <Reveal key={step.num} delay={i * 120}>
                <div className="relative text-center">
                  <div className="relative z-10 mx-auto mb-6 w-16 h-16 rounded-full bg-[var(--surface)] border-2 border-[var(--accent)] flex items-center justify-center">
                    <span className="font-mono text-sm font-bold text-[var(--accent)]">{step.num}</span>
                  </div>
                  <h3 className="font-display text-lg mb-3 text-[var(--text)]">{step.title}</h3>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed max-w-[240px] mx-auto">{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. SERVICE COMPARISON ─────────────────────────────────── */}
      <section className="section-py bg-[var(--bg)]">
        <div className="max-w-content mx-auto px-6">
          <Reveal>
            <div className="text-center mb-16">
              <span className="grad-kicker mb-4 block">
                // Not sure what you need?
              </span>
              <h2 className="font-display text-3xl md:text-4xl text-[var(--text)] mb-4">
                Compare our <span className="grad-text">printing methods</span>
              </h2>
              <p className="text-lead max-w-xl mx-auto">
                Every method has its strengths. Here&apos;s how to choose.
              </p>
            </div>
          </Reveal>

          {/* Method tabs */}
          <Reveal>
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {COMPARISON_DATA.map((item, i) => (
                <button
                  key={item.method}
                  onClick={() => setActiveComparison(i)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeComparison === i
                      ? 'bg-[var(--accent)] text-[var(--accent-ink)]'
                      : 'bg-[var(--bg-soft)] text-[var(--text-muted)] hover:text-[var(--text)] border border-[var(--border)]'
                  }`}
                >
                  {item.method}
                </button>
              ))}
            </div>
          </Reveal>

          {/* Comparison card */}
          <Reveal>
            <div className="card-theme rounded-[var(--radius-lg)] p-8 md:p-12 max-w-3xl mx-auto">
              <h3 className="font-display text-2xl text-[var(--text)] mb-8">
                {COMPARISON_DATA[activeComparison].method}
              </h3>

              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  { label: 'Best For', value: COMPARISON_DATA[activeComparison].bestFor },
                  { label: 'Durability', value: COMPARISON_DATA[activeComparison].durability },
                  { label: 'Cost', value: COMPARISON_DATA[activeComparison].cost },
                  { label: 'Turnaround', value: COMPARISON_DATA[activeComparison].turnaround },
                  { label: 'Min Quantity', value: COMPARISON_DATA[activeComparison].minQty },
                  { label: 'Colour Limit', value: COMPARISON_DATA[activeComparison].colorLimit },
                ].map((detail) => (
                  <div key={detail.label} className="flex flex-col gap-1">
                    <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-widest">
                      {detail.label}
                    </span>
                    <span className="text-sm font-medium text-[var(--text)]">
                      {detail.value}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-[var(--border)]">
                <Link href={`/book?service=${encodeURIComponent(COMPARISON_DATA[activeComparison].method)}`} className="btn-primary text-sm">
                  Get a Quote for {COMPARISON_DATA[activeComparison].method} <span>→</span>
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 6. PROOF ─────────────────────────────────────────────── */}
      <section className="section-py bg-[var(--bg-soft)]">
        <div className="max-w-content mx-auto px-6">
          {/* Stats */}
          <Reveal>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 mb-20 py-8 border-y border-[var(--border)] grad-section-alt">
              {[
                { value: '10K+', label: 'Items sourced & branded' },
                { value: '4-Day', label: 'Average turnaround' },
                { value: '500+', label: 'Projects delivered' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <span className="font-display text-2xl md:text-3xl text-[var(--accent)]">{item.value}</span>
                  <span className="text-sm text-[var(--text-muted)] max-w-[120px] leading-tight">{item.label}</span>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Testimonials */}
          <Reveal>
            <div className="text-center mb-12">
              <span className="grad-kicker mb-4 block">
                // What clients say
              </span>
              <h2 className="font-display text-3xl md:text-4xl text-[var(--text)]">
                Trusted by <span className="grad-text">procurement teams</span>
              </h2>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t.name} delay={i * 120}>
                <blockquote className="card-surface rounded-[var(--radius-md)] p-8 h-full flex flex-col">
                  <p className="font-editorial italic text-lg text-[var(--text)] leading-relaxed mb-6 flex-1">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-[var(--border)]">
                    <div className="w-8 h-px bg-[var(--accent)]" />
                    <div>
                      <p className="text-sm font-semibold text-[var(--text)]">{t.name}</p>
                      <p className="text-xs text-[var(--text-muted)]">{t.role}</p>
                    </div>
                  </div>
                </blockquote>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. SUSTAINABILITY ─────────────────────────────────────── */}
      <section className="section-py bg-[var(--bg)]">
        <div className="max-w-content mx-auto px-6">
          <Reveal>
            <div className="card-theme rounded-[var(--radius-lg)] p-8 md:p-12 text-center max-w-3xl mx-auto">
              <span className="grad-kicker mb-4 block">
                // Sustainability
              </span>
              <h2 className="font-display text-2xl md:text-3xl text-[var(--text)] mb-4">
                Branding that doesn&apos;t cost the earth
              </h2>
              <p className="text-[var(--text-muted)] leading-relaxed max-w-xl mx-auto mb-6">
                We offer eco-friendly product options — organic cotton, recycled polyester, reusable bags,
                and water-based inks. Ask us about sustainable alternatives for your next order.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <span className="px-3 py-1 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] text-xs font-mono uppercase tracking-widest">
                  Organic Cotton
                </span>
                <span className="px-3 py-1 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] text-xs font-mono uppercase tracking-widest">
                  Recycled Polyester
                </span>
                <span className="px-3 py-1 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] text-xs font-mono uppercase tracking-widest">
                  Water-Based Inks
                </span>
                <span className="px-3 py-1 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] text-xs font-mono uppercase tracking-widest">
                  Reusable Packaging
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 8. HOT PRODUCTS IN KENYA ────────────────────────────── */}
      <section className="section-py bg-[var(--bg-soft)]">
        <div className="max-w-content mx-auto px-6">
          <Reveal>
            <div className="text-center mb-16">
              <span className="font-mono text-xs text-[var(--accent)] uppercase tracking-[0.2em] mb-4 block">
                // What&apos;s trending
              </span>
              <h2 className="font-display text-3xl md:text-4xl text-[var(--text)] mb-4">
                Hot products in <span className="accent-word">Kenya 2026</span>
              </h2>
              <p className="text-lead max-w-xl mx-auto">
                Based on sales data across {MARKET_DATA.kenya.totalSuppliers} suppliers nationwide.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {HOT_PRODUCTS_KE.map((product, i) => (
              <Reveal key={product.name} delay={i * 60}>
                <div className="card-theme rounded-[var(--radius-md)] p-4 text-center h-full">
                  <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-widest block mb-2">
                    #{product.rank}
                  </span>
                  <h4 className="font-display text-sm text-[var(--text)] mb-2">{product.name}</h4>
                  <span className="font-mono text-[10px] text-[var(--accent)] block mb-2">{product.priceRange}</span>
                  <p className="text-[10px] text-[var(--text-muted)] leading-tight">{product.reason}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. GLOBAL TRENDS ────────────────────────────────────── */}
      <section className="section-py bg-[var(--bg)]">
        <div className="max-w-content mx-auto px-6">
          <Reveal>
            <div className="text-center mb-16">
              <span className="font-mono text-xs text-[var(--accent)] uppercase tracking-[0.2em] mb-4 block">
                // 2026 global trends
              </span>
              <h2 className="font-display text-3xl md:text-4xl text-[var(--text)] mb-4">
                What&apos;s shaping <span className="accent-word">corporate gifting</span>
              </h2>
              <p className="text-lead max-w-xl mx-auto">
                The global corporate gifting market hit $822B in 2024. Here&apos;s what&apos;s driving growth.
              </p>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {GLOBAL_TRENDS_2026.map((trend, i) => (
              <Reveal key={trend.name} delay={i * 80}>
                <div className="card-theme rounded-[var(--radius-lg)] p-6 h-full">
                  <h4 className="font-display text-lg text-[var(--text)] mb-2">{trend.name}</h4>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-4">{trend.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {trend.methods.slice(0, 2).map((m) => (
                      <span key={m} className="px-2 py-0.5 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] text-[9px] font-mono uppercase">
                        {m.replace(/-/g, ' ')}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 10. ZONE DETECTOR ────────────────────────────────────── */}
      <section className="section-py bg-[var(--bg-soft)]">
        <div className="max-w-content mx-auto px-6">
          <Reveal>
            <div className="text-center mb-12">
              <span className="font-mono text-xs text-[var(--accent)] uppercase tracking-[0.2em] mb-4 block">
                // Zone-aware branding
              </span>
              <h2 className="font-display text-3xl md:text-4xl text-[var(--text)] mb-4">
                Get recommendations for <span className="accent-word">your location</span>
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

      {/* ── 11. ROI CALCULATOR ─────────────────────────────────────── */}
      <section className="section-py bg-[var(--bg)]">
        <div className="max-w-content mx-auto px-6">
          <Reveal>
            <div className="text-center mb-12">
              <span className="font-mono text-xs text-[var(--accent)] uppercase tracking-[0.2em] mb-4 block">
                // The numbers
              </span>
              <h2 className="font-display text-3xl md:text-4xl text-[var(--text)] mb-4">
                How many <span className="accent-word">impressions</span> per KES?
              </h2>
              <p className="text-lead max-w-xl mx-auto">
                Branded merchandise costs up to 90% less per impression than digital ads. See for yourself.
              </p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <BrandingROICalculator />
          </Reveal>
        </div>
      </section>

      {/* ── 12. TENDER COMPLIANCE ─────────────────────────────────── */}
      <section className="section-py bg-[var(--bg-soft)]">
        <div className="max-w-content mx-auto px-6">
          <Reveal>
            <div className="text-center mb-12">
              <span className="font-mono text-xs text-[var(--accent)] uppercase tracking-[0.2em] mb-4 block">
                // Government & county tenders
              </span>
              <h2 className="font-display text-3xl md:text-4xl text-[var(--text)] mb-4">
                Tender <span className="accent-word">compliance</span> checker
              </h2>
              <p className="text-lead max-w-xl mx-auto">
                County and government tenders have strict requirements. Check if you&apos;re ready to submit.
              </p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <TenderComplianceChecker />
          </Reveal>
        </div>
      </section>

      {/* ── 13. CTA ───────────────────────────────────────────────── */}
      <section className="section-py bg-[var(--bg-soft)] border-t border-[var(--border)]">
        <div className="max-w-content mx-auto px-6 text-center">
          <Reveal>
            <h2 className="font-display text-4xl md:text-5xl text-[var(--text)] mb-6">
              Ready to put your brand <span className="accent-word">in their hands?</span>
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="text-lg text-[var(--text-muted)] max-w-xl mx-auto mb-10">
              Tell us what you need. We&apos;ll handle the sourcing, the branding, and the delivery — so you can focus on running your business.
            </p>
          </Reveal>
          <Reveal delay={160}>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/book" className="btn-primary glow-accent">
                Get a Quote <span>→</span>
              </Link>
              <a href="tel:+254700000000" className="btn-secondary glass-subtle">
                Call Us
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
