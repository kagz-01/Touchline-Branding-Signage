import Link from 'next/link';
import { Logo } from './Logo';

const BRANDS_DATA = [
  {
    id: 'branding' as const,
    label: 'Touchline Branding',
    kicker: 'Promotional products & merchandise',
    desc: 'Apparel, bags, drinkware, promo items — sourced, branded and delivered. From single orders to tender-scale rollouts.',
    href: '/branding',
    stats: '500+ items sourced',
  },
  {
    id: 'signage' as const,
    label: 'Touchline Signage',
    kicker: 'Signage, fabrication & LED',
    desc: 'Signboards, vehicle wraps, wayfinding, LED installations — designed, fabricated and installed across Kenya.',
    href: '/signage',
    stats: '200+ sites installed',
  },
];

export function HubHome() {
  return (
    <div className="relative">
      {/* Hero */}
      <section className="relative section-py-lg overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-[var(--accent)]/5 blur-[120px]" />
          <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] rounded-full bg-[var(--accent2)]/5 blur-[100px]" />
        </div>

        <div className="relative z-10 max-w-content mx-auto px-6 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--accent)] mb-6">
            One company. Two specialisms.
          </p>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.95] mb-8 text-[var(--text)]">
            Your Brand,
            <br />
            Built <span className="accent-word">Visible.</span>
          </h1>
          <p className="text-lg md:text-xl text-[var(--text-muted)] max-w-2xl mx-auto mb-12 leading-relaxed">
            We are the physical layer of your brand. From merchandise that travels with people, to signage that stands in place — Touchline makes sure your name is seen, worn, and remembered.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/branding" className="btn-primary">
              Explore Branding <span>→</span>
            </Link>
            <Link href="/signage" className="btn-secondary">
              Explore Signage <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <div className="max-w-content mx-auto px-6">
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 py-8 border-y border-[var(--border)]">
          {[
            { value: '500+', label: 'Projects delivered across Kenya' },
            { value: '98%', label: 'On-time delivery rate' },
            { value: '10K+', label: 'Items sourced and branded' },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-3">
              <span className="font-display text-2xl md:text-3xl text-[var(--accent)]">
                {item.value}
              </span>
              <span className="text-sm text-[var(--text-muted)] max-w-[140px] leading-tight">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* The Problem */}
      <section className="section-py bg-[var(--bg)]">
        <div className="max-w-content mx-auto px-6">
          <div className="max-w-3xl">
            <span className="font-mono text-xs text-[var(--accent)] uppercase tracking-[0.2em] mb-6 block">
              // The challenge
            </span>
            <h2 className="font-display text-3xl md:text-5xl leading-tight mb-6 text-[var(--text)]">
              Most brands have a logo.
              <br />
              Few have a <span className="accent-word">presence.</span>
            </h2>
            <p className="text-lg text-[var(--text-muted)] leading-relaxed max-w-2xl">
              Your brand lives in pitch decks and Instagram grids. But the real world runs on t-shirts that get worn, mugs that get used, signs that get seen every morning. That&apos;s where we come in.
            </p>
          </div>
        </div>
      </section>

      {/* Two Doors */}
      <section className="section-py bg-[var(--bg-soft)]">
        <div className="max-w-content mx-auto px-6">
          <div className="text-center mb-16">
            <span className="font-mono text-xs text-[var(--accent)] uppercase tracking-[0.2em] mb-4 block">
              // Choose your path
            </span>
            <h2 className="font-display text-3xl md:text-4xl text-[var(--text)]">
              Two specialisms. One partner.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {BRANDS_DATA.map((b) => (
              <Link
                key={b.id}
                href={b.href}
                className="card-theme group p-10 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                  <Logo brand={b.id} className="text-7xl" />
                </div>

                <div className="relative z-10">
                  <Logo brand={b.id} className="text-2xl mb-4" />

                  <p className="font-mono text-xs text-[var(--accent)] uppercase tracking-widest mb-3">
                    {b.kicker}
                  </p>

                  <p className="text-[var(--text-muted)] mb-8 leading-relaxed">
                    {b.desc}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 font-display text-sm uppercase tracking-wide text-[var(--accent)] group-hover:gap-3 transition-all duration-300">
                      Enter {b.id} <span>→</span>
                    </span>
                    <span className="font-mono text-xs text-[var(--text-muted)]">
                      {b.stats}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Teaser */}
      <section className="section-py bg-[var(--bg)]">
        <div className="max-w-content mx-auto px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="font-mono text-xs text-[var(--accent)] uppercase tracking-[0.2em] mb-3 block">
                // Recent work
              </span>
              <h2 className="font-display text-3xl md:text-4xl text-[var(--text)]">
                Projects we&apos;ve shipped
              </h2>
            </div>
            <Link href="/portfolio" className="btn-ghost hidden md:inline-flex">
              View all <span>→</span>
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { brand: 'branding' as const, title: 'County Government Tender', category: 'Tender fulfilment', stat: '4,000 units' },
              { brand: 'signage' as const, title: 'Retail Fascia Rollout', category: 'Multi-site', stat: '9 sites' },
              { brand: 'branding' as const, title: 'Conference Delegate Kits', category: 'Bags & drinkware', stat: '500 kits' },
              { brand: 'signage' as const, title: 'Fleet Vehicle Wrap', category: 'Vehicle branding', stat: '14 vehicles' },
            ].map((item, i) => (
              <div key={i} className="card-surface p-6 group">
                <div className="w-full h-32 bg-[var(--bg-soft)] rounded-[var(--radius-sm)] mb-4 flex items-center justify-center border border-[var(--border)] group-hover:border-[var(--accent)]/30 transition-colors">
                  <Logo brand={item.brand} className="text-sm opacity-30 group-hover:opacity-60 transition-opacity" />
                </div>
                <p className="font-mono text-[10px] text-[var(--accent)] uppercase tracking-widest mb-1">
                  {item.category}
                </p>
                <h3 className="font-display text-lg text-[var(--text)] mb-2">
                  {item.title}
                </h3>
                <p className="font-mono text-xs text-[var(--text-muted)]">
                  {item.stat}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link href="/portfolio" className="btn-ghost">
              View all projects <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="section-py bg-[var(--bg-soft)]">
        <div className="max-w-content mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <span className="font-mono text-xs text-[var(--accent)] uppercase tracking-[0.2em] mb-8 block">
              // What clients say
            </span>
            <blockquote className="font-editorial italic text-2xl md:text-3xl text-[var(--text)] leading-relaxed mb-8">
              &ldquo;They handled everything from sourcing to delivery ahead of a tight tender deadline. We never had to chase a single vendor ourselves.&rdquo;
            </blockquote>
            <div className="flex items-center justify-center gap-3">
              <div className="w-8 h-px bg-[var(--accent)]" />
              <div className="text-left">
                <p className="text-sm font-semibold text-[var(--text)]">James Mwangi</p>
                <p className="text-xs text-[var(--text-muted)]">Procurement Lead, County Government</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-py bg-[var(--bg)] border-t border-[var(--border)]">
        <div className="max-w-content mx-auto px-6 text-center">
          <h2 className="font-display text-4xl md:text-5xl text-[var(--text)] mb-6">
            Ready to make your brand <span className="accent-word">physical?</span>
          </h2>
          <p className="text-lg text-[var(--text-muted)] max-w-xl mx-auto mb-10">
            Tell us what you need. We&apos;ll handle the sourcing, the branding, and the delivery — so you can focus on running your business.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/book" className="btn-primary">
              Get a Quote <span>→</span>
            </Link>
            <a href="tel:+254700000000" className="btn-secondary">
              Call Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
