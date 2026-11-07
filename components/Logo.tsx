import type { BrandId } from '@/lib/brand';
import Image from 'next/image';

// Use the high-contrast dark-mode logo (vibrant mark + crisp light typography)
// as a single, consistent logo source to prevent duplicate image flashes or layout shifts.
import hubLightInk from '@/public/Logos/touchline-light.png';
import brandingLightInk from '@/public/Logos/branding-light.png';
import signageLightInk from '@/public/Logos/signage-light.png';

const LOGO_MAP: Record<BrandId, { src: any; alt: string; width: number; height: number }> = {
  hub: { src: hubLightInk, alt: 'Touchline', width: 2059, height: 399 },
  branding: { src: brandingLightInk, alt: 'Touchline Branding', width: 2068, height: 642 },
  signage: { src: signageLightInk, alt: 'Touchline Signage', width: 1181, height: 375 },
};

export function Logo({
  brand,
  className = 'h-7 sm:h-8 w-auto',
}: {
  brand: BrandId;
  className?: string;
}) {
  const logo = LOGO_MAP[brand] || LOGO_MAP.hub;

  return (
    <span className="inline-flex items-center flex-shrink-0 select-none">
      <Image
        src={logo.src}
        alt={logo.alt}
        width={logo.width}
        height={logo.height}
        className={`${className} object-contain transition-transform duration-200 group-hover:scale-[1.02]`}
        priority
      />
    </span>
  );
}
