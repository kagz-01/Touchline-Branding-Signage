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
      {/* ── 1. HIGH-TECH MAIN HERO (Wording Centered · Pure UI / No Fake Photo Backgrounds) ── */}
      {/* Engineered to occupy ~6/8 of the screen (~75-80vh) with NO vertical scrolling on desktop */}
      <section className="relative min-h-[calc(100vh-65px)] lg:h-[calc(100vh-65px)] lg:max-h-[800px] xl:max-h-[840px] flex flex-col justify-between overflow-hidden pt-3 sm:pt-6 pb-3 sm:pb-5 border-b border-[var(--border)] bg-[var(--bg)] text-[var(--text)] transition-colors duration-300">
        {/* High-Tech Ambient Geometric Canvas (Radial Mesh Glows + Precision Dot Grid) */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          {/* Subtle Ambient Conic / Radial Glows */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-[#c8960c]/12 via-[#0070f3]/8 to-transparent rounded-full blur-3xl opacity-75 dark:opacity-40" />
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#c8960c]/10 dark:bg-[#c8960c]/15 rounded-full blur-3xl" />
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#0070f3]/10 dark:bg-[#0070f3]/15 rounded-full blur-3xl" />
          {/* High-Tech Precision Dot Matrix */}
          <div className="absolute inset-0 bg-[radial-gradient(rgba(0,0,0,0.06)_1px,transparent_1px)] dark:bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_40%,#000_60%,transparent_100%)]" />
        </div>

        {/* ── TOP: CENTERED VALUE PROPOSITION ────────────────────── */}
        <div className="relative z-10 max-w-content mx-auto px-4 sm:px-6 w-full text-center pt-1 sm:pt-2">
          <div className="max-w-3xl mx-auto flex flex-col items-center">
            {/* Division Status Pill */}
            <Reveal>
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1 rounded-full bg-[var(--surface)] border border-[var(--border)] mb-2.5 sm:mb-3 shadow-xs backdrop-blur-md">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#c8960c] animate-pulse" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0070f3]" />
                </span>
                <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[var(--text-muted)] font-medium">
                  Touchline Group · East Africa
                </span>
              </div>
            </Reveal>

            {/* Main Punchy Centered Headline */}
            <Reveal delay={80}>
              <h1 className="font-display text-3xl sm:text-5xl lg:text-[3.25rem] xl:text-[3.6rem] leading-[0.98] tracking-tight text-[var(--text)] mb-2.5 sm:mb-3 text-balance">
                WE MAKE BRANDS <br className="hidden sm:inline" />
                IMPOSSIBLE TO <span className="bg-gradient-to-r from-[#c8960c] via-[#d4a017] to-[#e6af2e] bg-clip-text text-transparent">IGNORE.</span>
              </h1>
            </Reveal>

            {/* Centered Concise Description */}
            <Reveal delay={160}>
              <p className="text-xs sm:text-sm lg:text-[15px] text-[var(--text-muted)] leading-relaxed mb-3 sm:mb-4 max-w-2xl font-normal text-balance">
                We bring brands to life through premium apparel, promotional merchandise and architectural signage. From creative production to physical installation, we turn your brand vision into lasting impact.
              </p>
            </Reveal>

            {/* Centered CTAs */}
            <Reveal delay={220}>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="/book"
                  className="btn-primary btn-magnetic shadow-md shadow-[#c8960c]/25 px-5 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold rounded-xl"
                >
                  Start a Project <span>→</span>
                </Link>
                <a
                  href="#the-two-pillars"
                  className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium bg-[var(--surface)] hover:bg-[var(--bg-soft)] text-[var(--text)] border border-[var(--border)] shadow-xs transition-all flex items-center gap-2"
                >
                  <span className="w-2 h-2 rounded-full bg-[#c8960c]" />
                  Explore Our Work
                </a>
              </div>
            </Reveal>
          </div>
        </div>

        {/* ── MIDDLE: HIGH-TECH TRUST RIBBON (Centered & Ultra-Compact) ── */}
        <div className="relative z-10 max-w-content mx-auto px-4 sm:px-6 w-full my-2 sm:my-2.5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 py-2 sm:py-2.5 px-3 sm:px-5 rounded-2xl bg-[var(--surface)]/90 border border-[var(--border)] shadow-xs backdrop-blur-md">
            <div className="flex items-center gap-2.5 text-left">
              <div className="w-8 h-8 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500 text-sm shrink-0 border border-amber-500/20">
                💎
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-[var(--text)] truncate">Premium Quality</p>
                <p className="text-[10px] text-[var(--text-muted)] truncate">In Every Detail</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 text-left">
              <div className="w-8 h-8 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 text-sm shrink-0 border border-blue-500/20">
                🤝
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-[var(--text)] truncate">Trusted Partner</p>
                <p className="text-[10px] text-[var(--text-muted)] truncate">Across East Africa</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 text-left">
              <div className="w-8 h-8 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500 text-sm shrink-0 border border-amber-500/20">
                ⏱️
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-[var(--text)] truncate">On-Time Delivery</p>
                <p className="text-[10px] text-[var(--text-muted)] truncate">Always Verified</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 text-left">
              <div className="w-8 h-8 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 text-sm shrink-0 border border-blue-500/20">
                ⭐
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-[var(--text)] truncate">Creative Excellence</p>
                <p className="text-[10px] text-[var(--text-muted)] truncate">In Everything We Do</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── BOTTOM: DUAL GATEWAY WINGS (Left: 01 BRANDING · Right: 02 SIGNAGE) ── */}
        <div className="relative z-10 max-w-content mx-auto px-4 sm:px-6 w-full pb-1">
          <div className="grid md:grid-cols-2 gap-3 sm:gap-4 items-stretch">
            {/* ── LEFT CARD: 01 / BRANDING (Warm Gold High-Tech Card) ── */}
            <Reveal delay={260}>
              <a
                href={getBrandUrl('branding')}
                className="group relative flex flex-col justify-between p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-amber-500/[0.05] via-[var(--surface)] to-[var(--surface)] border border-amber-500/25 hover:border-[#c8960c] transition-all duration-300 shadow-sm hover:shadow-lg overflow-hidden min-h-[140px] sm:min-h-[155px]"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform" />

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#c8960c] bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 font-semibold">
                      01 / BRANDING
                    </span>
                    <span className="font-mono text-[10px] text-[var(--text-muted)] group-hover:text-[#c8960c] transition-colors">
                      branding.touchlineltd.co.ke ↗
                    </span>
                  </div>

                  <h3 className="font-display text-lg sm:text-xl text-[var(--text)] mb-1 group-hover:text-[#c8960c] transition-colors leading-snug">
                    The Brand People <span className="text-[#c8960c]">Carry.</span>
                  </h3>

                  <p className="text-[11px] sm:text-xs text-[var(--text-muted)] leading-relaxed mb-2.5 line-clamp-2 max-w-md">
                    Custom apparel, corporate merchandise and promotional products that put your brand in people&apos;s hands.
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[var(--border)]">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-[var(--text-muted)]">
                    <span className="px-1.5 py-0.5 rounded bg-[var(--bg-soft)]">Apparel</span>
                    <span className="px-1.5 py-0.5 rounded bg-[var(--bg-soft)]">Drinkware</span>
                    <span className="px-1.5 py-0.5 rounded bg-[var(--bg-soft)]">Gifts</span>
                  </div>
                  <span className="font-mono text-[10px] sm:text-[11px] font-semibold text-[#c8960c] flex items-center gap-1 group-hover:gap-2 transition-all">
                    Explore Branding <span>→</span>
                  </span>
                </div>
              </a>
            </Reveal>

            {/* ── RIGHT CARD: 02 / SIGNAGE (Steel Blue High-Tech Card) ── */}
            <Reveal delay={320}>
              <a
                href={getBrandUrl('signage')}
                className="group relative flex flex-col justify-between p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-blue-500/[0.05] via-[var(--surface)] to-[var(--surface)] border border-blue-500/25 hover:border-[#0070f3] transition-all duration-300 shadow-sm hover:shadow-lg overflow-hidden min-h-[140px] sm:min-h-[155px]"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform" />

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#0070f3] bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20 font-semibold">
                      02 / SIGNAGE
                    </span>
                    <span className="font-mono text-[10px] text-[var(--text-muted)] group-hover:text-[#0070f3] transition-colors">
                      signage.touchlineltd.co.ke ↗
                    </span>
                  </div>

                  <h3 className="font-display text-lg sm:text-xl text-[var(--text)] mb-1 group-hover:text-[#0070f3] transition-colors leading-snug">
                    The Brand People <span className="text-[#0070f3]">See.</span>
                  </h3>

                  <p className="text-[11px] sm:text-xs text-[var(--text-muted)] leading-relaxed mb-2.5 line-clamp-2 max-w-md">
                    Architectural signage, illuminated 3D letters, LED displays and precision installations that command attention.
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[var(--border)]">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-[var(--text-muted)]">
                    <span className="px-1.5 py-0.5 rounded bg-[var(--bg-soft)]">3D Letters</span>
                    <span className="px-1.5 py-0.5 rounded bg-[var(--bg-soft)]">Pylons</span>
                    <span className="px-1.5 py-0.5 rounded bg-[var(--bg-soft)]">Fleets</span>
                  </div>
                  <span className="font-mono text-[10px] sm:text-[11px] font-semibold text-[#0070f3] flex items-center gap-1 group-hover:gap-2 transition-all">
                    Explore Signage <span>→</span>
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
