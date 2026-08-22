'use client';

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="max-w-content mx-auto px-6 py-24 text-center">
      <h1 className="font-display text-3xl mb-4">Something went wrong.</h1>
      <p className="text-[var(--text-muted)] mb-8">Give it another try, or head back home.</p>
      <button
        onClick={() => reset()}
        className="rounded-[var(--radius-sm)] bg-[var(--accent)] text-[var(--accent-ink)] px-6 py-3 font-semibold"
      >
        Try again
      </button>
    </div>
  );
}
