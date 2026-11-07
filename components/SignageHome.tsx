'use client';

import Link from 'next/link';
import Image from 'next/image';
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
      {/* ── 1. HIGH-TECH SIGNAGE HERO (Wordings on Right Side · Blueprint Engineering Grid) ── */}
      {/* Engineered to occupy ~6/8 of the screen (~75-80vh) with NO vertical scrolling on desktop */}
      <section className="relative min-h-[82vh] lg:h-[calc(100vh-65px)] lg:max-h-[760px] flex items-center overflow-hidden py-6 sm:py-8 border-b border-white/10 bg-[#090b0e] text-white">
        {/* Subtle Ambient Blueprint Grid & Electric Blue Glow */}
        <div className="absolute inset-0 pointer-events-none z-0" aria-hidden="true">
          <div className="absolute top-1/4 -right-28 w-[500px] h-[500px] rounded-full bg-[#0070f3] opacity-[0.12] blur-[140px]" />
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
            {/* ── LEFT AREA: HIGH-TECH 3D ARCHITECTURAL SIGN SIMULATOR CARD ── */}
            <div className="lg:col-span-5 w-full order-2 lg:order-1">
              <Reveal delay={240}>
                <div className="relative rounded-2xl bg-gradient-to-br from-[#0a1626]/95 via-[#060e1a]/95 to-[#040810]/98 border border-blue-500/30 p-5 sm:p-6 shadow-2xl backdrop-blur-md overflow-hidden">
                  <div className="absolute top-0 left-0 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

                  {/* Header / Division Tag */}
                  <div className="flex items-center justify-between pb-3.5 border-b border-blue-900/30 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#0070f3] animate-ping" />
                      <span className="font-mono text-xs uppercase tracking-wider font-semibold text-white">
                        Fabrication Lab Spec
                      </span>
                    </div>
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-blue-500/15 text-[#38bdf8] border border-blue-500/25 font-semibold">
                      CNC Fiber Laser Active
                    </span>
                  </div>

                  {/* Active Spec Matrix */}
                  <div className="space-y-2.5 mb-4">
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                      <span className="text-xs font-medium text-neutral-400">Sign System</span>
                      <span className="text-xs font-semibold text-white">3D Illuminated Channel Letters</span>
                    </div>

                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                      <span className="text-xs font-medium text-neutral-400">Illumination Tech</span>
                      <span className="text-xs font-semibold text-[#38bdf8]">Samsung IP67 SMD LEDs (6,500K)</span>
                    </div>

                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                      <span className="text-xs font-medium text-neutral-400">Chassis Material</span>
                      <span className="text-xs font-mono font-semibold text-white">0.8mm Stainless + 3mm Cast Acrylic</span>
                    </div>

                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                      <span className="text-xs font-medium text-neutral-400">Weather Rating</span>
                      <span className="text-xs font-semibold text-emerald-400">IP67 Waterproof · Tropicalized</span>
                    </div>
                  </div>

                  {/* Quick Action Footer */}
                  <div className="flex items-center justify-between pt-3 border-t border-blue-900/30">
                    <span className="text-[11px] font-mono text-neutral-400">
                      KenHA & OSHA Compliant
                    </span>
                    <a
                      href="#fast-quote"
                      className="font-mono text-xs font-semibold text-[#38bdf8] hover:underline flex items-center gap-1"
                    >
                      Configure Dimensions <span>→</span>
                    </a>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* ── RIGHT AREA: VALUE PROPOSITION (As requested: "signage right side") ── */}
            <div className="lg:col-span-7 flex flex-col items-start lg:items-start text-left order-1 lg:order-2">
              <Reveal>
                <div className="inline-flex items-center gap-2.5 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 mb-3 sm:mb-4 shadow-xs backdrop-blur-md">
                  <span className="w-2 h-2 rounded-full bg-[#0070f3] animate-pulse" />
                  <span className="font-mono text-[10px] sm:text-[11px] font-semibold text-[#38bdf8] tracking-widest uppercase">
                    Touchline Signage // Division 02
                  </span>
                </div>

                <h1 className="font-display text-3xl sm:text-5xl lg:text-[3.25rem] xl:text-[3.6rem] leading-[0.98] mb-3 text-white tracking-tight text-balance">
                  Signs that speak <br />
                  <span className="bg-gradient-to-r from-[#0070f3] via-[#0ea5e9] to-[#38bdf8] bg-clip-text text-transparent">
                    before you say a word.
                  </span>
                </h1>
              </Reveal>

              <Reveal delay={120}>
                <p className="text-xs sm:text-base text-neutral-300 leading-relaxed mb-4 sm:mb-6 max-w-xl text-balance">
                  From high-rise 3D illuminated channel letters in Nairobi&apos;s CBD to highway pylon signs and corporate vehicle fleet wraps across Kenya. Fabricated in-house, engineered to KenHA & OSHA standards.
                </p>
              </Reveal>

              <Reveal delay={200}>
                <div className="flex flex-wrap items-center gap-3 mb-6 sm:mb-8">
                  <a
                    href="#fast-quote"
                    className="btn-primary btn-magnetic glow-accent px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold rounded-xl"
                  >
                    Instant Quote Configurator <span>→</span>
                  </a>
                  <a
                    href="#sign-systems"
                    className="px-5 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-medium bg-white/5 hover:bg-white/10 text-white border border-white/15 backdrop-blur-md transition-all"
                  >
                    Explore Sign Systems
                  </a>
                </div>
              </Reveal>

              {/* Verified Trust Metrics */}
              <Reveal delay={280}>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-4 sm:pt-5 border-t border-white/10 w-full max-w-lg">
                  <div>
                    <div className="font-display text-2xl lg:text-3xl font-bold text-white">500+</div>
                    <div className="font-mono text-[10px] sm:text-[11px] text-neutral-400 uppercase tracking-wider">
                      Sites Installed
                    </div>
                  </div>
                  <div>
                    <div className="font-display text-2xl lg:text-3xl font-bold text-[#38bdf8]">100%</div>
                    <div className="font-mono text-[10px] sm:text-[11px] text-neutral-400 uppercase tracking-wider">
                      In-House Fab
                    </div>
                  </div>
                  <div>
                    <div className="font-display text-2xl lg:text-3xl font-bold text-white">IP67</div>
                    <div className="font-mono text-[10px] sm:text-[11px] text-neutral-400 uppercase tracking-wider">
                      Weatherproof
                    </div>
                  </div>
                  <div>
                    <div className="font-display text-2xl lg:text-3xl font-bold text-[#38bdf8]">3-5 Yrs</div>
                    <div className="font-mono text-[10px] sm:text-[11px] text-neutral-400 uppercase tracking-wider">
                      Warranty
                    </div>
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
        className="sticky top-[57px] sm:top-[61px] z-30 bg-[var(--bg)]/90 backdrop-blur-xl border-b border-[var(--border)] py-2 px-4 sm:px-6 overflow-x-auto scrollbar-none"
      >
        <div className="max-w-content mx-auto flex items-center justify-start md:justify-center gap-1.5 p-1 rounded-full bg-[var(--surface)] border border-[var(--border)] w-fit text-xs whitespace-nowrap shadow-xs">
          <a
            href="#sign-systems"
            className="px-3 py-1 rounded-full text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--bg-soft)] transition-colors font-medium"
          >
            Core Systems
          </a>
          <a
            href="#fast-quote"
            className="px-3 py-1 rounded-full bg-[#0070f3]/10 text-[#0070f3] font-semibold border border-[#0070f3]/20 hover:bg-[#0070f3]/20 transition-colors"
          >
            Live Fast Quote
          </a>
          <a
            href="#viewing-distance"
            className="px-3 py-1 rounded-full text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--bg-soft)] transition-colors font-medium"
          >
            Viewing Distance Calc
          </a>
          <a
            href="#illumination"
            className="px-3 py-1 rounded-full text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--bg-soft)] transition-colors font-medium"
          >
            Illumination Guide
          </a>
          <a
            href="#vehicle-wraps"
            className="px-3 py-1 rounded-full text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--bg-soft)] transition-colors font-medium"
          >
            Fleet Wraps
          </a>
          <a
            href="#climate-zones"
            className="px-3 py-1 rounded-full text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--bg-soft)] transition-colors font-medium"
          >
            Climate Zones
          </a>
          <a
            href="#compliance"
            className="px-3 py-1 rounded-full text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--bg-soft)] transition-colors font-medium"
          >
            OSHA & KenHA
          </a>
        </div>
      </nav>

      {/* ── 3. SIGN SYSTEMS SHOWCASE ──────────────────────────────── */}
      <section id="sign-systems" className="section-py bg-[var(--bg)] border-b border-[var(--border)] scroll-section">
        <div className="max-w-content mx-auto px-6">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="font-mono text-xs uppercase tracking-widest text-[#0070f3] block mb-2 font-semibold">
                // Commercial Fabrication Systems
              </span>
              <h2 className="font-display text-3xl sm:text-5xl text-[var(--text)] mb-4">
                Engineered Signage Systems
              </h2>
              <p className="text-sm sm:text-base text-[var(--text-muted)]">
                Every system is fabricated in our Nairobi facility with structural calculations, wind-load ratings, and nationwide installation.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-8">
            {SIGN_SYSTEMS.map((sys, idx) => (
              <Reveal key={sys.id} delay={idx * 100}>
                <div className="card-surface rounded-[var(--radius-lg)] p-6 sm:p-8 border border-[var(--border)] hover:border-[#0070f3]/40 transition-all flex flex-col justify-between h-full">
                  <div>
                    <div className="mb-6">
                      <ProjectPhoto
                        src={sys.photoSrc}
                        alt={sys.title}
                        division="signage"
                        badge={sys.badge}
                        aspect="aspect-[16/9]"
                      />
                    </div>
                    <span className="font-mono text-xs text-[#0070f3] block mb-1">{sys.subtitle}</span>
                    <h3 className="font-display text-2xl text-[var(--text)] mb-3">{sys.title}</h3>
                    <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-6">{sys.description}</p>
                    <div className="grid grid-cols-2 gap-2 mb-6">
                      {sys.specs.map((spec) => (
                        <div key={spec.label} className="p-2.5 rounded bg-[var(--bg-soft)] border border-[var(--border)]">
                          <span className="text-[10px] font-mono text-[var(--text-muted)] block uppercase">{spec.label}</span>
                          <span className="text-xs font-semibold text-[var(--text)]">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="pt-4 border-t border-[var(--border)] flex items-center justify-between">
                    <Link href={`/services#${sys.id}`} className="text-sm font-semibold text-[#0070f3] hover:underline flex items-center gap-1">
                      Technical Specs <span>→</span>
                    </Link>
                    <span className="text-xs font-mono text-[var(--text-muted)]">DOSH Certified</span>
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
              <span className="font-mono text-xs uppercase tracking-widest text-[#0070f3] block mb-2 font-semibold">
                // Engineering &amp; Installation Pipeline
              </span>
              <h2 className="font-display text-3xl sm:text-5xl text-[var(--text)] mb-4">
                How We Fabricate &amp; Install
              </h2>
              <p className="text-sm sm:text-base text-[var(--text-muted)]">
                From laser site measurements to structural rigging by certified DOSH technicians.
              </p>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SIGNAGE_STEPS.map((step, i) => (
              <Reveal key={step.num} delay={i * 80}>
                <div className="card-surface p-6 sm:p-8 rounded-[var(--radius-lg)] border border-[var(--border)] h-full flex flex-col justify-between">
                  <div>
                    <span className="font-display text-4xl text-[#0070f3]/30 block mb-4">
                      {step.num}
                    </span>
                    <h3 className="font-display text-xl text-[var(--text)] mb-3">{step.title}</h3>
                    <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-4">{step.desc}</p>
                  </div>
                  <div className="pt-4 border-t border-[var(--border)]">
                    <span className="text-[11px] font-mono text-[#0070f3] block">{step.tech}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. VEHICLE FLEET BRANDING COMPARISON ───────────────────── */}
      <section id="vehicle-wraps" className="section-py bg-[var(--bg)] border-b border-[var(--border)] scroll-section">
        <div className="max-w-content mx-auto px-6">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="font-mono text-xs uppercase tracking-widest text-[#0070f3] block mb-2 font-semibold">
                // Transit Advertising
              </span>
              <h2 className="font-display text-3xl sm:text-5xl text-[var(--text)] mb-4">
                Vehicle Fleet Wraps
              </h2>
              <p className="text-sm sm:text-base text-[var(--text-muted)]">
                High-durability cast vinyl wraps engineered for Kenya&apos;s highways, sun, and fleet washing schedules.
              </p>
            </div>
          </Reveal>

          {/* Vehicle selector tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {VEHICLE_COMPARISON.map((v, idx) => (
              <button
                key={v.type}
                onClick={() => setActiveVehicle(idx)}
                className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider uppercase transition-all ${
                  activeVehicle === idx
                    ? 'bg-[#0070f3] text-white font-bold shadow-md'
                    : 'bg-[var(--surface)] text-[var(--text-muted)] border border-[var(--border)] hover:border-[#0070f3]'
                }`}
              >
                {v.type}
              </button>
            ))}
          </div>

          {/* Active vehicle card */}
          <div className="card-surface rounded-[var(--radius-lg)] p-8 sm:p-12 border border-[var(--border)] max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-6 border-b border-[var(--border)] gap-4">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-[#0070f3]">
                  Vehicle Category
                </span>
                <h3 className="font-display text-3xl text-[var(--text)] mt-1">
                  {VEHICLE_COMPARISON[activeVehicle].type}
                </h3>
              </div>
              <span className="font-mono text-xs text-[var(--text-muted)] bg-[var(--bg-soft)] px-3 py-1.5 rounded-full border border-[var(--border)]">
                {VEHICLE_COMPARISON[activeVehicle].coverage}
              </span>
            </div>

            <p className="text-base text-[var(--text)] leading-relaxed mb-8">
              {VEHICLE_COMPARISON[activeVehicle].bestFor}
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="p-4 rounded-xl bg-[var(--bg)] border border-[var(--border)]">
                <span className="text-xs font-mono text-[var(--text-muted)] block mb-1">FULL WRAP ESTIMATE</span>
                <span className="text-base font-bold text-[#0070f3]">
                  {VEHICLE_COMPARISON[activeVehicle].fullWrap}
                </span>
              </div>
              <div className="p-4 rounded-xl bg-[var(--bg)] border border-[var(--border)]">
                <span className="text-xs font-mono text-[var(--text-muted)] block mb-1">HALF WRAP / SPOT</span>
                <span className="text-base font-bold text-[var(--text)]">
                  {VEHICLE_COMPARISON[activeVehicle].halfWrap}
                </span>
              </div>
              <div className="p-4 rounded-xl bg-[var(--bg)] border border-[var(--border)]">
                <span className="text-xs font-mono text-[var(--text-muted)] block mb-1">DAILY IMPRESSIONS</span>
                <span className="text-base font-semibold text-[var(--text)]">
                  {VEHICLE_COMPARISON[activeVehicle].impressions}
                </span>
              </div>
              <div className="p-4 rounded-xl bg-[var(--bg)] border border-[var(--border)]">
                <span className="text-xs font-mono text-[var(--text-muted)] block mb-1">UV LIFESPAN</span>
                <span className="text-base font-semibold text-[var(--text)]">
                  {VEHICLE_COMPARISON[activeVehicle].lifespan}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. VIEWING DISTANCE CALCULATOR ────────────────────────── */}
      <section id="viewing-distance" className="section-py bg-[var(--bg-soft)] border-b border-[var(--border)] scroll-section">
        <div className="max-w-content mx-auto px-6">
          <SignageViewingCalculator />
        </div>
      </section>

      {/* ── 7. ILLUMINATION GUIDE ─────────────────────────────────── */}
      <section id="illumination" className="section-py bg-[var(--bg)] border-b border-[var(--border)] scroll-section">
        <div className="max-w-content mx-auto px-6">
          <IlluminationGuide />
        </div>
      </section>

      {/* ── 8. CLIMATE ZONES ──────────────────────────────────────── */}
      <section id="climate-zones" className="section-py bg-[var(--bg-soft)] border-b border-[var(--border)] scroll-section">
        <div className="max-w-content mx-auto px-6">
          <SignageZoneDetector />
        </div>
      </section>

      {/* ── 9. FAST QUOTE WIDGET ──────────────────────────────────── */}
      <section id="fast-quote" className="section-py bg-[var(--bg)] border-b border-[var(--border)] scroll-section">
        <div className="max-w-content mx-auto px-6">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="font-mono text-xs uppercase tracking-widest text-[#0070f3] block mb-2 font-semibold">
                // Instant Quotation
              </span>
              <h2 className="font-display text-3xl sm:text-5xl text-[var(--text)] mb-4">
                FastQuote Estimator
              </h2>
              <p className="text-sm sm:text-base text-[var(--text-muted)]">
                Configure dimensional signage, lightboxes, and vehicle fleet branding with instant budget estimations.
              </p>
            </div>
          </Reveal>
          <div className="max-w-3xl mx-auto">
            <FastQuoteWidget initialBrand="signage" />
          </div>
        </div>
      </section>
    </div>
  );
}
