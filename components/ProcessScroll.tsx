'use client';
import { useRef, useEffect, useState } from 'react';
import type { BrandConfig } from '@/config/brands';
import { Reveal } from './Reveal';

export function ProcessScroll({ brand }: { brand: BrandConfig }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      let progress = (windowHeight - rect.top) / (windowHeight + rect.height);
      progress = Math.max(0, Math.min(1, progress));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isSignage = brand.id === 'signage';

  const tensionHeadline = isSignage
    ? "Most signs look great on day one. Ours look great in year five."
    : "Sourcing 4,000 items on a tender deadline shouldn't be your headache. It's ours.";

  const tensionBody = isSignage
    ? "We don't just cut corners to win a quote. We engineer signage using weather-resistant acrylics, UV-stabilized vinyl, and commercial-grade LEDs so your brand doesn't fade into the background."
    : "The promo industry is full of middlemen. We own the supply chain. From digitizing the logo to the final embroidery stitch, we control the outcome so you can control your deadlines.";

  const steps = isSignage
    ? [
        { num: '01', title: 'Structural Frame', desc: 'We start with commercial-grade raw materials. No substitutions. No compromises. Everything is measured and staged for the production run.' },
        { num: '02', title: 'Illumination Modules', desc: 'Precision engineering takes over. Calibrating LED modules and wiring for field performance.' },
        { num: '03', title: 'Acrylic Facia', desc: 'The brand becomes visible. The outer shell is applied, turning raw components into a cohesive, high-impact asset.' },
        { num: '04', title: 'Installation & Deploy', desc: 'We manage the final mile, ensuring the product reaches your sites exactly as specified.' },
      ]
    : [
        { num: '01', title: 'Raw Materials', desc: 'We start with commercial-grade raw materials. Everything is measured and staged for the production run.' },
        { num: '02', title: 'Digitization & Setup', desc: 'Your logo is digitized and prepared for production. Accuracy at this stage prevents failure in the field.' },
        { num: '03', title: 'Embroidery & Print', desc: 'The brand becomes visible. Whether it\'s an embroidery stitch or a screen print, quality is non-negotiable.' },
        { num: '04', title: 'Packaging & Deploy', desc: 'We manage the final mile, ensuring the product reaches your staff or sites exactly as specified.' },
      ];

  const getStepStyle = (threshold: number, start: number) => {
    const progress = Math.max(0, Math.min(1, (scrollProgress - start) * 10));
    return {
      opacity: progress,
      transform: `translateY(${(1 - progress) * 16}px)`,
    };
  };

  return (
    <section ref={containerRef} className="relative w-full border-t border-[var(--border)] bg-[var(--surface)] overflow-hidden">
      {/* Tension */}
      <div className="max-w-content mx-auto px-6 section-py border-b border-[var(--border)]">
        <Reveal>
          <div className="max-w-3xl">
            <h2 className="font-display text-3xl md:text-5xl max-w-4xl mb-8 leading-tight uppercase text-[var(--text)]">
              {tensionHeadline}
            </h2>
            <p className="text-lg text-[var(--text-muted)] max-w-2xl leading-relaxed">
              {tensionBody}
            </p>
          </div>
        </Reveal>
      </div>

      {/* Process Steps */}
      <div className="max-w-content mx-auto grid grid-cols-1 md:grid-cols-2 relative">
        {/* Sticky Visual */}
        <div className="hidden md:block border-r border-[var(--border)] h-[150vh] relative">
          <div className="sticky top-0 h-screen flex items-center justify-center p-12 overflow-hidden">
            <div className="relative w-full aspect-square border border-[var(--border)] bg-[var(--bg)] p-8 flex items-center justify-center">
              <div className="relative w-full h-full flex items-center justify-center">
                <div
                  className="absolute inset-4 border-2 opacity-30 transition-all duration-300 rounded-[var(--radius-sm)]"
                  style={{
                    transform: `scale(${1 + scrollProgress * 0.2}) rotate(${scrollProgress * 45}deg)`,
                    borderColor: scrollProgress > 0.2 ? 'var(--accent)' : 'var(--border)',
                  }}
                />
                <div
                  className="absolute inset-12 border-2 opacity-50 transition-all duration-300 rounded-[var(--radius-sm)]"
                  style={{
                    transform: `scale(${1 + scrollProgress * 0.1}) rotate(${scrollProgress * -30}deg)`,
                    borderColor: scrollProgress > 0.4 ? 'var(--accent)' : 'var(--border)',
                  }}
                />
                <div
                  className="absolute inset-20 border-2 opacity-80 flex items-center justify-center bg-[var(--bg)] transition-all duration-300 rounded-[var(--radius-sm)]"
                  style={{
                    borderColor: scrollProgress > 0.6 ? 'var(--accent)' : 'var(--border)',
                    boxShadow: scrollProgress > 0.8 ? '0 0 40px color-mix(in srgb, var(--accent) 20%, transparent)' : 'none',
                  }}
                >
                  <span className="font-display text-2xl text-[var(--accent)]">
                    {scrollProgress > 0.8 ? 'DEPLOYED' : 'PROCESSING'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scrolling Content */}
        <div className="py-32 px-6 md:px-12 flex flex-col justify-center">
          <div className="space-y-24">
            {steps.map((step, i) => (
              <div key={step.num} style={getStepStyle(0.2 * (i + 1), 0.1 * i)} className="transition-all duration-300">
                <div className="font-mono text-xs text-[var(--accent)] uppercase tracking-widest mb-2">
                  {step.num}
                </div>
                <h3 className="font-display text-2xl md:text-3xl mb-3 text-[var(--text)]">{step.title}</h3>
                <p className="text-[var(--text-muted)] leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
