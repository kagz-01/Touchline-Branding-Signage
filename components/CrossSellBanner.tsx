import type { BrandConfig } from '@/config/brands';

export function CrossSellBanner({ brand }: { brand: BrandConfig }) {
  const targetHref =
    brand.crossSell.targetBrand === 'signage'
      ? '/signage'
      : '/branding';

  return (
    <section className="w-full border-y border-[var(--border)] overflow-hidden bg-[var(--surface)] group hover:bg-[var(--accent)] transition-colors duration-700">
      <a href={targetHref} className="block relative py-12 md:py-20 max-w-content mx-auto px-6">
        <div className="absolute inset-0 bg-[var(--accent)]/5 group-hover:bg-transparent transition-colors duration-700 pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-3xl">
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--accent)] group-hover:text-[var(--bg)] transition-colors duration-700 block mb-6">
              // CROSS-DOMAIN DEPLOYMENT
            </span>
            <h3 className="font-display text-4xl md:text-7xl uppercase tracking-wide group-hover:text-[var(--bg)] transition-colors duration-700 mb-4">
              {brand.crossSell.headline}
            </h3>
            <p className="text-xl text-[var(--text-muted)] group-hover:text-[var(--bg)]/80 transition-colors duration-700 max-w-xl">
              {brand.crossSell.body}
            </p>
          </div>
          <div className="shrink-0 flex items-center justify-center w-16 h-16 md:w-24 md:h-24 border border-[var(--border)] group-hover:border-[var(--bg)] rounded-full text-[var(--text-muted)] group-hover:text-[var(--bg)] group-hover:bg-[var(--bg)]/10 transition-all duration-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 md:h-12 md:w-12 group-hover:translate-x-2 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </div>
      </a>
    </section>
  );
}
