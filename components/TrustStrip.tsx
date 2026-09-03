import { Reveal } from './Reveal';

type TrustItem = {
  value: string;
  label: string;
};

export function TrustStrip({ items }: { items: TrustItem[] }) {
  return (
    <Reveal>
      <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 py-8 border-y border-[var(--border)] bg-[var(--bg-soft)]">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-3">
            <span className="font-display text-2xl md:text-3xl text-[var(--accent)]">
              {item.value}
            </span>
            <span className="text-sm text-[var(--text-muted)] max-w-[120px] leading-tight">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </Reveal>
  );
}
