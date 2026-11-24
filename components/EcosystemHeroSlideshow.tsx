'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Image from 'next/image';

export interface EcosystemSlideItem {
  id: string;
  title: string;
  division: 'branding' | 'signage' | 'awards';
  category: string;
  badge: string;
  image: string;
  domainLabel: string;
  href: string;
}

// Fisher-Yates array shuffle for true random distribution
function shuffleArray<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

const DEFAULT_SLIDES: EcosystemSlideItem[] = [
  {
    id: 'SLIDE-SIG-01',
    title: '3D Precision Channel Letters & Architectural Fascias',
    division: 'signage',
    category: 'Architectural Signage',
    badge: 'Signage Division',
    image: 'https://mtjaguidxnyyeznsdhgr.supabase.co/storage/v1/object/public/catalog/signage/catalog/3d-01.webp',
    domainLabel: 'signage.touchlineltd.co.ke',
    href: 'https://signage.touchlineltd.co.ke',
  },
  {
    id: 'SLIDE-BRA-01',
    title: 'Executive Pique Polos & Corporate Uniforms',
    division: 'branding',
    category: 'Apparel & Uniforms',
    badge: 'Branding Division',
    image: 'https://mtjaguidxnyyeznsdhgr.supabase.co/storage/v1/object/public/catalog/branding/catalog/set-001.webp',
    domainLabel: 'branding.touchlineltd.co.ke',
    href: 'https://branding.touchlineltd.co.ke',
  },
  {
    id: 'SLIDE-AWD-01',
    title: 'K9 Optical Crystal Towers & Honor Plaques',
    division: 'awards',
    category: 'Trophies & Honors',
    badge: 'TouchAwards',
    image: 'https://mtjaguidxnyyeznsdhgr.supabase.co/storage/v1/object/public/catalog/awards/catalog/awd-004.webp',
    domainLabel: 'awards.touchlineltd.co.ke',
    href: 'https://awards.touchlineltd.co.ke',
  },
  {
    id: 'SLIDE-SIG-02',
    title: 'Commercial Highway Pylons & Illuminated Totems',
    division: 'signage',
    category: 'Pylons & Totems',
    badge: 'Signage Division',
    image: 'https://mtjaguidxnyyeznsdhgr.supabase.co/storage/v1/object/public/catalog/signage/catalog/pylon-signs-01.webp',
    domainLabel: 'signage.touchlineltd.co.ke',
    href: 'https://signage.touchlineltd.co.ke',
  },
  {
    id: 'SLIDE-GFT-01',
    title: 'Curated Executive VIP Gift Sets & Drinkware',
    division: 'branding',
    category: 'Executive Gift Sets',
    badge: 'TouchGifts & Merch',
    image: 'https://mtjaguidxnyyeznsdhgr.supabase.co/storage/v1/object/public/catalog/branding/catalog/set-002.webp',
    domainLabel: 'touchgiftshop.co.ke',
    href: 'https://touchgiftshop.co.ke',
  },
  {
    id: 'SLIDE-AWD-02',
    title: 'Solid African Teak & Beveled Glass Plaques',
    division: 'awards',
    category: 'Recognition Plaques',
    badge: 'TouchAwards',
    image: 'https://mtjaguidxnyyeznsdhgr.supabase.co/storage/v1/object/public/catalog/awards/catalog/awd-027.webp',
    domainLabel: 'awards.touchlineltd.co.ke',
    href: 'https://awards.touchlineltd.co.ke',
  },
];

