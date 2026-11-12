import { createClient, type SupabaseClient } from '@supabase/supabase-js';

/**
 * The shop's Supabase client.
 *
 * Created lazily, inside a function. The build prerenders every route in Node,
 * where `window` and `localStorage` do not exist, so nothing here may run at
 * import time — `createClient` sets up auth storage the moment it is called.
 *
 * With no environment variables set this returns null and the shop renders in
 * preview mode: the catalogue still displays from the fallback list, and the
 * buttons explain themselves instead of throwing.
 */
let client: SupabaseClient | null = null;
let attempted = false;

export function getSupabase(): SupabaseClient | null {
  if (attempted) return client;
  attempted = true;

  if (typeof window === 'undefined') return null;

  const url = import.meta.env.VITE_SUPABASE_URL;
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
  if (!url || !key) return null;

  client = createClient(url, key, {
    auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
  });
  return client;
}

/** True once the keys are present. Drives the preview-mode copy. */
export function isShopLive(): boolean {
  return Boolean(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY);
}
