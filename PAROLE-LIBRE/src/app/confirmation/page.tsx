"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
function ConfirmationContent() {
  const params = useSearchParams(); const code = params.get("code") || "";
  return <main className="simple-page"><section className="simple-card success-card"><div className="success-mark">✓</div><span className="panel-kicker">MESSAGE TRANSMIS</span><h1>Merci d'avoir pris la parole.</h1><p>Ton message a été enregistré. Voici ton code privé pour retrouver les réponses.</p><div className="tracking-code">{code || "Code indisponible"}</div><button className="submit-button" onClick={()=>navigator.clipboard?.writeText(code)}>Copier le code</button><p className="warning-note">Conserve ce code dans un endroit sûr. Il ne pourra pas être récupéré si tu le perds. Toute personne qui le possède peut consulter cette conversation.</p><Link className="text-link" href="/suivi">J'ai déjà un code de suivi →</Link></section></main>;
}
export default function ConfirmationPage() { return <Suspense fallback={<p className="loading">Chargement…</p>}><ConfirmationContent/></Suspense>; }
