'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { BrandId } from '@/lib/brand';
import { ThemeToggle } from './ThemeToggle';
import { HeaderAuthButton } from './HeaderAuthButton';

type NavTab = {
  href: string;
  label: string;
};

const NAV_ITEMS: NavTab[] = [
  { href: '/', label: 'Overview' },
  { href: '/services', label: 'Services' },
  { href: '/portfolio', label: 'Work' },
];

export function SpecialismNav({
  brandId,
  otherBrand,
  otherLabel,
  otherHref,
  hubHref,
}: {
  brandId: BrandId;
  otherBrand: string;
  otherLabel: string;
  otherHref: string;
  hubHref: string;
}) {
  const pathname = usePathname();

  return (
    <div className="hidden lg:flex items-center gap-4">
      {/* Center Nav Pill */}
      <nav className="flex items-center gap-1 p-1 rounded-full bg-[var(--surface)]/90 border border-[var(--border)] shadow-sm backdrop-blur-md">
        {NAV_ITEMS.map((tab) => {
          const isActive = pathname === tab.href;

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`relative px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-200 ${
                isActive
                  ? 'text-[var(--accent)] bg-[var(--accent)]/10 font-semibold shadow-xs'
                  : 'text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--bg-soft)]'
              }`}
            >
              {tab.label}
              {isActive && (
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-3 h-0.5 bg-[var(--accent)] rounded-full" />
              )}
            </Link>
          );
        })}

        <span className="w-px h-3.5 bg-[var(--border)] mx-1" />

        {/* Back to Hub */}
        <a
          href={hubHref}
          className="px-3 py-1.5 rounded-full text-xs font-mono text-[var(--text-muted)] hover:text-[var(--accent)] hover:bg-[var(--bg-soft)] transition-colors"
        >
          Hub
        </a>

        {/* Cross-division link */}
        <a
          href={otherHref}
          className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-mono text-[var(--text-muted)] hover:text-[var(--accent)] hover:bg-[var(--bg-soft)] transition-colors"
        >
          <span>{otherLabel}</span>
          <svg className="w-3 h-3 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </nav>

      {/* Right Controls */}
      <div className="flex items-center gap-2.5">
        <ThemeToggle />
        <HeaderAuthButton />
        <Link
          href="/book"
          className="btn-primary text-xs font-semibold py-2 px-4 rounded-xl shadow-sm hover:shadow transition-all"
        >
          Get Quote <span>→</span>
        </Link>
      </div>
    </div>
  );
}
