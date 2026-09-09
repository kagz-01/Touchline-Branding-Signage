'use client';

import { useState, useEffect, useCallback } from 'react';
import type { BrandConfig } from '@/config/brands';
import { Reveal } from './Reveal';

function TestimonialCard({ t }: { t: BrandConfig['testimonials'][number] }) {
  return (
    <blockquote className="glass rounded-[var(--radius-md)] p-8 relative group flex flex-col h-full">
      {/* Decorative quote mark */}
      <span
        className="absolute top-4 right-6 font-editorial text-6xl text-[var(--accent)]/10 leading-none select-none pointer-events-none"
        aria-hidden="true"
      >
        &ldquo;
      </span>

      <p className="font-editorial italic text-lg text-[var(--text)] leading-relaxed mb-6 relative z-10 flex-1">
        &ldquo;{t.quote}&rdquo;
      </p>

      <footer className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-[var(--accent)]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[var(--accent)]/20 transition-colors">
          <span className="font-mono text-xs text-[var(--accent)] font-semibold">
            {t.name.split(' ').map((n) => n[0]).join('')}
          </span>
        </div>
        <div>
          <p className="text-sm font-semibold text-[var(--text)]">{t.name}</p>
          <p className="text-mono-label text-[9px]">{t.role}</p>
        </div>
      </footer>
    </blockquote>
  );
}

export function Testimonials({ brand }: { brand: BrandConfig }) {
  const testimonials = brand.testimonials;
  const [active, setActive] = useState(0);

  const next = useCallback(() => {
    setActive((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  // Auto-advance on mobile every 5 seconds
  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="section-py">
      <div className="max-w-content mx-auto px-6">
        <Reveal>
          <div className="text-center mb-16">
            <span className="text-mono-label block mb-4">// Client stories</span>
            <h2 className="text-display text-3xl md:text-4xl">
              What clients <span className="accent-word">say</span>
            </h2>
          </div>
        </Reveal>

        {/* Desktop: side-by-side grid */}
        <div className="hidden md:grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 120} direction={i % 2 === 0 ? 'left' : 'right'}>
              <TestimonialCard t={t} />
            </Reveal>
          ))}
        </div>

        {/* Mobile: single card carousel */}
        <div className="md:hidden max-w-lg mx-auto">
          <div className="relative overflow-hidden">
            {testimonials.map((t, i) => (
              <div
                key={t.name}
                className={`transition-all duration-500 ease-out-expo ${
                  i === active ? 'opacity-100 scale-100' : 'opacity-0 scale-95 absolute inset-0'
                }`}
              >
                <TestimonialCard t={t} />
              </div>
            ))}
          </div>

          {/* Dot indicators */}
          {testimonials.length > 1 && (
            <div className="flex items-center justify-center gap-2 mt-6">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  aria-label={`Show testimonial ${i + 1}`}
                  className={`rounded-full transition-all duration-300 ${
                    i === active
                      ? 'w-6 h-1.5 bg-[var(--accent)]'
                      : 'w-1.5 h-1.5 bg-[var(--border)] hover:bg-[var(--text-muted)]'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
