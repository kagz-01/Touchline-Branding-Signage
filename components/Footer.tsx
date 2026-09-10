import Link from 'next/link';
import { headers } from 'next/headers';
import type { BrandConfig } from '@/config/brands';
import { getCrossBrandUrl } from '@/lib/brand';
import { Logo } from './Logo';

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export async function Footer({ brand }: { brand: BrandConfig | null }) {
  const headersList = await headers();
  const host = headersList.get('host') || '';
  const year = new Date().getFullYear();

  const brandingUrl = getCrossBrandUrl('branding', host);
  const signageUrl = getCrossBrandUrl('signage', host);

  const whatsappNumber = brand?.contactPhone.replace(/\D/g, '') || '254700000000';
  const whatsappMsg = encodeURIComponent(`Hi Touchline${brand ? ` ${brand.id === 'branding' ? 'Branding' : 'Signage'}` : ''}, I'd like to get a quote.`);

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg-soft)]">
      <div className="max-w-content mx-auto px-6 py-16 grid gap-10 md:grid-cols-4">
        {/* Brand */}
        <div className="md:col-span-1 flex flex-col gap-4">
          <Logo brand={brand?.id ?? 'hub'} className="text-lg" />
          <p className="text-sm text-[var(--text-muted)] leading-relaxed">
            {brand
              ? brand.tagline
              : 'One company, two specialisms: branded merchandise and structural signage.'}
          </p>
          {/* Social links */}
          <div className="flex items-center gap-3 mt-2">
            <a
              href={`https://wa.me/${whatsappNumber}?text=${whatsappMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              className="w-8 h-8 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all duration-200 hover:scale-110"
            >
              <WhatsAppIcon />
            </a>
            <a
              href="https://instagram.com/touchlinekenya"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow on Instagram"
              className="w-8 h-8 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all duration-200 hover:scale-110"
            >
              <InstagramIcon />
            </a>
            <a
              href="https://linkedin.com/company/touchlinekenya"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Connect on LinkedIn"
              className="w-8 h-8 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all duration-200 hover:scale-110"
            >
              <LinkedInIcon />
            </a>
          </div>
        </div>

        {/* Services */}
        <div>
          <p className="text-xs font-mono uppercase tracking-widest text-[var(--text-muted)] mb-4">Services</p>
          <ul className="space-y-2 text-sm text-[var(--text-muted)]">
            <li><a href={brandingUrl} className="hover:text-[var(--accent)] transition-colors">Branding — Merchandise &amp; apparel</a></li>
            <li><a href={signageUrl} className="hover:text-[var(--accent)] transition-colors">Signage — Fabrication &amp; LED</a></li>
            <li><a href="https://touchgiftshop.co.ke" className="hover:text-[var(--accent)] transition-colors" target="_blank" rel="noopener noreferrer">TouchGiftShop — Sister company, corporate gifting</a></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <p className="text-xs font-mono uppercase tracking-widest text-[var(--text-muted)] mb-4">Company</p>
          <ul className="space-y-2 text-sm text-[var(--text-muted)]">
            <li><Link href="/portfolio" className="hover:text-[var(--accent)] transition-colors">Portfolio</Link></li>
            <li><Link href="/services" className="hover:text-[var(--accent)] transition-colors">Services</Link></li>
            <li><Link href="/book" className="hover:text-[var(--accent)] transition-colors">Get a Quote</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <p className="text-xs font-mono uppercase tracking-widest text-[var(--text-muted)] mb-4">Get in touch</p>
          {brand ? (
            <ul className="space-y-3 text-sm text-[var(--text-muted)]">
              <li>
                <a href={`tel:${brand.contactPhone}`} className="hover:text-[var(--accent)] transition-colors">
                  {brand.contactPhone}
                </a>
              </li>
              <li>
                <a href={`mailto:${brand.contactEmail}`} className="hover:text-[var(--accent)] transition-colors">
                  {brand.contactEmail}
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${whatsappMsg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-[var(--accent)] transition-colors"
                >
                  <WhatsAppIcon /> WhatsApp us
                </a>
              </li>
              <li><Link href="/book" className="hover:text-[var(--accent)] transition-colors">Book a site visit →</Link></li>
            </ul>
          ) : (
            <ul className="space-y-3 text-sm text-[var(--text-muted)]">
              <li><a href="tel:+254722668696" className="hover:text-[var(--accent)] transition-colors">+254 722 668 696</a></li>
              <li><a href="mailto:hello@touchlineltd.co.ke" className="hover:text-[var(--accent)] transition-colors">hello@touchlineltd.co.ke</a></li>
              <li>
                <a
                  href={`https://wa.me/254700000000?text=${whatsappMsg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-[var(--accent)] transition-colors"
                >
                  <WhatsAppIcon /> WhatsApp us
                </a>
              </li>
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
            <Link href="/privacy" className="hover:text-[var(--accent)] transition-colors">Privacy</Link>
            <span>·</span>
            <Link href="/terms" className="hover:text-[var(--accent)] transition-colors">Terms</Link>
            <span>·</span>
            <Link href="/refunds" className="hover:text-[var(--accent)] transition-colors">Refunds</Link>
            <span>·</span>
            <Link href="/cookies" className="hover:text-[var(--accent)] transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
