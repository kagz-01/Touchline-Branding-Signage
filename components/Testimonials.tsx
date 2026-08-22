import type { BrandConfig } from '@/config/brands';
import { Reveal } from './Reveal';

export function Testimonials({ brand }: { brand: BrandConfig }) {
  return (
    <section className="bg-[var(--bg)] border-t border-[var(--border)]">
      <div className="max-w-content mx-auto px-6 py-24">
        <Reveal>
          <div className="text-center mb-16">
            <p className="text-sm font-medium text-[var(--accent)] uppercase tracking-widest mb-4">
              Client Stories
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-[var(--text)]">
              What clients <span className="accent-word">say</span>
            </h2>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-6">
          {brand.testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 100}>
              <blockquote className="card-editorial p-8 relative">
                {/* Big decorative quotation mark */}
                <span
                  className="absolute top-6 right-8 font-editorial text-8xl text-[var(--accent)]/10 leading-none select-none pointer-events-none"
                  aria-hidden="true"
                >
                  &ldquo;
                </span>

                <p className="font-editorial italic text-lg text-[var(--text)] leading-relaxed mb-6 relative z-10">
                  &ldquo;{t.quote}&rdquo;
                </p>

                <footer className="flex items-center gap-3">
                  <div className="w-8 h-px bg-[var(--accent)]" />
                  <div>
                    <p className="text-sm font-semibold text-[var(--text)]">{t.name}</p>
                    <p className="text-xs text-[var(--text-muted)]">{t.role}</p>
                  </div>
                </footer>
              </blockquote>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

