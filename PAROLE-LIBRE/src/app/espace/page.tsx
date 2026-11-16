import Link from "next/link";
import { requireStaff } from "@/lib/staff-auth";
import LogoutButton from "@/components/LogoutButton";
import StaffMessageReplies from "@/components/StaffMessageReplies";

export const dynamic = "force-dynamic";

const statusLabels: Record<string, string> = { new: "Nouveau", read: "En cours de lecture", answered: "Répondu", closed: "Clôturé" };
const categoryLabels: Record<string, string> = { reclamation: "Réclamation", suggestion: "Suggestion", harcelement: "Harcèlement", enseignement: "Enseignement", discipline: "Discipline", infrastructure: "Infrastructure", autre: "Autre" };

export default async function StaffSpacePage() {
  const { user, staff, admin } = await requireStaff();
  const isDirector = staff.role === "director";
  const recipient = isDirector ? "direction" : "delegue";
  const heading = isDirector ? "Espace Directeur" : "Espace DG des élèves";
  const { data: messages, error } = await admin.from("messages")
    .select("id,recipient,category,body,status,created_at")
    .eq("institution_id", staff.institution_id)
    .eq("recipient", recipient)
    .order("created_at", { ascending: false })
    .limit(100);

  const messageIds = (messages ?? []).map((message) => message.id);
  const { data: replies } = messageIds.length
    ? await admin.from("replies").select("id,message_id,body,author_id,created_at").in("message_id", messageIds).order("created_at", { ascending: true })
    : { data: [] };

  return <main className="simple-page">
    <nav className="nav wrap"><Link href="/" className="brand"><span className="brand-mark">PL</span><span>PAROLE <b>LIBRE</b></span></Link><LogoutButton /></nav>
    <section className="simple-card" style={{ width: "min(900px, calc(100% - 36px))" }}>
      <div className="eyebrow">TABLEAU DE BORD LTA</div>
      <h1>{heading}</h1>
      <p>Connecté en tant que <b>{user.email}</b>. Cet espace affiche uniquement les messages adressés à {isDirector ? "la Direction" : "au Délégué général des élèves"}.</p>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", margin: "20px 0" }}>
        <div className="panel-icon" style={{ width: "auto", padding: "0 16px" }}>{messages?.length ?? 0} message(s)</div>
        <div className="panel-icon" style={{ width: "auto", padding: "0 16px" }}>{isDirector ? "Destinataire : Direction" : "Destinataire : DG des élèves"}</div>
      </div>
      {error && <p className="error">Impossible de charger les messages pour le moment.</p>}
      {!error && (!messages || messages.length === 0) && <p>Aucun message ne t'est actuellement adressé.</p>}
      {messages?.map((message) => <article key={message.id} style={{ border: "1px solid var(--line)", borderRadius: 14, padding: 18, marginTop: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap", color: "var(--muted)", fontSize: 11 }}>
          <span>{categoryLabels[message.category ?? ""] ?? "Sans catégorie"}</span>
          <span>{statusLabels[message.status] ?? message.status}</span>
          <time>{new Date(message.created_at).toLocaleString("fr-FR")}</time>
        </div>
        <p style={{ whiteSpace: "pre-wrap", lineHeight: 1.7, fontSize: 14 }}>{message.body}</p>
        <StaffMessageReplies messageId={message.id} initialReplies={(replies ?? []).filter((reply) => reply.message_id === message.id)} />
      </article>)}
    </section>
  </main>;
}
