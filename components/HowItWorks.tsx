import { Reveal } from './Reveal';

type Step = {
  number: string;
  title: string;
  description: string;
};

const DEFAULT_HUB_STEPS: Step[] = [
  {
    number: '01',
    title: 'Tell us what you need',
    description:
      'A 2-minute quote form. Tell us the product, the quantity, and the deadline. We take it from there.',
  },
  {
    number: '02',
    title: 'We handle everything',
    description:
      'Sourcing, branding, fabrication — we own the entire chain. One partner, one timeline, one invoice.',
  },
  {
    number: '03',
    title: 'Ready to use, on spec',
    description:
      'Delivered or installed on time. Quality-checked before it reaches you. No chasing vendors.',
  },
];

export function HowItWorks({
  steps = DEFAULT_HUB_STEPS,
  kicker = 'HOW IT WORKS',
  headline,
}: {
  steps?: Step[];
  kicker?: string;
  headline?: string;
}) {
  return (
    <section className="section-py bg-[var(--bg-soft)]">
      <div className="max-w-content mx-auto px-6">
        <Reveal>
          <div className="text-center mb-16">
            <span className="font-mono text-xs text-[var(--accent)] uppercase tracking-[0.2em] mb-4 block">
              // {kicker}
            </span>
            <h2 className="font-display text-3xl md:text-4xl text-[var(--text)]">
              {headline ?? (
                <>
                  From brief to <span className="accent-word">delivery</span>
                </>
              )}
            </h2>
          </div>
        </Reveal>

        <div className="relative grid md:grid-cols-3 gap-12 md:gap-8">
          {/* Connecting line (desktop only) */}
          <div
            className="hidden md:block absolute top-8 left-[16.67%] right-[16.67%] h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent"
            aria-hidden="true"
          />

          {steps.map((step, i) => (
            <Reveal key={step.number} delay={i * 120}>
              <div className="relative text-center">
                {/* Step number circle */}
                <div className="relative z-10 mx-auto mb-6 w-16 h-16 rounded-full bg-[var(--surface)] border-2 border-[var(--accent)] flex items-center justify-center">
                  <span className="font-mono text-sm font-bold text-[var(--accent)]">
                    {step.number}
                  </span>
                </div>

                <h3 className="font-display text-lg mb-3 text-[var(--text)]">
                  {step.title}
                </h3>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed max-w-[280px] mx-auto">
                  {step.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
