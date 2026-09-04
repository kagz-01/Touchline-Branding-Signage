import { getBrandFromHeaders } from '@/lib/get-brand-server';
import { getBrand } from '@/config/brands';
import { redirect } from 'next/navigation';
import { BookingForm } from '@/components/BookingForm';
import { Parallax } from '@/components/Parallax';

export default function BookPage() {
  const brandId = getBrandFromHeaders();
  if (brandId === 'hub') redirect('/');
  const brand = getBrand(brandId);

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background orbs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="gradient-orb gradient-orb-accent w-[40vw] h-[40vw] -top-[10vw] -right-[10vw] animate-pulse-soft" />
        <div className="gradient-orb gradient-orb-warm w-[30vw] h-[30vw] bottom-0 -left-[10vw] animate-float" />
      </div>

      <div className="relative z-10 max-w-content mx-auto px-6 py-16 md:py-24">
        {/* Header */}
        <Parallax speed={0.2}>
          <div className="mb-16 max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="line-accent" />
              <span className="text-mono-label">// Start a project</span>
            </div>

            <h1 className="text-display text-4xl md:text-6xl mb-6 text-balance">
              Let&apos;s build something <span className="accent-word">together.</span>
            </h1>

            <p className="text-editorial-lg max-w-2xl">
              Tell us what you need — whether it&apos;s 50 branded tote bags or a 12-site signage rollout.
              We&apos;ll review your specs and get back to you within one working day.
            </p>
          </div>
        </Parallax>

        {/* Trust strip */}
        <div className="flex flex-wrap gap-8 mb-16 pb-8 border-b border-[var(--border)]">
          {[
            { icon: '⚡', label: 'Response within 24h' },
            { icon: '🎯', label: 'Free site visit' },
            { icon: '📋', label: 'Detailed quotation' },
            { icon: '🔒', label: 'No obligation' },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <span className="text-lg">{item.icon}</span>
              <span className="text-mono-label text-[9px]">{item.label}</span>
            </div>
          ))}
        </div>

        {/* Form */}
        <BookingForm brand={brand} />
      </div>
    </section>
  );
}
