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
    href: '/signage',
  },
  {
    id: 'SLIDE-BRA-01',
    title: 'Executive Pique Polos & Corporate Uniforms',
    division: 'branding',
    category: 'Apparel & Uniforms',
    badge: 'Branding Division',
    image: 'https://mtjaguidxnyyeznsdhgr.supabase.co/storage/v1/object/public/catalog/branding/catalog/set-001.webp',
    href: '/branding',
  },
  {
    id: 'SLIDE-AWD-01',
    title: 'K9 Optical Crystal Towers & Honor Plaques',
    division: 'awards',
    category: 'Trophies & Honors',
    badge: 'TouchAwards',
    image: 'https://mtjaguidxnyyeznsdhgr.supabase.co/storage/v1/object/public/catalog/awards/catalog/awd-004.webp',
    href: 'https://awards.touchlineltd.co.ke',
  },
  {
    id: 'SLIDE-SIG-02',
    title: 'Commercial Highway Pylons & Illuminated Totems',
    division: 'signage',
    category: 'Pylons & Totems',
    badge: 'Signage Division',
    image: 'https://mtjaguidxnyyeznsdhgr.supabase.co/storage/v1/object/public/catalog/signage/catalog/pylon-signs-01.webp',
    href: '/signage',
  },
  {
    id: 'SLIDE-BRA-02',
    title: 'Curated Executive VIP Gift Sets & Drinkware',
    division: 'branding',
    category: 'Executive Gift Sets',
    badge: 'TouchGifts & Merch',
    image: 'https://mtjaguidxnyyeznsdhgr.supabase.co/storage/v1/object/public/catalog/branding/catalog/set-002.webp',
    href: 'https://touchgiftshop.co.ke',
  },
  {
    id: 'SLIDE-AWD-02',
    title: 'Solid African Teak & Beveled Glass Plaques',
    division: 'awards',
    category: 'Recognition Plaques',
    badge: 'TouchAwards',
    image: 'https://mtjaguidxnyyeznsdhgr.supabase.co/storage/v1/object/public/catalog/awards/catalog/awd-027.webp',
    href: 'https://awards.touchlineltd.co.ke',
  },
];

