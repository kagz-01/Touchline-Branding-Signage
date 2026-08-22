import Link from 'next/link';
import type { BrandConfig } from '@/config/brands';
import { Logo } from './Logo';

export function Header({ brand }: { brand: BrandConfig | null }) {
  if (!brand) {
    // Hub header: minimal, no nav to fight the two-tile choice below.
    return (
      <header className="border-b border-[var(--border)]">
        <div className="max-w-content mx-auto px-6 py-5 flex items-center justify-between">
          <Link href="/" data-brand="hub">
            <Logo brand="hub" className="text-xl" />
          </Link>
          <span className="text-sm text-[var(--text-muted)] hidden sm:block">
            Sourcing &middot; Branding &middot; Signage &middot; Gifting
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
    <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--bg)]/90 backdrop-blur">
      <div className="max-w-content mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/">
          <Logo brand={brand.id} className="text-lg" />
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm">
          <Link href="/services" className="hover:text-[var(--accent)] transition-colors">
            Services
          </Link>
          <Link href="/portfolio" className="hover:text-[var(--accent)] transition-colors">
            Portfolio
          </Link>
          <a href={otherHref} className="text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors">
            {brand.id === 'branding' ? 'Signage \u2192' : 'Branding \u2192'}
          </a>
        </nav>
        <Link
          href="/book"
          className="rounded-[var(--radius-sm)] bg-[var(--accent)] text-[var(--accent-ink)] px-4 py-2 text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          Book a site visit
        </Link>
      </div>
    </header>
  );
}
