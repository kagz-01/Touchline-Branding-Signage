import Link from 'next/link';
import type { BrandConfig } from '@/config/brands';
import { Parallax } from './Parallax';

export function CTASection({ brand }: { brand: BrandConfig }) {
  return (
    <section className="section-py-lg relative overflow-hidden">
      {/* Background orbs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="gradient-orb gradient-orb-accent w-[40vw] h-[40vw] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="relative z-10 max-w-content mx-auto px-6 text-center">
        <Parallax speed={0.2}>
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="line-accent" />
            <span className="text-mono-label">Ready to start?</span>
            <span className="line-accent rotate-180" />
          </div>

          <h2 className="text-display text-4xl md:text-5xl leading-tight mb-6 text-balance">
            Let&apos;s make it <span className="accent-word">happen.</span>
          </h2>

          <p className="text-editorial-lg max-w-xl mx-auto mb-10">
            Tell us what you need. We&apos;ll handle the sourcing, the build, and the delivery — so you can focus on running your business.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
            <Link href="/book" className="btn-primary glow-accent">
              Get a Quote <span>→</span>
            </Link>
            <a href={`tel:${brand.contactPhone}`} className="btn-secondary glass-subtle">
              Call {brand.contactPhone}
            </a>
          </div>

          <div className="text-mono-label flex flex-col md:flex-row items-center justify-center gap-2 md:gap-6">
            <span>{brand.contactPhone}</span>
            <span className="hidden md:block w-1 h-1 bg-[var(--border)] rounded-full" />
            <a href={`mailto:${brand.contactEmail}`} className="hover:text-[var(--accent)] transition-colors">
              {brand.contactEmail}
            </a>
          </div>
        </Parallax>
      </div>
    </section>
  );
}
