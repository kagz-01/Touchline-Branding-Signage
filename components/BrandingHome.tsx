'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
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
import { FastQuoteWidget } from './FastQuoteWidget';
import type { HeroSlide } from './DivisionHeroShowcase';

const brand = getBrand('branding');

const BRANDING_HERO_SLIDES: HeroSlide[] = [
  {
    image: '/images/branding/apparel-executive-polo.webp',
    title: 'Executive Heavyweight Pique Polo',
    category: 'Corporate Staff Uniform',
    badge: '240 GSM Combed Cotton',
    specs: 'Pre-Shrunk Heavy Pique Knit · Anti-Curl Ribbed Collar',
    floatingChipTop: { text: 'Tajima 12-Needle Embroidery' },
    floatingCardBottom: {
      tag: 'HIGH-DENSITY EMBROIDERY',
      headline: '20,000-Stitch Precision Crest',
      detail: '80+ Industrial Laundry Wash Cycles',
    },
    statPill: 'Zero Collar Curling',
  },
  {
    image: '/images/branding/gift-executive-vip-set.webp',
    title: 'Executive VIP Onboarding Set',
    category: 'VIP Corporate Gifting',
    badge: 'Boardroom Collection',
    specs: 'Blind-Debossed PU Journal + Thermal Vacuum Flask + Metal Pen',
    floatingChipTop: { text: 'Bespoke Hardbox Presentation' },
    floatingCardBottom: {
      tag: 'FIBER LASER DEEP ANNEALING',
      headline: 'Mirror Chrome Stainless Inscription',
      detail: 'Custom High-Density Foam Cutout Inlay',
    },
    statPill: '3-5 Days Turnaround',
  },
  {
    image: '/images/branding/gift-tech-hydration-set.webp',
    title: 'Modern Tech & Hydration Kit',
    category: 'Executive Lifestyle & Desk',
    badge: '18/8 Double-Wall Steel',
    specs: 'BPA-Free Vacuum Core + Wireless Fast Charging Station',
    floatingChipTop: { text: '12h Hot / 24h Cold Retention' },
    floatingCardBottom: {
      tag: 'MATTE POWDER COATING',
      headline: 'Laser-Etched Minimalist Branding',
      detail: 'CE / RoHS Certified Wireless Base',
    },
    statPill: 'Zero Scratch-Off',
  },
  {
    image: '/images/branding/apparel-staff-uniform.webp',
    title: 'Tender-Scale Staff & Industrial Apparel',
    category: 'Institutional Procurement',
    badge: 'DOSH / OSHA Compliant',
    specs: '280-340 GSM Cotton Twill + EN471 Class 2 Reflective Band',
    floatingChipTop: { text: '100% KRA Tax Compliant' },
    floatingCardBottom: {
      tag: 'TENDER FULFILLMENT',
      headline: 'Up to 50,000 Units Staggered Supply',
      detail: 'County & NGO Certified Batch Testing',
    },
    statPill: 'Milestone Dispatch',
  },
];

