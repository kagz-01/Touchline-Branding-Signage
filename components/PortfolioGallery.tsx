'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import type { BrandConfig } from '@/config/brands';
import type { PortfolioItem } from '@/config/brands';
import { Reveal } from './Reveal';
import { BeforeAfterSlider } from './BeforeAfterSlider';
import { ProjectPhoto } from './ProjectPhoto';
import { CrossSellBanner } from './CrossSellBanner';
import { FastQuoteWidget } from './FastQuoteWidget';

export type PortfolioGalleryItem = PortfolioItem & {
  sector?: string;
  clientIndustry?: string;
  specs?: { label: string; value: string }[];
  outcome?: string;
  division?: 'branding' | 'signage';
};

const EXTENDED_PORTFOLIO: PortfolioGalleryItem[] = [
  // ── BRANDING CASE STUDIES ──
  {
    title: 'County Government Executive & Field Uniform Rollout',
    category: 'Tender Fulfilment',
    sector: 'Government & Tenders',
    clientIndustry: 'Public Sector',
    division: 'branding',
    blurb:
      '4,000 branded apparel pieces across 6 county departments, manufactured and delivered against a strict 14-day statutory tender deadline.',
    volume: '4,000 Units',
    deadline: '14 Working Days',
    materials: '240 GSM Poly-Cotton Pique, Sanforized Twill, Enamel Pins',
    image_url: '/images/branding/tender-rollout.jpg',
    outcome: '100% on-time delivery across 8 county sub-stations with zero sizing discrepancies.',
    specs: [
      { label: 'Yarn Weight', value: '240 GSM Heavy Pique & 280 GSM Cotton Drill' },
      { label: 'Branding Method', value: 'Tajima 8-Head High-Density Left Chest Embroidery' },
      { label: 'Quality Certification', value: 'Pre-production strike-off approved in 24 hours' },
      { label: 'Packaging', value: 'Individual polybagging with barcode department labels' },
    ],
  },
  {
    title: 'Commercial Banking Frontline Staff Uniforms',
    category: 'Corporate Apparel',
    sector: 'Banking & Finance',
    clientIndustry: 'Financial Services',
    division: 'branding',
    blurb:
      'Executive branded polos and micro-stitch cardigans for a 350-member branch network across Kenya, engineered for 80+ wash cycles without fading.',
    volume: '1,200 Units',
    deadline: '7 Working Days',
    materials: '65/35 Combed Cotton Pique with anti-pilling wash',
    image_url: '/images/branding/corporate-polos.jpg',
    outcome: 'Zero collar curling after 12 months of daily office wear.',
    specs: [
      { label: 'Fabric Composition', value: '65% Combed Ring-Spun Cotton / 35% Poly' },
      { label: 'Stitch Count', value: '6,200 Stitches per crest (Madeira Polyneon)' },
      { label: 'Collar Tech', value: 'Double-knit ribbed collar with spandex elasticity' },
      { label: 'Reorder Model', value: 'Automated quarterly replenishment via TouchDesk' },
    ],
  },
  {
    title: 'East African Health Summit Delegate Packs',
    category: 'Executive Gifts',
    sector: 'NGOs & Summits',
    clientIndustry: 'International Development',
    division: 'branding',
    blurb:
      'Eco-friendly conference packs comprising heavy canvas delegate totes, laser-engraved double-wall vacuum tumblers, and blind-debossed notebooks.',
    volume: '850 Sets',
    deadline: '8 Working Days',
    materials: '320 GSM Unbleached Canvas, SS304 Stainless, Thermal PU',
    image_url: '/images/branding/executive-gifts.jpg',
    outcome: 'Delivered directly to the UN complex in Gigiri 48 hours ahead of registration.',
    specs: [
      { label: 'Drinkware Finish', value: 'Fiber Laser Deep Annealing (Mirror Chrome finish)' },
      { label: 'Notebook Binding', value: 'Blind debossed hardback with expandable inner pocket' },
      { label: 'Tote Printing', value: 'Water-based eco-pigment screen print' },
      { label: 'Fulfillment', value: 'Fully kitted and packed in custom kraft presentation boxes' },
    ],
  },
  {
    title: 'Industrial Heavy Twill Overalls & High-Vis Vests',
    category: 'Safety & PPE',
    sector: 'Manufacturing & Logistics',
    clientIndustry: 'Heavy Industry',
    division: 'branding',
    blurb:
      'DOSH-compliant flame and acid-retardant industrial overalls with double-band EN471 Class 2 reflective tape for manufacturing floor engineers.',
    volume: '650 Suits',
    deadline: '6 Working Days',
    materials: '300 GSM Heavy Cotton Drill, 3M Scotchlite Reflective Band',
    image_url: '/images/branding/workwear-ppe.jpg',
    outcome: 'Passed rigorous factory safety inspection and KRA ETR documentation without queries.',
    specs: [
      { label: 'Tensile Strength', value: 'Reinforced triple-needle flat-felled seam construction' },
      { label: 'Thread Spec', value: 'Heavy polyester-core thread with bartacked stress points' },
      { label: 'Reflective Rating', value: 'EN ISO 20471 certified high-retroreflectivity' },
      { label: 'Branding', value: 'Direct chest embroidery + screen-printed high-density back logo' },
    ],
  },
  {
    title: 'Nationwide Telco Retail Promotional Campaign',
    category: 'Mass Merchandise',
    sector: 'Telecommunications',
    clientIndustry: 'Consumer Tech',
    division: 'branding',
    blurb:
      'High-speed production and staggered delivery of 12,000 crewneck promotional t-shirts and windproof golf umbrellas across 24 regional distribution hubs.',
    volume: '12,000 Units',
    deadline: '10 Working Days',
    materials: '180 GSM Combed Cotton, Fiberglass Umbrella Ribs',
    image_url: '/images/branding/promotional-merch.jpg',
    outcome: 'Synchronized delivery to Nairobi, Mombasa, Kisumu, Nakuru, and Eldoret on launch day.',
    specs: [
      { label: 'Printing Tech', value: 'Automated 6-color oval carousel screen print' },
      { label: 'Curing Standard', value: 'Infrared forced-air tunnel curing at 165°C' },
      { label: 'Logistics Protocol', value: 'Sealed carton lots of 50 units with tamper-proof strapping' },
      { label: 'Dispatch Tracking', value: 'Waybill updates piped directly into TouchDesk' },
    ],
  },

  // ── SIGNAGE CASE STUDIES ──
  {
    title: 'Commercial Bank Headquarters 3D Sky Sign',
    category: 'Illuminated 3D Signs',
    sector: 'Banking & Finance',
    clientIndustry: 'Financial Architecture',
    division: 'signage',
    blurb:
      '1.4-meter high face-lit and halo-lit 3D channel letters installed on a 14-story commercial tower in Upper Hill, visible from over 1.2 kilometers away.',
    volume: '1 Tower Installation',
    deadline: '12 Working Days',
    materials: '3mm Cast Diffusing Acrylic, 1.2mm SS304 returns, IP67 LEDs',
    image_url: '/images/signage/3d-channel-letters.jpg',
    outcome: 'Certified structural wind-load rating up to 130 km/h with 5-year LED luminance warranty.',
    specs: [
      { label: 'Illumination', value: 'Samsung SMD 2835 (6500K Daylight, 160° beam lens)' },
      { label: 'Power Modules', value: 'Mean Well HLG Series IP67 waterproof drivers' },
      { label: 'Mounting Rig', value: 'Hot-dip galvanized structural sub-frame with chemical anchor bolts' },
      { label: 'Permit Pack', value: 'Structural CAD drawings approved by Nairobi City County' },
    ],
  },
  {
    title: 'Express Courier Nationwide Fleet Rebrand',
    category: 'Vehicle Fleet Wraps',
    sector: 'Manufacturing & Logistics',
    clientIndustry: 'Supply Chain',
    division: 'signage',
    blurb:
      'Full cast-vinyl fleet wrapping of 35 commercial delivery vans and 10-ton distribution lorries using knifeless tape and 3M UV gloss overlaminate.',
    volume: '35 Vehicles',
    deadline: '15 Working Days (Staggered)',
    materials: '3M Controltac Cast Vinyl with Comply Air-Release Channels',
    image_url: '/images/signage/vehicle-wrap.jpg',
    outcome: 'Zero vehicle downtime by executing wraps in evening shifts inside client depot.',
    specs: [
      { label: 'Film Grade', value: 'Premium Cast PVC (no shrinkage or edge lifting)' },
      { label: 'Laminate', value: 'Cast UV blocking overlaminate against high-altitude solar bake' },
      { label: 'Application Tech', value: '100% knifeless tape cutting to preserve OEM paint clearcoat' },
      { label: 'Outdoor Rating', value: '3-5 Year warranty against cracking or UV fading' },
    ],
  },
  {
    title: 'Highway Fuel Station LED Pylon & Canopy Fascia',
    category: 'Pylon & Highway Signs',
    sector: 'Energy & Infrastructure',
    clientIndustry: 'Petroleum Retail',
    division: 'signage',
    blurb:
      '8.5-meter freestanding structural steel pylon monument with remote-controlled digital LED price changers and heavy ACP canopy perimeter lightboxes.',
    volume: '1 Complete Station',
    deadline: '18 Working Days',
    materials: 'Galvanized Structural Steel, 4mm ACP, Polycarbonate Faces',
    image_url: '/images/signage/pylon-monument.jpg',
    outcome: 'Built to KenHA highway setback specifications with high-impact road approach visibility.',
    specs: [
      { label: 'Steel Substructure', value: 'Hot-dip galvanized I-beam chassis with reinforced cage' },
      { label: 'Concrete Footing', value: 'Engineered foundation slab rated for high gust shear loads' },
      { label: 'Price Displays', value: 'Ultra-bright amber 7-segment digital LED price modules' },
      { label: 'Cladding Material', value: 'PVDF coated fire-retardant Aluminum Composite Panels' },
    ],
  },
  {
    title: 'Corporate Headquarters Reception & Wayfinding Architecture',
    category: 'Wayfinding & Directory',
    sector: 'Corporate Architecture',
    clientIndustry: 'Real Estate & Tech',
    division: 'signage',
    blurb:
      'Bespoke architectural interior signage system including edge-lit brushed brass reception logo, floor directory totems, and tactile room identification.',
    volume: '1 Multi-Floor Campus',
    deadline: '9 Working Days',
    materials: 'Brushed Brass, Tempered Low-Iron Glass, Anodized AL',
    image_url: '/images/signage/led-lightbox.jpg',
    outcome: 'Seamless wayfinding passing DOSH safety audit and fire emergency escape regulations.',
    specs: [
      { label: 'Reception Feature', value: 'Solid 10mm brass letters water-jet cut with brushed face' },
      { label: 'Directory Totems', value: 'Modular magnetic changeable aluminum directory slats' },
      { label: 'Safety Elements', value: 'ISO 7010 compliant photoluminescent emergency exit signs' },
      { label: 'Mounting Style', value: 'Concealed stud mounting with precision spacer standoffs' },
    ],
  },
];

