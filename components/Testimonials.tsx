import type { BrandConfig } from '@/config/brands';
import { Reveal } from './Reveal';

export function Testimonials({ brand }: { brand: BrandConfig }) {
  return (
    <section className="section-py bg-[var(--bg-soft)]">
      <div className="max-w-content mx-auto px-6">
        <Reveal>
          <div className="text-center mb-16">
            <p className="font-mono text-xs text-[var(--accent)] uppercase tracking-[0.2em] mb-4">
              // Client stories
            </p>
            <h2 className="font-display text-3xl md:text-4xl text-[var(--text)]">
              What clients <span className="accent-word">say</span>
            </h2>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {brand.testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 100}>
              <blockquote className="card-surface p-8 relative">
                <span
                  className="absolute top-4 right-6 font-editorial text-6xl text-[var(--accent)]/10 leading-none select-none pointer-events-none"
                  aria-hidden="true"
                >
                  &ldquo;
                </span>

                <p className="font-editorial italic text-lg text-[var(--text)] leading-relaxed mb-6 relative z-10">
                  &ldquo;{t.quote}&rdquo;
                </p>

                <footer className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[var(--accent)]/10 flex items-center justify-center flex-shrink-0">
                    <span className="font-mono text-xs text-[var(--accent)] font-semibold">
                      {t.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
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
