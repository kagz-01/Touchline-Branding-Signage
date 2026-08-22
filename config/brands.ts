import type { BrandId } from '@/lib/brand';

export type Service = {
  name: string;
  description: string;
};

export type PortfolioItem = {
  title: string;
  category: string;
  blurb: string;
  image_url?: string | null;
  image_webp_url?: string | null;
  image_webm_url?: string | null;
  alt?: string | null;
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
  services: Service[];
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
  themeClass: string; // used as data-brand value for CSS
};

export const BRANDS: Record<'branding' | 'signage', BrandConfig> = {
  branding: {
    id: 'branding',
    name: 'Touchline Branding',
    tagline: 'Merch, apparel & promo that carries your brand into the world.',
    domain: 'branding.touchline.co.ke',
    heroKicker: 'Promotional products & brand merchandise',
    heroHeadline: 'Put your brand on everything worth carrying.',
    heroSub:
      "From tote bags to tender-scale rollouts, we source, brand and deliver the merchandise that gets your name into people's hands \u2014 and keeps it there.",
    about:
      'Touchline Branding sources and brands promotional products \u2014 bags, apparel, drinkware, stationery, tech accessories and more \u2014 for companies, campaigns and tenders across Kenya. We manage the sourcing, the branding process and the delivery, so you get one finished product instead of a dozen loose ends.',
    services: [
      { name: 'Apparel branding', description: 'T-shirts, polos, hoodies and branded workwear, embroidered or printed to spec.' },
      { name: 'Bags & carry items', description: 'Tote bags, conference bags, laptop bags and drawstring bags for events and giveaways.' },
      { name: 'Drinkware & stationery', description: 'Mugs, flasks, pens, notebooks and diaries \u2014 the everyday items that keep a brand visible.' },
      { name: 'Headwear', description: 'Caps, hats and visors, branded for teams, staff or campaign giveaways.' },
      { name: 'Tech & everyday accessories', description: 'USB drives, power banks, umbrellas, lanyards and badges.' },
      { name: 'Tender-scale sourcing', description: 'Bulk sourcing and fulfilment for county, corporate and NGO tenders, tracked from quote to delivery.' }
    ],
    portfolio: [
      { title: 'County Government Branding Tender', category: 'Tender fulfilment', blurb: '4,000 branded items across 6 product lines, sourced and delivered against a hard tender deadline.' },
      { title: 'Staff Uniform Rollout', category: 'Apparel', blurb: 'Embroidered workwear for a 120-person field team, reordered quarterly.' },
      { title: 'Conference Delegate Kits', category: 'Bags & drinkware', blurb: 'Branded bags, notebooks and flasks for a three-day industry conference.' },
      { title: 'Product Launch Giveaways', category: 'Promo items', blurb: 'Limited-run branded merchandise timed to a retail launch week.' }
    ],
    testimonials: [
      { quote: 'They handled everything from sourcing to delivery ahead of a tight tender deadline. We never had to chase a single vendor ourselves.', name: 'Procurement Lead', role: 'County government client' },
      { quote: 'Consistent quality across every reorder, which matters when it is your staff wearing the brand every day.', name: 'Operations Manager', role: 'Logistics company' }
    ],
    crossSell: {
      headline: 'Need signage too?',
      body: 'Vehicle branding, signboards, wayfinding and fabrication \u2014 Touchline Signage handles the physical, built side of your brand.',
      ctaLabel: 'See Touchline Signage',
      targetBrand: 'signage'
    },
    contactPhone: '+254 700 000 000',
    contactEmail: 'branding@touchline.co.ke',
    themeClass: 'branding'
  },
  signage: {
    id: 'signage',
    name: 'Touchline Signage',
    tagline: 'Signboards, wayfinding & fabrication built to spec and built to last.',
    domain: 'signage.touchline.co.ke',
    heroKicker: 'Signage, fabrication & LED installations',
    heroHeadline: 'Signage that gets specified once, and works for years.',
    heroSub:
      'Acrylic, vinyl, aluminium composite and LED \u2014 we design, fabricate and install signage that holds up to weather, traffic and time.',
    about:
      'Touchline Signage designs, fabricates and installs signage and branding materials \u2014 from single shopfront signs to multi-site rollouts. We work in acrylic, vinyl, aluminium composite panel, LED and foam board, and we manage the full run from site visit to installation.',
    services: [
      { name: 'Signboards & fascia', description: 'Illuminated and non-illuminated signboards, built to withstand Kenyan weather.' },
      { name: 'LED & illuminated signage', description: 'LED modules and channel letters for storefronts, events and installations that need to be seen at night.' },
      { name: 'Vehicle branding & wraps', description: 'Full and partial vehicle wraps for fleets, matched precisely to brand colour specs.' },
      { name: 'Wayfinding & directional', description: 'Site and building wayfinding systems, designed for clarity at a glance.' },
      { name: 'Acrylic & 3D lettering', description: 'Cut acrylic, foam board and dimensional lettering for receptions, offices and events.' },
      { name: 'Multi-site rollouts', description: 'Consistent signage fabricated and installed across multiple branches or sites, tracked end to end.' }
    ],
    portfolio: [
      { title: 'Retail Fascia Rollout', category: 'Multi-site', blurb: 'Illuminated fascia signage fabricated and installed across 9 branches in matching spec.' },
      { title: 'Corporate Reception Signage', category: 'Acrylic & 3D lettering', blurb: 'Dimensional lettering and wayfinding for a new head-office reception.' },
      { title: 'Fleet Vehicle Wrap', category: 'Vehicle branding', blurb: 'Full-wrap branding for a 14-vehicle delivery fleet, colour-matched to brand guidelines.' },
      { title: 'Event LED Installation', category: 'LED signage', blurb: 'Temporary LED signage and stage branding for a multi-day public event.' }
    ],
    testimonials: [
      { quote: 'The fascia signs across all our branches finally look like one company. Installation was tidy and on schedule at every site.', name: 'Facilities Manager', role: 'Retail chain client' },
      { quote: 'They came out for the site visit, measured everything properly, and the fit was exact on install day.', name: 'Office Manager', role: 'Corporate client' }
    ],
    crossSell: {
      headline: 'Need branded merchandise too?',
      body: 'Apparel, bags, drinkware and promo items \u2014 Touchline Branding handles the wearable, giveable side of your brand.',
      ctaLabel: 'See Touchline Branding',
      targetBrand: 'branding'
    },
    contactPhone: '+254 700 000 001',
    contactEmail: 'signage@touchline.co.ke',
    themeClass: 'signage'
  }
};

export function getBrand(id: 'branding' | 'signage'): BrandConfig {
  return BRANDS[id];
}
