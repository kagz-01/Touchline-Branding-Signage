-- Run this in your Supabase project (SQL editor) before going live.
-- Keeps public-site leads isolated from inventory-platform's operational tables,
-- but structured so an admin can turn a lead into a sourcing task with one
-- click from /admin/leads (see app/api/admin/leads/[id]/convert).

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
  -- Set once an admin uses "Convert to Task" in /admin/leads -- the id of the
  -- SourcingTask this became on the inventory-platform side.
  converted_task_id text,
  converted_at timestamptz
);

-- Safe to re-run: adds the two columns above to a leads table created before
-- the admin dashboard / task hand-off existed.
alter table public.leads add column if not exists converted_task_id text;
alter table public.leads add column if not exists converted_at timestamptz;

alter table public.leads enable row level security;

-- Public (anon) can INSERT only -- never read other people's leads back.
create policy "Public can submit leads"
  on public.leads for insert
  to anon
  with check (true);

-- Reads/updates go through the service role key (used by /admin), not the
-- anon key, so no SELECT/UPDATE policy is granted to anon here on purpose.
