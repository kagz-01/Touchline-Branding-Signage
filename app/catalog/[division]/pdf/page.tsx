'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useMemo } from 'react';
import { SIGNAGE_CATALOG_ITEMS, SIGNAGE_CATALOG_CATEGORIES } from '@/config/signage-catalog';
import { BRANDING_CATALOG_ITEMS, BRANDING_CATALOG_CATEGORIES } from '@/config/branding-catalog';
import { AWARDS_CATALOG_ITEMS, AWARDS_CATALOG_CATEGORIES } from '@/config/awards-catalog';

export default function DivisionCatalogPdfPage() {
  const params = useParams();
  const division = (params?.division as string)?.toLowerCase() || 'signage';

  const [activeCategory, setActiveCategory] = useState<string>('all');

  const meta = useMemo(() => {
    switch (division) {
      case 'branding':
        return {
          title: 'Touchline Branding // Corporate Merchandise & Apparel Specification Catalog',
          subtitle: 'Institutional Uniforms, Executive Gift Sets, Drinkware & Conference Merchandise',
          refCode: 'TL-BRA-CAT-2026',
          accentColor: '#c8960c',
          bgHeader: 'bg-[#c8960c]',
          textColor: 'text-[#c8960c]',
          borderColor: 'border-[#c8960c]',
          categories: BRANDING_CATALOG_CATEGORIES,
          items: BRANDING_CATALOG_ITEMS.map((item) => ({
            id: item.id,
            sku: item.sku,
            title: item.title,
            category: item.category,
            categorySlug: item.categorySlug,
            badge: item.category,
            image: item.image,
            specs: item.specs,
            turnaround: item.turnaround,
            priceKes: item.priceKes,
          })),
        };
      case 'awards':
        return {
          title: 'Touchline Awards Nairobi // Recognition & Honors Trophy Catalog',
          subtitle: 'K9 Optical Crystal Towers, Teak Honor Plaques & Milestone Achievement Trophies',
          refCode: 'TL-AWD-CAT-2026',
          accentColor: '#9B2345',
          bgHeader: 'bg-[#9B2345]',
          textColor: 'text-[#9B2345]',
          borderColor: 'border-[#9B2345]',
          categories: AWARDS_CATALOG_CATEGORIES,
          items: AWARDS_CATALOG_ITEMS.map((item) => ({
            id: item.id,
            sku: item.sku,
            title: item.title,
            category: item.category,
            categorySlug: item.categorySlug,
            badge: item.badge,
            image: item.image,
            specs: item.specs,
            turnaround: item.turnaround,
            priceKes: item.priceKes,
          })),
        };
      case 'signage':
      default:
        return {
          title: 'Touchline Signage // Architectural Fabrication & Works Catalog',
          subtitle: '3D Channel Letters, Pylons, Tension Fabric Lightboxes & Wayfinding Systems',
          refCode: 'TL-SIG-CAT-2026',
          accentColor: '#0070f3',
          bgHeader: 'bg-[#0070f3]',
          textColor: 'text-[#0070f3]',
          borderColor: 'border-[#0070f3]',
          categories: SIGNAGE_CATALOG_CATEGORIES,
          items: SIGNAGE_CATALOG_ITEMS.map((item, idx) => ({
            id: item.id,
            sku: item.id,
            title: item.title,
            category: item.category,
            categorySlug: item.categorySlug,
            badge: item.badge,
            image: item.image,
            specs: item.specs,
            turnaround: item.turnaround,
            priceKes: 18000 + (idx * 1500) % 45000,
          })),
        };
    }
  }, [division]);

  const filteredItems = useMemo(() => {
    if (activeCategory === 'all') return meta.items;
    return meta.items.filter((item) => item.categorySlug === activeCategory);
  }, [meta.items, activeCategory]);

  const handlePrint = () => {
    window.print();
  };

  const whatsappQuoteUrl = `https://wa.me/254700000000?text=${encodeURIComponent(
    `Hello Touchline Team, I am reviewing the official ${meta.title} (${meta.refCode}) and would like to request an official custom quote / bulk procurement invoice.`
  )}`;

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans antialiased selection:bg-neutral-200 print:bg-white print:text-black">
      {/* ── TOP ACTION BAR (Hidden when printing) ───────────────── */}
      <div className="print:hidden sticky top-0 z-50 bg-neutral-950 text-white px-4 sm:px-8 py-3 shadow-lg border-b border-neutral-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href={division === 'signage' ? '/signage' : division === 'branding' ? '/branding' : '/portfolio'}
              className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs text-neutral-300 transition-colors"
            >
              ← Back to Platform
            </Link>
            <div className="hidden sm:block text-xs font-mono text-neutral-400">
              Document: <span className="text-white font-semibold">{meta.refCode}</span> · {filteredItems.length} Verified Items
            </div>
          </div>

          {/* Category Filter Pills (Screen view only) */}
          <div className="hidden lg:flex items-center gap-1 overflow-x-auto text-xs py-1">
            {meta.categories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setActiveCategory(cat.slug)}
                className={`px-3 py-1 rounded-full font-mono transition-colors ${
                  activeCategory === cat.slug
                    ? 'bg-white text-black font-semibold'
                    : 'bg-neutral-900 text-neutral-400 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <a
              href={whatsappQuoteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <span>Request Custom RFQ</span>
              <span>↗</span>
            </a>
            <button
              onClick={handlePrint}
              className="px-5 py-2 rounded-lg bg-white text-black hover:bg-neutral-200 text-xs font-bold flex items-center gap-2 transition-colors shadow-md"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                />
              </svg>
              <span>Download / Print PDF</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── PRINT CATALOG BODY ──────────────────────────────────── */}
      <main className="max-w-[1100px] mx-auto px-6 sm:px-12 py-8 print:p-0 print:max-w-none">
        {/* Formal Procurement Cover Banner */}
        <header className="border-b-2 border-neutral-900 pb-6 mb-8 print:mb-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded text-[10px] font-mono font-bold tracking-widest uppercase bg-neutral-900 text-white mb-2">
                Official Kenya Procurement &amp; Works Manual
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950 uppercase">
                {meta.title}
              </h1>
              <p className="text-sm text-neutral-600 mt-1 max-w-2xl">
                {meta.subtitle}
              </p>
            </div>

            <div className="text-left sm:text-right font-mono text-xs text-neutral-600 border-l sm:border-l-0 sm:border-r-0 pl-4 sm:pl-0 border-neutral-300">
              <div className="font-bold text-neutral-950">{meta.refCode}</div>
              <div>Issue Date: November 2026</div>
              <div>KRA ETR Compliant · Certificate of Origin</div>
              <div className="text-[11px] text-neutral-500">Park Towers, Utalii St / Enterprise Rd Workshop, Nairobi</div>
            </div>
          </div>

          {/* Credential Indicators */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-4 border-t border-neutral-200 text-xs font-mono">
            <div>
              <span className="text-neutral-500 block text-[10px] uppercase">Direct Sourcing</span>
              <span className="font-semibold text-neutral-900">100% In-House Nairobi Fabrication</span>
            </div>
            <div>
              <span className="text-neutral-500 block text-[10px] uppercase">Compliance</span>
              <span className="font-semibold text-neutral-900">DOSH / KenHA / County Approved</span>
            </div>
            <div>
              <span className="text-neutral-500 block text-[10px] uppercase">Catalog Volume</span>
              <span className="font-semibold text-neutral-900">{meta.items.length} Production Standards</span>
            </div>
            <div>
              <span className="text-neutral-500 block text-[10px] uppercase">Fulfillment</span>
              <span className="font-semibold text-neutral-900">47 Counties &amp; East Africa</span>
            </div>
          </div>
        </header>

        {/* Catalog Items Grid */}
        <section>
          <div className="flex items-center justify-between mb-6 pb-2 border-b border-neutral-300">
            <h2 className="text-base font-bold uppercase tracking-wider text-neutral-900 font-mono">
              // Product &amp; Installation Index ({filteredItems.length} Items Listed)
            </h2>
            <span className="text-xs text-neutral-500 font-mono">
              * Indicative baseline rates · Volume discounts apply on orders above 50 units
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 print:grid-cols-2 gap-6 print:gap-5">
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                className="border border-neutral-300 rounded-lg p-3.5 flex flex-col justify-between bg-white break-inside-avoid shadow-xs print:shadow-none print:border-neutral-400"
              >
                <div>
                  {/* Photo Plate */}
                  <div className="relative aspect-[4/3] w-full bg-neutral-100 rounded overflow-hidden mb-3 border border-neutral-200">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 600px) 100vw, 400px"
                      priority={index < 6}
                    />
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase bg-neutral-900/90 text-white backdrop-blur-xs">
                      {item.badge}
                    </div>
                  </div>

                  {/* SKU & Title */}
                  <div className="flex items-baseline justify-between gap-2 mb-1">
                    <span className="text-[10px] font-mono font-bold text-neutral-500 tracking-wider">
                      {item.sku}
                    </span>
                    <span className="text-[10px] font-mono text-neutral-500">
                      Lead: {item.turnaround}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-neutral-950 leading-snug mb-2 line-clamp-2">
                    {item.title}
                  </h3>

                  {/* Spec bullets */}
                  <ul className="space-y-1 mb-3 text-[11px] text-neutral-600 font-mono">
                    {item.specs.slice(0, 3).map((spec, sIdx) => (
                      <li key={sIdx} className="flex items-start gap-1.5 line-clamp-1">
                        <span className="text-neutral-400 font-bold shrink-0">▪</span>
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Pricing & Order Footnote */}
                <div className="pt-2.5 border-t border-neutral-200 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[9px] text-neutral-500 font-mono block uppercase">Indicative Base</span>
                    <span className="font-bold font-mono text-neutral-950">
                      KES {item.priceKes.toLocaleString()}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded border border-neutral-200">
                    ETR Tax Ready
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Formal Document Sign-off Footer */}
        <footer className="mt-12 pt-6 border-t-2 border-neutral-900 text-xs font-mono text-neutral-600 flex flex-col sm:flex-row items-center justify-between gap-4 print:mt-8">
          <div>
            <div className="font-bold text-neutral-900">TOUCHLINE GROUP LIMITED · NAIROBI KENYA</div>
            <div>Branding · Signage · Awards · Corporate Gifting</div>
          </div>
          <div className="text-left sm:text-right text-[11px]">
            <div>Tenders &amp; Inquiries: info@touchlineltd.co.ke | +254 700 000 000</div>
            <div>Official Quotations Valid for 30 Days from Issue</div>
          </div>
        </footer>
      </main>
    </div>
  );
}
