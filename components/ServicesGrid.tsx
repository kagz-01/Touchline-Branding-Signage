import type { BrandConfig } from '@/config/brands';
import { Reveal } from './Reveal';

export function ServicesGrid({ brand, limit }: { brand: BrandConfig; limit?: number }) {
  const services = limit ? brand.services.slice(0, limit) : brand.services;

  return (
    <section className="max-w-content mx-auto px-6 py-24">
      <Reveal>
        <div className="flex items-end justify-between mb-12 border-b border-[var(--border)] pb-4">
          <h2 className="font-display text-4xl md:text-5xl uppercase tracking-wider">CAPABILITIES</h2>
          <span className="font-mono text-xs text-[var(--accent)] hidden md:block">01 // WHAT WE DO</span>
        </div>
      </Reveal>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, i) => (
          <Reveal key={service.name} delay={i * 100}>
            <div className="card-theme group p-8 h-full flex flex-col relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--accent)]/5 rounded-full blur-2xl group-hover:bg-[var(--accent)]/20 transition-colors duration-500"></div>
              <span className="font-mono text-sm text-[var(--accent)] mb-4 block">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="font-display text-2xl mt-2 mb-4 group-hover:text-[var(--accent)] transition-colors duration-300 relative z-10">
                {service.name}
              </h3>
              <p className="text-theme-body text-base flex-1 relative z-10">{service.description}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
