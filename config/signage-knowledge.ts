// =============================================================================
// SIGNAGE INDUSTRY KNOWLEDGE BASE
// Context-aware signage intelligence for Kenya, East Africa, and global markets
// Last updated: September 2026
// =============================================================================

export type ClimateZone = 'coastal' | 'highland' | 'lake' | 'arid' | 'urban';

export type IndustrySector =
  | 'retail' | 'hospitality' | 'healthcare' | 'education' | 'corporate'
  | 'industrial' | 'government' | 'real-estate' | 'transport' | 'entertainment'
  | 'banking' | 'ngo' | 'energy' | 'agriculture';

export type SignageType =
  | 'channel-letters' | 'led-neon' | 'halo-signs' | 'lightbox'
  | 'dimensional' | 'vinyl-wrap' | 'window-graphic' | 'wall-mural'
  | 'floor-graphic' | 'banner' | 'monument' | 'pylon' | 'wayfinding'
  | 'directory' | 'fascia' | 'awning' | 'safety-sign' | 'digital-display';

export type Material =
  | 'acrylic' | 'aluminium-composite' | 'stainless-steel' | 'foam-board'
  | 'vinyl' | 'polycarbonate' | 'led-module' | 'steel-frame'
  | 'timber' | 'stone' | 'concrete' | 'glass' | 'fabric';

// ---------------------------------------------------------------------------
// MARKET INTELLIGENCE
// ---------------------------------------------------------------------------

export const MARKET_DATA = {
  kenya: {
    totalSuppliers: 142,
    nairobiConcentration: 86.6,
    signageMarketUSD: 89_000_000, // estimated 2025
    projectedGrowthUSD: 142_000_000, // 2032
    cagr: 6.8, // 2026-2032
    ledShareOfMarket: 45, // percentage of new installs
    averageProjectValue: 'KES 85,000-250,000',
    digitalSignageGrowth: 12.5, // % YoY
    topCategories: ['Illuminated signs', 'Vehicle wraps', 'Wayfinding', 'Shopfront fascia'],
  },
  africa: {
    digitalSignageMarketUSD: 1.8e9, // 2025
    projectedGrowthUSD: 3.2e9, // 2030
    cagr: 12.1,
    vehicleBrandingGrowth: 8.5, // % YoY
    ledAdoptionRate: 38, // % of new installations
  },
  global: {
    signageMarketUSD: 52.8e9, // 2025
    projectedGrowthUSD: 78.4e9, // 2030
    cagr: 8.2,
    digitalSignageShare: 35, // % of market
    ledSignageShare: 62, // % of illuminated signs
  },
} as const;

// ---------------------------------------------------------------------------
// SIGNAGE TYPES & SPECIFICATIONS
// ---------------------------------------------------------------------------

