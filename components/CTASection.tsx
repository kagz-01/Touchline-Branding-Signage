import Link from 'next/link';
import type { BrandConfig } from '@/config/brands';

export function CTASection({ brand }: { brand: BrandConfig }) {
  return (
    <section className="border-t border-[var(--border)] bg-[var(--bg)] relative overflow-hidden">
      <div className="absolute inset-0 bg-[var(--accent)]/5 pattern-grid-lg opacity-20"></div>
      <div className="max-w-content mx-auto px-6 py-32 md:py-48 text-center relative z-10 flex flex-col items-center">
        <span className="font-mono text-sm uppercase tracking-[0.3em] text-[var(--accent)] mb-8 flex items-center justify-center gap-4">
          <span className="w-12 h-px bg-[var(--accent)]"></span>
          READY FOR DEPLOYMENT
          <span className="w-12 h-px bg-[var(--accent)]"></span>
        </span>
        
        <h2 className="font-display text-6xl md:text-[8rem] leading-none tracking-tight mb-12 uppercase mix-blend-difference text-transparent bg-clip-text bg-gradient-to-b from-[var(--text)] to-[var(--text-muted)]">
          INITIATE<br />PROJECT
        </h2>
        
        <Link
          href="/book"
          className="group relative px-12 py-6 overflow-hidden border border-[var(--accent)] bg-transparent inline-flex items-center justify-center mb-12"
        >
          <span className="relative z-10 font-mono text-lg uppercase tracking-widest text-[var(--text)] group-hover:text-[var(--bg)] font-bold transition-colors duration-300">
            TRANSMIT SPECIFICATIONS
          </span>
          <div className="absolute inset-0 bg-[var(--accent)] transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out z-0"></div>
        </Link>
        
        <div className="font-mono text-sm uppercase tracking-widest text-[var(--text-muted)] flex flex-col md:flex-row items-center gap-4 md:gap-8">
          <span>COMMS: {brand.contactPhone}</span>
          <span className="hidden md:block w-1 h-1 bg-[var(--border)]"></span>
          <a href={`mailto:${brand.contactEmail}`} className="hover:text-[var(--accent)] transition-colors">
            {brand.contactEmail}
          </a>
        </div>
      </div>
    </section>
  );
}
