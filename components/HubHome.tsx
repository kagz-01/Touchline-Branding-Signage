'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Logo } from './Logo';
import { Reveal } from './Reveal';
import { HowItWorks } from './HowItWorks';

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

const BRANDS_DATA = [
  {
    id: 'branding' as const,
    label: 'Touchline Branding',
    kicker: 'The merchandise people carry',
    desc: 'Apparel, bags, drinkware, promo items — sourced, branded and delivered. From single orders to tender-scale rollouts.',
    services: ['Screen Printing & Embroidery', 'Promotional Products', 'Tender-Scale Sourcing'],
    href: '/branding',
    stat: '500+ items sourced',
  },
  {
    id: 'signage' as const,
    label: 'Touchline Signage',
    kicker: 'The signs people see',
    desc: 'Signboards, vehicle wraps, wayfinding, LED installations — designed, fabricated and installed across Kenya.',
    services: ['Illuminated & LED Signs', 'Vehicle Wraps & Graphics', 'Monument & Wayfinding'],
    href: '/signage',
    stat: '200+ sites installed',
  },
];

const TRUST_STATS = [
  { value: 500, suffix: '+', label: 'Projects delivered across Kenya' },
  { value: 98, suffix: '%', label: 'On-time delivery rate' },
  { value: 10, suffix: 'K+', label: 'Items sourced and branded' },
];

