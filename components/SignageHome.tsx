'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { getBrand } from '@/config/brands';
import {
  HOT_PRODUCTS_KE,
  GLOBAL_TRENDS_2026,
  MARKET_DATA,
  WAYFINDING_STANDARDS,
  VEHICLE_BRANDING_PRICING,
  SIGNAGE_TYPES,
} from '@/config/signage-knowledge';
import { Logo } from './Logo';
import { Reveal } from './Reveal';
import { HowItWorks } from './HowItWorks';
import { SignageZoneDetector } from './SignageZoneDetector';

const SignageViewingCalculator = dynamic(
  () => import('./SignageViewingCalculator').then(m => m.SignageViewingCalculator),
  { ssr: false }
);
const IlluminationGuide = dynamic(
  () => import('./IlluminationGuide').then(m => m.IlluminationGuide),
  { ssr: false }
);

const brand = getBrand('signage');

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

const SERVICE_CATEGORIES = [
  {
    name: 'Illuminated Signs',
    description: 'LED-powered signs that work day and night — your brand visible 24/7.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path d="M9 18h6M10 22h4M12 2v1M4.22 4.22l.71.71M1 12h1M4.22 19.78l.71-.71M20.78 19.78l-.71-.71M23 12h-1M19.78 4.22l-.71.71" />
        <path d="M15 9a3 3 0 10-6 0c0 1.66 1.34 3 3 3s3-1.34 3-3z" />
      </svg>
    ),
    count: 5,
    highlight: 'Channel Letters, LED Neon, Halo Signs, Edge-Lit',
  },
  {
    name: 'Lightbox & Cabinet',
    description: 'Enclosed sign boxes with translucent faces and even LED illumination — cost-effective and versatile.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 3v18" />
      </svg>
    ),
    count: 5,
    highlight: 'Front-Lit, Backlit, Ultra-Thin, Blade Sign',
  },
  {
    name: 'Vinyl & Graphics',
    description: 'Cut or printed vinyl for vehicles, windows, walls, and floors — any surface becomes your canvas.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
    count: 5,
    highlight: 'Vehicle Wraps, Window Graphics, Wall Murals, Banners',
  },
  {
    name: 'Monument & Wayfinding',
    description: 'Large-scale freestanding signs and navigation systems for properties and campuses.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path d="M3 21h18M5 21V7l7-4 7 4v14" />
        <path d="M9 21v-6h6v6" />
      </svg>
    ),
    count: 4,
    highlight: 'Monument, Pylon, Wayfinding, Directory',
  },
];

const SIGNAGE_STEPS = [
  { num: '01', title: 'Site Survey', desc: 'We visit your location, measure dimensions, assess surfaces, and check electrical points — everything needed for a perfect fit.' },
  { num: '02', title: 'Design & Engineering', desc: 'Your sign is designed with exact specifications — materials, illumination, mounting, and structural engineering for longevity.' },
  { num: '03', title: 'Fabrication', desc: 'Cut, welded, painted, and assembled in our Nairobi workshop. Every component quality-checked before installation.' },
  { num: '04', title: 'Installation', desc: 'Professional installation by our certified team. Electrical connections, levelling, and final inspection — done right, once.' },
];

const VEHICLE_COMPARISON = [
  { type: 'Saloon', fullWrap: 'KES 45K-70K', impressions: '30K/day', lifespan: '3-5 years', bestFor: 'Sales teams, executives' },
  { type: 'SUV', fullWrap: 'KES 60K-90K', impressions: '50K/day', lifespan: '3-5 years', bestFor: 'Field teams, client visits' },
  { type: 'Lorry', fullWrap: 'KES 80K-150K', impressions: '70K/day', lifespan: '3-5 years', bestFor: 'Fleet branding, delivery' },
  { type: 'Bus', fullWrap: 'KES 100K-200K', impressions: '100K/day', lifespan: '3-5 years', bestFor: 'Public transport, shuttles' },
];

const TESTIMONIALS = brand.testimonials;

