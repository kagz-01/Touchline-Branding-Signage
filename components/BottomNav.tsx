'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { BrandConfig } from '@/config/brands';

/** Thumb-reach mobile nav, matches the pattern used on your other Touchline apps. */
export function BottomNav({ brand }: { brand: BrandConfig | null }) {
  const pathname = usePathname();

  if (!brand) return null;

  const items = [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: '/portfolio', label: 'Work' },
    { href: '/book', label: 'Book' }
  ];

  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 border-t border-[var(--border)] bg-[var(--bg-soft)]">
      <div className="grid grid-cols-4">
        {items.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`py-3 text-center text-xs font-medium ${
                active ? 'text-[var(--accent)]' : 'text-[var(--text-muted)]'
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
