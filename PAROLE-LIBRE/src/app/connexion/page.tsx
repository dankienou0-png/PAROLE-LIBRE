import Link from "next/link";
import LoginForm from "@/components/LoginForm";

export default function ConnexionPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  return <main className="simple-page">
    <nav className="nav wrap"><Link href="/" className="brand"><span className="brand-mark">PL</span><span>PAROLE <b>LIBRE</b></span></Link><Link href="/" className="nav-link">Retour à l'accueil</Link></nav>
    <section className="simple-card">
      <div className="eyebrow">ESPACE PERSONNEL LTA</div>
      <h1>Connexion responsable</h1>
      <p>Connecte-toi avec l'adresse e-mail et le mot de passe qui t'ont été attribués par invitation.</p>
      <LoginForm />
      <p className="fineprint">Accès réservé au Directeur et au Délégué général des élèves.</p>
    </section>
  </main>;
}
