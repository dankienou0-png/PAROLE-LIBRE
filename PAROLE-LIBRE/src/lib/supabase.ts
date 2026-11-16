import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export function getSupabase() {
  if (!url || !key) throw new Error("Supabase n'est pas configuré. Renseignez les variables .env.local.");
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}
