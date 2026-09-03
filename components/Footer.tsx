import Link from 'next/link';
import { headers } from 'next/headers';
import type { BrandConfig } from '@/config/brands';
import { getCrossBrandUrl } from '@/lib/brand';
import { Logo } from './Logo';

export async function Footer({ brand }: { brand: BrandConfig | null }) {
  const headersList = await headers();
  const host = headersList.get('host') || '';
  const year = new Date().getFullYear();

  const brandingUrl = getCrossBrandUrl('branding', host);
  const signageUrl = getCrossBrandUrl('signage', host);

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg-soft)]">
      <div className="max-w-content mx-auto px-6 py-16 grid gap-10 md:grid-cols-4">
        {/* Brand */}
        <div className="md:col-span-1">
          <Logo brand={brand?.id ?? 'hub'} className="text-lg mb-4" />
          <p className="text-sm text-[var(--text-muted)] leading-relaxed">
            {brand
              ? brand.tagline
              : 'One company, two specialisms: branded merchandise and structural signage.'}
          </p>
        </div>

        {/* Services */}
        <div>
          <p className="text-xs font-mono uppercase tracking-widest text-[var(--text-muted)] mb-4">Services</p>
          <ul className="space-y-2 text-sm">
            <li><a href={brandingUrl} className="hover:text-[var(--accent)] transition-colors">Branding — Merchandise & apparel</a></li>
            <li><a href={signageUrl} className="hover:text-[var(--accent)] transition-colors">Signage — Fabrication & LED</a></li>
            <li><a href="https://giftshop.touchline.co.ke" className="hover:text-[var(--accent)] transition-colors" target="_blank" rel="noopener noreferrer">TouchGiftShop — Corporate gifting</a></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <p className="text-xs font-mono uppercase tracking-widest text-[var(--text-muted)] mb-4">Company</p>
          <ul className="space-y-2 text-sm">
            <li><Link href="/portfolio" className="hover:text-[var(--accent)] transition-colors">Portfolio</Link></li>
            <li><Link href="/services" className="hover:text-[var(--accent)] transition-colors">Services</Link></li>
            <li><Link href="/book" className="hover:text-[var(--accent)] transition-colors">Get a Quote</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <p className="text-xs font-mono uppercase tracking-widest text-[var(--text-muted)] mb-4">Get in touch</p>
          {brand ? (
            <ul className="space-y-2 text-sm">
              <li>{brand.contactPhone}</li>
              <li><a href={`mailto:${brand.contactEmail}`} className="hover:text-[var(--accent)] transition-colors">{brand.contactEmail}</a></li>
              <li><Link href="/book" className="hover:text-[var(--accent)] transition-colors">Book a site visit →</Link></li>
            </ul>
          ) : (
            <ul className="space-y-2 text-sm">
              <li><a href="tel:+254700000000" className="hover:text-[var(--accent)] transition-colors">+254 700 000 000</a></li>
              <li><a href="mailto:hello@touchline.co.ke" className="hover:text-[var(--accent)] transition-colors">hello@touchline.co.ke</a></li>
              <li><Link href="/book" className="hover:text-[var(--accent)] transition-colors">Book a site visit →</Link></li>
            </ul>
          )}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[var(--border)]">
        <div className="max-w-content mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-4 text-xs text-[var(--text-muted)]">
            <span>&copy; {year} Touchline. All rights reserved.</span>
            <span className="hidden sm:inline">·</span>
            <span className="hidden sm:inline">Nairobi, Kenya</span>
          </div>
          <div className="flex items-center gap-4 text-xs text-[var(--text-muted)]">
            <span>500+ projects delivered</span>
            <span>·</span>
            <span>98% on-time</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
