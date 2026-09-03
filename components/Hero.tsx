import Link from 'next/link';
import type { BrandConfig } from '@/config/brands';

export function Hero({ brand }: { brand: BrandConfig }) {
  const words = brand.heroHeadline.split(' ');
  const keyWord = words[words.length - 1];
  const leadWords = words.slice(0, -1).join(' ');

  return (
    <section className="relative bg-[var(--bg)] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 right-0 w-[40vw] h-[40vw] rounded-full bg-[var(--accent)]/5 blur-[80px]" />
        <div className="absolute bottom-0 left-0 w-[30vw] h-[30vw] rounded-full bg-[var(--accent2)]/5 blur-[60px]" />
      </div>

      <div className="relative z-10 max-w-content mx-auto px-6 section-py-lg">
        <div className="max-w-3xl">
          <p className="text-sm font-medium text-[var(--accent)] mb-5 flex items-center gap-3 uppercase tracking-widest">
            <span className="w-6 h-px bg-[var(--accent)]" />
            {brand.heroKicker}
          </p>

          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[1.05] mb-6 text-[var(--text)]">
            {leadWords}{' '}
            <span className="accent-word">{keyWord}</span>
          </h1>

          <p className="text-[var(--text-muted)] text-lg md:text-xl max-w-lg mb-10 leading-relaxed">
            {brand.heroSub}
          </p>

          <div className="flex flex-wrap gap-4">
            <Link href="/book" className="btn-primary">
              Request a Quote <span>→</span>
            </Link>
            <Link href="/portfolio" className="btn-secondary">
              See Our Work
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
