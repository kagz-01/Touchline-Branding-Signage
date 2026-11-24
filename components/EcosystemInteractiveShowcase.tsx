'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Reveal } from './Reveal';
import { Logo } from './Logo';

type DivisionTab = 'branding' | 'signage' | 'giftshop' | 'awards';

interface ShowcaseItem {
  id: string;
  name: string;
  category: string;
  image: string;
  specs: string[];
  turnaround: string;
  badge: string;
}

const DIVISION_DATA: Record<
  DivisionTab,
  {
    title: string;
    subtitle: string;
    tagline: string;
    domain: string;
    url: string;
    accentColor: string;
    borderGlow: string;
    stats: { label: string; value: string }[];
    items: ShowcaseItem[];
  }
> = {
  branding: {
    title: 'Touchline Branding',
    subtitle: 'Commercial Apparel, Uniforms & Merchandise',
    tagline: 'The merchandise people carry into the boardroom, worksite, and street.',
    domain: 'branding.touchlineltd.co.ke',
    url: '/branding',
    accentColor: '#c8960c',
    borderGlow: 'hover:border-[#c8960c]/70',
    stats: [
      { label: 'Sourced Items', value: '500+' },
      { label: 'Turnaround', value: '3-5 Days' },
      { label: 'Minimum Order', value: '10 Units' },
      { label: 'Tender Scale', value: '50K+ Units' },
    ],
    items: [
      {
        id: 'POL-001',
        name: 'Executive Pique Cotton Polo',
        category: 'Corporate Apparel',
        image: '/images/branding/apparel-executive-polo.webp',
        specs: ['100% Combed Heavy Pique Cotton', '20,000-Stitch High-Density Embroidery', 'Anti-Curl Reinforced Collar'],
        turnaround: '3 - 5 Days',
        badge: 'Best Seller',
      },
      {
        id: 'SET-195',
        name: 'Executive VIP Onboarding Set',
        category: 'Corporate Gift Sets',
        image: '/images/branding/gift-executive-vip-set.webp',
        specs: ['Debossed Leather Journal', 'Thermal Vacuum Flask', 'Soft-Touch Stylus Pen'],
        turnaround: '3 - 5 Days',
        badge: 'VIP Onboarding',
      },
      {
        id: 'SET-207',
        name: 'Luxury Leatherette Desk Collection',
        category: 'Desk & Office',
        image: '/images/branding/gift-luxury-leather-desk.webp',
        specs: ['Gold Foil Inlay Branding', 'Matching Business Card Case', 'Custom Rigid Gift Box'],
        turnaround: '4 - 6 Days',
        badge: 'Executive Desk',
      },
      {
        id: 'SET-254',
        name: 'Premium Tech & Hydration Set',
        category: 'Tech & Lifestyle',
        image: '/images/branding/gift-tech-hydration-set.webp',
        specs: ['Matte Black Thermal Flask', 'Wireless Charging Pad', 'Custom High-Density Foam Cutout'],
        turnaround: '4 - 5 Days',
        badge: 'Modern Tech',
      },
    ],
  },
  signage: {
    title: 'Touchline Signage',
    subtitle: 'Architectural Signs, 3D Letters & Lightboxes',
    tagline: 'The structural installations that command authority and guide customer traffic.',
    domain: 'signage.touchlineltd.co.ke',
    url: '/signage',
    accentColor: '#0070f3',
    borderGlow: 'hover:border-[#0070f3]/70',
    stats: [
      { label: 'Sites Fabricated', value: '200+' },
      { label: 'Outdoor Durability', value: '7+ Years' },
      { label: 'LED Modules', value: 'Samsung IP67' },
      { label: 'Site Clearance', value: 'KenHA & DOSH' },
    ],
    items: [
      {
        id: 'SIG-3D',
        name: '3D Front-Lit Channel Letters',
        category: 'Architectural Facade',
        image: '/images/signage/3d-channel-letters.webp',
        specs: ['Laser-Cut Stainless Returns', 'Cast Optical Diffusing Acrylic', 'IP67 Samsung LED Backing'],
        turnaround: '5 - 7 Days',
        badge: 'Commercial Facade',
      },
      {
        id: 'SIG-BOX',
        name: 'Architectural Fabric & LED Lightbox',
        category: 'Storefront & Interior',
        image: '/images/signage/architectural-fabric-lightbox.webp',
        specs: ['Heavy Extruded Aluminum Frame', 'Even Edge-Lit Illumination', 'Silicone Edge Tension Graphic (SEG)'],
        turnaround: '4 - 5 Days',
        badge: 'Storefront Lightbox',
      },
      {
        id: 'SIG-PYLON',
        name: 'High-Rise Monolith & Pylon Sign',
        category: 'Highway & Monument',
        image: '/images/signage/highway-monolith-pylon.webp',
        specs: ['Internal Structural RHS Steel', 'Wind-Load Certified Engineering', 'Day/Night Dual Luminescence'],
        turnaround: '10 - 14 Days',
        badge: 'Monument Pylon',
      },
      {
        id: 'SIG-WAY',
        name: 'Corporate Directory & Wayfinding Totem',
        category: 'Campus & Wayfinding',
        image: '/images/signage/wayfinding-totem.webp',
        specs: ['Modular Anodized Aluminum Profile', 'Tactile Directional Graphics', 'Weatherproof Standoff Base'],
        turnaround: '4 - 6 Days',
        badge: 'Directional',
      },
    ],
  },
  giftshop: {
    title: 'TouchGiftShop',
    subtitle: 'Curated Hampers & Executive Gifting',
    tagline: 'Kenya’s premium gift delivery platform: Pool a Gift™ group funds, Build a Hamper studio, and photo-proof dispatch.',
    domain: 'touchgiftshop.co.ke',
    url: 'https://touchgiftshop.co.ke',
    accentColor: '#9B1B5A',
    borderGlow: 'hover:border-[#9B1B5A]/70',
    stats: [
      { label: 'Group Funding', value: 'Pool a Gift™' },
      { label: 'Nairobi Delivery', value: 'Same-Day 6 PM' },
      { label: 'Dispatch Guarantee', value: 'Photo Proof' },
      { label: 'Physical Store', value: 'Park Towers' },
    ],
    items: [
      {
        id: 'TGS-POOL',
        name: 'Pool a Gift™ Celebration Hamper Suite',
        category: 'Group Contributions',
        image: '/images/giftshop/giftshop-celebration-hamper.webp',
        specs: ['Shared Contributor Link & Live Ledger', 'Automated M-Pesa Group Pooling', 'Surprise Digital QR Unwrapping Note'],
        turnaround: 'Same-Day Nairobi',
        badge: 'Pool a Gift™',
      },
      {
        id: 'TGS-BOX',
        name: 'Build a Hamper™ Luxury Executive Suite',
        category: 'Modular Curation',
        image: '/images/giftshop/giftshop-luxury-trio-box.webp',
        specs: ['Bespoke Component Selection Studio', 'Handcrafted 1200 GSM Keepsake Box', 'Wax-Sealed Custom Card Note'],
        turnaround: '24 - 48h',
        badge: 'Build a Hamper',
      },
      {
        id: 'TGS-HMP',
        name: 'Curated Wellness & Luxury Perfume Hamper',
        category: 'Curated Hampers',
        image: '/images/giftshop/giftshop-curated-perfume-hamper.webp',
        specs: ['Imported Luxury Fragrance Pairing', 'Photo-Proof Sent to Buyer Before Dispatch', 'Anonymous Sender Toggle Available'],
        turnaround: 'Same-Day / 24h',
        badge: 'Photo-Proof Verified',
      },
      {
        id: 'TGS-PKG',
        name: 'Corporate Portal Milestone & Onboarding Packs',
        category: 'Corporate Accounts',
        image: '/images/giftshop/giftshop-executive-packaging.webp',
        specs: ['Recipient Confirms Address via WhatsApp', 'Automated Birthday & Milestone Gifting', '100% KRA eTIMS Tax Compliant'],
        turnaround: 'On-Demand Dispatch',
        badge: 'Corporate Portal',
      },
    ],
  },
  awards: {
    title: 'Touchline Awards Nairobi',
    subtitle: 'Optical Crystal, Trophies & Recognition Plaques',
    tagline: 'Recognition worth remembering. Tuzo zinazostahili kukumbukwa.',
    domain: 'awards.touchlineltd.co.ke',
    url: 'https://awards.touchlineltd.co.ke',
    accentColor: '#9B2345',
    borderGlow: 'hover:border-[#9B2345]/70',
    stats: [
      { label: 'Award Models', value: '90+ Styles' },
      { label: 'Laser Precision', value: '0.01mm' },
      { label: 'Materials', value: 'Crystal & Teak' },
      { label: 'Dispatch', value: 'Next-Day Blanks' },
    ],
    items: [
      {
        id: 'AWD-004',
        name: 'Prismara Crystal Recognition Pillar',
        category: 'Optical Crystal',
        image: '/images/awards/prismara-crystal-pillar.webp',
        specs: ['Optical K9 Lead-Free Crystal', 'Sub-Surface 3D Laser Etch', 'Diamond-Beveled Facets & Weighted Base'],
        turnaround: '3 - 4 Days',
        badge: 'Excellence Award',
      },
      {
        id: 'AWD-008',
        name: 'KNY-16 Ascendant Crystal Tower',
        category: 'Crystal Towers',
        image: '/images/awards/ascendant-crystal-tower.webp',
        specs: ['Multi-Faceted Monolith Architecture', 'High-Refraction Pristine Clarity', 'Deep Sandblast Frost Inscription'],
        turnaround: '3 - 5 Days',
        badge: 'Leadership Tower',
      },
      {
        id: 'AWD-027',
        name: 'Prestige Flame Achievement Award',
        category: 'Architectural Flame',
        image: '/images/awards/prestige-flame-trophy.webp',
        specs: ['Dual-Tone Amber Glass Flame Contour', 'Hand-Polished Contour Cut', 'Solid Optical Black Crystal Pedestal'],
        turnaround: '2 - 3 Days',
        badge: 'Distinguished Service',
      },
      {
        id: 'AWD-098',
        name: 'African Teak & Float Glass Plaque',
        category: 'Timber Plaques',
        image: '/images/awards/african-teak-glass-plaque.webp',
        specs: ['Kiln-Dried Sustainable African Hardwood', 'Mounted Beveled Float Glass Shield', 'Laser Rotary Cut Lettering'],
        turnaround: '4 - 5 Days',
        badge: 'Board & Long Service',
      },
    ],
  },
};

