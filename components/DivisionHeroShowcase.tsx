'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

export interface HeroSlide {
  image: string;
  title: string;
  category: string;
  badge: string;
  specs: string;
  floatingChipTop: { text: string; icon?: string };
  floatingCardBottom: {
    tag: string;
    headline: string;
    detail: string;
  };
  statPill: string;
}

interface DivisionHeroShowcaseProps {
  division: 'signage' | 'branding';
  accentColor: string;
  glowColor: string;
  slides: HeroSlide[];
}

export function DivisionHeroShowcase({
  division,
  accentColor,
  glowColor,
  slides,
}: DivisionHeroShowcaseProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const isSignage = division === 'signage';

  // Auto-play cycle every 4.5 seconds unless hovered
  useEffect(() => {
    if (isPaused) return;

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 4500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, slides.length]);

  const current = slides[currentIndex];

  return (
    <div
      className="relative w-full max-w-lg lg:max-w-none mx-auto select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Ambient Division Halo Glow */}
      <div
        className="absolute -inset-1.5 rounded-3xl opacity-30 blur-2xl transition-all duration-700 pointer-events-none"
        style={{ backgroundColor: accentColor }}
      />

      {/* Main Glass Stage Container */}
      <div className="relative rounded-3xl bg-[#0b0e14]/90 border border-white/15 p-2 sm:p-2.5 shadow-2xl backdrop-blur-xl overflow-hidden min-h-[380px] sm:min-h-[440px] flex flex-col justify-between">
        {/* Background Image Stage with Smooth Cross-Fade */}
        <div className="relative w-full h-[280px] sm:h-[340px] rounded-2xl overflow-hidden bg-black/50 border border-white/10">
          {slides.map((slide, idx) => {
            const isActive = idx === currentIndex;
            return (
              <div
                key={slide.title}
                className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                  isActive
                    ? 'opacity-100 scale-100 z-10'
                    : 'opacity-0 scale-105 pointer-events-none z-0'
                }`}
              >
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  priority={idx === 0}
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 550px"
                />
                {/* Subtle Contrast Scrim Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/35" />
              </div>
            );
          })}

          {/* ── TOP FLOATING CHIP (From Inspiration Image) ──────────── */}
          <div
            className={`absolute top-3.5 z-20 ${
              isSignage ? 'right-3.5' : 'left-3.5'
            } transition-all duration-500`}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 shadow-lg text-white">
              <span
                className="w-2 h-2 rounded-full animate-ping"
                style={{ backgroundColor: glowColor }}
              />
              <span className="font-mono text-[10px] sm:text-[11px] font-semibold tracking-wide">
                {current.floatingChipTop.text}
              </span>
            </div>
          </div>

          {/* ── TOP SECONDARY BADGE (Opposite Side) ────────────────── */}
          <div
            className={`absolute top-3.5 z-20 ${
              isSignage ? 'left-3.5' : 'right-3.5'
            } transition-all duration-500`}
          >
            <span
              className="font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-md font-bold shadow-md backdrop-blur-md border text-white"
              style={{
                backgroundColor: `${accentColor}33`,
                borderColor: `${accentColor}66`,
              }}
            >
              {current.badge}
            </span>
          </div>

          {/* ── BOTTOM FLOATING CARD (From Inspiration Image) ───────── */}
          <div className="absolute bottom-3 left-3 right-3 z-20 transition-all duration-500">
            <div className="p-3.5 sm:p-4 rounded-xl bg-black/75 backdrop-blur-xl border border-white/15 shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="font-mono text-[9px] uppercase tracking-widest font-bold"
                    style={{ color: glowColor }}
                  >
                    {current.floatingCardBottom.tag}
                  </span>
                  <span className="text-white/40 text-[10px]">·</span>
                  <span className="text-[10px] font-mono text-neutral-300 truncate">
                    {current.category}
                  </span>
                </div>
                <h4 className="font-display text-sm sm:text-base text-white font-semibold truncate leading-tight">
                  {current.title}
                </h4>
                <p className="text-[11px] text-neutral-300 leading-snug truncate mt-0.5">
                  {current.specs}
                </p>
              </div>

              {/* Status Pill on Card */}
              <div className="shrink-0 flex items-center justify-between sm:justify-end gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/10">
                <span className="font-mono text-[10px] text-emerald-400 font-semibold flex items-center gap-1 bg-emerald-950/40 px-2 py-1 rounded-md border border-emerald-500/25">
                  ✓ {current.statPill}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── BOTTOM CAROUSEL DOCK & SLIDE CONTROLS ───────────────── */}
        <div className="pt-2.5 px-2 flex items-center justify-between gap-3">
          {/* Progress Indicator Pills */}
          <div className="flex items-center gap-1.5">
            {slides.map((s, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={s.title}
                  onClick={() => setCurrentIndex(idx)}
                  className={`transition-all duration-300 rounded-full h-1.5 ${
                    isActive
                      ? 'w-7 sm:w-8 shadow-sm'
                      : 'w-2 sm:w-2.5 bg-white/20 hover:bg-white/40'
                  }`}
                  style={{
                    backgroundColor: isActive ? glowColor : undefined,
                  }}
                  aria-label={`Go to slide ${idx + 1}: ${s.title}`}
                />
              );
            })}
          </div>

          {/* Division Lab Status / Auto-Play Ticker */}
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] text-neutral-400 hidden sm:inline">
              {currentIndex + 1} / {slides.length} · {isPaused ? 'Paused' : 'Auto-Cycle'}
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() =>
                  setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length)
                }
                className="w-6 h-6 rounded-md bg-white/5 hover:bg-white/15 text-white flex items-center justify-center text-xs font-mono border border-white/10 transition-colors"
                aria-label="Previous slide"
              >
                ‹
              </button>
              <button
                onClick={() => setCurrentIndex((prev) => (prev + 1) % slides.length)}
                className="w-6 h-6 rounded-md bg-white/5 hover:bg-white/15 text-white flex items-center justify-center text-xs font-mono border border-white/10 transition-colors"
                aria-label="Next slide"
              >
                ›
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
