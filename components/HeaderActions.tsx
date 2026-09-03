'use client';

import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';

export function HeaderActions({ brand }: { brand: 'branding' | 'signage' | 'hub' }) {
  return (
    <div className="flex items-center gap-3">
      <ThemeToggle />
      <Link
        href="/book"
        className="btn-primary text-sm py-2 px-5"
      >
        Get a Quote <span className="hidden sm:inline">→</span>
      </Link>
    </div>
  );
}
