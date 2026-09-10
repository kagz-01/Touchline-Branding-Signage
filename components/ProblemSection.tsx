import { Reveal } from './Reveal';

export function ProblemSection({
  headline,
  body,
  kicker = 'THE PROBLEM',
}: {
  headline: string;
  body: string;
  kicker?: string;
}) {
  return (
    <section className="section-py bg-[var(--bg)]">
      <div className="max-w-content mx-auto px-6">
        <Reveal>
          <div className="max-w-3xl">
            <h2 className="font-display text-3xl md:text-5xl leading-tight mb-6 text-[var(--text)]">
              {headline}
            </h2>
            <p className="text-lg text-[var(--text-muted)] leading-relaxed max-w-2xl">
              {body}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
