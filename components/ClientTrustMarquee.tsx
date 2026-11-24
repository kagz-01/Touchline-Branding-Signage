'use client';

import React, { useState } from 'react';

// ── Client Logo with graceful text fallback ──────────────────────────
function ClientLogo({
  domain,
  name,
  abbr,
  darkInvert,
}: {
  domain: string;
  name: string;
  abbr?: string;
  darkInvert?: boolean;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    // Text-badge fallback when logo unavailable
    return (
      <div className="h-8 sm:h-9 flex items-center px-3 rounded-lg bg-[var(--bg-soft)] border border-[var(--border)]">
        <span className="font-display font-bold text-xs sm:text-sm text-[var(--text)] tracking-tight whitespace-nowrap">
          {abbr || name}
        </span>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`https://logo.clearbit.com/${domain}`}
      alt={`${name} logo`}
      title={name}
      loading="lazy"
      width={120}
      height={36}
      onError={() => setFailed(true)}
      className={`h-7 sm:h-9 w-auto max-w-[120px] object-contain select-none transition-all duration-300 ${
        darkInvert
          ? 'dark:invert dark:brightness-200 opacity-70 hover:opacity-100 grayscale hover:grayscale-0'
          : 'opacity-70 hover:opacity-100 grayscale hover:grayscale-0'
      }`}
    />
  );
}

// ── All clients. Split into two tracks for counter-scroll effect. ──

interface Client {
  id: string;
  name: string;
  domain: string;
  abbr?: string;
  darkInvert?: boolean;
}

// Track 1 — Public Sector, Institutions, State Corporations
const TRACK_ONE: Client[] = [
  { id: 'redcross', name: 'Kenya Red Cross', domain: 'redcross.or.ke', abbr: 'KRCS' },
  { id: 'kpa', name: 'Kenya Ports Authority', domain: 'kpa.co.ke', abbr: 'KPA' },
  { id: 'kerra', name: 'KeRRA', domain: 'kerra.go.ke', abbr: 'KeRRA' },
  { id: 'jkuat', name: 'JKUAT University', domain: 'jkuat.ac.ke', abbr: 'JKUAT' },
  { id: 'ca', name: 'Communications Authority', domain: 'ca.go.ke', abbr: 'CA Kenya' },
  { id: 'tracktrace', name: 'Track & Trace Ltd', domain: 'trackandtrace.co.ke', abbr: 'Track & Trace' },
  { id: 'whrb', name: 'WHRB HUB', domain: 'whrb.co.ke', abbr: 'WHRB HUB' },
  { id: 'allied', name: 'Allied Services', domain: 'allied.co.ke', abbr: 'Allied Services' },
];

// Track 2 — Banking, Commercial, Real Estate, Consumer Brands
const TRACK_TWO: Client[] = [
  { id: 'familybank', name: 'Family Bank Kenya', domain: 'familybank.co.ke', abbr: 'Family Bank' },
  { id: 'bic', name: 'BIC East Africa', domain: 'bic.com', abbr: 'BIC', darkInvert: true },
  { id: 'amara', name: 'Amara Realty', domain: 'amararealty.co.ke', abbr: 'Amara Realty' },
  { id: 'redcross2', name: 'Kenya Red Cross', domain: 'redcross.or.ke', abbr: 'KRCS' },
  { id: 'kpa2', name: 'Kenya Ports Authority', domain: 'kpa.co.ke', abbr: 'KPA' },
  { id: 'jkuat2', name: 'JKUAT University', domain: 'jkuat.ac.ke', abbr: 'JKUAT' },
  { id: 'bic2', name: 'BIC East Africa', domain: 'bic.com', abbr: 'BIC', darkInvert: true },
  { id: 'familybank2', name: 'Family Bank Kenya', domain: 'familybank.co.ke', abbr: 'Family Bank' },
];

// Duplicate each track so the marquee loops seamlessly without a gap
const ROW_ONE = [...TRACK_ONE, ...TRACK_ONE];
const ROW_TWO = [...TRACK_TWO, ...TRACK_TWO];

export function ClientTrustMarquee() {
  return (
    <section
      aria-label="Trusted by leading Kenyan institutions and enterprises"
      className="relative py-10 sm:py-14 border-y border-[var(--border)] bg-[var(--surface)]/40 backdrop-blur-md overflow-hidden"
    >
      {/* Edge gradient fades for cinematic reveal */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-20 sm:w-40 z-20"
        style={{
          background: 'linear-gradient(to right, var(--bg) 0%, transparent 100%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-20 sm:w-40 z-20"
        style={{
          background: 'linear-gradient(to left, var(--bg) 0%, transparent 100%)',
        }}
      />

      {/* Section Header */}
      <div className="max-w-content mx-auto px-4 sm:px-6 text-center mb-7 sm:mb-9">
        <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[var(--text-muted)] font-semibold">
          Trusted by Kenya&apos;s Public Authorities, Universities &amp; Leading Enterprises
        </p>
      </div>

      {/* ── TRACK 1: Left Scroll ───────────────────────────────────── */}
      <div className="flex overflow-hidden mb-5 sm:mb-6" role="list" aria-label="Public sector clients">
        <div className="animate-marquee-left flex items-center gap-10 sm:gap-14">
          {ROW_ONE.map((client, idx) => (
            <div
              key={`t1-${client.id}-${idx}`}
              role="listitem"
              className="shrink-0 flex items-center"
            >
              <ClientLogo
                domain={client.domain}
                name={client.name}
                abbr={client.abbr}
                darkInvert={client.darkInvert}
              />
            </div>
          ))}
        </div>
      </div>

      {/* ── TRACK 2: Right Scroll ─────────────────────────────────── */}
      <div className="flex overflow-hidden" role="list" aria-label="Commercial and enterprise clients">
        <div className="animate-marquee-right flex items-center gap-10 sm:gap-14">
          {ROW_TWO.map((client, idx) => (
            <div
              key={`t2-${client.id}-${idx}`}
              role="listitem"
              className="shrink-0 flex items-center"
            >
              <ClientLogo
                domain={client.domain}
                name={client.name}
                abbr={client.abbr}
                darkInvert={client.darkInvert}
              />
            </div>
          ))}
        </div>
      </div>

      {/* SEO: Schema.org OrganizationList for indexed partnership signals */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Touchline Group',
            url: 'https://touchlineltd.co.ke',
            knowsAbout: [
              'Branded merchandise Kenya',
              '3D architectural signage Kenya',
              'Corporate uniforms Nairobi',
              'Executive gifts Kenya',
              'Optical crystal trophies Kenya',
            ],
            hasMember: [...TRACK_ONE, ...TRACK_TWO.slice(0, 5)].map((c) => ({
              '@type': 'Organization',
              name: c.name,
              url: `https://${c.domain}`,
            })),
          }),
        }}
      />
    </section>
  );
}
