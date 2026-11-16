import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const staff = [
  { email: "elviskienou0@gmail.com", role: "director" as const },
  { email: "aurelekienou8@gmail.com", role: "delegue" as const },
];

export async function POST(request: NextRequest) {
  const configuredSecret = process.env.PAROLE_LIBRE_SETUP_SECRET;
  const suppliedSecret = request.headers.get("x-setup-secret");
  if (!configuredSecret || !suppliedSecret || suppliedSecret.length !== configuredSecret.length ||
      !Buffer.from(suppliedSecret).equals(Buffer.from(configuredSecret))) {
    return NextResponse.json({ error: "Accès de configuration refusé." }, { status: 401 });
  }

  try {
    const supabase = getSupabase();
    const { data: institution, error: institutionError } = await supabase
      .from("institutions").select("id").eq("slug", "lta").single();
    if (institutionError || !institution) throw new Error("L'établissement LTA n'est pas configuré.");

    const origin = process.env.NEXT_PUBLIC_APP_URL || new URL(request.url).origin;
    const results = [];
    for (const person of staff) {
      const { data: listed, error: listError } = await supabase.auth.admin.listUsers({ page: 1, perPage: 1000 });
      if (listError) throw listError;
      let user = listed.users.find((candidate) => candidate.email?.toLowerCase() === person.email);
      let invitationSent = false;
      if (!user) {
        const { data, error } = await supabase.auth.admin.inviteUserByEmail(person.email, {
          redirectTo: `${origin}/auth/callback`,
          data: { institution: "LTA", role: person.role }
        });
        if (error) throw new Error(`Invitation de ${person.email} impossible : ${error.message}`);
        user = data.user;
        invitationSent = true;
      }
      if (!user) throw new Error(`Utilisateur introuvable pour ${person.email}.`);
      const { error: upsertError } = await supabase.from("staff_members").upsert({
        user_id: user.id, institution_id: institution.id, role: person.role, email: person.email
      }, { onConflict: "user_id" });
      if (upsertError) throw upsertError;
      results.push({ email: person.email, role: person.role, invitationSent });
    }
    return NextResponse.json({ success: true, institution: "LTA", accounts: results });
  } catch (error) {
    console.error("Staff setup failed:", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json({ error: error instanceof Error ? error.message : "Configuration impossible." }, { status: 500 });
  }
}
