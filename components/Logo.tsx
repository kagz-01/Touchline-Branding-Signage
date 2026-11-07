import type { BrandId } from '@/lib/brand';
import Image from 'next/image';

import hubLightInk from '@/public/Logos/touchline-light.png';
import hubDarkInk from '@/public/Logos/touchline-dark.png';
import brandingLightInk from '@/public/Logos/branding-light.png';
import brandingDarkInk from '@/public/Logos/branding-dark.png';
import signageLightInk from '@/public/Logos/signage-light.png';
import signageDarkInk from '@/public/Logos/signage-dark.png';

const LOGO_MAP: Record<BrandId, { lightInk: any; darkInk: any; alt: string; width: number; height: number }> = {
  hub: { lightInk: hubLightInk, darkInk: hubDarkInk, alt: 'Touchline', width: 2059, height: 399 },
  branding: { lightInk: brandingLightInk, darkInk: brandingDarkInk, alt: 'Touchline Branding', width: 2068, height: 642 },
  signage: { lightInk: signageLightInk, darkInk: signageDarkInk, alt: 'Touchline Signage', width: 1181, height: 375 },
};

export function Logo({
  brand,
  className = 'h-7 sm:h-8 w-auto',
  forceLight = false,
}: {
  brand: BrandId;
  className?: string;
  forceLight?: boolean;
}) {
  const logo = LOGO_MAP[brand] || LOGO_MAP.hub;

  if (forceLight) {
    return (
      <span className="inline-flex items-center flex-shrink-0 select-none">
        <Image
          src={logo.lightInk}
          alt={logo.alt}
          width={logo.width}
          height={logo.height}
          className={`${className} object-contain`}
          priority
        />
      </span>
    );
  }

  return (
    <span className="inline-flex items-center flex-shrink-0 select-none">
      {/* Light theme uses dark ink */}
      <Image
        src={logo.darkInk}
        alt={logo.alt}
        width={logo.width}
        height={logo.height}
        className={`${className} object-contain dark:hidden`}
        priority
      />
      {/* Dark theme uses light ink */}
      <Image
        src={logo.lightInk}
        alt={logo.alt}
        width={logo.width}
        height={logo.height}
        className={`${className} object-contain hidden dark:inline-block`}
        priority
      />
    </span>
  );
}