export const SIGNAGE_TYPES: Record<string, {
  name: string;
  description: string;
  bestFor: string[];
  priceRange: string;
  lifespan: string;
  materials: Material[];
  ledOption?: boolean;
  illumination?: 'front-lit' | 'back-lit' | 'halo' | 'edge-lit' | 'none';
  outdoorRated: boolean;
  installationTime: string;
}> = {
  'channel-letters': {
    name: 'Channel Letters (3D)',
    description: 'Individual 3D letters with internal LED modules. Front-lit, back-lit (halo), or combination.',
    bestFor: ['Storefronts', 'Shopping malls', 'Corporate offices', 'Restaurant signage'],
    priceRange: 'KES 8,000-25,000 per letter',
    lifespan: '7-10 years',
    materials: ['acrylic', 'aluminium-composite', 'led-module'],
    ledOption: true,
    illumination: 'front-lit',
    outdoorRated: true,
    installationTime: '1-2 days',
  },
  'led-neon': {
    name: 'LED Neon Flex',
    description: 'Flexible LED tubes that mimic traditional neon. Custom shapes, warm glow, no fragility.',
    bestFor: ['Cafes', 'Bars', 'Restaurants', 'Instagram walls', 'Retail displays'],
    priceRange: 'KES 5,000-15,000 per metre',
    lifespan: '5-7 years',
    materials: ['led-module', 'polycarbonate'],
    ledOption: true,
    illumination: 'front-lit',
    outdoorRated: true,
    installationTime: '1 day',
  },
  'halo-signs': {
    name: 'Backlit / Halo Signs',
    description: 'LED light projected backward against the wall, creating a soft glowing halo around each letter.',
    bestFor: ['Upscale restaurants', 'Corporate lobbies', 'Hotels', 'Premium retail'],
    priceRange: 'KES 10,000-30,000 per letter',
    lifespan: '7-10 years',
    materials: ['stainless-steel', 'acrylic', 'led-module'],
    ledOption: true,
    illumination: 'halo',
    outdoorRated: true,
    installationTime: '1-2 days',
  },
  'lightbox': {
    name: 'Lightbox Signs',
    description: 'Enclosed sign boxes with translucent faces and even LED illumination — cost-effective and versatile.',
    bestFor: ['Retail chains', 'Storefronts', 'Full-colour logos', 'Mall directories'],
    priceRange: 'KES 15,000-60,000',
    lifespan: '5-7 years',
    materials: ['aluminium-composite', 'acrylic', 'led-module'],
    ledOption: true,
    illumination: 'front-lit',
    outdoorRated: true,
    installationTime: '1 day',
  },
  'dimensional': {
    name: 'Dimensional Letters',
    description: 'Cut from acrylic, aluminium, or stainless steel and mounted with standoffs for depth and shadow.',
    bestFor: ['Lobby signs', 'Building IDs', 'Corporate branding', 'Reception areas'],
    priceRange: 'KES 3,000-15,000 per letter',
    lifespan: '10+ years',
    materials: ['acrylic', 'aluminium-composite', 'stainless-steel'],
    outdoorRated: true,
    installationTime: '1 day',
  },
  'vinyl-wrap': {
    name: 'Vehicle Wraps',
    description: 'Full and partial vehicle wraps colour-matched to brand guidelines. Cast or calendar vinyl.',
    bestFor: ['Fleets', 'Delivery vehicles', 'Personal cars', 'Mobile advertising'],
    priceRange: 'KES 45,000-120,000 per vehicle',
    lifespan: '3-5 years (cast) / 1-3 years (calendar)',
    materials: ['vinyl'],
    outdoorRated: true,
    installationTime: '2-3 days',
  },
  'window-graphic': {
    name: 'Window Graphics',
    description: 'Perforated vinyl, frosted film, or printed decals for glass surfaces.',
    bestFor: ['Storefronts', 'Offices', 'Restaurants', 'Privacy screening'],
    priceRange: 'KES 2,000-8,000 per sqm',
    lifespan: '2-4 years',
    materials: ['vinyl', 'polycarbonate'],
    outdoorRated: true,
    installationTime: '1 day',
  },
  'wall-mural': {
    name: 'Wall Graphics & Murals',
    description: 'Large-format vinyl prints for interior and exterior walls.',
    bestFor: ['Offices', 'Retail spaces', 'Restaurants', 'Gyms', 'Schools'],
    priceRange: 'KES 3,000-10,000 per sqm',
    lifespan: '3-5 years',
    materials: ['vinyl'],
    outdoorRated: true,
    installationTime: '1-2 days',
  },
  'floor-graphic': {
    name: 'Floor Graphics',
    description: 'Durable, slip-resistant vinyl for floor branding and wayfinding.',
    bestFor: ['Retail aisles', 'Events', 'Exhibitions', 'Supermarkets'],
    priceRange: 'KES 2,500-6,000 per sqm',
    lifespan: '6-12 months',
    materials: ['vinyl'],
    outdoorRated: false,
    installationTime: '1 day',
  },
  'banner': {
    name: 'Banner & Flag Printing',
    description: 'Vinyl or fabric banners for events, promotions, and outdoor advertising.',
    bestFor: ['Events', 'Storefronts', 'Trade shows', 'Grand openings'],
    priceRange: 'KES 1,500-5,000 per sqm',
    lifespan: '1-3 years',
    materials: ['fabric', 'vinyl'],
    outdoorRated: true,
    installationTime: '1 day',
  },
  'monument': {
    name: 'Monument Signs',
    description: 'Ground-level freestanding structures at property entrances. Masonry, stone, metal, or concrete.',
    bestFor: ['Office parks', 'Shopping centres', 'Estates', 'Universities'],
    priceRange: 'KES 150,000-500,000+',
    lifespan: '15-20 years',
    materials: ['concrete', 'stone', 'steel-frame', 'acrylic'],
    ledOption: true,
    outdoorRated: true,
    installationTime: '3-7 days',
  },
  'pylon': {
    name: 'Pylon & Pole Signs',
    description: 'Elevated signs for highway and large parking area visibility.',
    bestFor: ['Petrol stations', 'Fast food', 'Highway businesses', 'Car dealerships'],
    priceRange: 'KES 200,000-800,000+',
    lifespan: '15-20 years',
    materials: ['steel-frame', 'aluminium-composite', 'led-module'],
    ledOption: true,
    outdoorRated: true,
    installationTime: '5-10 days',
  },
  'wayfinding': {
    name: 'Wayfinding & Directional',
    description: 'Interior and exterior navigation systems designed for clarity at a glance.',
    bestFor: ['Hospitals', 'Campuses', 'Malls', 'Multi-store buildings', 'Government offices'],
    priceRange: 'KES 5,000-25,000 per sign',
    lifespan: '7-10 years',
    materials: ['acrylic', 'aluminium-composite', 'polycarbonate'],
    outdoorRated: true,
    installationTime: '2-5 days',
  },
  'directory': {
    name: 'Directory Signs',
    description: 'Multi-tenant boards with changeable or fixed panels.',
    bestFor: ['Office buildings', 'Mixed-use developments', 'Shopping centres'],
    priceRange: 'KES 25,000-80,000',
    lifespan: '10+ years',
    materials: ['acrylic', 'aluminium-composite', 'glass'],
    outdoorRated: true,
    installationTime: '1-2 days',
  },
  'fascia': {
    name: 'Fascia & Shopfront',
    description: 'Building face signage that defines your storefront and captures foot traffic.',
    bestFor: ['Retail chains', 'Restaurants', 'Pharmacies', 'Banks'],
    priceRange: 'KES 30,000-120,000',
    lifespan: '5-7 years',
    materials: ['aluminium-composite', 'acrylic', 'led-module'],
    ledOption: true,
    outdoorRated: true,
    installationTime: '2-3 days',
  },
  'awning': {
    name: 'Awning & Canopy Signs',
    description: 'Branded fabric or vinyl coverings providing shade and signage.',
    bestFor: ['Restaurants', 'Cafes', 'Outdoor seating areas', 'Retail stores'],
    priceRange: 'KES 20,000-60,000',
    lifespan: '3-5 years',
    materials: ['fabric', 'steel-frame'],
    outdoorRated: true,
    installationTime: '1-2 days',
  },
  'safety-sign': {
    name: 'Safety & Compliance Signs',
    description: 'OSHA-compliant safety signage for workplaces, construction sites, and public buildings.',
    bestFor: ['Construction sites', 'Factories', 'Offices', 'Hospitals', 'Schools'],
    priceRange: 'KES 500-5,000',
    lifespan: '5-7 years',
    materials: ['aluminium-composite', 'polycarbonate', 'vinyl'],
    outdoorRated: true,
    installationTime: '1 day',
  },
  'digital-display': {
    name: 'Digital Signage Displays',
    description: 'LED/LCD screens for dynamic content, menus, and real-time information.',
    bestFor: ['Restaurants', 'Banks', 'Hotels', 'Transport hubs', 'Retail stores'],
    priceRange: 'KES 80,000-500,000+',
    lifespan: '5-7 years',
    materials: ['led-module', 'polycarbonate'],
    ledOption: true,
    outdoorRated: true,
    installationTime: '1-3 days',
  },
};

