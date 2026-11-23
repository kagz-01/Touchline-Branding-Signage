'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { BrandConfig } from '@/config/brands';
import {
  SIGNAGE_TYPES,
  INDUSTRY_GUIDES,
  HOT_PRODUCTS_KE,
  WAYFINDING_STANDARDS,
  type IndustrySector,
  type SignageType,
} from '@/config/signage-knowledge';
import { ServicesGrid } from './ServicesGrid';
import { CrossSellBanner } from './CrossSellBanner';
import { CTASection } from './CTASection';
import { Reveal } from './Reveal';
import { SignageZoneDetector } from './SignageZoneDetector';

export function SignageContent({ brand }: { brand: BrandConfig }) {
  return (
    <>
      {/* ── 1. ASYMMETRICAL SPLIT HERO ──────────────────────────── */}
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
            {/* Left: Heading, Subtext, CTAs, Metric Strip */}
            <div className="lg:col-span-7 space-y-6">
              <Reveal>
                <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/25">
                  <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
                  <span className="font-mono text-[11px] font-semibold text-[var(--accent)] tracking-widest uppercase">
                    Architectural Signage & Systems
                  </span>
                </div>
              </Reveal>

              <Reveal delay={80}>
                <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.08] text-[var(--text)] tracking-tight font-bold">
                  Structural signage & architectural wayfinding{' '}
                  <span className="grad-text">engineered for Kenyan climates.</span>
                </h1>
              </Reveal>

              <Reveal delay={160}>
                <p className="text-base sm:text-lg text-[var(--text-muted)] leading-relaxed max-w-2xl">
                  From CNC laser-cut 3D LED channel letters and highway pylons to retail network rollouts. Engineered with IP67 sealed illumination, marine-grade alloys, and certified wind-load calculation across 47 counties.
                </p>
              </Reveal>

              <Reveal delay={220}>
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Link
                    href="/book?brand=signage"
                    className="btn-primary glow-accent px-6 py-3 text-sm font-semibold"
                  >
                    Request Site Survey & Quote <span>→</span>
                  </Link>
                  <Link
                    href="/catalog/signage/pdf"
                    target="_blank"
                    className="flex items-center gap-2 px-5 py-3 text-sm font-semibold rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--bg-soft)] text-[var(--text)] transition-all shadow-xs"
                  >
                    <span>Download Technical PDF</span>
                    <span className="text-xs text-[var(--accent)]">↓</span>
                  </Link>
                  <a
                    href="#sign-types"
                    className="px-5 py-3 text-sm font-medium rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)]/60 hover:bg-[var(--bg-soft)] text-[var(--text-muted)] hover:text-[var(--text)] transition-all"
                  >
                    Compare Sign Types
                  </a>
                </div>
              </Reveal>

              {/* Engineering Metrics Strip */}
              <Reveal delay={280}>
                <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[var(--border)] max-w-xl">
                  <div className="p-3 rounded-xl bg-[var(--surface)] border border-[var(--border)] shadow-xs">
                    <span className="block font-mono text-lg sm:text-xl font-bold text-[var(--text)]">5-Year</span>
                    <span className="text-[11px] text-[var(--text-muted)] font-medium leading-tight block">Structural Warranty</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[var(--surface)] border border-[var(--border)] shadow-xs">
                    <span className="block font-mono text-lg sm:text-xl font-bold text-[var(--text)]">IP67 Rated</span>
                    <span className="text-[11px] text-[var(--text-muted)] font-medium leading-tight block">Sealed Weatherproof LEDs</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[var(--surface)] border border-[var(--border)] shadow-xs">
                    <span className="block font-mono text-lg sm:text-xl font-bold text-[var(--text)]">47 Counties</span>
                    <span className="text-[11px] text-[var(--text-muted)] font-medium leading-tight block">Certified Rigging Crews</span>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right: Technical Specimen Card */}
            <div className="lg:col-span-5">
              <Reveal delay={140}>
                <div className="card-theme rounded-2xl border border-[var(--border)] overflow-hidden shadow-xl p-5 space-y-4 bg-[var(--surface)]">
                  {/* Spec Header */}
                  <div className="flex items-center justify-between border-b border-[var(--border)] pb-3 text-xs">
                    <span className="font-mono text-[11px] font-bold text-[var(--accent)] tracking-wider">
                      SYSTEM-SIG-3D // HEAVY STRUCTURAL
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-600 dark:text-blue-400 font-mono text-[10px] font-semibold">
                      Wind Certified
                    </span>
                  </div>

                  {/* Product Specimen */}
                  <div className="relative rounded-xl overflow-hidden border border-[var(--border)] group">
                    <Image
                      src="/images/signage/3d-channel-letters.webp"
                      alt="Touchline 3D Channel Letter Signage Specimen"
                      width={600}
                      height={420}
                      className="w-full h-64 sm:h-72 object-cover transition-transform duration-500 group-hover:scale-105"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-md border border-white/20 text-white font-mono text-[10px] font-semibold">
                      Laser CNC Stainless 316
                    </div>
                    <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-md border border-white/20 text-white font-mono text-[10px] font-semibold">
                      Cast Acrylic 15mm Face
                    </div>
                    <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md bg-[var(--accent)] text-[var(--accent-ink)] font-mono text-[10px] font-bold">
                      Day/Night Illuminated
                    </div>
                  </div>

                  {/* Blueprint Specs */}
                  <div className="space-y-2 pt-1">
                    <div className="flex items-center justify-between text-xs py-1 border-b border-[var(--border)]/60">
                      <span className="text-[var(--text-muted)]">Illumination Engine</span>
                      <span className="font-mono font-semibold text-[var(--text)]">Samsung / Mean Well IP67</span>
                    </div>
                    <div className="flex items-center justify-between text-xs py-1 border-b border-[var(--border)]/60">
                      <span className="text-[var(--text-muted)]">Substrate Durability</span>
                      <span className="font-mono font-semibold text-[var(--text)]">Anti-Corrosion Anodized</span>
                    </div>
                    <div className="flex items-center justify-between text-xs py-1">
                      <span className="text-[var(--text-muted)]">Climate Rating</span>
                      <span className="font-mono font-semibold text-[var(--accent)]">Coastal Salt & Highland Frost</span>
                    </div>
                  </div>

                  {/* Quick Action Footer */}
                  <div className="pt-2">
                    <a
                      href="#climate-zones"
                      className="w-full py-2.5 px-4 rounded-xl bg-[var(--bg-soft)] hover:bg-[var(--accent)]/15 border border-[var(--border)] hover:border-[var(--accent)]/30 text-xs font-semibold text-[var(--text)] flex items-center justify-between transition-colors"
                    >
                      <span>Check Signage in Kenya Climate Zone Detector</span>
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
        aria-label="Signage Services Navigation"
        className="sticky top-[57px] sm:top-[61px] z-30 bg-[var(--bg)]/95 backdrop-blur-xl border-b border-[var(--border)] py-2.5 px-4 sm:px-6 shadow-xs"
      >
        <div className="max-w-content mx-auto flex items-center justify-start md:justify-center gap-2 overflow-x-auto scrollbar-none py-0.5">
          {[
            { href: '#all-services', label: 'All Services' },
            { href: '#climate-zones', label: 'Climate Zone Detector', accent: true },
            { href: '#sign-types', label: 'Sign Types Compared' },
            { href: '#sector-guides', label: 'Sector Guides' },
            { href: '#osha-standards', label: 'OSHA 2007 Standards' },
          ].map(({ href, label, accent }) => (
            <a
              key={href}
              href={href}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all shadow-xs ${
                accent
                  ? 'bg-[var(--accent)] text-[var(--accent-ink)] font-semibold hover:opacity-90'
                  : 'text-[var(--text-muted)] hover:text-[var(--text)] bg-[var(--surface)] hover:bg-[var(--bg-soft)] border border-[var(--border)]'
              }`}
            >
              {label}
            </a>
          ))}
          <Link
            href="/catalog/signage/pdf"
            target="_blank"
            className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-[var(--accent)] bg-[var(--accent)]/10 hover:bg-[var(--accent)]/20 border border-[var(--accent)]/30 transition-all whitespace-nowrap shadow-xs flex items-center gap-1"
          >
            <span>Technical Specs PDF</span>
            <span className="text-[10px]">↗</span>
          </Link>
        </div>
      </nav>

      {/* ── 3. ALL SERVICES GRID ─────────────────────────────────── */}
      <section id="all-services" className="section-py section-alt scroll-section border-b border-[var(--border)]">
        <ServicesGrid brand={brand} />
      </section>

      {/* ── 4. ZONE-AWARE RECOMMENDATIONS ───────────────────────── */}
      <section id="climate-zones" className="section-py bg-[var(--bg)] scroll-section border-b border-[var(--border)]">
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

      {/* ── 5. SIGNAGE TYPES COMPARED ───────────────────────────── */}
      <section id="sign-types" className="section-py section-alt scroll-section border-b border-[var(--border)]">
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
            {(['channel-letters', 'led-neon', 'lightbox', 'vinyl-wrap', 'wayfinding', 'monument'] as SignageType[]).map(
              (typeKey, i) => {
                const type = SIGNAGE_TYPES[typeKey];
                return (
                  <Reveal key={typeKey} delay={i * 80}>
                    <div className="card-theme rounded-[var(--radius-lg)] p-6 h-full border border-[var(--border)]">
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
                          <span
                            key={mat}
                            className="text-[9px] text-[var(--accent)] bg-[var(--accent)]/10 px-2 py-0.5 rounded-full"
                          >
                            {mat.replace(/-/g, ' ')}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Reveal>
                );
              }
            )}
          </div>
        </div>
      </section>

      {/* ── 6. SECTOR GUIDES ─────────────────────────────────────── */}
      <section id="sector-guides" className="section-py bg-[var(--bg)] scroll-section border-b border-[var(--border)]">
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
            {(['retail', 'hospitality', 'healthcare', 'corporate', 'industrial', 'government'] as IndustrySector[]).map(
              (sector, i) => {
                const guide = INDUSTRY_GUIDES[sector];
                return (
                  <Reveal key={sector} delay={i * 80}>
                    <div className="card-theme rounded-[var(--radius-lg)] p-6 h-full border border-[var(--border)]">
                      <h3 className="font-display text-lg text-[var(--text)] mb-2">{guide.name}</h3>
                      <p className="text-xs text-[var(--text-muted)] mb-3 line-clamp-2">
                        {guide.keyNeeds.slice(0, 2).join(' • ')}
                      </p>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {guide.recommendedTypes.slice(0, 3).map((t) => (
                          <span
                            key={t}
                            className="px-2 py-0.5 rounded bg-[var(--accent)]/10 text-[var(--accent)] text-[9px] font-mono uppercase"
                          >
                            {t.replace(/-/g, ' ')}
                          </span>
                        ))}
                      </div>
                      {guide.complianceNotes && (
                        <p className="text-[10px] text-amber-500 italic">{guide.complianceNotes[0]}</p>
                      )}
                    </div>
                  </Reveal>
                );
              }
            )}
          </div>
        </div>
      </section>

      {/* ── 7. OSHA 2007 COMPLIANCE ──────────────────────────────── */}
      <section id="osha-standards" className="section-py section-alt scroll-section border-b border-[var(--border)]">
        <div className="max-w-content mx-auto px-6">
          <Reveal>
            <div className="card-theme rounded-[var(--radius-lg)] p-8 md:p-12 max-w-3xl mx-auto border border-[var(--border)]">
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
                {['ISO 7010 Standard', 'Bilingual English/Kiswahili', 'Photoluminescent Options'].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] text-xs font-mono uppercase tracking-widest"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 8. HOT PRODUCTS IN KENYA ─────────────────────────────── */}
      <section className="section-py bg-[var(--bg)] border-b border-[var(--border)]">
        <div className="max-w-content mx-auto px-6">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl text-[var(--text)] mb-4">
                Top signage in <span className="accent-word">Kenya 2026</span>
              </h2>
            </div>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {HOT_PRODUCTS_KE.map((product: (typeof HOT_PRODUCTS_KE)[number], i: number) => (
              <Reveal key={product.name} delay={i * 60}>
                <div className="card-theme rounded-[var(--radius-md)] p-4 text-center h-full border border-[var(--border)]">
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

      {/* ── 9. CROSS-SELL BANNER ─────────────────────────────────── */}
      <section className="section-py section-alt">
        <CrossSellBanner brand={brand} />
      </section>

      {/* ── 10. CTA SECTION ──────────────────────────────────────── */}
      <section className="section-py">
        <CTASection brand={brand} />
      </section>
    </>
  );
}
