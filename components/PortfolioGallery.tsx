import React from 'react';
import type { BrandConfig } from '@/config/brands';
import type { PortfolioItem } from '@/config/brands';
import { Reveal } from './Reveal';
import { BeforeAfterSlider } from './BeforeAfterSlider';
import { CrossSellBanner } from './CrossSellBanner';

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
    <section className="section-py border-t border-[var(--border)] bg-[var(--bg)]">
      <div className="max-w-content mx-auto px-6">
        <Reveal>
          <div className="flex items-end justify-between mb-12 pb-4 border-b border-[var(--border)]">
            <div>
              <p className="font-mono text-xs text-[var(--accent)] uppercase tracking-[0.2em] mb-2">
                // Field data
              </p>
              <h2 className="font-display text-3xl md:text-4xl uppercase tracking-wider text-[var(--text)]">
                Project Log
              </h2>
            </div>
            {!limit && (
              <span className="font-mono text-xs text-[var(--text-muted)] hidden md:block">
                {portfolioItems.length} projects
              </span>
            )}
          </div>
        </Reveal>

        <div className="flex flex-col gap-6">
          <div className="grid md:grid-cols-12 gap-6">
            {visibleItems.map((item, i) => {
              const imageUrl = item.image_webp_url || item.image_url || null;
              const beforeUrl = item.image_before_url || null;
              const isWide = i % 3 === 0;
              const spanClass = isWide ? 'md:col-span-8' : 'md:col-span-4';
              const initials = item.title.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();
              const showInterruption = !limit && i === 1;

              return (
                <React.Fragment key={item.title}>
                  <div className={`${spanClass} flex flex-col`}>
                    <Reveal delay={(i % 3) * 100} className="flex-1 h-full">
                      <div className="card-surface group p-2 h-full flex flex-col overflow-hidden">
                        <div className="relative h-64 md:h-80 w-full overflow-hidden bg-[var(--bg-soft)] border border-[var(--border)] group-hover:border-[var(--accent)]/30 transition-colors duration-500 rounded-[var(--radius-sm)]">
                          {imageUrl ? (
                            <BeforeAfterSlider
                              afterImage={imageUrl}
                              beforeImage={beforeUrl || undefined}
                              alt={item.alt || item.title}
                            />
                          ) : (
                            <div className="h-full w-full flex items-center justify-center">
                              <span className="font-display text-6xl md:text-8xl text-[var(--border)] opacity-20 select-none">
                                {initials}
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="p-5 flex-1 flex flex-col">
                          <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--accent)] mb-2 block">
                            {item.category}
                          </span>
                          <h3 className="font-display text-lg mb-2 group-hover:text-[var(--accent)] transition-colors duration-300 text-[var(--text)]">
                            {item.title}
                          </h3>
                          <p className="text-[var(--text-muted)] text-sm flex-1 mb-6 leading-relaxed">{item.blurb}</p>

                          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[var(--border)]">
                            {item.volume && (
                              <div className="flex flex-col">
                                <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase">Volume</span>
                                <span className="font-mono text-xs text-[var(--text)]">{item.volume}</span>
                              </div>
                            )}
                            {item.deadline && (
                              <div className="flex flex-col">
                                <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase">Timeline</span>
                                <span className="font-mono text-xs text-[var(--text)]">{item.deadline}</span>
                              </div>
                            )}
                            {item.materials && (
                              <div className="flex flex-col">
                                <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase">Materials</span>
                                <span className="font-mono text-xs text-[var(--text)] line-clamp-2">{item.materials}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </Reveal>
                  </div>

                  {showInterruption && (
                    <div className="col-span-12 my-4">
                      <Reveal>
                        <CrossSellBanner brand={brand} />
                      </Reveal>
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
