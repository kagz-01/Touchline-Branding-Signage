# Touchline — Branding & Signage Platform

> Documentation for project review and handover.
> Last updated: September 2026

---

## Executive Summary

Touchline is a **single Next.js codebase** that serves three experiences, split by subdomain:

| Domain | Experience |
|--------|-----------|
| `touchline.ac.ke` | **Hub** — The front door. Introduces Touchline as one company with two specialisms. |
| `branding.touchline.ac.ke` | **Branding** — Merchandise, apparel, promotional products, tender-scale sourcing. |
| `signage.touchline.ac.ke` | **Signage** — Signage design, fabrication, LED installations, vehicle wraps. |

One codebase. Three experiences. One admin dashboard. One leads database.

---

## Platform Architecture

```
touchline.ac.ke (Hub)
├── branding.touchline.ac.ke (Branding specialism)
├── signage.touchline.ac.ke (Signage specialism)
└── /admin (Internal leads dashboard)
```

**How it works:** The middleware reads the hostname on every request and resolves it to a brand. The rest of the app renders shared components (Header, Footer, Hero, Services, Portfolio...) themed against that brand's config. No separate projects — one deployment, three experiences.

---

## The Hub (touchline.ac.ke)

The hub is the **front door** of the platform. It establishes Touchline as one company before introducing the two specialisms.

### Hub Flow

```
1. HERO — "Your Brand, Built Visible."
   ↓ Establishes ONE company identity

2. PROBLEM — "Most brands have a logo. Few have a presence."
   ↓ Creates tension (the shared pain point)

3. WHAT WE OFFER — "Two ways we bring your brand to life"
   ↓ Introduces Branding + Signage as complementary solutions

4. HOW IT WORKS — "Brief → We Handle It → Delivered"
   ↓ Shows the unified process (one company, one process)

5. PROOF — Stats + Testimonials
   ↓ Builds confidence with numbers and client quotes

6. CTA — "Ready to make your brand physical?"
   ↓ Converts visitors into leads
```

### Hub Features

- **Animated counters** — 500+ projects, 98% on-time, 10K+ items
- **Brand cards** — Complementary, not competing (each has accent color + service examples)
- **3-step process** — Visual timeline showing how easy it is to work with Touchline
- **Testimonials** — Mixed from both brands (social proof)
- **Dark mode** — Full dark mode support with per-brand color schemes
- **Mobile-first** — Responsive design with bottom navigation on mobile
- **PWA installable** — Can be "Added to Home Screen" like a native app

---

## Branding Specialism (branding.touchline.ac.ke)

The branding vertical handles **merchandise, apparel, and promotional products**.

### What Touchline Branding Offers

| Category | Services |
|----------|----------|
| **Apparel & Textiles** | Screen Printing, Embroidery, DTF, DTG, Sublimation, HTV, Puff Print |
| **Hard Goods & Accessories** | UV Printing, Laser Engraving, Pad Printing, Debossing, Hot Stamping |
| **Labels & Patches** | Embroidered Patches, Sublimated Patches, Woven Labels, Printed Labels |
| **Tender-Scale Sourcing** | County/Government Tenders, Corporate Bulk Orders, NGO Programmes |

### Branding Pages

- **Home** — 13-section storytelling flow: Hero → Problem → What We Do → How It Works → Service Comparison → Proof → Sustainability → Hot Products → Global Trends → Zone Detector → **ROI Calculator** → **Tender Compliance** → CTA
- **Services** — Full service catalogue with zone-aware recommendations, printing methods comparison, industry guides
- **Portfolio** — Past projects with images, volumes, deadlines, and materials used
- **Book** — 3-step quote request form with spam protection

### Branding Unique Features

