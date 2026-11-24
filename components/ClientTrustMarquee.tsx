'use client';

import React from 'react';
import Image from 'next/image';

interface ClientItem {
  id: string;
  name: string;
  logo: string;
  width: number;
  height: number;
  aspectClass?: string;
}

// Track 1 — Public Sector, State Corporations & Leading Universities
const TRACK_ONE: ClientItem[] = [
  {
    id: 'krcs',
    name: 'Kenya Red Cross',
    logo: '/logos/clients/krcs.png',
    width: 140,
    height: 48,
  },
  {
    id: 'kpa',
    name: 'Kenya Ports Authority',
    logo: '/logos/clients/kpa.png',
    width: 110,
    height: 48,
  },
  {
    id: 'kerra',
    name: 'KeRRA Kenya',
    logo: '/logos/clients/kerra.png',
    width: 130,
    height: 48,
  },
  {
    id: 'jkuat',
    name: 'JKUAT University',
    logo: '/logos/clients/jkuat.png',
    width: 110,
    height: 48,
  },
  {
    id: 'ca',
    name: 'Communications Authority of Kenya',
    logo: '/logos/clients/ca.jpg',
    width: 140,
    height: 48,
  },
  {
    id: 'tracktrace',
    name: 'Track & Trace Solutions',
    logo: '/logos/clients/tracktrace.svg',
    width: 150,
    height: 48,
  },
];

// Track 2 — Commercial, Banking, Real Estate & Consumer Brands
const TRACK_TWO: ClientItem[] = [
  {
    id: 'familybank',
    name: 'Family Bank Kenya',
    logo: '/logos/clients/familybank.jpg',
    width: 150,
    height: 48,
  },
  {
    id: 'bic',
    name: 'BIC East Africa',
    logo: '/logos/clients/bic.svg',
    width: 100,
    height: 48,
  },
  {
    id: 'amara',
    name: 'Amara Realty',
    logo: '/logos/clients/amara.svg',
    width: 140,
    height: 48,
  },
  {
    id: 'whrb',
    name: 'WHRB HUB',
    logo: '/logos/clients/whrb.svg',
    width: 140,
    height: 48,
  },
  {
    id: 'allied',
    name: 'Allied Services',
    logo: '/logos/clients/allied.svg',
    width: 150,
    height: 48,
  },
  {
    id: 'krcs-2',
    name: 'Kenya Red Cross',
    logo: '/logos/clients/krcs.png',
    width: 140,
    height: 48,
  },
  {
    id: 'kpa-2',
    name: 'Kenya Ports Authority',
    logo: '/logos/clients/kpa.png',
    width: 110,
    height: 48,
  },
];

// Duplicate for continuous seamless infinite loop without stutter
const ROW_ONE = [...TRACK_ONE, ...TRACK_ONE];
const ROW_TWO = [...TRACK_TWO, ...TRACK_TWO];

function LogoCard({ client }: { client: ClientItem }) {
  return (
    <div
      title={client.name}
      className="group shrink-0 h-12 sm:h-14 px-4 sm:px-6 rounded-xl bg-white border border-neutral-200 dark:border-white/10 shadow-xs hover:shadow-md flex items-center justify-center transition-all duration-300 hover:scale-105 select-none"
    >
      <div className="relative h-7 sm:h-8 w-auto min-w-[70px] max-w-[130px] flex items-center justify-center filter grayscale opacity-75 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300">
        <Image
          src={client.logo}
          alt={`${client.name} official logo`}
          width={client.width}
          height={client.height}
          className="h-full w-auto object-contain max-h-7 sm:max-h-8"
          priority={false}
          unoptimized
        />
      </div>
    </div>
  );
}

export function ClientTrustMarquee() {
  return (
    <section
      aria-label="Trusted by Kenya's Public Authorities, Universities and Enterprises"
      className="relative py-8 sm:py-12 border-y border-[var(--border)] bg-[var(--surface)]/30 backdrop-blur-sm overflow-hidden select-none"
    >
      {/* ── Cinematic Edge Fade Overlays ──────────────────────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-36 z-20"
        style={{ background: 'linear-gradient(to right, var(--bg) 0%, transparent 100%)' }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-36 z-20"
        style={{ background: 'linear-gradient(to left, var(--bg) 0%, transparent 100%)' }}
      />

      {/* ── Section Title ─────────────────────────────────────────── */}
      <div className="relative z-10 max-w-content mx-auto px-4 sm:px-6 text-center mb-6 sm:mb-8">
        <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[var(--text-muted)] font-semibold">
          Trusted by Kenya&apos;s Public Authorities, Universities &amp; Leading Enterprises
        </p>
      </div>

      {/* ── Track 1: Leftward Auto-Scroll ─────────────────────────── */}
      <div className="flex overflow-hidden mb-3.5 sm:mb-4">
        <div className="animate-marquee-left flex items-center gap-4 sm:gap-6 py-1">
          {ROW_ONE.map((client, idx) => (
            <LogoCard key={`row1-${client.id}-${idx}`} client={client} />
          ))}
        </div>
      </div>

      {/* ── Track 2: Counter Rightward Auto-Scroll ─────────────────── */}
      <div className="flex overflow-hidden">
        <div className="animate-marquee-right flex items-center gap-4 sm:gap-6 py-1">
          {ROW_TWO.map((client, idx) => (
            <LogoCard key={`row2-${client.id}-${idx}`} client={client} />
          ))}
        </div>
      </div>

      {/* ── SEO Schema Microdata ──────────────────────────────────── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Touchline Group',
            url: 'https://touchlineltd.co.ke',
            description:
              'Official branding, merchandise, 3D architectural signage and award clients serviced by Touchline Group across Kenya.',
            hasMember: [...TRACK_ONE, ...TRACK_TWO].map((c) => ({
              '@type': 'Organization',
              name: c.name,
            })),
          }),
        }}
      />
    </section>
  );
}
