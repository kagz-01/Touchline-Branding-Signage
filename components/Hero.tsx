import Link from 'next/link';
import type { BrandConfig } from '@/config/brands';

export function Hero({ brand }: { brand: BrandConfig }) {
  const isBranding = brand.id === 'branding';

  // Split headline so we can italicize the last/key word
  const words = brand.heroHeadline.split(' ');
  const keyWord = words[words.length - 1];
  const leadWords = words.slice(0, -1).join(' ');

  return (
    <section className="relative bg-[var(--bg)] border-b border-[var(--border)] overflow-hidden">
      {/* Subtle warm background accent */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 right-0 w-[40vw] h-[40vw] rounded-full bg-[var(--accent)]/5 blur-[80px]" />
        <div className="absolute bottom-0 left-0 w-[30vw] h-[30vw] rounded-full bg-[var(--accent2)]/5 blur-[60px]" />
      </div>

      <div className="relative z-10 max-w-content mx-auto px-6 py-20 md:py-28 grid md:grid-cols-12 gap-12 items-center">
        {/* Left column */}
        <div className="md:col-span-7">
          <p className="text-sm font-medium text-[var(--accent)] mb-5 flex items-center gap-3 uppercase tracking-widest">
            <span className="w-6 h-px bg-[var(--accent)]" />
            {brand.heroKicker}
          </p>

          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[1.05] mb-6 text-[var(--text)]">
            {leadWords}{' '}
            <span className="accent-word">{keyWord}</span>
          </h1>

          <p className="text-[var(--text-muted)] text-lg md:text-xl max-w-lg mb-10 leading-relaxed">
            {brand.heroSub}
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/book"
              className="inline-flex items-center gap-3 bg-[var(--accent)] text-[var(--accent-ink)] px-7 py-4 font-semibold text-sm tracking-wide hover:opacity-90 transition-opacity rounded-[var(--radius-sm)]"
            >
              Request a Quote
              <span>→</span>
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-3 border border-[var(--border)] text-[var(--text)] px-7 py-4 font-medium text-sm tracking-wide hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors rounded-[var(--radius-sm)]"
            >
              See Our Work
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-[var(--text-muted)] text-sm font-medium hover:text-[var(--accent)] transition-colors py-4"
            >
              Our Services <span>→</span>
            </Link>
          </div>
        </div>

        {/* Right visual column */}
        <div className="md:col-span-5 flex items-center justify-center relative min-h-[320px]">
          {isBranding ? (
            <div className="relative w-full max-w-[320px] grid grid-cols-2 gap-4">
              {[
                { label: 'Apparel', sub: 'Tees, Polos, Hoodies', rot: '-2deg' },
                { label: 'Bags', sub: 'Totes, Laptops, Events', rot: '1.5deg' },
                { label: 'Drinkware', sub: 'Mugs, Flasks', rot: '-1deg' },
                { label: 'Headwear', sub: 'Caps & Visors', rot: '2deg' },
              ].map((item) => (
                <div
                  key={item.label}
                  style={{ '--rot': item.rot } as React.CSSProperties}
                  className="stamp-tag card-editorial p-5 text-center"
                >
                  <p className="font-display text-lg text-[var(--text)]">{item.label}</p>
                  <p className="text-xs text-[var(--text-muted)] mt-1">{item.sub}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="relative w-full max-w-[340px]">
              <div className="card-editorial p-8 rotate-1 hover:rotate-0 transition-transform duration-500">
                <p className="font-mono text-xs text-[var(--accent)] uppercase tracking-widest mb-4">// FABRICATION SPEC</p>
                <div className="space-y-3">
                  {['Aluminium Composite Panel', 'LED Channel Letters', 'Cast Vinyl Wraps', 'Acrylic 3D Lettering'].map((m) => (
                    <div key={m} className="flex items-center gap-3 text-sm text-[var(--text)]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] flex-shrink-0" />
                      {m}
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-4 border-t border-[var(--border)] font-mono text-xs text-[var(--text-muted)]">
                  SITE VISIT → FABRICATION → INSTALL
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