- **Service Comparison Tool** — Interactive comparison of printing methods (Screen Print vs Embroidery vs DTF vs Sublimation) with best-for, durability, cost, turnaround, and min quantity
- **ROI Calculator** — Cost-per-impression calculator for 8 product types (T-shirt, Pen, Mug, Tote Bag, Water Bottle, Cap, Notebook, Power Bank). Shows branded merch costs up to 90% less per impression than Facebook/Google/Billboard ads
- **Tender Compliance Checker** — 16-item checklist for county/government tenders across 4 categories (Documentation, Product Requirements, Delivery & Pricing, Compliance). Tracks required vs optional items with compliance score
- **Sustainability Section** — Eco-friendly product messaging (organic cotton, recycled polyester, water-based inks)
- **WhatsApp Click-to-Chat** — Floating WhatsApp button on all pages
- **Branding-Specific How It Works** — 4-step process: Raw Materials → Digitization → Branding → Quality & Delivery
- **Zone-Aware Branding** — Location-based climate zone detection with material and branding method recommendations

---

## Signage Specialism (signage.touchline.ac.ke)

The signage vertical handles **signage design, fabrication, and installation**.

### What Touchline Signage Offers

| Category | Services |
|----------|----------|
| **Illuminated Signs** | Channel Letters (3D), LED Neon Flex, Traditional Neon, Backlit/Halo Signs, Edge-Lit Panels |
| **Lightbox & Cabinet** | Front-Lit, Backlit, Ultra-Thin, Blade Sign, Push-Through Acrylic |
| **Dimensional & Non-Illuminated** | Dimensional Letters, Acrylic Lettering, Foam Board Letters |
| **Vinyl & Graphics** | Vehicle Wraps, Window Graphics, Wall Murals, Floor Graphics, Banners |
| **Monument & Wayfinding** | Monument Signs, Pylon Signs, Wayfinding Systems, Directory Signs |
| **Fascia & Shopfront** | Illuminated Fascia, Non-Illuminated Fascia, Awning/Canopy Signs |
| **Safety & Compliance** | OSHA 2007 compliant signs, ISO 7010 safety pictograms, Bilingual English/Kiswahili |

### Signage Pages

- **Home** — 13-section storytelling flow: Hero → Problem → What We Do → How It Works → Vehicle Branding → Proof → Safety Compliance → Hot Products → Global Trends → Zone Detector → **Viewing Calculator** → **Illumination Guide** → CTA
- **Services** — Full service catalogue with zone-aware recommendations, signage types comparison, industry guides, OSHA compliance section
- **Portfolio** — Past projects with images, volumes, deadlines, and materials
- **Book** — Quote/site-visit request form

### Signage Unique Features

- **Vehicle Branding Tool** — Interactive comparison of vehicle wrap options (Saloon/SUV/Lorry/Bus) with pricing, daily impressions, lifespan, and best-for recommendations
- **Sign Size Calculator** — Letter height calculator based on viewing distance (5 scenarios: Pedestrian 10m, Parking 30m, Roadside 50m, Highway 100m). Includes 5 sign type multipliers, illumination toggle, estimated price, and quick reference table
- **Illumination Guide** — LED type selector based on business hours (Daytime, Evening, Late Night, 24/7). Compares 6 illumination types (Front-Lit, Halo, LED Neon, Edge-Lit, Lightbox, None) with night visibility scores, energy cost, and lifespan
- **OSHA 2007 Compliance Section** — Safety signage requirements, ISO 7010 standards, bilingual English/Kiswahili, photoluminescent options
- **Signage Types Comparison** — Compare 18 signage types with specs, pricing, materials, lifespan, and installation time
- **Zone-Aware Signage** — Location-based climate zone detection with material and signage type recommendations
- **Hot Products in Kenya 2026** — Top 10 signage products ranked by demand with pricing
- **Global Trends 2026** — Smart Digital Signage, Sustainable Materials, Halo-Lit Premium, Interactive Wayfinding, Vehicle Wraps, 3D Printing
- **Industry Guides** — Tailored signage recommendations for retail, hospitality, healthcare, corporate, industrial, and government sectors
- **Signage-Specific How It Works** — 4-step process: Site Survey → Design & Engineering → Fabrication → Installation

