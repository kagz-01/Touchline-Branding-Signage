import Link from 'next/link';
import { headers } from 'next/headers';
import type { BrandConfig } from '@/config/brands';
import { getCrossBrandUrl } from '@/lib/brand';
import { Logo } from './Logo';
import { ThemeToggle } from './ThemeToggle';
import { SpecialismNav } from './SpecialismNav';

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
  const hubHref = getCrossBrandUrl('hub', host);

  return (
    <header className="glass-nav sticky top-0 z-50">
      <div className="max-w-content mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Logo brand={brand.id} className="text-xl md:text-2xl" />
        </Link>

        {/* Desktop nav with active states */}
        <SpecialismNav
          brandId={brand.id}
          otherBrand={otherBrand}
          otherLabel={otherLabel}
          otherHref={otherHref}
          hubHref={hubHref}
        />

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
