'use client';

import React from 'react';

interface ClientItem {
  id: string;
  name: string;
  short: string;
  sector: string;
  scope: string;
  brandColor: string;
  badgeBg: string;
  icon: React.ReactNode;
}

// Track 1: Government, Public Authorities & Key Institutions
const PUBLIC_SECTOR_CLIENTS: ClientItem[] = [
  {
    id: 'red-cross',
    name: 'Kenya Red Cross Society',
    short: 'KENYA RED CROSS',
    sector: 'Humanitarian & Emergency Services',
    scope: 'Disaster Relief Kits & Fleet Branding',
    brandColor: '#E02B20',
    badgeBg: 'rgba(224, 43, 32, 0.12)',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-6 h-6">
        <rect width="32" height="32" rx="8" fill="#E02B20" />
        <path d="M13 7h6v7h7v6h-7v7h-6v-7H6v-6h7V7z" fill="#FFFFFF" />
      </svg>
    ),
  },
  {
    id: 'kpa',
    name: 'Kenya Ports Authority',
    short: 'KENYA PORTS AUTHORITY',
    sector: 'Maritime & Port Infrastructure',
    scope: 'Heavy Industrial Signs & Security Uniforms',
    brandColor: '#0072CE',
    badgeBg: 'rgba(0, 114, 206, 0.12)',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-6 h-6">
        <rect width="32" height="32" rx="8" fill="#003366" />
        {/* Maritime Anchor Symbol */}
        <circle cx="16" cy="11" r="3" stroke="#00A3E0" strokeWidth="2" fill="none" />
        <path d="M16 14v12M10 18h12M9 22c1.5 3 4.5 4 7 4s5.5-1 7-4" stroke="#FFD100" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'kerra',
    name: 'Kenya Rural Roads Authority',
    short: 'KeRRA',
    sector: 'State Corporation / Infrastructure',
    scope: 'Reflective Site Pylons & Engineer Apparel',
    brandColor: '#007A3D',
    badgeBg: 'rgba(0, 122, 61, 0.12)',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-6 h-6">
        <rect width="32" height="32" rx="8" fill="#004D25" />
        {/* Road Highway Network Lines */}
        <path d="M11 26L14 8M21 26L18 8" stroke="#F2A900" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M16 11v3M16 18v3" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'jkuat',
    name: 'JKUAT University',
    short: 'JKUAT',
    sector: 'Higher Education & Research',
    scope: 'Graduation Awards & Architectural Signboards',
    brandColor: '#0F5132',
    badgeBg: 'rgba(15, 81, 50, 0.12)',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-6 h-6">
        <rect width="32" height="32" rx="8" fill="#0A3622" />
        {/* Academic Mortarboard & Gear */}
        <path d="M16 8L7 13l9 5 9-5-9-5z" fill="#D4AF37" />
        <path d="M10 16.5v5c0 2 2.7 3.5 6 3.5s6-1.5 6-3.5v-5" stroke="#FFFFFF" strokeWidth="1.8" fill="none" />
        <path d="M23 14.5v6" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'ca-kenya',
    name: 'Communications Authority of Kenya',
    short: 'CA KENYA',
    sector: 'Telecommunications Regulator',
    scope: 'Conference Signage, Exhibition Booths & Merch',
    brandColor: '#00529B',
    badgeBg: 'rgba(0, 82, 155, 0.12)',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-6 h-6">
        <rect width="32" height="32" rx="8" fill="#0A2540" />
        {/* Broadcast Radio Waves */}
        <circle cx="16" cy="16" r="2.5" fill="#FFB800" />
        <path d="M11 11a7 7 0 0110 0M8 8a11 11 0 0116 0" stroke="#00A3E0" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'track-trace',
    name: 'Track & Trace Solutions Ltd',
    short: 'TRACK & TRACE',
    sector: 'Supply Chain & IoT Logistics',
    scope: 'Vehicle Fleet Wraps & Industrial Barcode Signs',
    brandColor: '#FF6600',
    badgeBg: 'rgba(255, 102, 0, 0.12)',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-6 h-6">
        <rect width="32" height="32" rx="8" fill="#1C1917" />
        {/* GPS Pin & Route Trail */}
        <path d="M16 7c-3.3 0-6 2.7-6 6 0 4.5 6 12 6 12s6-7.5 6-12c0-3.3-2.7-6-6-6z" fill="#FF6600" />
        <circle cx="16" cy="13" r="2.2" fill="#FFFFFF" />
      </svg>
    ),
  },
];