// ---------------------------------------------------------------------------
// HOT PRODUCTS — Kenya 2026 (by demand & trend)
// ---------------------------------------------------------------------------

export const HOT_PRODUCTS_KE = [
  { name: 'Illuminated Shopfront Signs', rank: 1, reason: 'Highest demand — retail expansion in Nairobi', priceRange: 'KES 35,000-120,000', type: 'fascia' as SignageType },
  { name: 'Vehicle Wraps', rank: 2, reason: 'Mobile advertising — 70,000+ impressions/day per vehicle', priceRange: 'KES 45,000-120,000', type: 'vinyl-wrap' as SignageType },
  { name: 'Channel Letters (3D LED)', rank: 3, reason: 'Premium storefront visibility, 24/7 illumination', priceRange: 'KES 8,000-25,000/letter', type: 'channel-letters' as SignageType },
  { name: 'Wayfinding Systems', rank: 4, reason: 'Hospitals, malls, campuses — compliance-driven demand', priceRange: 'KES 5,000-25,000/sign', type: 'wayfinding' as SignageType },
  { name: 'Monument Signs', rank: 5, reason: 'Office parks, estates, shopping centres — permanent branding', priceRange: 'KES 150,000-500,000+', type: 'monument' as SignageType },
  { name: 'Window Graphics', rank: 6, reason: 'Cost-effective storefront branding for SMEs', priceRange: 'KES 2,000-8,000/sqm', type: 'window-graphic' as SignageType },
  { name: 'LED Neon Signs', rank: 7, reason: 'Instagram-worthy — cafes, bars, restaurants', priceRange: 'KES 5,000-15,000/m', type: 'led-neon' as SignageType },
  { name: 'Safety & Compliance Signs', rank: 8, reason: 'OSHA enforcement increasing — mandatory for all workplaces', priceRange: 'KES 500-5,000', type: 'safety-sign' as SignageType },
  { name: 'Digital Menu Boards', rank: 9, reason: 'Quick-service restaurants adopting digital displays', priceRange: 'KES 80,000-250,000', type: 'digital-display' as SignageType },
  { name: 'Banners & Event Flags', rank: 10, reason: 'Events, trade shows, grand openings — high turnover', priceRange: 'KES 1,500-5,000/sqm', type: 'banner' as SignageType },
] as const;

// ---------------------------------------------------------------------------
// GLOBAL TRENDS — 2026
// ---------------------------------------------------------------------------

