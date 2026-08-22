# Touchline \u2014 Branding & Signage Platform

One Next.js codebase serving three experiences, split by subdomain:

| Domain                        | Experience                                   |
|--------------------------------|-----------------------------------------------|
| `touchline.co.ke`             | Hub \u2014 two doors: Branding & Signage, plus a link to TouchGiftShop |
| `branding.touchline.co.ke`    | Touchline Branding \u2014 merch/apparel/promo sourcing |
| `signage.touchline.co.ke`     | Touchline Signage \u2014 signage design, fabrication & install |

No visitor-facing redirects happen \u2014 `middleware.ts` reads the hostname on
every request and resolves it to a brand, then the rest of the app renders
shared components (`Hero`, `ServicesGrid`, `PortfolioGallery`, `BookingForm`...)
themed against that brand's config in `config/brands.ts`. Add a third brand
the same way if you ever need one \u2014 new entry in `config/brands.ts`, new
color block in `app/globals.css`, new subdomain check in `lib/brand.ts`.

## What's built

- Home, Services, Portfolio and Book (quote / site-visit) pages for both brands
- Brand-aware header, footer, and mobile bottom nav (same PWA pattern as
  your other Touchline apps \u2014 installable via "Add to Home Screen")
- Cross-sell banner on every brand page linking to the other vertical
- Footer link out to TouchGiftShop on every page
- `/api/leads` \u2014 stores quote/site-visit requests in Supabase (`leads` table,
  schema in `db/leads.sql`), logs to console if Supabase isn't configured yet
  so you can demo the flow before wiring the database
- Spam protection on the booking form: an invisible honeypot field, a
  minimum-fill-time check, and a basic per-IP rate limit \u2014 all silent to
  real visitors (see `app/api/leads/route.ts` and `components/BookingForm.tsx`)
- Dynamic per-brand PWA manifest (`app/manifest.ts`) \u2014 correct name, theme
  color and icon set depending on which subdomain installed it
- Distinct visual identity per brand from day one (see "Design" below), not
  just a color swap \u2014 ready for your real logos to drop straight in
- **Admin leads dashboard** (`/admin`) \u2014 Google sign-in gated by an email
  allowlist, lists every submitted enquiry, lets you change its status
  (new/contacted/converted/closed), and has a **"Convert to Task"** button
  that creates a real task on your inventory-platform deployment via a
  server-to-server integration \u2014 closing the loop from public enquiry to
  internal fulfilment (see "Admin dashboard" and "Sourcing-platform hand-off"
  below)
- SEO/social: per-brand `<title>`/description, Open Graph + Twitter card
  metadata, a dynamically generated OG share image per brand
  (`app/opengraph-image.tsx`), `robots.ts`, a brand-aware `sitemap.ts`, and
  `LocalBusiness` JSON-LD structured data on each brand's homepage
- Placeholder PWA icons already generated in `public/icons/` (a simple
  brand-colored monogram) so installs/OG previews look intentional even
  before real logo files exist \u2014 see `scripts/generate-icons.js`

## Admin dashboard (`/admin`)

A lightweight internal tool for reviewing what the public site collects \u2014
deliberately simpler than inventory-platform's full org/invite system, since
it's just "can this Google account see enquiries," not a multi-tenant app:

- Sign-in is Google OAuth, same as your other Touchline apps, but access is
  a plain comma-separated email allowlist (`ADMIN_EMAILS`) checked at
  sign-in \u2014 no invite flow to run first. Add or remove an admin by editing
  one env var and redeploying.
- Route protection lives in `middleware.ts` (checks for a valid session JWT
  on any `/admin/*` or `/api/admin/*` request) \u2014 not just a client-side
  redirect, so a signed-out visitor can't see a flash of the leads list.
- `/admin/leads` lists every submission across both brands, filterable by
  brand and status, with an inline status dropdown per row.
- `robots.ts` disallows `/admin` from being indexed on every brand.

## Sourcing-platform hand-off

Clicking **"Convert to Task"** on a lead calls a new endpoint on your
inventory-platform deployment (`POST /api/integrations/leads`, added there
alongside this update) using a shared-secret header \u2014 not a user session,
since this is server-to-server. That endpoint:

- Creates a `SourcingTask` in your inventory-platform workspace, titled from
  the enquiry, with the full contact details preserved as a task comment
  so nothing is lost even though there's no separate "lead" concept over there
