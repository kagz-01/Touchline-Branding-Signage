import type { BrandId } from '@/lib/brand';

/**
 * Placeholder inline wordmarks so the site looks finished out of the box.
 * Swap these for your real logo files whenever they're ready \u2014
 * drop an <img src="/logos/branding.svg" /> (or .png) in here instead.
 */
export function Logo({ brand, className = '' }: { brand: BrandId; className?: string }) {
  if (brand === 'branding') {
    return (
      <div className={`inline-flex items-baseline gap-1 font-display ${className}`}>
        <span className="text-[var(--accent)]">TOUCHLINE</span>
        <span className="text-[var(--text)] text-[0.6em] tracking-[0.2em] uppercase">Branding</span>
      </div>
    );
  }

  if (brand === 'signage') {
    return (
      <div className={`inline-flex items-baseline gap-1 font-display led-text ${className}`}>
        <span className="text-[var(--accent)]">TOUCHLINE</span>
        <span className="text-[var(--text)] text-[0.6em] tracking-[0.2em] uppercase">Signage</span>
      </div>
    );
  }

  return (
    <div className={`inline-flex items-baseline gap-2 font-display ${className}`}>
      <span className="bg-gradient-to-r from-[#d9e85c] to-[#33e1ed] bg-clip-text text-transparent">
        TOUCHLINE
      </span>
    </div>
  );
}
