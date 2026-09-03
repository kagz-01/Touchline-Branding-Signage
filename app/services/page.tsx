import { getBrandFromHeaders } from '@/lib/get-brand-server';
import { getBrand } from '@/config/brands';
import { redirect } from 'next/navigation';
import { ServicesGrid } from '@/components/ServicesGrid';
import { CrossSellBanner } from '@/components/CrossSellBanner';
import { CTASection } from '@/components/CTASection';

export default function ServicesPage() {
  const brandId = getBrandFromHeaders();
  if (brandId === 'hub') redirect('/');
  const brand = getBrand(brandId);

  return (
    <>
      <section className="section-py-lg">
        <div className="max-w-content mx-auto px-6">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--accent)] mb-3 font-mono">// Services</p>
          <h1 className="font-display text-3xl md:text-4xl max-w-2xl">{brand.about}</h1>
        </div>
      </section>

      <div className="section-divider" />

      <section className="section-py section-alt">
        <ServicesGrid brand={brand} />
      </section>

      <div className="section-divider" />

      <section className="section-py">
        <CrossSellBanner brand={brand} />
      </section>

      <div className="section-divider" />

      <section className="section-py section-alt">
        <CTASection brand={brand} />
      </section>
    </>
  );
}
