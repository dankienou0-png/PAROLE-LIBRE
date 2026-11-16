import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getSupabase } from "@/lib/supabase";

export async function requireStaff() {
  const authClient = await createSupabaseServerClient();
  const { data: { user }, error } = await authClient.auth.getUser();
  if (error || !user || !user.email) redirect("/connexion");

  const admin = getSupabase();
  const { data: staff, error: staffError } = await admin
    .from("staff_members")
    .select("user_id,institution_id,role,email,institutions(name)")
    .eq("user_id", user.id)
    .eq("email", user.email.toLowerCase())
    .single();

  if (staffError || !staff || !["director", "delegue"].includes(staff.role)) {
    await authClient.auth.signOut();
    redirect("/connexion?error=acces");
  }

  return { user, staff, admin };
}