export const GLOBAL_TRENDS_2026 = [
  {
    name: 'Smart Digital Signage',
    description: 'AI-powered content management, real-time data feeds, and interactive touchscreens replacing static signs.',
    relevance: 'Restaurants, banks, transport hubs, retail — any high-traffic area',
    priceRange: 'KES 80,000-500,000+',
    types: ['digital-display'] as SignageType[],
  },
  {
    name: 'Sustainable Materials',
    description: 'Recycled aluminium, bamboo substrates, energy-efficient LEDs, and eco-friendly vinyl alternatives.',
    relevance: 'NGOs, ESG-focused corporates, government projects',
    priceRange: '+15-30% premium',
    types: ['fascia', 'monument', 'banner'] as SignageType[],
  },
  {
    name: 'Halo-Lit Premium',
    description: 'Back-lit/ halo-lit channel letters creating sophisticated, ambient brand presence.',
    relevance: 'Hotels, upscale restaurants, corporate lobbies, luxury retail',
    priceRange: 'KES 10,000-30,000/letter',
    types: ['halo-signs', 'channel-letters'] as SignageType[],
  },
  {
    name: 'Interactive Wayfinding',
    description: 'Digital kiosks and QR-coded navigation systems replacing static directional signs.',
    relevance: 'Hospitals, universities, shopping malls, government buildings',
    priceRange: 'KES 150,000-400,000',
    types: ['wayfinding', 'digital-display'] as SignageType[],
  },
  {
    name: 'Vehicle Wrap wraps',
    description: 'Full wraps with matte/colour-shift finishes — vehicles as mobile billboards.',
    relevance: 'Fleets, delivery companies, personal branding',
    priceRange: 'KES 45,000-120,000/vehicle',
    types: ['vinyl-wrap'] as SignageType[],
  },
  {
    name: '3D Printing for Signage',
    description: 'Custom 3D-printed letters and shapes for unique, complex geometries.',
    relevance: 'Boutique retail, restaurants, creative agencies',
    priceRange: 'KES 15,000-50,000',
    types: ['dimensional', 'channel-letters'] as SignageType[],
  },
] as const;

// ---------------------------------------------------------------------------
// CLIMATE ZONES & MATERIAL RECOMMENDATIONS
// ---------------------------------------------------------------------------

export const CLIMATE_ZONES: Record<ClimateZone, {
  name: string;
  regions: string[];
  conditions: string[];
  materialRecommendations: string[];
  durabilityGuidelines: string[];
  signageTypes: SignageType[];
}> = {
  coastal: {
    name: 'Coastal (Hot & Humid)',
    regions: ['Mombasa', 'Malindi', 'Kilifi', 'Lamu', 'Diani'],
    conditions: ['Salt air corrosion', 'High humidity (60-80% RH)', 'Intense UV', 'Monsoon rains'],
    materialRecommendations: [
      'Marine-grade stainless steel fixings',
      'Galvanized steel with anti-rust coating',
      'UV-stabilized acrylic faces',
      'IP65-rated electrical enclosures',
      'Sealed aluminium extrusions',
      'Powder-coated finishes (marine grade)',
      'Cast vinyl with UV-stabilized laminate',
      'Fibre cement substrates',
    ],
    durabilityGuidelines: [
      'Marine-grade fixings mandatory — standard zinc-plated corrodes in 18-36 months',
      'Sealed aluminium extrusions prevent moisture ingress at joints',
      'IP65 minimum for LED drivers in outdoor coastal applications',
      'Cast vinyl preferred over calendar for longevity',
      'UV-stabilized acrylic for illuminated signs',
      'Quarterly cleaning recommended to remove salt deposits',
    ],
    signageTypes: ['channel-letters', 'fascia', 'wayfinding', 'vinyl-wrap'],
  },
  highland: {
    name: 'Highland (Mild & Mixed)',
    regions: ['Nairobi', 'Nakuru', 'Nyeri', 'Nanyuki', 'Thika'],
    conditions: ['Temperature fluctuations', 'Moderate UV', 'Morning frost in some areas', 'Rainy seasons'],
    materialRecommendations: [
      'Aluminium composite panels (ACP)',
      'High-performance acrylic',
      'UV-resistant paint and coatings',
      'Standard LED modules',
      'Polycarbonate face panels',
    ],
    durabilityGuidelines: [
      'ACPs ideal for commercial exteriors and signage',
      'UV-resistant coatings essential for outdoor signage',
      'Standard materials generally perform well',
      'Thermal expansion joints recommended for large panels',
      'LED signage performs optimally in mild temperatures',
    ],
    signageTypes: ['channel-letters', 'lightbox', 'monument', 'wayfinding', 'fascia'],
  },
  lake: {
    name: 'Lake Region (Wet & Tropical)',
    regions: ['Kisumu', 'Bungoma', 'Kakamega', 'Siaya', 'Homa Bay'],
    conditions: ['High humidity (60-80% RH)', 'Heavy rainfall', 'Lake Victoria saline air', 'Heat'],
    materialRecommendations: [
      'Galvanized steel frames',
      'Waterproof LED enclosures',
      'UV-resistant finishes',
      'Sealed acrylic faces',
      'Anti-mold treatments for fabric banners',
    ],
    durabilityGuidelines: [
      'Waterproof sealing critical for all electrical components',
      'Ink adhesion testing essential for surfaces exposed to saline air',
      'Materials must withstand frequent washing/rain',
      'Anti-mold treatments recommended for fabric signage',
      'Elevated mounting to avoid flood-zone moisture',
    ],
    signageTypes: ['fascia', 'vinyl-wrap', 'wayfinding', 'banner'],
  },
  arid: {
    name: 'Arid & Semi-Arid',
    regions: ['Turkana', 'Isiolo', 'Marsabit', 'Garissa', 'Wajir', 'Mandera'],
    conditions: ['Extreme heat', 'Intense UV', 'Dust', 'Low humidity', 'Temperature swings'],
    materialRecommendations: [
      'UV-resistant finishes (mandatory)',
      'Dust-resistant LED enclosures',
      'Aluminium composite panels (ACPs)',
      'Galvanized steel with UV coating',
      'Sealed electrical connections',
    ],
    durabilityGuidelines: [
      'UV-resistant coatings mandatory — standard paint degrades rapidly',
      'Dust-resistant finishes for electronics/signage',
      'Materials must withstand 40°C+ temperatures',
      'Minimal maintenance options preferred',
      'LED signage performs well but needs dust protection',
      'Concrete/stone monuments most durable in extreme heat',
    ],
    signageTypes: ['monument', 'pylon', 'fascia', 'safety-sign'],
  },
  urban: {
    name: 'Urban Centers',
    regions: ['Nairobi CBD', 'Westlands', 'Upper Hill', 'Industrial Area', 'Mombasa CBD'],
    conditions: ['Pollution', 'High foot traffic', 'Vehicle exhaust', 'Limited outdoor exposure for indoor signage'],
    materialRecommendations: [
      'Aluminium composite panels (ACP)',
      'High-quality acrylic signage',
      'Anti-slip floor graphics',
      'Frosted window films',
      'LED illuminated signage',
      'High-traffic vinyl for wraps',
    ],
    durabilityGuidelines: [
      'High-traffic areas need anti-slip materials',
      'Indoor signage generally lasts longer',
      'Cleanable surfaces essential for retail',
      'LED signage for 24/7 visibility',
      'Vehicle wraps need cast vinyl for urban durability',
      'Regular cleaning schedules for pollution-prone areas',
    ],
    signageTypes: ['channel-letters', 'lightbox', 'vinyl-wrap', 'digital-display', 'wayfinding'],
  },
};

