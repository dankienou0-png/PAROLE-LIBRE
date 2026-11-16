import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";
import { getSupabase } from "@/lib/supabase";

export const runtime = "nodejs";

export async function GET(_request: NextRequest, { params }: { params: Promise<{ code: string }> }) {
  try {
    const { code: rawCode } = await params;
    const code = String(rawCode ?? "").trim().toUpperCase();
    if (!/^[A-Z0-9_-]{20,100}$/.test(code)) {
      return NextResponse.json({ error: "Code de suivi invalide." }, { status: 400 });
    }

    const hash = createHash("sha256").update(code).digest("hex");
    const supabase = getSupabase();
    const { data: message, error } = await supabase
      .from("messages")
      .select("id, body, created_at, status")
      .eq("tracking_hash", hash)
      .maybeSingle();

    if (error) {
      console.error("Conversation lookup failed:", error.code, error.message);
      return NextResponse.json({ error: "Impossible de consulter ce suivi pour le moment." }, { status: 503 });
    }
    if (!message) {
      return NextResponse.json({ error: "Aucun message trouvé pour ce code." }, { status: 404 });
    }

    const { data: replies, error: replyError } = await supabase
      .from("replies")
      .select("id, body, created_at")
      .eq("message_id", message.id)
      .order("created_at", { ascending: true });

    if (replyError) {
      console.error("Conversation replies lookup failed:", replyError.code, replyError.message);
      return NextResponse.json({ error: "Impossible de charger les réponses pour le moment." }, { status: 503 });
    }

    return NextResponse.json({
      status: message.status,
      messages: [
        { id: message.id, body: message.body, created_at: message.created_at, author_type: "student" },
        ...(replies ?? []).map(reply => ({ ...reply, author_type: "staff" }))
      ]
    });
  } catch (error) {
    console.error("Conversation fetch failed:", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json({ error: "Impossible de charger cette conversation." }, { status: 503 });
  }
}
