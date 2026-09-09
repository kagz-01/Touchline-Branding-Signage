# Touchline — Branding & Signage Platform

> Documentation for project review and handover.
> Last updated: September 2026

---

## Executive Summary

Touchline is a **single Next.js codebase** that serves three experiences, split by subdomain:

| Domain | Experience |
|--------|-----------|
| `touchline.co.ke` | **Hub** — The front door. Introduces Touchline as one company with two specialisms. |
| `branding.touchline.co.ke` | **Branding** — Merchandise, apparel, promotional products, tender-scale sourcing. |
| `signage.touchline.co.ke` | **Signage** — Signage design, fabrication, LED installations, vehicle wraps. |

One codebase. Three experiences. One admin dashboard. One leads database.

---

## Platform Architecture

```
touchline.co.ke (Hub)
├── branding.touchline.co.ke (Branding specialism)
├── signage.touchline.co.ke (Signage specialism)
└── /admin (Internal leads dashboard)
```

**How it works:** The middleware reads the hostname on every request and resolves it to a brand. The rest of the app renders shared components (Header, Footer, Hero, Services, Portfolio...) themed against that brand's config. No separate projects — one deployment, three experiences.

---

## The Hub (touchline.co.ke)

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

## Branding Specialism (branding.touchline.co.ke)

The branding vertical handles **merchandise, apparel, and promotional products**.

### What Touchline Branding Offers

| Category | Services |
|----------|----------|
| **Apparel & Textiles** | Screen Printing, Embroidery, DTF, DTG, Sublimation, HTV, Puff Print |
| **Hard Goods & Accessories** | UV Printing, Laser Engraving, Pad Printing, Debossing, Hot Stamping |
| **Labels & Patches** | Embroidered Patches, Sublimated Patches, Woven Labels, Printed Labels |
| **Tender-Scale Sourcing** | County/Government Tenders, Corporate Bulk Orders, NGO Programmes |

### Branding Pages

- **Home** — Hero, trust strip, services grid, portfolio gallery, testimonials, CTA
- **Services** — Full service catalogue with descriptions and "best for" recommendations
- **Portfolio** — Past projects with images, volumes, deadlines, and materials used
- **Book** — Quote request form (leads go to Supabase + admin dashboard)

---

## Signage Specialism (signage.touchline.co.ke)

The signage vertical handles **signage design, fabrication, and installation**.

### What Touchline Signage Offers

| Category | Services |
|----------|----------|
| **Illuminated Signs** | Channel Letters (3D), LED Neon Flex, Traditional Neon, Backlit/Halo Signs |
| **Lightbox & Cabinet** | Front-Lit, Backlit, Ultra-Thin, Blade Sign, Push-Through Acrylic |
| **Dimensional & Non-Illuminated** | Dimensional Letters, Acrylic Lettering, Foam Board Letters |
| **Vinyl & Graphics** | Vehicle Wraps, Window Graphics, Wall Murals, Floor Graphics, Banners |
| **Monument & Wayfinding** | Monument Signs, Pylon Signs, Wayfinding Systems, Directory Signs |
| **Fascia & Shopfront** | Illuminated Fascia, Non-Illuminated Fascia, Awning/Canopy Signs |

### Signage Pages

- **Home** — Hero, trust strip, services grid, portfolio gallery, testimonials, CTA
- **Services** — Full service catalogue organized by sign type
- **Portfolio** — Past projects with images, volumes, deadlines, and materials
- **Book** — Quote/site-visit request form

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
│   ├── Hero.tsx            # Brand-specific hero
│   ├── HowItWorks.tsx      # 3-step process (reusable)
│   ├── BookingForm.tsx     # Quote request form
│   ├── Header.tsx          # Brand-aware navigation
│   ├── Footer.tsx          # Brand-aware footer
│   └── ...                 # 20+ more components
├── config/
│   └── brands.ts           # Brand configs (content, services, portfolio)
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
- [x] Branding specialism: Home, Services, Portfolio, Book pages
- [x] Signage specialism: Home, Services, Portfolio, Book pages
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
   - `touchline.co.ke`
   - `branding.touchline.co.ke`
   - `signage.touchline.co.ke`
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
