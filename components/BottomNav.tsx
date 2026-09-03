'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { BrandConfig } from '@/config/brands';

export function BottomNav({ brand }: { brand: BrandConfig | null }) {
  const pathname = usePathname();

  if (!brand) return null;

  const items = [
    { href: '/', label: 'Home', icon: '○' },
    { href: '/services', label: 'Services', icon: '◇' },
    { href: '/portfolio', label: 'Work', icon: '□' },
    { href: '/book', label: 'Quote', icon: '△' },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 border-t border-[var(--border)] bg-[var(--surface)]/90 backdrop-blur-xl supports-[backdrop-filter]:bg-[var(--surface)]/70">
      <div className="grid grid-cols-4">
        {items.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`py-3 flex flex-col items-center gap-1 text-xs font-medium transition-colors ${
                active ? 'text-[var(--accent)]' : 'text-[var(--text-muted)]'
              }`}
            >
              <span className="text-base leading-none">{item.icon}</span>
              <span>{item.label}</span>
              {active && (
                <span className="w-4 h-0.5 bg-[var(--accent)] rounded-full" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
