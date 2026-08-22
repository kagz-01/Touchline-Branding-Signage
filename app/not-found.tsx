import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="max-w-content mx-auto px-6 py-24 text-center">
      <h1 className="font-display text-3xl mb-4">Page not found.</h1>
      <p className="text-[var(--text-muted)] mb-8">That page doesn't exist \u2014 or it moved.</p>
      <Link href="/" className="rounded-[var(--radius-sm)] bg-[var(--accent)] text-[var(--accent-ink)] px-6 py-3 font-semibold">
        Back to home
      </Link>
    </div>
  );
}