const MATERIALS_LAB = [
  {
    name: 'K9 Optical Crystal',
    division: 'Touchline Awards',
    rating: '99.8% Light Transmission',
    specs: 'Diamond polished surfaces, scratch-resistant surface hardness, 3D sub-surface laser focal points.',
    iconColor: '#eab308',
  },
  {
    name: 'African Hardwood & Teak',
    division: 'Touchline Awards & Merch',
    rating: 'Class 1 Durability Timber',
    specs: 'Kiln-dried sustainable hardwood, hand-waxed matte sheen, deep contrast laser engraving.',
    iconColor: '#d4a017',
  },
  {
    name: 'Cast 304 Stainless Steel',
    division: 'Touchline Signage',
    rating: 'Marine-Grade Weatherproof',
    specs: 'Non-corrosive facade returns, fiber laser micro-cutting, argon welded structural reinforcement.',
    iconColor: '#0070f3',
  },
  {
    name: '18/8 Double-Wall Steel',
    division: 'Touchline Branding & Gifts',
    rating: '12h Heat / 24h Cold Retention',
    specs: 'BPA-free vacuum insulated core, matte powder-coat exterior, seamless laser engraving.',
    iconColor: '#9B1B5A',
  },
];

export function EcosystemInteractiveShowcase() {
  const [activeTab, setActiveTab] = useState<DivisionTab>('branding');
  const [previewItem, setPreviewItem] = useState<ShowcaseItem | null>(null);
  const [mobileLayout, setMobileLayout] = useState<'carousel' | 'grid'>('carousel');

  const current = DIVISION_DATA[activeTab];

  return (
    <section className="section-py bg-[var(--bg)] border-b border-[var(--border)] relative overflow-hidden">
      <div className="max-w-content mx-auto px-6">
        {/* Section Header */}
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
            <div>
              <h2 className="font-display text-3xl sm:text-5xl text-[var(--text)]">
                Explore The Physical Brand Ecosystem
              </h2>
            </div>
            <p className="text-sm text-[var(--text-muted)] max-w-md">
              Toggle between the 4 divisions to inspect real manufactured items, production specs, and delivery turnarounds.
            </p>
          </div>
        </Reveal>

        {/* ── 4 Division Cockpit Switcher ─────────────────────────── */}
        <Reveal delay={60}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 mb-10">
            {(
              [
                { id: 'branding', num: '01', label: 'Branding & Apparel', color: '#c8960c' },
                { id: 'signage', num: '02', label: 'Architectural Signs', color: '#0070f3' },
                { id: 'giftshop', num: '03', label: 'TouchGiftShop', color: '#9B1B5A' },
                { id: 'awards', num: '04', label: 'Touchline Awards', color: '#9B2345' },
              ] as const
            ).map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`p-3.5 sm:p-4 rounded-xl text-left border transition-all duration-300 relative overflow-hidden ${
                    isActive
                      ? 'bg-[var(--surface)] shadow-lg'
                      : 'bg-[var(--bg-soft)] border-[var(--border)] hover:border-white/20 opacity-80 hover:opacity-100'
                  }`}
                  style={{
                    borderColor: isActive ? tab.color : undefined,
                  }}
                >
                  {isActive && (
                    <div
                      className="absolute top-0 left-0 right-0 h-1"
                      style={{ backgroundColor: tab.color }}
                    />
                  )}
                  <div className="flex items-center justify-between mb-1.5">
                    <span
                      className="font-mono text-[10px] uppercase font-bold tracking-wider"
                      style={{ color: tab.color }}
                    >
                      DIV {tab.num}
                    </span>
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{
                        backgroundColor: tab.color,
                        boxShadow: isActive ? `0 0 10px ${tab.color}` : 'none',
                      }}
                    />
                  </div>
                  <div className="font-display text-sm sm:text-base text-[var(--text)] font-semibold truncate">
                    {tab.label}
                  </div>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* ── Active Division Overview Banner ─────────────────────── */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[var(--surface)] border border-[var(--border)] mb-10 shadow-sm relative overflow-hidden">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="font-mono text-[11px] uppercase tracking-wider font-semibold"
                  style={{ color: current.accentColor }}
                >
                  {current.subtitle}
                </span>
                <span className="text-[var(--text-muted)]">·</span>
                <span className="font-mono text-[11px] text-[var(--text-muted)]">
                  {current.domain}
                </span>
              </div>
              {/* Real logo for giftshop and awards; text title for branding/signage */}
              {activeTab === 'giftshop' ? (
                <div className="mb-3">
                  <Logo brand="giftshop" className="h-10 sm:h-12 w-auto" />
                </div>
              ) : activeTab === 'awards' ? (
                <div className="mb-3">
                  <Logo brand="awards" className="h-8 sm:h-10 w-auto" />
                </div>
              ) : (
                <h3 className="font-display text-2xl sm:text-3xl text-[var(--text)] mb-3">
                  {current.title}
                </h3>
              )}
              <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-6 max-w-xl">
                {current.tagline}
              </p>
              <div className="flex items-center gap-3">
                <a
                  href={current.url}
                  target={current.url.startsWith('http') ? '_blank' : undefined}
                  rel={current.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold text-neutral-950 font-display uppercase tracking-wider transition-all hover:scale-105 flex items-center gap-1.5 shadow-md"
                  style={{ backgroundColor: current.accentColor }}
                >
                  Launch {current.title} <span>↗</span>
                </a>
                <span className="font-mono text-xs text-[var(--text-muted)]">
                  Direct Division Portal
                </span>
              </div>
            </div>

            {/* Quick Stats Matrix */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-3.5">
              {current.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="p-3.5 rounded-xl bg-[var(--bg)] border border-[var(--border)]"
                >
                  <div
                    className="font-display text-xl sm:text-2xl font-bold mb-0.5"
                    style={{ color: current.accentColor }}
                  >
                    {stat.value}
                  </div>
                  <div className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Active Items Photographic Grid (Hybrid Swipe/Grid on Mobile) ── */}
        <div className="flex sm:hidden items-center justify-between mb-3">
          <span className="font-mono text-[10px] uppercase text-[var(--text-muted)] font-semibold">
            {current.items.length} Manufactured Items
          </span>
          <div className="flex items-center gap-1 p-0.5 rounded-lg bg-[var(--surface)] border border-[var(--border)]">
            <button
              type="button"
              onClick={() => setMobileLayout('carousel')}
              className={`px-2.5 py-1 rounded text-[10px] font-mono uppercase tracking-wider transition-all ${
                mobileLayout === 'carousel'
                  ? 'bg-[var(--accent)]/15 text-[var(--accent)] font-bold shadow-xs'
                  : 'text-[var(--text-muted)] hover:text-[var(--text)]'
              }`}
            >
              Swipe
            </button>
            <button
              type="button"
              onClick={() => setMobileLayout('grid')}
              className={`px-2.5 py-1 rounded text-[10px] font-mono uppercase tracking-wider transition-all ${
                mobileLayout === 'grid'
                  ? 'bg-[var(--accent)]/15 text-[var(--accent)] font-bold shadow-xs'
                  : 'text-[var(--text-muted)] hover:text-[var(--text)]'
              }`}
            >
              2-Col
            </button>
          </div>
        </div>

        <div
          className={
            mobileLayout === 'carousel'
              ? 'flex sm:grid overflow-x-auto snap-x snap-mandatory scrollbar-none gap-3 sm:gap-5 pb-3 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid-cols-2 lg:grid-cols-4 mb-14'
              : 'grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-5 mb-14'
          }
        >
          {current.items.map((item) => (
            <div
              key={item.id}
              onClick={() => setPreviewItem(item)}
              className={`card-surface rounded-2xl border border-[var(--border)] hover:border-white/30 p-3 sm:p-4.5 flex flex-col justify-between group cursor-pointer transition-all duration-300 hover:shadow-xl relative overflow-hidden ${
                mobileLayout === 'carousel'
                  ? 'w-[75vw] max-w-[270px] shrink-0 snap-center sm:w-auto'
                  : 'w-full'
              }`}
            >
              <div className="relative h-32 sm:h-52 w-full rounded-xl overflow-hidden bg-black/5 dark:bg-black/30 border border-[var(--border)] mb-2.5 sm:mb-3.5 flex items-center justify-center p-2">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2 left-2 px-1.5 sm:px-2 py-0.5 rounded bg-black/75 backdrop-blur-md text-[8px] sm:text-[9px] font-mono text-white/90 border border-white/10">
                  {item.id}
                </div>
                <div className="absolute top-2 right-2 px-1.5 sm:px-2 py-0.5 rounded bg-black/75 backdrop-blur-md text-[8px] sm:text-[9px] font-mono text-emerald-400 border border-white/10">
                  {item.turnaround}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <span
                    className="font-mono text-[9px] sm:text-[10px] uppercase font-semibold truncate"
                    style={{ color: current.accentColor }}
                  >
                    {item.category}
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-mono text-[var(--text-muted)] shrink-0">
                    {item.badge}
                  </span>
                </div>
                <h4 className="font-display text-xs sm:text-base text-[var(--text)] mb-1.5 sm:mb-2 group-hover:text-[var(--accent)] transition-colors leading-snug line-clamp-1">
                  {item.name}
                </h4>
                <div className="space-y-0.5 sm:space-y-1 mb-2.5 sm:mb-3">
                  {item.specs.slice(0, 2).map((s) => (
                    <div
                      key={s}
                      className="text-[10px] sm:text-[11px] text-[var(--text-muted)] flex items-center gap-1 sm:gap-1.5 truncate"
                    >
                      <span className="text-emerald-500">✓</span>
                      <span>{s}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 sm:pt-2.5 border-t border-[var(--border)] flex items-center justify-between">
                <span className="text-[10px] sm:text-[11px] font-semibold text-[var(--text)] flex items-center gap-1 group-hover:gap-2 transition-all">
                  Inspect Spec <span>→</span>
                </span>
                <span className="text-[10px] font-mono text-[var(--text-muted)]">
                  Click to Zoom
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* ── Materials & Industrial Certification Strip ───────────── */}
        <div className="p-6 rounded-2xl bg-[var(--bg-soft)] border border-[var(--border)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 pb-4 border-b border-[var(--border)] gap-2">
            <div>
              <h4 className="font-display text-lg text-[var(--text)]">
                Industrial Substrates &amp; Tested Materials
              </h4>
            </div>
            <span className="font-mono text-xs text-[var(--text-muted)]">
              No Subcontracted Ambiguity
            </span>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {MATERIALS_LAB.map((mat) => (
              <div
                key={mat.name}
                className="p-4 rounded-xl bg-[var(--bg)] border border-[var(--border)] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: mat.iconColor }}
                    />
                    <div className="font-display text-sm font-semibold text-[var(--text)]">
                      {mat.name}
                    </div>
                  </div>
                  <div className="text-[10px] font-mono text-[var(--text-muted)] mb-2">
                    {mat.division}
                  </div>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-3">
                    {mat.specs}
                  </p>
                </div>
                <div className="pt-2 border-t border-[var(--border)]">
                  <span className="text-[10px] font-mono text-emerald-500 font-semibold">
                    ✓ {mat.rating}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Zoom Preview Lightbox ─────────────────────────────────── */}
      {previewItem && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setPreviewItem(null)}
        >
          <div
            className="bg-[#0b0e14] border border-white/20 rounded-2xl max-w-xl w-full p-6 text-white relative shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setPreviewItem(null)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white font-mono text-xs px-2 py-1 rounded bg-white/10"
            >
              ✕ CLOSE
            </button>

            <div className="relative h-64 w-full rounded-xl overflow-hidden bg-black/50 border border-white/10 mb-4 flex items-center justify-center">
              <Image
                src={previewItem.image}
                alt={previewItem.name}
                fill
                className="object-contain p-3"
              />
            </div>

            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-xs uppercase tracking-wider text-[#d4a017]">
                {previewItem.category}
              </span>
              <span className="font-mono text-xs text-neutral-400">{previewItem.id}</span>
            </div>

            <h3 className="font-display text-2xl mb-2">{previewItem.name}</h3>

            <div className="space-y-1.5 mb-6">
              {previewItem.specs.map((s) => (
                <div key={s} className="flex items-center gap-2 text-xs text-neutral-300">
                  <span className="text-emerald-400">✓</span> {s}
                </div>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <a
                href={current.url}
                target={current.url.startsWith('http') ? '_blank' : undefined}
                rel={current.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="btn-primary flex-1 py-3 text-center text-xs font-semibold rounded-xl"
              >
                Inquire via {current.title} <span>→</span>
              </a>
              <a
                href={`https://wa.me/254722668696?text=Hi%20Touchline%2C%20I%20am%20inquiring%20about%20item%20${encodeURIComponent(
                  previewItem.name
                )}%20(${previewItem.id}).`}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-3 rounded-xl text-xs font-medium bg-white/10 hover:bg-white/15 text-white border border-white/15 transition-all"
              >
                WhatsApp Desk
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
