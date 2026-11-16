import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

/**
 * Client privilégié réservé aux routes serveur.
 * Ne jamais préfixer SUPABASE_SERVICE_ROLE_KEY par NEXT_PUBLIC_.
 */
export function getSupabase() {
  if (typeof window !== "undefined") {
    throw new Error("Le client privilégié Supabase est réservé au serveur.");
  }
  if (!url || !serviceRoleKey) {
    throw new Error("Configuration Supabase incomplète : renseignez NEXT_PUBLIC_SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY.");
  }
  return createClient(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false }
  });
}