/* ------------------------------------------------------------------ */
/* SignageHome                                                         */
/* ------------------------------------------------------------------ */

export function SignageHome() {
  const [activeVehicle, setActiveVehicle] = useState(0);

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
                <h1 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[0.95] mb-6 text-[var(--text)]">
                  Signs that speak
                  <br />
                  <span className="grad-text">before you do.</span>
                </h1>
              </Reveal>

              <Reveal delay={160}>
                <p className="text-lg text-[var(--text-muted)] leading-relaxed mb-8 max-w-lg">
                  {brand.heroSub}
                </p>
              </Reveal>

              <Reveal delay={240}>
                <div className="flex flex-wrap gap-4 mb-10">
                  <Link href="/book" className="btn-grad glow-accent">
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
                    500+ signs installed
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
                    3-day avg turnaround
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
                  <Logo brand="signage" className="text-4xl opacity-20" />
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
              <h2 className="font-display text-3xl md:text-5xl leading-tight mb-6 text-[var(--text)]">
                Bad signage costs you
                <br />
                <span className="grad-text">customers you never meet.</span>
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="text-lg text-[var(--text-muted)] leading-relaxed max-w-2xl">
                A sign that fades in 18 months, flickers at night, or doesn&apos;t match your brand guidelines
                doesn&apos;t just look bad — it actively drives people away. We design, fabricate and install
                signage that holds up to weather, traffic, and time.
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
              <h2 className="font-display text-3xl md:text-4xl text-[var(--text)] mb-4">
                Four ways to <span className="grad-text">sign</span> your world
              </h2>
              <p className="text-lead max-w-xl mx-auto">
                Every sign is designed, fabricated and installed in-house — no subcontractors, no guesswork.
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
              <h2 className="font-display text-3xl md:text-4xl text-[var(--text)]">
                From site survey to <span className="grad-text">installed sign</span>
              </h2>
            </div>
          </Reveal>

          <div className="relative grid md:grid-cols-4 gap-8">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" aria-hidden="true" />

            {SIGNAGE_STEPS.map((step, i) => (
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

      {/* ── 5. VEHICLE BRANDING ──────────────────────────────────── */}
      <section className="section-py bg-[var(--bg)]">
        <div className="max-w-content mx-auto px-6">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="font-display text-3xl md:text-4xl text-[var(--text)] mb-4">
                Vehicle branding that <span className="grad-text">moves people</span>
              </h2>
              <p className="text-lead max-w-xl mx-auto">
                A branded vehicle generates 30,000-100,000 impressions per day. That&apos;s the highest ROI of any signage investment.
              </p>
            </div>
          </Reveal>

          {/* Vehicle type tabs */}
          <Reveal>
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {VEHICLE_COMPARISON.map((item, i) => (
                <button
                  key={item.type}
                  onClick={() => setActiveVehicle(i)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeVehicle === i
                      ? 'bg-[var(--accent)] text-[var(--accent-ink)]'
                      : 'bg-[var(--bg-soft)] text-[var(--text-muted)] hover:text-[var(--text)] border border-[var(--border)]'
                  }`}
                >
                  {item.type}
                </button>
              ))}
            </div>
          </Reveal>

          {/* Vehicle comparison card */}
          <Reveal>
            <div className="card-theme rounded-[var(--radius-lg)] p-8 md:p-12 max-w-3xl mx-auto">
              <h3 className="font-display text-2xl text-[var(--text)] mb-8">
                {VEHICLE_COMPARISON[activeVehicle].type} Branding
              </h3>

              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  { label: 'Full Wrap Price', value: VEHICLE_COMPARISON[activeVehicle].fullWrap },
                  { label: 'Daily Impressions', value: VEHICLE_COMPARISON[activeVehicle].impressions },
                  { label: 'Lifespan', value: VEHICLE_COMPARISON[activeVehicle].lifespan },
                  { label: 'Best For', value: VEHICLE_COMPARISON[activeVehicle].bestFor },
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
                <Link href={`/book?service=${encodeURIComponent(VEHICLE_COMPARISON[activeVehicle].type + ' Vehicle Wrap')}`} className="btn-primary text-sm">
                  Get a Quote for {VEHICLE_COMPARISON[activeVehicle].type} Wrap <span>→</span>
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
                { value: '500+', label: 'Signs installed' },
                { value: '3-Day', label: 'Average turnaround' },
                { value: '100%', label: 'In-house fabrication' },
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
              <h2 className="font-display text-3xl md:text-4xl text-[var(--text)]">
                Trusted by <span className="grad-text">facility managers</span>
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

      {/* ── 7. SAFETY & COMPLIANCE ────────────────────────────────── */}
      <section className="section-py bg-[var(--bg)]">
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

      {/* ── 8. HOT PRODUCTS IN KENYA ────────────────────────────── */}
      <section className="section-py bg-[var(--bg-soft)]">
        <div className="max-w-content mx-auto px-6">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="font-display text-3xl md:text-4xl text-[var(--text)] mb-4">
                Hot signage in <span className="grad-text">Kenya 2026</span>
              </h2>
              <p className="text-lead max-w-xl mx-auto">
                Based on demand data across {MARKET_DATA.kenya.totalSuppliers} suppliers nationwide.
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
              <h2 className="font-display text-3xl md:text-4xl text-[var(--text)] mb-4">
                What&apos;s shaping <span className="grad-text">signage</span>
              </h2>
              <p className="text-lead max-w-xl mx-auto">
                The global signage market hit $52.8B in 2025. Here&apos;s what&apos;s driving growth.
              </p>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {GLOBAL_TRENDS_2026.map((trend, i) => (
              <Reveal key={trend.name} delay={i * 80}>
                <div className="card-theme rounded-[var(--radius-lg)] p-6 h-full">
                  <h4 className="font-display text-lg text-[var(--text)] mb-2">{trend.name}</h4>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-4">{trend.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {trend.types.slice(0, 2).map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] text-[9px] font-mono uppercase">
                        {t.replace(/-/g, ' ')}
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
              <h2 className="font-display text-3xl md:text-4xl text-[var(--text)] mb-4">
                Get recommendations for <span className="grad-text">your location</span>
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

      {/* ── 11. VIEWING DISTANCE CALCULATOR ─────────────────────── */}
      <section className="section-py bg-[var(--bg)]">
        <div className="max-w-content mx-auto px-6">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl text-[var(--text)] mb-4">
                What size sign <span className="grad-text">do you need?</span>
              </h2>
              <p className="text-lead max-w-xl mx-auto">
                Too small = invisible. Too big = waste. Find the perfect letter height for your viewing distance.
              </p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <SignageViewingCalculator />
          </Reveal>
        </div>
      </section>

      {/* ── 12. ILLUMINATION GUIDE ──────────────────────────────── */}
      <section className="section-py bg-[var(--bg-soft)]">
        <div className="max-w-content mx-auto px-6">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl text-[var(--text)] mb-4">
                Which <span className="grad-text">illumination</span> type is right?
              </h2>
              <p className="text-lead max-w-xl mx-auto">
                Your business hours determine your lighting needs. Front-lit, halo, neon, or none?
              </p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <IlluminationGuide />
          </Reveal>
        </div>
      </section>

      {/* ── 13. CTA ───────────────────────────────────────────────── */}
      <section className="section-py bg-[var(--bg-soft)] border-t border-[var(--border)]">
        <div className="max-w-content mx-auto px-6 text-center">
          <Reveal>
            <h2 className="font-display text-4xl md:text-5xl text-[var(--text)] mb-6">
              Ready to make your brand <span className="grad-text">impossible to miss?</span>
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="text-lg text-[var(--text-muted)] max-w-xl mx-auto mb-10">
              Tell us what you need. We&apos;ll handle the design, the fabrication, and the installation — so you can focus on running your business.
            </p>
          </Reveal>
          <Reveal delay={160}>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/book" className="btn-primary glow-accent">
                Get a Quote <span>→</span>
              </Link>
              <a href="tel:+254722668696" className="btn-secondary glass-subtle">
                Call Us
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
