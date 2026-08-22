import { getBrandFromHeaders } from '@/lib/get-brand-server';
import { getBrand } from '@/config/brands';
import { redirect } from 'next/navigation';
import { BookingForm } from '@/components/BookingForm';

export default function BookPage() {
  const brandId = getBrandFromHeaders();
  if (brandId === 'hub') redirect('/');
  const brand = getBrand(brandId);

  return (
    <div className="max-w-content mx-auto px-6 py-16 md:py-32">
      <div className="mb-16 border-b border-[var(--border)] pb-8">
        <p className="font-mono text-sm uppercase tracking-[0.2em] text-[var(--accent)] mb-4 flex items-center gap-4">
          <span className="w-8 h-px bg-[var(--accent)]"></span>
          PROJECT INITIATION
        </p>
        <h1 className="font-display text-4xl md:text-7xl tracking-wide mb-6">
          TRANSMIT <span className="text-[var(--accent)]">SPECIFICATIONS</span>
        </h1>
        <p className="text-theme-body text-xl max-w-2xl border-l-2 border-[var(--border)] pl-6 py-2">
          Submit your requirements and we will contact you to confirm a site visit or issue a quote — usually within one working day for {brand.name}.
        </p>
      </div>
      <BookingForm />
    </div>
  );
}
