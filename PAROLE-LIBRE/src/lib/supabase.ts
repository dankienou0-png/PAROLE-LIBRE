import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
// SUPABASE_SECRET_KEY (sb_secret_...) est recommandé.
// Le nom historique reste accepté pour les déploiements existants.
const secretKey = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

/**
 * Client privilégié réservé aux routes serveur.
 * Ne jamais préfixer la clé secrète par NEXT_PUBLIC_.
 */
export function getSupabase() {
  if (typeof window !== "undefined") {
    throw new Error("Le client privilégié Supabase est réservé au serveur.");
  }
  if (!url || !secretKey) {
    throw new Error("Configuration Supabase incomplète : renseignez NEXT_PUBLIC_SUPABASE_URL et SUPABASE_SECRET_KEY.");
  }
  return createClient(url, secretKey, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false }
  });
}