/* ------------------------------------------------------------------ */
/* Data Definitions                                                   */
/* ------------------------------------------------------------------ */

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
  const [heroIdx, setHeroIdx] = useState(0);
  const [activeToolTab, setActiveToolTab] = useState<'roi' | 'tender'>('roi');

  useEffect(() => {
    const t = setInterval(() => setHeroIdx((i) => (i + 1) % BRANDING_HERO_SLIDES.length), 4500);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative">
      {/* ── 1. BRANDING HERO — Awards-style full-bleed split ── */}
      <section className="relative h-[calc(100vh-57px)] min-h-[600px] max-h-[900px] flex overflow-hidden border-b border-white/10">
        {/* LEFT PANEL — Dark text, Amber glow, left-justified copy */}
        <div className="relative z-10 flex flex-col justify-center w-full lg:w-1/2 bg-[#090b0e] px-8 sm:px-14 lg:px-16 xl:px-20 py-10 shrink-0">
          {/* Ambient amber glow */}
          <div className="absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full bg-[#c8960c] opacity-[0.10] blur-[130px] pointer-events-none" />
          {/* Blueprint grid */}
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{ backgroundImage: 'repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 1px,transparent 48px),repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 1px,transparent 48px)' }}
          />

          <div className="relative z-10 max-w-lg">
            <Reveal>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c8960c] animate-pulse" />
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#d4a017] font-semibold">
                  Touchline Branding · Division 01
                </span>
              </span>

              <h1 className="font-display text-[2.6rem] sm:text-5xl lg:text-[3.4rem] xl:text-[3.8rem] leading-[0.95] tracking-tight text-white mb-4 text-balance">
                Put your brand<br />
                in their{' '}
                <span className="bg-gradient-to-r from-[#c8960c] via-[#d4a017] to-[#e6af2e] bg-clip-text text-transparent">
                  hands.
                </span>
              </h1>
            </Reveal>

            <Reveal delay={100}>
              <p className="text-sm sm:text-base text-neutral-400 leading-relaxed mb-2 max-w-md">
                Bidhaa zinazobeba jina lako kwa uzuri.
              </p>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-8 max-w-md">
                Executive embroidered uniforms, corporate gift kits, and tender-scale apparel rollouts — sourced, branded, inspected, and delivered across all 47 counties. Zero middlemen.
              </p>
            </Reveal>

            <Reveal delay={180}>
              <div className="flex flex-wrap gap-3 mb-10">
                <Link
                  href="/book?brand=branding"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-[#090b0e] bg-[#c8960c] hover:bg-[#d4a017] shadow-lg shadow-[#c8960c]/30 transition-all"
                >
                  Request Branding Quote
                </Link>
                <a
                  href="#methods"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium bg-transparent text-white border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all"
                >
                  Compare Print Methods
                </a>
              </div>
            </Reveal>

            <Reveal delay={260}>
              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/10">
                <div>
                  <div className="font-display text-2xl sm:text-3xl text-[#d4a017] font-bold">500+</div>
                  <div className="text-[10px] text-neutral-500 font-mono uppercase tracking-wider mt-0.5">Items Sourced</div>
                </div>
                <div>
                  <div className="font-display text-2xl sm:text-3xl text-[#d4a017] font-bold">4-Day</div>
                  <div className="text-[10px] text-neutral-500 font-mono uppercase tracking-wider mt-0.5">Avg Turnaround</div>
                </div>
                <div>
                  <div className="font-display text-2xl sm:text-3xl text-[#d4a017] font-bold">47</div>
                  <div className="text-[10px] text-neutral-500 font-mono uppercase tracking-wider mt-0.5">Counties Served</div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* RIGHT PANEL — Full-bleed auto-cycling photo (Awards-style, no glass frame) */}
        <div className="hidden lg:block relative w-1/2 shrink-0 overflow-hidden bg-black">
          {BRANDING_HERO_SLIDES.map((slide, idx) => (
            <div
              key={slide.image}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${idx === heroIdx ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
            >
              <Image src={slide.image} alt={slide.title} fill className="object-cover" sizes="50vw" priority={idx === 0} />
              {/* Gradient scrim for text legibility at bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              {/* Slide info overlay */}
              <div className="absolute bottom-8 left-8 right-8 z-20">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c8960c] animate-ping" />
                  <span className="font-mono text-[10px] text-[#d4a017] uppercase tracking-widest font-semibold">{slide.badge}</span>
                </div>
                <div className="text-white font-display text-xl font-bold leading-tight mb-1">{slide.title}</div>
                <div className="text-neutral-400 text-xs font-mono">{slide.specs}</div>
              </div>
            </div>
          ))}
          {/* Dot indicators */}
          <div className="absolute top-6 right-6 z-20 flex flex-col gap-2">
            {BRANDING_HERO_SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setHeroIdx(idx)}
                className={`w-1.5 rounded-full transition-all duration-300 ${idx === heroIdx ? 'h-6 bg-[#c8960c]' : 'h-1.5 bg-white/30 hover:bg-white/60'}`}
                aria-label={`Show slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── 2. QUICK TOOLBAR WAYFINDER (Modern Pill Rail) ───────── */}
      <section className="bg-[var(--bg)]/95 border-b border-[var(--border)] py-2.5 sticky top-[57px] sm:top-[61px] z-30 backdrop-blur-xl shadow-xs">
        <div className="max-w-content mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-0.5">
            {[
              { href: '#services', label: 'Sourcing Domains' },
              { href: '#pipeline', label: 'Production Pipeline' },
              { href: '#methods', label: 'Print Methods' },
              { href: '#roi-calculator', label: 'ROI Calculator', accent: true },
              { href: '#tender-checker', label: 'Tender Checker' },
            ].map(({ href, label, accent }) => (
              <a
                key={href}
                href={href}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all shadow-xs ${
                  accent
                    ? 'bg-[#c8960c] text-[#090b0e] font-semibold hover:opacity-90'
                    : 'text-[var(--text-muted)] hover:text-[var(--text)] bg-[var(--surface)] hover:bg-[var(--bg-soft)] border border-[var(--border)]'
                }`}
              >
                {label}
              </a>
            ))}
            <Link
              href="/catalog/branding/pdf"
              target="_blank"
              className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#c8960c] bg-[#c8960c]/10 hover:bg-[#c8960c]/20 border border-[#c8960c]/30 transition-all whitespace-nowrap shadow-xs flex items-center gap-1 ml-auto"
            >
              <span>Full Catalog PDF</span>
              <span className="text-[10px]">↗</span>
            </Link>
            <Link
              href="/book?brand=branding"
              className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#c8960c] hover:bg-[#c8960c]/10 border border-[#c8960c]/20 transition-colors whitespace-nowrap"
            >
              Instant Quote ↗
            </Link>
          </div>
        </div>
      </section>

      {/* ── 3. FOUR CORE SOURCING DOMAINS & WORK TAB GATEWAY ──────── */}
      <section id="services" className="section-py bg-[var(--bg)] border-b border-[var(--border)] scroll-section">
        <div className="max-w-content mx-auto px-6">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="font-mono text-xs uppercase tracking-widest text-[#c8960c] block mb-2 font-semibold">
                // Sourcing &amp; Manufacturing Domains
              </span>
              <h2 className="font-display text-3xl sm:text-5xl text-[var(--text)] mb-4">
                What We Source &amp; Brand
              </h2>
              <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
                Everything is manufactured and quality-checked under direct supervision in Kenya. Zero subcontracting ambiguity.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Domain 1: Apparel */}
            <Reveal delay={80}>
              <div className="card-surface rounded-[var(--radius-lg)] p-6 sm:p-8 border border-[var(--border)] hover:border-[#c8960c]/40 transition-all flex flex-col justify-between h-full shadow-xs">
                <div>
                  <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-black/40 mb-6 border border-white/10">
                    <Image
                      src="/images/branding/apparel-executive-polo.webp"
                      alt="Apparel & Uniforms"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 550px"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-black/80 text-white backdrop-blur-xs">
                      Apparel &amp; Textiles
                    </div>
                  </div>
                  <h3 className="font-display text-2xl text-[var(--text)] mb-3">Apparel &amp; Uniforms</h3>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-6">
                    Executive polos, staff overalls, heavy cotton tees, and hoodies designed for heavy daily wear and commercial laundering.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {['Screen Printing (1-6 colours)', 'Computerized Embroidery', 'Direct-to-Film (DTF)', 'All-Over Sublimation'].map((spec) => (
                      <span key={spec} className="text-xs font-mono px-2.5 py-1 rounded bg-[var(--bg-soft)] text-[var(--text)] border border-[var(--border)]">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="pt-4 border-t border-[var(--border)] flex items-center justify-between">
                  <Link href="/portfolio?brand=branding" className="text-sm font-semibold text-[#c8960c] hover:underline flex items-center gap-1">
                    View in Work Tab <span>→</span>
                  </Link>
                  <span className="text-xs font-mono text-[var(--text-muted)]">Verified Production</span>
                </div>
              </div>
            </Reveal>

            {/* Domain 2: Hard Goods & Gifts */}
            <Reveal delay={160}>
              <div className="card-surface rounded-[var(--radius-lg)] p-6 sm:p-8 border border-[var(--border)] hover:border-[#c8960c]/40 transition-all flex flex-col justify-between h-full shadow-xs">
                <div>
                  <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-black/40 mb-6 border border-white/10">
                    <Image
                      src="/images/branding/gift-executive-vip-set.webp"
                      alt="Executive Gifts & Drinkware"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 550px"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-black/80 text-white backdrop-blur-xs">
                      Corporate Hard Goods
                    </div>
                  </div>
                  <h3 className="font-display text-2xl text-[var(--text)] mb-3">Executive Gifts &amp; Drinkware</h3>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-6">
                    Double-walled thermal flasks, matte executive notebooks, engraved metal pens, and tech accessories for VIP gifting.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {['UV Full-Color Print', 'Precision Laser Engraving', 'Pad Printing', 'Debossed Leatherette'].map((spec) => (
                      <span key={spec} className="text-xs font-mono px-2.5 py-1 rounded bg-[var(--bg-soft)] text-[var(--text)] border border-[var(--border)]">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="pt-4 border-t border-[var(--border)] flex items-center justify-between">
                  <Link href="/portfolio?brand=branding" className="text-sm font-semibold text-[#c8960c] hover:underline flex items-center gap-1">
                    View in Work Tab <span>→</span>
                  </Link>
                  <span className="text-xs font-mono text-[var(--text-muted)]">Verified Production</span>
                </div>
              </div>
            </Reveal>

            {/* Domain 3: Bags & Accessories */}
            <Reveal delay={240}>
              <div className="card-surface rounded-[var(--radius-lg)] p-6 sm:p-8 border border-[var(--border)] hover:border-[#c8960c]/40 transition-all flex flex-col justify-between h-full shadow-xs">
                <div>
                  <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-black/40 mb-6 border border-white/10">
                    <Image
                      src="/images/branding/catalog/bag-024.webp"
                      alt="Delegate Bags & Totes"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 550px"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-black/80 text-white backdrop-blur-xs">
                      Conference &amp; Merch
                    </div>
                  </div>
                  <h3 className="font-display text-2xl text-[var(--text)] mb-3">Delegate Bags &amp; Totes</h3>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-6">
                    Heavy-duty natural canvas bags, executive document folders, and conference backpacks with reinforced cross-stitching.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {['320 GSM Cotton Canvas', 'Reinforced Webbing Handles', 'Zero-PVC Water-Based Print', '15kg Load Rating'].map((spec) => (
                      <span key={spec} className="text-xs font-mono px-2.5 py-1 rounded bg-[var(--bg-soft)] text-[var(--text)] border border-[var(--border)]">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="pt-4 border-t border-[var(--border)] flex items-center justify-between">
                  <Link href="/portfolio?brand=branding" className="text-sm font-semibold text-[#c8960c] hover:underline flex items-center gap-1">
                    View in Work Tab <span>→</span>
                  </Link>
                  <span className="text-xs font-mono text-[var(--text-muted)]">Verified Production</span>
                </div>
              </div>
            </Reveal>

            {/* Domain 4: Institutional Tenders */}
            <Reveal delay={320}>
              <div className="card-surface rounded-[var(--radius-lg)] p-6 sm:p-8 border border-[var(--border)] hover:border-[#c8960c]/40 transition-all flex flex-col justify-between h-full shadow-xs">
                <div>
                  <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-black/40 mb-6 border border-white/10">
                    <Image
                      src="/images/branding/apparel-staff-uniform.webp"
                      alt="Tender-Scale Procurement"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 550px"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-black/80 text-white backdrop-blur-xs">
                      Institutional Tenders
                    </div>
                  </div>
                  <h3 className="font-display text-2xl text-[var(--text)] mb-3">Tender-Scale Procurement</h3>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-6">
                    Large-scale uniform and supply rollouts for County Governments, NGOs, financial institutions, and nationwide campaigns.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {['100% KRA Tax Compliant', 'Certificate of Origin', 'Quality Batch Testing', 'Milestone Delivery'].map((spec) => (
                      <span key={spec} className="text-xs font-mono px-2.5 py-1 rounded bg-[var(--bg-soft)] text-[var(--text)] border border-[var(--border)]">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="pt-4 border-t border-[var(--border)] flex items-center justify-between">
                  <Link href="/portfolio?brand=branding" className="text-sm font-semibold text-[#c8960c] hover:underline flex items-center gap-1">
                    View in Work Tab <span>→</span>
                  </Link>
                  <span className="text-xs font-mono text-[var(--text-muted)]">Verified Production</span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* ── High-Impact Gateway to Work Tab & Catalog PDF ───────────── */}
          <Reveal delay={200}>
            <div className="p-8 rounded-2xl bg-gradient-to-r from-neutral-900 via-neutral-900 to-neutral-800 text-white border border-[#c8960c]/30 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c8960c]/20 text-[#d4a017] font-mono text-xs uppercase tracking-widest font-semibold mb-3">
                  71 Verified Merchandise Items in Work Tab
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-2">
                  Explore Full Product Catalog &amp; Real Deliveries
                </h3>
                <p className="text-sm text-neutral-300 max-w-2xl leading-relaxed">
                  Browse our complete merchandise archive with live SKU search, category filters, and high-resolution photo plates inside the dedicated Work tab.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <Link
                  href="/portfolio?brand=branding"
                  className="px-6 py-3 rounded-xl bg-[#c8960c] hover:bg-[#d4a017] text-neutral-950 font-bold text-sm shadow-md transition-all flex items-center gap-2"
                >
                  <span>Explore Catalog in Work Tab</span>
                  <span>→</span>
                </Link>
                <Link
                  href="/catalog/branding/pdf"
                  target="_blank"
                  className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-sm border border-white/20 transition-all flex items-center gap-2"
                >
                  <span>Download Catalog PDF</span>
                  <span>↗</span>
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 4. PRODUCTION PIPELINE STEPS ──────────────────────────── */}
      <section id="pipeline" className="section-py bg-[var(--bg-soft)] border-b border-[var(--border)] scroll-section">
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

      {/* ── 6. INTERACTIVE TOOLS: ROI & TENDER (Dedicated Tabbed Suite) ───────── */}
      <section id="roi-calculator" className="section-py bg-[var(--bg-soft)] border-b border-[var(--border)] scroll-section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="font-mono text-xs uppercase tracking-widest text-[#c8960c] block mb-2 font-semibold">
                // Procurement Intelligence Suite
              </span>
              <h2 className="font-display text-3xl sm:text-4xl text-[var(--text)] mb-3 font-bold">
                Interactive Decision Tools
              </h2>
              <p className="text-xs sm:text-sm text-[var(--text-muted)]">
                Calculate brand exposure ROI or audit tender statutory compliance before submitting bids.
              </p>
            </div>
          </Reveal>

          {/* Tool Switcher Tabs */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex p-1.5 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-xs">
              <button
                onClick={() => setActiveToolTab('roi')}
                className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  activeToolTab === 'roi'
                    ? 'bg-[#c8960c] text-neutral-950 font-bold shadow-md'
                    : 'text-[var(--text-muted)] hover:text-[var(--text)]'
                }`}
              >
                Merchandise ROI &amp; Reach Simulator
              </button>
              <button
                id="tender-checker"
                onClick={() => setActiveToolTab('tender')}
                className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  activeToolTab === 'tender'
                    ? 'bg-[#c8960c] text-neutral-950 font-bold shadow-md'
                    : 'text-[var(--text-muted)] hover:text-[var(--text)]'
                }`}
              >
                Tender Compliance Auditor
              </button>
            </div>
          </div>

          <div>
            {activeToolTab === 'roi' ? (
              <BrandingROICalculator />
            ) : (
              <TenderComplianceChecker />
            )}
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