// Track 2: Commercial, Banking, Real Estate & Enterprise
const COMMERCIAL_CLIENTS: ClientItem[] = [
  {
    id: 'family-bank',
    name: 'Family Bank Kenya',
    short: 'FAMILY BANK',
    sector: 'Commercial Banking & Finance',
    scope: 'Branch 3D LED Letters & Corporate Uniforms',
    brandColor: '#008751',
    badgeBg: 'rgba(0, 135, 81, 0.12)',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-6 h-6">
        <rect width="32" height="32" rx="8" fill="#034B2E" />
        {/* Growth Tree Symbol */}
        <path d="M16 25V13M16 13L11 9M16 13l5-4M16 18l-4-3M16 18l4-3" stroke="#F5A623" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="16" cy="7" r="2.5" fill="#00C48C" />
      </svg>
    ),
  },
  {
    id: 'bic',
    name: 'BIC East Africa / Haco',
    short: 'BIC EAST AFRICA',
    sector: 'Global FMCG & Consumer Goods',
    scope: 'Retail Merchandising Displays & Event Kits',
    brandColor: '#FFB800',
    badgeBg: 'rgba(255, 184, 0, 0.12)',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-6 h-6">
        <rect width="32" height="32" rx="8" fill="#FFB800" />
        {/* Iconic Pen Nib Silhouette */}
        <path d="M16 6l4 10h-8l4-10zM16 16v9" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="#000000" />
        <circle cx="16" cy="25" r="1.5" fill="#000000" />
      </svg>
    ),
  },
  {
    id: 'amara-realty',
    name: 'Amara Realty Limited',
    short: 'AMARA REALTY',
    sector: 'Luxury Property & Development',
    scope: 'Estate Monument Pylons & Client Hampers',
    brandColor: '#B45309',
    badgeBg: 'rgba(180, 83, 9, 0.12)',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-6 h-6">
        <rect width="32" height="32" rx="8" fill="#1E1E24" />
        {/* Architectural Monogram */}
        <path d="M8 25L16 7l8 18M11 20h10" stroke="#D4AF37" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'allied-services',
    name: 'Allied Services Group',
    short: 'ALLIED SERVICES',
    sector: 'Industrial Facility Management',
    scope: 'High-Vis Industrial Apparel & Site Safety Signs',
    brandColor: '#0284C7',
    badgeBg: 'rgba(2, 132, 199, 0.12)',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-6 h-6">
        <rect width="32" height="32" rx="8" fill="#0F172A" />
        {/* Interlocking Hexagon */}
        <path d="M16 6l8 4.6v9.2L16 24.4l-8-4.6v-9.2L16 6z" stroke="#38BDF8" strokeWidth="2" fill="none" />
        <circle cx="16" cy="15" r="3" fill="#38BDF8" />
      </svg>
    ),
  },
  {
    id: 'whrb-hub',
    name: 'WHRB HUB',
    short: 'WHRB HUB',
    sector: 'Workforce & Human Resource Hub',
    scope: 'Executive Welcome Kits & Conference Badges',
    brandColor: '#BE185D',
    badgeBg: 'rgba(190, 24, 93, 0.12)',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-6 h-6">
        <rect width="32" height="32" rx="8" fill="#2E1065" />
        {/* Network Connection Nodes */}
        <circle cx="10" cy="16" r="3" fill="#F43F5E" />
        <circle cx="22" cy="10" r="3" fill="#06B6D4" />
        <circle cx="22" cy="22" r="3" fill="#A855F7" />
        <path d="M10 16l12-6M10 16l12 6" stroke="#FFFFFF" strokeWidth="1.8" />
      </svg>
    ),
  },
  {
    id: 'total-energies',
    name: 'Energy & Fuel Station Networks',
    short: 'ENERGY RETAIL',
    sector: 'Commercial Fuel & Retail Canopies',
    scope: 'Illuminated Forecourt Signs & Corporate Wear',
    brandColor: '#DC2626',
    badgeBg: 'rgba(220, 38, 38, 0.12)',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-6 h-6">
        <rect width="32" height="32" rx="8" fill="#18181B" />
        {/* Dynamic Energy Ribbon Wave */}
        <path d="M7 16c4-6 8-6 12 0s8 6 12 0" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M7 20c4-6 8-6 12 0s8 6 12 0" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
];

// Duplicate arrays for continuous infinite loop without jumping
const ROW_ONE = [...PUBLIC_SECTOR_CLIENTS, ...PUBLIC_SECTOR_CLIENTS];
const ROW_TWO = [...COMMERCIAL_CLIENTS, ...COMMERCIAL_CLIENTS];