// ---------------------------------------------------------------------------
// INDUSTRY-SPECIFIC SIGNAGE GUIDES
// ---------------------------------------------------------------------------

export const INDUSTRY_GUIDES: Record<IndustrySector, {
  name: string;
  keyNeeds: string[];
  recommendedTypes: SignageType[];
  budgetGuide: string;
  complianceNotes?: string[];
}> = {
  retail: {
    name: 'Retail & Shopping',
    keyNeeds: ['Storefront visibility', 'Brand consistency', 'Seasonal flexibility', 'Foot traffic capture'],
    recommendedTypes: ['fascia', 'channel-letters', 'window-graphic', 'lightbox', 'vinyl-wrap'],
    budgetGuide: 'KES 35,000-150,000 for shopfront — highest ROI signage investment',
    complianceNotes: [
      'Storefront signs must comply with county bylaws',
      'Illuminated signs require KPLC connection permits',
      'Window graphics must not obstruct fire exits',
    ],
  },
  hospitality: {
    name: 'Hotels, Restaurants & Cafes',
    keyNeeds: ['Ambiance-appropriate design', 'Instagram-worthy aesthetics', 'Day-night visibility', 'Menu displays'],
    recommendedTypes: ['led-neon', 'halo-signs', 'channel-letters', 'digital-display', 'awning'],
    budgetGuide: 'Premium finish essential — brand perception directly impacts guest experience',
    complianceNotes: [
      'LED neon preferred over traditional neon (safety + durability)',
      'Outdoor seating areas need weather-resistant signage',
      'Digital menu boards reduce printing costs long-term',
    ],
  },
  healthcare: {
    name: 'Healthcare & Medical',
    keyNeeds: ['Wayfinding (critical)', 'Compliance signage', 'Professional appearance', 'Hygiene-friendly materials'],
    recommendedTypes: ['wayfinding', 'directory', 'safety-sign', 'dimensional', 'digital-display'],
    budgetGuide: 'Wayfinding investment pays off in reduced staff time directing visitors',
    complianceNotes: [
      'ISO 7010 standard for safety pictograms',
      'Emergency exit signs: green letters minimum 15cm height (OSHA 2007)',
      'Evacuation maps must be posted in prominent positions',
      'Fire extinguisher locations must be conspicuously marked',
      'Photoluminescent material recommended for exit signs',
    ],
  },
  education: {
    name: 'Schools & Universities',
    keyNeeds: ['Campus wayfinding', 'Building identification', 'Event signage', 'Safety compliance'],
    recommendedTypes: ['wayfinding', 'monument', 'directory', 'banner', 'safety-sign'],
    budgetGuide: 'Bulk campus-wide projects: KES 200,000-800,000 depending on scale',
    complianceNotes: [
      'Campus wayfinding critical for large institutions',
      'Safety signage mandatory under OSHA 2007',
      'Multilingual consideration (English + Kiswahili)',
      'Child-safe materials for primary schools',
    ],
  },
  corporate: {
    name: 'Corporate Offices',
    keyNeeds: ['Professional reception signage', 'Wayfinding for visitors', 'Brand consistency', 'Building identification'],
    recommendedTypes: ['dimensional', 'wayfinding', 'directory', 'fascia', 'halo-signs'],
    budgetGuide: 'KES 50,000-200,000 for reception + wayfinding system',
    complianceNotes: [
      'Reception signage creates first impression — invest in quality',
      'Wayfinding reduces receptionist workload',
      'Consistent typography and materials throughout building',
      'Photoluminescent exit signs for power cuts',
    ],
  },
  industrial: {
    name: 'Manufacturing & Industrial',
    keyNeeds: ['Safety compliance', 'High durability', 'Hazard identification', 'Facility branding'],
    recommendedTypes: ['safety-sign', 'fascia', 'pylon', 'wayfinding', 'banner'],
    budgetGuide: 'Safety signage non-negotiable — budget 5-10% of project costs for compliance',
    complianceNotes: [
      'OSHA 2007 mandatory safety signage',
      'Hazard signs: ISO 7010 standard',
      'PPE mandatory signs at entry points',
      'Fire exit and evacuation route signage',
      'Chemical hazard labels per OSHA 85. Labelling and marking',
    ],
  },
  government: {
    name: 'Government & Public Institutions',
    keyNeeds: ['Official identity compliance', 'National branding guidelines', 'Multilingual signage', 'Accessibility'],
    recommendedTypes: ['monument', 'fascia', 'wayfinding', 'directory', 'dimensional'],
    budgetGuide: 'Follow government branding guidelines (Coat of Arms specs)',
    complianceNotes: [
      'Coat of Arms min size: 10mm squared',
      'National flag colours (black, red, green) for visual identity',
      'Bilingual signage (English + Kiswahili) often required',
      'Accessibility standards for wayfinding',
    ],
  },
  'real-estate': {
    name: 'Real Estate & Property',
    keyNeeds: ['Property identification', 'Wayfinding for developments', 'Show house branding', 'Estate entrance signage'],
    recommendedTypes: ['monument', 'pylon', 'wayfinding', 'fascia', 'banner'],
    budgetGuide: 'Estate entrance monument: KES 150,000-500,000 — permanent investment',
    complianceNotes: [
      'County approval required for monument signs',
      'Height restrictions in residential areas',
      'Illumination restrictions near residential zones',
      'Permanent materials for long-term property value',
    ],
  },
  transport: {
    name: 'Transport & Logistics',
    keyNeeds: ['Fleet branding', 'Terminal wayfinding', 'Route signage', 'Safety compliance'],
    recommendedTypes: ['vinyl-wrap', 'wayfinding', 'pylon', 'safety-sign', 'fascia'],
    budgetGuide: 'Fleet wraps: KES 45,000-120,000 per vehicle — mobile billboard ROI',
    complianceNotes: [
      'Fleet branding guidelines must be followed',
      'Cast vinyl preferred over calendar for wraps',
      'High-visibility elements for safety',
      'Terminal wayfinding for passenger flow',
    ],
  },
  entertainment: {
    name: 'Entertainment & Events',
    keyNeeds: ['Event branding', 'Stage signage', 'Directional signage', 'Social media moments'],
    recommendedTypes: ['banner', 'led-neon', 'digital-display', 'wayfinding', 'wall-mural'],
    budgetGuide: 'Event signage: KES 50,000-300,000 depending on scale',
    complianceNotes: [
      'Temporary signage needs secure mounting',
      'Fire safety compliance for indoor events',
      'Instagram-worthy designs for social media amplification',
      'Quick installation/breakdown for multi-day events',
    ],
  },
  banking: {
    name: 'Banking & Finance',
    keyNeeds: ['Branch consistency', 'Professional appearance', 'Security signage', 'ATM branding'],
    recommendedTypes: ['fascia', 'channel-letters', 'wayfinding', 'dimensional', 'digital-display'],
    budgetGuide: 'Branch signage: KES 80,000-250,000 per location',
    complianceNotes: [
      'Brand consistency across all branches',
      'Security signage at ATMs',
      'Professional finish reflecting financial institution credibility',
      'LED for 24/7 visibility',
    ],
  },
  ngo: {
    name: 'NGOs & Donor-Funded Programmes',
    keyNeeds: ['Donor visibility', 'Field durability', 'Multi-location consistency', 'Cost-effective solutions'],
    recommendedTypes: ['banner', 'vinyl-wrap', 'wayfinding', 'safety-sign', 'window-graphic'],
    budgetGuide: 'Prioritize durable, reusable signage over single-event items',
    complianceNotes: [
      'Donor visibility requirements must be met',
      'Reusable display systems (media walls, roll-up banners)',
      'Field durability for outdoor use',
      'Budget-friendly options for multi-site deployments',
    ],
  },
  energy: {
    name: 'Energy & Oil/Gas',
    keyNeeds: ['Safety compliance', 'Hazard identification', 'Corporate branding', 'Site signage'],
    recommendedTypes: ['safety-sign', 'fascia', 'pylon', 'wayfinding', 'vinyl-wrap'],
    budgetGuide: 'Safety signage non-negotiable — invest in compliant, durable materials',
    complianceNotes: [
      'Safety standards mandatory',
      'Hazard signage must be compliant',
      'High-visibility elements critical',
      'Explosion-proof signage in restricted areas',
    ],
  },
  agriculture: {
    name: 'Agriculture & Agribusiness',
    keyNeeds: ['Farm branding', 'Market visibility', 'Directional signage', 'Durability'],
    recommendedTypes: ['monument', 'banner', 'wayfinding', 'vinyl-wrap', 'fascia'],
    budgetGuide: 'Durable outdoor signage essential for farm/estate branding',
    complianceNotes: [
      'UV and weather resistance critical',
      'Dust-resistant materials for rural locations',
      'Large-format signage for highway visibility',
      'Bilingual signage for workforce',
    ],
  },
};

