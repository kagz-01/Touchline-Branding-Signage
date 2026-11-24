'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export interface EcosystemSlideItem {
  id: string;
  title: string;
  division: 'branding' | 'signage' | 'awards';
  category: string;
  badge: string;
  image: string;
  tagline: string;
  href: string;
}

const DEFAULT_SLIDES: EcosystemSlideItem[] = [
  {
    id: 'SLIDE-SIG-01',
    title: '3D Precision Channel Letters & Fascias',
    division: 'signage',
    category: 'Architectural Signage',
    badge: 'Signage Division',
    image: 'https://mtjaguidxnyyeznsdhgr.supabase.co/storage/v1/object/public/catalog/signage/catalog/3d-01.webp',
    tagline: 'IP67 Sealed Illumination · 5-Year Structural Warranty',
    href: '/signage',
  },
  {
    id: 'SLIDE-BRA-01',
    title: 'Executive Pique Polos & Corporate Uniforms',
    division: 'branding',
    category: 'Apparel & Uniforms',
    badge: 'Branding Division',
    image: 'https://mtjaguidxnyyeznsdhgr.supabase.co/storage/v1/object/public/catalog/branding/catalog/set-001.webp',
    tagline: '240 GSM Combed Cotton · Tajima 12-Needle Precision',
    href: '/branding',
  },
  {
    id: 'SLIDE-AWD-01',
    title: 'K9 Optical Crystal Towers & Honor Plaques',
    division: 'awards',
    category: 'Trophies & Honors',
    badge: 'Awards Division',
    image: 'https://mtjaguidxnyyeznsdhgr.supabase.co/storage/v1/object/public/catalog/awards/catalog/awd-004.webp',
    tagline: 'Precision 3D Sub-Surface Laser Engraving · Nairobi Plant',
    href: 'https://awards.touchlineltd.co.ke',
  },
  {
    id: 'SLIDE-SIG-02',
    title: 'Commercial Highway Pylons & Illuminated Totems',
    division: 'signage',
    category: 'Pylons & Totems',
    badge: 'Signage Division',
    image: 'https://mtjaguidxnyyeznsdhgr.supabase.co/storage/v1/object/public/catalog/signage/catalog/pylon-signs-01.webp',
    tagline: 'Engineered Wind-Load Calculation · Nationwide Rigging',
    href: '/signage',
  },
  {
    id: 'SLIDE-BRA-02',
    title: 'Curated Executive VIP Gift Sets & Drinkware',
    division: 'branding',
    category: 'Executive Gift Sets',
    badge: 'TouchGifts & Merch',
    image: 'https://mtjaguidxnyyeznsdhgr.supabase.co/storage/v1/object/public/catalog/branding/catalog/set-002.webp',
    tagline: 'Custom Keepsake Boxes · Laser Annealed Drinkware',
    href: 'https://touchgiftshop.co.ke',
  },
  {
    id: 'SLIDE-AWD-02',
    title: 'Solid African Teak & Beveled Glass Plaques',
    division: 'awards',
    category: 'Recognition Plaques',
    badge: 'Awards Division',
    image: 'https://mtjaguidxnyyeznsdhgr.supabase.co/storage/v1/object/public/catalog/awards/catalog/awd-027.webp',
    tagline: 'Sustainably Harvested Hardwood · Mirror Gold Inlay',
    href: 'https://awards.touchlineltd.co.ke',
  },
];

