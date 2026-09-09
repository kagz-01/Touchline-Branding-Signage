import Link from 'next/link';
import { headers } from 'next/headers';
import type { BrandConfig } from '@/config/brands';
import { getCrossBrandUrl } from '@/lib/brand';
import { Logo } from './Logo';
import { ThemeToggle } from './ThemeToggle';
import { HeaderActions } from './HeaderActions';

export async function Header({ brand }: { brand: BrandConfig | null }) {
  const headersList = await headers();
  const host = headersList.get('host') || '';

  /* ── HUB HEADER ─────────────────────────────────────────────── */
  if (!brand) {
    const brandingUrl = getCrossBrandUrl('branding', host);
    const signageUrl = getCrossBrandUrl('signage', host);

    return (
      <header className="glass-nav sticky top-0 z-50">
        <div className="max-w-content mx-auto px-6 py-5 flex items-center justify-between">
          <Link href="/" data-brand="hub">
            <Logo brand="hub" className="text-2xl md:text-3xl" />
          </Link>
          <nav className="hidden lg:flex items-center gap-6">
            <a href={brandingUrl} className="text-overline hover:text-[var(--accent)] transition-colors">
              Branding
            </a>
            <a href={signageUrl} className="text-overline hover:text-[var(--accent)] transition-colors">
              Signage
            </a>
            <span className="w-px h-4 bg-[var(--border)]" />
            <ThemeToggle />
            <Link href="/book" className="btn-primary text-sm py-2 px-4">
              Get a Quote
            </Link>
          </nav>
          <div className="flex lg:hidden items-center gap-3">
            <ThemeToggle />
            <Link href="/book" className="btn-primary text-sm py-2 px-4">
              Get a Quote
            </Link>
          </div>
        </div>
      </header>
    );
  }

  /* ── SPECIALISM HEADER (Branding / Signage) ──────────────────── */
  const otherBrand = brand.id === 'branding' ? 'signage' : 'branding';
  const otherLabel = brand.id === 'branding' ? 'Signage' : 'Branding';
  const otherHref = getCrossBrandUrl(otherBrand, host);

  const navTabs = [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/book', label: 'Get Quote' },
  ];

  return (
    <header className="glass-nav sticky top-0 z-50">
      <div className="max-w-content mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Logo brand={brand.id} className="text-xl md:text-2xl" />
        </Link>

        {/* Desktop nav tabs */}
        <nav className="hidden lg:flex items-center gap-1">
          {navTabs.map((tab) => (
            <Link
              key={tab.href}
              href={tab.href}
              className={`px-4 py-2 rounded-[var(--radius-md)] text-sm font-medium transition-all duration-200 ${
                tab.href === '/book'
                  ? 'btn-primary text-sm ml-2'
                  : 'text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--bg-soft)]'
              }`}
            >
              {tab.label}
            </Link>
          ))}

          {/* Divider */}
          <span className="w-px h-5 bg-[var(--border)] mx-2" />

          {/* Cross-sell link */}
          <a
            href={otherHref}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors rounded-[var(--radius-md)] hover:bg-[var(--accent)]/5"
          >
            <span>{otherLabel}</span>
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>

          {/* Theme toggle */}
          <div className="ml-2">
            <ThemeToggle />
          </div>
        </nav>

        {/* Mobile menu button */}
        <div className="flex lg:hidden items-center gap-3">
          <ThemeToggle />
          <Link href="/book" className="btn-primary text-sm py-2 px-4">
            Quote
          </Link>
        </div>
      </div>
    </header>
  );
}
