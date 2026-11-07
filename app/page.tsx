import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { getBrandFromHeaders } from '@/lib/get-brand-server';
import { getBrand } from '@/config/brands';
import { HubHome } from '@/components/HubHome';
import { BrandingHome } from '@/components/BrandingHome';
import { SignageHome } from '@/components/SignageHome';

export default function HomePage({ searchParams }: { searchParams?: { brand?: string } }) {
  let brandId = getBrandFromHeaders();
  const requestedBrand = searchParams?.brand;

  const h = headers();
  const host = h.get('x-forwarded-host') || h.get('host') || '';
  const isDev = host.includes('localhost') || host.includes('127.0.0.1');

  // On development / localhost, query param ?brand=branding or ?brand=signage switches view without redirecting
  if (isDev && (requestedBrand === 'branding' || requestedBrand === 'signage')) {
    brandId = requestedBrand;
  } else if (!isDev && brandId === 'hub' && (requestedBrand === 'branding' || requestedBrand === 'signage')) {
    redirect(`https://${requestedBrand}.touchlineltd.co.ke/`);
  }

  if (brandId === 'branding') {
    return <BrandingHome />;
  }

  if (brandId === 'signage') {
    return <SignageHome />;
  }

  return <HubHome />;
}
