import Link from 'next/link';
import { headers } from 'next/headers';
import type { BrandConfig } from '@/config/brands';
import { getCrossBrandUrl } from '@/lib/brand';
import { Logo } from './Logo';
import { ThemeToggle } from './ThemeToggle';
import { SpecialismNav } from './SpecialismNav';
import { HeaderAuthButton } from './HeaderAuthButton';

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
  const hostBrand = resolveBrandFromHost(host);
  const effectiveBrand = brand || (hostBrand !== 'hub' ? hostBrand : null);

  /* ── 1. HUB HEADER (Unified Entry Point) ────────────────────── */
  if (!effectiveBrand) {
    const brandingUrl = getCrossBrandUrl('branding', host);
    const signageUrl  = getCrossBrandUrl('signage',  host);

    return (
      <header className="glass-nav sticky top-0 z-50 transition-all duration-300">
        <div className="max-w-content mx-auto px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-4">
          {/* Logo Badge */}
          <Link href="/" data-brand="hub" className="group flex items-center shrink-0">
            <div className="flex items-center px-3 py-1.5 rounded-xl bg-[var(--surface)] border border-[var(--border)] group-hover:border-[var(--accent)]/50 transition-all duration-300 shadow-sm">
              <Logo brand="hub" className="h-6 sm:h-7 md:h-8 w-auto" />
            </div>
          </Link>

          {/* Desktop Nav: Clean Pill Cluster */}
          <nav className="hidden lg:flex items-center gap-1.5 p-1 rounded-full bg-[var(--surface)]/80 border border-[var(--border)] shadow-sm backdrop-blur-md">
            <a
              href={brandingUrl}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] hover:text-[#c8960c] hover:bg-[var(--bg-soft)] transition-all"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#c8960c]" />
              Branding
            </a>
            <a
              href={signageUrl}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] hover:text-[#0070f3] hover:bg-[var(--bg-soft)] transition-all"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#0070f3]" />
              Signage
            </a>
          </nav>

          {/* Right Action Cluster */}
          <div className="hidden lg:flex items-center gap-3">
            <ThemeToggle />
            <span className="w-px h-4 bg-[var(--border)]" />
            <HeaderAuthButton />
            <Link
              href="/book"
              className="btn-primary text-xs font-semibold py-2 px-4 rounded-xl shadow-sm hover:shadow transition-all"
            >
              Get a Quote <span>→</span>
            </Link>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex lg:hidden items-center gap-2">
            <ThemeToggle />
            <HeaderAuthButton mobile />
            <Link
              href="/book"
              className="btn-primary text-xs font-semibold py-1.5 px-3 rounded-lg"
            >
              Quote
            </Link>
          </div>
        </div>
      </header>
    );
  }

  /* ── 2. SPECIALISM HEADER (Branding / Signage) ───────────────── */
  const brandId       = typeof effectiveBrand === 'string' ? effectiveBrand : effectiveBrand.id;
  const isBranding    = brandId === 'branding';
  const otherBrandId  = isBranding ? 'signage' : 'branding';
  const otherLabel    = isBranding ? 'Signage' : 'Branding';
  const otherHref     = getCrossBrandUrl(otherBrandId, host);
  const hubHref       = getCrossBrandUrl('hub', host);

  return (
    <header className="glass-nav sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-content mx-auto px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-4">
        {/* Division Logo */}
        <Link href="/" className="group flex items-center shrink-0">
          <div className="flex items-center px-3 py-1.5 rounded-xl bg-[var(--surface)] border border-[var(--border)] group-hover:border-[var(--accent)]/50 transition-all duration-300 shadow-sm">
            <Logo brand={brandId} className="h-6 sm:h-7 md:h-8 w-auto" />
          </div>
        </Link>

        {/* Center / Desktop Nav */}
        <SpecialismNav
          brandId={brandId}
          otherBrand={otherBrandId}
          otherLabel={otherLabel}
          otherHref={otherHref}
          hubHref={hubHref}
        />

        {/* Mobile Right Controls */}
        <div className="flex lg:hidden items-center gap-2">
          <ThemeToggle />
          <HeaderAuthButton mobile />
          <Link
            href="/book"
            className="btn-primary text-xs font-semibold py-1.5 px-3 rounded-lg"
          >
            Quote
          </Link>
        </div>
      </div>
    </header>
  );
}
