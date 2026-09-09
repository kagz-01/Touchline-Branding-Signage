'use client';

import type { BrandConfig } from '@/config/brands';
import { getCrossBrandUrl } from '@/lib/brand';
import { Logo } from './Logo';

export function CrossSellBanner({ brand }: { brand: BrandConfig }) {
  const targetBrand = brand.crossSell.targetBrand as 'branding' | 'signage';
  const targetHref = getCrossBrandUrl(targetBrand, typeof window !== 'undefined' ? window.location.host : '');

  return (
    <section className="w-full border-y border-[var(--border)] overflow-hidden bg-[var(--surface)] group hover:bg-[var(--accent)] transition-colors duration-700">
      <a href={targetHref} className="block relative py-12 md:py-16 max-w-content mx-auto px-6">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <Logo brand={targetBrand} className="text-2xl text-[var(--accent)] group-hover:text-[var(--bg)] transition-colors duration-700 hidden md:block" />
            <div className="max-w-2xl">
              <span className="font-mono text-xs uppercase tracking-widest text-[var(--accent)] group-hover:text-[var(--bg)] transition-colors duration-700 block mb-3">
                // Also from Touchline
              </span>
              <h3 className="font-display text-2xl md:text-3xl uppercase tracking-wide group-hover:text-[var(--bg)] transition-colors duration-700 mb-2">
                {brand.crossSell.headline}
              </h3>
              <p className="text-[var(--text-muted)] group-hover:text-[var(--bg)]/80 transition-colors duration-700">
                {brand.crossSell.body}
              </p>
            </div>
          </div>
          <div className="shrink-0 flex items-center gap-2 font-display text-sm uppercase tracking-wide text-[var(--accent)] group-hover:text-[var(--bg)] transition-colors duration-700">
            {brand.crossSell.ctaLabel} <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
          </div>
        </div>
      </a>
    </section>
  );
}
