import Link from 'next/link';
import { Logo } from './Logo';

const DOORS = [
  {
    id: 'branding',
    label: 'Touchline Branding',
    desc: 'Branded merchandise, apparel & promo products — sourced, branded and delivered.',
    href: '/branding',
    accent: '#e5ff00'
  },
  {
    id: 'signage',
    label: 'Touchline Signage',
    desc: 'Signboards, LED, vehicle wraps & fabrication — designed, built and installed.',
    href: '/signage',
    accent: '#33e1ed'
  }
];

export function HubHome() {
  return (
    <div className="relative min-h-screen overflow-hidden flex flex-col justify-between">
      {/* Layer 0: Ambient Canvas */}
      <div className="absolute inset-0 z-[-1] pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[var(--accent)]/10 rounded-full blur-[120px] animate-pulse-soft"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-[var(--accent2)]/10 rounded-full blur-[150px] animate-pulse-soft" style={{ animationDelay: '2s' }}></div>
      </div>

      <section className="flex-1 w-full max-w-content mx-auto px-6 py-24 flex flex-col md:flex-row items-end justify-between gap-12">
        
        {/* Massive Typographic Tension */}
        <div className="md:w-3/4 pb-12">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--accent)] mb-8 font-mono">
            // One company, two specialisms
          </p>
          <h1 className="font-display text-giant leading-[0.85] tracking-tight mb-8">
            BE SEEN, WORN <br />
            <span className="text-transparent" style={{ WebkitTextStroke: '2px var(--text)' }}>& REMEMBERED</span>
          </h1>
          <p className="text-theme-body text-xl max-w-lg">
            We are the physical layer of your brand. From premium promotional merchandise to fabricated structural signage.
          </p>
        </div>

        {/* Asymmetrical Selection Cards */}
        <div className="md:w-1/4 flex flex-col gap-6 self-end z-10 w-full">
          {DOORS.map((door) => (
            <a
              key={door.id}
              href={door.href}
              className="card-theme group block p-8 cursor-pointer relative overflow-hidden"
              style={{ ['--accent' as string]: door.accent }}
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                <Logo brand={door.id as 'branding' | 'signage'} className="text-6xl" />
              </div>
              <Logo brand={door.id as 'branding' | 'signage'} className="text-3xl mb-6 relative z-10" />
              <p className="text-theme-body text-sm mb-8 leading-relaxed relative z-10">{door.desc}</p>
              <span
                className="inline-flex items-center gap-2 font-display tracking-wide uppercase text-sm group-hover:gap-4 transition-all duration-300 relative z-10"
                style={{ color: door.accent }}
              >
                Enter {door.id} <span className="text-lg">&rarr;</span>
              </span>
            </a>
          ))}
        </div>
      </section>

      <section className="w-full border-t border-[var(--border)] bg-[var(--surface)] backdrop-blur-xl z-20 relative">
        <div className="max-w-content mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-display text-xl tracking-wider mb-1 text-[var(--text)]">TouchGiftShop</h3>
            <p className="text-theme-body text-sm">
              Looking to send a corporate or personal gift? We source, brand, and deliver.
            </p>
          </div>
          <a
            href="https://giftshop.touchline.co.ke"
            className="shrink-0 rounded-none border border-[var(--text-muted)] px-8 py-4 font-mono text-sm uppercase tracking-widest hover:bg-[var(--text)] hover:text-black transition-colors duration-300"
          >
            Visit Shop
          </a>
        </div>
      </section>
    </div>
  );
}
