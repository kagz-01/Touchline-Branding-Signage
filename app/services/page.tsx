import { getBrandFromHeaders } from '@/lib/get-brand-server';
import { getBrand } from '@/config/brands';
import { redirect } from 'next/navigation';
import { ServicesContent } from '@/components/ServicesContent';
import { SignageContent } from '@/components/SignageContent';

export default function ServicesPage({ searchParams }: { searchParams?: { brand?: string } }) {
  const brandFromHeader = getBrandFromHeaders();
  const requestedBrand = searchParams?.brand;
  
  const effectiveBrandId: 'branding' | 'signage' =
    requestedBrand === 'signage' || brandFromHeader === 'signage'
      ? 'signage'
      : 'branding';

  const brand = getBrand(effectiveBrandId);

  if (effectiveBrandId === 'signage') {
    return <SignageContent brand={brand} />;
  }

  return <ServicesContent brand={brand} />;
}
