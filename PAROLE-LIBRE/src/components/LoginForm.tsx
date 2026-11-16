"use client";

import { FormEvent, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(params.get("error") === "acces" ? "Ce compte n'a pas d'accès responsable actif." : "");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
      if (!url || !key) throw new Error("Configuration Supabase manquante.");
      const supabase = createBrowserClient(url, key);
      const { error: authError } = await supabase.auth.signInWithPassword({ email: email.trim().toLowerCase(), password });
      if (authError) throw new Error("Adresse e-mail ou mot de passe incorrect.");
      router.replace("/espace");
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Connexion impossible.");
    } finally {
      setLoading(false);
    }
  }

  return <form className="message-form" onSubmit={submit}>
    <label htmlFor="staff-email">Adresse e-mail</label>
    <input className="text-input" id="staff-email" type="email" autoComplete="username" required value={email} onChange={e => setEmail(e.target.value)} placeholder="nom@exemple.com" />
    <label htmlFor="staff-password">Mot de passe</label>
    <input className="text-input" id="staff-password" type="password" autoComplete="current-password" required value={password} onChange={e => setPassword(e.target.value)} placeholder="Ton mot de passe" />
    {error && <p className="error" role="alert">{error}</p>}
    <button className="submit-button" type="submit" disabled={loading}>{loading ? "Connexion…" : "Se connecter"}</button>
  </form>;
}
