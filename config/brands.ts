import type { BrandId } from '@/lib/brand';

export type ServiceCategory = {
  name: string;
  description: string;
  services: Service[];
};

export type Service = {
  name: string;
  description: string;
  bestFor?: string;
};

export type PortfolioItem = {
  title: string;
  category: string;
  blurb: string;
  image_url?: string | null;
  image_before_url?: string | null;
  image_webp_url?: string | null;
  image_webm_url?: string | null;
  alt?: string | null;
  deadline?: string;
  volume?: string;
  materials?: string;
};

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

export type BrandConfig = {
  id: BrandId;
  name: string;
  tagline: string;
  domain: string;
  heroHeadline: string;
  heroSub: string;
  heroKicker: string;
  about: string;
  serviceCategories: ServiceCategory[];
  portfolio: PortfolioItem[];
  testimonials: Testimonial[];
  crossSell: {
    headline: string;
    body: string;
    ctaLabel: string;
    targetBrand: BrandId;
  };
  contactPhone: string;
  contactEmail: string;
  themeClass: string;
};

export const BRANDS: Record<'branding' | 'signage', BrandConfig> = {
  branding: {
    id: 'branding',
    name: 'Touchline Branding',
    tagline: 'Merchandise that carries your brand into the world.',
    domain: 'branding.touchlineltd.co.ke',
    heroKicker: 'Promotional products & brand merchandise',
    heroHeadline: 'Put your brand in their hands.',
    heroSub:
      "From tote bags to tender-scale rollouts — we source, brand and deliver the merchandise that gets your name into people's hands. And keeps it there.",
    about:
      'Touchline Branding sources and brands promotional products — bags, apparel, drinkware, stationery, tech accessories and more — for companies, campaigns and tenders across Kenya. We manage the sourcing, the branding process and the delivery, so you get one finished product instead of a dozen loose ends.',
    serviceCategories: [
      {
        name: 'Apparel & Textiles',
        description: 'Branded clothing that turns your staff and customers into walking billboards.',
        services: [
          { name: 'Screen Printing', description: 'Ink pushed through mesh stencil onto fabric. Best for large runs with bold, solid-colour designs.', bestFor: 'T-shirts, tote bags, sports jerseys — 50+ units' },
          { name: 'Embroidery', description: 'Thread stitched directly into fabric for a premium, tactile finish that outlasts the garment.', bestFor: 'Polos, caps, jackets, uniforms, fleeces' },
          { name: '3D Puff Embroidery', description: 'Foam-backed embroidery that creates a raised, three-dimensional effect.', bestFor: 'Premium caps, hoodies, streetwear' },
          { name: 'Direct-to-Film (DTF)', description: 'Full-colour design printed on PET film and heat-pressed onto any fabric type.', bestFor: 'Cotton, polyester, blends, nylon — from 1 unit' },
          { name: 'Direct-to-Garment (DTG)', description: 'Inkjet printing directly onto cotton for photographic, full-detail designs.', bestFor: 'Detailed artwork, photographic prints on cotton' },
          { name: 'Sublimation', description: 'Dye infused into polyester for all-over, edge-to-edge prints that never crack or peel.', bestFor: 'Performance wear, jerseys, all-over prints' },
          { name: 'Heat Transfer Vinyl (HTV)', description: 'Cut vinyl shapes heat-pressed onto fabric. Clean, sharp edges for simple designs.', bestFor: 'Names, numbers, simple logos on sportswear' },
          { name: 'Puff Print', description: 'Ink expands when heated for a raised, textured finish on apparel.', bestFor: 'Streetwear, trendy apparel, tonal logos' },
        ]
      },
      {
        name: 'Hard Goods & Accessories',
        description: 'Branded items people use every day — keeping your name visible beyond the screen.',
        services: [
          { name: 'UV Printing', description: 'UV-cured ink printed directly onto rigid surfaces for full-colour, durable branding.', bestFor: 'Mugs, pens, phone cases, power banks, bottles' },
          { name: 'Laser Engraving', description: 'Laser removes surface material for permanent, tone-on-tone branding that never fades.', bestFor: 'Metal drinkware, wooden items, glass, leather' },
          { name: 'Pad Printing', description: 'Silicone pad transfers ink onto small or curved surfaces with precision.', bestFor: 'Pens, keyrings, golf balls, electronics' },
          { name: 'Debossing / Embossing', description: 'Die pressed into leather or paper for a tactile, sophisticated branded impression.', bestFor: 'Notebooks, leather goods, packaging, folders' },
          { name: 'Hot Stamping / Foil Blocking', description: 'Metallic or coloured foil applied with heat for luxury finishes.', bestFor: 'Premium packaging, stationery, gift boxes' },
        ]
      },
      {
        name: 'Labels & Patches',
        description: 'Branded identification that completes the product and reinforces your identity.',
        services: [
          { name: 'Embroidered Patches', description: 'Pre-made embroidered emblems applied via heat press or sewing. Removable and reusable.', bestFor: 'Caps, jackets, workwear, event merchandise' },
          { name: 'Sublimated Patches', description: 'Digitally printed patches with photo-realistic detail and unlimited colours.', bestFor: 'Detailed logos, complex artwork on patches' },
          { name: 'Faux Leather Patches', description: 'Laser-engraved leather-look patches for a premium, rustic finish.', bestFor: 'Caps, denim, premium apparel' },
          { name: 'Woven Labels', description: 'Custom woven fabric labels sewn into garments for branding and care instructions.', bestFor: 'All apparel, uniforms, retail clothing' },
          { name: 'Printed Labels', description: 'Heat-sealed or sew-in labels with full-colour branding.', bestFor: 'Casual wear, promotional items' },
        ]
      },
      {
        name: 'Tender-Scale Sourcing',
        description: 'Bulk sourcing and fulfilment for county, corporate and NGO tenders — tracked from quote to delivery.',
        services: [
          { name: 'County & Government Tenders', description: 'Full tender fulfilment with documentation, compliance, and deadline management.', bestFor: 'County governments, public institutions' },
          { name: 'Corporate Bulk Orders', description: 'Large-scale branded merchandise for corporate events, launches, and staff programs.', bestFor: 'Corporates, banks, telcos' },
          { name: 'NGO & Donor Programmes', description: 'Branded items for field programs, awareness campaigns, and distribution.', bestFor: 'NGOs, UN agencies, donor-funded projects' },
        ]
      }
    ],
    portfolio: [
      { title: 'County Government Branding Tender', category: 'Tender fulfilment', blurb: '4,000 branded items across 6 product lines, sourced and delivered against a hard tender deadline.', volume: '4,000 Units', deadline: '14 Days', materials: 'Fabric, Ceramic, Paper' },
      { title: 'Staff Uniform Rollout', category: 'Apparel', blurb: 'Embroidered workwear for a 120-person field team, reordered quarterly.', volume: '360 Units', deadline: '5 Days', materials: 'Cotton, Polyester Blend' },
      { title: 'Conference Delegate Kits', category: 'Bags & drinkware', blurb: 'Branded bags, notebooks and flasks for a three-day industry conference.', volume: '500 Kits', deadline: '10 Days', materials: 'Canvas, Stainless Steel' },
      { title: 'Product Launch Giveaways', category: 'Promo items', blurb: 'Limited-run branded merchandise timed to a retail launch week.', volume: '1,200 Units', deadline: '7 Days', materials: 'Mixed Media' }
    ],
    testimonials: [
      { quote: 'They handled everything from sourcing to delivery ahead of a tight tender deadline. We never had to chase a single vendor ourselves.', name: 'James Mwangi', role: 'Procurement Lead, County Government' },
      { quote: 'Consistent quality across every reorder, which matters when your staff wear the brand every single day.', name: 'Amina Hassan', role: 'Operations Manager, Logistics Company' }
    ],
    crossSell: {
      headline: 'Need signage too?',
      body: 'Vehicle branding, signboards, wayfinding and fabrication — Touchline Signage handles the physical, built side of your brand.',
      ctaLabel: 'See Touchline Signage',
      targetBrand: 'signage'
    },
    contactPhone: '+254722668696',
    contactEmail: 'branding@touchlineltd.co.ke',
    themeClass: 'branding'
  },
  signage: {
    id: 'signage',
    name: 'Touchline Signage',
    tagline: 'Signage that gets specified once and works for years.',
    domain: 'signage.touchlineltd.co.ke',
    heroKicker: 'Signage, fabrication & LED installations',
    heroHeadline: 'Signs that speak before you do.',
    heroSub:
      'Acrylic, vinyl, aluminium composite and LED — we design, fabricate and install signage that holds up to weather, traffic, and time.',
    about:
      'Touchline Signage designs, fabricates and installs signage and branding materials — from single shopfront signs to multi-site rollouts. We work in acrylic, vinyl, aluminium composite panel, LED and foam board, and we manage the full run from site visit to installation.',
    serviceCategories: [
      {
        name: 'Illuminated Signs',
        description: 'LED-powered signs that work day and night — your brand visible 24/7.',
        services: [
          { name: 'Channel Letters (3D)', description: 'Individual 3D letters with internal LED modules. Available front-lit, back-lit (halo), or combination.', bestFor: 'Storefronts, shopping malls, corporate offices' },
          { name: 'LED Neon Flex', description: 'Flexible LED tubes that mimic traditional neon. Custom shapes, warm glow, no fragility.', bestFor: 'Cafes, bars, restaurants, Instagram walls' },
          { name: 'Traditional Neon', description: 'Classic gas-filled glass tubes handcrafted into custom signs. Artisanal, warm, unmistakable.', bestFor: 'Premium venues, boutique bars, luxury retail' },
          { name: 'Backlit / Halo Signs', description: 'LED light projected backward against the wall, creating a soft glowing halo around each letter.', bestFor: 'Upscale restaurants, corporate lobbies, hotels' },
          { name: 'Edge-Lit Panels', description: 'Acrylic panels lit from the edges for a sleek, modern illuminated effect.', bestFor: 'Reception areas, retail displays, modern interiors' },
        ]
      },
      {
        name: 'Lightbox & Cabinet Signs',
        description: 'Enclosed sign boxes with translucent faces and even LED illumination — cost-effective and versatile.',
        services: [
          { name: 'Front-Lit Lightbox', description: 'Acrylic face with UV full-colour print, evenly lit from within. Wall-mount or ceiling hang.', bestFor: 'Retail chains, storefronts, full-colour logos' },
          { name: 'Backlit Lightbox', description: 'Metal construction with laser-cut hollow logo, producing a glow and halo effect.', bestFor: 'Premium branding, restaurants, corporate' },
          { name: 'Ultra-Thin Lightbox', description: 'Slim-profile lightbox for a minimalist, clean display.', bestFor: 'Studios, boutiques, modern interiors' },
          { name: 'Blade Sign Lightbox', description: 'Double-sided projecting sign for street-facing visibility from any angle.', bestFor: 'Barbershops, restaurants, street-facing stores' },
          { name: 'Push-Through Acrylic', description: 'Dimensional acrylic letters pushed through a cabinet face, illuminated from within.', bestFor: 'Complex logos, franchise signage, multi-tenant buildings' },
        ]
      },
      {
        name: 'Dimensional & Non-Illuminated',
        description: 'Sculpted letters and shapes that rely on material quality and ambient light for impact.',
        services: [
          { name: 'Dimensional Letters', description: 'Cut from acrylic, aluminium, or stainless steel and mounted with standoffs for depth and shadow.', bestFor: 'Lobby signs, building IDs, corporate branding' },
          { name: 'Acrylic & 3D Lettering', description: 'Precision-cut acrylic letters in any font, colour, or size.', bestFor: 'Receptions, offices, events, retail' },
          { name: 'Foam Board Letters', description: 'Lightweight dimensional letters for temporary or indoor displays.', bestFor: 'Events, exhibitions, temporary installations' },
        ]
      },
      {
        name: 'Vinyl & Graphics',
        description: 'Cut or printed vinyl for vehicles, windows, walls, and floors — any surface becomes your canvas.',
        services: [
          { name: 'Vehicle Wraps', description: 'Full and partial vehicle wraps colour-matched to brand guidelines. Cast or calendar vinyl.', bestFor: 'Fleets, delivery vehicles, personal cars' },
          { name: 'Window Graphics', description: 'Perforated vinyl, frosted film, or printed decals for glass surfaces.', bestFor: 'Storefronts, offices, restaurants' },
          { name: 'Wall Graphics & Murals', description: 'Large-format vinyl prints for interior and exterior walls.', bestFor: 'Offices, retail spaces, restaurants, gyms' },
          { name: 'Floor Graphics', description: 'Durable, slip-resistant vinyl for floor branding and wayfinding.', bestFor: 'Retail aisles, events, exhibitions' },
          { name: 'Banner & Flag Printing', description: 'Vinyl or fabric banners for events, promotions, and outdoor advertising.', bestFor: 'Events, storefronts, trade shows' },
        ]
      },
      {
        name: 'Monument & Wayfinding',
        description: 'Large-scale freestanding signs and navigation systems for properties and campuses.',
        services: [
          { name: 'Monument Signs', description: 'Ground-level freestanding structures at property entrances. Masonry, stone, metal, or concrete.', bestFor: 'Office parks, shopping centres, estates' },
          { name: 'Pylon & Pole Signs', description: 'Elevated signs for highway and large parking area visibility.', bestFor: 'Petrol stations, fast food, highway businesses' },
          { name: 'Wayfinding & Directional', description: 'Interior and exterior navigation systems designed for clarity at a glance.', bestFor: 'Hospitals, campuses, malls, multi-store buildings' },
          { name: 'Directory Signs', description: 'Multi-tenant boards with changeable or fixed panels.', bestFor: 'Office buildings, mixed-use developments' },
        ]
      },
      {
        name: 'Fascia & Shopfront',
        description: 'Building face signage that defines your storefront and captures foot traffic.',
        services: [
          { name: 'Illuminated Fascia', description: 'Full-width illuminated signboard covering the storefront header.', bestFor: 'Retail chains, restaurants, pharmacies' },
          { name: 'Non-Illuminated Fascia', description: 'Printed or vinyl-covered fascia panels for daytime visibility.', bestFor: 'Budget-conscious businesses, daytime-only operations' },
          { name: 'Awning & Canopy Signs', description: 'Branded fabric or vinyl coverings providing shade and signage.', bestFor: 'Restaurants, cafes, outdoor seating areas' },
        ]
      }
    ],
    portfolio: [
      { title: 'Retail Fascia Rollout', category: 'Multi-site', blurb: 'Illuminated fascia signage fabricated and installed across 9 branches in matching spec.', volume: '9 Sites', deadline: '21 Days', materials: 'Aluminium Composite, LED' },
      { title: 'Corporate Reception Signage', category: 'Acrylic & 3D lettering', blurb: 'Dimensional lettering and wayfinding for a new head-office reception.', volume: '1 Office', deadline: '3 Days', materials: 'Cut Acrylic' },
      { title: 'Fleet Vehicle Wrap', category: 'Vehicle branding', blurb: 'Full-wrap branding for a 14-vehicle delivery fleet, colour-matched to brand guidelines.', volume: '14 Vehicles', deadline: '7 Days', materials: 'Cast Vinyl' },
      { title: 'Event LED Installation', category: 'LED signage', blurb: 'Temporary LED signage and stage branding for a multi-day public event.', volume: '1 Stage', deadline: '48 Hours', materials: 'LED Modules, Steel Frame' }
    ],
    testimonials: [
      { quote: 'The fascia signs across all our branches finally look like one company. Installation was tidy and on schedule at every site.', name: 'Peter Odhiambo', role: 'Facilities Manager, Retail Chain' },
      { quote: 'They came out for the site visit, measured everything properly, and the fit was exact on install day.', name: 'Grace Wanjiru', role: 'Office Manager, Corporate Client' }
    ],
    crossSell: {
      headline: 'Need branded merchandise too?',
      body: 'Apparel, bags, drinkware and promo items — Touchline Branding handles the wearable, giveable side of your brand.',
      ctaLabel: 'See Touchline Branding',
      targetBrand: 'branding'
    },
    contactPhone: '+254722668696',
    contactEmail: 'signage@touchlineltd.co.ke',
    themeClass: 'signage'
  }
};

export function getBrand(id: 'branding' | 'signage'): BrandConfig {
  return BRANDS[id];
}
