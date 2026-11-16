import { NextRequest, NextResponse } from "next/server";
import { randomBytes, createHash } from "crypto";
import { getSupabase } from "@/lib/supabase";

export const runtime = "nodejs";

const allowedRecipients = new Set(["direction", "delegue"]);
const allowedCategories = new Set(["reclamation", "suggestion", "harcelement", "enseignement", "discipline", "infrastructure", "autre"]);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const recipient = String(body.recipient ?? "");
    const rawCategory = body.category == null || body.category === "" ? null : String(body.category);
    const category = rawCategory && allowedCategories.has(rawCategory) ? rawCategory : null;
    const message = String(body.message ?? "").trim();

    if (!allowedRecipients.has(recipient)) {
      return NextResponse.json({ error: "Destinataire invalide." }, { status: 400 });
    }
    if (rawCategory && !allowedCategories.has(rawCategory)) {
      return NextResponse.json({ error: "Catégorie invalide." }, { status: 400 });
    }
    if (message.length < 10 || message.length > 5000) {
      return NextResponse.json({ error: "Le message doit contenir entre 10 et 5 000 caractères." }, { status: 400 });
    }

    const trackingCode = randomBytes(18).toString("base64url").toUpperCase();
    const trackingHash = createHash("sha256").update(trackingCode).digest("hex");
    const supabase = getSupabase();
    const { error } = await supabase.from("messages").insert({
      recipient, category, body: message, tracking_hash: trackingHash, status: "new"
    });

    if (error) {
      console.error("Supabase message insert failed:", error.code, error.message);
      return NextResponse.json({ error: "Le message n'a pas pu être enregistré. Réessaie dans quelques instants." }, { status: 503 });
    }

    return NextResponse.json({ trackingCode }, { status: 201 });
  } catch (error) {
    console.error("Message submission failed:", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json({ error: "Service momentanément indisponible. Vérifie la configuration puis réessaie." }, { status: 503 });
  }
}