// ---------------------------------------------------------------------------
// KENYA VEHICLE BRANDING PRICING
// ---------------------------------------------------------------------------

export const VEHICLE_BRANDING_PRICING = {
  categories: [
    { type: 'Saloon/Sedan', fullWrap: 'KES 45,000-70,000', partialWrap: 'KES 25,000-40,000', magneticPanel: 'KES 8,000-15,000' },
    { type: 'SUV', fullWrap: 'KES 60,000-90,000', partialWrap: 'KES 35,000-55,000', magneticPanel: 'KES 10,000-18,000' },
    { type: 'Pickup Truck', fullWrap: 'KES 55,000-85,000', partialWrap: 'KES 30,000-50,000', magneticPanel: 'KES 10,000-18,000' },
    { type: 'Lorry/Truck', fullWrap: 'KES 80,000-150,000', partialWrap: 'KES 50,000-80,000', magneticPanel: 'N/A' },
    { type: 'Bus/Minibus', fullWrap: 'KES 100,000-200,000', partialWrap: 'KES 60,000-100,000', magneticPanel: 'N/A' },
    { type: 'Motorcycle (Boda)', fullWrap: 'KES 15,000-30,000', partialWrap: 'KES 8,000-15,000', magneticPanel: 'N/A' },
    { type: 'Tuk-Tuk', fullWrap: 'KES 25,000-45,000', partialWrap: 'KES 15,000-25,000', magneticPanel: 'N/A' },
  ],
  vinylTypes: {
    calendar: { name: 'Calendar Vinyl', lifespan: '1-3 years', bestFor: 'Short-term promotions, budget-conscious', priceMultiplier: 1.0 },
    cast: { name: 'Cast Vinyl', lifespan: '3-5 years', bestFor: 'Premium wraps, curved surfaces, long-term', priceMultiplier: 1.5 },
    reflective: { name: 'Reflective Vinyl', lifespan: '3-5 years', bestFor: 'Night visibility, safety, fleet vehicles', priceMultiplier: 2.0 },
  },
  impressionsPerDay: {
    saloon: 30000,
    suv: 50000,
    lorry: 70000,
    bus: 100000,
  },
} as const;

