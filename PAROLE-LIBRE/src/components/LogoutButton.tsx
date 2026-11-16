"use client";

import { createBrowserClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  async function logout() {
    setLoading(true);
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
    if (url && key) {
      const supabase = createBrowserClient(url, key);
      await supabase.auth.signOut();
    }
    router.replace("/connexion");
    router.refresh();
  }
  return <button className="nav-link" onClick={logout} disabled={loading} style={{ border: 0, background: "transparent", cursor: "pointer" }}>{loading ? "Déconnexion…" : "Se déconnecter"}</button>;
}
