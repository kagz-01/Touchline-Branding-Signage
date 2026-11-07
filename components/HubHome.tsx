'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Logo } from './Logo';
import { Reveal } from './Reveal';
import { HowItWorks } from './HowItWorks';
import { ProjectPhoto } from './ProjectPhoto';
import { FastQuoteWidget } from './FastQuoteWidget';

function getBrandUrl(brandId: 'branding' | 'signage'): string {
  if (typeof window === 'undefined') return `/${brandId}`;
  const isDev = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  if (isDev) return `/${brandId}`;
  return `https://${brandId}.touchlineltd.co.ke/`;
}

/* ------------------------------------------------------------------ */
/* Trust Stats & Testimonials                                          */
/* ------------------------------------------------------------------ */

const TRUST_STATS = [
  { value: 500, suffix: '+', label: 'Commercial Projects Delivered across Kenya' },
  { value: 47, suffix: '/47', label: 'Kenyan Counties Served Nationwide' },
  { value: 98, suffix: '%', label: 'On-Time Delivery & Installation Rate' },
  { value: 10, suffix: 'K+', label: 'Branded Apparel & Promotional Units' },
];

const CLIENT_SECTORS = [
  { name: 'Corporate & Banking', desc: 'HQ architectural signs, executive merchandise, board gift sets' },
  { name: 'Government & Tenders', desc: '100% tax compliant, tender-scale uniforms, bulk supply rollouts' },
  { name: 'Retail & Hospitality', desc: 'Chain storefront fascias, staff aprons/polos, illuminated lightboxes' },
  { name: 'Logistics & Fleet', desc: 'High-durability cast vinyl vehicle wraps, warehouse wayfinding' },
];

const TESTIMONIALS = [
  {
    quote:
      'Touchline handled our entire 12-branch signage rebranding across Kenya and our corporate staff uniforms in one go. We never had to chase separate vendors.',
    name: 'James Mwangi',
    role: 'Procurement Director, Financial Services Group',
    division: 'branding' as const,
  },
  {
    quote:
      'The 3D illuminated letters on our Mombasa and Nairobi locations look flawless after two years of weather. Precision fabrication that commands respect.',
    name: 'Peter Odhiambo',
    role: 'Head of Facilities, Retail Chain',
    division: 'signage' as const,
  },
  {
    quote:
      'Met a tight county tender delivery deadline with zero defects on 2,500 branded garments. Everything was counted, inspected, and certified.',
    name: 'Amina Hassan',
    role: 'Supply Chain Manager, Regional NGO',
    division: 'branding' as const,
  },
];

/* ------------------------------------------------------------------ */
/* Animated Counter                                                    */
/* ------------------------------------------------------------------ */

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 1800;
          const startTime = performance.now();
          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}{suffix}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Main HubHome Component                                              */
/* ------------------------------------------------------------------ */

