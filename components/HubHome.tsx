'use client';

import Link from 'next/link';
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
      {/* ── 1. SPLIT CINEMATIC HERO (The Dual Gateway) ──────────────── */}
      <section className="relative min-h-[92vh] flex flex-col justify-between overflow-hidden pt-12 pb-16 border-b border-[var(--border)]">
        {/* Subtle Ambient Background Gradients */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="parallax-slow absolute top-1/4 -left-32 w-[600px] h-[600px] rounded-full bg-[#c8960c] opacity-[0.07] blur-[150px]" data-speed="0.12" />
          <div className="parallax-slow absolute top-1/3 -right-32 w-[600px] h-[600px] rounded-full bg-[#0070f3] opacity-[0.06] blur-[150px]" data-speed="-0.08" />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                'repeating-linear-gradient(0deg, var(--text) 0px, var(--text) 1px, transparent 1px, transparent 60px), repeating-linear-gradient(90deg, var(--text) 0px, var(--text) 1px, transparent 1px, transparent 60px)',
            }}
          />
        </div>

        {/* Top Header Banner & Mission Statement */}
        <div className="relative z-20 max-w-content mx-auto px-6 w-full text-center mb-10">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--bg-soft)] border border-[var(--border)] mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--text-muted)]">
                Touchline Group · East Africa
              </span>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-tight text-[var(--text)] max-w-4xl mx-auto mb-6">
              YOUR BRAND, <br className="hidden sm:inline" />
              BUILT <span className="grad-text">VISIBLE</span> &amp; <span className="text-[var(--accent)]">PHYSICAL.</span>
            </h1>
          </Reveal>

          <Reveal delay={180}>
            <p className="text-base sm:text-lg text-[var(--text-muted)] leading-relaxed max-w-2xl mx-auto mb-8 font-normal">
              Two specialized production divisions under one roof. From tender-scale apparel and promotional merchandise to 3D architectural signage and nationwide installations.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/book" className="btn-primary shadow-lg shadow-[var(--accent)]/10 px-6 py-3">
                Request TouchDesk Quote <span>→</span>
              </Link>
              <a
                href="https://wa.me/254722668696?text=Hi%20Touchline%2C%20I%20would%20like%20to%20discuss%20a%20branding%20or%20signage%20project."
                target="_blank"
                rel="noreferrer"
                className="btn-secondary glass-subtle px-6 py-3 flex items-center gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                WhatsApp Desk Hotline
              </a>
            </div>
          </Reveal>
        </div>

        {/* Interactive Dual-Wing Gateway */}
        <div className="relative z-20 max-w-content mx-auto px-6 w-full">
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
            {/* ── LEFT WING: TOUCHLINE BRANDING ──────────────── */}
            <Reveal delay={280}>
              <a
                href={getBrandUrl('branding')}
                className="group relative flex flex-col justify-between p-8 sm:p-10 rounded-[var(--radius-lg)] bg-gradient-to-b from-[#18140b] to-[#0e0c08] border border-amber-900/30 hover:border-[#c8960c]/60 transition-all duration-500 shadow-xl overflow-hidden min-h-[380px] tilt-card glass-interactive"
              >
                <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full bg-[#c8960c]/15 blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-700" />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#c8960c] bg-[#c8960c]/10 px-2.5 py-1 rounded border border-[#c8960c]/20">
                      Division 01 // Apparel &amp; Merch
                    </span>
                    <span className="font-mono text-xs text-amber-200/50">
                      branding.touchlineltd.co.ke ↗
                    </span>
                  </div>

                  <Logo brand="branding" className="h-8 sm:h-9 w-auto mb-4" />

                  <h3 className="font-display text-2xl sm:text-3xl text-amber-50 mb-3 group-hover:text-[#d4a820] transition-colors">
                    The Merchandise People Carry.
                  </h3>

                  <p className="text-sm text-amber-100/70 leading-relaxed mb-6 max-w-md">
                    Screen printing, direct-to-film (DTF), embroidery, executive corporate gifting, and high-volume tender fulfillment across Kenya.
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {['Screen Print & DTF', 'Tactile Embroidery', 'Corporate Kits', 'Tender Sourcing'].map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-mono px-2.5 py-1 rounded bg-amber-950/40 text-amber-200/80 border border-amber-800/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="relative z-10 pt-6 border-t border-amber-900/30 flex items-center justify-between">
                  <span className="font-display text-sm uppercase tracking-wider text-[#d4a820] flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
                    Explore Branding Platform <span>→</span>
                  </span>
                  <span className="font-mono text-xs text-amber-300/60">
                    500+ Items Sourced
                  </span>
                </div>
              </a>
            </Reveal>

            {/* ── RIGHT WING: TOUCHLINE SIGNAGE ──────────────── */}
            <Reveal delay={340}>
              <a
                href={getBrandUrl('signage')}
                className="group relative flex flex-col justify-between p-8 sm:p-10 rounded-[var(--radius-lg)] bg-gradient-to-b from-[#0b131f] to-[#060b12] border border-blue-900/30 hover:border-[#0070f3]/60 transition-all duration-500 shadow-xl overflow-hidden min-h-[380px] tilt-card glass-interactive"
              >
                <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-[#0070f3]/15 blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-700" />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#0070f3] bg-[#0070f3]/10 px-2.5 py-1 rounded border border-[#0070f3]/20">
                      Division 02 // Architectural &amp; Signs
                    </span>
                    <span className="font-mono text-xs text-blue-200/50">
                      signage.touchlineltd.co.ke ↗
                    </span>
                  </div>

                  <Logo brand="signage" className="h-8 sm:h-9 w-auto mb-4" />

                  <h3 className="font-display text-2xl sm:text-3xl text-blue-50 mb-3 group-hover:text-[#38bdf8] transition-colors">
                    The Signs People See.
                  </h3>

                  <p className="text-sm text-blue-100/70 leading-relaxed mb-6 max-w-md">
                    3D fabricated acrylic &amp; stainless channel letters, high-output LED lightboxes, vehicle fleet wraps, and architectural monuments.
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {['3D Fabricated Letters', 'LED Lightboxes', 'Vehicle Fleet Wraps', 'Site Installations'].map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-mono px-2.5 py-1 rounded bg-blue-950/40 text-blue-200/80 border border-blue-800/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="relative z-10 pt-6 border-t border-blue-900/30 flex items-center justify-between">
                  <span className="font-display text-sm uppercase tracking-wider text-[#38bdf8] flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
                    Explore Signage Platform <span>→</span>
                  </span>
                  <span className="font-mono text-xs text-blue-300/60">
                    200+ Sites Fabricated
                  </span>
                </div>
              </a>
            </Reveal>
          </div>
        </div>

        {/* Bottom Explorer Indicator */}
        <div className="relative z-20 text-center mt-12">
          <Reveal delay={400}>
            <a
              href="#the-two-pillars"
              className="inline-flex flex-col items-center gap-2 text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.3em]">
                Scroll to explore full capabilities
              </span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4 animate-bounce">
                <path d="M12 5v14M19 12l-7 7-7-7" />
              </svg>
            </a>
          </Reveal>
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

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Pillar 1: Touchline Branding */}
            <div className="flex flex-col justify-between p-8 sm:p-10 rounded-[var(--radius-lg)] bg-[var(--surface)] border border-amber-900/20 shadow-lg">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs text-[#c8960c] uppercase tracking-widest font-semibold">
                    Division 01 // Touchline Branding
                  </span>
                  <a
                    href={getBrandUrl('branding')}
                    className="text-xs font-mono text-[#c8960c] hover:underline"
                  >
                    branding.touchlineltd.co.ke ↗
                  </a>
                </div>

                <h3 className="font-display text-2xl sm:text-3xl text-[var(--text)] mb-3">
                  Apparel, Textiles &amp; Promotional Sourcing
                </h3>

                <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-6">
                  Industrial-grade screen printing, precision embroidery, high-detail DTF, and tender-scale promotional procurement for corporations and institutions.
                </p>

                {/* Project Photo Slots (Ready for user images in /images/branding/) */}
                <div className="grid sm:grid-cols-2 gap-4 mb-8">
                  <ProjectPhoto
                    src="/images/branding/apparel-embroidery.jpg"
                    alt="Corporate Apparel & Embroidery"
                    division="branding"
                    badge="Apparel & Textiles"
                  />
                  <ProjectPhoto
                    src="/images/branding/corporate-gifts.jpg"
                    alt="Executive Merch & Gifting"
                    division="branding"
                    badge="Corporate Merch"
                  />
                </div>

                <ul className="grid sm:grid-cols-2 gap-2 text-xs font-mono text-[var(--text-muted)] mb-8">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c8960c]" />
                    Screen Printing (1 to 6 Colors)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c8960c]" />
                    Direct-to-Film (Full Color DTF)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c8960c]" />
                    Computerized 3D Puff Embroidery
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c8960c]" />
                    Tender-Scale County/NGO Sourcing
                  </li>
                </ul>
              </div>

              <div className="pt-6 border-t border-[var(--border)] flex items-center justify-between">
                <a
                  href={getBrandUrl('branding')}
                  className="btn-primary text-xs px-5 py-2.5 flex items-center gap-2 shadow"
                >
                  Enter Branding Platform <span>→</span>
                </a>
                <span className="font-mono text-xs text-[var(--text-muted)]">500+ Items Sourced</span>
              </div>
            </div>

            {/* Pillar 2: Touchline Signage */}
            <div className="flex flex-col justify-between p-8 sm:p-10 rounded-[var(--radius-lg)] bg-[var(--surface)] border border-blue-900/20 shadow-lg">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs text-[#0070f3] uppercase tracking-widest font-semibold">
                    Division 02 // Touchline Signage
                  </span>
                  <a
                    href={getBrandUrl('signage')}
                    className="text-xs font-mono text-[#0070f3] hover:underline"
                  >
                    signage.touchlineltd.co.ke ↗
                  </a>
                </div>

                <h3 className="font-display text-2xl sm:text-3xl text-[var(--text)] mb-3">
                  Architectural Signage, LED &amp; Fleet Graphics
                </h3>

                <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-6">
                  Heavy-duty 3D fabricated lettering, high-output LED lightboxes, roadside pylons, and certified commercial vehicle fleet wraps.
                </p>

                {/* Project Photo Slots (Ready for user images in /images/signage/) */}
                <div className="grid sm:grid-cols-2 gap-4 mb-8">
                  <ProjectPhoto
                    src="/images/signage/3d-channel-letters.jpg"
                    alt="3D Fabricated Channel Letters"
                    division="signage"
                    badge="3D Fabrication"
                  />
                  <ProjectPhoto
                    src="/images/signage/vehicle-wrap.jpg"
                    alt="Commercial Vehicle Fleet Wraps"
                    division="signage"
                    badge="Fleet Graphics"
                  />
                </div>

                <ul className="grid sm:grid-cols-2 gap-2 text-xs font-mono text-[var(--text-muted)] mb-8">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0070f3]" />
                    3D Stainless Steel &amp; Acrylic Letters
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0070f3]" />
                    Outdoor High-Lumen LED Lightboxes
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0070f3]" />
                    Commercial Cast Vinyl Fleet Wraps
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0070f3]" />
                    Nationwide Structural Installation
                  </li>
                </ul>
              </div>

              <div className="pt-6 border-t border-[var(--border)] flex items-center justify-between">
                <a
                  href={getBrandUrl('signage')}
                  className="btn-primary text-xs px-5 py-2.5 flex items-center gap-2 shadow"
                  style={{ background: '#0070f3', borderColor: '#0070f3' }}
                >
                  Enter Signage Platform <span>→</span>
                </a>
                <span className="font-mono text-xs text-[var(--text-muted)]">200+ Sites Installed</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. THE UNIFIED ADVANTAGE (Why One House Matters) ──────── */}
      <section className="section-py bg-[var(--bg)] border-b border-[var(--border)]">
        <div className="max-w-content mx-auto px-6">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="font-mono text-xs uppercase tracking-widest text-[var(--accent)] block mb-2">
                // Single-Source Reliability
              </span>
              <h2 className="font-display text-3xl sm:text-5xl text-[var(--text)] mb-6">
                One Contract. One Delivery Schedule. <br />
                <span className="grad-text">Zero Vendor Chaos.</span>
              </h2>
              <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
                When you launch a new retail site, bank branch, or commercial rollout, you normally juggle multiple vendors: a tailor for uniforms, a printer for promo items, a fabricator for outdoor signs, and a designer in between. Touchline unifies the entire execution.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="card-surface p-8 rounded-[var(--radius-md)] border border-[var(--border)]">
              <div className="w-10 h-10 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center font-mono font-bold mb-4">
                01
              </div>
              <h4 className="font-display text-xl text-[var(--text)] mb-3">Unified Brand Accuracy</h4>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                Your Pantone and brand codes stay exact across completely different media — matching precisely from embroidered cotton shirts to vinyl decals and illuminated outdoor acrylics.
              </p>
            </div>

            <div className="card-surface p-8 rounded-[var(--radius-md)] border border-[var(--border)]">
              <div className="w-10 h-10 rounded-full bg-[#0070f3]/10 text-[#0070f3] flex items-center justify-center font-mono font-bold mb-4">
                02
              </div>
              <h4 className="font-display text-xl text-[var(--text)] mb-3">Single Project Manager</h4>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                You work with one dedicated Touchline account director who oversees both apparel lines and signage structural engineers, giving you consolidated updates and one milestone calendar.
              </p>
            </div>

            <div className="card-surface p-8 rounded-[var(--radius-md)] border border-[var(--border)]">
              <div className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-mono font-bold mb-4">
                03
              </div>
              <h4 className="font-display text-xl text-[var(--text)] mb-3">Consolidated Billing &amp; Tax</h4>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                One verified KRA tax invoice, clear procurement documentation, and full compliance for corporate audits, institutional procurement, and public tenders.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. FAST-TRACK ESTIMATOR & TOUCHDESK INTAKE ────────────── */}
      <section className="section-py bg-[var(--bg-soft)] border-b border-[var(--border)]">
        <div className="max-w-content mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <FastQuoteWidget />
          </div>
        </div>
      </section>

      {/* ── 6. HOW IT WORKS ──────────────────────────────────────── */}
      <HowItWorks
        headline="From Initial Brief to Verified Delivery"
        kicker="THE TOUCHLINE PROCESS"
      />

      {/* ── 7. NATIONWIDE PROOF & CLIENT SECTORS ─────────────────── */}
      <section className="section-py bg-[var(--bg)] border-b border-[var(--border)]">
        <div className="max-w-content mx-auto px-6">
          {/* Animated Metrics Strip */}
          <Reveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 rounded-[var(--radius-lg)] bg-[var(--bg-soft)] border border-[var(--border)] mb-20">
              {TRUST_STATS.map((item) => (
                <div key={item.label} className="text-center sm:text-left">
                  <span className="font-display text-3xl sm:text-4xl text-[var(--accent)] block mb-1">
                    <AnimatedCounter target={item.value} suffix={item.suffix} />
                  </span>
                  <span className="text-xs text-[var(--text-muted)] leading-tight block">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Client Sectors */}
          <Reveal>
            <div className="text-center mb-12">
              <span className="font-mono text-xs uppercase tracking-widest text-[var(--accent)] block mb-2">
                // Commercial Provenance
              </span>
              <h2 className="font-display text-3xl sm:text-4xl text-[var(--text)]">
                Trusted Across Kenyan Sectors
              </h2>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {CLIENT_SECTORS.map((sector) => (
              <div
                key={sector.name}
                className="p-6 rounded-[var(--radius-md)] bg-[var(--surface)] border border-[var(--border)]"
              >
                <h4 className="font-display text-lg text-[var(--text)] mb-2">{sector.name}</h4>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">{sector.desc}</p>
              </div>
            ))}
          </div>

          {/* Testimonials */}
          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t.name} delay={i * 100}>
                <blockquote className="card-surface rounded-[var(--radius-md)] p-8 h-full flex flex-col justify-between">
                  <p className="font-editorial italic text-base sm:text-lg text-[var(--text)] leading-relaxed mb-6">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="pt-4 border-t border-[var(--border)]">
                    <p className="text-sm font-semibold text-[var(--text)]">{t.name}</p>
                    <p className="text-xs text-[var(--text-muted)]">{t.role}</p>
                  </div>
                </blockquote>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. FINAL HIGH-CONVERSION CTA ──────────────────────────── */}
      <section className="section-py bg-gradient-to-b from-[var(--bg-soft)] to-[var(--bg)]">
        <div className="max-w-content mx-auto px-6 text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--bg)] border border-[var(--border)] mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="font-mono text-[11px] uppercase tracking-widest text-[var(--text-muted)]">
                TouchDesk Live Dispatch
              </span>
            </div>

            <h2 className="font-display text-4xl sm:text-6xl text-[var(--text)] mb-6 max-w-3xl mx-auto leading-tight">
              Ready to Make Your Brand <span className="grad-text">Physical?</span>
            </h2>
          </Reveal>

          <Reveal delay={80}>
            <p className="text-base sm:text-lg text-[var(--text-muted)] max-w-xl mx-auto mb-10 leading-relaxed font-normal">
              Whether you need 100 branded corporate polos, a complete fleet vehicle wrap, or architectural storefront signage — start your brief with us today.
            </p>
          </Reveal>

          <Reveal delay={160}>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/book" className="btn-primary shadow-xl shadow-[var(--accent)]/15 px-8 py-3.5 text-sm">
                Get a Comprehensive Quote <span>→</span>
              </Link>
              <a
                href="https://wa.me/254722668696?text=Hi%20Touchline%2C%20I%20would%20like%20to%20speak%20to%20your%20team%20regarding%20a%20project."
                target="_blank"
                rel="noreferrer"
                className="btn-secondary glass-subtle px-7 py-3.5 text-sm flex items-center gap-2"
              >
                <span>💬</span> WhatsApp Desk Hotline
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
