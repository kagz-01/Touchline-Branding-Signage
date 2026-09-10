-- =============================================================================
-- Touchline Branding & Signage — Master Database Schema
-- Run this in the Supabase SQL Editor before going live.
-- Safe to re-run (uses IF NOT EXISTS throughout).
-- =============================================================================

create extension if not exists pgcrypto;

-- ─────────────────────────────────────────────────────────────────────────────
-- 1. LEADS — public quote / site-visit submissions
-- ─────────────────────────────────────────────────────────────────────────────
create table if not exists public.leads (
  id               uuid primary key default gen_random_uuid(),
  created_at       timestamptz not null default now(),
  brand            text not null check (brand in ('branding', 'signage')),
  full_name        text not null,
  phone            text not null,
  email            text,
  service          text,
  preferred_date   date,
  location         text,
  message          text,
  status           text not null default 'new'
                   check (status in ('new', 'contacted', 'converted', 'closed')),
  converted_task_id text,
  converted_at     timestamptz
);

-- Safe to re-run on existing tables (adds columns that may not exist yet)
alter table public.leads add column if not exists converted_task_id text;
alter table public.leads add column if not exists converted_at timestamptz;

alter table public.leads enable row level security;

-- Public can INSERT leads (never read others' leads)
drop policy if exists "Public can submit leads" on public.leads;
create policy "Public can submit leads"
  on public.leads for insert
  to anon
  with check (true);

-- Admin reads/writes go through the service-role key, not anon — no SELECT/UPDATE policy for anon.

create index if not exists idx_leads_brand_created_at
  on public.leads (brand, created_at desc);

create index if not exists idx_leads_status_created_at
  on public.leads (status, created_at desc);

-- ─────────────────────────────────────────────────────────────────────────────
-- 2. PORTFOLIO MEDIA — project photos & media for public portfolio pages
-- ─────────────────────────────────────────────────────────────────────────────
create table if not exists public.portfolio_media (
  id               uuid primary key default gen_random_uuid(),
  created_at       timestamptz not null default now(),
  brand            text not null check (brand in ('branding', 'signage')),
  title            text not null,
  category         text not null default 'Project work',
  blurb            text,
  alt              text,
  image_url        text,
  image_webp_url   text,
  image_webm_url   text,
  is_featured      boolean not null default false,
  sort_order       integer not null default 0
);

alter table public.portfolio_media enable row level security;

-- Public can read portfolio media
drop policy if exists "Public can read portfolio media" on public.portfolio_media;
create policy "Public can read portfolio media"
  on public.portfolio_media for select
  to anon
  using (true);

-- Authenticated users (admin) can manage portfolio media
drop policy if exists "Authenticated users can manage portfolio media" on public.portfolio_media;
create policy "Authenticated users can manage portfolio media"
  on public.portfolio_media for all
  to authenticated
  using (true)
  with check (true);

create index if not exists idx_portfolio_media_brand_order
  on public.portfolio_media (brand, sort_order, created_at desc);

create index if not exists idx_portfolio_media_featured
  on public.portfolio_media (brand, is_featured, sort_order);

-- ─────────────────────────────────────────────────────────────────────────────
-- Done. Both tables are now ready for the website and admin dashboard.
-- ─────────────────────────────────────────────────────────────────────────────
