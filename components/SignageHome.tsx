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
import { ProjectPhoto } from './ProjectPhoto';
import { FastQuoteWidget } from './FastQuoteWidget';
import { SignageZoneDetector } from './SignageZoneDetector';

const SignageViewingCalculator = dynamic(
  () => import('./SignageViewingCalculator').then((m) => m.SignageViewingCalculator),
  {
    ssr: false,
    loading: () => (
      <div className="card-theme p-8 rounded-[var(--radius-lg)] text-center text-sm text-[var(--text-muted)] animate-pulse">
        Initializing Viewing Distance Engine...
      </div>
    ),
  }
);

const IlluminationGuide = dynamic(
  () => import('./IlluminationGuide').then((m) => m.IlluminationGuide),
  {
    ssr: false,
    loading: () => (
      <div className="card-theme p-8 rounded-[var(--radius-lg)] text-center text-sm text-[var(--text-muted)] animate-pulse">
        Loading Illumination Comparator...
      </div>
    ),
  }
);

const brand = getBrand('signage');

/* ------------------------------------------------------------------ */
/* Data Definitions                                                   */
/* ------------------------------------------------------------------ */

interface SignSystemCategory {
  id: string;
  title: string;
  badge: string;
  subtitle: string;
  description: string;
  photoSrc: string;
  specs: { label: string; value: string }[];
  applications: string[];
}

const SIGN_SYSTEMS: SignSystemCategory[] = [
  {
    id: 'channel-letters',
    title: '3D Illuminated Channel Letters',
    badge: 'Flagship Commercial',
    subtitle: 'High-Impact Brand Identity',
    description:
      'Individually fabricated 3D letters with stainless steel or aluminum returns and acrylic faces. Powered by high-efficiency IP67 Samsung LED modules for brilliant, uniform illumination day and night.',
    photoSrc: '/images/signage/3d-channel-letters.jpg',
    specs: [
      { label: 'Face Material', value: '3mm Cast Acrylic (Diffusing)' },
      { label: 'Returns / Housing', value: '0.8-1.2mm SS304 or Powdered AL' },
      { label: 'Illumination', value: 'IP67 Samsung SMD 2835 LEDs (6500K / RGB)' },
      { label: 'Lifespan', value: '50,000+ Operating Hours (5+ Yrs)' },
    ],
    applications: ['Corporate Headquarters', 'Bank Branches', 'Retail Flagships', 'Hospital Entrances'],
  },
  {
    id: 'lightboxes',
    title: 'Architectural Lightboxes & Fascias',
    badge: 'Seamless Illumination',
    subtitle: 'Modern Clean Geometry',
    description:
      'Engineered aluminum sign cabinets featuring edge-lit or backlit LED arrays with vibrant tension fabric or UV-stable poly fronts. Precision-cut and sealed against dust, rain, and insects.',
    photoSrc: '/images/signage/led-lightbox.jpg',
    specs: [
      { label: 'Frame Extrusion', value: 'Heavy-Gauge Anodized Aluminum' },
      { label: 'Face Options', value: 'Polycarbonate / Acrylic / Tension Fabric' },
      { label: 'Power Consumption', value: 'Ultra-low LED driver (Mean Well)' },
      { label: 'Maintenance', value: 'Quick-access modular front face' },
    ],
    applications: ['Shopping Mall Storefronts', 'Drive-Thrus', 'Airport Terminals', 'Office Parks'],
  },
  {
    id: 'fleet-wraps',
    title: 'Commercial Fleet & Vehicle Wraps',
    badge: 'High-ROI Transit Media',
    subtitle: 'Mobile Advertising at Scale',
    description:
      'Full vehicle wraps, half-wraps, and spot branding using premium cast vinyl with optically clear UV laminate. Engineered to resist Kenyan sun, dust, and highway abrasion without paint damage.',
    photoSrc: '/images/signage/vehicle-wrap.jpg',
    specs: [
      { label: 'Vinyl Grade', value: 'Cast PVC with Micro Air-Release' },
      { label: 'Protective Film', value: 'Cast UV Gloss/Matte Overlaminate' },
      { label: 'Daily Visibility', value: '30,000 to 100,000+ Impressions/Day' },
      { label: 'Removal Guarantee', value: 'Clean removal without residue' },
    ],
    applications: ['Logistics Fleets', 'Corporate Sales Cars', 'Distribution Lorries', 'Executive Shuttles'],
  },
  {
    id: 'pylons-monuments',
    title: 'Pylon, Totem & Highway Monuments',
    badge: 'Structural Landmark',
    subtitle: 'Visible from 150+ Meters',
    description:
      'Freestanding multi-tenant pylon signs and corporate entry monuments anchored with reinforced concrete footings. Engineered to KenHA clearance standards and coastal/rift valley wind gust specifications.',
    photoSrc: '/images/signage/pylon-monument.jpg',
    specs: [
      { label: 'Chassis Structure', value: 'Hot-Dip Galvanized Structural Steel' },
      { label: 'Cladding Material', value: 'Aluminum Composite Panel (ACP) 4mm' },
      { label: 'Wind Load Rating', value: 'Engineered for up to 120 km/h gusts' },
      { label: 'Permit Readiness', value: 'KenHA & County Structural CAD Drawings' },
    ],
    applications: ['Petrol Stations', 'Commercial Business Parks', 'Hotel Entrances', 'Industrial Complexes'],
  },
];

