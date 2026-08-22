-- Portfolio / media table for Branding and Signage website assets.
-- Use this in Supabase SQL editor to store optimized media metadata that the app can
-- fetch server-side and render into the portfolio/gallery sections.

create table if not exists public.portfolio_media (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  brand text not null check (brand in ('branding', 'signage')),
  title text not null,
  category text,
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

create policy "Admins can manage portfolio media"
  on public.portfolio_media for all
  to authenticated
  using (true)
  with check (true);

-- Optional: if you prefer to store image variants in a storage bucket instead of URLs,
-- create a public bucket named "portfolio-media" and keep the URL fields here.
