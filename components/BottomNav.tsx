'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { BrandConfig } from '@/config/brands';

const HomeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 sm:w-5 sm:h-5">
    <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" />
    <path d="M9 21V12h6v9" />
  </svg>
);

const CatalogIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 sm:w-5 sm:h-5">
    <rect x="3" y="3" width="7" height="7" rx="1.5" />
    <rect x="14" y="3" width="7" height="7" rx="1.5" />
    <rect x="3" y="14" width="7" height="7" rx="1.5" />
    <rect x="14" y="14" width="7" height="7" rx="1.5" />
  </svg>
);

const WhatsAppNavIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const QuoteIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 sm:w-5 sm:h-5">
    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
    <line x1="9" y1="10" x2="15" y2="10" />
    <line x1="9" y1="14" x2="13" y2="14" />
  </svg>
);

export function BottomNav({ brand }: { brand: BrandConfig | null }) {
  const pathname = usePathname();

  // Hide on admin and client dashboard
  if (pathname?.startsWith('/admin') || pathname?.startsWith('/client-dashboard')) return null;

  const isBranding = brand?.id === 'branding' || pathname?.startsWith('/branding');
  const isSignage = brand?.id === 'signage' || pathname?.startsWith('/signage');
  const isHub = !isBranding && !isSignage;

  const homeHref = isBranding ? '/branding' : isSignage ? '/signage' : '/';
  const homeLabel = isHub ? 'Hub' : 'Home';
  const servicesHref = isBranding ? '/services?brand=branding' : isSignage ? '/services?brand=signage' : '/services';
  const quoteHref = isBranding ? '/book?brand=branding' : isSignage ? '/book?brand=signage' : '/book';

  const items = [
    {
      href: homeHref,
      label: homeLabel,
      Icon: HomeIcon,
      active: pathname === homeHref || (pathname === '/' && homeHref === '/'),
      isExternal: false,
    },
    {
      href: servicesHref,
      label: 'Services',
      Icon: CatalogIcon,
      active: pathname?.startsWith('/services') || pathname?.startsWith('/portfolio'),
      isExternal: false,
    },
    {
      href: 'https://wa.me/254700000000?text=Hello%20Touchline,%20I%20would%20like%20to%20enquire%20about%20a%20project',
      label: 'WhatsApp',
      Icon: WhatsAppNavIcon,
      active: false,
      isExternal: true,
    },
    {
      href: quoteHref,
      label: 'Quote',
      Icon: QuoteIcon,
      active: pathname?.startsWith('/book'),
      isExternal: false,
    },
  ];

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-[var(--border)] select-none"
      style={{
        background: 'color-mix(in srgb, var(--surface) 90%, transparent)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
      }}
    >
      {/* Rigid Flexbox Row: Guaranteed 100% horizontal single-line layout */}
      <div
        className="flex flex-row items-stretch justify-around w-full h-14"
        style={{
          paddingBottom: 'env(safe-area-inset-bottom, 0px)',
          minHeight: '3.5rem',
        }}
      >
        {items.map((item) => {
          const Tag = item.isExternal ? 'a' : Link;
          const externalProps = item.isExternal
            ? { target: '_blank', rel: 'noopener noreferrer' }
            : {};
          const active = item.active;

          return (
            <Tag
              key={item.label}
              href={item.href}
              {...externalProps}
              className={`flex-1 min-w-0 flex flex-col items-center justify-center gap-1 text-[10px] font-mono uppercase tracking-wider transition-all duration-150 active:scale-95 ${
                active ? 'text-[var(--accent)] font-bold' : 'text-[var(--text-muted)] hover:text-[var(--text)]'
              }`}
            >
              <div
                className={`relative px-3 py-1 rounded-full flex items-center justify-center transition-colors ${
                  active ? 'bg-[var(--accent)]/15' : ''
                }`}
              >
                <item.Icon />
              </div>
              <span className="truncate text-[9px] font-semibold">{item.label}</span>
            </Tag>
          );
        })}
      </div>
    </nav>
  );
}
