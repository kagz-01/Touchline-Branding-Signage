import { getBrandFromHeaders } from '@/lib/get-brand-server';
import { getBrand } from '@/config/brands';
import { redirect } from 'next/navigation';
import { PortfolioGallery } from '@/components/PortfolioGallery';
import { Testimonials } from '@/components/Testimonials';
import { CTASection } from '@/components/CTASection';
import { getPortfolioMediaForBrand } from '@/lib/portfolio-media';

export default async function PortfolioPage() {
  const brandId = getBrandFromHeaders();
  if (brandId === 'hub') redirect('/');
  const brand = getBrand(brandId);
  const items = await getPortfolioMediaForBrand(brandId);

  return (
    <>
      <div className="max-w-content mx-auto px-6 pt-12">
        <p className="text-xs uppercase tracking-[0.2em] text-[var(--accent)] mb-3">Portfolio</p>
        <h1 className="font-display text-3xl md:text-4xl max-w-2xl">
          Work {brand.name.split(' ')[1]?.toLowerCase()} has delivered.
        </h1>
      </div>
      <PortfolioGallery brand={brand} items={items} />
      <Testimonials brand={brand} />
      <CTASection brand={brand} />
    </>
  );
}
