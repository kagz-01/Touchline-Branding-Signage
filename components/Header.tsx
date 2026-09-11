import Link from 'next/link';
import { headers } from 'next/headers';
import type { BrandConfig } from '@/config/brands';
import { getCrossBrandUrl } from '@/lib/brand';
import { Logo } from './Logo';
import { ThemeToggle } from './ThemeToggle';
import { SpecialismNav } from './SpecialismNav';

function resolveBrandFromHost(host: string): 'branding' | 'signage' | 'hub' {
  if (!host) return 'hub';
  const h = host.toLowerCase();
  if (h.startsWith('branding.')) return 'branding';
  if (h.startsWith('signage.')) return 'signage';
  return 'hub';
}

export async function Header({ brand }: { brand: BrandConfig | null }) {
  const headersList = await headers();
  const host = headersList.get('x-forwarded-host') || headersList.get('host') || '';

  // Also resolve brand from hostname directly
  const hostBrand = resolveBrandFromHost(host);
  const effectiveBrand = brand || (hostBrand !== 'hub' ? hostBrand : null);

  /* ── HUB HEADER ─────────────────────────────────────────────── */
  if (!effectiveBrand) {
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
  const brandId = typeof effectiveBrand === 'string' ? effectiveBrand : effectiveBrand.id;
  const otherBrandId = brandId === 'branding' ? 'signage' : 'branding';
  const otherLabel = brandId === 'branding' ? 'Signage' : 'Branding';
  const otherHref = getCrossBrandUrl(otherBrandId, host);
  const hubHref = getCrossBrandUrl('hub', host);

  return (
    <header className="glass-nav sticky top-0 z-50">
      <div className="max-w-content mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Logo brand={brandId} className="text-xl md:text-2xl" />
        </Link>

        {/* Desktop nav with active states */}
        <SpecialismNav
          brandId={brandId}
          otherBrand={otherBrandId}
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
