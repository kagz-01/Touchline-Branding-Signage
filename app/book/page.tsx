import { getBrandFromHeaders } from '@/lib/get-brand-server';
import { getBrand } from '@/config/brands';
import { redirect } from 'next/navigation';
import { BookingForm } from '@/components/BookingForm';

export default function BookPage() {
  const brandId = getBrandFromHeaders();
  if (brandId === 'hub') redirect('/');
  const brand = getBrand(brandId);

  return (
    <div className="max-w-content mx-auto px-6 py-12 md:py-16">
      <p className="text-xs uppercase tracking-[0.2em] text-[var(--accent)] mb-3">Book a site visit or request a quote</p>
      <h1 className="font-display text-3xl md:text-4xl max-w-xl mb-3">Tell us what you need.</h1>
      <p className="text-[var(--text-muted)] max-w-xl mb-10">
        A few details and we'll be in touch to confirm a site visit or send a quote \u2014 usually within one working day, for {brand.name}.
      </p>
      <BookingForm />
    </div>
  );
}
