import type { BrandConfig } from '@/config/brands';

export function Testimonials({ brand }: { brand: BrandConfig }) {
  return (
    <section className="max-w-content mx-auto px-6 py-16">
      <h2 className="font-display text-2xl md:text-3xl mb-8">What clients say</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {brand.testimonials.map((t) => (
          <blockquote
            key={t.name}
            className="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] p-6"
          >
            <p className="text-[var(--text)] mb-4">&ldquo;{t.quote}&rdquo;</p>
            <footer className="text-sm text-[var(--text-muted)]">
              {t.name} &middot; {t.role}
            </footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
}
