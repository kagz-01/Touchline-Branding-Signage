import type { BrandConfig } from '@/config/brands';
import { Reveal } from './Reveal';

export function Testimonials({ brand }: { brand: BrandConfig }) {
  return (
    <section className="section-py">
      <div className="max-w-content mx-auto px-6">
        <Reveal>
          <div className="text-center mb-16">
            <span className="text-mono-label block mb-4">// Client stories</span>
            <h2 className="text-display text-3xl md:text-4xl">
              What clients <span className="accent-word">say</span>
            </h2>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {brand.testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 100}>
              <blockquote className="glass rounded-[var(--radius-md)] p-8 relative group">
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
                  <div className="w-8 h-8 rounded-full bg-[var(--accent)]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[var(--accent)]/20 transition-colors">
                    <span className="font-mono text-xs text-[var(--accent)] font-semibold">
                      {t.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[var(--text)]">{t.name}</p>
                    <p className="text-mono-label text-[9px]">{t.role}</p>
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
