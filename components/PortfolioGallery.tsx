import type { BrandConfig } from '@/config/brands';

import type { PortfolioItem } from '@/config/brands';

export type PortfolioGalleryItem = PortfolioItem;

export function PortfolioGallery({
  brand,
  limit,
  items,
}: {
  brand: BrandConfig;
  limit?: number;
  items?: PortfolioGalleryItem[];
}) {
  const portfolioItems = items && items.length > 0 ? items : brand.portfolio;
  const visibleItems = limit ? portfolioItems.slice(0, limit) : portfolioItems;

  return (
    <section className="max-w-content mx-auto px-6 py-16">
      <h2 className="font-display text-2xl md:text-3xl mb-8">Recent work</h2>
      <div className="grid sm:grid-cols-2 gap-6">
        {visibleItems.map((item) => {
          const imageUrl = item.image_webp_url || item.image_url || null;

          return (
            <div
              key={item.title}
              className="rounded-[var(--radius-md)] border border-[var(--border)] overflow-hidden"
            >
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={item.alt || item.title}
                  className="h-40 w-full object-cover border-b border-[var(--border)]"
                />
              ) : (
                <div className="h-40 bg-[var(--surface)] flex items-center justify-center border-b border-[var(--border)]">
                  <span className="font-mono text-xs text-[var(--text-muted)] uppercase tracking-wide">
                    Project photo
                  </span>
                </div>
              )}
              <div className="p-5">
                <span className="text-xs uppercase tracking-wide text-[var(--accent)]">{item.category}</span>
                <h3 className="font-display text-lg mt-1 mb-2">{item.title}</h3>
                <p className="text-sm text-[var(--text-muted)]">{item.blurb}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
