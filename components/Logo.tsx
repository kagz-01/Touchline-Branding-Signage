import type { BrandId } from '@/lib/brand';
import Image from 'next/image';

// Using static imports allows Next.js to automatically determine the correct width,
// height, and aspect ratio of the PNGs, preventing them from stretching or looking "funny".
import hubDark from '@/public/Logos/T-logo-dark.png';
import hubLight from '@/public/Logos/T-logo-light.png';
import brandingDark from '@/public/Logos/Tb-logo-dark.png';
import brandingLight from '@/public/Logos/Tb-logo-light.png';
import signageDark from '@/public/Logos/Ts-logo-dark.png';
import signageLight from '@/public/Logos/Ts-logo-light.png';

const LOGO_MAP: Record<BrandId, { dark: any; light: any; alt: string }> = {
  hub: { dark: hubDark, light: hubLight, alt: 'Touchline' },
  branding: { dark: brandingDark, light: brandingLight, alt: 'Touchline Branding' },
  signage: { dark: signageDark, light: signageLight, alt: 'Touchline Signage' },
};

export function Logo({ brand, className = '' }: { brand: BrandId; className?: string }) {
  const logo = LOGO_MAP[brand];

  return (
    <span className={`inline-flex items-center ${className}`}>
      {/* Light mode logo (hidden in dark mode) */}
      {/* We add a dark drop-shadow here so white text remains visible against a light background */}
      <Image
        src={logo.light}
        alt={logo.alt}
        className="h-auto w-auto max-h-[2.2em] dark:hidden object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.65)]"
        priority
      />
      {/* Dark mode logo (hidden in light mode) */}
      <Image
        src={logo.dark}
        alt={logo.alt}
        className="h-auto w-auto max-h-[2.2em] hidden dark:block object-contain"
        priority
      />
    </span>
  );
}
