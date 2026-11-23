// Touchline Branding Official Product Catalog (Derived from Promohub Catalog & Real Imagery)
export interface BrandingCatalogItem {
  id: string;
  sku: string;
  title: string;
  category: string;
  categorySlug: string;
  description: string;
  priceKes: number;
  image: string;
  specs: string[];
  turnaround: string;
}

export const BRANDING_CATALOG_CATEGORIES = [
  { slug: 'all', label: 'All Merchandise' },
  { slug: 'apparel', label: 'Apparel & Uniforms' },
  { slug: 'gift-sets', label: 'Executive Gift Sets' },
  { slug: 'drinkware', label: 'Drinkware & Flasks' },
  { slug: 'notebooks', label: 'Journals & Notebooks' },
  { slug: 'pens', label: 'Metal Pens' },
  { slug: 'bags', label: 'Bags & Totes' },
  { slug: 'accessories', label: 'Tech & Keychains' },
];

export const BRANDING_CATALOG_ITEMS: BrandingCatalogItem[] = [
  {
    "id": "SET-001",
    "sku": "SET-001",
    "title": "Lumina Diamond Collection 002",
    "category": "Executive Gift Sets",
    "categorySlug": "gift-sets",
    "description": "A carefully curated corporate gift ensemble designed for lasting impression. Premium coordinated pieces presented in a refined presentation box \u2014 ideal for executive recognition, client appreciation programmes, and milestone celebrations. Fully brandable to reflect your organisation's identity.",
    "priceKes": 5840,
    "image": "/images/branding/catalog/set-001.webp",
    "specs": [
      "1200 GSM Rigid Keepsake Box",
      "Custom High-Density Foam Cutout",
      "Hot Foil / UV Branded"
    ],
    "turnaround": "5 - 7 Days"
  },
  {
    "id": "SET-002",
    "sku": "SET-002",
    "title": "Verdant Eco Pen Ensemble",
    "category": "Executive Gift Sets",
    "categorySlug": "gift-sets",
    "description": "An eco-conscious corporate gift ensemble crafted from sustainable materials. Thoughtfully matched pieces presented in an elegant box \u2014 perfect for organisations that value both premium quality and environmental responsibility. Ideal for client gifts and employee recognition.",
    "priceKes": 1560,
    "image": "/images/branding/catalog/set-002.webp",
    "specs": [
      "1200 GSM Rigid Keepsake Box",
      "Custom High-Density Foam Cutout",
      "Hot Foil / UV Branded"
    ],
    "turnaround": "5 - 7 Days"
  },
  {
    "id": "NBK-003",
    "sku": "NBK-003",
    "title": "Code 500 Executive Notebook",
    "category": "Executive Notebooks & Journals",
    "categorySlug": "notebooks",
    "description": "An elegant professional notebook designed for the modern executive. Premium finish, secure closure, and high-quality lined pages \u2014 ideal for meetings, journaling, strategic planning, and daily organisation. A timeless corporate gift.",
    "priceKes": 770,
    "image": "/images/branding/catalog/nbk-003.webp",
    "specs": [
      "Thermal PU Leatherette Hardcover",
      "100 GSM Acid-Free Paper",
      "Blind Debossed Cresting"
    ],
    "turnaround": "3 - 5 Days"
  },
  {
    "id": "NBK-005",
    "sku": "NBK-005",
    "title": "E545 Executive Notebook",
    "category": "Executive Notebooks & Journals",
    "categorySlug": "notebooks",
    "description": "An elegant professional notebook designed for the modern executive. Premium finish, secure closure, and high-quality lined pages \u2014 ideal for meetings, journaling, strategic planning, and daily organisation. A timeless corporate gift.",
    "priceKes": 900,
    "image": "/images/branding/catalog/nbk-005.webp",
    "specs": [
      "Thermal PU Leatherette Hardcover",
      "100 GSM Acid-Free Paper",
      "Blind Debossed Cresting"
    ],
    "turnaround": "3 - 5 Days"
  },
  {
    "id": "NBK-006",
    "sku": "NBK-006",
    "title": "Aurelia Gold-Bar Executive Notebook",
    "category": "Executive Notebooks & Journals",
    "categorySlug": "notebooks",
    "description": "A refined A5 executive notebook featuring a distinctive gold-bar accent. Premium finish, secure closure, and high-quality lined pages \u2014 perfect for meetings, strategic planning, and daily organisation. An elevated corporate stationery gift.",
    "priceKes": 900,
    "image": "/images/branding/catalog/nbk-006.webp",
    "specs": [
      "Thermal PU Leatherette Hardcover",
      "100 GSM Acid-Free Paper",
      "Blind Debossed Cresting"
    ],
    "turnaround": "3 - 5 Days"
  },
  {
    "id": "SET-007",
    "sku": "SET-007",
    "title": "SoftTouch Premium Ensemble 030",
    "category": "Executive Gift Sets",
    "categorySlug": "gift-sets",
    "description": "A carefully curated corporate gift ensemble designed for lasting impression. Premium coordinated pieces presented in a refined presentation box \u2014 ideal for executive recognition, client appreciation programmes, and milestone celebrations. Fully brandable to reflect your organisation's identity.",
    "priceKes": 4760,
    "image": "/images/branding/catalog/set-007.webp",
    "specs": [
      "1200 GSM Rigid Keepsake Box",
      "Custom High-Density Foam Cutout",
      "Hot Foil / UV Branded"
    ],
    "turnaround": "5 - 7 Days"
  },
  {
    "id": "NBK-009",
    "sku": "NBK-009",
    "title": "Timberline Eco Executive Notebook",
    "category": "Executive Notebooks & Journals",
    "categorySlug": "notebooks",
    "description": "An eco-conscious executive notebook crafted for professionals who value sustainability. Premium pages, durable cover, and refined finish \u2014 ideal for meetings, journaling, and daily planning. A thoughtful corporate gift that reflects environmental responsibility.",
    "priceKes": 800,
    "image": "/images/branding/catalog/nbk-009.webp",
    "specs": [
      "Thermal PU Leatherette Hardcover",
      "100 GSM Acid-Free Paper",
      "Blind Debossed Cresting"
    ],
    "turnaround": "3 - 5 Days"
  },
  {
    "id": "NBK-011",
    "sku": "NBK-011",
    "title": "Code 638-25 Executive Notebook",
    "category": "Executive Notebooks & Journals",
    "categorySlug": "notebooks",
    "description": "An elegant professional notebook designed for the modern executive. Premium finish, secure closure, and high-quality lined pages \u2014 ideal for meetings, journaling, strategic planning, and daily organisation. A timeless corporate gift.",
    "priceKes": 800,
    "image": "/images/branding/catalog/nbk-011.webp",
    "specs": [
      "Thermal PU Leatherette Hardcover",
      "100 GSM Acid-Free Paper",
      "Blind Debossed Cresting"
    ],
    "turnaround": "3 - 5 Days"
  },
  {
    "id": "ACC-014",
    "sku": "ACC-014",
    "title": "Italia Design Pen Case",
    "category": "Tech Accessories & Keychains",
    "categorySlug": "accessories",
    "description": "A refined pen storage case designed to protect and present writing instruments with elegance. Premium materials and thoughtful construction make it a distinguished desk accessory or corporate gift component.",
    "priceKes": 1000,
    "image": "/images/branding/catalog/acc-014.webp",
    "specs": [
      "15W Qi Fast Wireless Charging",
      "Braided Metal Reinforced Cable",
      "Backlit Laser Engraved Logo"
    ],
    "turnaround": "4 - 5 Days"
  },
  {
    "id": "ACC-015",
    "sku": "ACC-015",
    "title": "SubliMag Fridge Magnet",
    "category": "Tech Accessories & Keychains",
    "categorySlug": "accessories",
    "description": "A customisable sublimation fridge magnet \u2014 practical, promotional, and memorable. Ideal for brand visibility campaigns, event giveaways, and everyday desk or kitchen use.",
    "priceKes": 320,
    "image": "/images/branding/catalog/acc-015.webp",
    "specs": [
      "15W Qi Fast Wireless Charging",
      "Braided Metal Reinforced Cable",
      "Backlit Laser Engraved Logo"
    ],
    "turnaround": "4 - 5 Days"
  },
  {
    "id": "PEN-016",
    "sku": "PEN-016",
    "title": "Code 002 Professional Pen",
    "category": "Metal Pens & Writing",
    "categorySlug": "pens",
    "description": "A high-quality professional writing instrument engineered for smooth, reliable performance. Ideal for corporate branding, daily office use, and client gifting. Available for full customisation with your logo or brand colours.",
    "priceKes": 70,
    "image": "/images/branding/catalog/pen-016.webp",
    "specs": [
      "Solid Brass Barrel & Core",
      "Fiber Laser Mirror Annealing",
      "Schneider German 0.7mm Refill"
    ],
    "turnaround": "2 - 4 Days"
  },
  {
    "id": "FLK-039",
    "sku": "FLK-039",
    "title": "TwinPeak Dual Thermal Flask",
    "category": "Thermal Drinkware & Flasks",
    "categorySlug": "drinkware",
    "description": "A premium insulated vessel engineered to maintain ideal temperature for hot or cold beverages. Durable construction and refined styling make it an excellent companion for the office, travel, or outdoor use. Fully brandable for corporate programmes.",
    "priceKes": 1400,
    "image": "/images/branding/catalog/flk-039.webp",
    "specs": [
      "Double-Wall Food-Grade SS304",
      "TempLock Vacuum Insulation",
      "Fiber Laser Annealed"
    ],
    "turnaround": "3 - 5 Days"
  },
  {
    "id": "SET-040",
    "sku": "SET-040",
    "title": "Atlas Executive 545 Ensemble",
    "category": "Executive Gift Sets",
    "categorySlug": "gift-sets",
    "description": "A carefully curated corporate gift ensemble designed for lasting impression. Premium coordinated pieces presented in a refined presentation box \u2014 ideal for executive recognition, client appreciation programmes, and milestone celebrations. Fully brandable to reflect your organisation's identity.",
    "priceKes": 1800,
    "image": "/images/branding/catalog/set-040.webp",
    "specs": [
      "1200 GSM Rigid Keepsake Box",
      "Custom High-Density Foam Cutout",
      "Hot Foil / UV Branded"
    ],
    "turnaround": "5 - 7 Days"
  },
  {
    "id": "SET-043",
    "sku": "SET-043",
    "title": "Orbit Round-Buckle Gift Collection",
    "category": "Executive Gift Sets",
    "categorySlug": "gift-sets",
    "description": "A carefully curated corporate gift ensemble designed for lasting impression. Premium coordinated pieces presented in a refined presentation box \u2014 ideal for executive recognition, client appreciation programmes, and milestone celebrations. Fully brandable to reflect your organisation's identity.",
    "priceKes": 2000,
    "image": "/images/branding/catalog/set-043.webp",
    "specs": [
      "1200 GSM Rigid Keepsake Box",
      "Custom High-Density Foam Cutout",
      "Hot Foil / UV Branded"
    ],
    "turnaround": "5 - 7 Days"
  },
  {
    "id": "ACC-044",
    "sku": "ACC-044",
    "title": "NoirMetal Keyring",
    "category": "Tech Accessories & Keychains",
    "categorySlug": "accessories",
    "description": "A premium customisable keyring crafted with care and precision. An excellent personalised accessory for everyday use \u2014 ideal as a thoughtful small corporate gift, event giveaway, or personal keepsake. Fully brandable.",
    "priceKes": 240,
    "image": "/images/branding/catalog/acc-044.webp",
    "specs": [
      "15W Qi Fast Wireless Charging",
      "Braided Metal Reinforced Cable",
      "Backlit Laser Engraved Logo"
    ],
    "turnaround": "4 - 5 Days"
  },
  {
    "id": "FLK-259",
    "sku": "FLK-259",
    "title": "SoftTouch 500ml Thermal Flask",
    "category": "Thermal Drinkware & Flasks",
    "categorySlug": "drinkware",
    "description": "A premium insulated vessel engineered to maintain ideal temperature for hot or cold beverages. Durable construction and refined styling make it an excellent companion for the office, travel, or outdoor use. Fully brandable for corporate programmes.",
    "priceKes": 1300,
    "image": "/images/branding/catalog/flk-259.webp",
    "specs": [
      "Double-Wall Food-Grade SS304",
      "TempLock Vacuum Insulation",
      "Fiber Laser Annealed"
    ],
    "turnaround": "3 - 5 Days"
  },
  {
    "id": "FLK-047",
    "sku": "FLK-047",
    "title": "LitreForge 1000ml Thermal Flask",
    "category": "Thermal Drinkware & Flasks",
    "categorySlug": "drinkware",
    "description": "A premium insulated vessel engineered to maintain ideal temperature for hot or cold beverages. Durable construction and refined styling make it an excellent companion for the office, travel, or outdoor use. Fully brandable for corporate programmes.",
    "priceKes": 1900,
    "image": "/images/branding/catalog/flk-047.webp",
    "specs": [
      "Double-Wall Food-Grade SS304",
      "TempLock Vacuum Insulation",
      "Fiber Laser Annealed"
    ],
    "turnaround": "3 - 5 Days"
  },
  {
    "id": "SET-048",
    "sku": "SET-048",
    "title": "Timberline Wooden-Base Collection",
    "category": "Executive Gift Sets",
    "categorySlug": "gift-sets",
    "description": "A carefully curated corporate gift ensemble designed for lasting impression. Premium coordinated pieces presented in a refined presentation box \u2014 ideal for executive recognition, client appreciation programmes, and milestone celebrations. Fully brandable to reflect your organisation's identity.",
    "priceKes": 5300,
    "image": "/images/branding/catalog/set-048.webp",
    "specs": [
      "1200 GSM Rigid Keepsake Box",
      "Custom High-Density Foam Cutout",
      "Hot Foil / UV Branded"
    ],
    "turnaround": "5 - 7 Days"
  },
  {
    "id": "FLK-049",
    "sku": "FLK-049",
    "title": "VinoKeep Wine Tumbler",
    "category": "Thermal Drinkware & Flasks",
    "categorySlug": "drinkware",
    "description": "A premium insulated vessel engineered to maintain ideal temperature for hot or cold beverages. Durable construction and refined styling make it an excellent companion for the office, travel, or outdoor use. Fully brandable for corporate programmes.",
    "priceKes": 1500,
    "image": "/images/branding/catalog/flk-049.webp",
    "specs": [
      "Double-Wall Food-Grade SS304",
      "TempLock Vacuum Insulation",
      "Fiber Laser Annealed"
    ],
    "turnaround": "3 - 5 Days"
  },
  {
    "id": "NBK-246",
    "sku": "NBK-246",
    "title": "E113 Executive Notebook",
    "category": "Executive Notebooks & Journals",
    "categorySlug": "notebooks",
    "description": "An elegant professional notebook designed for the modern executive. Premium finish, secure closure, and high-quality lined pages \u2014 ideal for meetings, journaling, strategic planning, and daily organisation. A timeless corporate gift.",
    "priceKes": 1100,
    "image": "/images/branding/catalog/nbk-246.webp",
    "specs": [
      "Thermal PU Leatherette Hardcover",
      "100 GSM Acid-Free Paper",
      "Blind Debossed Cresting"
    ],
    "turnaround": "3 - 5 Days"
  },
  {
    "id": "ACC-051",
    "sku": "ACC-051",
    "title": "LuxeLine Executive Cardholder",
    "category": "Tech Accessories & Keychains",
    "categorySlug": "accessories",
    "description": "A slim, refined cardholder designed for the modern professional. Premium materials and precise construction \u2014 perfect as a corporate gift or everyday desk essential. Available for branding.",
    "priceKes": 500,
    "image": "/images/branding/catalog/acc-051.webp",
    "specs": [
      "15W Qi Fast Wireless Charging",
      "Braided Metal Reinforced Cable",
      "Backlit Laser Engraved Logo"
    ],
    "turnaround": "4 - 5 Days"
  },
  {
    "id": "FLK-053",
    "sku": "FLK-053",
    "title": "SoftTouch 750ml Thermal Flask",
    "category": "Thermal Drinkware & Flasks",
    "categorySlug": "drinkware",
    "description": "A premium insulated vessel engineered to maintain ideal temperature for hot or cold beverages. Durable construction and refined styling make it an excellent companion for the office, travel, or outdoor use. Fully brandable for corporate programmes.",
    "priceKes": 1900,
    "image": "/images/branding/catalog/flk-053.webp",
    "specs": [
      "Double-Wall Food-Grade SS304",
      "TempLock Vacuum Insulation",
      "Fiber Laser Annealed"
    ],
    "turnaround": "3 - 5 Days"
  },
  {
    "id": "SET-054",
    "sku": "SET-054",
    "title": "TwinPeak Dual-Flask Collection",
    "category": "Executive Gift Sets",
    "categorySlug": "gift-sets",
    "description": "A premium drinkware-focused gift ensemble featuring coordinated thermal pieces. Presented in a sophisticated box, this collection is ideal for executive gifting, client hospitality programmes, and corporate milestone celebrations. Fully customisable.",
    "priceKes": 4740,
    "image": "/images/branding/catalog/set-054.webp",
    "specs": [
      "1200 GSM Rigid Keepsake Box",
      "Custom High-Density Foam Cutout",
      "Hot Foil / UV Branded"
    ],
    "turnaround": "5 - 7 Days"
  },
  {
    "id": "SET-055",
    "sku": "SET-055",
    "title": "CorkCraft Sustainable Gift Collection",
    "category": "Executive Gift Sets",
    "categorySlug": "gift-sets",
    "description": "An eco-conscious corporate gift ensemble crafted from sustainable materials. Thoughtfully matched pieces presented in an elegant box \u2014 perfect for organisations that value both premium quality and environmental responsibility. Ideal for client gifts and employee recognition.",
    "priceKes": 5180,
    "image": "/images/branding/catalog/set-055.webp",
    "specs": [
      "1200 GSM Rigid Keepsake Box",
      "Custom High-Density Foam Cutout",
      "Hot Foil / UV Branded"
    ],
    "turnaround": "5 - 7 Days"
  },
  {
    "id": "SET-061",
    "sku": "SET-061",
    "title": "ArrowForge Flask Gift Collection",
    "category": "Executive Gift Sets",
    "categorySlug": "gift-sets",
    "description": "A premium drinkware-focused gift ensemble featuring coordinated thermal pieces. Presented in a sophisticated box, this collection is ideal for executive gifting, client hospitality programmes, and corporate milestone celebrations. Fully customisable.",
    "priceKes": 6000,
    "image": "/images/branding/catalog/set-061.webp",
    "specs": [
      "1200 GSM Rigid Keepsake Box",
      "Custom High-Density Foam Cutout",
      "Hot Foil / UV Branded"
    ],
    "turnaround": "5 - 7 Days"
  },
  {
    "id": "PEN-244",
    "sku": "PEN-244",
    "title": "Executive Plastic Professional Pen",
    "category": "Metal Pens & Writing",
    "categorySlug": "pens",
    "description": "A high-quality professional writing instrument engineered for smooth, reliable performance. Ideal for corporate branding, daily office use, and client gifting. Available for full customisation with your logo or brand colours.",
    "priceKes": 100,
    "image": "/images/branding/catalog/pen-244.webp",
    "specs": [
      "Solid Brass Barrel & Core",
      "Fiber Laser Mirror Annealing",
      "Schneider German 0.7mm Refill"
    ],
    "turnaround": "2 - 4 Days"
  },
  {
    "id": "FLK-261",
    "sku": "FLK-261",
    "title": "BambooCap 510ml Aluminium Bottle",
    "category": "Thermal Drinkware & Flasks",
    "categorySlug": "drinkware",
    "description": "An eco-conscious insulated bottle combining sustainable materials with reliable temperature retention. Ideal for environmentally minded organisations seeking premium, brandable drinkware for staff or clients.",
    "priceKes": 860,
    "image": "/images/branding/catalog/flk-261.webp",
    "specs": [
      "Double-Wall Food-Grade SS304",
      "TempLock Vacuum Insulation",
      "Fiber Laser Annealed"
    ],
    "turnaround": "3 - 5 Days"
  },
  {
    "id": "ACC-065",
    "sku": "ACC-065",
    "title": "TwinWood Rectangular Keyring",
    "category": "Tech Accessories & Keychains",
    "categorySlug": "accessories",
    "description": "A premium customisable keyring crafted with care and precision. An excellent personalised accessory for everyday use \u2014 ideal as a thoughtful small corporate gift, event giveaway, or personal keepsake. Fully brandable.",
    "priceKes": 120,
    "image": "/images/branding/catalog/acc-065.webp",
    "specs": [
      "15W Qi Fast Wireless Charging",
      "Braided Metal Reinforced Cable",
      "Backlit Laser Engraved Logo"
    ],
    "turnaround": "4 - 5 Days"
  },
  {
    "id": "FLK-020",
    "sku": "FLK-020",
    "title": "EcoBase Sustainable Tumbler",
    "category": "Thermal Drinkware & Flasks",
    "categorySlug": "drinkware",
    "description": "An eco-conscious insulated bottle combining sustainable materials with reliable temperature retention. Ideal for environmentally minded organisations seeking premium, brandable drinkware for staff or clients.",
    "priceKes": 1700,
    "image": "/images/branding/catalog/flk-020.webp",
    "specs": [
      "Double-Wall Food-Grade SS304",
      "TempLock Vacuum Insulation",
      "Fiber Laser Annealed"
    ],
    "turnaround": "3 - 5 Days"
  },
  {
    "id": "PEN-236",
    "sku": "PEN-236",
    "title": "CurveLine Plastic Executive Pen",
    "category": "Metal Pens & Writing",
    "categorySlug": "pens",
    "description": "A high-quality professional writing instrument engineered for smooth, reliable performance. Ideal for corporate branding, daily office use, and client gifting. Available for full customisation with your logo or brand colours.",
    "priceKes": 70,
    "image": "/images/branding/catalog/pen-236.webp",
    "specs": [
      "Solid Brass Barrel & Core",
      "Fiber Laser Mirror Annealing",
      "Schneider German 0.7mm Refill"
    ],
    "turnaround": "2 - 4 Days"
  },
  {
    "id": "ACC-032",
    "sku": "ACC-032",
    "title": "Prestige Lapel Pin",
    "category": "Tech Accessories & Keychains",
    "categorySlug": "accessories",
    "description": "A refined lapel pin crafted for professional and ceremonial wear. Ideal for corporate identity programmes, events, and recognition gifts. Fully customisable with your emblem or logo.",
    "priceKes": 80,
    "image": "/images/branding/catalog/acc-032.webp",
    "specs": [
      "15W Qi Fast Wireless Charging",
      "Braided Metal Reinforced Cable",
      "Backlit Laser Engraved Logo"
    ],
    "turnaround": "4 - 5 Days"
  },
  {
    "id": "BAG-069",
    "sku": "BAG-069",
    "title": "NoirLux A3 Carrier Bag",
    "category": "Conference Bags & Totes",
    "categorySlug": "bags",
    "description": "A premium laminated carrier bag designed to elevate retail packaging, corporate events, and branded gifting. Sturdy construction and refined finish ensure your presentation makes a lasting first impression. Fully customisable with logo or brand colours.",
    "priceKes": 280,
    "image": "/images/branding/catalog/bag-069.webp",
    "specs": [
      "320 GSM Heavy Natural Canvas",
      "Cross-Stitched Reinforced Webbing",
      "Water-Based Eco Screen Print"
    ],
    "turnaround": "4 - 6 Days"
  },
  {
    "id": "BAG-070",
    "sku": "BAG-070",
    "title": "ChromaLux A4 Carrier Bag",
    "category": "Conference Bags & Totes",
    "categorySlug": "bags",
    "description": "A premium laminated carrier bag designed to elevate retail packaging, corporate events, and branded gifting. Sturdy construction and refined finish ensure your presentation makes a lasting first impression. Fully customisable with logo or brand colours.",
    "priceKes": 260,
    "image": "/images/branding/catalog/bag-070.webp",
    "specs": [
      "320 GSM Heavy Natural Canvas",
      "Cross-Stitched Reinforced Webbing",
      "Water-Based Eco Screen Print"
    ],
    "turnaround": "4 - 6 Days"
  },
  {
    "id": "FLK-071",
    "sku": "FLK-071",
    "title": "Lumina Diamond Thermal Flask",
    "category": "Thermal Drinkware & Flasks",
    "categorySlug": "drinkware",
    "description": "A premium insulated vessel engineered to maintain ideal temperature for hot or cold beverages. Durable construction and refined styling make it an excellent companion for the office, travel, or outdoor use. Fully brandable for corporate programmes.",
    "priceKes": 1900,
    "image": "/images/branding/catalog/flk-071.webp",
    "specs": [
      "Double-Wall Food-Grade SS304",
      "TempLock Vacuum Insulation",
      "Fiber Laser Annealed"
    ],
    "turnaround": "3 - 5 Days"
  },
  {
    "id": "PEN-072",
    "sku": "PEN-072",
    "title": "014 Professional Pen",
    "category": "Metal Pens & Writing",
    "categorySlug": "pens",
    "description": "A high-quality professional writing instrument engineered for smooth, reliable performance. Ideal for corporate branding, daily office use, and client gifting. Available for full customisation with your logo or brand colours.",
    "priceKes": 70,
    "image": "/images/branding/catalog/pen-072.webp",
    "specs": [
      "Solid Brass Barrel & Core",
      "Fiber Laser Mirror Annealing",
      "Schneider German 0.7mm Refill"
    ],
    "turnaround": "2 - 4 Days"
  },
  {
    "id": "NBK-252",
    "sku": "NBK-252",
    "title": "CorkCraft Fabric-Cover Notebook",
    "category": "Executive Notebooks & Journals",
    "categorySlug": "notebooks",
    "description": "An eco-conscious executive notebook crafted for professionals who value sustainability. Premium pages, durable cover, and refined finish \u2014 ideal for meetings, journaling, and daily planning. A thoughtful corporate gift that reflects environmental responsibility.",
    "priceKes": 800,
    "image": "/images/branding/catalog/nbk-252.webp",
    "specs": [
      "Thermal PU Leatherette Hardcover",
      "100 GSM Acid-Free Paper",
      "Blind Debossed Cresting"
    ],
    "turnaround": "3 - 5 Days"
  },
  {
    "id": "PEN-241",
    "sku": "PEN-241",
    "title": "Code 006 Professional Pen",
    "category": "Metal Pens & Writing",
    "categorySlug": "pens",
    "description": "A high-quality professional writing instrument engineered for smooth, reliable performance. Ideal for corporate branding, daily office use, and client gifting. Available for full customisation with your logo or brand colours.",
    "priceKes": 240,
    "image": "/images/branding/catalog/pen-241.webp",
    "specs": [
      "Solid Brass Barrel & Core",
      "Fiber Laser Mirror Annealing",
      "Schneider German 0.7mm Refill"
    ],
    "turnaround": "2 - 4 Days"
  },
  {
    "id": "NBK-251",
    "sku": "NBK-251",
    "title": "MagLock Magnetic-Buckle A5 Notebook",
    "category": "Executive Notebooks & Journals",
    "categorySlug": "notebooks",
    "description": "An elegant executive notebook with a secure buckle closure. Premium cover finish and high-quality lined pages make it ideal for meetings, journaling, and professional organisation. A polished corporate gift choice.",
    "priceKes": 900,
    "image": "/images/branding/catalog/nbk-251.webp",
    "specs": [
      "Thermal PU Leatherette Hardcover",
      "100 GSM Acid-Free Paper",
      "Blind Debossed Cresting"
    ],
    "turnaround": "3 - 5 Days"
  },
  {
    "id": "ACC-073",
    "sku": "ACC-073",
    "title": "WoodMetal Rectangular Keyring",
    "category": "Tech Accessories & Keychains",
    "categorySlug": "accessories",
    "description": "A premium customisable keyring crafted with care and precision. An excellent personalised accessory for everyday use \u2014 ideal as a thoughtful small corporate gift, event giveaway, or personal keepsake. Fully brandable.",
    "priceKes": 300,
    "image": "/images/branding/catalog/acc-073.webp",
    "specs": [
      "15W Qi Fast Wireless Charging",
      "Braided Metal Reinforced Cable",
      "Backlit Laser Engraved Logo"
    ],
    "turnaround": "4 - 5 Days"
  },
  {
    "id": "FLK-075",
    "sku": "FLK-075",
    "title": "ArrowForge Steel Thermal Flask",
    "category": "Thermal Drinkware & Flasks",
    "categorySlug": "drinkware",
    "description": "A premium insulated vessel engineered to maintain ideal temperature for hot or cold beverages. Durable construction and refined styling make it an excellent companion for the office, travel, or outdoor use. Fully brandable for corporate programmes.",
    "priceKes": 1700,
    "image": "/images/branding/catalog/flk-075.webp",
    "specs": [
      "Double-Wall Food-Grade SS304",
      "TempLock Vacuum Insulation",
      "Fiber Laser Annealed"
    ],
    "turnaround": "3 - 5 Days"
  },
  {
    "id": "ACC-267",
    "sku": "ACC-267",
    "title": "BambooOrb Keyring",
    "category": "Tech Accessories & Keychains",
    "categorySlug": "accessories",
    "description": "A premium customisable keyring crafted with care and precision. An excellent personalised accessory for everyday use \u2014 ideal as a thoughtful small corporate gift, event giveaway, or personal keepsake. Fully brandable.",
    "priceKes": 300,
    "image": "/images/branding/catalog/acc-267.webp",
    "specs": [
      "15W Qi Fast Wireless Charging",
      "Braided Metal Reinforced Cable",
      "Backlit Laser Engraved Logo"
    ],
    "turnaround": "4 - 5 Days"
  },
  {
    "id": "ACC-076",
    "sku": "ACC-076",
    "title": "Europa Design Pen Case",
    "category": "Tech Accessories & Keychains",
    "categorySlug": "accessories",
    "description": "A refined pen storage case designed to protect and present writing instruments with elegance. Premium materials and thoughtful construction make it a distinguished desk accessory or corporate gift component.",
    "priceKes": 900,
    "image": "/images/branding/catalog/acc-076.webp",
    "specs": [
      "15W Qi Fast Wireless Charging",
      "Braided Metal Reinforced Cable",
      "Backlit Laser Engraved Logo"
    ],
    "turnaround": "4 - 5 Days"
  },
  {
    "id": "PEN-079",
    "sku": "PEN-079",
    "title": "CurveLine Plastic Executive Pen",
    "category": "Metal Pens & Writing",
    "categorySlug": "pens",
    "description": "A high-quality professional writing instrument engineered for smooth, reliable performance. Ideal for corporate branding, daily office use, and client gifting. Available for full customisation with your logo or brand colours.",
    "priceKes": 40,
    "image": "/images/branding/catalog/pen-079.webp",
    "specs": [
      "Solid Brass Barrel & Core",
      "Fiber Laser Mirror Annealing",
      "Schneider German 0.7mm Refill"
    ],
    "turnaround": "2 - 4 Days"
  },
  {
    "id": "NBK-080",
    "sku": "NBK-080",
    "title": "BambooForge Executive Notebook",
    "category": "Executive Notebooks & Journals",
    "categorySlug": "notebooks",
    "description": "An eco-conscious executive notebook crafted for professionals who value sustainability. Premium pages, durable cover, and refined finish \u2014 ideal for meetings, journaling, and daily planning. A thoughtful corporate gift that reflects environmental responsibility.",
    "priceKes": 840,
    "image": "/images/branding/catalog/nbk-080.webp",
    "specs": [
      "Thermal PU Leatherette Hardcover",
      "100 GSM Acid-Free Paper",
      "Blind Debossed Cresting"
    ],
    "turnaround": "3 - 5 Days"
  },
  {
    "id": "PEN-242",
    "sku": "PEN-242",
    "title": "Code 008 Professional Pen",
    "category": "Metal Pens & Writing",
    "categorySlug": "pens",
    "description": "A high-quality professional writing instrument engineered for smooth, reliable performance. Ideal for corporate branding, daily office use, and client gifting. Available for full customisation with your logo or brand colours.",
    "priceKes": 300,
    "image": "/images/branding/catalog/pen-242.webp",
    "specs": [
      "Solid Brass Barrel & Core",
      "Fiber Laser Mirror Annealing",
      "Schneider German 0.7mm Refill"
    ],
    "turnaround": "2 - 4 Days"
  },
  {
    "id": "BAG-288",
    "sku": "BAG-288",
    "title": "HeartForm Gift Box",
    "category": "Conference Bags & Totes",
    "categorySlug": "bags",
    "description": "A premium laminated carrier bag designed to elevate retail packaging, corporate events, and branded gifting. Sturdy construction and refined finish ensure your presentation makes a lasting first impression. Fully customisable with logo or brand colours.",
    "priceKes": 0,
    "image": "/images/branding/catalog/bag-288.webp",
    "specs": [
      "320 GSM Heavy Natural Canvas",
      "Cross-Stitched Reinforced Webbing",
      "Water-Based Eco Screen Print"
    ],
    "turnaround": "4 - 6 Days"
  },
  {
    "id": "MUG-019",
    "sku": "MUG-019",
    "title": "ChromaMagic Colour-Change Mug",
    "category": "Mugs & Travel Tumblers",
    "categorySlug": "drinkware",
    "description": "A heat-activated colour-change mug that reveals designs when filled with hot liquid. Engaging, memorable, and fully customisable \u2014 perfect for corporate promotions and gifts.",
    "priceKes": 500,
    "image": "/images/branding/catalog/mug-019.webp",
    "specs": [
      "Ceramic / Stainless Travel Form",
      "Sublimation / UV Rotary Print",
      "Dishwasher & Microwave Safe"
    ],
    "turnaround": "3 - 5 Days"
  },
  {
    "id": "BAG-024",
    "sku": "BAG-024",
    "title": "ChromaLux A5 Carrier Bag",
    "category": "Conference Bags & Totes",
    "categorySlug": "bags",
    "description": "A premium laminated carrier bag designed to elevate retail packaging, corporate events, and branded gifting. Sturdy construction and refined finish ensure your presentation makes a lasting first impression. Fully customisable with logo or brand colours.",
    "priceKes": 150,
    "image": "/images/branding/catalog/bag-024.webp",
    "specs": [
      "320 GSM Heavy Natural Canvas",
      "Cross-Stitched Reinforced Webbing",
      "Water-Based Eco Screen Print"
    ],
    "turnaround": "4 - 6 Days"
  },
  {
    "id": "MUG-090",
    "sku": "MUG-090",
    "title": "Lumina Diamond Mug",
    "category": "Mugs & Travel Tumblers",
    "categorySlug": "drinkware",
    "description": "A distinctive diamond-faceted mug designed for presence and practicality. Ideal for desk use and corporate gifting programmes. Fully brandable.",
    "priceKes": 5570,
    "image": "/images/branding/catalog/mug-090.webp",
    "specs": [
      "Ceramic / Stainless Travel Form",
      "Sublimation / UV Rotary Print",
      "Dishwasher & Microwave Safe"
    ],
    "turnaround": "3 - 5 Days"
  },
  {
    "id": "BAG-033",
    "sku": "BAG-033",
    "title": "SisalCraft A3 Buttoned Jute Bag",
    "category": "Conference Bags & Totes",
    "categorySlug": "bags",
    "description": "An eco-friendly reusable bag crafted from natural materials. Ideal for corporate events, branded gifting, and sustainable retail packaging. Customisable with your logo for a lasting, responsible impression.",
    "priceKes": 1300,
    "image": "/images/branding/catalog/bag-033.webp",
    "specs": [
      "320 GSM Heavy Natural Canvas",
      "Cross-Stitched Reinforced Webbing",
      "Water-Based Eco Screen Print"
    ],
    "turnaround": "4 - 6 Days"
  },
  {
    "id": "PEN-237",
    "sku": "PEN-237",
    "title": "SlimTwist Precision Pen",
    "category": "Metal Pens & Writing",
    "categorySlug": "pens",
    "description": "A high-quality professional writing instrument engineered for smooth, reliable performance. Ideal for corporate branding, daily office use, and client gifting. Available for full customisation with your logo or brand colours.",
    "priceKes": 40,
    "image": "/images/branding/catalog/pen-237.webp",
    "specs": [
      "Solid Brass Barrel & Core",
      "Fiber Laser Mirror Annealing",
      "Schneider German 0.7mm Refill"
    ],
    "turnaround": "2 - 4 Days"
  },
  {
    "id": "BAG-097",
    "sku": "BAG-097",
    "title": "JutePrint A3 Landscape Bag",
    "category": "Conference Bags & Totes",
    "categorySlug": "bags",
    "description": "An eco-friendly reusable bag crafted from natural materials. Ideal for corporate events, branded gifting, and sustainable retail packaging. Customisable with your logo for a lasting, responsible impression.",
    "priceKes": 1300,
    "image": "/images/branding/catalog/bag-097.webp",
    "specs": [
      "320 GSM Heavy Natural Canvas",
      "Cross-Stitched Reinforced Webbing",
      "Water-Based Eco Screen Print"
    ],
    "turnaround": "4 - 6 Days"
  },
  {
    "id": "PEN-240",
    "sku": "PEN-240",
    "title": "Code 005 Professional Pen",
    "category": "Metal Pens & Writing",
    "categorySlug": "pens",
    "description": "A high-quality professional writing instrument engineered for smooth, reliable performance. Ideal for corporate branding, daily office use, and client gifting. Available for full customisation with your logo or brand colours.",
    "priceKes": 200,
    "image": "/images/branding/catalog/pen-240.webp",
    "specs": [
      "Solid Brass Barrel & Core",
      "Fiber Laser Mirror Annealing",
      "Schneider German 0.7mm Refill"
    ],
    "turnaround": "2 - 4 Days"
  },
  {
    "id": "MUG-283",
    "sku": "MUG-283",
    "title": "SummitKeep 1L Insulated Mug",
    "category": "Mugs & Travel Tumblers",
    "categorySlug": "drinkware",
    "description": "A robust 1-litre insulated mug engineered for all-day temperature retention. Durable and refined \u2014 ideal for office, travel, and outdoor use. Fully customisable.",
    "priceKes": 2100,
    "image": "/images/branding/catalog/mug-283.webp",
    "specs": [
      "Ceramic / Stainless Travel Form",
      "Sublimation / UV Rotary Print",
      "Dishwasher & Microwave Safe"
    ],
    "turnaround": "3 - 5 Days"
  },
  {
    "id": "BAG-284",
    "sku": "BAG-284",
    "title": "Alba A3 Laminated Carrier Bag",
    "category": "Conference Bags & Totes",
    "categorySlug": "bags",
    "description": "A premium laminated carrier bag designed to elevate retail packaging, corporate events, and branded gifting. Sturdy construction and refined finish ensure your presentation makes a lasting first impression. Fully customisable with logo or brand colours.",
    "priceKes": 240,
    "image": "/images/branding/catalog/bag-284.webp",
    "specs": [
      "320 GSM Heavy Natural Canvas",
      "Cross-Stitched Reinforced Webbing",
      "Water-Based Eco Screen Print"
    ],
    "turnaround": "4 - 6 Days"
  },
  {
    "id": "BAG-287",
    "sku": "BAG-287",
    "title": "Elegance Landscape Gift Bag",
    "category": "Conference Bags & Totes",
    "categorySlug": "bags",
    "description": "A premium laminated carrier bag designed to elevate retail packaging, corporate events, and branded gifting. Sturdy construction and refined finish ensure your presentation makes a lasting first impression. Fully customisable with logo or brand colours.",
    "priceKes": 600,
    "image": "/images/branding/catalog/bag-287.webp",
    "specs": [
      "320 GSM Heavy Natural Canvas",
      "Cross-Stitched Reinforced Webbing",
      "Water-Based Eco Screen Print"
    ],
    "turnaround": "4 - 6 Days"
  },
  {
    "id": "BAG-117",
    "sku": "BAG-117",
    "title": "Noir A3 Carrier Bag",
    "category": "Conference Bags & Totes",
    "categorySlug": "bags",
    "description": "A premium laminated carrier bag designed to elevate retail packaging, corporate events, and branded gifting. Sturdy construction and refined finish ensure your presentation makes a lasting first impression. Fully customisable with logo or brand colours.",
    "priceKes": 260,
    "image": "/images/branding/catalog/bag-117.webp",
    "specs": [
      "320 GSM Heavy Natural Canvas",
      "Cross-Stitched Reinforced Webbing",
      "Water-Based Eco Screen Print"
    ],
    "turnaround": "4 - 6 Days"
  },
  {
    "id": "MUG-196",
    "sku": "MUG-196",
    "title": "JavaForge Contemporary Mug",
    "category": "Mugs & Travel Tumblers",
    "categorySlug": "drinkware",
    "description": "A contemporary insulated mug designed for daily coffee and tea rituals. Comfortable handle and secure lid \u2014 perfect for desk use and corporate branding.",
    "priceKes": 1660,
    "image": "/images/branding/catalog/mug-196.webp",
    "specs": [
      "Ceramic / Stainless Travel Form",
      "Sublimation / UV Rotary Print",
      "Dishwasher & Microwave Safe"
    ],
    "turnaround": "3 - 5 Days"
  },
  {
    "id": "MUG-135",
    "sku": "MUG-135",
    "title": "Caf\u00e9Style Insulated Mug",
    "category": "Mugs & Travel Tumblers",
    "categorySlug": "drinkware",
    "description": "A caf\u00e9-inspired insulated mug designed for comfort and style. Ideal for desk use and branded corporate gifting programmes.",
    "priceKes": 1600,
    "image": "/images/branding/catalog/mug-135.webp",
    "specs": [
      "Ceramic / Stainless Travel Form",
      "Sublimation / UV Rotary Print",
      "Dishwasher & Microwave Safe"
    ],
    "turnaround": "3 - 5 Days"
  },
  {
    "id": "MUG-147",
    "sku": "MUG-147",
    "title": "CeramicForge Classic Mug",
    "category": "Mugs & Travel Tumblers",
    "categorySlug": "drinkware",
    "description": "A classic ceramic mug designed for everyday desk use. Clean lines and reliable performance \u2014 perfect for corporate branding and gifts.",
    "priceKes": 320,
    "image": "/images/branding/catalog/mug-147.webp",
    "specs": [
      "Ceramic / Stainless Travel Form",
      "Sublimation / UV Rotary Print",
      "Dishwasher & Microwave Safe"
    ],
    "turnaround": "3 - 5 Days"
  },
  {
    "id": "MUG-163",
    "sku": "MUG-163",
    "title": "JavaClassic Heritage Mug",
    "category": "Mugs & Travel Tumblers",
    "categorySlug": "drinkware",
    "description": "A classic insulated mug with timeless styling. Reliable temperature retention and comfortable handling \u2014 ideal for everyday office use and corporate gifts.",
    "priceKes": 1600,
    "image": "/images/branding/catalog/mug-163.webp",
    "specs": [
      "Ceramic / Stainless Travel Form",
      "Sublimation / UV Rotary Print",
      "Dishwasher & Microwave Safe"
    ],
    "turnaround": "3 - 5 Days"
  },
  {
    "id": "MUG-173",
    "sku": "MUG-173",
    "title": "EcoSip Sustainable Cup",
    "category": "Mugs & Travel Tumblers",
    "categorySlug": "drinkware",
    "description": "An eco-conscious reusable cup designed for daily hydration with reduced environmental impact. Ideal for organisations committed to sustainability and staff wellness programmes.",
    "priceKes": 900,
    "image": "/images/branding/catalog/mug-173.webp",
    "specs": [
      "Ceramic / Stainless Travel Form",
      "Sublimation / UV Rotary Print",
      "Dishwasher & Microwave Safe"
    ],
    "turnaround": "3 - 5 Days"
  },
  {
    "id": "MUG-018",
    "sku": "MUG-018",
    "title": "ChromaMagic Colour-Change Mug",
    "category": "Mugs & Travel Tumblers",
    "categorySlug": "drinkware",
    "description": "A heat-activated colour-change mug that reveals designs when filled with hot liquid. Engaging, memorable, and fully customisable \u2014 perfect for corporate promotions and gifts.",
    "priceKes": 420,
    "image": "/images/branding/catalog/mug-018.webp",
    "specs": [
      "Ceramic / Stainless Travel Form",
      "Sublimation / UV Rotary Print",
      "Dishwasher & Microwave Safe"
    ],
    "turnaround": "3 - 5 Days"
  },
  {
    "id": "POL-EXEC-01",
    "sku": "POL-EXEC-01",
    "title": "Executive Pique Polo \u00b7 Navy Heather",
    "category": "Apparel & Uniforms",
    "categorySlug": "apparel",
    "description": "Commercial-grade branded apparel manufactured for heavy daily wear, commercial laundering, and high-density embroidery.",
    "priceKes": 1450,
    "image": "/images/branding/catalog/apparel-01.webp",
    "specs": [
      "240 GSM Combed Cotton Pique",
      "Tajima 12-Needle High-Density Embroidery",
      "Double-Stitched Reinforced Seams"
    ],
    "turnaround": "3 - 5 Days"
  },
  {
    "id": "POL-CHAR-02",
    "sku": "POL-CHAR-02",
    "title": "Heavyweight Corporate Staff Polo \u00b7 Charcoal",
    "category": "Apparel & Uniforms",
    "categorySlug": "apparel",
    "description": "Commercial-grade branded apparel manufactured for heavy daily wear, commercial laundering, and high-density embroidery.",
    "priceKes": 1350,
    "image": "/images/branding/catalog/apparel-02.webp",
    "specs": [
      "65/35 Cotton-Poly Anti-Pilling Blend",
      "Tajima 12-Needle High-Density Embroidery",
      "Double-Stitched Reinforced Seams"
    ],
    "turnaround": "3 - 5 Days"
  },
  {
    "id": "POL-WHT-03",
    "sku": "POL-WHT-03",
    "title": "Classic White Boardroom Polo Shirt",
    "category": "Apparel & Uniforms",
    "categorySlug": "apparel",
    "description": "Commercial-grade branded apparel manufactured for heavy daily wear, commercial laundering, and high-density embroidery.",
    "priceKes": 1400,
    "image": "/images/branding/catalog/apparel-03.webp",
    "specs": [
      "Double-Knit Ribbed Collar & Cuffs",
      "Tajima 12-Needle High-Density Embroidery",
      "Double-Stitched Reinforced Seams"
    ],
    "turnaround": "3 - 5 Days"
  },
  {
    "id": "TEE-HVY-04",
    "sku": "TEE-HVY-04",
    "title": "Heavyweight Ring-Spun Cotton Crewneck",
    "category": "Apparel & Uniforms",
    "categorySlug": "apparel",
    "description": "Commercial-grade branded apparel manufactured for heavy daily wear, commercial laundering, and high-density embroidery.",
    "priceKes": 850,
    "image": "/images/branding/catalog/apparel-04.webp",
    "specs": [
      "190 GSM Pre-Shrunk Jersey Cotton",
      "Tajima 12-Needle High-Density Embroidery",
      "Double-Stitched Reinforced Seams"
    ],
    "turnaround": "3 - 5 Days"
  },
  {
    "id": "TEE-PRM-05",
    "sku": "TEE-PRM-05",
    "title": "Premium Event Promotional T-Shirt",
    "category": "Apparel & Uniforms",
    "categorySlug": "apparel",
    "description": "Commercial-grade branded apparel manufactured for heavy daily wear, commercial laundering, and high-density embroidery.",
    "priceKes": 750,
    "image": "/images/branding/catalog/apparel-05.webp",
    "specs": [
      "180 GSM Ring-Spun Combed Cotton",
      "Tajima 12-Needle High-Density Embroidery",
      "Double-Stitched Reinforced Seams"
    ],
    "turnaround": "3 - 5 Days"
  },
  {
    "id": "OVR-IND-06",
    "sku": "OVR-IND-06",
    "title": "Industrial Heavy Twill Field Overall",
    "category": "Apparel & Uniforms",
    "categorySlug": "apparel",
    "description": "Commercial-grade branded apparel manufactured for heavy daily wear, commercial laundering, and high-density embroidery.",
    "priceKes": 2850,
    "image": "/images/branding/catalog/apparel-06.webp",
    "specs": [
      "300 GSM Heavy Cotton Drill & Sanforized",
      "Tajima 12-Needle High-Density Embroidery",
      "Double-Stitched Reinforced Seams"
    ],
    "turnaround": "3 - 5 Days"
  },
  {
    "id": "VST-HVI-07",
    "sku": "VST-HVI-07",
    "title": "High-Visibility Reflective Field Vest",
    "category": "Apparel & Uniforms",
    "categorySlug": "apparel",
    "description": "Commercial-grade branded apparel manufactured for heavy daily wear, commercial laundering, and high-density embroidery.",
    "priceKes": 650,
    "image": "/images/branding/catalog/apparel-07.webp",
    "specs": [
      "EN ISO 20471 Certified Class 2 Band",
      "Tajima 12-Needle High-Density Embroidery",
      "Double-Stitched Reinforced Seams"
    ],
    "turnaround": "3 - 5 Days"
  },
  {
    "id": "JKT-SFT-08",
    "sku": "JKT-SFT-08",
    "title": "Executive Fleece-Lined Softshell Jacket",
    "category": "Apparel & Uniforms",
    "categorySlug": "apparel",
    "description": "Commercial-grade branded apparel manufactured for heavy daily wear, commercial laundering, and high-density embroidery.",
    "priceKes": 3600,
    "image": "/images/branding/catalog/apparel-08.webp",
    "specs": [
      "Water-Resistant Windproof Breathable",
      "Tajima 12-Needle High-Density Embroidery",
      "Double-Stitched Reinforced Seams"
    ],
    "turnaround": "3 - 5 Days"
  }
];
