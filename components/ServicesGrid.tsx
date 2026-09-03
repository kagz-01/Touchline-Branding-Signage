import Link from 'next/link';
import type { BrandConfig } from '@/config/brands';
import { Reveal } from './Reveal';

export function ServicesGrid({ brand, limit }: { brand: BrandConfig; limit?: number }) {
  const categories = limit ? brand.serviceCategories.slice(0, limit) : brand.serviceCategories;

  return (
    <div className="max-w-content mx-auto px-6">
      <Reveal>
        <div className="text-center mb-16">
          <p className="font-mono text-xs text-[var(--accent)] uppercase tracking-[0.2em] mb-4">
            // What we do
          </p>
          <h2 className="font-display text-3xl md:text-4xl text-[var(--text)] mb-4">
            Our <span className="accent-word">capabilities</span>
          </h2>
          <p className="text-[var(--text-muted)] text-lg max-w-xl mx-auto">
            Every service is handled in-house from sourcing to delivery — no middlemen, no surprises.
          </p>
        </div>
      </Reveal>

      <div className="space-y-16">
        {categories.map((category, catIndex) => (
          <Reveal key={category.name} delay={catIndex * 100}>
            <div>
              {/* Category Header */}
              <div className="mb-8 pb-4 border-b border-[var(--border)]">
                <h3 className="font-display text-2xl text-[var(--text)] mb-2">
                  {category.name}
                </h3>
                <p className="text-[var(--text-muted)] text-sm">
                  {category.description}
                </p>
              </div>

              {/* Services Grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.services.map((service, i) => (
                  <div
                    key={service.name}
                    className="card-surface p-6 group"
                  >
                    <h4 className="font-display text-base text-[var(--text)] mb-2 group-hover:text-[var(--accent)] transition-colors">
                      {service.name}
                    </h4>
                    <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-3">
                      {service.description}
                    </p>
                    {service.bestFor && (
                      <p className="text-[10px] font-mono text-[var(--accent)] uppercase tracking-wider">
                        Best for: {service.bestFor}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {limit && categories.length < brand.serviceCategories.length && (
        <Reveal>
          <div className="mt-12 text-center">
            <Link href="/services" className="btn-ghost">
              View all services <span>→</span>
            </Link>
          </div>
        </Reveal>
      )}
    </div>
  );
}
