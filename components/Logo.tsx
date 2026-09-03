import type { BrandId } from '@/lib/brand';
import Image from 'next/image';

export function Logo({ brand, className = '' }: { brand: BrandId; className?: string }) {
  if (brand === 'branding') {
    return (
      <span className={`inline-flex items-center ${className}`}>
        <Image
          src="/Logos/Tb-logo.png"
          alt="Touchline Branding"
          width={64}
          height={64}
          className="h-auto w-auto max-h-[2.2em]"
          priority
        />
      </span>
    );
  }

  if (brand === 'signage') {
    return (
      <span className={`inline-flex items-center ${className}`}>
        <Image
          src="/Logos/Ts-logo.jpeg"
          alt="Touchline Signage"
          width={64}
          height={64}
          className="h-auto w-auto max-h-[2.2em]"
          priority
        />
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center ${className}`}>
      <Image
        src="/Logos/T-logo.png"
        alt="Touchline"
        width={64}
        height={64}
        className="h-auto w-auto max-h-[2.2em]"
        priority
      />
    </span>
  );
}
