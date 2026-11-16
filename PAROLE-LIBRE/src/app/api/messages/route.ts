import { NextRequest, NextResponse } from "next/server";
import { randomBytes, createHash } from "crypto";
import { getSupabase } from "@/lib/supabase";

const allowedRecipients = new Set(["direction", "delegue"]);
const allowedCategories = new Set(["reclamation","suggestion","harcelement","enseignement","discipline","infrastructure","autre"]);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const recipient = String(body.recipient ?? "");
    const category = String(body.category ?? "");
    const message = String(body.message ?? "").trim();
    if (!allowedRecipients.has(recipient) || !allowedCategories.has(category)) return NextResponse.json({ error: "Choix invalide." }, { status: 400 });
    if (message.length < 10 || message.length > 5000) return NextResponse.json({ error: "Le message doit contenir entre 10 et 5 000 caractères." }, { status: 400 });
    const trackingCode = randomBytes(18).toString("base64url").toUpperCase();
    const trackingHash = createHash("sha256").update(trackingCode).digest("hex");
    const supabase = getSupabase();
    const { error } = await supabase.from("messages").insert({ recipient, category, body: message, tracking_hash: trackingHash, status: "new" });
    if (error) throw error;
    return NextResponse.json({ trackingCode }, { status: 201 });
  } catch (error) {
    console.error("Message submission failed", error);
    return NextResponse.json({ error: "Impossible d'envoyer le message. Vérifie la configuration du service puis réessaie." }, { status: 500 });
  }
}