const SIGNAGE_STEPS = [
  {
    num: '01',
    title: 'Site Laser Survey',
    desc: 'Our technical team visits your site to measure facade dimensions, verify electrical points, and analyze structural mounting substrates.',
    tech: 'Leica Laser Disto · Substrate Check',
  },
  {
    num: '02',
    title: 'Structural CAD & Engineering',
    desc: 'We generate production-accurate CAD drawings, wind-load calculations, electrical schematics, and county permit approval packs.',
    tech: 'SolidWorks / AutoCAD · KenHA Specs',
  },
  {
    num: '03',
    title: 'CNC Precision Fabrication',
    desc: 'Fabricated in our Nairobi workshop using fiber laser cutting, automated channel letter bending, and 48-hour continuous LED burn-in testing.',
    tech: 'Fiber Laser · 48H LED Burn-In',
  },
  {
    num: '04',
    title: 'Certified Rigging & Install',
    desc: 'Safe installation by certified riggers using boom lifts and scaffold rigs. Complete wiring, sealing, and safety sign-off.',
    tech: 'DOSH Safety · 3-Year Guarantee',
  },
];

const VEHICLE_COMPARISON = [
  {
    type: 'Saloon / Sedan',
    fullWrap: 'KES 45,000 - 70,000',
    halfWrap: 'KES 25,000 - 35,000',
    impressions: '35,000 / day',
    lifespan: '3-5 years',
    bestFor: 'Corporate sales fleets, Uber/taxi branding, executive vehicles',
    coverage: '~14 - 18 m²',
  },
  {
    type: 'SUV / Double Cab Pickup',
    fullWrap: 'KES 65,000 - 95,000',
    halfWrap: 'KES 35,000 - 48,000',
    impressions: '50,000 / day',
    lifespan: '3-5 years',
    bestFor: 'Field engineering teams, agro-chemical & telecom support vehicles',
    coverage: '~20 - 26 m²',
  },
  {
    type: 'Commercial Van (HiAce / Transit)',
    fullWrap: 'KES 75,000 - 110,000',
    halfWrap: 'KES 40,000 - 55,000',
    impressions: '65,000 / day',
    lifespan: '3-5 years',
    bestFor: 'Express courier services, bakery & FMCG distribution, catering vans',
    coverage: '~24 - 32 m²',
  },
  {
    type: 'Medium Lorry (Canter / FRR)',
    fullWrap: 'KES 95,000 - 160,000',
    halfWrap: 'KES 50,000 - 75,000',
    impressions: '80,000 / day',
    lifespan: '3-5 years',
    bestFor: 'Manufacturing logistics, beverage distribution, nationwide routes',
    coverage: '~35 - 50 m²',
  },
  {
    type: 'Public Bus / High-Capacity Coach',
    fullWrap: 'KES 140,000 - 240,000',
    halfWrap: 'KES 75,000 - 110,000',
    impressions: '100,000+ / day',
    lifespan: '3-5 years',
    bestFor: 'National transport saccos, corporate shuttles, school bus branding',
    coverage: '~60 - 85 m²',
  },
];

const TESTIMONIALS = brand.testimonials;

/* ------------------------------------------------------------------ */
/* SignageHome Component                                               */
/* ------------------------------------------------------------------ */

