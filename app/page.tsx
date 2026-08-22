import { getBrandFromHeaders } from '@/lib/get-brand-server';
import { getBrand } from '@/config/brands';
import { HubHome } from '@/components/HubHome';
import { Hero } from '@/components/Hero';
import { ProcessScroll } from '@/components/ProcessScroll';
import { ServicesGrid } from '@/components/ServicesGrid';
import { PortfolioGallery } from '@/components/PortfolioGallery';
import { Testimonials } from '@/components/Testimonials';
import { CrossSellBanner } from '@/components/CrossSellBanner';
import { CTASection } from '@/components/CTASection';

export default function HomePage() {
  const brandId = getBrandFromHeaders();

  if (brandId === 'hub') {
    return <HubHome />;
  }

  const brand = getBrand(brandId);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: brand.name,
    description: brand.about,
    url: `https://${brand.domain}`,
    telephone: brand.contactPhone,
    email: brand.contactEmail,
    address: { '@type': 'PostalAddress', addressLocality: 'Nairobi', addressCountry: 'KE' },
    areaServed: 'KE',
  };

  return (
    <>
      {/* eslint-disable-next-line react/no-danger */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Hero brand={brand} />
      <ProcessScroll brand={brand} />
      <ServicesGrid brand={brand} limit={6} />
      <PortfolioGallery brand={brand} limit={4} />
      <Testimonials brand={brand} />
      <CrossSellBanner brand={brand} />
      <CTASection brand={brand} />
    </>
  );
}
