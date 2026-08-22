import { createClient } from '@supabase/supabase-js';

/**
 * Server-side Supabase client using the service role key, for the leads API route.
 * Only instantiated when env vars are present so the app still builds/runs
 * (returning a clear error from the API instead) before you've wired Supabase up.
 */
export function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) return null;

  return createClient(url, key, {
    auth: { persistSession: false }
  });
}
