-- Full Touchline database schema for Supabase.
-- Run this in the Supabase SQL editor before going live.
-- It includes both the public lead capture tables and the portfolio/media tables
-- used by the Branding and Signage pages.

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------------
-- Leads: public quote/site-visit submissions from the Branding and Signage sites.
-- ---------------------------------------------------------------------------
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  brand text not null check (brand in ('branding', 'signage')),
  full_name text not null,
  phone text not null,
  email text,
  service text,
  preferred_date date,
  location text,
  message text,
  status text not null default 'new' check (status in ('new', 'contacted', 'converted', 'closed')),
  converted_task_id text,
  converted_at timestamptz
);

alter table public.leads add column if not exists converted_task_id text;
alter table public.leads add column if not exists converted_at timestamptz;

alter table public.leads enable row level security;

create policy "Public can submit leads"
  on public.leads for insert
  to anon
  with check (true);

create index if not exists idx_leads_brand_created_at
  on public.leads (brand, created_at desc);

create index if not exists idx_leads_status_created_at
  on public.leads (status, created_at desc);

-- ---------------------------------------------------------------------------
-- Portfolio media: brand project photos and media metadata used on the public
-- portfolio pages. This supports local files, optimized webp variants, and video.
-- ---------------------------------------------------------------------------
create table if not exists public.portfolio_media (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  brand text not null check (brand in ('branding', 'signage')),
  title text not null,
  category text not null default 'Project work',
  blurb text,
  alt text,
  image_url text,
  image_webp_url text,
  image_webm_url text,
  is_featured boolean not null default false,
  sort_order integer not null default 0
);

alter table public.portfolio_media enable row level security;

create policy "Public can read portfolio media"
  on public.portfolio_media for select
  to anon
  using (true);

create policy "Authenticated users can manage portfolio media"
  on public.portfolio_media for all
  to authenticated
  using (true)
  with check (true);

create index if not exists idx_portfolio_media_brand_order
  on public.portfolio_media (brand, sort_order, created_at desc);

create index if not exists idx_portfolio_media_featured
  on public.portfolio_media (brand, is_featured, sort_order);

-- ---------------------------------------------------------------------------
-- Example insert rows (safe to comment out if you don't want demo seed data).
-- ---------------------------------------------------------------------------
-- insert into public.portfolio_media (
--   brand,
--   title,
--   category,
--   blurb,
--   alt,
--   image_webp_url,
--   image_url,
--   is_featured,
--   sort_order
-- ) values
-- (
--   'branding',
--   'County Government Branding Tender',
--   'Tender fulfilment',
--   '4,000 branded items across 6 product lines, sourced and delivered against a hard tender deadline.',
--   'County Government Branding Tender',
--   'https://your-supabase-project-url/storage/v1/object/public/portfolio-media/branding/branding-tender.webp',
--   'https://your-supabase-project-url/storage/v1/object/public/portfolio-media/branding/branding-tender.jpg',
--   true,
--   1
-- );
--
-- insert into public.portfolio_media (
--   brand,
--   title,
--   category,
--   blurb,
--   alt,
--   image_webp_url,
--   image_url,
--   is_featured,
--   sort_order
-- ) values
-- (
--   'signage',
--   'Retail Fascia Rollout',
--   'Multi-site',
--   'Illuminated fascia signage fabricated and installed across 9 branches in matching spec.',
--   'Retail Fascia Rollout',
--   'https://your-supabase-project-url/storage/v1/object/public/portfolio-media/signage/fascia-rollout.webp',
--   'https://your-supabase-project-url/storage/v1/object/public/portfolio-media/signage/fascia-rollout.jpg',
--   true,
--   1
-- );