export function HubHome() {
  return (
    <div className="relative">
      {/* ── 1. SPLIT CINEMATIC HERO (The Dual Gateway — Compact & Perfectly Scaled) ── */}
      <section className="relative min-h-[82vh] lg:h-[calc(100vh-65px)] lg:max-h-[760px] flex flex-col justify-between overflow-hidden pt-6 sm:pt-8 pb-6 sm:pb-8 border-b border-white/10 bg-[#090b0e] text-white">
        {/* Subtle Ambient Background Gradients & Precision Blueprint Grid */}
        <div className="absolute inset-0 pointer-events-none z-0" aria-hidden="true">
          <div className="absolute top-1/4 -left-28 w-[500px] h-[500px] rounded-full bg-[#c8960c] opacity-[0.10] blur-[140px]" />
          <div className="absolute top-1/3 -right-28 w-[500px] h-[500px] rounded-full bg-[#0070f3] opacity-[0.09] blur-[140px]" />
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage:
                'repeating-linear-gradient(0deg, #ffffff 0px, #ffffff 1px, transparent 1px, transparent 44px), repeating-linear-gradient(90deg, #ffffff 0px, #ffffff 1px, transparent 1px, transparent 44px)',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#090b0e]/30 to-[#090b0e]" />
        </div>

        {/* ── Top Header Banner & Mission Statement ──────────────── */}
        <div className="relative z-10 max-w-content mx-auto px-4 sm:px-6 w-full text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-3 sm:mb-4 shadow-sm backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#c8960c] animate-pulse" />
              <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-neutral-300">
                Touchline Group · East Africa
              </span>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="font-display text-3xl sm:text-5xl lg:text-[3.25rem] xl:text-[3.6rem] leading-[0.98] tracking-tight text-white max-w-4xl mx-auto mb-2.5 sm:mb-3 text-balance">
              YOUR BRAND, <br className="hidden sm:inline" />
              BUILT <span className="bg-gradient-to-r from-[#0070f3] via-[#0ea5e9] to-[#38bdf8] bg-clip-text text-transparent">VISIBLE</span> &amp; <span className="text-[#c8960c]">PHYSICAL.</span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="text-xs sm:text-sm lg:text-[15px] text-neutral-300 leading-relaxed max-w-2xl mx-auto mb-4 sm:mb-5 font-normal text-balance">
              Two specialized production divisions under one roof. From tender-scale apparel and promotional merchandise to 3D architectural signage and nationwide installations.
            </p>
          </Reveal>

          <Reveal delay={220}>
            <div className="flex flex-wrap items-center justify-center gap-3 mb-2">
              <Link
                href="/book"
                className="btn-primary shadow-lg shadow-[#c8960c]/20 px-5 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold rounded-xl"
              >
                Request TouchDesk Quote <span>→</span>
              </Link>
              <a
                href="https://wa.me/254722668696?text=Hi%20Touchline%2C%20I%20would%20like%20to%20discuss%20a%20branding%20or%20signage%20project."
                target="_blank"
                rel="noreferrer"
                className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium bg-white/5 hover:bg-white/10 text-white border border-white/15 backdrop-blur-md transition-all flex items-center gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                WhatsApp Desk Hotline
              </a>
            </div>
          </Reveal>
        </div>

        {/* ── Interactive Dual-Wing Gateway (Compact & Perfectly Proportioned) ── */}
        <div className="relative z-10 max-w-content mx-auto px-4 sm:px-6 w-full pt-2">
          <div className="grid md:grid-cols-2 gap-4 lg:gap-6 items-stretch">
            {/* ── LEFT WING: TOUCHLINE BRANDING ──────────────── */}
            <Reveal delay={260}>
              <a
                href={getBrandUrl('branding')}
                className="group relative flex flex-col justify-between p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-[#18140b] to-[#0e0c08] border border-amber-900/30 hover:border-[#c8960c]/70 transition-all duration-300 shadow-xl overflow-hidden min-h-[260px] sm:min-h-[280px]"
              >
                <div className="absolute -top-20 -left-20 w-48 h-48 rounded-full bg-[#c8960c]/15 blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#c8960c] bg-[#c8960c]/10 px-2 py-0.5 rounded border border-[#c8960c]/20 font-semibold">
                      Division 01 // Apparel &amp; Merch
                    </span>
                    <span className="font-mono text-[10px] text-amber-200/50 group-hover:text-amber-200 transition-colors">
                      branding.touchlineltd.co.ke ↗
                    </span>
                  </div>

                  <Logo brand="branding" className="h-6 sm:h-7 w-auto mb-2.5" forceLight />

                  <h3 className="font-display text-lg sm:text-xl text-amber-50 mb-1.5 group-hover:text-[#d4a820] transition-colors leading-snug">
                    The Merchandise People Carry.
                  </h3>

                  <p className="text-xs text-amber-100/70 leading-relaxed mb-3 line-clamp-2 max-w-md">
                    Screen printing, direct-to-film (DTF), embroidery, executive corporate gifting, and high-volume tender fulfillment across Kenya.
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {['Screen Print & DTF', 'Tactile Embroidery', 'Corporate Kits', 'Tender Sourcing'].map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950/40 text-amber-200/80 border border-amber-800/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="relative z-10 pt-3 border-t border-amber-900/30 flex items-center justify-between">
                  <span className="font-display text-xs uppercase tracking-wider text-[#d4a820] flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                    Explore Branding Platform <span>→</span>
                  </span>
                  <span className="font-mono text-[10px] text-amber-300/60">
                    500+ Items Sourced
                  </span>
                </div>
              </a>
            </Reveal>

            {/* ── RIGHT WING: TOUCHLINE SIGNAGE ──────────────── */}
            <Reveal delay={320}>
              <a
                href={getBrandUrl('signage')}
                className="group relative flex flex-col justify-between p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-[#0b131f] to-[#060b12] border border-blue-900/30 hover:border-[#0070f3]/70 transition-all duration-300 shadow-xl overflow-hidden min-h-[260px] sm:min-h-[280px]"
              >
                <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-[#0070f3]/15 blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#0070f3] bg-[#0070f3]/10 px-2 py-0.5 rounded border border-[#0070f3]/20 font-semibold">
                      Division 02 // Architectural &amp; Signs
                    </span>
                    <span className="font-mono text-[10px] text-blue-200/50 group-hover:text-blue-200 transition-colors">
                      signage.touchlineltd.co.ke ↗
                    </span>
                  </div>

                  <Logo brand="signage" className="h-6 sm:h-7 w-auto mb-2.5" forceLight />

                  <h3 className="font-display text-lg sm:text-xl text-blue-50 mb-1.5 group-hover:text-[#38bdf8] transition-colors leading-snug">
                    The Signs People See.
                  </h3>

                  <p className="text-xs text-blue-100/70 leading-relaxed mb-3 line-clamp-2 max-w-md">
                    3D fabricated acrylic &amp; stainless channel letters, high-output LED lightboxes, vehicle fleet wraps, and architectural monuments.
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {['3D Fabricated Letters', 'LED Lightboxes', 'Vehicle Fleet Wraps', 'Site Installations'].map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-950/40 text-blue-200/80 border border-blue-800/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="relative z-10 pt-3 border-t border-blue-900/30 flex items-center justify-between">
                  <span className="font-display text-xs uppercase tracking-wider text-[#38bdf8] flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                    Explore Signage Platform <span>→</span>
                  </span>
                  <span className="font-mono text-[10px] text-blue-300/60">
                    200+ Sites Fabricated
                  </span>
                </div>
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 2. PHILOSOPHY: THE PHYSICAL REALITY ───────────────────── */}
      <section className="section-py bg-[var(--bg)] border-b border-[var(--border)]">
        <div className="max-w-content mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <Reveal>
                <span className="font-mono text-xs uppercase tracking-widest text-[var(--accent)] block mb-3">
                  // The Touchline Thesis
                </span>
                <h2 className="font-display text-3xl sm:text-5xl leading-tight text-[var(--text)] mb-6">
                  Most brands have a logo in a deck.
                  <br />
                  Few command a <span className="grad-text">real presence.</span>
                </h2>
              </Reveal>
              <Reveal delay={120}>
                <p className="text-base sm:text-lg text-[var(--text-muted)] leading-relaxed mb-6 font-normal">
                  Digital ads vanish after a single scroll. But the tangible world is defined by what people actually touch, wear, and see every day: the executive uniform your team wears on site, the precision 3D signage on your building, and the fleet vehicles driving across the city.
                </p>
                <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
                  Touchline exists to turn your graphic guidelines into physical assets built with industrial permanence, certified materials, and meticulous finishing.
                </p>
              </Reveal>
            </div>

            <div className="lg:col-span-5 grid sm:grid-cols-2 gap-4">
              <div className="p-6 rounded-[var(--radius-md)] bg-[var(--bg-soft)] border border-[var(--border)] tilt-card glass-interactive">
                <span className="font-mono text-xs text-[var(--accent)] block mb-2 font-semibold">01 / MERCHANDISE</span>
                <h4 className="font-display text-xl text-[var(--text)] mb-2">Carried &amp; Worn</h4>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  Apparel, bags, drinkware, and VIP sets that represent your standard in client hands.
                </p>
              </div>

              <div className="p-6 rounded-[var(--radius-md)] bg-[var(--bg-soft)] border border-[var(--border)] tilt-card glass-interactive">
                <span className="font-mono text-xs text-[#0070f3] block mb-2 font-semibold">02 / STRUCTURES</span>
                <h4 className="font-display text-xl text-[var(--text)] mb-2">Built &amp; Seen</h4>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  3D signs, illuminated pylons, and architectural wayfinding that anchor your locations.
                </p>
              </div>

              <div className="p-6 rounded-[var(--radius-md)] bg-[var(--bg-soft)] border border-[var(--border)] sm:col-span-2 tilt-card glass-interactive">
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-mono text-xs uppercase tracking-wider text-[var(--text)] font-semibold">
                    TouchDesk Operations Engine
                  </span>
                </div>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  Every order is tracked through TouchDesk — from digital stitch file approvals and CNC routing proofs to delivery notes with biometric signatures and verified field handover.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. THE TWO PILLARS (Visual Showcase with Image Slots) ─── */}
      <section id="the-two-pillars" className="section-py bg-[var(--bg-soft)] border-b border-[var(--border)] scroll-section">
        <div className="max-w-content mx-auto px-6">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-[var(--accent)] block mb-2">
                  // Operational Capabilities
                </span>
                <h2 className="font-display text-3xl sm:text-5xl text-[var(--text)]">
                  The Two Operational Pillars
                </h2>
              </div>
              <p className="text-sm text-[var(--text-muted)] max-w-md">
                Dive directly into either dedicated platform for full technical service specifications, materials catalogues, and division pricing.
              </p>
            </div>
          </Reveal>

          <div className="grid lg:grid-cols-2 gap-10">
            {/* PILLAR 1: BRANDING */}
            <Reveal delay={100}>
              <div className="card-surface rounded-[var(--radius-lg)] p-8 sm:p-10 border border-[var(--border)] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-xs uppercase tracking-widest text-[#c8960c] font-semibold">
                      TOUCHLINE BRANDING
                    </span>
                    <span className="text-xs font-mono text-[var(--text-muted)]">Division 01</span>
                  </div>

                  <h3 className="font-display text-3xl sm:text-4xl text-[var(--text)] mb-4">
                    Apparel &amp; Promotional Merchandise
                  </h3>

                  <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed mb-8">
                    Certified raw fabric sourcing, precision multi-head computerized embroidery, high-definition DTF heat press, and executive corporate kit assembly.
                  </p>

                  <div className="mb-8 rounded-[var(--radius-md)] overflow-hidden border border-[var(--border)]">
                    <ProjectPhoto
                      src="/images/branding/hero-merch.jpg"
                      alt="Touchline Branded Corporate Merchandise"
                      division="branding"
                      badge="Textile Production"
                      aspect="aspect-[16/9]"
                    />
                  </div>

                  <div className="space-y-3 mb-8">
                    {[
                      { title: 'Apparel & Uniforms', detail: 'Executive polos, heavy-duty overalls, hoodies, cotton tees' },
                      { title: 'VIP Hard Goods', detail: 'Laser-engraved thermal flasks, notebooks, metal pens' },
                      { title: 'Woven Crests & Patches', detail: 'High-density woven damask, velcro patches, debossed leather' },
                      { title: 'Tender Rollouts', detail: 'County and institutional bulk orders up to 50,000 units' },
                    ].map((cap) => (
                      <div key={cap.title} className="p-3.5 rounded-lg bg-[var(--bg)] border border-[var(--border)]">
                        <div className="font-semibold text-sm text-[var(--text)]">{cap.title}</div>
                        <div className="text-xs text-[var(--text-muted)] mt-0.5">{cap.detail}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <a href={getBrandUrl('branding')} className="btn-primary w-full justify-center text-center py-3.5">
                  Launch Branding Platform <span>→</span>
                </a>
              </div>
            </Reveal>

            {/* PILLAR 2: SIGNAGE */}
            <Reveal delay={200}>
              <div className="card-surface rounded-[var(--radius-lg)] p-8 sm:p-10 border border-[var(--border)] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-xs uppercase tracking-widest text-[#0070f3] font-semibold">
                      TOUCHLINE SIGNAGE
                    </span>
                    <span className="text-xs font-mono text-[var(--text-muted)]">Division 02</span>
                  </div>

                  <h3 className="font-display text-3xl sm:text-4xl text-[var(--text)] mb-4">
                    Architectural &amp; Commercial Signage
                  </h3>

                  <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed mb-8">
                    Fiber laser cutting, automated channel letter return bending, IP67 Samsung LED modules, structural engineering calculations, and DOSH-certified site rigging.
                  </p>

                  <div className="mb-8 rounded-[var(--radius-md)] overflow-hidden border border-[var(--border)]">
                    <ProjectPhoto
                      src="/images/signage/hero-signage.jpg"
                      alt="Touchline 3D Illuminated Channel Letters Architectural Facade"
                      division="signage"
                      badge="Nairobi Fabrication Workshop"
                      aspect="aspect-[16/9]"
                    />
                  </div>

                  <div className="space-y-3 mb-8">
                    {[
                      { title: '3D Illuminated Letters', detail: 'Stainless steel, aluminum returns, diffusing acrylic faces' },
                      { title: 'Architectural Lightboxes', detail: 'Ultra-slim LED edge-lit, tension fabric, aluminum extrusions' },
                      { title: 'Vehicle Fleet Wraps', detail: 'Premium cast vinyl with UV overlaminate for logistics fleets' },
                      { title: 'Highway Pylons & Totems', detail: 'Heavy structural steel, KenHA clearance, wind-load certified' },
                    ].map((cap) => (
                      <div key={cap.title} className="p-3.5 rounded-lg bg-[var(--bg)] border border-[var(--border)]">
                        <div className="font-semibold text-sm text-[var(--text)]">{cap.title}</div>
                        <div className="text-xs text-[var(--text-muted)] mt-0.5">{cap.detail}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <a href={getBrandUrl('signage')} className="btn-secondary w-full justify-center text-center py-3.5 hover:border-[#0070f3] hover:text-[#0070f3]">
                  Launch Signage Platform <span>→</span>
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 4. HOW TOUCHLINE WORKS (Operational Pipeline) ─────────── */}
      <HowItWorks />

      {/* ── 5. SECTOR EXPERTISE (Who We Serve) ─────────────────────── */}
      <section className="section-py bg-[var(--bg)] border-b border-[var(--border)]">
        <div className="max-w-content mx-auto px-6">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="font-mono text-xs uppercase tracking-widest text-[var(--accent)] block mb-2">
                // Industry Reach
              </span>
              <h2 className="font-display text-3xl sm:text-5xl text-[var(--text)] mb-4">
                Sectors That Trust Touchline
              </h2>
              <p className="text-sm sm:text-base text-[var(--text-muted)]">
                From corporate banks with strict branding guidelines to commercial fleets demanding heavy-abrasion vinyl.
              </p>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CLIENT_SECTORS.map((sector, i) => (
              <Reveal key={sector.name} delay={i * 80}>
                <div className="p-6 rounded-[var(--radius-md)] bg-[var(--bg-soft)] border border-[var(--border)] h-full flex flex-col justify-between">
                  <div>
                    <span className="font-mono text-xs text-[var(--accent)] font-semibold block mb-3">
                      0{i + 1} // SECTOR
                    </span>
                    <h4 className="font-display text-xl text-[var(--text)] mb-3">{sector.name}</h4>
                    <p className="text-xs text-[var(--text-muted)] leading-relaxed">{sector.desc}</p>
                  </div>
                  <div className="pt-6 mt-6 border-t border-[var(--border)]">
                    <span className="text-[11px] font-mono text-[var(--accent)] flex items-center gap-1">
                      Verified Commercial Grade <span>✓</span>
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. NATIONWIDE METRICS & TRUST PROOF ───────────────────── */}
      <section className="py-20 bg-[var(--bg-soft)] border-b border-[var(--border)]">
        <div className="max-w-content mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 text-center">
            {TRUST_STATS.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 80}>
                <div>
                  <div className="font-display text-4xl sm:text-5xl lg:text-6xl text-[var(--text)] mb-2">
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="text-xs sm:text-sm text-[var(--text-muted)] max-w-[200px] mx-auto leading-relaxed">
                    {stat.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. VERIFIED COMMERCIAL TESTIMONIALS ───────────────────── */}
      <section className="section-py bg-[var(--bg)] border-b border-[var(--border)]">
        <div className="max-w-content mx-auto px-6">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="font-mono text-xs uppercase tracking-widest text-[var(--accent)] block mb-2">
                // Client Field Feedback
              </span>
              <h2 className="font-display text-3xl sm:text-5xl text-[var(--text)] mb-4">
                What Procurement &amp; Facilities Teams Say
              </h2>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t.name} delay={i * 100}>
                <div className="card-surface p-8 rounded-[var(--radius-lg)] border border-[var(--border)] flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center gap-2 mb-6">
                      <span className={`w-2 h-2 rounded-full ${t.division === 'branding' ? 'bg-[#c8960c]' : 'bg-[#0070f3]'}`} />
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
                        {t.division === 'branding' ? 'Branding Project' : 'Signage Project'}
                      </span>
                    </div>
                    <blockquote className="text-sm text-[var(--text)] leading-relaxed italic mb-6">
                      &ldquo;{t.quote}&rdquo;
                    </blockquote>
                  </div>
                  <div className="pt-4 border-t border-[var(--border)]">
                    <div className="font-semibold text-sm text-[var(--text)]">{t.name}</div>
                    <div className="text-xs text-[var(--text-muted)]">{t.role}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. LIVE FAST-QUOTE CONFIGURATOR ───────────────────────── */}
      <section id="fast-quote" className="section-py bg-[var(--bg-soft)] border-b border-[var(--border)] scroll-section">
        <div className="max-w-content mx-auto px-6">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="font-mono text-xs uppercase tracking-widest text-[var(--accent)] block mb-2">
                // Instant Sizing &amp; Pricing
              </span>
              <h2 className="font-display text-3xl sm:text-5xl text-[var(--text)] mb-4">
                FastQuote Estimator
              </h2>
              <p className="text-sm sm:text-base text-[var(--text-muted)]">
                Get an instant budgetary estimate for standard apparel, corporate gifts, 3D signs, or vehicle wraps.
              </p>
            </div>
          </Reveal>

          <div className="max-w-3xl mx-auto">
            <FastQuoteWidget initialBrand="branding" />
          </div>
        </div>
      </section>

      {/* ── 9. BOTTOM COMMAND CTA (The Unified Handshake) ─────────── */}
      <section className="section-py bg-[var(--bg)] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full bg-[var(--accent)] opacity-[0.04] blur-[180px]" />
        </div>

        <div className="relative z-10 max-w-content mx-auto px-6 text-center">
          <Reveal>
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--accent)] block mb-4">
              // Direct Workshop Connection
            </span>
            <h2 className="font-display text-4xl sm:text-6xl text-[var(--text)] mb-6 max-w-3xl mx-auto leading-tight">
              Ready to manufacture your brand&apos;s physical presence?
            </h2>
            <p className="text-base sm:text-lg text-[var(--text-muted)] max-w-xl mx-auto mb-10">
              One tender quote, one point of contact, two specialized factories. Let&apos;s build something tangible.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/book" className="btn-primary px-8 py-4 text-base font-semibold shadow-xl shadow-[var(--accent)]/15">
                Start TouchDesk Quote <span>→</span>
              </Link>
              <a
                href="tel:+254722668696"
                className="btn-secondary px-8 py-4 text-base font-semibold"
              >
                Call Nairobi HQ: +254 722 668 696
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