export function SignageHome() {
  const [activeVehicle, setActiveVehicle] = useState(0);

  return (
    <div className="relative">
      {/* ── 1. CINEMATIC INDUSTRIAL HERO ─────────────────────────── */}
      <section className="relative pt-24 pb-20 md:pt-32 md:pb-28 overflow-hidden grad-hero-subtle border-b border-[var(--border)]">
        {/* Glow ambient background (Precision Blue #0070f3) */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 right-1/4 w-[700px] h-[700px] rounded-full bg-[#0070f3] opacity-[0.04] blur-[160px]" />
          <div className="absolute -bottom-20 left-10 w-[500px] h-[500px] rounded-full bg-[#00a8ff] opacity-[0.03] blur-[140px]" />
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage:
                'repeating-linear-gradient(0deg, var(--border) 0px, var(--border) 1px, transparent 1px, transparent 48px), repeating-linear-gradient(90deg, var(--border) 0px, var(--border) 1px, transparent 1px, transparent 48px)',
            }}
          />
        </div>

        <div className="relative z-10 max-w-content mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Value Proposition */}
            <div className="lg:col-span-7">
              <Reveal>
                <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#0070f3]/10 border border-[#0070f3]/25 mb-6">
                  <span className="w-2 h-2 rounded-full bg-[#0070f3] animate-pulse" />
                  <span className="font-mono text-[11px] font-semibold text-[#0070f3] tracking-widest uppercase">
                    Touchline Signage Division · Nairobi Workshop
                  </span>
                </div>
              </Reveal>

              <Reveal delay={80}>
                <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.02] mb-6 text-[var(--text)] tracking-tight">
                  Signs that speak <br />
                  <span className="bg-gradient-to-r from-[#0070f3] via-[#0ea5e9] to-[#38bdf8] bg-clip-text text-transparent">
                    before you say a word.
                  </span>
                </h1>
              </Reveal>

              <Reveal delay={160}>
                <p className="text-lg md:text-xl text-[var(--text-muted)] leading-relaxed mb-8 max-w-2xl">
                  From high-rise 3D illuminated channel letters in Nairobi&apos;s CBD to highway pylon signs and corporate vehicle fleet wraps across Kenya. Fabricated in-house, engineered to KenHA & OSHA standards, and connected directly to TouchDesk for instant dispatch.
                </p>
              </Reveal>

              <Reveal delay={240}>
                <div className="flex flex-wrap items-center gap-4 mb-10">
                  <a href="#fast-quote" className="btn-primary glow-accent px-7 py-3.5 text-base font-semibold">
                    Instant Quote Configurator <span>→</span>
                  </a>
                  <a href="#sign-systems" className="btn-secondary glass-subtle px-6 py-3.5 text-base">
                    Explore Sign Systems
                  </a>
                </div>
              </Reveal>

              {/* Verified Trust Metrics */}
              <Reveal delay={320}>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-[var(--border)]">
                  <div>
                    <div className="font-display text-2xl lg:text-3xl font-bold text-[var(--text)]">500+</div>
                    <div className="font-mono text-[11px] text-[var(--text-muted)] uppercase tracking-wider">
                      Installed Kenya
                    </div>
                  </div>
                  <div>
                    <div className="font-display text-2xl lg:text-3xl font-bold text-[#0070f3]">100%</div>
                    <div className="font-mono text-[11px] text-[var(--text-muted)] uppercase tracking-wider">
                      In-House Fab
                    </div>
                  </div>
                  <div>
                    <div className="font-display text-2xl lg:text-3xl font-bold text-[var(--text)]">IP67</div>
                    <div className="font-mono text-[11px] text-[var(--text-muted)] uppercase tracking-wider">
                      LED Weatherproof
                    </div>
                  </div>
                  <div>
                    <div className="font-display text-2xl lg:text-3xl font-bold text-[#0070f3]">3-5 Yrs</div>
                    <div className="font-mono text-[11px] text-[var(--text-muted)] uppercase tracking-wider">
                      UV Warranty
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right Column: Hero Visual Feature */}
            <div className="lg:col-span-5">
              <Reveal delay={200} direction="right">
                <div className="relative">
                  <div className="relative rounded-[var(--radius-lg)] p-2 bg-gradient-to-b from-[#0070f3]/30 via-[var(--border)] to-transparent">
                    <ProjectPhoto
                      src="/images/signage/hero-signage.jpg"
                      alt="Touchline 3D Illuminated Channel Letters Architectural Facade"
                      division="signage"
                      badge="3D Illuminated Facade · Nairobi HQ"
                      aspect="aspect-[4/3] md:aspect-[1/1]"
                      className="shadow-2xl"
                    />
                  </div>

                  {/* Telemetry Float Cards */}
                  <div className="absolute -bottom-6 -left-6 glass border border-[var(--border)] rounded-[var(--radius-md)] p-4 shadow-xl hidden sm:block max-w-[220px]">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                      <span className="font-mono text-[10px] text-emerald-500 font-semibold uppercase tracking-wider">
                        Live Fabrication
                      </span>
                    </div>
                    <p className="font-display text-xs text-[var(--text)]">
                      CNC Automated Channel Bending & Samsung SMD Array
                    </p>
                  </div>

                  <div className="absolute -top-4 -right-4 glass border border-[#0070f3]/30 rounded-[var(--radius-md)] px-4 py-2.5 shadow-lg hidden sm:block">
                    <span className="font-mono text-[10px] text-[#0070f3] uppercase tracking-widest block font-bold">
                      TOUCHDESK DISPATCH
                    </span>
                    <span className="text-xs text-[var(--text)] font-medium">Real-time status tracking</span>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. STICKY QUICK WAYFINDER ─────────────────────────────── */}
      <nav
        aria-label="Signage Section Navigation"
        className="sticky top-16 z-30 bg-[var(--bg)]/90 backdrop-blur-md border-b border-[var(--border)] py-3 px-6 overflow-x-auto"
      >
        <div className="max-w-content mx-auto flex items-center justify-start md:justify-center gap-2 text-xs font-mono whitespace-nowrap">
          <a
            href="#sign-systems"
            className="px-3 py-1.5 rounded-full hover:bg-[var(--bg-soft)] text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
          >
            01. Core Systems
          </a>
          <a
            href="#fast-quote"
            className="px-3 py-1.5 rounded-full bg-[#0070f3]/10 text-[#0070f3] font-semibold border border-[#0070f3]/20 hover:bg-[#0070f3]/20 transition-colors"
          >
            02. Live Fast Quote
          </a>
          <a
            href="#viewing-distance"
            className="px-3 py-1.5 rounded-full hover:bg-[var(--bg-soft)] text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
          >
            03. Viewing Distance Calc
          </a>
          <a
            href="#illumination"
            className="px-3 py-1.5 rounded-full hover:bg-[var(--bg-soft)] text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
          >
            04. Illumination Guide
          </a>
          <a
            href="#vehicle-wraps"
            className="px-3 py-1.5 rounded-full hover:bg-[var(--bg-soft)] text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
          >
            05. Fleet Wraps
          </a>
          <a
            href="#climate-zones"
            className="px-3 py-1.5 rounded-full hover:bg-[var(--bg-soft)] text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
          >
            06. Climate Zones
          </a>
          <a
            href="#compliance"
            className="px-3 py-1.5 rounded-full hover:bg-[var(--bg-soft)] text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
          >
            07. OSHA & KenHA
          </a>
        </div>
      </nav>

      {/* ── 3. PROBLEM & COGNITIVE CONTRAST ───────────────────────── */}
      <section className="section-py bg-[var(--bg-soft)] border-b border-[var(--border)]">
        <div className="max-w-content mx-auto px-6">
          <div className="max-w-3xl">
            <Reveal>
              <div className="font-mono text-xs uppercase tracking-widest text-[#0070f3] mb-3 font-semibold">
                The Cost of Inferior Signage
              </div>
              <h2 className="font-display text-3xl md:text-5xl leading-tight mb-6 text-[var(--text)]">
                Bad signage costs you customers{' '}
                <span className="bg-gradient-to-r from-[#0070f3] to-[#0ea5e9] bg-clip-text text-transparent">
                  you will never even meet.
                </span>
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="text-lg text-[var(--text-muted)] leading-relaxed mb-6">
                A faded acrylic face after 12 months, flickering LED modules during peak evening hours, or a non-compliant roadside pylon that gets flagged by county inspectors doesn&apos;t just damage your aesthetics — it signals unreliability to high-value clientele.
              </p>
              <div className="grid sm:grid-cols-2 gap-4 pt-4">
                <div className="flex items-start gap-3 p-4 rounded-lg bg-[var(--bg)] border border-[var(--border)]">
                  <span className="text-red-500 font-bold text-lg">✕</span>
                  <div className="text-sm">
                    <strong className="block text-[var(--text)]">Generic Subcontractors</strong>
                    <span className="text-[var(--text-muted)]">
                      Unsealed Chinese LEDs, calendered vinyl that shrinks, zero wind engineering.
                    </span>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-lg bg-[var(--bg)] border border-[#0070f3]/30">
                  <span className="text-[#0070f3] font-bold text-lg">✓</span>
                  <div className="text-sm">
                    <strong className="block text-[var(--text)]">Touchline In-House Standard</strong>
                    <span className="text-[var(--text-muted)]">
                      Samsung IP67 LEDs, Mean Well drivers, Cast acrylic, and KenHA structural compliance.
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 4. FOUR CORE SIGN SYSTEMS ──────────────────────────────── */}
      <section id="sign-systems" className="section-py bg-[var(--bg)] scroll-section border-b border-[var(--border)]">
        <div className="max-w-content mx-auto px-6">
          <Reveal>
            <div className="text-center mb-16">
              <span className="font-mono text-xs uppercase tracking-widest text-[#0070f3] block mb-2 font-semibold">
                Physical Engineering & Architecture
              </span>
              <h2 className="font-display text-3xl md:text-5xl text-[var(--text)] mb-4">
                Four ways to <span className="text-[#0070f3]">command your landscape</span>
              </h2>
              <p className="text-lead max-w-2xl mx-auto">
                Every sign is modeled, fabricated, and wired inside our Industrial Area workshop. No outsourced fabrication, no guesswork.
              </p>
            </div>
          </Reveal>

          <div className="space-y-12">
            {SIGN_SYSTEMS.map((system, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={system.id}
                  className="card-theme rounded-[var(--radius-lg)] p-6 md:p-10 border border-[var(--border)] hover:border-[#0070f3]/40 transition-all duration-300"
                >
                  <div className={`grid lg:grid-cols-12 gap-8 items-center ${isEven ? '' : 'lg:grid-flow-dense'}`}>
                    {/* Visual Card with ProjectPhoto */}
                    <div className={`lg:col-span-6 ${isEven ? '' : 'lg:col-start-7'}`}>
                      <ProjectPhoto
                        src={system.photoSrc}
                        alt={system.title}
                        division="signage"
                        badge={system.badge}
                        aspect="aspect-[16/10]"
                        className="shadow-xl"
                      />
                    </div>

                    {/* Content & Specs */}
                    <div className={`lg:col-span-6 ${isEven ? '' : 'lg:col-start-1'}`}>
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0070f3]/10 text-[#0070f3] font-mono text-[11px] uppercase tracking-wider mb-3">
                        {system.subtitle}
                      </div>
                      <h3 className="font-display text-2xl md:text-3xl text-[var(--text)] mb-4">{system.title}</h3>
                      <p className="text-sm md:text-base text-[var(--text-muted)] leading-relaxed mb-6">
                        {system.description}
                      </p>

                      {/* Technical Specs List */}
                      <div className="grid grid-cols-2 gap-3 mb-6 p-4 rounded-lg bg-[var(--bg-soft)] border border-[var(--border)]">
                        {system.specs.map((spec) => (
                          <div key={spec.label} className="text-xs">
                            <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase block">
                              {spec.label}
                            </span>
                            <span className="font-medium text-[var(--text)]">{spec.value}</span>
                          </div>
                        ))}
                      </div>

                      {/* Applications Chips */}
                      <div className="flex flex-wrap items-center gap-2 mb-6">
                        <span className="text-xs text-[var(--text-muted)] font-mono">Best For:</span>
                        {system.applications.map((app) => (
                          <span
                            key={app}
                            className="text-[11px] font-mono px-2.5 py-1 rounded bg-[var(--bg-soft)] text-[var(--text)] border border-[var(--border)]"
                          >
                            {app}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-4">
                        <Link
                          href={`/book?brand=signage&service=${encodeURIComponent(system.title)}`}
                          className="btn-primary text-sm font-semibold"
                        >
                          Request Spec & Site Visit <span>→</span>
                        </Link>
                        <a href="#fast-quote" className="btn-ghost text-xs text-[var(--text-muted)] hover:text-[#0070f3]">
                          Calculate Price
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 5. LIVE FAST QUOTE WIDGET (DIRECT TO TOUCHDESK) ──────── */}
      <section id="fast-quote" className="section-py bg-[var(--bg-soft)] scroll-section border-b border-[var(--border)]">
        <div className="max-w-content mx-auto px-6">
          <Reveal>
            <div className="text-center mb-12">
              <span className="font-mono text-xs uppercase tracking-widest text-[#0070f3] block mb-2 font-semibold">
                Direct TouchDesk Integration
              </span>
              <h2 className="font-display text-3xl md:text-5xl text-[var(--text)] mb-4">
                Calculate & dispatch your <span className="text-[#0070f3]">signage estimate</span>
              </h2>
              <p className="text-lead max-w-xl mx-auto">
                Select your signage type, specify dimensions or units, and submit directly to our Nairobi estimation desk for immediate job creation.
              </p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <FastQuoteWidget initialBrand="signage" />
          </Reveal>
        </div>
      </section>

      {/* ── 6. VIEWING DISTANCE & LETTER HEIGHT CALCULATOR ──────── */}
      <section id="viewing-distance" className="section-py bg-[var(--bg)] scroll-section border-b border-[var(--border)]">
        <div className="max-w-content mx-auto px-6">
          <Reveal>
            <div className="text-center mb-12">
              <span className="font-mono text-xs uppercase tracking-widest text-[#0070f3] block mb-2 font-semibold">
                HCI & Legibility Science
              </span>
              <h2 className="font-display text-3xl md:text-5xl text-[var(--text)] mb-4">
                What size sign <span className="text-[#0070f3]">does your location need?</span>
              </h2>
              <p className="text-lead max-w-2xl mx-auto">
                Letters that are too small go completely unnoticed at 60 km/h; letters that are oversized inflate structural steel and permit costs. Use our interactive calculator to find your exact ratio.
              </p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <SignageViewingCalculator />
          </Reveal>
        </div>
      </section>

      {/* ── 7. ILLUMINATION TECHNOLOGY GUIDE ─────────────────────── */}
      <section id="illumination" className="section-py bg-[var(--bg-soft)] scroll-section border-b border-[var(--border)]">
        <div className="max-w-content mx-auto px-6">
          <Reveal>
            <div className="text-center mb-12">
              <span className="font-mono text-xs uppercase tracking-widest text-[#0070f3] block mb-2 font-semibold">
                Day & Night Visibility
              </span>
              <h2 className="font-display text-3xl md:text-5xl text-[var(--text)] mb-4">
                Front-Lit, Halo, or Neon? <span className="text-[#0070f3]">Which lighting works best?</span>
              </h2>
              <p className="text-lead max-w-2xl mx-auto">
                Compare LED projection dynamics, beam dispersion angles, and power draw across different facade architectures.
              </p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <IlluminationGuide />
          </Reveal>
        </div>
      </section>

      {/* ── 8. VEHICLE & FLEET BRANDING MATRIX ───────────────────── */}
      <section id="vehicle-wraps" className="section-py bg-[var(--bg)] scroll-section border-b border-[var(--border)]">
        <div className="max-w-content mx-auto px-6">
          <Reveal>
            <div className="text-center mb-16">
              <span className="font-mono text-xs uppercase tracking-widest text-[#0070f3] block mb-2 font-semibold">
                Transit Advertising ROI
              </span>
              <h2 className="font-display text-3xl md:text-5xl text-[var(--text)] mb-4">
                Vehicle branding that <span className="text-[#0070f3]">multiplies your reach</span>
              </h2>
              <p className="text-lead max-w-2xl mx-auto">
                A branded commercial vehicle generates 35,000 to 100,000+ impressions daily on Kenyan roads. That delivers an average advertising cost of under KES 0.08 per impression over a 3-year lifespan.
              </p>
            </div>
          </Reveal>

          {/* Vehicle type selector tabs */}
          <Reveal>
            <div className="flex flex-wrap justify-center gap-2 mb-10">
              {VEHICLE_COMPARISON.map((item, i) => (
                <button
                  key={item.type}
                  onClick={() => setActiveVehicle(i)}
                  className={`px-4 py-2.5 rounded-full text-xs md:text-sm font-medium transition-all duration-200 ${
                    activeVehicle === i
                      ? 'bg-[#0070f3] text-white shadow-lg shadow-[#0070f3]/25 font-semibold'
                      : 'bg-[var(--bg-soft)] text-[var(--text-muted)] hover:text-[var(--text)] border border-[var(--border)]'
                  }`}
                >
                  {item.type}
                </button>
              ))}
            </div>
          </Reveal>

          {/* Vehicle Detail Card */}
          <Reveal>
            <div className="card-theme rounded-[var(--radius-lg)] p-8 md:p-12 max-w-4xl mx-auto border border-[var(--border)] shadow-xl">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-[var(--border)]">
                <div>
                  <span className="font-mono text-xs text-[#0070f3] uppercase tracking-widest block font-bold mb-1">
                    FLEET SPECIFICATION
                  </span>
                  <h3 className="font-display text-2xl md:text-3xl text-[var(--text)]">
                    {VEHICLE_COMPARISON[activeVehicle].type}
                  </h3>
                </div>
                <div className="text-right">
                  <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-wider block">
                    Surface Area
                  </span>
                  <span className="font-mono text-sm font-bold text-[var(--text)]">
                    {VEHICLE_COMPARISON[activeVehicle].coverage}
                  </span>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="p-4 rounded-lg bg-[var(--bg-soft)] border border-[var(--border)]">
                  <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-widest block mb-1">
                    Full Wrap Estimate
                  </span>
                  <span className="text-base font-bold text-[#0070f3] block">
                    {VEHICLE_COMPARISON[activeVehicle].fullWrap}
                  </span>
                  <span className="text-[10px] text-[var(--text-muted)]">Includes Cast UV laminate</span>
                </div>

                <div className="p-4 rounded-lg bg-[var(--bg-soft)] border border-[var(--border)]">
                  <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-widest block mb-1">
                    Half / Spot Wrap
                  </span>
                  <span className="text-base font-bold text-[var(--text)] block">
                    {VEHICLE_COMPARISON[activeVehicle].halfWrap}
                  </span>
                  <span className="text-[10px] text-[var(--text-muted)]">Sides + Rear Doors</span>
                </div>

                <div className="p-4 rounded-lg bg-[var(--bg-soft)] border border-[var(--border)]">
                  <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-widest block mb-1">
                    Daily Reach
                  </span>
                  <span className="text-base font-bold text-emerald-500 block">
                    {VEHICLE_COMPARISON[activeVehicle].impressions}
                  </span>
                  <span className="text-[10px] text-[var(--text-muted)]">Urban + Highway routes</span>
                </div>

                <div className="p-4 rounded-lg bg-[var(--bg-soft)] border border-[var(--border)]">
                  <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-widest block mb-1">
                    Outdoor Lifespan
                  </span>
                  <span className="text-base font-bold text-[var(--text)] block">
                    {VEHICLE_COMPARISON[activeVehicle].lifespan}
                  </span>
                  <span className="text-[10px] text-[var(--text-muted)]">No peeling or shrinkage</span>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-[var(--bg-soft)] border border-[var(--border)] mb-8">
                <span className="font-mono text-xs text-[var(--text-muted)] uppercase tracking-wider block mb-1">
                  Optimal Deployment:
                </span>
                <p className="text-sm text-[var(--text)]">{VEHICLE_COMPARISON[activeVehicle].bestFor}</p>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-[var(--border)]">
                <div className="flex items-center gap-3 text-xs text-[var(--text-muted)]">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>3M / Avery Dennison Certified Vinyl · Knifeless Tape Technology</span>
                </div>
                <Link
                  href={`/book?brand=signage&service=${encodeURIComponent(
                    VEHICLE_COMPARISON[activeVehicle].type + ' Vehicle Wrap'
                  )}`}
                  className="btn-primary text-sm font-semibold"
                >
                  Book Fleet Assessment <span>→</span>
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 9. KENYA CLIMATE ZONE DURABILITY ENGINE ──────────────── */}
      <section id="climate-zones" className="section-py bg-[var(--bg-soft)] scroll-section border-b border-[var(--border)]">
        <div className="max-w-content mx-auto px-6">
          <Reveal>
            <div className="text-center mb-12">
              <span className="font-mono text-xs uppercase tracking-widest text-[#0070f3] block mb-2 font-semibold">
                Regional Environmental Engineering
              </span>
              <h2 className="font-display text-3xl md:text-5xl text-[var(--text)] mb-4">
                Engineered for Kenya&apos;s <span className="text-[#0070f3]">microclimates</span>
              </h2>
              <p className="text-lead max-w-2xl mx-auto">
                A sign mounted in Mombasa faces intense marine salt spray; one in Lodwar faces 42°C UV baking; one in Limuru faces frost and dense mist. Enter your county or town to see our recommended material stack.
              </p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <SignageZoneDetector />
          </Reveal>
        </div>
      </section>

      {/* ── 10. OSHA 2007 & KENHA COMPLIANCE ───────────────────────── */}
      <section id="compliance" className="section-py bg-[var(--bg)] scroll-section border-b border-[var(--border)]">
        <div className="max-w-content mx-auto px-6">
          <div className="card-theme rounded-[var(--radius-lg)] p-8 md:p-12 max-w-4xl mx-auto border border-[var(--border)]">
            <Reveal>
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div>
                  <span className="font-mono text-xs text-[#0070f3] uppercase tracking-widest font-bold block mb-1">
                    LEGAL & REGULATORY PROTOCOLS
                  </span>
                  <h2 className="font-display text-2xl md:text-4xl text-[var(--text)]">
                    OSHA 2007, DOSH & KenHA Compliance
                  </h2>
                </div>
                <div className="flex gap-2">
                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-mono font-semibold">
                    DOSH Approved
                  </span>
                  <span className="px-3 py-1 rounded-full bg-[#0070f3]/10 text-[#0070f3] text-xs font-mono font-semibold">
                    ISO 7010
                  </span>
                </div>
              </div>

              <p className="text-[var(--text-muted)] leading-relaxed mb-8">
                Kenya&apos;s Occupational Safety and Health Act (OSHA 2007) requires specific photoluminescent emergency exits, fire equipment markers, and mandatory hazard signage in all industrial and commercial workspaces. We engineer compliant architectural signage packages that pass DOSH safety audits without delay.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {WAYFINDING_STANDARDS.osha2007.keyRequirements.map((req) => (
                  <div key={req} className="flex items-start gap-2.5 text-sm text-[var(--text-muted)]">
                    <span className="text-[#0070f3] font-bold mt-0.5">✓</span>
                    <span>{req}</span>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-[var(--border)] flex flex-wrap items-center justify-between gap-4">
                <div className="text-xs text-[var(--text-muted)]">
                  Need billboard or gantry clearance with the Kenya National Highways Authority? We prepare engineering CAD drawings.
                </div>
                <Link
                  href="/book?brand=signage&service=OSHA%20Safety%20%26%20Compliance%20Signage"
                  className="btn-secondary text-xs font-mono uppercase tracking-wider"
                >
                  Request Compliance Audit <span>→</span>
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 11. HOT SIGNAGE IN KENYA 2026 ─────────────────────────── */}
      <section className="section-py bg-[var(--bg-soft)] border-b border-[var(--border)]">
        <div className="max-w-content mx-auto px-6">
          <Reveal>
            <div className="text-center mb-16">
              <span className="font-mono text-xs uppercase tracking-widest text-[#0070f3] block mb-2 font-semibold">
                Market Intelligence
              </span>
              <h2 className="font-display text-3xl md:text-4xl text-[var(--text)] mb-4">
                Top requested signage in <span className="text-[#0070f3]">Kenya 2026</span>
              </h2>
              <p className="text-lead max-w-xl mx-auto">
                Real-time demand metrics based on active RFQs across {MARKET_DATA.kenya.totalSuppliers} national fabricators.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {HOT_PRODUCTS_KE.map((product, i) => (
              <Reveal key={product.name} delay={i * 60}>
                <div className="card-theme rounded-[var(--radius-md)] p-5 text-center h-full border border-[var(--border)] flex flex-col justify-between">
                  <div>
                    <span className="font-mono text-[10px] text-[#0070f3] uppercase tracking-widest font-bold block mb-2">
                      RANK #{product.rank}
                    </span>
                    <h4 className="font-display text-sm font-semibold text-[var(--text)] mb-2">{product.name}</h4>
                    <span className="font-mono text-[11px] text-[var(--text)] bg-[var(--bg-soft)] px-2 py-0.5 rounded block mb-3">
                      {product.priceRange}
                    </span>
                  </div>
                  <p className="text-[11px] text-[var(--text-muted)] leading-snug">{product.reason}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 12. 4-PHASE PRECISION FABRICATION PROCESS ─────────────── */}
      <section className="section-py bg-[var(--bg)] border-b border-[var(--border)]">
        <div className="max-w-content mx-auto px-6">
          <Reveal>
            <div className="text-center mb-16">
              <span className="font-mono text-xs uppercase tracking-widest text-[#0070f3] block mb-2 font-semibold">
                Quality Assurance Protocol
              </span>
              <h2 className="font-display text-3xl md:text-5xl text-[var(--text)] mb-4">
                From site laser survey to <span className="text-[#0070f3]">certified install</span>
              </h2>
              <p className="text-lead max-w-xl mx-auto">
                Zero shortcuts. Every weld, wire splice, and anchor point is verified before sign-off.
              </p>
            </div>
          </Reveal>

          <div className="relative grid md:grid-cols-4 gap-8">
            <div
              className="hidden md:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-[#0070f3]/40 to-transparent"
              aria-hidden="true"
            />

            {SIGNAGE_STEPS.map((step, i) => (
              <Reveal key={step.num} delay={i * 100}>
                <div className="relative text-center">
                  <div className="relative z-10 mx-auto mb-6 w-16 h-16 rounded-full bg-[var(--surface)] border-2 border-[#0070f3] flex items-center justify-center shadow-lg shadow-[#0070f3]/10">
                    <span className="font-mono text-base font-bold text-[#0070f3]">{step.num}</span>
                  </div>
                  <h3 className="font-display text-lg mb-2 text-[var(--text)] font-semibold">{step.title}</h3>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-3 max-w-[240px] mx-auto">
                    {step.desc}
                  </p>
                  <span className="inline-block font-mono text-[10px] text-[#0070f3] bg-[#0070f3]/10 px-2.5 py-0.5 rounded-full">
                    {step.tech}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 13. CLIENT PROOF & CORPORATE TESTIMONIALS ─────────────── */}
      <section className="section-py bg-[var(--bg-soft)] border-b border-[var(--border)]">
        <div className="max-w-content mx-auto px-6">
          <Reveal>
            <div className="text-center mb-16">
              <span className="font-mono text-xs uppercase tracking-widest text-[#0070f3] block mb-2 font-semibold">
                Corporate Endorsements
              </span>
              <h2 className="font-display text-3xl md:text-5xl text-[var(--text)] mb-4">
                Trusted by <span className="text-[#0070f3]">facility & project managers</span>
              </h2>
              <p className="text-lead max-w-xl mx-auto">
                Read how enterprises and commercial property managers rely on our signage engineering.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t.name} delay={i * 120}>
                <blockquote className="card-surface rounded-[var(--radius-lg)] p-8 h-full flex flex-col border border-[var(--border)] shadow-md">
                  <p className="font-editorial italic text-base md:text-lg text-[var(--text)] leading-relaxed mb-6 flex-1">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-[var(--border)]">
                    <div className="w-8 h-0.5 bg-[#0070f3]" />
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

      {/* ── 14. CONVERSION & TOUCHDESK DISPATCH CTA ───────────────── */}
      <section className="section-py-lg bg-gradient-to-b from-[var(--bg)] to-[var(--bg-soft)]">
        <div className="max-w-content mx-auto px-6 text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0070f3]/10 text-[#0070f3] font-mono text-xs uppercase tracking-widest mb-6">
              Ready for Rapid Production
            </div>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-[var(--text)] mb-6 max-w-3xl mx-auto tracking-tight">
              Ready to make your brand <br />
              <span className="bg-gradient-to-r from-[#0070f3] via-[#0ea5e9] to-[#38bdf8] bg-clip-text text-transparent">
                impossible to miss?
              </span>
            </h2>
          </Reveal>

          <Reveal delay={80}>
            <p className="text-lg text-[var(--text-muted)] max-w-2xl mx-auto mb-10 leading-relaxed">
              Submit your project specs directly into TouchDesk for instant site survey scheduling, 3D CAD modeling, and factory direct pricing.
            </p>
          </Reveal>

          <Reveal delay={160}>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/book?brand=signage" className="btn-primary glow-accent px-8 py-4 text-base font-semibold">
                Book Site Survey & Quote <span>→</span>
              </Link>
              <a
                href="https://wa.me/254722668696?text=Hi%20Touchline%2C%20I%20need%20a%20signage%20quote%20for%20my%20building%2Ffleet"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary glass-subtle px-7 py-4 text-base font-semibold"
              >
                WhatsApp Desk (+254 722 668 696)
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
