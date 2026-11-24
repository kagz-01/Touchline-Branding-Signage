'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Logo } from './Logo';
import { Reveal } from './Reveal';
import { HowItWorks } from './HowItWorks';
import { ProjectPhoto } from './ProjectPhoto';
import { FastQuoteWidget } from './FastQuoteWidget';
import { EcosystemInteractiveShowcase } from './EcosystemInteractiveShowcase';
import { EcosystemHeroSlideshow } from './EcosystemHeroSlideshow';

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
      {/* ── 1. SPLIT CINEMATIC HERO (Asymmetrical Power Split: Hero Stage + 2x2 Quad Gateway) ── */}
      <section className="relative min-h-[90vh] lg:min-h-[calc(100vh-65px)] flex items-center overflow-hidden py-10 sm:py-14 border-b border-white/10 bg-[#090b0e] text-white">
        {/* Full-Bleed Executive Background Image */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
          <Image
            src="/images/heroes/hub-hero-bg.webp"
            alt="Touchline Executive Workspace"
            fill
            priority
            quality={95}
            className="object-cover object-center opacity-90 brightness-105 contrast-[1.08] saturate-[1.05]"
          />
          {/* Targeted Left Scrim: Gently deepens behind the left column text so copy is razor-sharp */}
          <div className="absolute inset-y-0 left-0 w-full lg:w-7/12 bg-gradient-to-r from-[#090b0e]/85 via-[#090b0e]/40 to-transparent pointer-events-none" />

          {/* Subtle Top & Bottom Gradient to smoothly anchor nav and divider */}
          <div className="absolute top-0 inset-x-0 h-20 bg-gradient-to-b from-[#090b0e]/60 to-transparent pointer-events-none" />
          <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-[#090b0e] via-[#090b0e]/40 to-transparent pointer-events-none" />

          {/* Soft Brand Warmth */}
          <div className="absolute top-1/4 -left-28 w-[450px] h-[450px] rounded-full bg-[#c8960c] opacity-[0.06] blur-[140px]" />
          <div className="absolute top-1/3 -right-28 w-[450px] h-[450px] rounded-full bg-[#0070f3] opacity-[0.06] blur-[140px]" />
        </div>

        <div className="relative z-10 max-w-content mx-auto px-4 sm:px-6 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-10 items-center">
            {/* ── LEFT COLUMN: Headline, Value Prop & Prominent hub-hero Stage ── */}
            <div className="lg:col-span-6 flex flex-col justify-center space-y-4 sm:space-y-5">
              <Reveal>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 shadow-sm backdrop-blur-md">
                  <span className="w-2 h-2 rounded-full bg-[#c8960c] animate-pulse" />
                  <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-neutral-300">
                    Touchline Group · East Africa
                  </span>
                </div>
              </Reveal>

              <Reveal delay={60}>
                <h1 className="font-display text-3xl sm:text-4xl xl:text-[2.85rem] leading-[1.02] tracking-tight text-white text-balance drop-shadow-md">
                  YOUR BRAND, <br className="hidden sm:inline" />
                  BUILT <span className="bg-gradient-to-r from-[#0070f3] via-[#0ea5e9] to-[#38bdf8] bg-clip-text text-transparent">VISIBLE</span> &amp; <span className="text-[#c8960c]">PHYSICAL.</span>
                </h1>
              </Reveal>

              <Reveal delay={120}>
                <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed font-normal text-balance drop-shadow-sm">
                  The unified physical brand ecosystem across Kenya. Commercial apparel, architectural signage, curated executive gifts, and bespoke awards — engineered and delivered under direct factory oversight.
                </p>
              </Reveal>

              <Reveal delay={180}>
                <div className="flex flex-wrap items-center gap-3 pt-0.5">
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

              {/* ── LIVE MULTI-DIVISION SLIDESHOW COMPONENT ── */}
              <Reveal delay={240}>
                <EcosystemHeroSlideshow />
              </Reveal>
            </div>

            {/* ── RIGHT COLUMN: Interactive 2x2 Quad-Gateway Stack ── */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 xl:gap-4 items-stretch">
                {/* ── DIVISION 01: TOUCHLINE BRANDING ──────────────── */}
                <Reveal delay={220}>
                  <a
                    href={getBrandUrl('branding')}
                    className="group relative flex flex-col justify-between p-4 sm:p-4.5 rounded-2xl bg-gradient-to-b from-[#18140b] to-[#0e0c08] border border-amber-900/40 hover:border-[#c8960c]/80 transition-all duration-300 shadow-xl overflow-hidden min-h-[240px] sm:min-h-[255px] h-full"
                  >
                    <div className="absolute -top-16 -left-16 w-36 h-36 rounded-full bg-[#c8960c]/15 blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />

                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#c8960c] bg-[#c8960c]/10 px-2 py-0.5 rounded border border-[#c8960c]/20 font-semibold">
                          Div 01 // Apparel &amp; Merch
                        </span>
                        <span className="font-mono text-[9px] text-amber-200/50 group-hover:text-amber-200 transition-colors">
                          branding.touchlineltd.co.ke ↗
                        </span>
                      </div>

                      <div className="flex items-center justify-between mb-2">
                        <Logo brand="branding" className="h-5 sm:h-6 w-auto" forceLight />
                        <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-amber-500/25 bg-black/40 shrink-0">
                          <Image
                            src="/images/branding/apparel-executive-polo.webp"
                            alt="Touchline Executive Polo"
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                      </div>

                      <h3 className="font-display text-sm sm:text-base text-amber-50 mb-1 group-hover:text-[#d4a820] transition-colors leading-snug">
                        The Merchandise People Carry.
                      </h3>

                      <p className="text-[11px] text-amber-100/70 leading-relaxed mb-2 line-clamp-2">
                        Screen printing, DTF, embroidery, corporate uniforms, and tender fulfillment across Kenya.
                      </p>

                      <div className="flex flex-wrap gap-1 mb-2">
                        {['Screen & DTF', 'Embroidery', 'Staff Uniforms'].map((tag) => (
                          <span
                            key={tag}
                            className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-amber-950/40 text-amber-200/80 border border-amber-800/30"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="relative z-10 pt-2 border-t border-amber-900/30 flex items-center justify-between">
                      <span className="font-display text-[10px] uppercase tracking-wider text-[#d4a820] flex items-center gap-1 group-hover:gap-2 transition-all">
                        Explore Branding <span>→</span>
                      </span>
                      <span className="font-mono text-[9px] text-amber-300/60">
                        500+ Items
                      </span>
                    </div>
                  </a>
                </Reveal>

                {/* ── DIVISION 02: TOUCHLINE SIGNAGE ──────────────── */}
                <Reveal delay={260}>
                  <a
                    href={getBrandUrl('signage')}
                    className="group relative flex flex-col justify-between p-4 sm:p-4.5 rounded-2xl bg-gradient-to-b from-[#0b131f] to-[#060b12] border border-blue-900/40 hover:border-[#0070f3]/80 transition-all duration-300 shadow-xl overflow-hidden min-h-[240px] sm:min-h-[255px] h-full"
                  >
                    <div className="absolute -top-16 -right-16 w-36 h-36 rounded-full bg-[#0070f3]/15 blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />

                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#0070f3] bg-[#0070f3]/10 px-2 py-0.5 rounded border border-[#0070f3]/20 font-semibold">
                          Div 02 // Architectural Signs
                        </span>
                        <span className="font-mono text-[9px] text-blue-200/50 group-hover:text-blue-200 transition-colors">
                          signage.touchlineltd.co.ke ↗
                        </span>
                      </div>

                      <div className="flex items-center justify-between mb-2">
                        <Logo brand="signage" className="h-5 sm:h-6 w-auto" forceLight />
                        <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-blue-500/25 bg-black/40 shrink-0">
                          <Image
                            src="/images/signage/3d-channel-letters.webp"
                            alt="Touchline 3D Channel Letters"
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                      </div>

                      <h3 className="font-display text-sm sm:text-base text-blue-50 mb-1 group-hover:text-[#38bdf8] transition-colors leading-snug">
                        The Signs People See.
                      </h3>

                      <p className="text-[11px] text-blue-100/70 leading-relaxed mb-2 line-clamp-2">
                        3D channel letters, LED lightboxes, vehicle fleet wraps, and architectural monuments.
                      </p>

                      <div className="flex flex-wrap gap-1 mb-2">
                        {['3D Letters', 'LED Lightboxes', 'Fleet Wraps'].map((tag) => (
                          <span
                            key={tag}
                            className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-blue-950/40 text-blue-200/80 border border-blue-800/30"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="relative z-10 pt-2 border-t border-blue-900/30 flex items-center justify-between">
                      <span className="font-display text-[10px] uppercase tracking-wider text-[#38bdf8] flex items-center gap-1 group-hover:gap-2 transition-all">
                        Explore Signage <span>→</span>
                      </span>
                      <span className="font-mono text-[9px] text-blue-300/60">
                        200+ Sites
                      </span>
                    </div>
                  </a>
                </Reveal>

                {/* ── DIVISION 03: TOUCHGIFTSHOP (SISTER COMPANY) ─── */}
                <Reveal delay={300}>
                  <a
                    href="https://touchgiftshop.co.ke"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex flex-col justify-between p-4 sm:p-4.5 rounded-2xl bg-gradient-to-b from-[#200d17] to-[#10060b] border border-[#9B1B5A]/40 hover:border-[#9B1B5A]/85 transition-all duration-300 shadow-xl overflow-hidden min-h-[240px] sm:min-h-[255px] h-full"
                  >
                    <div className="absolute -top-16 -left-16 w-36 h-36 rounded-full bg-[#9B1B5A]/15 blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />

                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#f472b6] bg-[#9B1B5A]/15 px-2 py-0.5 rounded border border-[#9B1B5A]/30 font-semibold">
                          Div 03 // Corporate Gifts
                        </span>
                        <span className="font-mono text-[9px] text-pink-200/50 group-hover:text-pink-200 transition-colors">
                          touchgiftshop.co.ke ↗
                        </span>
                      </div>

                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded bg-[#9B1B5A]/25 border border-[#9B1B5A]/40 flex items-center justify-center text-[#f472b6]">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
                              <polyline points="20 12 20 22 4 22 4 12" />
                              <rect x="2" y="7" width="20" height="5" />
                              <line x1="12" y1="22" x2="12" y2="7" />
                              <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
                              <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
                            </svg>
                          </div>
                          <span className="font-display font-bold text-xs sm:text-sm tracking-wider uppercase text-white">
                            TOUCH<span className="text-[#f472b6]">GIFTSHOP</span>
                          </span>
                        </div>
                        <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-[#9B1B5A]/30 bg-black/40 shrink-0">
                          <Image
                            src="/images/giftshop/giftshop-luxury-trio-box.webp"
                            alt="TouchGiftShop Presentation Box"
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                      </div>

                      <h3 className="font-display text-sm sm:text-base text-pink-50 mb-1 group-hover:text-[#f472b6] transition-colors leading-snug">
                        Elevate the Art of Gifting.
                      </h3>

                      <p className="text-[11px] text-pink-100/70 leading-relaxed mb-2 line-clamp-2">
                        Kenya&apos;s premium gifting engine: Pool a Gift™ group funds, Build a Hamper studio, photo proof &amp; same-day Nairobi delivery.
                      </p>

                      <div className="flex flex-wrap gap-1 mb-2">
                        {['Pool a Gift™', 'Build a Hamper', 'Photo-Proof'].map((tag) => (
                          <span
                            key={tag}
                            className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-pink-950/40 text-pink-200/80 border border-[#9B1B5A]/30"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="relative z-10 pt-2 border-t border-[#9B1B5A]/30 flex items-center justify-between">
                      <span className="font-display text-[10px] uppercase tracking-wider text-[#f472b6] flex items-center gap-1 group-hover:gap-2 transition-all">
                        Launch Gift Lab <span>→</span>
                      </span>
                      <span className="font-mono text-[9px] text-pink-300/60">
                        Park Towers · Same-Day
                      </span>
                    </div>
                  </a>
                </Reveal>

                {/* ── DIVISION 04: TOUCHLINE AWARDS (STOREFRONT) ──── */}
                <Reveal delay={340}>
                  <a
                    href="https://awards.touchlineltd.co.ke"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex flex-col justify-between p-4 sm:p-4.5 rounded-2xl bg-gradient-to-b from-[#240b15] to-[#12050b] border border-[#801435]/40 hover:border-[#9B2345]/85 transition-all duration-300 shadow-xl overflow-hidden min-h-[240px] sm:min-h-[255px] h-full"
                  >
                    <div className="absolute -top-16 -right-16 w-36 h-36 rounded-full bg-[#9B2345]/15 blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />

                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#fca5a5] bg-[#801435]/20 px-2 py-0.5 rounded border border-[#801435]/30 font-semibold">
                          Div 04 // Trophies &amp; Awards
                        </span>
                        <span className="font-mono text-[9px] text-rose-200/50 group-hover:text-rose-200 transition-colors">
                          awards.touchlineltd.co.ke ↗
                        </span>
                      </div>

                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded bg-[#801435]/30 border border-[#801435]/50 flex items-center justify-center text-[#fca5a5]">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
                              <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                              <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                              <path d="M4 22h16" />
                              <path d="M10 14.66V17c0 .55-.45 1-1 1H7v4h10v-4h-2c-.55 0-1-.45-1-1v-2.34" />
                              <path d="M6 4h12a2 2 0 0 1 2 2v3a6 6 0 0 1-6 6h-4a6 6 0 0 1-6-6V6a2 2 0 0 1 2-2z" />
                            </svg>
                          </div>
                          <span className="font-display font-bold text-xs sm:text-sm tracking-wider uppercase text-white">
                            TOUCH<span className="text-[#fca5a5]">AWARDS</span>
                          </span>
                        </div>
                        <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-[#801435]/30 bg-black/40 shrink-0">
                          <Image
                            src="/images/awards/prismara-crystal-pillar.webp"
                            alt="Touchline Optical Crystal Trophy"
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                      </div>

                      <h3 className="font-display text-sm sm:text-base text-rose-50 mb-1 group-hover:text-[#fca5a5] transition-colors leading-snug">
                        The Awards People Cherish.
                      </h3>

                      <p className="text-[11px] text-rose-100/70 leading-relaxed mb-2 line-clamp-2 italic">
                        &ldquo;Recognition worth remembering. Tuzo zinazostahili kukumbukwa.&rdquo;
                      </p>

                      <div className="flex flex-wrap gap-1 mb-2">
                        {['Optical Crystal', 'Laser Plaques', 'Stocked Blanks'].map((tag) => (
                          <span
                            key={tag}
                            className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-rose-950/40 text-rose-200/80 border border-[#801435]/30"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="relative z-10 pt-2 border-t border-[#801435]/30 flex items-center justify-between">
                      <span className="font-display text-[10px] uppercase tracking-wider text-[#fca5a5] flex items-center gap-1 group-hover:gap-2 transition-all">
                        Explore Awards <span>→</span>
                      </span>
                      <span className="font-mono text-[9px] text-rose-300/60">
                        Bespoke Crafted
                      </span>
                    </div>
                  </a>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. INTERACTIVE MULTI-DIVISION COCKPIT & PHOTOGRAPHIC SHOWCASE ── */}
      <EcosystemInteractiveShowcase />

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

            <div className="lg:col-span-5 grid sm:grid-cols-2 gap-3.5">
              <div className="p-5 rounded-[var(--radius-md)] bg-[var(--bg-soft)] border border-[var(--border)] tilt-card glass-interactive">
                <span className="font-mono text-xs text-[#c8960c] block mb-1.5 font-semibold">01 / MERCHANDISE</span>
                <h4 className="font-display text-lg text-[var(--text)] mb-1.5">Carried &amp; Worn</h4>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  Apparel, staff uniforms, drinkware, and tender kits that put your brand directly in client hands.
                </p>
              </div>

              <div className="p-5 rounded-[var(--radius-md)] bg-[var(--bg-soft)] border border-[var(--border)] tilt-card glass-interactive">
                <span className="font-mono text-xs text-[#0070f3] block mb-1.5 font-semibold">02 / STRUCTURES</span>
                <h4 className="font-display text-lg text-[var(--text)] mb-1.5">Built &amp; Seen</h4>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  3D letters, illuminated pylons, and architectural wayfinding that anchor your physical locations.
                </p>
              </div>

              <div className="p-5 rounded-[var(--radius-md)] bg-[var(--bg-soft)] border border-[var(--border)] tilt-card glass-interactive">
                <span className="font-mono text-xs text-[#9B1B5A] block mb-1.5 font-semibold">03 / CORPORATE GIFTS</span>
                <h4 className="font-display text-lg text-[var(--text)] mb-1.5">Remembered &amp; Valued</h4>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  Curated hampers, VIP executive onboarding kits, and premium lifestyle items via TouchGiftShop.
                </p>
              </div>

              <div className="p-5 rounded-[var(--radius-md)] bg-[var(--bg-soft)] border border-[var(--border)] tilt-card glass-interactive">
                <span className="font-mono text-xs text-[#9B2345] block mb-1.5 font-semibold">04 / RECOGNITION</span>
                <h4 className="font-display text-lg text-[var(--text)] mb-1.5">Honoured &amp; Cherished</h4>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  Custom optical crystal trophies, engraved wooden plaques, and commemorative medals via Touchline Awards.
                </p>
              </div>

              <div className="p-5 rounded-[var(--radius-md)] bg-[var(--bg-soft)] border border-[var(--border)] sm:col-span-2 tilt-card glass-interactive">
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
                      src="/images/branding/branding-hero.webp"
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
                      src="/images/signage/signage-hero.webp"
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

          {/* ── Group Sister Brands: TouchGiftShop & Touchline Awards ──── */}
          <div className="mt-12 pt-10 border-t border-[var(--border)]">
            <Reveal delay={100}>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="font-mono text-xs uppercase tracking-widest text-[var(--accent)] block mb-1">
                    // Group Sister Brands
                  </span>
                  <h3 className="font-display text-xl sm:text-2xl text-[var(--text)]">
                    Specialized Retail &amp; Recognition Platforms
                  </h3>
                </div>
                <span className="hidden sm:inline-block font-mono text-xs text-[var(--text-muted)]">
                  Under Touchline Group
                </span>
              </div>
              <div className="grid md:grid-cols-2 gap-5">
                <a
                  href="https://touchgiftshop.co.ke"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-5 sm:p-6 rounded-[var(--radius-lg)] bg-[var(--surface)] border border-[var(--border)] hover:border-[#9B1B5A]/60 transition-all flex flex-col sm:flex-row items-start gap-4 group shadow-sm hover:shadow-md"
                >
                  <div className="relative w-full sm:w-28 h-28 rounded-xl overflow-hidden bg-black/40 border border-[#9B1B5A]/30 shrink-0">
                    <Image
                      src="/images/giftshop/giftshop-luxury-trio-box.webp"
                      alt="TouchGiftShop Curated Executive Hampers"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[#9B1B5A] bg-[#9B1B5A]/10 px-2 py-0.5 rounded font-semibold border border-[#9B1B5A]/20">
                        Curated Gifting Platform // Superpowers
                      </span>
                      <span className="text-xs text-[var(--text-muted)] group-hover:text-[#9B1B5A] transition-colors">↗</span>
                    </div>
                    <h4 className="font-display text-lg text-[var(--text)] mb-1 group-hover:text-[#9B1B5A] transition-colors">
                      TouchGiftShop · touchgiftshop.co.ke
                    </h4>
                    <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-2">
                      Kenya&apos;s premium gifting engine with signature superpowers: <strong>Pool a Gift™</strong> (collective group contributions for farewells &amp; celebrations), <strong>Build a Hamper</strong> (modular bespoke curation), <strong>WhatsApp Recipient-Choice</strong> delivery confirmation, and <strong>Photo-Proof</strong> sent before dispatch.
                    </p>
                    <div className="flex flex-wrap gap-1.5 mb-2.5">
                      {['Pool a Gift™', 'Build a Hamper', 'Recipient-Choice', 'Photo-Proof Before Dispatch', 'Park Towers, Utalii St.'].map((sp) => (
                        <span key={sp} className="font-mono text-[9px] px-2 py-0.5 rounded bg-[#9B1B5A]/10 text-[#9B1B5A] border border-[#9B1B5A]/25 font-semibold">
                          {sp}
                        </span>
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-1.5 font-mono text-[10px] text-[#9B1B5A] font-semibold">
                      Same-Day Nairobi Delivery (Order by 6 PM) + Physical Store at Park Towers <span>✓</span>
                    </span>
                  </div>
                </a>

                <a
                  href="https://awards.touchlineltd.co.ke"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-5 sm:p-6 rounded-[var(--radius-lg)] bg-[var(--surface)] border border-[var(--border)] hover:border-[#801435]/60 transition-all flex flex-col sm:flex-row items-start gap-4 group shadow-sm hover:shadow-md"
                >
                  <div className="relative w-full sm:w-28 h-28 rounded-xl overflow-hidden bg-black/40 border border-[#801435]/30 shrink-0">
                    <Image
                      src="/images/awards/prismara-crystal-pillar.webp"
                      alt="Touchline Awards Optical Crystal Trophies"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[#9B2345] bg-[#801435]/15 px-2 py-0.5 rounded font-semibold border border-[#801435]/30">
                        Trophies &amp; Recognition // Subdomain
                      </span>
                      <span className="text-xs text-[var(--text-muted)] group-hover:text-[#9B2345] transition-colors">↗</span>
                    </div>
                    <h4 className="font-display text-lg text-[var(--text)] mb-1 group-hover:text-[#9B2345] transition-colors">
                      Touchline Awards Nairobi
                    </h4>
                    <p className="text-xs text-[var(--text-muted)] leading-relaxed italic mb-1.5">
                      &ldquo;Recognition worth remembering. Tuzo zinazostahili kukumbukwa.&rdquo;
                    </p>
                    <p className="text-[11px] text-[var(--text-muted)] leading-relaxed mb-2">
                      Proof before we cut · Stocked blanks ship next working day in Nairobi · Optical crystal, trophies &amp; plaques.
                    </p>
                    <span className="inline-flex items-center gap-1.5 font-mono text-[10px] text-[#9B2345] font-semibold">
                      Direct Hotline: +254 183 172 111 <span>✓</span>
                    </span>
                  </div>
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 4. HOW TOUCHLINE WORKS (Operational Pipeline) ─────────── */}
      <HowItWorks />

      {/* ── 4.5 THE SINGLE-SOURCE PROCUREMENT ADVANTAGE (Enterprise HCI) ─ */}
      <section className="section-py bg-[var(--bg-soft)] border-b border-[var(--border)] relative overflow-hidden">
        <div className="max-w-content mx-auto px-6">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-[var(--accent)] block mb-2 font-semibold">
                  // Enterprise HCI &amp; Procurement Architecture
                </span>
                <h2 className="font-display text-3xl sm:text-5xl text-[var(--text)]">
                  The Single-Source Advantage: 4 Divisions. One Master Partner.
                </h2>
              </div>
              <p className="text-sm text-[var(--text-muted)] max-w-md leading-relaxed">
                Why Kenya&apos;s leading banking, retail, and government procurement directors consolidate their entire physical brand operations under Touchline Group.
              </p>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              {
                num: '01',
                title: 'One Master Agreement',
                subtitle: 'Zero Vendor Fragmentation',
                desc: 'Consolidate staff uniforms, architectural signage, executive hampers, and annual awards under a single verified framework contract.',
                color: '#c8960c',
              },
              {
                num: '02',
                title: 'Exact Color & Material Match',
                subtitle: 'Flawless Brand Integrity',
                desc: 'Your Pantone standards, vector geometry, and finish codes match perfectly across embroidered pique cotton, 3D acrylic signs, and crystal trophies.',
                color: '#0070f3',
              },
              {
                num: '03',
                title: '100% Tax Compliant (KRA ETR)',
                subtitle: 'Statutory Peace of Mind',
                desc: 'Every milestone delivery is backed by KRA ETR electronic tax invoices, certificates of origin, and formal batch inspection certificates.',
                color: '#9B1B5A',
              },
              {
                num: '04',
                title: 'Synchronized 47 Counties',
                subtitle: 'Direct Site & Branch Handover',
                desc: 'Unified logistics network executing staggered branch rollouts from Mombasa to Turkana with digital dispatch sign-offs via TouchDesk.',
                color: '#9B2345',
              },
            ].map((adv) => (
              <div
                key={adv.num}
                className="p-6 rounded-[var(--radius-lg)] bg-[var(--surface)] border border-[var(--border)] hover:border-white/20 transition-all flex flex-col justify-between h-full shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className="font-mono text-xs font-bold tracking-wider"
                      style={{ color: adv.color }}
                    >
                      PILLAR // {adv.num}
                    </span>
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: adv.color }}
                    />
                  </div>
                  <h4 className="font-display text-lg text-[var(--text)] font-semibold mb-1">
                    {adv.title}
                  </h4>
                  <div className="text-[11px] font-mono text-[var(--accent)] font-semibold mb-3">
                    {adv.subtitle}
                  </div>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                    {adv.desc}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-[var(--border)]">
                  <span className="text-[10px] font-mono text-emerald-500 font-semibold flex items-center gap-1">
                    ✓ Verified Enterprise Standard
                  </span>
                </div>
              </div>
            ))}
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
