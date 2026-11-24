// eslint-disable-next-line @typescript-eslint/no-explicit-any
import { createClient, SupabaseClient } from '@supabase/supabase-js';

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let cachedAdminClient: SupabaseClient<any, any, any> | null = null;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let cachedPublicClient: SupabaseClient<any, any, any> | null = null;

/**
 * Server-side Supabase client using Service Role Key.
 * Bypasses RLS for admin queries, catalog seeding, and server-side fetching.
 * Uses singleton caching to prevent connection pool exhaustion.
 */
export function getSupabaseAdmin(): SupabaseClient<any, any, any> | null {
  if (cachedAdminClient) return cachedAdminClient;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY;

  if (!url || !key) return null;

  cachedAdminClient = createClient<any>(url, key, {
    auth: { persistSession: false },
  });

  return cachedAdminClient;
}

/**
 * Public client using Anon / Publishable key for client-side queries with RLS.
 */
export function getSupabasePublic(): SupabaseClient<any, any, any> | null {
  if (cachedPublicClient) return cachedPublicClient;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) return null;

  cachedPublicClient = createClient<any>(url, key, {
    auth: { persistSession: false },
  });

  return cachedPublicClient;
}