export function EcosystemHeroSlideshow() {
  const [slides, setSlides] = useState<EcosystemSlideItem[]>(DEFAULT_SLIDES);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Fetch dynamic items from Supabase / API to blend live catalog data
  useEffect(() => {
    let isMounted = true;
    async function loadDynamicCatalog() {
      try {
        const [resBranding, resSignage, resAwards] = await Promise.all([
          fetch('/api/catalog?division=branding').then((r) => (r.ok ? r.json() : null)),
          fetch('/api/catalog?division=signage').then((r) => (r.ok ? r.json() : null)),
          fetch('/api/catalog?division=awards').then((r) => (r.ok ? r.json() : null)),
        ]);

        const dynamicList: EcosystemSlideItem[] = [];

        if (resSignage?.items?.length) {
          const it = resSignage.items[0];
          dynamicList.push({
            id: it.id,
            title: it.title,
            division: 'signage',
            category: it.category,
            badge: 'Signage Division',
            image: it.image,
            tagline: it.specs?.[0] || 'Architectural Precision Fabrication',
            href: '/portfolio?brand=signage',
          });
        }

        if (resBranding?.items?.length) {
          const it = resBranding.items[0];
          dynamicList.push({
            id: it.id,
            title: it.title,
            division: 'branding',
            category: it.category,
            badge: 'Branding Division',
            image: it.image,
            tagline: it.specs?.[0] || 'Commercial Apparel & Merch',
            href: '/portfolio?brand=branding',
          });
        }

        if (resAwards?.items?.length) {
          const it = resAwards.items[0];
          dynamicList.push({
            id: it.id,
            title: it.title,
            division: 'awards',
            category: it.category,
            badge: 'Awards Division',
            image: it.image,
            tagline: it.specs?.[0] || 'Optical Crystal & Bespoke Trophies',
            href: 'https://awards.touchlineltd.co.ke',
          });
        }

        if (resSignage?.items?.length > 1) {
          const it = resSignage.items[3] || resSignage.items[1];
          dynamicList.push({
            id: it.id,
            title: it.title,
            division: 'signage',
            category: it.category,
            badge: 'Signage Division',
            image: it.image,
            tagline: it.specs?.[0] || 'Illuminated Pylons & Fascias',
            href: '/portfolio?brand=signage',
          });
        }

        if (resBranding?.items?.length > 1) {
          const it = resBranding.items[1];
          dynamicList.push({
            id: it.id,
            title: it.title,
            division: 'branding',
            category: it.category,
            badge: 'TouchGifts & Sets',
            image: it.image,
            tagline: it.specs?.[0] || 'Executive Curated Collections',
            href: 'https://touchgiftshop.co.ke',
          });
        }

        if (isMounted && dynamicList.length >= 3) {
          setSlides(dynamicList);
        }
      } catch (err) {
        // Keeps DEFAULT_SLIDES on network error
      }
    }

    loadDynamicCatalog();
    return () => {
      isMounted = false;
    };
  }, []);

  // Automatic slide rotation
  useEffect(() => {
    if (isPaused || slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isPaused, slides.length]);

  const current = slides[currentIdx];

  const getDivisionTheme = (div: string) => {
    switch (div) {
      case 'branding':
        return {
          pillBg: 'bg-[#c8960c]/20 border-[#c8960c]/40 text-[#d4a820]',
          accentDot: 'bg-[#c8960c]',
          textColor: 'text-[#d4a820]',
        };
      case 'signage':
        return {
          pillBg: 'bg-[#0070f3]/20 border-[#0070f3]/40 text-[#38bdf8]',
          accentDot: 'bg-[#0070f3]',
          textColor: 'text-[#38bdf8]',
        };
      case 'awards':
      default:
        return {
          pillBg: 'bg-[#9B2345]/20 border-[#9B2345]/40 text-rose-300',
          accentDot: 'bg-[#9B2345]',
          textColor: 'text-rose-300',
        };
    }
  };

  const theme = getDivisionTheme(current.division);

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative aspect-[16/10] sm:aspect-[16/9.5] w-full rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-neutral-950/80 backdrop-blur-sm group select-none"
    >
      {/* Background Slides with Cross-Fade */}
      {slides.map((slide, idx) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            idx === currentIdx ? 'opacity-100 z-0' : 'opacity-0 pointer-events-none'
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            sizes="(max-width: 768px) 100vw, 600px"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-1000"
            priority={idx === 0}
          />
        </div>
      ))}

      {/* Cinematic Dark Gradient Scrim */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/30 pointer-events-none z-10" />

      {/* Top Bar: Division Badge & Step Dots */}
      <div className="absolute top-3.5 left-3.5 right-3.5 z-20 flex items-center justify-between">
        <div
          className={`backdrop-blur-md border font-mono text-[9px] sm:text-[10px] tracking-wider uppercase px-2.5 sm:px-3 py-1 rounded-full flex items-center gap-2 shadow-lg transition-colors duration-300 ${theme.pillBg}`}
        >
          <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${theme.accentDot}`} />
          <span>{current.badge}</span>
        </div>

        {/* Slide navigation indicators */}
        <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2 py-1 rounded-full border border-white/15">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIdx(idx)}
              className={`transition-all duration-300 rounded-full ${
                idx === currentIdx ? 'w-5 h-1.5 bg-white' : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Bottom Floating Info Glass Card with Interactive Link */}
      <div className="absolute bottom-3 left-3 right-3 z-20">
        <Link
          href={current.href}
          className="block backdrop-blur-md bg-black/80 hover:bg-black/90 border border-white/15 hover:border-white/30 rounded-xl p-3 sm:p-3.5 transition-all shadow-xl group/link"
        >
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <span className={`font-mono text-[8px] sm:text-[9px] uppercase tracking-wider font-semibold block mb-0.5 ${theme.textColor}`}>
                {current.category}
              </span>
              <h4 className="font-display text-xs sm:text-sm text-white font-semibold line-clamp-1 group-hover/link:text-[var(--accent)] transition-colors">
                {current.title}
              </h4>
              <p className="text-[10px] sm:text-[11px] text-neutral-300 line-clamp-1 mt-0.5">
                {current.tagline}
              </p>
            </div>

            <div className="shrink-0 flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white/10 group-hover/link:bg-[var(--accent)] group-hover/link:text-[var(--accent-ink)] border border-white/15 text-white font-mono text-[9px] sm:text-[10px] font-semibold transition-all">
              <span>Explore</span>
              <span className="text-[8px]">→</span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
