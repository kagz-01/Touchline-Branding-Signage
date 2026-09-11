import { getBrandFromHeaders } from '@/lib/get-brand-server';
import { getBrand } from '@/config/brands';
import { HubHome } from '@/components/HubHome';
import { BrandingHome } from '@/components/BrandingHome';
import { SignageHome } from '@/components/SignageHome';
import { Hero } from '@/components/Hero';
import { ProcessScroll } from '@/components/ProcessScroll';
import { ServicesGrid } from '@/components/ServicesGrid';
import { PortfolioGallery } from '@/components/PortfolioGallery';
import { Testimonials } from '@/components/Testimonials';
import { CrossSellBanner } from '@/components/CrossSellBanner';
import { CTASection } from '@/components/CTASection';
import { TrustStrip } from '@/components/TrustStrip';
import { ProblemSection } from '@/components/ProblemSection';

export default function HomePage({ searchParams }: { searchParams?: { brand?: string } }) {
  let brandId = getBrandFromHeaders();

  // Allow ?brand= query param override (hub domain only)
  if (brandId === 'hub' && searchParams?.brand) {
    const param = searchParams.brand;
    if (param === 'branding' || param === 'signage') {
      brandId = param;
    }
  }

  if (brandId === 'hub') {
    return <HubHome />;
  }

  if (brandId === 'branding') {
    return <BrandingHome />;
  }

  if (brandId === 'signage') {
    return <SignageHome />;
  }

  const brand = getBrand(brandId);
  const isBranding = brand.id === 'branding';

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

      <section className="section-py-lg">
        <Hero brand={brand} />
      </section>

      <div className="section-divider" />

      <section className="section-py section-alt">
        <TrustStrip
          items={
            isBranding
              ? [
                  { value: '10K+', label: 'Items sourced & branded' },
                  { value: '4-Day', label: 'Average turnaround' },
                  { value: '500+', label: 'Projects delivered' },
                ]
              : [
                  { value: '200+', label: 'Sites installed' },
                  { value: '5-Year', label: 'Material warranty' },
                  { value: '98%', label: 'On-time delivery' },
                ]
          }
        />
      </section>

      <div className="section-divider" />

      <section className="section-py">
        <ProblemSection
          headline={
            isBranding
              ? 'The promo industry is full of middlemen.'
              : 'Most signs look great on day one.'
          }
          body={
            isBranding
              ? 'You brief one vendor, chase another, and pray the embroidery matches the proof. We own the entire chain — from digitizing your logo to the final stitch. One partner. One timeline. One invoice.'
              : "Ours look great in year five. We don't cut corners to win a quote. We engineer signage using weather-resistant acrylics, UV-stabilized vinyl, and commercial-grade LEDs — so your brand doesn't fade into the background."
          }
        />
      </section>

      <div className="section-divider" />

      <section className="section-py section-alt">
        <ProcessScroll brand={brand} />
      </section>

      <div className="section-divider" />

      <section className="section-py">
        <ServicesGrid brand={brand} limit={6} />
      </section>

      <div className="section-divider" />

      <section className="section-py section-alt">
        <PortfolioGallery brand={brand} limit={4} />
      </section>

      <div className="section-divider" />

      <section className="section-py">
        <Testimonials brand={brand} />
      </section>

      <div className="section-divider" />

      <section className="section-py section-alt">
        <CrossSellBanner brand={brand} />
      </section>

      <div className="section-divider" />

      <section className="section-py">
        <CTASection brand={brand} />
      </section>
    </>
  );
}