// ---------------------------------------------------------------------------
// WAYFINDING STANDARDS — Kenya (ISO 7010 + OSHA 2007)
// ---------------------------------------------------------------------------

export const WAYFINDING_STANDARDS = {
  iso7010: {
    name: 'ISO 7010 Safety Signs',
    description: 'International standard for safety sign design — ensures recognition across languages',
    categories: [
      { type: 'Prohibition', shape: 'Circle with diagonal line', color: 'Red + White', example: 'No smoking, No entry' },
      { type: 'Warning', shape: 'Triangle', color: 'Yellow + Black', example: 'Electrical hazard, Slippery floor' },
      { type: 'Mandatory', shape: 'Circle', color: 'Blue + White', example: 'Hard hat required, Eye protection' },
      { type: 'Safe Condition', shape: 'Square/Rectangle', color: 'Green + White', example: 'Emergency exit, First aid' },
      { type: 'Fire Safety', shape: 'Square/Rectangle', color: 'Red + White', example: 'Fire extinguisher, Fire alarm' },
    ],
  },
  osha2007: {
    name: 'OSHA 2007 (Kenya)',
    keyRequirements: [
      'Emergency exits: green letters minimum 15cm height',
      'Evacuation route maps posted in prominent positions',
      'Fire extinguisher locations conspicuously marked',
      'No-smoking notices at every entrance (English + Kiswahili)',
      'Assembly point identified and clearly marked outside',
      'Direction-of-exit signs at every decision point',
      'Floor numbers visible at every lift lobby and stairwell',
    ],
    penalties: 'Fine up to KES 500,000 or imprisonment up to 6 months for non-compliance',
  },
  designPrinciples: [
    'Decision points: place signs where people must choose a direction',
    'Consistency: same size, font, mounting height, and colour throughout',
    'Plan for change: use slide-in or interchangeable inserts for room names',
    'Accessibility: consider colour-blind users and elderly visitors',
    'Bilingual: English + Kiswahili for public spaces',
    'Photoluminescent: for exit signs (visible in power cuts/smoke)',
  ],
} as const;

// ---------------------------------------------------------------------------
// PRICING BENCHMARKS — Kenya 2026
// ---------------------------------------------------------------------------

