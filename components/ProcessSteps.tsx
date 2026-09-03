import { Reveal } from './Reveal';

type Step = {
  number: string;
  title: string;
  description: string;
};

export function ProcessSteps({
  kicker = 'HOW IT WORKS',
  steps,
}: {
  kicker?: string;
  steps: Step[];
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
              From brief to <span className="accent-word">deployment</span>
            </h2>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <Reveal key={step.number} delay={i * 100}>
              <div className="relative">
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-6 left-[calc(100%+0.5rem)] w-[calc(100%-1rem)] h-px bg-[var(--border)]" />
                )}
                <div className="font-mono text-xs text-[var(--accent)] uppercase tracking-widest mb-3">
                  {step.number}
                </div>
                <h3 className="font-display text-xl mb-2 text-[var(--text)]">
                  {step.title}
                </h3>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">
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
