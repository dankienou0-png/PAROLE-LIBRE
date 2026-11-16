import Link from "next/link";
import LoginForm from "@/components/LoginForm";

export default function ConnexionPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const params = await searchParams;
  const initialError = params.error === "acces" ? "Ce compte n'a pas d'accès responsable actif." : params.error === "invitation" ? "Le lien d'invitation est invalide ou a expiré. Demande un nouvel e-mail d'invitation." : "";
  return <main className="simple-page">
    <nav className="nav wrap"><Link href="/" className="brand"><span className="brand-mark">PL</span><span>PAROLE <b>LIBRE</b></span></Link><Link href="/" className="nav-link">Retour à l'accueil</Link></nav>
    <section className="simple-card">
      <div className="eyebrow">ESPACE PERSONNEL LTA</div>
      <h1>Connexion responsable</h1>
      <p>Connecte-toi avec l'adresse e-mail et le mot de passe qui t'ont été attribués par invitation.</p>
      <LoginForm initialError={initialError} />
      <p className="fineprint">Accès réservé au Directeur et au Délégué général des élèves.</p>
    </section>
  </main>;
}
