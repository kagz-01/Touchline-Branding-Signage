import Link from 'next/link';
import type { BrandConfig } from '@/config/brands';
import { Logo } from './Logo';

export function Header({ brand }: { brand: BrandConfig | null }) {
  if (!brand) {
    // Hub header: minimal, no nav to fight the two-tile choice below.
    return (
      <header className="border-b border-[var(--border)] relative z-50">
        <div className="max-w-content mx-auto px-6 py-6 flex items-center justify-between">
          <Link href="/" data-brand="hub">
            <Logo brand="hub" className="text-xl md:text-2xl" />
          </Link>
          <span className="font-mono text-xs uppercase tracking-widest text-[var(--text-muted)] hidden sm:block">
            SOURCING // BRANDING // SIGNAGE
          </span>
        </div>
      </header>
    );
  }

  const otherHref =
    brand.id === 'branding'
      ? '/signage'
      : '/branding';

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--bg)]/70 backdrop-blur-2xl supports-[backdrop-filter]:bg-[var(--bg)]/40">
      <div className="max-w-content mx-auto px-6 py-5 flex items-center justify-between">
        <Link href="/">
          <Logo brand={brand.id} className="text-xl md:text-2xl" />
        </Link>
        <nav className="hidden lg:flex items-center gap-12">
          <Link href="/services" className="font-mono text-xs uppercase tracking-widest hover:text-[var(--accent)] transition-colors">
            Services
          </Link>
          <Link href="/portfolio" className="font-mono text-xs uppercase tracking-widest hover:text-[var(--accent)] transition-colors">
            Portfolio
          </Link>
          <a href={otherHref} className="font-mono text-xs uppercase tracking-widest text-[var(--text-muted)] hover:text-[var(--text)] transition-colors flex items-center gap-3 group">
            <span className="w-2 h-2 bg-[var(--border)] group-hover:bg-[var(--accent)] transition-colors animate-pulse-soft"></span>
            SWITCH TO {brand.id === 'branding' ? 'SIGNAGE' : 'BRANDING'}
          </a>
        </nav>
        <Link
          href="/book"
          className="group relative px-6 py-3 overflow-hidden border border-[var(--accent)] bg-transparent flex items-center justify-center"
        >
          <span className="relative z-10 font-mono text-xs uppercase tracking-widest text-[var(--text)] group-hover:text-[var(--bg)] font-bold transition-colors duration-300">
            INITIATE PROJECT
          </span>
          <div className="absolute inset-0 bg-[var(--accent)] transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-out z-0"></div>
        </Link>
      </div>
    </header>
  );
}