export function ClientTrustMarquee() {
  return (
    <section
      aria-label="Trusted Enterprise & Public Sector Partners"
      className="relative py-10 sm:py-14 border-y border-[var(--border)] bg-[var(--surface)]/50 backdrop-blur-md overflow-hidden select-none"
    >
      {/* ── Left & Right Cinematic Edge Gradient Fades ────────────── */}
      <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-[var(--bg)] via-[var(--bg)]/80 to-transparent z-20 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-[var(--bg)] via-[var(--bg)]/80 to-transparent z-20 pointer-events-none" />

      <div className="max-w-content mx-auto px-4 sm:px-6 mb-6 sm:mb-8 text-center">
        {/* Kicker badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--bg-soft)] border border-[var(--border)] mb-2.5 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-[var(--text-muted)] font-semibold">
            Verified Production Handover Across Kenya
          </span>
        </div>

        <h3 className="font-display text-xl sm:text-2xl md:text-3xl text-[var(--text)] font-semibold">
          Trusted by Public Authorities, Universities &amp; Enterprises
        </h3>
        <p className="text-xs sm:text-sm text-[var(--text-muted)] max-w-2xl mx-auto mt-1.5">
          From nationwide state corporation tenders to commercial branch networks — engineered under direct Touchline factory oversight.
        </p>
      </div>

      {/* ── TRACK 1: Public Sector & Institutions (Left-to-Right Loop) ── */}
      <div className="flex overflow-hidden mb-3 sm:mb-4">
        <div className="animate-marquee-left flex items-center gap-3 sm:gap-4 py-1">
          {ROW_ONE.map((client, idx) => (
            <div
              key={`track1-${client.id}-${idx}`}
              className="group shrink-0 flex items-center gap-3 px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl bg-[var(--surface)] border border-[var(--border)] hover:border-white/30 transition-all duration-300 shadow-sm hover:shadow-lg cursor-pointer hover:-translate-y-0.5"
              style={{
                // Subtle custom glow on card hover matching client hue
                minWidth: '260px',
              }}
            >
              <div
                className="shrink-0 p-1.5 rounded-lg transition-transform group-hover:scale-110 duration-300"
                style={{ backgroundColor: client.badgeBg }}
              >
                {client.icon}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2 mb-0.5">
                  <h4 className="font-display text-xs sm:text-sm text-[var(--text)] font-bold tracking-tight truncate group-hover:text-[var(--accent)] transition-colors">
                    {client.short}
                  </h4>
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ backgroundColor: client.brandColor }}
                  />
                </div>
                <p className="font-mono text-[9px] sm:text-[10px] text-[var(--text-muted)] truncate block">
                  {client.scope}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── TRACK 2: Commercial, Banking & Retail (Right-to-Left Counter Loop) ── */}
      <div className="flex overflow-hidden">
        <div className="animate-marquee-right flex items-center gap-3 sm:gap-4 py-1">
          {ROW_TWO.map((client, idx) => (
            <div
              key={`track2-${client.id}-${idx}`}
              className="group shrink-0 flex items-center gap-3 px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl bg-[var(--surface)] border border-[var(--border)] hover:border-white/30 transition-all duration-300 shadow-sm hover:shadow-lg cursor-pointer hover:-translate-y-0.5"
              style={{
                minWidth: '260px',
              }}
            >
              <div
                className="shrink-0 p-1.5 rounded-lg transition-transform group-hover:scale-110 duration-300"
                style={{ backgroundColor: client.badgeBg }}
              >
                {client.icon}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2 mb-0.5">
                  <h4 className="font-display text-xs sm:text-sm text-[var(--text)] font-bold tracking-tight truncate group-hover:text-[var(--accent)] transition-colors">
                    {client.short}
                  </h4>
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ backgroundColor: client.brandColor }}
                  />
                </div>
                <p className="font-mono text-[9px] sm:text-[10px] text-[var(--text-muted)] truncate block">
                  {client.scope}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── SEO Schema Microdata (Kenya Client Partnerships) ─────── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'Touchline Group Enterprise & Institutional Clients Kenya',
            description:
              'Official branding, merchandise, 3D architectural signage and award clients serviced by Touchline Group across Kenya.',
            itemListElement: [...PUBLIC_SECTOR_CLIENTS, ...COMMERCIAL_CLIENTS].map((c, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              item: {
                '@type': 'Organization',
                name: c.name,
                description: `${c.sector} — ${c.scope}`,
              },
            })),
          }),
        }}
      />
    </section>
  );
}
