"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Reply = {
  id: string;
  body: string;
  created_at: string;
  author_id: string;
};

export default function StaffMessageReplies({
  messageId,
  initialReplies,
}: {
  messageId: string;
  initialReplies: Reply[];
}) {
  const [replies, setReplies] = useState(initialReplies);
  const [body, setBody] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const router = useRouter();

  async function sendReply(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const trimmed = body.trim();
    if (!trimmed) {
      setError("Écris ta réponse avant de l'envoyer.");
      return;
    }

    setSending(true);
    try {
      const response = await fetch("/api/staff/replies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messageId, body: trimmed }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Envoi impossible.");
      setReplies((current) => [...current, result.reply]);
      setBody("");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue.");
    } finally {
      setSending(false);
    }
  }

  return <div style={{ marginTop: 18, paddingTop: 14, borderTop: "1px solid var(--line)" }}>
    <h3 style={{ fontSize: 14, margin: "0 0 10px" }}>Réponses</h3>
    {replies.length === 0 && <p style={{ color: "var(--muted)", fontSize: 13 }}>Aucune réponse pour le moment.</p>}
    {replies.map((reply) => <div key={reply.id} style={{ background: "var(--surface, #f7f7f7)", borderRadius: 10, padding: 12, marginBottom: 10 }}>
      <p style={{ whiteSpace: "pre-wrap", margin: 0, lineHeight: 1.6, fontSize: 14 }}>{reply.body}</p>
      <time style={{ display: "block", marginTop: 7, color: "var(--muted)", fontSize: 11 }}>{new Date(reply.created_at).toLocaleString("fr-FR")}</time>
    </div>)}
    <form onSubmit={sendReply}>
      <label htmlFor={`reply-${messageId}`} style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 7 }}>Ta réponse</label>
      <textarea
        id={`reply-${messageId}`}
        value={body}
        onChange={(event) => setBody(event.target.value)}
        maxLength={5000}
        rows={4}
        placeholder="Écris une réponse claire et respectueuse…"
        disabled={sending}
        style={{ width: "100%", boxSizing: "border-box", padding: 12, border: "1px solid var(--line)", borderRadius: 10, font: "inherit", resize: "vertical" }}
      />
      {error && <p className="error" role="alert">{error}</p>}
      <button type="submit" disabled={sending || !body.trim()} style={{ marginTop: 10 }}>
        {sending ? "Envoi…" : "Envoyer la réponse"}
      </button>
    </form>
  </div>;
}
