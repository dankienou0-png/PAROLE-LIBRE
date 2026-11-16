import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";
import { getSupabase } from "@/lib/supabase";

export async function GET(_request: NextRequest, { params }: { params: Promise<{ code: string }> }) {
  try {
    const { code } = await params;
    if (!code || code.length > 100) return NextResponse.json({ error: "Code invalide." }, { status: 400 });
    const hash = createHash("sha256").update(code).digest("hex");
    const supabase = getSupabase();
    const { data: message, error } = await supabase.from("messages").select("id, body, created_at").eq("tracking_hash", hash).maybeSingle();
    if (error) throw error;
    if (!message) return NextResponse.json({ error: "Aucun message trouvé pour ce code." }, { status: 404 });
    const { data: replies, error: replyError } = await supabase.from("replies").select("id, body, created_at").eq("message_id", message.id).order("created_at", { ascending: true });
    if (replyError) throw replyError;
    return NextResponse.json({ messages: [{ ...message, author_type: "student" }, ...(replies || []).map(r => ({ ...r, author_type: "staff" }))] });
  } catch (error) {
    console.error("Conversation fetch failed", error);
    return NextResponse.json({ error: "Impossible de charger cette conversation." }, { status: 500 });
  }
}
