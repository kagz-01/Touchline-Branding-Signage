'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { BrandId } from '@/lib/brand';
import { ThemeToggle } from './ThemeToggle';

type NavTab = {
  href: string;
  label: string;
  icon: React.ReactNode;
};

const HomeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" />
    <path d="M9 21V12h6v9" />
  </svg>
);

const ServicesIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
);

const PortfolioIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <rect x="2" y="7" width="20" height="14" rx="2" />
    <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
    <line x1="12" y1="12" x2="12" y2="16" />
    <line x1="10" y1="14" x2="14" y2="14" />
  </svg>
);

const QuoteIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
    <line x1="9" y1="10" x2="15" y2="10" />
    <line x1="9" y1="14" x2="13" y2="14" />
  </svg>
);

const NAV_ITEMS: NavTab[] = [
  { href: '/', label: 'Home', icon: <HomeIcon /> },
  { href: '/services', label: 'Services', icon: <ServicesIcon /> },
  { href: '/portfolio', label: 'Portfolio', icon: <PortfolioIcon /> },
  { href: '/book', label: 'Get Quote', icon: <QuoteIcon /> },
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
    <nav className="hidden lg:flex items-center gap-1">
      {NAV_ITEMS.map((tab) => {
        const isActive = pathname === tab.href;
        const isQuote = tab.href === '/book';

        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`relative flex items-center gap-1.5 px-4 py-2 rounded-[var(--radius-md)] text-sm font-medium transition-all duration-200 ${
              isQuote
                ? 'btn-primary text-sm ml-2'
                : isActive
                ? 'text-[var(--accent)] bg-[var(--accent)]/10'
                : 'text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--bg-soft)]'
            }`}
          >
            {tab.icon}
            {tab.label}
            {isActive && !isQuote && (
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-[var(--accent)] rounded-full" />
            )}
          </Link>
        );
      })}

      {/* Divider */}
      <span className="w-px h-5 bg-[var(--border)] mx-2" />

      {/* Back to Hub */}
      <a
        href={hubHref}
        className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors rounded-[var(--radius-md)] hover:bg-[var(--accent)]/5"
      >
        <HomeIcon />
        <span>Hub</span>
      </a>

      {/* Cross-sell link */}
      <a
        href={otherHref}
        className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors rounded-[var(--radius-md)] hover:bg-[var(--accent)]/5"
      >
        <span>{otherLabel}</span>
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </a>

      {/* Theme toggle */}
      <div className="ml-2">
        <ThemeToggle />
      </div>
    </nav>
  );
}
