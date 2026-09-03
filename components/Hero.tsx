import Link from 'next/link';
import type { BrandConfig } from '@/config/brands';
import { Parallax } from './Parallax';

export function Hero({ brand }: { brand: BrandConfig }) {
  const words = brand.heroHeadline.split(' ');
  const keyWord = words[words.length - 1];
  const leadWords = words.slice(0, -1).join(' ');

  return (
    <section className="relative overflow-hidden">
      {/* Decorative gradient orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="gradient-orb gradient-orb-accent w-[50vw] h-[50vw] -top-[20vw] -right-[10vw] animate-pulse-soft" />
        <div className="gradient-orb gradient-orb-warm w-[35vw] h-[35vw] -bottom-[15vw] -left-[10vw] animate-float" />
        <div className="absolute top-1/4 left-1/3 w-[20vw] h-[20vw] rounded-full bg-[var(--accent)]/3 blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-content mx-auto px-6 section-py-lg">
        <Parallax speed={0.3}>
          <div className="max-w-3xl">
            {/* Kicker with line accent */}
            <div className="flex items-center gap-3 mb-6">
              <span className="line-accent" />
              <span className="text-mono-label">{brand.heroKicker}</span>
            </div>

            {/* Display headline */}
            <h1 className="text-display text-5xl md:text-6xl lg:text-7xl mb-6 text-balance">
              {leadWords}{' '}
              <span className="accent-word">{keyWord}</span>
            </h1>

            {/* Editorial subtitle */}
            <p className="text-editorial-lg max-w-lg mb-10">
              {brand.heroSub}
            </p>

            {/* CTA buttons with glass effect */}
            <div className="flex flex-wrap gap-4">
              <Link href="/book" className="btn-primary glow-accent">
                Request a Quote <span>→</span>
              </Link>
              <Link href="/portfolio" className="btn-secondary glass-subtle">
                See Our Work
              </Link>
            </div>
          </div>
        </Parallax>
      </div>
    </section>
  );
}