---

## Booking & Lead Management

### For Visitors

1. Click "Get a Quote" on any page
2. Fill in: name, phone, email, service needed, preferred date, location, message
3. Submit → lead stored in Supabase
4. Admin gets notified

### For Admins (/admin)

1. **Sign in** — Google OAuth (email must be in the ADMIN_EMAILS allowlist)
2. **View leads** — All submissions from both brands, filterable by brand and status
3. **Update status** — Mark leads as: New → Contacted → Converted → Closed
4. **Convert to Task** — One click sends the lead to the inventory-platform as a SourcingTask

### Spam Protection

- **Honeypot field** — Bots fill it, humans don't see it
- **Minimum fill time** — Submissions faster than 3 seconds are rejected
- **Per-IP rate limit** — Prevents flooding

---

## Admin Dashboard (/admin)

A lightweight internal tool for reviewing what the public site collects.

| Feature | Description |
|---------|-------------|
| **Google Sign-In** | Same OAuth as other Touchline apps |
| **Email Allowlist** | Only approved emails can access (set via ADMIN_EMAILS env var) |
| **Leads List** | Every submission across both brands, filterable |
| **Status Management** | Inline dropdown to change lead status |
| **Convert to Task** | Sends lead to inventory-platform as a SourcingTask |
| **Route Protection** | Middleware checks session JWT on all /admin/* routes |

---

## Sourcing-Platform Integration

The "Convert to Task" button connects this platform to your inventory-platform deployment.

**How it works:**
1. Admin clicks "Convert to Task" on a lead
2. This app sends a POST request to inventory-platform's `/api/integrations/leads`
3. A SourcingTask is created with the enquiry details as a task comment
4. The lead is marked as "converted" with the task ID

**Setup required:**
- `INTEGRATION_API_KEY` — Shared secret (generate with `openssl rand -base64 32`)
- `INVENTORY_PLATFORM_URL` — URL of the inventory-platform deployment
- `INTEGRATION_ORG_ID` — Your organization's ID

---

## Technical Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 14 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS |
| **Database** | Supabase (PostgreSQL) |
| **Auth** | NextAuth.js (Google OAuth) |
| **Email** | NodeMailer |
| **Deployment** | Vercel |
| **Domain** | Three subdomains → one Vercel project |

### Project Structure

```
touchline-platform/
├── app/                    # Pages and routes
│   ├── branding/           # Branding specialism pages
│   ├── signage/            # Signage specialism pages
│   ├── admin/              # Admin dashboard
│   ├── api/                # API routes (leads, auth, admin)
│   ├── layout.tsx          # Root layout (fonts, metadata, theme)
│   ├── page.tsx            # Hub home page
│   └── globals.css         # Brand theme tokens + utilities
├── components/             # Reusable UI components
│   ├── HubHome.tsx         # Hub landing page
│   ├── BrandingHome.tsx    # Branding specialism home page
│   ├── SignageHome.tsx     # Signage specialism home page
│   ├── SignageContent.tsx  # Signage services page content
│   ├── SignageZoneDetector.tsx # Location-based signage recommendations
│   ├── Hero.tsx            # Brand-specific hero
│   ├── HowItWorks.tsx      # 3-step process (reusable)
│   ├── BookingForm.tsx     # Quote request form
│   ├── WhatsAppButton.tsx  # Floating WhatsApp click-to-chat
│   ├── Header.tsx          # Brand-aware navigation
│   ├── Footer.tsx          # Brand-aware footer
│   └── ...                 # 20+ more components
├── config/
│   ├── brands.ts           # Brand configs (content, services, portfolio)
│   ├── branding-knowledge.ts # Branding industry knowledge base (686 lines)
│   └── signage-knowledge.ts  # Signage industry knowledge base (814 lines)
├── db/
│   ├── leads.sql           # Leads table schema
│   └── schema.sql          # Full database schema
├── lib/
│   ├── brand.ts            # Brand resolution logic
│   ├── supabase.ts         # Supabase client
│   └── auth.ts             # NextAuth config
├── middleware.ts            # Brand resolution + admin protection
└── public/
    ├── icons/              # PWA icons (per-brand)
    └── Logos/              # Brand logos
```

---

## Environment Variables

| Variable | Purpose | Required |
|----------|---------|----------|
| `NEXTAUTH_SECRET` | Session encryption key | Yes |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID | For /admin |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret | For /admin |
| `ADMIN_EMAILS` | Comma-separated allowed admin emails | For /admin |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | For leads |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | For leads |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key | For leads |
| `INVENTORY_PLATFORM_URL` | Inventory platform URL | For task hand-off |
| `INTEGRATION_API_KEY` | Shared secret for task hand-off | For task hand-off |

---

## What's Built

- [x] Hub landing page with storytelling flow
- [x] Branding specialism: Home (13 sections), Services (zone-aware), Portfolio, Book pages
- [x] Signage specialism: Home (13 sections), Services (zone-aware), Portfolio, Book pages
- [x] Brand-aware Header, Footer, Mobile Bottom Nav
- [x] Quote/booking form with spam protection
- [x] Admin dashboard with Google sign-in
- [x] Leads list with status management
- [x] "Convert to Task" integration with inventory-platform
- [x] Dynamic per-brand PWA manifest
- [x] Per-brand favicon and icons
- [x] Dark mode (per-brand color schemes)
- [x] SEO: per-brand metadata, Open Graph, Twitter cards, JSON-LD
- [x] Sitemap and robots.txt
- [x] Cross-sell banner between brands
- [x] Security headers (HSTS, X-Frame-Options, etc.)
- [x] Knowledge bases: Branding (686 lines), Signage (814 lines)
- [x] Zone-aware recommendations for both specialisms
- [x] Industry-specific guides for both specialisms
- [x] Vehicle branding comparison tool (Signage)
- [x] OSHA 2007 compliance section (Signage)
- [x] Hot products in Kenya 2026 for both specialisms
- [x] Global trends 2026 for both specialisms
- [x] **Branding ROI Calculator** — Cost-per-impression for 8 product types vs digital ads
- [x] **Tender Compliance Checker** — 16-item checklist for county/government tenders
- [x] **Sign Size Calculator** — Letter height by viewing distance (5 scenarios, 5 sign types)
- [x] **Illumination Guide** — LED type by business hours (6 types, night visibility scores)

## What's Planned

- [ ] Instant Quote Engine — get a price in 60 seconds
- [ ] Project Visualizer — see your branding/signage before it's made
- [ ] Live Production Tracker — "where's my order?" like Uber
- [ ] Tender Portal — upload tender docs, get compliant quotes
- [ ] Comparison Tool — "which service is right for me?"
- [ ] Brand Asset Manager — upload logo once, use forever
- [ ] Content/Blog — guides, case studies, SEO authority
- [ ] WhatsApp notification on new lead
- [ ] SMS notification on new lead
- [ ] Real project photography (replace placeholders)
- [ ] Video testimonials

---

## Deployment

### Vercel Setup

1. Push repo to GitHub
2. Import into Vercel as one project
3. Add three domains in Vercel Settings → Domains:
   - `touchline.ac.ke`
   - `branding.touchline.ac.ke`
   - `signage.touchline.ac.ke`
4. Point DNS to Vercel (A/CNAME records)
5. Add environment variables in Vercel Settings → Environment Variables

### Supabase Setup

1. Create a Supabase project
2. Run `db/leads.sql` in the SQL Editor
3. Add Supabase keys to environment variables

### Google OAuth Setup

1. Create credentials at console.cloud.google.com
2. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
3. Add CLIENT_ID and CLIENT_SECRET to environment variables
4. Add allowed emails to ADMIN_EMAILS

---

## Contact & Support

For questions about this platform, contact the development team.

---

*This document is updated as the platform evolves.*
