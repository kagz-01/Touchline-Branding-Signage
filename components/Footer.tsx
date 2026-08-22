import Link from 'next/link';
import type { BrandConfig } from '@/config/brands';
import { Logo } from './Logo';

export function Footer({ brand }: { brand: BrandConfig | null }) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border)] mt-24">
      <div className="max-w-content mx-auto px-6 py-12 grid gap-10 md:grid-cols-3">
        <div>
          <Logo brand={brand?.id ?? 'hub'} className="text-lg mb-3" />
          <p className="text-sm text-[var(--text-muted)] max-w-xs">
            {brand
              ? brand.about.split('. ')[0] + '.'
              : 'One company, three specialisms: sourcing & branding, signage & fabrication, and corporate gifting.'}
          </p>
        </div>

        <div className="text-sm">
          <p className="text-[var(--text-muted)] uppercase tracking-wide text-xs mb-3">Touchline family</p>
          <ul className="space-y-2">
            <li><a href="/branding" className="hover:text-[var(--accent)]">Touchline Branding</a></li>
            <li><a href="/signage" className="hover:text-[var(--accent)]">Touchline Signage</a></li>
            <li><a href="https://giftshop.touchline.co.ke" className="hover:text-[var(--accent)]">TouchGiftShop \u2014 corporate & personal gifting</a></li>
          </ul>
        </div>

        <div className="text-sm">
          <p className="text-[var(--text-muted)] uppercase tracking-wide text-xs mb-3">Get in touch</p>
          {brand ? (
            <ul className="space-y-2">
              <li>{brand.contactPhone}</li>
              <li><a href={`mailto:${brand.contactEmail}`} className="hover:text-[var(--accent)]">{brand.contactEmail}</a></li>
              <li><Link href="/book" className="hover:text-[var(--accent)]">Book a site visit &rarr;</Link></li>
            </ul>
          ) : (
            <ul className="space-y-2">
              <li><a href="/branding" className="hover:text-[var(--accent)]">branding</a></li>
              <li><a href="/signage" className="hover:text-[var(--accent)]">signage</a></li>
            </ul>
          )}
        </div>
      </div>
      <div className="border-t border-[var(--border)]">
        <div className="max-w-content mx-auto px-6 py-4 text-xs text-[var(--text-muted)] flex flex-col sm:flex-row gap-2 sm:justify-between">
          <span>&copy; {year} Touchline. All rights reserved.</span>
          <span>Nairobi, Kenya</span>
        </div>
      </div>
    </footer>
  );
}
