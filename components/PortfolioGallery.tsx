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
    <section className="max-w-content mx-auto px-6 py-24 border-t border-[var(--border)]">
      <Reveal>
        <div className="flex items-end justify-between mb-16 pb-4 border-b border-[var(--border)]">
          <h2 className="font-display text-4xl md:text-5xl uppercase tracking-wider">PROJECT LOG</h2>
          <span className="font-mono text-xs text-[var(--accent)] hidden md:block">02 // FIELD DATA</span>
        </div>
      </Reveal>
      
      <div className="flex flex-col gap-8">
        <div className="grid md:grid-cols-12 gap-8">
          {visibleItems.map((item, i) => {
            const imageUrl = item.image_webp_url || item.image_url || null;
            const beforeUrl = item.image_before_url || null;
            
            const isWide = i % 3 === 0;
            const spanClass = isWide ? 'md:col-span-8' : 'md:col-span-4';
            const initials = item.title.split(' ').map(w => w[0]).slice(0,2).join('').toUpperCase();

            // Interruption injection (after the second item) on full page only
            const showInterruption = !limit && i === 1;

            return (
              <React.Fragment key={item.title}>
                <div className={`${spanClass} flex flex-col`}>
                  <Reveal delay={(i % 3) * 100} className="flex-1 h-full">
                    <div className="card-theme group p-2 h-full flex flex-col overflow-hidden relative">
                      <div className="relative h-72 md:h-96 w-full overflow-hidden bg-[var(--bg)] border border-[var(--border)] group-hover:border-[var(--accent)] transition-colors duration-500">
                        {imageUrl ? (
                          <BeforeAfterSlider 
                            afterImage={imageUrl} 
                            beforeImage={beforeUrl || undefined} 
                            alt={item.alt || item.title} 
                          />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center relative overflow-hidden group-hover:bg-[var(--accent)]/5 transition-colors duration-500">
                            <span className="absolute -right-4 -bottom-8 font-display text-[12rem] md:text-[16rem] leading-none text-[var(--border)] opacity-30 select-none group-hover:text-[var(--accent)] group-hover:opacity-10 transition-colors duration-500">
                              {initials}
                            </span>
                            <div className="relative z-10 font-mono text-xs text-[var(--text-muted)] uppercase tracking-[0.2em] group-hover:text-[var(--accent)] transition-colors duration-300 flex items-center gap-2">
                              <span className="w-4 h-px bg-current"></span>
                              AWAITING VISUAL DATA
                              <span className="w-4 h-px bg-current"></span>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="p-6 flex-1 flex flex-col relative z-10 bg-[var(--surface)]">
                        <span className="font-mono text-xs uppercase tracking-widest text-[var(--accent)] mb-4 block">
                          // {item.category}
                        </span>
                        <h3 className="font-display text-2xl mb-4 group-hover:text-[var(--accent)] transition-colors duration-300">
                          {item.title}
                        </h3>
                        <p className="text-theme-body text-sm flex-1 mb-8">{item.blurb}</p>
                        
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4 border-t border-[var(--border)]">
                          {item.volume && (
                            <div className="flex flex-col">
                              <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase">Volume</span>
                              <span className="font-mono text-sm text-[var(--text)]">{item.volume}</span>
                            </div>
                          )}
                          {item.deadline && (
                            <div className="flex flex-col">
                              <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase">Timeline</span>
                              <span className="font-mono text-sm text-[var(--text)]">{item.deadline}</span>
                            </div>
                          )}
                          {item.materials && (
                            <div className="flex flex-col col-span-2 md:col-span-1">
                              <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase">Materials</span>
                              <span className="font-mono text-sm text-[var(--text)] line-clamp-2">{item.materials}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </Reveal>
                </div>
                
                {showInterruption && (
                  <div className="col-span-12 -mx-6 md:mx-0 my-8">
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
    </section>
  );
}
