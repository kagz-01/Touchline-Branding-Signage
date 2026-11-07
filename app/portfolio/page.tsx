import { getBrandFromHeaders } from '@/lib/get-brand-server';
import { getBrand } from '@/config/brands';
import { PortfolioGallery } from '@/components/PortfolioGallery';
import { Testimonials } from '@/components/Testimonials';
import { CTASection } from '@/components/CTASection';
import { getPortfolioMediaForBrand } from '@/lib/portfolio-media';

export default async function PortfolioPage({ searchParams }: { searchParams?: { brand?: string } }) {
  const brandFromHeader = getBrandFromHeaders();
  const requestedBrand = searchParams?.brand;

  const effectiveBrandId: 'branding' | 'signage' =
    requestedBrand === 'signage' || brandFromHeader === 'signage'
      ? 'signage'
      : 'branding';

  const brand = getBrand(effectiveBrandId);
  const items = await getPortfolioMediaForBrand(effectiveBrandId);
  const isSignage = effectiveBrandId === 'signage';

  return (
    <>
      <div className="relative pt-20 pb-8 overflow-hidden grad-hero-subtle border-b border-[var(--border)]">
        <div className="max-w-content mx-auto px-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] font-mono text-xs uppercase tracking-widest mb-4">
            {isSignage ? 'Signage & Architectural Installations' : 'Branding, Uniforms & Tender Sourcing'}
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-[var(--text)] mb-4 tracking-tight">
            Proven execution across <span className="grad-text">commercial Kenya.</span>
          </h1>
          <p className="text-base md:text-lg text-[var(--text-muted)] max-w-2xl leading-relaxed">
            Explore verified case studies across corporate banking, county tenders, industrial warehousing, and retail chains. Click any project to inspect its physical engineering and material specifications.
          </p>
        </div>
      </div>

      <PortfolioGallery brand={brand} items={items} />
      <Testimonials brand={brand} />
      <CTASection brand={brand} />
    </>
  );
}
