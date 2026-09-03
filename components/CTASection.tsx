import Link from 'next/link';
import type { BrandConfig } from '@/config/brands';

export function CTASection({ brand }: { brand: BrandConfig }) {
  return (
    <section className="section-py-lg bg-[var(--bg)] border-t border-[var(--border)]">
      <div className="max-w-content mx-auto px-6 text-center">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--accent)] mb-8 flex items-center justify-center gap-4">
          <span className="w-8 h-px bg-[var(--accent)]" />
          Ready to start?
          <span className="w-8 h-px bg-[var(--accent)]" />
        </span>

        <h2 className="font-display text-4xl md:text-5xl leading-tight mb-6 text-[var(--text)]">
          Let&apos;s make it <span className="accent-word">happen.</span>
        </h2>

        <p className="text-lg text-[var(--text-muted)] max-w-xl mx-auto mb-10">
          Tell us what you need. We&apos;ll handle the sourcing, the build, and the delivery — so you can focus on running your business.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
          <Link href="/book" className="btn-primary">
            Get a Quote <span>→</span>
          </Link>
          <a href={`tel:${brand.contactPhone}`} className="btn-secondary">
            Call {brand.contactPhone}
          </a>
        </div>

        <div className="font-mono text-xs text-[var(--text-muted)] flex flex-col md:flex-row items-center justify-center gap-2 md:gap-6">
          <span>{brand.contactPhone}</span>
          <span className="hidden md:block w-1 h-1 bg-[var(--border)] rounded-full" />
          <a href={`mailto:${brand.contactEmail}`} className="hover:text-[var(--accent)] transition-colors">
            {brand.contactEmail}
          </a>
        </div>
      </div>
    </section>
  );
}