- Sets `brandingRequired` based on which brand the enquiry came from
  (Branding \u2192 true, Signage \u2192 false, since signage work is fabrication,
  not a branding pass on top of blank stock)
- Attaches every converted task to one placeholder catalogue material
  (`"Website Enquiry (unclassified)"`) rather than inventing a new Material
  per enquiry, which would otherwise pollute the real materials catalogue \u2014
  the admin re-points it at a real catalogue item once they've reviewed it

This is intentionally a **manual, admin-triggered** conversion rather than
automatic on every submission \u2014 that keeps spam or junk enquiries from ever
reaching the sourcing board as real tasks.

To wire this up:
1. In inventory-platform's `.env`, set `INTEGRATION_API_KEY` (generate with
   `openssl rand -base64 32`) and `INTEGRATION_ORG_ID` (your organization's id).
2. In this app's `.env.local`, set the same `INTEGRATION_API_KEY`, plus
   `INVENTORY_PLATFORM_URL` pointing at that deployment.
3. Redeploy both. The "Convert to Task" button will start working; before
   that it returns a clear "not configured yet" error instead of failing silently.



## Getting started locally

```bash
npm install
cp .env.example .env.local   # fill in Supabase keys when you have them
npm run dev
```

You won't have real subdomains on `localhost`, so force a brand with a query
param or env var:

- `http://localhost:3000/?brand=branding`
- `http://localhost:3000/?brand=signage`
- `http://localhost:3000/?brand=hub` (or just `/`)
- Or set `NEXT_PUBLIC_DEV_BRAND=branding` in `.env.local` to default to one
  brand for your whole dev session.

## Connecting your real logos

Placeholder wordmarks live in `components/Logo.tsx`. Since you already have
separate branding/signage logos, swap the two `branding` and `signage`
branches for `<img src="/logos/branding.svg" ... />` and
`/logos/signage.svg` \u2014 no other file needs to change.

## Deploying (Vercel + subdomains)

1. Push this repo, import it into Vercel as one project.
2. In Vercel \u2192 Settings \u2192 Domains, add all three:
   `touchline.co.ke`, `branding.touchline.co.ke`, `signage.touchline.co.ke`
   \u2014 all pointing at the same deployment. `middleware.ts` handles the split,
   no separate Vercel projects needed.
3. Point your DNS (A/CNAME per Vercel's instructions) for all three at Vercel.
4. Add the environment variables from `.env.example` in Vercel \u2192 Settings \u2192
   Environment Variables.

## Setting up leads storage

1. In Supabase, run `db/leads.sql` (SQL editor) to create the `leads` table
   with row-level security \u2014 the public can only insert, never read leads back.
2. Add `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` (and the anon
   key, for consistency with your other Touchline apps) to your environment.
3. Every submitted quote/site-visit request lands in `leads` with a `brand`
   column, ready for the boss/manager to review and, if you want to close the
   loop, insert a corresponding task in inventory-platform.

## Design

Each brand has its own token system in `app/globals.css` (`[data-brand='branding']`
/ `[data-brand='signage']`), grounded in its own world rather than a plain
color swap:

- **Branding** \u2014 ink-plum background, citrus accent, poster/screen-print feel.
  Signature: a small stack of rotated "stamped" product tags in the hero.
- **Signage** \u2014 graphite background, LED-cyan accent, fabrication/spec-sheet
  feel (monospace labels). Signature: a flickering LED-glow headline treatment.
- **Hub** \u2014 neutral dark background with both accent colors present, signalling
  "two doors, one company" before the visitor picks a side.

## Not yet wired up (intentionally left for you)

- Real logo files (`public/icons/README.md` lists exactly what's needed) \u2014
  placeholder monogram icons are already in place so nothing is broken/missing
  in the meantime, see `scripts/generate-icons.js`
- Real project photography in the portfolio gallery (currently placeholder tiles)
- Supabase project/keys (works without them \u2014 leads just log to console)
- Google OAuth credentials + `ADMIN_EMAILS` for the `/admin` dashboard (works
  without them \u2014 sign-in will just fail with a clear error until configured)
- `INTEGRATION_API_KEY` / `INVENTORY_PLATFORM_URL` for the "Convert to Task"
  hand-off to inventory-platform (returns a clear "not configured" error
  until set, rather than failing silently)
- SMS/WhatsApp notification on new lead (easy to add inside `app/api/leads/route.ts`
  once you pick a provider)
