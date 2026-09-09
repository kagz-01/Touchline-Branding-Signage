// =============================================================================
// BRANDING INDUSTRY KNOWLEDGE BASE
// Context-aware branding intelligence for Kenya, East Africa, and global markets
// Last updated: September 2026
// =============================================================================

export type ClimateZone = 'coastal' | 'highland' | 'lake' | 'arid' | 'urban';

export type IndustrySector =
  | 'banking' | 'sacco' | 'ngo' | 'government' | 'retail'
  | 'hospitality' | 'manufacturing' | 'logistics' | 'education'
  | 'healthcare' | 'tech' | 'agriculture' | 'energy';

export type BrandingMethod =
  | 'screen-printing' | 'embroidery' | 'dtf' | 'sublimation'
  | 'uv-printing' | 'laser-engraving' | 'pad-printing'
  | 'heat-transfer-vinyl' | 'debossing' | 'hot-stamping';

export type ProductCategory =
  | 'apparel' | 'drinkware' | 'stationery' | 'tech-accessories'
  | 'bags' | 'workwear' | 'safety' | 'headwear' | 'outerwear'
  | 'eco-promo' | 'executive-gifts' | 'event-branding';

// ---------------------------------------------------------------------------
// MARKET INTELLIGENCE
// ---------------------------------------------------------------------------

export const MARKET_DATA = {
  kenya: {
    totalSuppliers: 142,
    nairobiConcentration: 86.6, // percentage of suppliers in Nairobi
    licensedMerchandiseMarketUSD: 377_000_000, // 2025
    projectedGrowthUSD: 525_000_000, // 2032
    cagr: 4.8, // 2026-2032
    economicGrowth: '5.0-5.5%',
    inflationTrend: 'easing',
    centralBankRate: 8.75, // % as of Feb 2026
    averageLendingRate: 14.8, // %
    saccoAssetsKES: 1.13e12, // 1.13 trillion
    saccoMembership: 7_390_000,
    bankRecordProfits2025: 'KSh 300B+',
  },
  africa: {
    corporateGiftingMarketUSD: 26.82e9, // 2025
    projectedGrowthUSD: 45.79e9, // 2034
    cagr: 6.05, // 2026-2034
    luxuryShareOfGlobal: 3.27, // %
    nigeriaShare: 0.47, // %
    brandedMerchImpressions: '<$0.01 per impression',
    brandRecallRate: 85, // %
    retentionRate: 63, // % keep promo items 1+ year
  },
  global: {
    corporateGiftingMarketUSD: 822e9, // 2024
    projectedGrowthUSD: 1.2e12, // 2029
    promoProductsIndustryUSD: 27.7e9, // North America 2025
    growthRate: 4.2, // %
    antiSwagSentiment: 31, // % distributors worried
  },
} as const;

// ---------------------------------------------------------------------------
// HOT PRODUCTS — Kenya 2026 (by sales volume & trend)
// ---------------------------------------------------------------------------

export const HOT_PRODUCTS_KE = [
  { name: 'Branded T-Shirts', rank: 1, reason: 'Most cost-effective promotional item', priceRange: 'KES 350-800', methods: ['screen-printing', 'dtf', 'sublimation'] as BrandingMethod[] },
  { name: 'Reflector Vests', rank: 2, reason: 'Safety compliance + high visibility', priceRange: 'KES 200-500', methods: ['screen-printing', 'heat-transfer-vinyl'] as BrandingMethod[] },
  { name: 'Branded Hoodies', rank: 3, reason: 'Unpredictable Nairobi weather', priceRange: 'KES 800-1,500', methods: ['embroidery', 'dtf'] as BrandingMethod[] },
  { name: 'Caps & Headwear', rank: 4, reason: 'Outdoor branding, events, CSR', priceRange: 'KES 150-400', methods: ['embroidery', 'sublimation'] as BrandingMethod[] },
  { name: 'Dustcoats & Overalls', rank: 5, reason: 'Manufacturing, logistics, healthcare', priceRange: 'KES 500-1,200', methods: ['screen-printing', 'embroidery'] as BrandingMethod[] },
  { name: 'Water Bottles', rank: 6, reason: 'Corporate wellness trend', priceRange: 'KES 200-600', methods: ['uv-printing', 'laser-engraving'] as BrandingMethod[] },
  { name: 'Diaries & Notebooks', rank: 7, reason: 'Year-end corporate gifting staple', priceRange: 'KES 150-500', methods: ['debossing', 'hot-stamping', 'uv-printing'] as BrandingMethod[] },
  { name: 'Umbrellas', rank: 8, reason: 'Rainy season demand (Apr-May, Oct-Nov)', priceRange: 'KES 300-800', methods: ['screen-printing', 'sublimation'] as BrandingMethod[] },
  { name: 'Puff Jackets', rank: 9, reason: 'Fastest-growing corporate fashion trend', priceRange: 'KES 1,200-2,500', methods: ['embroidery', 'dtf'] as BrandingMethod[] },
  { name: 'Branded Pens', rank: 10, reason: 'Highest volume, lowest cost per impression', priceRange: 'KES 15-50', methods: ['pad-printing', 'uv-printing'] as BrandingMethod[] },
] as const;

