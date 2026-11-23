'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export interface CatalogProduct {
  id: string;
  sku?: string;
  title: string;
  category: string;
  categorySlug: string;
  badge?: string;
  description?: string;
  priceKes?: number;
  image: string;
  specs: string[];
  applications?: string;
  turnaround: string;
}

interface CategoryFilter {
  slug: string;
  label: string;
}

interface DivisionProductCatalogProps {
  division: 'signage' | 'branding';
  title: string;
  subtitle: string;
  description: string;
  categories: CategoryFilter[];
  products: CatalogProduct[];
  catalogPdfTitle: string;
  catalogPdfSize: string;
}

export function DivisionProductCatalog({
  division,
  title,
  subtitle,
  description,
  categories,
  products,
  catalogPdfTitle,
  catalogPdfSize,
}: DivisionProductCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalProduct, setActiveModalProduct] = useState<CatalogProduct | null>(null);

  const isSignage = division === 'signage';
  const accentColor = isSignage ? '#0070f3' : '#c8960c';
  const accentBadgeBg = isSignage ? 'bg-[#0070f3]/10 text-[#38bdf8] border-[#0070f3]/25' : 'bg-[#c8960c]/10 text-[#d4a820] border-[#c8960c]/25';

  // Filter products by category and search query
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory = selectedCategory === 'all' || p.categorySlug === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        (p.sku && p.sku.toLowerCase().includes(q)) ||
        p.category.toLowerCase().includes(q) ||
        (p.description && p.description.toLowerCase().includes(q)) ||
        p.specs.some((s) => s.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  // Counts per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: products.length };
    products.forEach((p) => {
      counts[p.categorySlug] = (counts[p.categorySlug] || 0) + 1;
    });
    return counts;
  }, [products]);

  return (
    <section className="section-py border-t border-[var(--border)] bg-[var(--bg)]" id="catalog-showcase">
      <div className="max-w-content mx-auto px-4 sm:px-6">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-[var(--border)]">
          <div>
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest mb-3 border ${accentBadgeBg}`}>
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
              <span>{subtitle}</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl uppercase tracking-wider text-[var(--text)]">
              {title}
            </h2>
            <p className="text-sm sm:text-base text-[var(--text-muted)] max-w-2xl mt-2 leading-relaxed">
              {description}
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="flex items-center gap-6 text-right shrink-0">
            <div>
              <span className="font-display text-2xl sm:text-3xl font-bold block" style={{ color: accentColor }}>
                {products.length}
              </span>
              <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-wider">
                Catalog Pieces
              </span>
            </div>
            <div className="w-px h-8 bg-[var(--border)]" />
            <div>
              <span className="font-display text-2xl sm:text-3xl font-bold text-[var(--text)] block">
                {categories.length - 1}
              </span>
              <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-wider">
                Work Categories
              </span>
            </div>
          </div>
        </div>

        {/* ── Procurement Catalog PDF Download Card ────────────────── */}
        <div className="mb-10 p-5 sm:p-6 rounded-2xl bg-[var(--bg-soft)] border border-[var(--border)] relative overflow-hidden group shadow-sm hover:shadow-md transition-all">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 relative z-10">
            <div className="flex items-start sm:items-center gap-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border" style={{ backgroundColor: `${accentColor}15`, borderColor: `${accentColor}30`, color: accentColor }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-display text-base sm:text-lg text-[var(--text)] font-semibold">
                    {catalogPdfTitle}
                  </h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--bg)] border border-[var(--border)] text-[var(--text-muted)]">
                    {catalogPdfSize}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-0.5 max-w-2xl leading-relaxed">
                  Download the complete specification manual with technical blueprints, material tolerances, KRA ETR compliance, and milestone pricing tables.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                href={`/catalog/${division}/pdf`}
                target="_blank"
                className="btn-primary px-5 py-2.5 text-xs sm:text-sm font-semibold rounded-xl flex items-center gap-2 shadow-md"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                <span>Download Full Catalog PDF</span>
              </Link>
              <a
                href={`https://wa.me/254722668696?text=Hi%20Touchline%2C%20please%20send%20me%20the%20official%20${encodeURIComponent(catalogPdfTitle)}%20(PDF)%20for%20our%20procurement%20team.`}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium bg-[var(--bg)] text-[var(--text)] border border-[var(--border)] hover:border-[var(--text-muted)] transition-all flex items-center gap-1.5"
              >
                <span>Request via WhatsApp</span>
                <span>↗</span>
              </a>
              <Link
                href="/book"
                className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium bg-[var(--bg-soft)] text-[var(--text-muted)] hover:text-[var(--text)] border border-[var(--border)] hover:border-[var(--text-muted)] transition-all"
              >
                Custom Tender Spec
              </Link>
            </div>
          </div>
        </div>

        {/* ── Interactive Category Filter Bar & Live Search ─────────── */}
        <div className="space-y-4 mb-8">
          {/* Search Input */}
          <div className="relative max-w-md">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by SKU, product name, material..."
              className="w-full px-4 py-2.5 pl-10 rounded-xl text-xs sm:text-sm bg-[var(--bg-soft)] border border-[var(--border)] text-[var(--text)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition-all"
            />
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 absolute left-3.5 top-3.5 text-[var(--text-muted)] pointer-events-none">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-3 text-xs text-[var(--text-muted)] hover:text-[var(--text)]"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => {
              const count = categoryCounts[cat.slug] || 0;
              const isSelected = selectedCategory === cat.slug;

              return (
                <button
                  key={cat.slug}
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all flex items-center gap-2 shrink-0 ${
                    isSelected
                      ? 'text-white font-semibold shadow-md'
                      : 'bg-[var(--bg-soft)] text-[var(--text-muted)] hover:text-[var(--text)] border border-[var(--border)]'
                  }`}
                  style={isSelected ? { backgroundColor: accentColor } : {}}
                >
                  <span>{cat.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-black/25 text-white' : 'bg-[var(--bg)] text-[var(--text-muted)]'}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="text-xs font-mono text-[var(--text-muted)] pt-1">
            Displaying <strong className="text-[var(--text)]">{filteredProducts.length}</strong> verified items in catalog
          </div>
        </div>

        {/* ── Product Grid ─────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredProducts.map((p) => (
            <div
              key={p.id}
              className="card-surface rounded-2xl border border-[var(--border)] overflow-hidden flex flex-col justify-between group hover:border-[var(--text-muted)] transition-all duration-300 shadow-sm hover:shadow-lg"
            >
              <div>
                {/* Photo Stage */}
                <div
                  className="relative aspect-[4/3] w-full overflow-hidden bg-black/40 cursor-pointer"
                  onClick={() => setActiveModalProduct(p)}
                >
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                    <span className="text-[10px] font-mono text-white bg-black/75 px-2 py-1 rounded backdrop-blur-md">
                      Click for Technical Spec 🔍
                    </span>
                  </div>

                  {/* Top Badge */}
                  <div className="absolute top-2.5 left-2.5 z-10">
                    <span className="text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-black/75 backdrop-blur-md text-white border border-white/15">
                      {p.category}
                    </span>
                  </div>

                  {p.turnaround && (
                    <div className="absolute top-2.5 right-2.5 z-10">
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-black/75 backdrop-blur-md text-neutral-300 border border-white/15">
                        ⏱ {p.turnaround}
                      </span>
                    </div>
                  )}
                </div>

                {/* Content Block */}
                <div className="p-4 sm:p-5">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    {p.sku && (
                      <span className="font-mono text-[10px] text-[var(--accent)] font-semibold">
                        SKU: {p.sku}
                      </span>
                    )}
                    {p.badge && (
                      <span className="font-mono text-[9px] text-[var(--text-muted)]">
                        {p.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="font-display text-base text-[var(--text)] font-semibold mb-2 group-hover:text-[var(--accent)] transition-colors line-clamp-1">
                    {p.title}
                  </h3>

                  {p.description && (
                    <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-3 line-clamp-2">
                      {p.description}
                    </p>
                  )}

                  {/* Specs List */}
                  <div className="space-y-1 mb-3">
                    {p.specs.slice(0, 3).map((s, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-[11px] text-[var(--text-muted)]">
                        <span className="w-1 h-1 rounded-full bg-[var(--accent)] shrink-0" />
                        <span className="truncate">{s}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Actions Bar */}
              <div className="p-4 pt-0 sm:p-5 sm:pt-0">
                <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between gap-2">
                  {p.priceKes && p.priceKes > 0 ? (
                    <div>
                      <span className="text-[9px] font-mono text-[var(--text-muted)] uppercase block">Indicative Unit</span>
                      <span className="font-display font-bold text-sm text-[var(--text)]">
                        KES {p.priceKes.toLocaleString()}
                      </span>
                    </div>
                  ) : (
                    <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase">
                      Custom Production
                    </span>
                  )}

                  <a
                    href={`https://wa.me/254722668696?text=Hi%20Touchline%2C%20I%20am%20inquiring%20about%20${encodeURIComponent(p.title)}%20(SKU:%20${encodeURIComponent(p.sku || p.id)})`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-lg text-xs font-medium border border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all flex items-center gap-1 shrink-0"
                  >
                    <span>Instant Quote</span>
                    <span>→</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty Search State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16 p-8 rounded-2xl bg-[var(--bg-soft)] border border-[var(--border)] max-w-lg mx-auto">
            <p className="text-sm text-[var(--text)] font-semibold mb-1">No products found matching your search.</p>
            <p className="text-xs text-[var(--text-muted)] mb-4">Try clearing filters or search by material or SKU code.</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="btn-secondary text-xs px-4 py-2"
            >
              Reset All Filters
            </button>
          </div>
        )}

        {/* ── Technical Modal Lightbox ─────────────────────────────── */}
        {activeModalProduct && (
          <div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 select-none animate-fadeIn"
            onClick={() => setActiveModalProduct(null)}
          >
            <div
              className="relative w-full max-w-3xl rounded-3xl bg-[var(--surface)] border border-[var(--border)] overflow-hidden shadow-2xl flex flex-col md:flex-row"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveModalProduct(null)}
                className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition-colors"
                aria-label="Close modal"
              >
                ✕
              </button>

              {/* Modal Image */}
              <div className="relative w-full md:w-1/2 aspect-square md:aspect-auto bg-black shrink-0">
                <Image
                  src={activeModalProduct.image}
                  alt={activeModalProduct.title}
                  fill
                  className="object-cover object-center"
                />
                <div className="absolute top-3 left-3">
                  <span className="text-[10px] font-mono px-2 py-1 rounded bg-black/80 text-white border border-white/15">
                    {activeModalProduct.category}
                  </span>
                </div>
              </div>

              {/* Modal Technical Details */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    {activeModalProduct.sku && (
                      <span className="font-mono text-xs text-[var(--accent)] font-semibold">
                        SKU: {activeModalProduct.sku}
                      </span>
                    )}
                    <span className="font-mono text-xs text-[var(--text-muted)]">
                      · {activeModalProduct.turnaround} Turnaround
                    </span>
                  </div>

                  <h3 className="font-display text-xl sm:text-2xl text-[var(--text)] font-semibold mb-2">
                    {activeModalProduct.title}
                  </h3>

                  {activeModalProduct.description && (
                    <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed mb-4">
                      {activeModalProduct.description}
                    </p>
                  )}

                  {/* Specifications Grid */}
                  <div className="p-4 rounded-xl bg-[var(--bg-soft)] border border-[var(--border)] space-y-2 mb-4">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)] block font-semibold">
                      Engineering &amp; Production Specs:
                    </span>
                    {activeModalProduct.specs.map((s, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-[var(--text)]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] shrink-0" />
                        <span>{s}</span>
                      </div>
                    ))}
                    {activeModalProduct.applications && (
                      <div className="pt-2 border-t border-[var(--border)] text-xs text-[var(--text-muted)]">
                        <strong className="text-[var(--text)] font-mono text-[11px]">Recommended Applications:</strong> {activeModalProduct.applications}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  {activeModalProduct.priceKes && activeModalProduct.priceKes > 0 && (
                    <div className="mb-3">
                      <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase block">Indicative Unit Price</span>
                      <span className="font-display font-bold text-xl text-[var(--text)]">
                        KES {activeModalProduct.priceKes.toLocaleString()} <span className="text-xs font-normal text-[var(--text-muted)]">/ unit</span>
                      </span>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2">
                    <a
                      href={`https://wa.me/254722668696?text=Hi%20Touchline%2C%20I%20would%20like%20a%20quote%20for%20${encodeURIComponent(activeModalProduct.title)}%20(SKU:%20${encodeURIComponent(activeModalProduct.sku || activeModalProduct.id)})`}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-primary flex-1 justify-center py-2.5 text-xs sm:text-sm font-semibold rounded-xl text-center"
                    >
                      Instant WhatsApp Quote <span>→</span>
                    </a>
                    <Link
                      href="/book"
                      className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium bg-[var(--bg)] text-[var(--text)] border border-[var(--border)] hover:border-[var(--text-muted)] transition-all"
                    >
                      Book Site Survey / Sample
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