const TESTIMONIALS = [
  {
    quote: 'They handled everything from sourcing to delivery ahead of a tight tender deadline. We never had to chase a single vendor ourselves.',
    name: 'James Mwangi',
    role: 'Procurement Lead, County Government',
    brand: 'branding' as const,
  },
  {
    quote: 'The fascia signs across all our branches finally look like one company. Installation was tidy and on schedule at every site.',
    name: 'Peter Odhiambo',
    role: 'Facilities Manager, Retail Chain',
    brand: 'signage' as const,
  },
  {
    quote: 'Consistent quality across every reorder, which matters when your staff wear the brand every single day.',
    name: 'Amina Hassan',
    role: 'Operations Manager, Logistics Company',
    brand: 'branding' as const,
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
/* HubHome                                                             */
/* ------------------------------------------------------------------ */

export function HubHome() {
  return (
    <div className="relative">
      {/* ── 1. HERO ──────────────────────────────────────────────── */}
      <section className="relative section-py-lg overflow-hidden grad-hero-subtle">
        {/* Subtle gradient accent — purposeful, not decorative */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[var(--accent)] opacity-[0.03] blur-[150px]" />
        </div>

        <div className="relative z-10 max-w-content mx-auto px-6 text-center">
          <Reveal>
            <p className="grad-kicker mb-6">
              One company. Two specialisms.
            </p>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.95] mb-8 text-[var(--text)]">
              Your Brand,
              <br />
              Built <span className="grad-text">Visible.</span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="text-lg md:text-xl text-[var(--text-muted)] max-w-2xl mx-auto mb-10 leading-relaxed">
              From merchandise that travels with people, to signage that stands in place — Touchline
              makes sure your name is seen, worn, and remembered.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
              <a href="#what-we-offer" className="btn-grad glow-accent">
                See What We Do <span>→</span>
              </a>
              <Link href="/book" className="btn-secondary glass-subtle">
                Get a Quote
              </Link>
            </div>
          </Reveal>

          {/* Trust signal — right in the hero (Authority bias) */}
          <Reveal delay={320}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--border)] bg-[var(--surface)]/50 text-sm text-[var(--text-muted)]">
              <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse-soft" />
              500+ projects delivered across Kenya
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 2. PROBLEM ───────────────────────────────────────────── */}
      <section className="section-py bg-[var(--bg)]">
        <div className="max-w-content mx-auto px-6">
          <div className="max-w-3xl">
            <Reveal>
              <span className="grad-kicker mb-6 block">
                // The challenge
              </span>
              <h2 className="font-display text-3xl md:text-5xl leading-tight mb-6 text-[var(--text)]">
                Most brands have a logo.
                <br />
                Few have a <span className="grad-text">presence.</span>
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="text-lg text-[var(--text-muted)] leading-relaxed max-w-2xl">
                Your brand lives in pitch decks and Instagram grids. But the real world runs on
                t-shirts that get worn, mugs that get used, signs that get seen every morning.
                That&apos;s where we come in.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 3. WHAT WE OFFER ─────────────────────────────────────── */}
      <section id="what-we-offer" className="section-py bg-[var(--bg-soft)] scroll-section">
        <div className="max-w-content mx-auto px-6">
          <Reveal>
            <div className="text-center mb-16">
              <span className="grad-kicker mb-4 block">
                // What we do
              </span>
              <h2 className="font-display text-3xl md:text-4xl text-[var(--text)]">
                Two ways we bring your brand to life
              </h2>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-8">
            {BRANDS_DATA.map((b, i) => (
              <Reveal key={b.id} delay={i * 120}>
                <a
                  href={b.href}
                  className="card-theme group p-10 relative overflow-hidden block rounded-[var(--radius-lg)] h-full"
                >
                  {/* Brand accent stripe */}
                  <div
                    className="absolute top-0 left-0 w-1 h-full transition-all duration-500 group-hover:w-2"
                    style={{
                      background: b.id === 'branding' ? 'var(--accent)' : 'var(--accent)',
                    }}
                  />

                  {/* Watermark logo */}
                  <div className="absolute top-0 right-0 p-6 opacity-[0.04] group-hover:opacity-[0.08] transition-opacity duration-500">
                    <Logo brand={b.id} className="text-7xl" />
                  </div>

                  <div className="relative z-10 pl-4">
                    <Logo brand={b.id} className="text-2xl mb-4" />

                    <p className="font-mono text-xs text-[var(--accent)] uppercase tracking-widest mb-3">
                      {b.kicker}
                    </p>

                    <p className="text-[var(--text-muted)] mb-8 leading-relaxed">
                      {b.desc}
                    </p>

                    {/* Service examples */}
                    <ul className="space-y-2 mb-8">
                      {b.services.map((s) => (
                        <li key={s} className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                          <span className="w-1 h-1 rounded-full bg-[var(--accent)]" />
                          {s}
                        </li>
                      ))}
                    </ul>

                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-2 font-display text-sm uppercase tracking-wide text-[var(--accent)] group-hover:gap-3 transition-all duration-300">
                        Explore {b.id} <span>→</span>
                      </span>
                      <span className="font-mono text-xs text-[var(--text-muted)]">
                        {b.stat}
                      </span>
                    </div>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. HOW IT WORKS ──────────────────────────────────────── */}
      <HowItWorks />

      {/* ── 5. PROOF ─────────────────────────────────────────────── */}
      <section className="section-py bg-[var(--bg)]">
        <div className="max-w-content mx-auto px-6">
          {/* Animated counters */}
          <Reveal>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 mb-20 py-8 border-y border-[var(--border)] grad-section-alt">
              {TRUST_STATS.map((item, i) => (
                <div key={item.label} className="flex items-center gap-3">
                  <span className="font-display text-2xl md:text-3xl text-[var(--accent)]">
                    <AnimatedCounter target={item.value} suffix={item.suffix} />
                  </span>
                  <span className="text-sm text-[var(--text-muted)] max-w-[140px] leading-tight">
                    {item.label}
                  </span>
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
                Trusted across industries
              </h2>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t.name} delay={i * 100}>
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

      {/* ── 6. CTA ───────────────────────────────────────────────── */}
      <section className="section-py bg-[var(--bg-soft)] border-t border-[var(--border)]">
        <div className="max-w-content mx-auto px-6 text-center">
          <Reveal>
            <h2 className="font-display text-4xl md:text-5xl text-[var(--text)] mb-6">
              Ready to make your brand <span className="grad-text">physical?</span>
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="text-lg text-[var(--text-muted)] max-w-xl mx-auto mb-10">
              Tell us what you need. We&apos;ll handle the sourcing, the branding, and the
              delivery — so you can focus on running your business.
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
