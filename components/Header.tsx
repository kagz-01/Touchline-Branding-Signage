import Link from 'next/link';
import { headers } from 'next/headers';
import type { BrandConfig } from '@/config/brands';
import { getCrossBrandUrl } from '@/lib/brand';
import { Logo } from './Logo';

export async function Header({ brand }: { brand: BrandConfig | null }) {
  const headersList = await headers();
  const host = headersList.get('host') || '';

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
            <Link href="/book" className="btn-primary text-sm py-2 px-4">
              Get a Quote
            </Link>
          </nav>
          <Link href="/book" className="btn-primary text-sm py-2 px-4 lg:hidden">
            Get a Quote
          </Link>
        </div>
      </header>
    );
  }

  const otherBrand = brand.id === 'branding' ? 'signage' : 'branding';
  const otherLabel = brand.id === 'branding' ? 'Signage' : 'Branding';
  const otherHref = getCrossBrandUrl(otherBrand, host);

  return (
    <header className="glass-nav sticky top-0 z-50">
      <div className="max-w-content mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/">
          <Logo brand={brand.id} className="text-xl md:text-2xl" />
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          <Link href="/services" className="text-overline hover:text-[var(--accent)] transition-colors">
            Services
          </Link>
          <Link href="/portfolio" className="text-overline hover:text-[var(--accent)] transition-colors">
            Portfolio
          </Link>
          <span className="w-px h-4 bg-[var(--border)]" />
          <a href={otherHref} className="text-overline hover:text-[var(--text)] transition-colors">
            {otherLabel} <span className="text-[var(--accent)]">→</span>
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/book"
            className="btn-primary text-sm py-2 px-5"
          >
            Get a Quote <span className="hidden sm:inline">→</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
