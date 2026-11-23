'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import type { BrandConfig } from '@/config/brands';
import type { PortfolioItem } from '@/config/brands';
import { Reveal } from './Reveal';
import { BeforeAfterSlider } from './BeforeAfterSlider';
import { ProjectPhoto } from './ProjectPhoto';
import { CrossSellBanner } from './CrossSellBanner';
import { FastQuoteWidget } from './FastQuoteWidget';
import { SIGNAGE_CATALOG_ITEMS, SIGNAGE_CATALOG_CATEGORIES } from '@/config/signage-catalog';
import { BRANDING_CATALOG_ITEMS, BRANDING_CATALOG_CATEGORIES } from '@/config/branding-catalog';
import { AWARDS_CATALOG_ITEMS, AWARDS_CATALOG_CATEGORIES } from '@/config/awards-catalog';

export type PortfolioGalleryItem = PortfolioItem & {
  sector?: string;
  clientIndustry?: string;
  specs?: { label: string; value: string }[];
  outcome?: string;
  division?: 'branding' | 'signage' | 'awards';
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
    image_url: '/images/branding/apparel-staff-uniform.webp',
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
    image_url: '/images/branding/apparel-executive-polo.webp',
    outcome: 'Zero collar curling after 12 months of daily office wear.',
    specs: [
      { label: 'Fabric Composition', value: '65% Combed Ring-Spun Cotton / 35% Poly' },
      { label: 'Stitch Count', value: '6,200 Stitches per crest (Madeira Polyneon)' },
      { label: 'Collar Tech', value: 'Double-knit ribbed collar with spandex elasticity' },
      { label: 'Reorder Model', value: 'Automated quarterly replenishment via TouchDesk' },
    ],
  },
  {
    title: 'East African Health Summit Canvas Delegate Totes',
    category: 'Delegate Bags & Totes',
    sector: 'NGOs & Summits',
    clientIndustry: 'International Development',
    division: 'branding',
    blurb:
      'Heavy-duty unbleached canvas delegate conference tote bags with reinforced boxed corners and water-based eco-pigment screen print.',
    volume: '850 Sets',
    deadline: '8 Working Days',
    materials: '320 GSM Unbleached Natural Canvas, Heavy Webbing Handles',
    image_url: '/images/branding/merch-tote-bag.webp',
    outcome: 'Delivered directly to the UN complex in Gigiri 48 hours ahead of delegate registration.',
    specs: [
      { label: 'Fabric Weight', value: '320 GSM Natural Unbleached Cotton Canvas' },
      { label: 'Handle Construction', value: 'Cross-stitched reinforced cotton webbing' },
      { label: 'Print Chemistry', value: 'Zero-PVC water-based eco-pigment screen print' },
      { label: 'Load Rating', value: 'Tested up to 15kg load capacity without seam deformation' },
    ],
  },
  {
    title: 'Corporate Sustainability Double-Wall Thermal Flasks',
    category: 'Drinkware & Hydration',
    sector: 'Banking & Finance',
    clientIndustry: 'Corporate Enterprise',
    division: 'branding',
    blurb:
      '500ml double-wall vacuum-insulated stainless steel thermal flasks with precision fiber-laser annealing for zero-fade metallic cresting.',
    volume: '600 Units',
    deadline: '5 Working Days',
    materials: 'Food-Grade SS304 Inner, Copper Vacuum Layer, Powder Coat',
    image_url: '/images/branding/drinkware-thermal-flask.webp',
    outcome: 'Maintains beverages cold for 24 hours and hot for 12 hours with zero condensation.',
    specs: [
      { label: 'Insulation Tech', value: 'Double-wall copper vacuum barrier (TempLock)' },
      { label: 'Laser Finish', value: 'Fiber laser deep annealing with mirror chrome finish' },
      { label: 'Lid Mechanism', value: 'BPA-free leakproof silicone gasket with carry loop' },
      { label: 'Packaging', value: 'Custom branded matte black presentation cylinder' },
    ],
  },
  {
    title: 'Matte Sports & Corporate Gym Hydration Bottles',
    category: 'Drinkware & Hydration',
    sector: 'Telecommunications',
    clientIndustry: 'Consumer Brand',
    division: 'branding',
    blurb:
      'Ergonomic matte powder-coated aluminum and stainless hydration bottles branded with high-durability UV rotary wrap printing.',
    volume: '1,500 Units',
    deadline: '6 Working Days',
    materials: 'Single-Wall SS304 with Tactile Matte Finish',
    image_url: '/images/branding/drinkware-matte-bottle.webp',
    outcome: '100% scratch-resistant coating surviving high-impact outdoor usage.',
    specs: [
      { label: 'Print Technology', value: '360° Rotary UV direct-to-surface full wrap' },
      { label: 'Capacity', value: '750ml single-wall ultra-lightweight sports form' },
      { label: 'Coating', value: 'Anti-slip electrostatic powder-bake finish' },
      { label: 'Certification', value: 'LFGB & FDA food-contact safety compliant' },
    ],
  },
  {
    title: 'Boardroom VIP Executive Gift Presentation Sets',
    category: 'VIP Executive Sets',
    sector: 'Banking & Finance',
    clientIndustry: 'Financial Architecture',
    division: 'branding',
    blurb:
      'Luxury boxed corporate gifting suites comprising thermal flasks, executive metal pens, and blind-debossed executive journals in tailored foam inlays.',
    volume: '300 Box Sets',
    deadline: '7 Working Days',
    materials: 'SS304 Stainless, Thermal PU Leatherette, Hardbox Rigid Board',
    image_url: '/images/branding/gift-executive-vip-set.webp',
    outcome: 'Presented to C-level summit delegates and board members with exceptional tactile reception.',
    specs: [
      { label: 'Box Construction', value: '1200 GSM rigid hardbox with magnetic snap closure' },
      { label: 'Inlay Material', value: 'High-density EVA foam custom CNC cavity cutout' },
      { label: 'Finishing', value: 'Gold metallic foil stamping on presentation sleeve' },
      { label: 'Turnaround', value: 'Rapid assembly and delivery within 5 working days' },
    ],
  },
  {
    title: 'Executive Suite Luxury Leather Desk Organizers',
    category: 'Desk Accessories',
    sector: 'Corporate Architecture',
    clientIndustry: 'Real Estate & Legal',
    division: 'branding',
    blurb:
      'Hand-stitched faux leather desk organizers, stationery trays, and mousepads with blind-debossed corporate cresting for partner offices.',
    volume: '200 Suites',
    deadline: '8 Working Days',
    materials: 'Premium Vegan PU Leatherette, Heavy Cardboard Core',
    image_url: '/images/branding/gift-luxury-leather-desk.webp',
    outcome: 'Unified 12 legal partner offices across Nairobi with uniform luxury desk appointments.',
    specs: [
      { label: 'Stitching', value: 'Perimeter saddle-stitch in matching tonal bonded nylon' },
      { label: 'Debossing Tech', value: 'Heat-press brass die deboss with 1.5mm depression' },
      { label: 'Backing', value: 'Non-slip faux suede microfiber protective base' },
      { label: 'Care Standard', value: 'Water and stain-resistant wipe-clean surface' },
    ],
  },
  {
    title: 'Leadership Summit Debossed Leather Journals & Notebooks',
    category: 'Stationery & Writing',
    sector: 'NGOs & Summits',
    clientIndustry: 'Regional Leadership',
    division: 'branding',
    blurb:
      'Hardcover A5 executive notebooks featuring ribbon bookmarks, elastic band closures, expandable document pockets, and blind-debossed logos.',
    volume: '1,000 Units',
    deadline: '5 Working Days',
    materials: 'Thermal PU Cover, 100 GSM Acid-Free Cream Paper',
    image_url: '/images/branding/stationery-executive-journal.webp',
    outcome: 'Zero ink bleed-through verified with fountain pens and ballpoints alike.',
    specs: [
      { label: 'Paper Stock', value: '100 GSM FSC-certified acid-free cream woodfree paper' },
      { label: 'Page Count', value: '192 Ruled pages with custom watermark header' },
      { label: 'Binding', value: 'Smyth-sewn lay-flat binding for 180° flat writing' },
      { label: 'Accent Details', value: 'Color-matched elastic closure & satin bookmark' },
    ],
  },
  {
    title: 'Precision Fiber-Laser Annealed Metal Executive Pens',
    category: 'Stationery & Writing',
    sector: 'Corporate Architecture',
    clientIndustry: 'Consulting & Legal',
    division: 'branding',
    blurb:
      'Heavyweight brass-core executive rollerball pens with chrome accents and crisp fiber-laser engraving that never wears off.',
    volume: '2,500 Units',
    deadline: '4 Working Days',
    materials: 'Brass Core, Matte Black Lacquer Barrel, Tungsten Ball Refill',
    image_url: '/images/branding/stationery-metal-pen.webp',
    outcome: 'High perceived value item with smooth German-ink cartridge flow.',
    specs: [
      { label: 'Engraving Depth', value: '0.05mm deep optical fiber laser annealing' },
      { label: 'Refill Standard', value: 'German Schneider 0.7mm rollerball cartridge' },
      { label: 'Weight Balance', value: '38g balanced center-of-gravity design' },
      { label: 'Packaging', value: 'Individual velvet sleeve with certificate' },
    ],
  },
  {
    title: 'Pan-African Enterprise New Hire Onboarding Kits',
    category: 'Corporate Onboarding',
    sector: 'Corporate Architecture',
    clientIndustry: 'Technology Enterprise',
    division: 'branding',
    blurb:
      'Curated staff onboarding packages containing company t-shirts, branded water flasks, executive notebooks, and custom enamel pin badges.',
    volume: '450 Kits',
    deadline: '7 Working Days',
    materials: 'Hardbox Rigid Board, 100% Combed Cotton, SS304 Drinkware',
    image_url: '/images/branding/gift-corporate-onboarding.webp',
    outcome: 'Standardized employee first-day experience across 4 regional hub offices.',
    specs: [
      { label: 'Kit Contents', value: 'Tee + Thermal Flask + Notebook + Metal Pen + Badge' },
      { label: 'Customization', value: 'Personalized employee welcome cards with variable data' },
      { label: 'Storage & Drop', value: 'Warehoused at Touchline for on-demand new-hire dispatch' },
      { label: 'Compliance', value: 'Fully KRA ETR itemized for statutory accounting' },
    ],
  },
  {
    title: 'Tech Enterprise Wireless Charger & Hydration Sets',
    category: 'Tech & Hydration',
    sector: 'Telecommunications',
    clientIndustry: 'Fintech & Cloud',
    division: 'branding',
    blurb:
      'Contemporary tech gifting bundles featuring Qi-certified wireless charging pads, braided cables, and stainless insulated tumblers.',
    volume: '500 Sets',
    deadline: '6 Working Days',
    materials: 'Anodized Aluminum, Tempered Glass, Food-Grade SS304',
    image_url: '/images/branding/gift-tech-hydration-set.webp',
    outcome: 'High daily utility ensuring persistent desk and mobile brand impressions.',
    specs: [
      { label: 'Tech Rating', value: '15W Fast Qi wireless charging with overheat protection' },
      { label: 'Branding Method', value: 'Edge-to-edge backlit LED logo illumination' },
      { label: 'Tumbler Spec', value: '450ml splash-proof slide lid with double-wall core' },
      { label: 'Safety Pack', value: 'CE, RoHS and KEBS approved electronic components' },
    ],
  },
  {
    title: 'Nationwide Telco Retail Promotional Campaign Merch',
    category: 'Mass Merchandise',
    sector: 'Telecommunications',
    clientIndustry: 'Consumer Tech',
    division: 'branding',
    blurb:
      'High-speed automated screen printing of 12,000 crewneck promotional t-shirts across 24 regional distribution hubs in Kenya.',
    volume: '12,000 Units',
    deadline: '10 Working Days',
    materials: '180 GSM Ring-Spun Cotton, Eco-Plastisol Inks',
    image_url: '/images/branding/apparel-heavyweight-tee.webp',
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
    image_url: '/images/signage/3d-channel-letters.webp',
    outcome: 'Certified structural wind-load rating up to 130 km/h with 5-year LED luminance warranty.',
    specs: [
      { label: 'Illumination', value: 'Samsung SMD 2835 (6500K Daylight, 160° beam lens)' },
      { label: 'Power Modules', value: 'Mean Well HLG Series IP67 waterproof drivers' },
      { label: 'Mounting Rig', value: 'Hot-dip galvanized structural sub-frame with chemical anchor bolts' },
      { label: 'Permit Pack', value: 'Structural CAD drawings approved by Nairobi City County' },
    ],
  },
  {
    title: 'Metropolitan Commercial Facade & Architectural Storefront',
    category: 'Storefront Facades',
    sector: 'Energy & Infrastructure',
    clientIndustry: 'Retail Architecture',
    division: 'signage',
    blurb:
      'Comprehensive storefront architectural facade featuring 3D dimensional lettering, composite cladding, and energy-efficient LED perimeter wash.',
    volume: '1 Flagship Facade',
    deadline: '10 Working Days',
    materials: '4mm PVDF Aluminum Composite Panel, 3D Acrylic Letters',
    image_url: '/images/signage/3d-acrylic-facade.webp',
    outcome: 'High daytime visual contrast and radiant nighttime illumination.',
    specs: [
      { label: 'Facade Cladding', value: 'Fire-retardant 4mm ACP with PVDF weather seal' },
      { label: 'Letter Depth', value: '80mm fabricated acrylic returns with mirror finish' },
      { label: 'Waterproofing', value: 'Internal silicone gasket channels with drainage weep holes' },
      { label: 'Installation', value: 'Concealed fastener grid with zero exterior bolt heads' },
    ],
  },
  {
    title: 'Tech Hub Standalone Perspex Dimensional Reception Sign',
    category: 'Architectural Letters',
    sector: 'Corporate Architecture',
    clientIndustry: 'Technology Campus',
    division: 'signage',
    blurb:
      'Precision laser-cut 12mm clear cast perspex with flame-polished edges and brushed metal face accents for an executive tech reception atrium.',
    volume: '1 Atrium Feature',
    deadline: '4 Working Days',
    materials: '12mm Cast Perspex Acrylic, Brushed Aluminum Laminate',
    image_url: '/images/signage/3d-standalone-perspex.webp',
    outcome: 'Architectural elegance with pristine edge refraction and zero machining burrs.',
    specs: [
      { label: 'Edge Treatment', value: 'Hydrogen-oxygen flame polished crystal-clear edges' },
      { label: 'Mounting Standoffs', value: 'Machined satin stainless steel threaded barrel standoffs' },
      { label: 'Alignment Spec', value: '1:1 CNC-drilled template with ±0.5mm precision' },
      { label: 'Maintenance', value: 'Anti-static micro-fiber acrylic protective coating' },
    ],
  },
  {
    title: 'Financial Services Headquarters Architectural Fabric Lightbox',
    category: 'Lightboxes & Fascias',
    sector: 'Banking & Finance',
    clientIndustry: 'Corporate Interiors',
    division: 'signage',
    blurb:
      'Ultra-slim silicone-edge graphics (SEG) tension fabric lightbox with perimeter edge-lit LED optics for high-resolution corporate branding.',
    volume: '3 Large Format Lightboxes',
    deadline: '6 Working Days',
    materials: 'Anodized AL Profile, Dye-Sublimated Backlit Fabric, High-CRI LEDs',
    image_url: '/images/signage/architectural-fabric-lightbox.webp',
    outcome: 'Edge-to-edge frameless aesthetic with zero hotspots or luminance fading.',
    specs: [
      { label: 'Profile Depth', value: '80mm ultra-slim double-sided extruded aluminum' },
      { label: 'Fabric Printing', value: 'High-density dye-sublimation with silicone welt edge' },
      { label: 'Color Rendering', value: 'CRI 90+ high-fidelity LED array for accurate brand tones' },
      { label: 'Graphics Swap', value: 'Tool-free front fabric change completed in under 5 minutes' },
    ],
  },
  {
    title: 'Retail Chain Slim Aluminum Storefront Lightbox Fascias',
    category: 'Lightboxes & Fascias',
    sector: 'Manufacturing & Logistics',
    clientIndustry: 'Commercial Retail',
    division: 'signage',
    blurb:
      'Modular slimline aluminum sign cabinets with cast acrylic faces and uniform backlighting for high-traffic retail shopping malls.',
    volume: '6 Branch Fascias',
    deadline: '11 Working Days',
    materials: 'Heavy-Gauge Aluminum Extrusions, Cast Opal Acrylic, Samsung SMD',
    image_url: '/images/signage/slim-aluminum-lightbox.webp',
    outcome: 'Consistent brand presence across Nairobi, Mombasa, and Kisumu branches.',
    specs: [
      { label: 'Extrusion Spec', value: 'Powder-coated architectural 6063-T5 aluminum' },
      { label: 'Face Sheet', value: '3mm UV-stabilized cast opal acrylic (no yellowing)' },
      { label: 'Thermal Safety', value: 'Passive rear aluminum heat-dissipating chassis' },
      { label: 'Permit Ready', value: 'Indoor mall management fire & electrical certified' },
    ],
  },
  {
    title: 'Highway Fuel Station LED Monolith Pylon Sign',
    category: 'Pylon & Highway Signs',
    sector: 'Energy & Infrastructure',
    clientIndustry: 'Petroleum Retail',
    division: 'signage',
    blurb:
      '8.5-meter freestanding structural steel pylon monument with remote-controlled digital LED price changers and heavy ACP canopy perimeter lightboxes.',
    volume: '1 Complete Station',
    deadline: '18 Working Days',
    materials: 'Galvanized Structural Steel, 4mm ACP, Polycarbonate Faces',
    image_url: '/images/signage/highway-monolith-pylon.webp',
    outcome: 'Built to KenHA highway setback specifications with high-impact road approach visibility.',
    specs: [
      { label: 'Steel Substructure', value: 'Hot-dip galvanized I-beam chassis with reinforced cage' },
      { label: 'Concrete Footing', value: 'Engineered foundation slab rated for high gust shear loads' },
      { label: 'Price Displays', value: 'Ultra-bright amber 7-segment digital LED price modules' },
      { label: 'Cladding Material', value: 'PVDF coated fire-retardant Aluminum Composite Panels' },
    ],
  },
  {
    title: 'Commercial Business Tower Landmark Entry Pylon',
    category: 'Pylon & Highway Signs',
    sector: 'Corporate Architecture',
    clientIndustry: 'Real Estate Architecture',
    division: 'signage',
    blurb:
      '6-meter architectural entry pylon monument featuring multi-tenant illuminated tenant panels, brushed brass accents, and concrete plinth integration.',
    volume: '1 Monument Landmark',
    deadline: '14 Working Days',
    materials: 'Structural Steel, Anodized AL, Acrylic Panels, Samsung LEDs',
    image_url: '/images/signage/commercial-tower-pylon.webp',
    outcome: 'High architectural prestige commanding the commercial park boulevard.',
    specs: [
      { label: 'Substructure', value: 'Structural steel RHS framework with anti-corrosion primer' },
      { label: 'Tenant Slots', value: 'Modular illuminated tenant inserts with easy re-lettering' },
      { label: 'Night Optics', value: 'Warm 4000K LED uplighting illuminating base landscape' },
      { label: 'Permits', value: 'County Physical Planning and Structural Engineer stamped' },
    ],
  },
  {
    title: 'Multi-Floor Hospital & Campus Wayfinding Directory Totems',
    category: 'Wayfinding & Directory',
    sector: 'Corporate Architecture',
    clientIndustry: 'Healthcare & Higher Ed',
    division: 'signage',
    blurb:
      'Integrated indoor wayfinding totem network featuring magnetic changeable tenant slats, tactile ADA symbols, and high-contrast color routing.',
    volume: '14 Totem Displays',
    deadline: '8 Working Days',
    materials: 'Aluminum Extrusions, Low-Iron Glass, Magnetic Composite Slats',
    image_url: '/images/signage/wayfinding-totem.webp',
    outcome: 'Passed stringent DOSH safety inspection and simplified patient navigation by 65%.',
    specs: [
      { label: 'Directory Tech', value: 'Magnetic modular interchangeable directory slats' },
      { label: 'Accessibility', value: 'Braille grade 2 and tactile raised directional arrows' },
      { label: 'Base Assembly', value: 'Internal heavy counterweight plate with floor anchors' },
      { label: 'Surface Finish', value: 'Anti-fingerprint matte polyurethane clearcoat' },
    ],
  },
  {
    title: 'Regional Industrial Park Modular Directional Posts',
    category: 'Wayfinding & Directory',
    sector: 'Manufacturing & Logistics',
    clientIndustry: 'Logistics Park',
    division: 'signage',
    blurb:
      'Heavy-duty exterior directional finger posts engineered to guide heavy distribution trucks and visitors across an 80-acre logistics park.',
    volume: '18 Directional Posts',
    deadline: '9 Working Days',
    materials: 'Extruded Aluminum Post, Reflective Engineering Grade Sheeting',
    image_url: '/images/signage/directional-post.webp',
    outcome: 'Zero vehicle bottlenecks reported across warehouse loading docks.',
    specs: [
      { label: 'Post Chassis', value: '114mm circular aluminum extrusion with fluted locking channels' },
      { label: 'Blade Signs', value: 'Interchangeable directional chevrons with double-sided print' },
      { label: 'Reflectivity', value: 'Class RA1 retroreflective film visible under truck headlights' },
      { label: 'Foundation', value: 'Sub-surface concrete anchor sleeve for quick post replacement' },
    ],
  },
  {
    title: 'Hospitality & Boutique Architectural Custom Flex Neon',
    category: 'Architectural Neon',
    sector: 'Corporate Architecture',
    clientIndustry: 'Hospitality & Dining',
    division: 'signage',
    blurb:
      'Custom crafted silicone flex LED neon signs with transparent acrylic backing and dimmable power drivers for high-end hospitality venues.',
    volume: '4 Installations',
    deadline: '5 Working Days',
    materials: 'IP67 Silicone LED Flex Tube, 8mm Cast Acrylic Backer',
    image_url: '/images/signage/custom-flex-neon.webp',
    outcome: 'Vibrant photo-worthy ambiance generating high organic social media engagement.',
    specs: [
      { label: 'Neon Chemistry', value: 'UV-resistant silicone extrusion (never hardens or discolors)' },
      { label: 'Voltage', value: 'Safe 12V low-voltage operation with Mean Well transformer' },
      { label: 'Controls', value: 'RF wireless remote dimmer with multi-level luminance' },
      { label: 'Lifespan', value: '45,000+ Operating hours with zero gas maintenance' },
    ],
  },

  // ── TOUCHLINE AWARDS CASE STUDIES ──
  {
    title: 'National Banking Leadership & Excellence Crystal Pillar Awards',
    category: 'Optical Crystal',
    sector: 'Recognition & Honors',
    clientIndustry: 'Financial Banking',
    division: 'awards',
    blurb:
      'Flawless optical crystal pillars with deep 3D subsurface laser engraving and beveled geometric prisms for annual corporate excellence.',
    volume: '85 Trophies',
    deadline: '5 Working Days',
    materials: 'K9 Optical Grade Lead-Free Crystal, Midnight Velvet Box',
    image_url: '/images/awards/prismara-crystal-pillar.webp',
    outcome: '100% distortion-free clarity inspected under polarized light before dispatch.',
    specs: [
      { label: 'Crystal Grade', value: 'K9 Optical Precision Crystal (zero bubbles or inclusions)' },
      { label: 'Engraving', value: 'Subsurface 3D volumetric laser micro-fracture etching' },
      { label: 'Weight', value: '2.4kg solid crystal pillar with weighted bevel base' },
      { label: 'Packaging', value: 'Satin-lined hardbox presentation case with magnetic latch' },
    ],
  },
  {
    title: 'Annual Energy Sector Lifetime Achievement Flame Trophies',
    category: 'Prestige Trophies',
    sector: 'Recognition & Honors',
    clientIndustry: 'Energy & Petroleum',
    division: 'awards',
    blurb:
      'Artistic optical crystal flame trophies mounted on solid black crystal bases with polished facets capturing boardroom light.',
    volume: '40 Trophies',
    deadline: '6 Working Days',
    materials: 'Hand-Cut Optical Crystal, Mirror Polished Black Crystal Base',
    image_url: '/images/awards/prestige-flame-trophy.webp',
    outcome: 'Presented at the East Africa Energy Gala to distinguished industry leaders.',
    specs: [
      { label: 'Sculpting', value: 'Hand-ground flame contour with diamond lapidary wheels' },
      { label: 'Base Marking', value: 'High-contrast sandblast deep etching with gold colorfill' },
      { label: 'Stock Guarantee', value: 'Stocked blanks engraved and delivered within 48 hours' },
      { label: 'Certificate', value: 'Includes serialized certificate of authenticity' },
    ],
  },
  {
    title: 'Pan-African Sustainability & Environmental Impact Globe Awards',
    category: 'Global Achievement',
    sector: 'Recognition & Honors',
    clientIndustry: 'International NGO & ESG',
    division: 'awards',
    blurb:
      'Spun optical crystal globes with frosted continents mounted on tiered crystal pedestals for pan-African environmental sustainability summits.',
    volume: '50 Awards',
    deadline: '7 Working Days',
    materials: 'Hand-Etched K9 Crystal Globe, Polished Base',
    image_url: '/images/awards/globe-achievement-award.webp',
    outcome: 'Recognized by international environmental delegates as a masterwork of recognition art.',
    specs: [
      { label: 'Globe Detailing', value: '3D Laser-frosted topographical continental outlines' },
      { label: 'Inscriptions', value: 'Direct laser surface anneal with recipient personalized names' },
      { label: 'Inspection', value: 'Microscope QA verified with zero edge chips' },
      { label: 'Transit Safety', value: 'Custom high-density foam travel protective pack' },
    ],
  },
  {
    title: 'Judicial & Long Service Honor Teak Wood & Tempered Glass Plaques',
    category: 'Service Plaques',
    sector: 'Recognition & Honors',
    clientIndustry: 'Judiciary & Public Service',
    division: 'awards',
    blurb:
      'Sustainably harvested African Teak timber backboards with floating beveled tempered glass panels and brass decorative standoff screws.',
    volume: '120 Plaques',
    deadline: '6 Working Days',
    materials: 'African Teak Hardwood, 6mm Toughened Glass, Solid Brass Standoffs',
    image_url: '/images/awards/african-teak-glass-plaque.webp',
    outcome: 'Timeless judicial heirloom quality cherished by retiring civil servants.',
    specs: [
      { label: 'Timber Source', value: 'Kiln-dried sustainable African Teak with Danish oil finish' },
      { label: 'Glass Rating', value: '6mm Toughened safety glass with pencil-polished edges' },
      { label: 'Laser Detail', value: 'Reverse glass frost etching with metallic gold backfill' },
      { label: 'Mounting Style', value: 'Keyhole routed rear slot for flush wall mounting' },
    ],
  },
  {
    title: 'Manufacturing Executive Peak Leadership Crystal Tower',
    category: 'Crystal Towers',
    sector: 'Recognition & Honors',
    clientIndustry: 'Manufacturing Excellence',
    division: 'awards',
    blurb:
      'Monumental crystal obelisk towers with multi-faceted diamond cut crown symbolizing pinnacle manufacturing and supply chain milestones.',
    volume: '30 Trophies',
    deadline: '4 Working Days',
    materials: 'Extra-Clear K9 Crystal, Precision Beveled Edges',
    image_url: '/images/awards/ascendant-crystal-tower.webp',
    outcome: 'Executive recognition centerpiece commanding corporate trophy cabinets.',
    specs: [
      { label: 'Tower Height', value: '320mm monumental stature with diamond pinnacle apex' },
      { label: 'Engraving Field', value: 'Vertical high-resolution 1200 DPI laser mark' },
      { label: 'Optical Purity', value: 'Class A low-iron optical transmittance' },
      { label: 'Presentation', value: 'Velvet-lined gift casket with foil stamped logo' },
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
  'Recognition & Honors',
];

export function PortfolioGallery({
  brand,
  limit,
  items,
  initialDivision,
}: {
  brand: BrandConfig;
  limit?: number;
  items?: PortfolioItem[];
  initialDivision?: 'all' | 'branding' | 'signage' | 'awards';
}) {
  const searchParams = useSearchParams();
  const brandQuery = searchParams?.get('brand');

  const resolvedInitial =
    initialDivision ||
    (brandQuery === 'branding' || brandQuery === 'signage' || brandQuery === 'awards'
      ? brandQuery
      : brand.id === 'signage'
      ? 'signage'
      : 'branding');

  const [selectedDivision, setSelectedDivision] = useState<'all' | 'branding' | 'signage' | 'awards'>(resolvedInitial);
  const [selectedSector, setSelectedSector] = useState<string>('All Sectors');
  const [viewMode, setViewMode] = useState<'case-studies' | 'catalog-archive'>('case-studies');
  const [catalogSubcategory, setCatalogSubcategory] = useState<string>('all');
  const [catalogSearch, setCatalogSearch] = useState<string>('');

  // Sync state if URL query changes
  useEffect(() => {
    if (brandQuery === 'branding' || brandQuery === 'signage' || brandQuery === 'awards') {
      setSelectedDivision(brandQuery);
      setCatalogSubcategory('all');
    }
  }, [brandQuery]);
  const [activeModalProject, setActiveModalProject] = useState<PortfolioGalleryItem | null>(null);
  const [activeCatalogModalItem, setActiveCatalogModalItem] = useState<{
    id: string;
    sku: string;
    title: string;
    category: string;
    badge: string;
    image: string;
    specs: string[];
    turnaround: string;
    division: 'signage' | 'branding' | 'awards';
    priceKes?: number;
  } | null>(null);

  // 1. Featured Case Studies Filter
  const allProjects = EXTENDED_PORTFOLIO;
  const filteredProjects = allProjects.filter((item) => {
    const matchesDivision =
      selectedDivision === 'all' || item.division === selectedDivision;
    const matchesSector =
      selectedSector === 'All Sectors' || item.sector === selectedSector;
    return matchesDivision && matchesSector;
  });
  const visibleCaseStudies = limit ? filteredProjects.slice(0, limit) : filteredProjects;

  // 2. Complete Catalog Archive (Unified 244 authentic items)
  const unifiedCatalogItems = useMemo(() => {
    const list: Array<{
      id: string;
      sku: string;
      title: string;
      category: string;
      categorySlug: string;
      badge: string;
      image: string;
      specs: string[];
      turnaround: string;
      division: 'signage' | 'branding' | 'awards';
      priceKes?: number;
    }> = [];

    SIGNAGE_CATALOG_ITEMS.forEach((it) => {
      list.push({
        id: it.id,
        sku: it.id,
        title: it.title,
        category: it.category,
        categorySlug: it.categorySlug,
        badge: it.badge,
        image: it.image,
        specs: it.specs,
        turnaround: it.turnaround,
        division: 'signage',
        priceKes: 18000,
      });
    });

    BRANDING_CATALOG_ITEMS.forEach((it) => {
      list.push({
        id: it.id,
        sku: it.sku,
        title: it.title,
        category: it.category,
        categorySlug: it.categorySlug,
        badge: it.category,
        image: it.image,
        specs: it.specs,
        turnaround: it.turnaround,
        division: 'branding',
        priceKes: it.priceKes,
      });
    });

    AWARDS_CATALOG_ITEMS.forEach((it) => {
      list.push({
        id: it.id,
        sku: it.sku,
        title: it.title,
        category: it.category,
        categorySlug: it.categorySlug,
        badge: it.badge,
        image: it.image,
        specs: it.specs,
        turnaround: it.turnaround,
        division: 'awards',
        priceKes: it.priceKes,
      });
    });

    return list;
  }, []);

  // Filter Catalog Archive by Division, Subcategory, & Search
  const filteredCatalogItems = useMemo(() => {
    return unifiedCatalogItems.filter((item) => {
      const matchesDiv = selectedDivision === 'all' || item.division === selectedDivision;
      const matchesSub = catalogSubcategory === 'all' || item.categorySlug === catalogSubcategory;
      const q = catalogSearch.toLowerCase().trim();
      const matchesQ =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.sku.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.specs.some((s) => s.toLowerCase().includes(q));

      return matchesDiv && matchesSub && matchesQ;
    });
  }, [unifiedCatalogItems, selectedDivision, catalogSubcategory, catalogSearch]);

  // Dynamic Subcategories for current division
  const currentSubcategories = useMemo(() => {
    if (selectedDivision === 'signage') return SIGNAGE_CATALOG_CATEGORIES;
    if (selectedDivision === 'branding') return BRANDING_CATALOG_CATEGORIES;
    if (selectedDivision === 'awards') return AWARDS_CATALOG_CATEGORIES;
    return [{ slug: 'all', label: 'All Subcategories' }];
  }, [selectedDivision]);

  return (
    <section className="section-py border-t border-[var(--border)] bg-[var(--bg)]">
      <div className="max-w-content mx-auto px-6">
        {/* Header & Metric Counter */}
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6 mb-8 pb-6 border-b border-[var(--border)]">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] font-mono text-xs uppercase tracking-widest mb-3">
                Verified Kenyan Deliveries &amp; Works
              </div>
              <h2 className="font-display text-3xl md:text-5xl uppercase tracking-wider text-[var(--text)]">
                Project Log &amp; Works Showcase
              </h2>
            </div>

            {/* Quick Metrics */}
            <div className="flex items-center gap-6 text-right">
              <div>
                <span className="font-display text-2xl md:text-3xl font-bold text-[var(--accent)] block">
                  244+
                </span>
                <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase">
                  Verified Works
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

        {/* ── Official PDF Catalog Download Banner ─────────────────────── */}
        {!limit && (
          <Reveal delay={40}>
            <div className="mb-10 p-6 rounded-2xl bg-gradient-to-r from-neutral-900 via-neutral-900 to-neutral-800 text-white border border-neutral-700 shadow-xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded text-[10px] font-mono uppercase tracking-widest bg-white/10 text-neutral-300">
                  Official Procurement Specification Manuals
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
                  Download Full Division Catalogs (PDF)
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 max-w-xl">
                  Access comprehensive specification manuals containing all 244+ verified Kenyan production standards, architectural blueprints, substrate tolerances, and turnaround schedules.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                <Link
                  href="/catalog/signage/pdf"
                  target="_blank"
                  className="px-4 py-2.5 rounded-xl bg-[#0070f3] hover:bg-[#0070f3]/90 text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
                >
                  <span>Signage Catalog PDF</span>
                  <span>↗</span>
                </Link>
                <Link
                  href="/catalog/branding/pdf"
                  target="_blank"
                  className="px-4 py-2.5 rounded-xl bg-[#c8960c] hover:bg-[#c8960c]/90 text-neutral-950 text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
                >
                  <span>Branding Catalog PDF</span>
                  <span>↗</span>
                </Link>
                <Link
                  href="/catalog/awards/pdf"
                  target="_blank"
                  className="px-4 py-2.5 rounded-xl bg-[#9B2345] hover:bg-[#9B2345]/90 text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
                >
                  <span>Awards Catalog PDF</span>
                  <span>↗</span>
                </Link>
              </div>
            </div>
          </Reveal>
        )}

        {/* ── View Switcher & Filter Bar ─────────────────────────────── */}
        {!limit && (
          <Reveal delay={80}>
            <div className="space-y-5 mb-10 p-6 rounded-[var(--radius-lg)] bg-[var(--bg-soft)] border border-[var(--border)]">
              {/* Primary View Toggle: Case Studies vs. Full Works Archive */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[var(--border)]">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] mr-1">
                    Display View:
                  </span>
                  <div className="inline-flex p-1 rounded-xl bg-[var(--bg)] border border-[var(--border)]">
                    <button
                      onClick={() => setViewMode('case-studies')}
                      className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        viewMode === 'case-studies'
                          ? 'bg-[var(--accent)] text-[var(--accent-ink)] shadow-xs'
                          : 'text-[var(--text-muted)] hover:text-[var(--text)]'
                      }`}
                    >
                      Verified Case Studies ({visibleCaseStudies.length})
                    </button>
                    <button
                      onClick={() => setViewMode('catalog-archive')}
                      className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        viewMode === 'catalog-archive'
                          ? 'bg-[var(--accent)] text-[var(--accent-ink)] shadow-xs'
                          : 'text-[var(--text-muted)] hover:text-[var(--text)]'
                      }`}
                    >
                      Complete Works Archive ({filteredCatalogItems.length})
                    </button>
                  </div>
                </div>

                <div className="text-xs font-mono text-[var(--text-muted)]">
                  {viewMode === 'case-studies' ? (
                    <>Showing detailed rollouts with delivery metrics</>
                  ) : (
                    <>Showing authentic photography catalog ({filteredCatalogItems.length} items)</>
                  )}
                </div>
              </div>

              {/* Division Selector */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)]">
                    Division:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    <button
                      onClick={() => {
                        setSelectedDivision('all');
                        setCatalogSubcategory('all');
                      }}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        selectedDivision === 'all'
                          ? 'bg-[var(--text)] text-[var(--bg)] font-bold'
                          : 'bg-[var(--bg)] text-[var(--text-muted)] hover:text-[var(--text)] border border-[var(--border)]'
                      }`}
                    >
                      All Divisions
                    </button>
                    <button
                      onClick={() => {
                        setSelectedDivision('branding');
                        setCatalogSubcategory('all');
                      }}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        selectedDivision === 'branding'
                          ? 'bg-[#c8960c] text-white font-bold shadow-md shadow-[#c8960c]/20'
                          : 'bg-[var(--bg)] text-[var(--text-muted)] hover:text-[var(--text)] border border-[var(--border)]'
                      }`}
                    >
                      Branding &amp; Merchandise
                    </button>
                    <button
                      onClick={() => {
                        setSelectedDivision('signage');
                        setCatalogSubcategory('all');
                      }}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        selectedDivision === 'signage'
                          ? 'bg-[#0070f3] text-white font-bold shadow-md shadow-[#0070f3]/20'
                          : 'bg-[var(--bg)] text-[var(--text-muted)] hover:text-[var(--text)] border border-[var(--border)]'
                      }`}
                    >
                      Signage &amp; Fabrication
                    </button>
                    <button
                      onClick={() => {
                        setSelectedDivision('awards');
                        setCatalogSubcategory('all');
                      }}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        selectedDivision === 'awards'
                          ? 'bg-[#9B2345] text-white font-bold shadow-md shadow-[#9B2345]/20'
                          : 'bg-[var(--bg)] text-[var(--text-muted)] hover:text-[var(--text)] border border-[var(--border)]'
                      }`}
                    >
                      Awards &amp; Recognition
                    </button>
                  </div>
                </div>
              </div>

              {/* Secondary Filter: Sector (for Case Studies) OR Subcategory & Search (for Catalog Archive) */}
              {viewMode === 'case-studies' ? (
                <div className="flex flex-wrap items-center gap-1.5 pt-3 border-t border-[var(--border)]">
                  <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] mr-2">
                    Industry Sector:
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
              ) : (
                <div className="space-y-3 pt-3 border-t border-[var(--border)]">
                  {/* Search input + Subcategory filter pills */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] mr-2">
                        Category:
                      </span>
                      {currentSubcategories.map((cat) => (
                        <button
                          key={cat.slug}
                          onClick={() => setCatalogSubcategory(cat.slug)}
                          className={`px-3 py-1 rounded text-[11px] font-mono transition-all ${
                            catalogSubcategory === cat.slug
                              ? 'bg-[var(--accent)] text-[var(--accent-ink)] font-bold'
                              : 'bg-[var(--bg)] text-[var(--text-muted)] hover:text-[var(--text)] border border-[var(--border)]'
                          }`}
                        >
                          {cat.label}
                        </button>
                      ))}
                    </div>

                    <div className="relative w-full sm:w-64 shrink-0">
                      <input
                        type="text"
                        value={catalogSearch}
                        onChange={(e) => setCatalogSearch(e.target.value)}
                        placeholder="Search SKU, material, title..."
                        className="w-full px-3 py-1.5 text-xs rounded-lg bg-[var(--bg)] border border-[var(--border)] text-[var(--text)] placeholder-[var(--text-muted)] focus:outline-hidden focus:border-[var(--accent)] font-mono"
                      />
                      {catalogSearch && (
                        <button
                          onClick={() => setCatalogSearch('')}
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[var(--text-muted)] hover:text-[var(--text)]"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Reveal>
        )}

        {/* ── 1. CASE STUDIES GRID VIEW ───────────────────────────────── */}
        {viewMode === 'case-studies' ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visibleCaseStudies.map((item, i) => {
              const isBranding = item.division === 'branding';
              const accentTone = isBranding ? '#c8960c' : item.division === 'awards' ? '#9B2345' : '#0070f3';

              return (
                <Reveal key={item.title} delay={(i % 3) * 100}>
                  <div className="card-surface group rounded-[var(--radius-lg)] p-3 border border-[var(--border)] hover:border-[var(--accent)]/40 transition-all duration-300 h-full flex flex-col justify-between shadow-md">
                    <div>
                      {/* Visual Card */}
                      <div className="relative h-60 w-full overflow-hidden rounded-[var(--radius-md)] bg-[var(--bg-soft)] border border-[var(--border)] mb-4">
                        <ProjectPhoto
                          src={item.image_url || '/images/branding/branding-hero.webp'}
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
        ) : (
          /* ── 2. COMPLETE WORKS & CATALOG ARCHIVE GRID ───────────────── */
          <div>
            {filteredCatalogItems.length === 0 ? (
              <div className="text-center py-16 card-surface rounded-2xl border border-[var(--border)]">
                <p className="text-sm text-[var(--text-muted)] font-mono mb-3">
                  No catalog items found matching your current filter.
                </p>
                <button
                  onClick={() => {
                    setCatalogSubcategory('all');
                    setCatalogSearch('');
                  }}
                  className="btn-secondary text-xs"
                >
                  Reset Catalog Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredCatalogItems.map((item, idx) => {
                  const divColor =
                    item.division === 'signage'
                      ? '#0070f3'
                      : item.division === 'branding'
                      ? '#c8960c'
                      : '#9B2345';

                  return (
                    <Reveal key={item.id} delay={(idx % 4) * 60}>
                      <div className="card-surface rounded-xl p-3 border border-[var(--border)] hover:border-[var(--accent)]/50 transition-all duration-300 flex flex-col justify-between h-full group shadow-xs">
                        <div>
                          {/* Image Container */}
                          <div
                            onClick={() => setActiveCatalogModalItem(item)}
                            className="relative aspect-[4/3] w-full rounded-lg overflow-hidden bg-[var(--bg-soft)] border border-[var(--border)] mb-3 cursor-pointer group-hover:opacity-95"
                          >
                            <Image
                              src={item.image}
                              alt={item.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
                            />
                            <div className="absolute top-2 left-2 px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase bg-black/70 text-white backdrop-blur-xs">
                              {item.badge}
                            </div>
                            <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded text-[9px] font-mono bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                              Zoom ↗
                            </div>
                          </div>

                          {/* SKU & Category */}
                          <div className="flex items-center justify-between gap-1 mb-1">
                            <span className="font-mono text-[10px] font-bold text-[var(--text-muted)]">
                              {item.sku}
                            </span>
                            <span
                              className="font-mono text-[9px] uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded"
                              style={{ color: divColor, backgroundColor: `${divColor}15` }}
                            >
                              {item.division}
                            </span>
                          </div>

                          <h4
                            onClick={() => setActiveCatalogModalItem(item)}
                            className="font-display text-sm font-bold text-[var(--text)] group-hover:text-[var(--accent)] transition-colors line-clamp-2 cursor-pointer mb-2 leading-snug"
                          >
                            {item.title}
                          </h4>

                          {/* Specs */}
                          <ul className="space-y-1 mb-3 text-[10px] text-[var(--text-muted)] font-mono">
                            {item.specs.slice(0, 2).map((sp, sIdx) => (
                              <li key={sIdx} className="truncate">
                                ▪ {sp}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Card Bottom: Lead time & Quote CTA */}
                        <div className="pt-2.5 border-t border-[var(--border)] flex items-center justify-between text-xs">
                          <div>
                            <span className="text-[9px] text-[var(--text-muted)] font-mono block">
                              Turnaround
                            </span>
                            <span className="font-mono font-bold text-[var(--text)] text-[11px]">
                              {item.turnaround}
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => setActiveCatalogModalItem(item)}
                              className="px-2 py-1 rounded text-[11px] font-mono bg-[var(--bg-soft)] text-[var(--text)] hover:bg-[var(--border)]"
                            >
                              Specs
                            </button>
                            <a
                              href={`https://wa.me/254700000000?text=${encodeURIComponent(
                                `Hi Touchline, I am inquiring about ${item.title} (${item.sku}) from your online works catalog.`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-2.5 py-1 rounded text-[11px] font-bold text-white shadow-xs"
                              style={{ backgroundColor: divColor }}
                            >
                              Quote ↗
                            </a>
                          </div>
                        </div>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ── Detailed Modal Spec Sheet (Case Studies) ─────────────────── */}
        {activeModalProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
            <div className="bg-[var(--surface)] border-2 border-[var(--accent)] rounded-[var(--radius-lg)] max-w-2xl w-full p-6 md:p-8 max-h-[90vh] overflow-y-auto shadow-2xl relative">
              <div className="flex items-start justify-between gap-4 mb-6 pb-4 border-b border-[var(--border)]">
                <div>
                  <span
                    className="font-mono text-xs uppercase tracking-widest font-bold block mb-1"
                    style={{
                      color:
                        activeModalProject.division === 'branding'
                          ? '#c8960c'
                          : activeModalProject.division === 'awards'
                          ? '#9B2345'
                          : '#0070f3',
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
                      Engineering &amp; Material Specifications
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

        {/* ── Catalog Item Zoom Modal ───────────────────────────────── */}
        {activeCatalogModalItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
            <div className="bg-[var(--surface)] border-2 border-[var(--border)] rounded-2xl max-w-2xl w-full p-6 md:p-8 max-h-[90vh] overflow-y-auto shadow-2xl relative">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <span className="font-mono text-xs uppercase tracking-widest text-[var(--accent)] font-bold block mb-1">
                    {activeCatalogModalItem.sku} · {activeCatalogModalItem.category}
                  </span>
                  <h3 className="font-display text-2xl text-[var(--text)] font-bold">
                    {activeCatalogModalItem.title}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveCatalogModalItem(null)}
                  className="p-2 rounded-lg bg-[var(--bg-soft)] text-[var(--text)] hover:bg-[var(--border)] text-sm font-bold"
                >
                  ✕
                </button>
              </div>

              <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-black/40 border border-[var(--border)] mb-5">
                <Image
                  src={activeCatalogModalItem.image}
                  alt={activeCatalogModalItem.title}
                  fill
                  className="object-contain"
                />
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-mono text-xs uppercase tracking-wider text-[var(--text-muted)] mb-2">
                    Production &amp; Material Specifications
                  </h4>
                  <ul className="space-y-1.5 text-xs text-[var(--text)] font-mono">
                    {activeCatalogModalItem.specs.map((sp, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="text-[var(--accent)] font-bold">✔</span>
                        <span>{sp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-[var(--bg-soft)] border border-[var(--border)] text-xs font-mono">
                  <span>Standard Production Turnaround:</span>
                  <span className="font-bold text-[var(--text)]">
                    {activeCatalogModalItem.turnaround}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3 pt-4 border-t border-[var(--border)]">
                  <button
                    onClick={() => setActiveCatalogModalItem(null)}
                    className="btn-ghost text-xs"
                  >
                    Close
                  </button>
                  <a
                    href={`https://wa.me/254700000000?text=${encodeURIComponent(
                      `Hi Touchline, I am requesting a quote for ${activeCatalogModalItem.title} (Code: ${activeCatalogModalItem.sku}) from your official works catalog.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary text-xs font-semibold py-2.5 px-6 flex items-center gap-2"
                  >
                    <span>Request WhatsApp Quote</span>
                    <span>↗</span>
                  </a>
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
