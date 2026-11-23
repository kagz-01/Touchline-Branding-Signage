import { createClient } from '@supabase/supabase-js';

export type CatalogItemDB = {
  id: string;
  sku: string | null;
  division: 'branding' | 'signage' | 'awards';
  title: string;
  category: string;
  category_slug: string;
  description: string | null;
  badge: string | null;
  price_kes: number | null;
  image: string;
  specs: string[];
  applications: string | null;
  turnaround: string | null;
  sort_order: number;
  is_active: boolean;
};

export type CatalogCategoryDB = {
  slug: string;
  division: 'branding' | 'signage' | 'awards';
  label: string;
  sort_order: number;
};

/**
 * Server-side Supabase client using Service Role Key.
 * Bypasses RLS for admin queries, catalog seeding, and server-side fetching.
 */
export function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY;

  if (!url || !key) return null;

  return createClient(url, key, {
    auth: { persistSession: false },
  });
}

/**
 * Public client using Anon / Publishable key for client-side queries with RLS.
 */
export function getSupabasePublic() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) return null;

  return createClient(url, key, {
    auth: { persistSession: false },
  });
}
