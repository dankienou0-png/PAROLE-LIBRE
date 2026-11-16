"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
type Entry = { id:string; body:string; author_type:string; created_at:string };
export default function Conversation({code}:{code:string}) {
  const [items,setItems] = useState<Entry[]>([]); const [error,setError] = useState(""); const [loading,setLoading] = useState(true);
  useEffect(()=>{ fetch(`/api/conversations/${encodeURIComponent(code)}`).then(async r=>{const d=await r.json();if(!r.ok)throw new Error(d.error);setItems(d.messages);}).catch(e=>setError(e.message || "Erreur de chargement")).finally(()=>setLoading(false)); },[code]);
  return <section className="simple-card conversation-card"><Link href="/suivi" className="text-link">← Retour au suivi</Link><span className="panel-kicker">CONVERSATION PRIVÉE</span><h1>Mon échange</h1>{loading ? <p>Chargement…</p> : error ? <p className="error">{error}</p> : items.map(m=><article className={m.author_type==="student"?"bubble student":"bubble staff"} key={m.id}><small>{m.author_type==="student"?"Ton message":"Réponse du responsable"} · {new Date(m.created_at).toLocaleString("fr-FR")}</small><p>{m.body}</p></article>)}{!loading && !error && <p className="warning-note">Pour le moment, la consultation des réponses est disponible. Les réponses des responsables doivent être activées dans l'espace d'administration prévu à cet effet.</p>}</section>;
}
