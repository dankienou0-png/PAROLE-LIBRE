"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
export default function TrackingForm() {
  const [code,setCode] = useState(""); const [error,setError] = useState(""); const router = useRouter();
  function submit(e: FormEvent) { e.preventDefault(); if (!code.trim()) return; router.push(`/conversation/${encodeURIComponent(code.trim().toUpperCase())}`); }
  return <form className="message-form" onSubmit={submit}><label htmlFor="code">Code privé de suivi</label><input id="code" className="text-input" value={code} onChange={e=>setCode(e.target.value)} placeholder="Ex. : CODE-PRIVE" autoComplete="off" required/>{error && <p className="error">{error}</p>}<button className="submit-button">Voir ma conversation</button></form>;
}
