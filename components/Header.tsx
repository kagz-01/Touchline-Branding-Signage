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

  /* ── 1. HUB HEADER (Unified Entry Point) ────────────────────── */
  if (!effectiveBrand) {
    const brandingUrl = getCrossBrandUrl('branding', host);
    const signageUrl = getCrossBrandUrl('signage', host);

    return (
      <header className="glass-nav sticky top-0 z-50">
        <div className="max-w-content mx-auto px-6 py-3.5 sm:py-4 flex items-center justify-between">
          {/* Logo Placeholder Emblem Container */}
          <Link href="/" data-brand="hub" className="group flex items-center">
            <div className="flex items-center px-3.5 py-1.5 rounded-xl bg-[#0b0e14] border border-white/10 group-hover:border-[#c8960c]/50 transition-all duration-300 shadow-sm">
              <Logo brand="hub" className="h-6 sm:h-7 md:h-8 w-auto" />
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            <a
              href={brandingUrl}
              className="group flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] hover:text-[#c8960c] transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#c8960c] group-hover:scale-125 transition-transform" />
              <span>Branding</span>
            </a>
            <a
              href={signageUrl}
              className="group flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] hover:text-[#0070f3] transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#0070f3] group-hover:scale-125 transition-transform" />
              <span>Signage</span>
            </a>
            <span className="w-px h-4 bg-[var(--border)]" />
            <ThemeToggle />
            <Link href="/book" className="btn-primary text-xs font-semibold py-2.5 px-5">
              Get a Quote <span>→</span>
            </Link>
          </nav>

          {/* Mobile Right Controls */}
          <div className="flex lg:hidden items-center gap-2.5">
            <ThemeToggle />
            <Link href="/book" className="btn-primary text-xs font-semibold py-2 px-3.5">
              Quote
            </Link>
          </div>
        </div>
      </header>
    );
  }

  /* ── 2. SPECIALISM HEADER (Branding / Signage) ───────────────── */
  const brandId = typeof effectiveBrand === 'string' ? effectiveBrand : effectiveBrand.id;
  const isBranding = brandId === 'branding';
  const otherBrandId = isBranding ? 'signage' : 'branding';
  const otherLabel = isBranding ? 'Signage' : 'Branding';
  const otherHref = getCrossBrandUrl(otherBrandId, host);
  const hubHref = getCrossBrandUrl('hub', host);

  // Styling for the logo emblem placeholder based on division
  const logoPlaceholderStyle = isBranding
    ? 'bg-[#120e08] border-amber-500/25 group-hover:border-amber-500/60 shadow-amber-950/20'
    : 'bg-[#060e18] border-blue-500/25 group-hover:border-blue-500/60 shadow-blue-950/20';

  return (
    <header className="glass-nav sticky top-0 z-50">
      <div className="max-w-content mx-auto px-6 py-3.5 sm:py-4 flex items-center justify-between">
        {/* Division Logo Placeholder Badge */}
        <Link href="/" className="group flex items-center flex-shrink-0">
          <div
            className={`flex items-center px-3 sm:px-3.5 py-1.5 rounded-xl border transition-all duration-300 shadow-sm ${logoPlaceholderStyle}`}
          >
            <Logo brand={brandId} className="h-6 sm:h-7 md:h-8 w-auto" />
          </div>
        </Link>

        {/* Desktop Nav with active route pills */}
        <SpecialismNav
          brandId={brandId}
          otherBrand={otherBrandId}
          otherLabel={otherLabel}
          otherHref={otherHref}
          hubHref={hubHref}
        />

        {/* Mobile Header Actions */}
        <div className="flex lg:hidden items-center gap-2.5">
          <ThemeToggle />
          <Link href="/book" className="btn-primary text-xs font-semibold py-2 px-3.5">
            Quote
          </Link>
        </div>
      </div>
    </header>
  );
}
