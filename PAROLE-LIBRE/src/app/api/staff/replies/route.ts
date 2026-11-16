import { NextResponse } from "next/server";
import { requireStaff } from "@/lib/staff-auth";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const { user, staff, admin } = await requireStaff();
  const payload = await request.json().catch(() => null);
  const messageId = typeof payload?.messageId === "string" ? payload.messageId : "";
  const body = typeof payload?.body === "string" ? payload.body.trim() : "";

  if (!messageId || body.length < 1 || body.length > 5000) {
    return NextResponse.json({ error: "La réponse doit contenir entre 1 et 5 000 caractères." }, { status: 400 });
  }

  const recipient = staff.role === "director" ? "direction" : "delegue";
  const { data: message, error: messageError } = await admin
    .from("messages")
    .select("id")
    .eq("id", messageId)
    .eq("institution_id", staff.institution_id)
    .eq("recipient", recipient)
    .maybeSingle();

  if (messageError || !message) {
    return NextResponse.json({ error: "Message introuvable ou accès non autorisé." }, { status: 404 });
  }

  const { data: reply, error: replyError } = await admin
    .from("replies")
    .insert({ message_id: messageId, body, author_id: user.id })
    .select("id,message_id,body,author_id,created_at")
    .single();

  if (replyError || !reply) {
    console.error("PAROLE LIBRE reply insert:", replyError);
    return NextResponse.json({ error: "Impossible d'enregistrer la réponse." }, { status: 500 });
  }

  const { error: statusError } = await admin
    .from("messages")
    .update({ status: "answered" })
    .eq("id", messageId)
    .eq("institution_id", staff.institution_id)
    .eq("recipient", recipient);

  if (statusError) {
    console.error("PAROLE LIBRE message status update:", statusError);
    return NextResponse.json({ error: "La réponse est enregistrée, mais le statut n'a pas pu être actualisé." }, { status: 500 });
  }

  return NextResponse.json({ reply }, { status: 201 });
}
