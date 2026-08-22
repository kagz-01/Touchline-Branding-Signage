import Link from 'next/link';
import type { BrandConfig } from '@/config/brands';

const STAMP_ITEMS = [
  { label: 'TOTE BAGS', rot: -8 },
  { label: 'CAPS', rot: 6 },
  { label: 'MUGS', rot: -4 },
  { label: 'TEES', rot: 12 }
];

export function Hero({ brand }: { brand: BrandConfig }) {
  const isBranding = brand.id === 'branding';

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden border-b border-[var(--border)]">
      {/* Massive Background Typography Layer */}
      <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none opacity-5 overflow-hidden">
        <h1 className="font-display text-[25vw] leading-none text-center select-none whitespace-nowrap">
          {brand.id.toUpperCase()}
        </h1>
      </div>

      <div className="relative z-10 w-full max-w-content mx-auto px-6 py-24 grid md:grid-cols-12 gap-12 items-center">
        
        {/* Left/Content (7 columns) */}
        <div className="md:col-span-7 relative z-20">
          <p className="font-mono text-sm uppercase tracking-[0.2em] text-[var(--accent)] mb-6 flex items-center gap-4">
            <span className="w-8 h-px bg-[var(--accent)]"></span>
            {brand.heroKicker}
          </p>
          <h1
            className={`font-display text-5xl md:text-7xl leading-[0.95] mb-8 ${
              brand.id === 'signage' ? 'led-text text-[var(--accent)]' : 'text-[var(--text)]'
            }`}
          >
            {brand.heroHeadline.split(' ').map((word, i) => (
              <span key={i} className="block">{word}</span>
            ))}
          </h1>
          <p className="text-theme-body text-xl max-w-lg mb-12 border-l-2 border-[var(--border)] pl-6 py-2">
            {brand.heroSub}
          </p>
          
          <div className="flex flex-wrap gap-6 font-mono text-sm uppercase tracking-wider">
            <Link
              href="/book"
              className="card-theme group px-8 py-4 relative overflow-hidden inline-block"
            >
              <span className="relative z-10 group-hover:text-[var(--bg)] transition-colors duration-300 font-bold">
                Initiate Project
              </span>
              <div className="absolute inset-0 bg-[var(--accent)] transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out z-0"></div>
            </Link>
            <Link
              href="/portfolio"
              className="px-8 py-4 border border-[var(--border)] hover:border-[var(--text)] hover:text-[var(--text)] transition-colors duration-300 flex items-center gap-3 group"
            >
              View Archives
              <span className="group-hover:translate-x-2 transition-transform">&rarr;</span>
            </Link>
          </div>
        </div>

        {/* Right/Visual Layer (5 columns) */}
        <div className="md:col-span-5 relative h-full min-h-[400px] flex items-center justify-center z-10">
          
          {/* Ambient Glow */}
          <div className="absolute inset-0 bg-[var(--accent)]/10 blur-[100px] rounded-full animate-pulse-soft z-0 pointer-events-none"></div>

          {isBranding ? (
            <div className="relative z-10 flex flex-col gap-4 w-full max-w-[280px]">
              {STAMP_ITEMS.map((item, i) => (
                <div
                  key={item.label}
                  style={{ ['--rot' as string]: `${item.rot}deg` }}
                  className="stamp-tag card-theme relative p-6 text-center font-display text-2xl tracking-widest text-[var(--text)] overflow-hidden"
                >
                  <div className="absolute inset-0 bg-[var(--accent)]/5 opacity-0 hover:opacity-100 transition-opacity"></div>
                  {item.label}
                </div>
              ))}
            </div>
          ) : (
            <div className="relative z-10 card-theme p-8 w-full max-w-[340px] transform rotate-2 hover:rotate-0 transition-transform duration-700">
              <svg viewBox="0 0 320 200" className="w-full h-auto drop-shadow-2xl" aria-hidden="true">
                {/* Tech Grid Background */}
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="var(--border)" strokeWidth="0.5" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#grid)" />
                
                {/* Main Frame */}
                <rect x="4" y="4" width="312" height="192" rx="0" fill="transparent" stroke="var(--accent)" strokeWidth="2" />
                
                {/* Crosshairs */}
                <path d="M 160 10 L 160 30 M 160 170 L 160 190 M 10 100 L 30 100 M 290 100 L 310 100" stroke="var(--border)" strokeWidth="1" />
                
                <text
                  x="160"
                  y="110"
                  textAnchor="middle"
                  className="led-text"
                  style={{ fontFamily: 'var(--font-display)', fontSize: '48px', fill: 'var(--accent)', letterSpacing: '0.1em' }}
                >
                  FABRICATE
                </text>
                <text
                  x="160"
                  y="160"
                  textAnchor="middle"
                  style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', fill: 'var(--text-muted)', letterSpacing: '0.2em' }}
                >
                  ACRYLIC // LED // METAL
                </text>
              </svg>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
