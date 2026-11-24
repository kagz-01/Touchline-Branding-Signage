'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from './ThemeToggle';
import { HeaderAuthButton } from './HeaderAuthButton';

interface MobileNavigationProps {
  currentBrandId?: string;
  host?: string;
  brandingUrl: string;
  signageUrl: string;
  giftshopUrl: string;
  awardsUrl: string;
}

export function MobileNavigation({
  currentBrandId = 'hub',
  brandingUrl,
  signageUrl,
  giftshopUrl,
  awardsUrl,
}: MobileNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close drawer on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent background scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const brandPills = [
    {
      id: 'hub',
      label: 'Hub',
      href: '/',
      color: '#c8960c',
      active: pathname === '/' || pathname === '',
      isExternal: false,
    },
    {
      id: 'branding',
      label: 'Branding',
      href: brandingUrl,
      color: '#c8960c',
      active: pathname?.startsWith('/branding'),
      isExternal: brandingUrl.startsWith('http'),
    },
    {
      id: 'signage',
      label: 'Signage',
      href: signageUrl,
      color: '#0070f3',
      active: pathname?.startsWith('/signage'),
      isExternal: signageUrl.startsWith('http'),
    },
    {
      id: 'giftshop',
      label: 'GiftShop ↗',
      href: giftshopUrl,
      color: '#9B1B5A',
      active: false,
      isExternal: true,
    },
    {
      id: 'awards',
      label: 'Awards ↗',
      href: awardsUrl,
      color: '#9B2345',
      active: false,
      isExternal: true,
    },
  ];

  return (
    <>
      {/* ── 1. Mobile Top Controls (Hamburger + Theme + Quote) ── */}
      <div className="flex lg:hidden items-center gap-1.5 sm:gap-2">
        <ThemeToggle />
        <HeaderAuthButton mobile />
        <Link
          href="/book"
          className="btn-primary text-[11px] sm:text-xs font-semibold py-1.5 px-2.5 sm:px-3 rounded-lg shadow-sm"
        >
          Quote
        </Link>
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Open mobile navigation menu"
          className="w-8 h-8 rounded-lg flex items-center justify-center bg-[var(--surface)] border border-[var(--border)] text-[var(--text)] hover:border-[var(--accent)] transition-colors active:scale-95"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* ── 2. Mobile Horizontal Brand Rail (Sticky under Header) ── */}
      <div className="lg:hidden w-full overflow-x-auto scrollbar-none py-1.5 px-3 border-t border-[var(--border)] bg-[var(--surface)]/90 backdrop-blur-md flex items-center gap-1.5 text-xs">
        {brandPills.map((pill) => {
          const Tag = pill.isExternal ? 'a' : Link;
          const externalProps = pill.isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {};

          return (
            <Tag
              key={pill.id}
              href={pill.href}
              {...externalProps}
              className={`shrink-0 flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider font-semibold transition-all ${
                pill.active
                  ? 'bg-[var(--accent)]/15 text-[var(--accent)] border border-[var(--accent)]/30 shadow-xs'
                  : 'text-[var(--text-muted)] bg-[var(--bg-soft)] border border-[var(--border)] hover:text-[var(--text)]'
              }`}
            >
              <span
                className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{ backgroundColor: pill.color }}
              />
              <span>{pill.label}</span>
            </Tag>
          );
        })}
      </div>

      {/* ── 3. Full-Screen / Side Drawer ── */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop Scrim */}
          <div
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm animate-fade-in transition-opacity"
          />

          {/* Drawer Sheet */}
          <div className="relative ml-auto w-[85%] max-w-sm h-full bg-[var(--surface)] border-l border-[var(--border)] p-5 flex flex-col justify-between overflow-y-auto z-10 shadow-2xl">
            {/* Top Bar */}
            <div>
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-[var(--border)]">
                <span className="font-mono text-xs uppercase tracking-wider text-[var(--text-muted)] font-semibold">
                  Ecosystem Navigation
                </span>
                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Close menu"
                  className="w-8 h-8 rounded-lg flex items-center justify-center bg-[var(--bg-soft)] border border-[var(--border)] text-[var(--text)] hover:text-red-400 active:scale-95 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* The 4 Divisions Matrix */}
              <div className="space-y-2 mb-6">
                <div className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-wider mb-2 font-semibold">
                  Four Divisions · One Ecosystem
                </div>

                {/* Hub */}
                <Link
                  href="/"
                  className={`block p-3 rounded-xl border transition-all ${
                    pathname === '/'
                      ? 'bg-[var(--accent)]/10 border-[var(--accent)]/40 shadow-xs'
                      : 'bg-[var(--bg)] border-[var(--border)] hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="font-display text-sm font-semibold text-[var(--text)]">Touchline Hub</span>
                    <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-[var(--bg-soft)] text-[var(--accent)] font-bold">
                      CENTRAL
                    </span>
                  </div>
                  <p className="text-[11px] text-[var(--text-muted)]">Unified ecosystem cockpit & physical brand production.</p>
                </Link>

                {/* Branding */}
                <a
                  href={brandingUrl}
                  className="block p-3 rounded-xl border border-[var(--border)] bg-[var(--bg)] hover:border-[#c8960c]/50 transition-all group"
                >
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="font-display text-sm font-semibold text-[var(--text)] group-hover:text-[#c8960c] transition-colors">
                      Touchline Branding
                    </span>
                    <span className="w-2 h-2 rounded-full bg-[#c8960c]" />
                  </div>
                  <p className="text-[11px] text-[var(--text-muted)]">Commercial apparel, uniforms & corporate merchandise.</p>
                </a>

                {/* Signage */}
                <a
                  href={signageUrl}
                  className="block p-3 rounded-xl border border-[var(--border)] bg-[var(--bg)] hover:border-[#0070f3]/50 transition-all group"
                >
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="font-display text-sm font-semibold text-[var(--text)] group-hover:text-[#0070f3] transition-colors">
                      Touchline Signage
                    </span>
                    <span className="w-2 h-2 rounded-full bg-[#0070f3]" />
                  </div>
                  <p className="text-[11px] text-[var(--text-muted)]">3D illuminated letters, highway pylons & wayfinding.</p>
                </a>

                {/* TouchGiftShop */}
                <a
                  href={giftshopUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-3 rounded-xl border border-[var(--border)] bg-[var(--bg)] hover:border-[#9B1B5A]/50 transition-all group"
                >
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="font-display text-sm font-semibold text-[var(--text)] group-hover:text-[#9B1B5A] transition-colors flex items-center gap-1">
                      TouchGiftShop <span className="text-[10px]">↗</span>
                    </span>
                    <span className="w-2 h-2 rounded-full bg-[#9B1B5A]" />
                  </div>
                  <p className="text-[11px] text-[var(--text-muted)]">Curated hampers, Pool a Gift™ & executive gifting.</p>
                </a>

                {/* TouchAwards */}
                <a
                  href={awardsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-3 rounded-xl border border-[var(--border)] bg-[var(--bg)] hover:border-[#9B2345]/50 transition-all group"
                >
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="font-display text-sm font-semibold text-[var(--text)] group-hover:text-[#9B2345] transition-colors flex items-center gap-1">
                      Touchline Awards <span className="text-[10px]">↗</span>
                    </span>
                    <span className="w-2 h-2 rounded-full bg-[#9B2345]" />
                  </div>
                  <p className="text-[11px] text-[var(--text-muted)]">K9 optical crystal trophies & laser engraved plaques.</p>
                </a>
              </div>

              {/* Quick Jump Links */}
              <div className="space-y-1 mb-6 border-t border-[var(--border)] pt-4">
                <Link
                  href="/services"
                  className="block px-3 py-2 rounded-lg text-xs font-medium text-[var(--text)] hover:bg-[var(--bg-soft)] transition-colors"
                >
                  All Ecosystem Services
                </Link>
                <Link
                  href="/portfolio"
                  className="block px-3 py-2 rounded-lg text-xs font-medium text-[var(--text)] hover:bg-[var(--bg-soft)] transition-colors"
                >
                  Client Portfolio & Case Studies
                </Link>
                <Link
                  href="/how-it-works"
                  className="block px-3 py-2 rounded-lg text-xs font-medium text-[var(--text)] hover:bg-[var(--bg-soft)] transition-colors"
                >
                  Operations & Factory Handover
                </Link>
                <Link
                  href="/contact"
                  className="block px-3 py-2 rounded-lg text-xs font-medium text-[var(--text)] hover:bg-[var(--bg-soft)] transition-colors"
                >
                  Contact & Nairobi Showroom
                </Link>
              </div>
            </div>

            {/* Bottom Contact & Action */}
            <div className="border-t border-[var(--border)] pt-4 space-y-2.5">
              <a
                href="https://wa.me/254700000000?text=Hello%20Touchline%20Group,%20I%20need%20a%20quotation"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-emerald-600/15 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-semibold hover:bg-emerald-600/25 transition-all"
              >
                <span>WhatsApp Desk Hotline ↗</span>
              </a>

              <Link
                href="/book"
                className="w-full btn-primary text-xs font-semibold py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 shadow-md"
              >
                Request TouchDesk Quote <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
