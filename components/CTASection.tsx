import Link from 'next/link';
import type { BrandConfig } from '@/config/brands';

export function CTASection({ brand }: { brand: BrandConfig }) {
  return (
    <section className="max-w-content mx-auto px-6 py-20 text-center">
      <h2 className="font-display text-3xl md:text-4xl mb-4">Ready to start?</h2>
      <p className="text-[var(--text-muted)] max-w-lg mx-auto mb-8">
        Tell us what you need and we'll book a site visit or send a quote \u2014 whichever gets you moving faster.
      </p>
      <Link
        href="/book"
        className="inline-block rounded-[var(--radius-sm)] bg-[var(--accent)] text-[var(--accent-ink)] px-8 py-4 font-semibold hover:opacity-90 transition-opacity"
      >
        Book a site visit or request a quote
      </Link>
      <p className="text-sm text-[var(--text-muted)] mt-4">
        Or call {brand.contactPhone} / email{' '}
        <a href={`mailto:${brand.contactEmail}`} className="hover:text-[var(--accent)]">
          {brand.contactEmail}
        </a>
      </p>
    </section>
  );
}