export function EcosystemHeroSlideshow() {
  const [slides, setSlides] = useState<EcosystemSlideItem[]>(DEFAULT_SLIDES);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Fetch dynamic items directly from database across all divisions
  useEffect(() => {
    let isMounted = true;
    async function loadDynamicCatalog() {
      try {
        const [resBranding, resSignage, resAwards] = await Promise.all([
          fetch('/api/catalog?division=branding').then((r) => (r.ok ? r.json() : null)),
          fetch('/api/catalog?division=signage').then((r) => (r.ok ? r.json() : null)),
          fetch('/api/catalog?division=awards').then((r) => (r.ok ? r.json() : null)),
        ]);

        const signageItems: any[] = resSignage?.items || [];
        const brandingItems: any[] = resBranding?.items || [];
        const awardsItems: any[] = resAwards?.items || [];

        const dynamicList: EcosystemSlideItem[] = [];
        const maxLen = Math.max(signageItems.length, brandingItems.length, awardsItems.length);

        for (let i = 0; i < maxLen; i++) {
          // 1. Signage division item
          if (signageItems[i]?.image) {
            dynamicList.push({
              id: signageItems[i].id,
              title: signageItems[i].title,
              division: 'signage',
              category: signageItems[i].category || 'Architectural Signage',
              badge: 'Signage Division',
              image: signageItems[i].image,
              href: '/signage',
            });
          }

          // 2. Branding & Merch / TouchGifts item
          if (brandingItems[i]?.image) {
            const isGift =
              brandingItems[i].category?.toLowerCase().includes('gift') ||
              brandingItems[i].title?.toLowerCase().includes('gift') ||
              brandingItems[i].category?.toLowerCase().includes('set');

            dynamicList.push({
              id: brandingItems[i].id,
              title: brandingItems[i].title,
              division: 'branding',
              category: brandingItems[i].category || 'Apparel & Uniforms',
              badge: isGift ? 'TouchGifts & Merch' : 'Branding Division',
              image: brandingItems[i].image,
              href: isGift ? 'https://touchgiftshop.co.ke' : '/branding',
            });
          }

          // 3. Awards division item wired to awards.touchlineltd.co.ke
          if (awardsItems[i]?.image) {
            dynamicList.push({
              id: awardsItems[i].id,
              title: awardsItems[i].title,
              division: 'awards',
              category: awardsItems[i].category || 'Trophies & Honors',
              badge: 'TouchAwards',
              image: awardsItems[i].image,
              href: 'https://awards.touchlineltd.co.ke',
            });
          }
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
    }, 4200);
    return () => clearInterval(timer);
  }, [isPaused, slides.length]);

  const current = slides[currentIdx] || slides[0];

  const getDivisionTheme = (div: string) => {
    switch (div) {
      case 'branding':
        return {
          pillBg: 'bg-[#c8960c]/25 border-[#c8960c]/50 text-[#f5c344]',
          accentDot: 'bg-[#c8960c]',
          textColor: 'text-[#f5c344]',
          buttonTone: 'hover:bg-[#c8960c] hover:text-black hover:border-[#c8960c]',
        };
      case 'signage':
        return {
          pillBg: 'bg-[#0070f3]/25 border-[#0070f3]/50 text-[#38bdf8]',
          accentDot: 'bg-[#0070f3]',
          textColor: 'text-[#38bdf8]',
          buttonTone: 'hover:bg-[#0070f3] hover:text-white hover:border-[#0070f3]',
        };
      case 'awards':
      default:
        return {
          pillBg: 'bg-[#9B2345]/30 border-[#9B2345]/50 text-rose-300',
          accentDot: 'bg-[#9B2345]',
          textColor: 'text-rose-300',
          buttonTone: 'hover:bg-[#9B2345] hover:text-white hover:border-[#9B2345]',
        };
    }
  };

  const theme = getDivisionTheme(current.division);
  const isExternal = current.href.startsWith('http');

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIdx((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIdx((prev) => (prev + 1) % slides.length);
  };

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative aspect-[16/10] sm:aspect-[16/9.5] w-full rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-neutral-950/80 backdrop-blur-sm group select-none"
    >
      {/* Background Slides with Cross-Fade */}
      {slides.map((slide, idx) => (
        <div
          key={`${slide.id}-${idx}`}
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
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/35 pointer-events-none z-10" />

      {/* Top Bar: Division Badge & Sleek Dynamic Counter Controls */}
      <div className="absolute top-3.5 left-3.5 right-3.5 z-20 flex items-center justify-between">
        <div
          className={`backdrop-blur-md border font-mono text-[9px] sm:text-[10px] tracking-wider uppercase px-2.5 sm:px-3 py-1 rounded-full flex items-center gap-2 shadow-lg transition-colors duration-300 ${theme.pillBg}`}
        >
          <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${theme.accentDot}`} />
          <span>{current.badge}</span>
        </div>

        {/* Dynamic Slide Counter + Arrow Controls */}
        <div className="flex items-center gap-1.5 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20 text-white shadow-lg">
          <button
            type="button"
            onClick={handlePrev}
            className="w-5 h-5 flex items-center justify-center rounded-full hover:bg-white/20 text-neutral-300 hover:text-white transition-colors text-xs font-bold leading-none cursor-pointer"
            aria-label="Previous slide"
          >
            ‹
          </button>
          <span className="font-mono text-[10px] text-white/90 px-1 font-semibold tracking-wider">
            {currentIdx + 1} / {slides.length}
          </span>
          <button
            type="button"
            onClick={handleNext}
            className="w-5 h-5 flex items-center justify-center rounded-full hover:bg-white/20 text-neutral-300 hover:text-white transition-colors text-xs font-bold leading-none cursor-pointer"
            aria-label="Next slide"
          >
            ›
          </button>
        </div>
      </div>

      {/* Bottom Floating Info Glass Bar (Streamlined: category + title + CTA button, no bulky description) */}
      <div className="absolute bottom-3 left-3 right-3 z-20">
        {isExternal ? (
          <a
            href={current.href}
            target="_blank"
            rel="noopener noreferrer"
            className="block backdrop-blur-md bg-black/80 hover:bg-black/95 border border-white/15 hover:border-white/30 rounded-xl p-3 sm:p-3.5 transition-all shadow-xl group/link"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0 flex-1">
                <span className={`font-mono text-[8px] sm:text-[9px] uppercase tracking-wider font-semibold block mb-0.5 ${theme.textColor}`}>
                  {current.category}
                </span>
                <h4 className="font-display text-xs sm:text-sm text-white font-semibold truncate group-hover/link:text-white transition-colors">
                  {current.title}
                </h4>
              </div>

              <div
                className={`shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/10 border border-white/15 text-white font-mono text-[9px] sm:text-[10px] font-semibold transition-all ${theme.buttonTone}`}
              >
                <span>{current.division === 'awards' ? 'awards.touchlineltd.co.ke' : 'Explore'}</span>
                <span className="text-[9px]">↗</span>
              </div>
            </div>
          </a>
        ) : (
          <Link
            href={current.href}
            className="block backdrop-blur-md bg-black/80 hover:bg-black/95 border border-white/15 hover:border-white/30 rounded-xl p-3 sm:p-3.5 transition-all shadow-xl group/link"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0 flex-1">
                <span className={`font-mono text-[8px] sm:text-[9px] uppercase tracking-wider font-semibold block mb-0.5 ${theme.textColor}`}>
                  {current.category}
                </span>
                <h4 className="font-display text-xs sm:text-sm text-white font-semibold truncate group-hover/link:text-[var(--accent)] transition-colors">
                  {current.title}
                </h4>
              </div>

              <div
                className={`shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/10 border border-white/15 text-white font-mono text-[9px] sm:text-[10px] font-semibold transition-all ${theme.buttonTone}`}
              >
                <span>Explore</span>
                <span className="text-[9px]">→</span>
              </div>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}