export function EcosystemHeroSlideshow() {
  const [slides, setSlides] = useState<EcosystemSlideItem[]>(() => shuffleArray(DEFAULT_SLIDES));
  const [rawCatalog, setRawCatalog] = useState<{ signage: any[]; branding: any[]; awards: any[] } | null>(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Builds an interleaved, randomly shuffled dynamic list across all active database items
  const buildDynamicSlides = useCallback((signage: any[], branding: any[], awards: any[]): EcosystemSlideItem[] => {
    const signageShuffled = shuffleArray(signage.filter((i) => Boolean(i?.image)));
    const brandingShuffled = shuffleArray(branding.filter((i) => Boolean(i?.image)));
    const awardsShuffled = shuffleArray(awards.filter((i) => Boolean(i?.image)));

    const dynamicList: EcosystemSlideItem[] = [];
    const maxLen = Math.max(signageShuffled.length, brandingShuffled.length, awardsShuffled.length);

    for (let i = 0; i < maxLen; i++) {
      // 1. Signage item -> signage.touchlineltd.co.ke
      if (signageShuffled[i]) {
        dynamicList.push({
          id: signageShuffled[i].id,
          title: signageShuffled[i].title,
          division: 'signage',
          category: signageShuffled[i].category || 'Architectural Signage',
          badge: 'Signage Division',
          image: signageShuffled[i].image,
          domainLabel: 'signage.touchlineltd.co.ke',
          href: 'https://signage.touchlineltd.co.ke',
        });
      }

      // 2. Branding item -> detect if TouchGifts or standard Branding & Merch
      if (brandingShuffled[i]) {
        const item = brandingShuffled[i];
        const isGift =
          item.category?.toLowerCase().includes('gift') ||
          item.title?.toLowerCase().includes('gift') ||
          item.category?.toLowerCase().includes('set');

        dynamicList.push({
          id: item.id,
          title: item.title,
          division: 'branding',
          category: item.category || 'Apparel & Uniforms',
          badge: isGift ? 'TouchGifts & Merch' : 'Branding Division',
          image: item.image,
          domainLabel: isGift ? 'touchgiftshop.co.ke' : 'branding.touchlineltd.co.ke',
          href: isGift ? 'https://touchgiftshop.co.ke' : 'https://branding.touchlineltd.co.ke',
        });
      }

      // 3. Awards item -> awards.touchlineltd.co.ke
      if (awardsShuffled[i]) {
        dynamicList.push({
          id: awardsShuffled[i].id,
          title: awardsShuffled[i].title,
          division: 'awards',
          category: awardsShuffled[i].category || 'Trophies & Honors',
          badge: 'TouchAwards',
          image: awardsShuffled[i].image,
          domainLabel: 'awards.touchlineltd.co.ke',
          href: 'https://awards.touchlineltd.co.ke',
        });
      }
    }

    return dynamicList;
  }, []);

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

        const signage = resSignage?.items || [];
        const branding = resBranding?.items || [];
        const awards = resAwards?.items || [];

        if (isMounted) {
          setRawCatalog({ signage, branding, awards });
          const randomized = buildDynamicSlides(signage, branding, awards);
          if (randomized.length >= 3) {
            setSlides(randomized);
            setCurrentIdx(0);
          }
        }
      } catch (err) {
        // Keeps initial shuffled defaults on network error
      }
    }

    loadDynamicCatalog();
    return () => {
      isMounted = false;
    };
  }, [buildDynamicSlides]);

  // Reshuffle slides on user request
  const handleShuffle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (rawCatalog) {
      const reshuffled = buildDynamicSlides(rawCatalog.signage, rawCatalog.branding, rawCatalog.awards);
      setSlides(reshuffled);
      setCurrentIdx(0);
    } else {
      setSlides(shuffleArray(slides));
      setCurrentIdx(0);
    }
  };

  // Automatic slide rotation
  useEffect(() => {
    if (isPaused || slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % slides.length);
    }, 4200);
    return () => clearInterval(timer);
  }, [isPaused, slides.length]);

  const current = slides[currentIdx] || slides[0];

  const getDivisionTheme = (div: string, domainLabel: string) => {
    if (domainLabel.includes('touchgiftshop')) {
      return {
        pillBg: 'bg-pink-500/25 border-pink-500/50 text-pink-300',
        accentDot: 'bg-pink-500',
        textColor: 'text-pink-300',
        buttonTone: 'bg-pink-500/20 hover:bg-pink-500 text-pink-200 hover:text-white border-pink-500/40',
      };
    }
    switch (div) {
      case 'branding':
        return {
          pillBg: 'bg-[#c8960c]/25 border-[#c8960c]/50 text-[#f5c344]',
          accentDot: 'bg-[#c8960c]',
          textColor: 'text-[#f5c344]',
          buttonTone: 'bg-[#c8960c]/20 hover:bg-[#c8960c] text-[#f5c344] hover:text-black border-[#c8960c]/40',
        };
      case 'signage':
        return {
          pillBg: 'bg-[#0070f3]/25 border-[#0070f3]/50 text-[#38bdf8]',
          accentDot: 'bg-[#0070f3]',
          textColor: 'text-[#38bdf8]',
          buttonTone: 'bg-[#0070f3]/20 hover:bg-[#0070f3] text-[#38bdf8] hover:text-white border-[#0070f3]/40',
        };
      case 'awards':
      default:
        return {
          pillBg: 'bg-[#9B2345]/30 border-[#9B2345]/50 text-rose-300',
          accentDot: 'bg-[#9B2345]',
          textColor: 'text-rose-300',
          buttonTone: 'bg-[#9B2345]/25 hover:bg-[#9B2345] text-rose-300 hover:text-white border-[#9B2345]/50',
        };
    }
  };

  const theme = getDivisionTheme(current.division, current.domainLabel);

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
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/35 pointer-events-none z-10" />

      {/* Top Bar: Division Badge & Dynamic Controls */}
      <div className="absolute top-3.5 left-3.5 right-3.5 z-20 flex items-center justify-between">
        <div
          className={`backdrop-blur-md border font-mono text-[9px] sm:text-[10px] tracking-wider uppercase px-2.5 sm:px-3 py-1 rounded-full flex items-center gap-2 shadow-lg transition-colors duration-300 ${theme.pillBg}`}
        >
          <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${theme.accentDot}`} />
          <span>{current.badge}</span>
        </div>

        {/* Dynamic Controls: Prev, Shuffle, Slide Counter, Next */}
        <div className="flex items-center gap-1.5 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20 text-white shadow-lg">
          <button
            type="button"
            onClick={handlePrev}
            className="w-5 h-5 flex items-center justify-center rounded-full hover:bg-white/20 text-neutral-300 hover:text-white transition-colors text-xs font-bold leading-none cursor-pointer"
            aria-label="Previous slide"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={handleShuffle}
            title="Reshuffle live catalog"
            className="w-5 h-5 flex items-center justify-center rounded-full hover:bg-white/20 text-neutral-300 hover:text-white transition-colors text-[11px] leading-none cursor-pointer"
            aria-label="Reshuffle catalog"
          >
            ↻
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

      {/* Bottom Floating Info Glass Bar (Dynamically detects exact domain & URL) */}
      <div className="absolute bottom-3 left-3 right-3 z-20">
        <a
          href={current.href}
          target="_blank"
          rel="noopener noreferrer"
          className="block backdrop-blur-md bg-black/85 hover:bg-black/95 border border-white/15 hover:border-white/35 rounded-xl p-3 sm:p-3.5 transition-all shadow-xl group/link"
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

            {/* Smart Domain-Aware Button */}
            <div
              className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-mono text-[9px] sm:text-[10px] font-semibold transition-all shadow-sm ${theme.buttonTone}`}
            >
              <span>{current.domainLabel}</span>
              <span className="text-[9px]">↗</span>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}
