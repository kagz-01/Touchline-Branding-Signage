import type { BrandConfig } from '@/config/brands';

export function CrossSellBanner({ brand }: { brand: BrandConfig }) {
  const targetHref =
    brand.crossSell.targetBrand === 'signage'
      ? '/signage'
      : '/branding';

  return (
    <section className="max-w-content mx-auto px-6 pb-4">
      <div className="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--bg-soft)] p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h3 className="font-display text-xl mb-2">{brand.crossSell.headline}</h3>
          <p className="text-[var(--text-muted)] max-w-md text-sm">{brand.crossSell.body}</p>
        </div>
        <a
          href={targetHref}
          className="shrink-0 rounded-[var(--radius-sm)] border border-[var(--accent)] text-[var(--accent)] px-5 py-3 font-semibold hover:bg-[var(--accent)] hover:text-[var(--accent-ink)] transition-colors text-center"
        >
          {brand.crossSell.ctaLabel}
        </a>
      </div>
    </section>
  );
}
