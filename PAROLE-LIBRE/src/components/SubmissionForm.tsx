"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, LoaderCircle } from "lucide-react";

const categories = [
  ["reclamation", "Réclamation"], ["suggestion", "Suggestion"], ["harcelement", "Harcèlement"],
  ["enseignement", "Enseignement"], ["discipline", "Discipline"], ["infrastructure", "Infrastructure"], ["autre", "Autre"]
];

export default function SubmissionForm() {
  const [recipient, setRecipient] = useState("direction");
  const [category, setCategory] = useState("suggestion");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); setError("");
    if (message.trim().length < 10) { setError("Ton message doit contenir au moins 10 caractères."); return; }
    if (message.length > 5000) { setError("Le message est trop long (5 000 caractères maximum)."); return; }
    setSending(true);
    try {
      const response = await fetch("/api/messages", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ recipient, category, message: message.trim() }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Envoi impossible.");
      sessionStorage.setItem("parole-libre-code", data.trackingCode);
      router.push(`/confirmation?code=${encodeURIComponent(data.trackingCode)}`);
    } catch (err) { setError(err instanceof Error ? err.message : "Une erreur est survenue."); setSending(false); }
  }

  return <form onSubmit={submit} className="message-form">
    <label>À qui souhaites-tu écrire ?</label>
    <div className="recipient-grid">
      <button type="button" className={recipient === "direction" ? "recipient active" : "recipient"} onClick={() => setRecipient("direction")}><span className="recipient-symbol">D</span><span><b>Le Directeur</b><small>Direction de l'établissement</small></span></button>
      <button type="button" className={recipient === "delegue" ? "recipient active" : "recipient"} onClick={() => setRecipient("delegue")}><span className="recipient-symbol">DG</span><span><b>Le DG des élèves</b><small>Représentation des élèves</small></span></button>
    </div>
    <label htmlFor="category">Sujet du message</label>
    <select id="category" value={category} onChange={e => setCategory(e.target.value)}>{categories.map(([v,l]) => <option key={v} value={v}>{l}</option>)}</select>
    <label htmlFor="message">Ton message</label>
    <textarea id="message" value={message} onChange={e => setMessage(e.target.value)} placeholder="Explique la situation avec tes mots. Évite de citer des informations personnelles si ce n'est pas nécessaire." rows={5} maxLength={5000} required/>
    <div className="form-meta"><span>Ne partage pas de mot de passe ni d'information personnelle inutile.</span><span>{message.length}/5000</span></div>
    {error && <p className="error" role="alert">{error}</p>}
    <button className="submit-button" disabled={sending}>{sending ? <>Envoi en cours <LoaderCircle className="spin" size={17}/></> : <>Envoyer mon message <ArrowRight size={17}/></>}</button>
    <p className="fineprint">En envoyant, tu acceptes que ton message soit traité par le destinataire choisi. En cas de danger immédiat, adresse-toi directement à un adulte de confiance.</p>
  </form>;
}