const SECTOR_FILTERS = [
  'All Sectors',
  'Government & Tenders',
  'Banking & Finance',
  'NGOs & Summits',
  'Manufacturing & Logistics',
  'Energy & Infrastructure',
  'Corporate Architecture',
];

export function PortfolioGallery({
  brand,
  limit,
  items,
}: {
  brand: BrandConfig;
  limit?: number;
  items?: PortfolioItem[];
}) {
  const [selectedDivision, setSelectedDivision] = useState<'all' | 'branding' | 'signage'>(
    brand.id === 'signage' ? 'signage' : 'branding'
  );
  const [selectedSector, setSelectedSector] = useState<string>('All Sectors');
  const [activeModalProject, setActiveModalProject] = useState<PortfolioGalleryItem | null>(null);

  // Filter items based on division and sector
  const allProjects = EXTENDED_PORTFOLIO;

  const filteredProjects = allProjects.filter((item) => {
    const matchesDivision =
      selectedDivision === 'all' || item.division === selectedDivision;
    const matchesSector =
      selectedSector === 'All Sectors' || item.sector === selectedSector;
    return matchesDivision && matchesSector;
  });

  const visibleItems = limit ? filteredProjects.slice(0, limit) : filteredProjects;

  return (
    <section className="section-py border-t border-[var(--border)] bg-[var(--bg)]">
      <div className="max-w-content mx-auto px-6">
        {/* Header & Metric Counter */}
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6 mb-12 pb-6 border-b border-[var(--border)]">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] font-mono text-xs uppercase tracking-widest mb-3">
                Verified Kenyan Deliveries
              </div>
              <h2 className="font-display text-3xl md:text-5xl uppercase tracking-wider text-[var(--text)]">
                Project Log & Case Studies
              </h2>
            </div>

            {/* Quick Metrics */}
            <div className="flex items-center gap-6 text-right">
              <div>
                <span className="font-display text-2xl md:text-3xl font-bold text-[var(--accent)] block">
                  120K+
                </span>
                <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase">
                  Units Delivered
                </span>
              </div>
              <div className="w-px h-8 bg-[var(--border)]" />
              <div>
                <span className="font-display text-2xl md:text-3xl font-bold text-[var(--text)] block">
                  47
                </span>
                <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase">
                  Counties Covered
                </span>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Interactive Filter Bar */}
        {!limit && (
          <Reveal delay={80}>
            <div className="space-y-4 mb-12 p-6 rounded-[var(--radius-lg)] bg-[var(--bg-soft)] border border-[var(--border)]">
              {/* Division Selector */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)]">
                    Division:
                  </span>
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => setSelectedDivision('all')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        selectedDivision === 'all'
                          ? 'bg-[var(--text)] text-[var(--bg)] font-bold'
                          : 'bg-[var(--bg)] text-[var(--text-muted)] hover:text-[var(--text)] border border-[var(--border)]'
                      }`}
                    >
                      All Work
                    </button>
                    <button
                      onClick={() => setSelectedDivision('branding')}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        selectedDivision === 'branding'
                          ? 'bg-[#c8960c] text-white font-bold shadow-md shadow-[#c8960c]/20'
                          : 'bg-[var(--bg)] text-[var(--text-muted)] hover:text-[var(--text)] border border-[var(--border)]'
                      }`}
                    >
                      Branding & Merch
                    </button>
                    <button
                      onClick={() => setSelectedDivision('signage')}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        selectedDivision === 'signage'
                          ? 'bg-[#0070f3] text-white font-bold shadow-md shadow-[#0070f3]/20'
                          : 'bg-[var(--bg)] text-[var(--text-muted)] hover:text-[var(--text)] border border-[var(--border)]'
                      }`}
                    >
                      Signage & Fabrication
                    </button>
                  </div>
                </div>

                <div className="text-xs font-mono text-[var(--text-muted)]">
                  Showing <strong className="text-[var(--text)]">{visibleItems.length}</strong> verified projects
                </div>
              </div>

              {/* Sector Chips */}
              <div className="flex flex-wrap items-center gap-1.5 pt-3 border-t border-[var(--border)]">
                <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] mr-2">
                  Sector:
                </span>
                {SECTOR_FILTERS.map((sec) => (
                  <button
                    key={sec}
                    onClick={() => setSelectedSector(sec)}
                    className={`px-3 py-1 rounded text-[11px] font-mono transition-all ${
                      selectedSector === sec
                        ? 'bg-[var(--accent)] text-[var(--accent-ink)] font-bold'
                        : 'bg-[var(--bg)] text-[var(--text-muted)] hover:text-[var(--text)] border border-[var(--border)]'
                    }`}
                  >
                    {sec}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>
        )}

        {/* Portfolio Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleItems.map((item, i) => {
            const isBranding = item.division === 'branding';
            const accentTone = isBranding ? '#c8960c' : '#0070f3';

            return (
              <Reveal key={item.title} delay={(i % 3) * 100}>
                <div className="card-surface group rounded-[var(--radius-lg)] p-3 border border-[var(--border)] hover:border-[var(--accent)]/40 transition-all duration-300 h-full flex flex-col justify-between shadow-md">
                  <div>
                    {/* Visual Card */}
                    <div className="relative h-60 w-full overflow-hidden rounded-[var(--radius-md)] bg-[var(--bg-soft)] border border-[var(--border)] mb-4">
                      <ProjectPhoto
                        src={item.image_url || '/images/branding/hero-merch.jpg'}
                        alt={item.title}
                        division={item.division || brand.id}
                        badge={item.category}
                        aspect="h-full w-full"
                      />
                    </div>

                    {/* Metadata Header */}
                    <div className="px-2">
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span
                          className="font-mono text-[10px] uppercase tracking-widest font-bold"
                          style={{ color: accentTone }}
                        >
                          {item.category}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--bg-soft)] text-[var(--text-muted)] border border-[var(--border)]">
                          {item.sector}
                        </span>
                      </div>

                      <h3 className="font-display text-lg font-bold text-[var(--text)] group-hover:text-[var(--accent)] transition-colors mb-2 leading-snug">
                        {item.title}
                      </h3>

                      <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-4 line-clamp-3">
                        {item.blurb}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer: Metrics & Specs Trigger */}
                  <div className="px-2 pt-4 border-t border-[var(--border)] mt-2">
                    <div className="grid grid-cols-2 gap-2 text-xs mb-4">
                      <div>
                        <span className="font-mono text-[9px] text-[var(--text-muted)] uppercase block">
                          Volume
                        </span>
                        <span className="font-mono font-bold text-[var(--text)]">
                          {item.volume}
                        </span>
                      </div>
                      <div>
                        <span className="font-mono text-[9px] text-[var(--text-muted)] uppercase block">
                          Turnaround
                        </span>
                        <span className="font-mono font-bold text-[var(--text)]">
                          {item.deadline}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-2">
                      <button
                        onClick={() => setActiveModalProject(item)}
                        className="text-xs font-semibold text-[var(--accent)] hover:underline flex items-center gap-1"
                      >
                        Technical Spec Sheet <span>→</span>
                      </button>

                      <Link
                        href={`/book?brand=${item.division || brand.id}&service=${encodeURIComponent(
                          item.title
                        )}`}
                        className="btn-secondary text-[11px] font-mono py-1 px-3 rounded"
                      >
                        Quote This
                      </Link>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Detailed Modal Spec Sheet */}
        {activeModalProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
            <div className="bg-[var(--surface)] border-2 border-[var(--accent)] rounded-[var(--radius-lg)] max-w-2xl w-full p-6 md:p-8 max-h-[90vh] overflow-y-auto shadow-2xl relative">
              <div className="flex items-start justify-between gap-4 mb-6 pb-4 border-b border-[var(--border)]">
                <div>
                  <span
                    className="font-mono text-xs uppercase tracking-widest font-bold block mb-1"
                    style={{
                      color: activeModalProject.division === 'branding' ? '#c8960c' : '#0070f3',
                    }}
                  >
                    {activeModalProject.category} · {activeModalProject.sector}
                  </span>
                  <h3 className="font-display text-2xl text-[var(--text)] font-bold">
                    {activeModalProject.title}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveModalProject(null)}
                  className="p-2 rounded-lg bg-[var(--bg-soft)] text-[var(--text)] hover:bg-[var(--border)] text-sm font-bold"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="font-mono text-xs uppercase tracking-wider text-[var(--text-muted)] mb-2">
                    Project Overview
                  </h4>
                  <p className="text-sm text-[var(--text)] leading-relaxed">
                    {activeModalProject.blurb}
                  </p>
                </div>

                {activeModalProject.outcome && (
                  <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-xs">
                    <span className="font-bold text-emerald-500 block mb-1">
                      Verified Delivery Outcome:
                    </span>
                    <span className="text-[var(--text)]">{activeModalProject.outcome}</span>
                  </div>
                )}

                {/* Technical Specs List */}
                {activeModalProject.specs && (
                  <div>
                    <h4 className="font-mono text-xs uppercase tracking-wider text-[var(--text-muted)] mb-3">
                      Engineering & Material Specifications
                    </h4>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {activeModalProject.specs.map((sp) => (
                        <div
                          key={sp.label}
                          className="p-3 rounded-lg bg-[var(--bg-soft)] border border-[var(--border)] text-xs"
                        >
                          <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase block mb-0.5">
                            {sp.label}
                          </span>
                          <span className="font-medium text-[var(--text)]">{sp.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-3 gap-3 p-4 rounded-lg bg-[var(--bg-soft)] border border-[var(--border)] text-xs font-mono">
                  <div>
                    <span className="text-[10px] text-[var(--text-muted)] block">Total Units</span>
                    <strong className="text-[var(--text)]">{activeModalProject.volume}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-[var(--text-muted)] block">Lead Time</span>
                    <strong className="text-[var(--text)]">{activeModalProject.deadline}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-[var(--text-muted)] block">Materials</span>
                    <strong className="text-[var(--text)] truncate block">
                      {activeModalProject.materials}
                    </strong>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[var(--border)]">
                  <button
                    onClick={() => setActiveModalProject(null)}
                    className="btn-ghost text-xs"
                  >
                    Close Sheet
                  </button>

                  <Link
                    href={`/book?brand=${activeModalProject.division || brand.id}&service=${encodeURIComponent(
                      activeModalProject.title
                    )}`}
                    className="btn-primary text-xs font-semibold py-2.5 px-6"
                  >
                    Configure Similar Order in TouchDesk <span>→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Fast Quote Section */}
        {!limit && (
          <div className="mt-20 pt-16 border-t border-[var(--border)]">
            <Reveal>
              <div className="text-center mb-12">
                <span className="font-mono text-xs uppercase tracking-widest text-[var(--accent)] block mb-2 font-semibold">
                  TouchDesk Direct Dispatch
                </span>
                <h2 className="font-display text-3xl md:text-4xl text-[var(--text)] mb-3">
                  Have a similar project in mind?
                </h2>
                <p className="text-lead max-w-xl mx-auto">
                  Submit your preliminary requirements below. Our Nairobi estimation team will generate your formal proposal and 3D visual proof.
                </p>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <FastQuoteWidget initialBrand={brand.id === 'signage' ? 'signage' : 'branding'} />
            </Reveal>
          </div>
        )}
      </div>
    </section>
  );
}