export const PRICING_BENCHMARKS = {
  shopfront: {
    nonIlluminated: 'KES 15,000-40,000',
    frontLitLightbox: 'KES 30,000-80,000',
    channelLetters: 'KES 50,000-150,000',
    haloLetters: 'KES 80,000-200,000',
  },
  vehicleWraps: {
    saloonCalendar: 'KES 45,000-60,000',
    saloonCast: 'KES 60,000-70,000',
    suvCast: 'KES 75,000-90,000',
    lorryCast: 'KES 120,000-150,000',
  },
  wayfinding: {
    doorSign: 'KES 2,000-5,000',
    directionalSign: 'KES 5,000-15,000',
    directoryBoard: 'KES 25,000-80,000',
    floorDirectory: 'KES 15,000-40,000',
  },
  monument: {
    smallMortar: 'KES 150,000-250,000',
    mediumMetal: 'KES 250,000-400,000',
    largeIlluminated: 'KES 400,000-800,000+',
  },
  safety: {
    fireExitSign: 'KES 500-2,000',
    hazardWarning: 'KES 500-1,500',
    mandatoryPPE: 'KES 500-1,500',
    noSmoking: 'KES 300-800',
    evacuationMap: 'KES 2,000-5,000',
  },
  led: {
    perModule: 'KES 150-300',
    perMetre: 'KES 2,000-5,000',
    powerSupply: 'KES 3,000-8,000',
    installation: 'KES 5,000-15,000',
  },
} as const;

// ---------------------------------------------------------------------------
// SEASONAL DEMAND PATTERNS — Kenya
// ---------------------------------------------------------------------------

export const SEASONAL_DEMAND = {
  months: {
    january: { demand: 'medium', items: ['New year branding refresh', 'Window graphics'], reason: 'New year, new look' },
    february: { demand: 'low', items: ['Valentine event signage', 'Restaurant displays'], reason: 'Valentine promotions' },
    march: { demand: 'low', items: ['Conference banners', 'Trade show signage'], reason: 'Conference season begins' },
    april: { demand: 'high', items: ['Event banners', 'Outdoor signage', 'Awning signs'], reason: 'Long rains begin + Easter' },
    may: { demand: 'high', items: ['Outdoor banners', 'Vehicle wraps'], reason: 'Long rains continue' },
    june: { demand: 'medium', items: ['National holiday banners', 'Government signage'], reason: 'Madaraka Day' },
    july: { demand: 'medium', items: ['School signage', 'Campus wayfinding'], reason: 'School holidays' },
    august: { demand: 'medium', items: ['National holiday banners', 'Event signage'], reason: 'Harambee Day' },
    september: { demand: 'high', items: ['Year-end project planning', 'Tender submissions'], reason: 'Begin year-end procurement' },
    october: { demand: 'very-high', items: ['Festive season signage', 'Vehicle wraps', 'Shopfront updates'], reason: 'Short rains + year-end push' },
    november: { demand: 'very-high', items: ['Holiday season branding', 'Event signage', 'Retail fascia updates'], reason: 'Peak year-end signage' },
    december: { demand: 'peak', items: ['All signage types', 'Emergency installations', 'Event branding'], reason: 'Holiday season + deadline rush' },
  },
  events: [
    { name: 'Madaraka Day', date: 'June 1', signageNeeds: ['National branding', 'Government signage', 'Event banners'] },
    { name: 'Mashujaa Day', date: 'October 20', signageNeeds: ['National branding', 'Government signage', 'Event banners'] },
    { name: 'Jamhuri Day', date: 'December 12', signageNeeds: ['National branding', 'Government signage', 'Event banners'] },
    { name: 'School Terms', date: 'January, May, September', signageNeeds: ['Campus wayfinding', 'Building signage', 'Safety signs'] },
    { name: 'Conference Season', date: 'March-June', signageNeeds: ['Event banners', 'Trade show displays', 'Wayfinding'] },
    { name: 'Festive Season', date: 'October-December', signageNeeds: ['Retail fascia', 'Vehicle wraps', 'Event signage'] },
  ],
};

// ---------------------------------------------------------------------------
// ZONE DETECTION HELPERS
// ---------------------------------------------------------------------------

export function detectClimateZone(location: string): ClimateZone {
  const loc = location.toLowerCase();

  if (['mombasa', 'malindi', 'kilifi', 'lamu', 'diani', 'watamu', 'tiwi', 'shanzu', 'nyali'].some(r => loc.includes(r))) {
    return 'coastal';
  }

  if (['kisumu', 'bungoma', 'kakamega', 'siaya', 'homa bay', 'migori', 'nyamira', 'kericho'].some(r => loc.includes(r))) {
    return 'lake';
  }

  if (['turkana', 'isolo', 'marsabit', 'garissa', 'wajir', 'mandera', 'tana river', 'lamu'].some(r => loc.includes(r))) {
    return 'arid';
  }

  if (['nairobi', 'nakuru', 'nyeri', 'nanyuki', 'thika', 'kiambu', 'machakos', 'kajiado', 'muranga', 'nyandarua', 'laikipia', 'eldoret', 'uasin gishu'].some(r => loc.includes(r))) {
    return 'highland';
  }

  return 'urban';
}

export function getRecommendedSignage(zone: ClimateZone, industry: IndustrySector) {
  const zoneData = CLIMATE_ZONES[zone];
  const industryData = INDUSTRY_GUIDES[industry];

  return {
    zone: CLIMATE_ZONES[zone],
    industry: industryData,
    recommendedTypes: [...new Set([...(CLIMATE_ZONES[zone]?.signageTypes || []), ...industryData.recommendedTypes])],
  };
}

export function getSeasonalRecommendations(month: number) {
  const monthNames = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
  const monthKey = monthNames[month - 1] as keyof typeof SEASONAL_DEMAND.months;
  return SEASONAL_DEMAND.months[monthKey];
}
