import { getBrandFromHeaders } from '@/lib/get-brand-server';
import { getBrand } from '@/config/brands';
import { redirect } from 'next/navigation';
import { ServicesContent } from '@/components/ServicesContent';
import { SignageContent } from '@/components/SignageContent';

export default function ServicesPage() {
  const brandId = getBrandFromHeaders();
  if (brandId === 'hub') redirect('/');
  const brand = getBrand(brandId);

  if (brandId === 'signage') {
    return <SignageContent brand={brand} />;
  }

  return <ServicesContent brand={brand} />;
}
