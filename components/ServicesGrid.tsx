import Link from 'next/link';
import type { BrandConfig } from '@/config/brands';
import { Reveal } from './Reveal';

// Simple icon map — kept inline so we avoid adding an icon library dependency
const ICONS: Record<string, string> = {
  // Branding
  'Apparel & Uniforms': '👕',
  'Promotional Products': '🎁',
  'Branded Packaging': '📦',
  'Event Merchandise': '🎪',
  'Corporate Gifts': '🏷️',
  // Signage
  'LED & Illuminated Signs': '💡',
  'Vehicle Branding': '🚐',
  'Building Fascia': '🏢',
  'Wayfinding & Interior': '🗺️',
  'Outdoor Billboards': '🪧',
  // Fallback
  default: '✦',
};

export function ServicesGrid({ brand, limit }: { brand: BrandConfig; limit?: number }) {
  const services = limit ? brand.services.slice(0, limit) : brand.services;

  return (
    <section className="bg-[var(--bg-soft)]">
      <div className="max-w-content mx-auto px-6 py-24">
        <Reveal>
          <div className="text-center mb-16">
            <p className="text-sm font-medium text-[var(--accent)] uppercase tracking-widest mb-4">
              What We Do
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-[var(--text)] mb-4">
              Our <span className="accent-word">Capabilities</span>
            </h2>
            <p className="text-[var(--text-muted)] text-lg max-w-xl mx-auto">
              Every service is handled in-house from sourcing to delivery — no middlemen, no surprises.
            </p>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const icon = ICONS[service.name] || ICONS.default;
            const encodedService = encodeURIComponent(service.name);
            return (
              <Reveal key={service.name} delay={i * 80}>
                <div className="card-editorial group p-8 h-full flex flex-col">
                  {/* Icon */}
                  <span className="text-3xl mb-5 block" role="img" aria-label={service.name}>
                    {icon}
                  </span>

                  {/* Title — editorial italic serif */}
                  <h3 className="font-editorial italic text-xl text-[var(--text)] mb-3 group-hover:text-[var(--accent)] transition-colors duration-300">
                    {service.name}
                  </h3>

                  {/* Description */}
                  <p className="text-[var(--text-muted)] text-sm leading-relaxed flex-1">
                    {service.description}
                  </p>

                  {/* CTA */}
                  <Link
                    href={`/book?service=${encodedService}`}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[var(--accent)] hover:gap-3 transition-all duration-200"
                  >
                    Get a quote <span>→</span>
                  </Link>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}


export function ServicesGrid({ brand, limit }: { brand: BrandConfig; limit?: number }) {
  const services = limit ? brand.services.slice(0, limit) : brand.services;