// ---------------------------------------------------------------------------
// GLOBAL TRENDS — 2026
// ---------------------------------------------------------------------------

export const GLOBAL_TRENDS_2026 = [
  {
    name: 'Quiet Luxury',
    description: 'High-end merchandise with subtle branding — custom scarves, leather accessories, premium apparel that signals sophistication without overt logos.',
    relevance: 'Premium corporate gifts, executive gifting, client appreciation',
    priceRange: 'KES 2,000-10,000+',
    methods: ['embroidery', 'debossing', 'laser-engraving'] as BrandingMethod[],
  },
  {
    name: 'Tech-Integrated Gifts',
    description: 'Wireless charging pads, smart notebooks, Bluetooth speakers — functional tech that recipients use daily.',
    relevance: 'Corporate gifting, employee onboarding, tech companies',
    priceRange: 'KES 800-3,000',
    methods: ['uv-printing', 'laser-engraving'] as BrandingMethod[],
  },
  {
    name: 'Curated Gift Sets',
    description: 'Multi-item gift boxes with premium packaging — the unboxing experience matters as much as the gift.',
    relevance: 'Client appreciation, year-end gifting, executive rewards',
    priceRange: 'KES 1,500-5,000',
    methods: ['hot-stamping', 'debossing'] as BrandingMethod[],
  },
  {
    name: 'Athleisure Branding',
    description: 'Performance-fabric branded apparel that blurs work and lifestyle — people wear it socially, at the gym, while travelling.',
    relevance: 'Staff uniforms, corporate wellness, events',
    priceRange: 'KES 500-2,000',
    methods: ['sublimation', 'dtf'] as BrandingMethod[],
  },
  {
    name: 'Custom Manufacturing',
    description: 'Bespoke bags, coolers, lifestyle items — differentiation that competitors can\'t order from a catalogue.',
    relevance: 'Brand differentiation, premium positioning',
    priceRange: 'KES 1,000-5,000',
    methods: ['screen-printing', 'embroidery', 'sublimation'] as BrandingMethod[],
  },
  {
    name: 'Sustainability-First',
    description: 'Organic cotton, recycled polyester, bamboo, water-based inks — not a trend but an expectation.',
    relevance: 'All sectors, especially NGOs, corporates with ESG mandates',
    priceRange: '+15-30% premium',
    methods: ['screen-printing', 'dtf', 'sublimation'] as BrandingMethod[],
  },
  {
    name: 'Personalisation',
    description: 'Names on products, custom colours, recipient-specific designs — people love gifts that feel made for them.',
    relevance: 'Employee recognition, client gifting, events',
    priceRange: '+10-25% premium',
    methods: ['dtf', 'sublimation', 'uv-printing'] as BrandingMethod[],
  },
  {
    name: 'Eco-Promo Items',
    description: 'Reusable water bottles, recycled tote bags, bamboo notebooks — practical sustainability.',
    relevance: 'Events, broad distribution, brand awareness',
    priceRange: 'KES 200-800',
    methods: ['screen-printing', 'uv-printing'] as BrandingMethod[],
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
  brandingMethods: BrandingMethod[];
}> = {
  coastal: {
    name: 'Coastal (Hot & Humid)',
    regions: ['Mombasa', 'Malindi', 'Kilifi', 'Lamu', 'Diani'],
    conditions: ['Salt air corrosion', 'High humidity (60-80% RH)', 'Intense UV', 'Monsoon rains'],
    materialRecommendations: [
      'Marine-grade stainless steel fixings',
      'Fibre cement boards',
      'Galvanized steel with anti-rust coating',
      'UV-stabilized acrylic faces',
      'IP65-rated electrical enclosures',
      'Sealed aluminium extrusions',
      'UV-resistant laminates and substrates',
      'Treated timber (chemical/pressure)',
    ],
    durabilityGuidelines: [
      'Marine-grade fixings mandatory — standard zinc-plated corrodes in 18-36 months',
      'Sealed aluminium extrusions prevent moisture ingress at joints',
      'IP65 minimum for LED drivers in outdoor coastal applications',
      'Cast vinyl with UV-stabilized laminate for signage',
      'UV-stabilized acrylic for illuminated signs',
    ],
    brandingMethods: ['sublimation', 'uv-printing', 'laser-engraving'],
  },
  highland: {
    name: 'Highland (Mild & Mixed)',
    regions: ['Nairobi', 'Nakuru', 'Nyeri', 'Nanyuki', 'Thika'],
    conditions: ['Temperature fluctuations', 'Moderate UV', 'Morning frost in some areas', 'Rainy seasons'],
    materialRecommendations: [
      'High-performance glass',
      'Aluminium composite panels (ACP)',
      'Rammed earth walls (lime-stabilized)',
      'Double-glazed/tinted windows',
      'UV-resistant paint',
    ],
    durabilityGuidelines: [
      'ACPs ideal for commercial exteriors and signage',
      'UV-resistant coatings essential for outdoor signage',
      'High-performance glass with Low-E coating recommended',
      'Standard materials generally perform well',
    ],
    brandingMethods: ['screen-printing', 'embroidery', 'dtf', 'sublimation'],
  },
  lake: {
    name: 'Lake Region (Wet & Tropical)',
    regions: ['Kisumu', 'Bungoma', 'Kakamega', 'Siaya', 'Homa Bay'],
    conditions: ['High humidity (60-80% RH)', 'Heavy rainfall', 'Lake Victoria saline air', 'Heat'],
    materialRecommendations: [
      'Waterproof concrete',
      'Fibre cement boards',
      'Engineered wood (WPC)',
      'Clay tiles',
      'Galvanized steel',
      'UV-resistant finishes',
    ],
    durabilityGuidelines: [
      'Pre-condition substrates to prevent dimensional instability',
      'Ink adhesion testing critical for surfaces exposed to saline air',
      'Materials must withstand frequent washing/cleaning',
      'Anti-mold treatments recommended for fabric products',
    ],
    brandingMethods: ['sublimation', 'dtf', 'screen-printing'],
  },
  arid: {
    name: 'Arid & Semi-Arid',
    regions: ['Turkana', 'Isiolo', 'Marsabit', 'Garissa', 'Wajir', 'Mandera'],
    conditions: ['Extreme heat', 'Intense UV', 'Dust', 'Low humidity', 'Temperature swings'],
    materialRecommendations: [
      'Clay tiles',
      'Aluminium composite panels (ACPs)',
      'UV-resistant finishes',
      'Rammed earth walls',
      'Stone veneer',
      'Galvanized steel with UV coating',
    ],
    durabilityGuidelines: [
      'UV-resistant coatings mandatory — standard paint degrades rapidly',
      'Dust-resistant finishes for electronics/signage',
      'Materials must withstand 40°C+ temperatures',
      'Minimal maintenance options preferred',
    ],
    brandingMethods: ['laser-engraving', 'uv-printing', 'sublimation'],
  },
  urban: {
    name: 'Urban Centers',
    regions: ['Nairobi CBD', 'Westlands', 'Upper Hill', 'Industrial Area', 'Mombasa CBD'],
    conditions: ['Pollution', 'High foot traffic', 'Vehicle exhaust', 'Limited outdoor exposure for indoor branding'],
    materialRecommendations: [
      'Aluminium composite panels (ACP)',
      'Acrylic signage',
      'High-performance vinyl',
      'Anti-slip floor graphics',
      'Frosted window films',
      'LED illuminated signage',
    ],
    durabilityGuidelines: [
      'High-traffic areas need anti-slip materials',
      'Indoor signage generally lasts longer',
      'Cleanable surfaces essential for retail',
      'LED signage for 24/7 visibility',
    ],
    brandingMethods: ['screen-printing', 'embroidery', 'uv-printing', 'laser-engraving'],
  },
};

// ---------------------------------------------------------------------------
// INDUSTRY-SPECIFIC BRANDING GUIDES
// ---------------------------------------------------------------------------

export const INDUSTRY_GUIDES: Record<IndustrySector, {
  name: string;
  keyNeeds: string[];
  recommendedProducts: string[];
  recommendedMethods: BrandingMethod[];
  budgetGuide: string;
  complianceNotes?: string[];
}> = {
  banking: {
    name: 'Banking & Finance',
    keyNeeds: ['Brand consistency across branches', 'Professional appearance', 'Durability (daily use by staff)', 'Security compliance'],
    recommendedProducts: ['Staff uniforms (polos, shirts)', 'Branded lanyards', 'Desk accessories', 'Client welcome kits', 'ATM signage'],
    recommendedMethods: ['embroidery', 'debossing', 'laser-engraving'],
    budgetGuide: 'KES 1,250-2,000 per polo (dye-sublimation) — 24-month refresh cycle recommended',
    complianceNotes: [
      'Branch tellers interact 50-100 customers daily — uniform quality reflects brand',
      '180-200 GSM CVC blend for front-office staff',
      'Dye-sublimation produces lower cost per wear over 24 months vs screen print',
      'Kenyan banks posted KSh 300B+ profits in 2025 — invest in brand consistency',
    ],
  },
  sacco: {
    name: 'SACCOs & Financial Co-operatives',
    keyNeeds: ['Multi-branch consistency', 'Bulk ordering', 'Member education day kits', 'Cost-effective branding'],
    recommendedProducts: ['Staff uniforms', 'Member welcome kits', 'Event merchandise', 'Branch signage', 'Promotional bags'],
    recommendedMethods: ['screen-printing', 'embroidery', 'sublimation'],
    budgetGuide: 'KES 250-400 per attendee for Member Education Day kits',
    complianceNotes: [
      '7.39M members in 2024, assets KSh 1.13 trillion',
      'Consolidate procurement under single annual tender',
      'Require PP (Pre-Production) sealed samples as legal benchmark',
      'Include branch expansion pricing schedule in tender',
    ],
  },
  ngo: {
    name: 'NGOs & Donor-Funded Programmes',
    keyNeeds: ['Donor visibility requirements', 'Field durability', 'Multi-location consistency', 'Compliance documentation'],
    recommendedProducts: ['Field staff uniforms', 'Programme branded items', 'Donor visibility materials', 'Event banners', 'Office signage'],
    recommendedMethods: ['screen-printing', 'embroidery', 'sublimation'],
    budgetGuide: 'Prioritize durable, multi-use items over single-event consumables',
    complianceNotes: [
      'Traditional donor funding declining — shift to local partnerships',
      'Heavy-duty uniforms (240+ GSM) for field staff',
      'Track impressions and visibility metrics for renewal proposals',
      'Reusable display systems (media walls, roll-up banners)',
    ],
  },
  government: {
    name: 'Government & County Institutions',
    keyNeeds: ['Official identity compliance', 'National branding guidelines', 'Tender documentation', 'Multi-site rollout'],
    recommendedProducts: ['Official signage', 'Staff uniforms', 'Event banners', 'Vehicle branding', 'Office stationery'],
    recommendedMethods: ['screen-printing', 'embroidery', 'uv-printing', 'laser-engraving'],
    budgetGuide: 'Follow government branding guidelines (Coat of Arms specs)',
    complianceNotes: [
      'Coat of Arms min size: 10mm squared',
      'Full colour printing required for official logos',
      'National flag colours (black, red, green) for visual identity',
      'Aluminium with self-adhesive vinyl for building signage',
      'Clear vinyl stickers for government vehicles (50cm x 30cm)',
    ],
  },
  retail: {
    name: 'Retail & Hospitality',
    keyNeeds: ['Customer-facing brand visibility', 'Staff uniforms', 'Point-of-sale displays', 'Seasonal promotions'],
    recommendedProducts: ['Staff aprons/polo shirts', 'Window graphics', 'Counter displays', 'Shopping bags', 'Menu boards'],
    recommendedMethods: ['screen-printing', 'sublimation', 'uv-printing'],
    budgetGuide: 'Invest in staff uniforms that customers see daily — highest ROI channel',
    complianceNotes: [
      'Adequate visual comfort in workspace',
      'Plastic bags banned in Kenya since 2017 — offer branded reusable alternatives',
      'Seasonal items: umbrellas (rain), puff jackets (cold), water bottles (dry)',
    ],
  },
  hospitality: {
    name: 'Hotels, Restaurants & Cafes',
    keyNeeds: ['Ambiance-appropriate branding', 'Premium finish', 'Durability under frequent washing', 'Instagram-worthy aesthetics'],
    recommendedProducts: ['Chef uniforms', 'Branded aprons', 'Menu boards', 'Welcome amenities', 'Outdoor signage'],
    recommendedMethods: ['embroidery', 'sublimation', 'laser-engraving'],
    budgetGuide: 'Premium finish essential — brand perception directly impacts guest experience',
    complianceNotes: [
      'Hot humidity zones (Mombasa coast) need moisture-resistant materials',
      'Chef wear: 195-210 GSM recommended',
      'LED signage for night visibility',
    ],
  },
  manufacturing: {
    name: 'Manufacturing & Industrial',
    keyNeeds: ['Safety compliance', 'High durability', 'Worker identification', 'Facility branding'],
    recommendedProducts: ['Overalls', 'Safety vests', 'Dustcoats', 'Hard hat stickers', 'Factory signage'],
    recommendedMethods: ['screen-printing', 'heat-transfer-vinyl', 'embroidery'],
    budgetGuide: 'KES 500-1,200 per overall — prioritize durability over aesthetics',
    complianceNotes: [
      'Security/driver overalls: 240-260 GSM for abrasion resistance',
      'Reflective elements mandatory for safety',
      'Factory signage must withstand heat, moisture, dust, chemicals',
      'Floor graphics: heavy-duty anti-slip materials',
    ],
  },
  logistics: {
    name: 'Logistics & Transport',
    keyNeeds: ['Fleet branding', 'Driver identification', 'Vehicle signage compliance', 'Durability'],
    recommendedProducts: ['Vehicle wraps', 'Driver uniforms', 'Reflector vests', 'Cargo labels', 'Wayfinding signage'],
    recommendedMethods: ['screen-printing', 'heat-transfer-vinyl', 'sublimation'],
    budgetGuide: 'Vehicle wraps: highest impression count — mobile billboard effect',
    complianceNotes: [
      'Fleet vehicle branding guidelines must be followed',
      'Cast vinyl preferred over calendar vinyl for wraps',
      'High-visibility vests mandatory for road crews',
    ],
  },
  education: {
    name: 'Schools & Universities',
    keyNeeds: ['Uniform consistency', 'Event branding', 'Campus signage', 'Alumni merchandise'],
    recommendedProducts: ['School uniforms', 'Sports kits', 'Event banners', 'Wayfinding signs', 'Graduation merchandise'],
    recommendedMethods: ['screen-printing', 'embroidery', 'sublimation'],
    budgetGuide: 'Bulk orders for schools — 500+ units for best pricing',
    complianceNotes: [
      'Uniform standards vary by institution',
      'Campus wayfinding critical for large institutions',
      'Sports kits need moisture-wicking fabrics',
    ],
  },
  healthcare: {
    name: 'Healthcare & Medical',
    keyNeeds: ['Hygiene compliance', 'Professional appearance', 'Wayfinding', 'Staff identification'],
    recommendedProducts: ['Scrubs', 'Lab coats', 'Hospital signage', 'Wayfinding systems', 'Patient information materials'],
    recommendedMethods: ['embroidery', 'screen-printing', 'uv-printing'],
    budgetGuide: 'Healthcare uniforms: 180-210 GSM, easy-clean fabrics essential',
    complianceNotes: [
      'Hygiene standards require easy-clean materials',
      'Wayfinding critical in healthcare facilities',
      'Staff identification badges and lanyards',
    ],
  },
  tech: {
    name: 'Technology & Startups',
    keyNeeds: ['Modern brand image', 'Employee swag', 'Event merchandise', 'Digital-first approach'],
    recommendedProducts: ['Branded hoodies', 'Tech accessories', 'Power banks', 'Smart notebooks', 'Laptop bags'],
    recommendedMethods: ['dtf', 'sublimation', 'uv-printing', 'laser-engraving'],
    budgetGuide: 'Premium feel matters — quality swag reflects company culture',
    complianceNotes: [
      'Tech-integrated gifts trending strongly',
      'Personalisation appreciated in tech culture',
      'Custom manufacturing for differentiation',
    ],
  },
  agriculture: {
    name: 'Agriculture & Agribusiness',
    keyNeeds: ['Field durability', 'Branded packaging', 'Staff workwear', 'Market visibility'],
    recommendedProducts: ['Field uniforms', 'Branded seed bags', 'Market banners', 'Cap hats', 'Water bottles'],
    recommendedMethods: ['screen-printing', 'embroidery', 'heat-transfer-vinyl'],
    budgetGuide: 'Durability in harsh field conditions essential',
    complianceNotes: [
      'Outdoor workwear needs UV and moisture resistance',
      'Packaging branding for market differentiation',
      'Regional agricultural shows: event branding critical',
    ],
  },
  energy: {
    name: 'Energy & Oil/Gas',
    keyNeeds: ['Safety compliance', 'Hazard identification', 'Corporate branding', 'Site signage'],
    recommendedProducts: ['Safety vests', 'Hard hats', 'Overalls', 'Site signage', 'Vehicle branding'],
    recommendedMethods: ['screen-printing', 'heat-transfer-vinyl', 'embroidery'],
    budgetGuide: 'Safety gear non-negotiable — invest in compliant, durable materials',
    complianceNotes: [
      'Safety standards mandatory',
      'High-visibility elements critical',
      'Hazard signage must be compliant',
    ],
  },
};

// ---------------------------------------------------------------------------
// BRANDING METHOD COMPARISON (with Kenya-specific pricing & lead times)
// ---------------------------------------------------------------------------

export const METHOD_GUIDES: Record<BrandingMethod, {
  name: string;
  bestFor: string[];
  durability: string;
  costLevel: 'Low' | 'Medium' | 'High' | 'Medium-High';
  turnaround: string;
  minQty: string;
  colorLimit: string;
  kessepCostRange: string;
  climateConsiderations: string[];
}> = {
  'screen-printing': {
    name: 'Screen Printing',
    bestFor: ['T-shirts', 'Tote bags', 'Jerseys', 'Large runs'],
    durability: '4-8 months (standard) / 12+ months (premium)',
    costLevel: 'Low',
    turnaround: '3-5 days',
    minQty: '50+',
    colorLimit: '4 colours max',
    kessepCostRange: 'KES 350-400/shirt (bulk)',
    climateConsiderations: ['Best for event/short-term use', 'Cracks/peels in harsh UV', 'Not recommended for coastal areas without UV coating'],
  },
  embroidery: {
    name: 'Embroidery',
    bestFor: ['Polos', 'Caps', 'Jackets', 'Uniforms', 'Fleeces'],
    durability: '2-5 years',
    costLevel: 'Medium',
    turnaround: '5-7 days (10-14 for complex)',
    minQty: '10+',
    colorLimit: 'Unlimited',
    kessepCostRange: 'KES 50-200 per logo (depending on size)',
    climateConsiderations: ['Most durable for apparel', 'Premium finish for corporate', 'Withstands frequent washing', 'Coastal: use polyester thread'],
  },
  dtf: {
    name: 'Direct-to-Film (DTF)',
    bestFor: ['Any fabric', 'Full colour', 'Small runs', 'Photographic detail'],
    durability: '1-3 years',
    costLevel: 'Medium',
    turnaround: '2-3 days',
    minQty: '1+',
    colorLimit: 'Full colour',
    kessepCostRange: 'KES 300-600 per item',
    climateConsiderations: ['Versatile across fabrics', 'Good for complex artwork', 'May crack with heavy use', 'Best for indoor/low-wear items'],
  },
  sublimation: {
    name: 'Sublimation',
    bestFor: ['Performance wear', 'Jerseys', 'All-over prints', 'Polyester fabrics'],
    durability: '2-5 years',
    costLevel: 'Medium',
    turnaround: '5-7 days',
    minQty: '10+',
    colorLimit: 'Full colour (edge-to-edge)',
    kessepCostRange: 'KES 400-800 per item',
    climateConsiderations: ['Best for UV resistance (ink embedded in fibres)', 'Ideal for Kenya equatorial sun', 'Polyester only', 'Excellent for event flags/banners'],
  },
  'uv-printing': {
    name: 'UV Printing',
    bestFor: ['Mugs', 'Pens', 'Phone cases', 'Power banks', 'Bottles', 'Rigid surfaces'],
    durability: '3-5 years',
    costLevel: 'Medium',
    turnaround: '3-5 days',
    minQty: '10+',
    colorLimit: 'Full colour',
    kessepCostRange: 'KES 100-500 per item',
    climateConsiderations: ['Excellent UV resistance', 'Good for coastal areas', 'Instant curing prevents dust contamination', 'Works on curved surfaces'],
  },
  'laser-engraving': {
    name: 'Laser Engraving',
    bestFor: ['Metal drinkware', 'Wooden items', 'Glass', 'Leather', 'Premium items'],
    durability: 'Permanent',
    costLevel: 'Medium-High',
    turnaround: '3-5 days',
    minQty: '10+',
    colorLimit: 'Tone-on-tone',
    kessepCostRange: 'KES 150-600 per item',
    climateConsiderations: ['Most durable finish', 'Permanent marking', 'Premium feel', 'Ideal for executive gifts'],
  },
  'pad-printing': {
    name: 'Pad Printing',
    bestFor: ['Pens', 'Keyrings', 'Golf balls', 'Electronics', 'Curved surfaces'],
    durability: '2-3 years',
    costLevel: 'Low',
    turnaround: '5-7 days',
    minQty: '100+',
    colorLimit: '4 colours',
    kessepCostRange: 'KES 10-50 per item',
    climateConsiderations: ['Fastest production method', 'Best for small/simple logos', 'Good for curved surfaces', 'Cost-effective for high volume'],
  },
  'heat-transfer-vinyl': {
    name: 'Heat Transfer Vinyl (HTV)',
    bestFor: ['Names', 'Numbers', 'Simple logos', 'Sportswear'],
    durability: '1-2 years',
    costLevel: 'Low',
    turnaround: '1-2 days',
    minQty: '1+',
    colorLimit: 'Cut colours (limited)',
    kessepCostRange: 'KES 50-200 per item',
    climateConsiderations: ['Fastest for simple designs', 'Clean sharp edges', 'May peel with heavy washing', 'Good for sportswear'],
  },
  debossing: {
    name: 'Debossing / Embossing',
    bestFor: ['Notebooks', 'Leather goods', 'Packaging', 'Folders', 'Premium items'],
    durability: 'Permanent',
    costLevel: 'Medium-High',
    turnaround: '7-10 days',
    minQty: '50+',
    colorLimit: 'Tone-on-tone',
    kessepCostRange: 'KES 100-400 per item',
    climateConsiderations: ['Premium tactile finish', 'Ideal for executive gifts', 'Works on leather and paper', 'Durable and elegant'],
  },
  'hot-stamping': {
    name: 'Hot Stamping / Foil Blocking',
    bestFor: ['Premium packaging', 'Stationery', 'Gift boxes', 'Luxury finishes'],
    durability: '3-5 years',
    costLevel: 'High',
    turnaround: '7-10 days',
    minQty: '100+',
    colorLimit: 'Metallic/coloured foil',
    kessepCostRange: 'KES 200-500 per item',
    climateConsiderations: ['Luxury finish for premium brands', 'Metallic/foil effects', 'Best for indoor items', 'Popular for year-end gifting'],
  },
};

// ---------------------------------------------------------------------------
// SEASONAL DEMAND PATTERNS — Kenya
// ---------------------------------------------------------------------------

export const SEASONAL_DEMAND = {
  // Monthly patterns
  months: {
    january: { demand: 'medium', items: ['Diaries', 'Notebooks', 'Pens', 'Calendars'], reason: 'New year gifting' },
    february: { demand: 'low', items: ['Valentine corporate gifts', 'Staff appreciation'], reason: 'Valentine\'s Day' },
    march: { demand: 'low', items: ['Event branding', 'Conference kits'], reason: 'Conference season begins' },
    april: { demand: 'high', items: ['Umbrellas', 'Rain gear', 'Event branding'], reason: 'Long rains begin + Easter' },
    may: { demand: 'high', items: ['Umbrellas', 'Mother\'s Day corporate'], reason: 'Long rains continue' },
    june: { demand: 'medium', items: ['Madaraka Day branding', 'Mid-year events'], reason: 'National holiday' },
    july: { demand: 'medium', items: ['School terms', 'Cold weather gear'], reason: 'School holidays + cold season' },
    august: { demand: 'medium', items: ['Harambee Day branding', 'Sports events'], reason: 'National holidays' },
    september: { demand: 'high', items: ['Year-end planning', 'Tender submissions'], reason: 'Begin year-end procurement' },
    october: { demand: 'very-high', items: ['Puff jackets', 'Hoodies', 'Warm gear', 'Year-end gifts'], reason: 'Short rains + year-end push' },
    november: { demand: 'very-high', items: ['Year-end gifts', 'Hampers', 'Executive gifts', 'Umbrellas'], reason: 'Peak year-end gifting' },
    december: { demand: 'peak', items: ['All corporate gifting', 'Hampers', 'Staff rewards'], reason: 'Holiday season + deadline rush' },
  },

  // Event calendar
  events: [
    { name: 'Madaraka Day', date: 'June 1', brandingNeeds: ['National branding', 'Government signage', 'Event banners'] },
    { name: 'Mashujaa Day', date: 'October 20', brandingNeeds: ['National branding', 'Government signage', 'Event banners'] },
    { name: 'Jamhuri Day', date: 'December 12', brandingNeeds: ['National branding', 'Government signage', 'Event banners'] },
    { name: 'New Year', date: 'January 1', brandingNeeds: ['Diaries', 'Calendars', 'Corporate gifts'] },
    { name: 'Easter', date: 'Variable', brandingNeeds: ['Event branding', 'Gift items'] },
    { name: 'School Terms', date: 'January, May, September', brandingNeeds: ['Uniforms', 'School merchandise', 'Sports kits'] },
  ],
};

// ---------------------------------------------------------------------------
// PRICING BENCHMARKS — Kenya 2026
// ---------------------------------------------------------------------------

export const PRICING_BENCHMARKS = {
  apparel: {
    polos: { screenPrint: 'KES 350-400', embroidery: 'KES 500-700', dtf: 'KES 400-600', sublimation: 'KES 600-900' },
    tshirts: { screenPrint: 'KES 250-350', dtf: 'KES 300-500', sublimation: 'KES 400-600' },
    hoodies: { screenPrint: 'KES 600-800', embroidery: 'KES 800-1,200', dtf: 'KES 700-1,000' },
    caps: { embroidery: 'KES 150-300', dtf: 'KES 200-350' },
    overalls: { screenPrint: 'KES 500-700', embroidery: 'KES 600-900' },
    reflectorVests: { screenPrint: 'KES 200-350', htv: 'KES 250-400' },
  },
  drinkware: {
    waterBottles: { uvPrint: 'KES 200-400', laserEngrave: 'KES 250-500' },
    mugs: { uvPrint: 'KES 150-300', laserEngrave: 'KES 200-400' },
    flasks: { uvPrint: 'KES 300-600', laserEngrave: 'KES 400-800' },
  },
  stationery: {
    notebooks: { deboss: 'KES 150-400', hotStamp: 'KES 200-500', uvPrint: 'KES 100-300' },
    pens: { padPrint: 'KES 15-50', uvPrint: 'KES 30-80', laserEngrave: 'KES 40-100' },
    diaries: { deboss: 'KES 200-600', hotStamp: 'KES 300-800' },
  },
  bags: {
    toteBags: { screenPrint: 'KES 150-300', dtf: 'KES 200-400', sublimation: 'KES 250-500' },
    backpacks: { embroidery: 'KES 400-800', dtf: 'KES 500-1,000' },
  },
  signage: {
    rollupBanners: 'KES 2,500-5,000',
    teardropFlags: 'KES 3,000-6,000',
    backdropBanners: 'KES 5,000-15,000',
    gazeboCanopies: 'KES 8,000-25,000',
  },
};

// ---------------------------------------------------------------------------
// ZONE DETECTION HELPERS
// ---------------------------------------------------------------------------

/**
 * Detect climate zone from Kenyan location/county
 */
export function detectClimateZone(location: string): ClimateZone {
  const loc = location.toLowerCase();

  // Coastal zones
  if (['mombasa', 'malindi', 'kilifi', 'lamu', 'diani', 'watamu', 'tiwi', 'shanzu', 'nyali'].some(r => loc.includes(r))) {
    return 'coastal';
  }

  // Lake region
  if (['kisumu', 'bungoma', 'kakamega', 'siaya', 'homa bay', 'migori', 'nyamira', 'kericho'].some(r => loc.includes(r))) {
    return 'lake';
  }

  // Arid/semi-arid
  if (['turkana', 'isolo', 'marsabit', 'garissa', 'wajir', 'mandera', 'tana river', 'lamu'].some(r => loc.includes(r))) {
    return 'arid';
  }

  // Highland
  if (['nairobi', 'nakuru', 'nyeri', 'nanyuki', 'thika', 'kiambu', 'machakos', 'kajiado', 'muranga', 'nyandarua', 'laikipia', 'eldoret', 'uasin gishu'].some(r => loc.includes(r))) {
    return 'highland';
  }

  // Default to urban (most likely)
  return 'urban';
}

/**
 * Get recommended products for a specific climate zone + industry
 */
export function getRecommendedProducts(zone: ClimateZone, industry: IndustrySector) {
  const zoneData = CLIMATE_ZONES[zone];
  const industryData = INDUSTRY_GUIDES[industry];

  return {
    zone: zoneData,
    industry: industryData,
    recommendedMethods: [...new Set([...zoneData.brandingMethods, ...industryData.recommendedMethods])],
    products: industryData.recommendedProducts.filter(p =>
      zoneData.materialRecommendations.some(m => p.toLowerCase().includes(m.toLowerCase().split(' ')[0]))
    ),
  };
}

/**
 * Get seasonal product recommendations
 */
export function getSeasonalRecommendations(month: number) {
  const monthNames = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
  const monthKey = monthNames[month - 1] as keyof typeof SEASONAL_DEMAND.months;
  return SEASONAL_DEMAND.months[monthKey];
}
