import Link from "next/link";
import { MessageCircle, ShieldCheck, Send, ArrowRight, LockKeyhole } from "lucide-react";
import SubmissionForm from "@/components/SubmissionForm";

export default function Home() {
  return <main>
    <nav className="nav wrap">
      <Link href="/" className="brand"><span className="brand-mark">PL</span><span>PAROLE <b>LIBRE</b></span></Link>
      <Link className="nav-link" href="/suivi">Suivre un message <ArrowRight size={15}/></Link>
    </nav>
    <section className="hero wrap">
      <div className="hero-copy">
        <div className="eyebrow"><span className="pulse"/> ESPACE D'ÉCOUTE DES ÉLÈVES</div>
        <h1>Ta voix compte.<br/><em>Fais-toi entendre.</em></h1>
        <p className="lead">Une idée, un problème ou une situation difficile à signaler ? Écris librement. Ton identité n'est pas communiquée au destinataire.</p>
        <div className="trust"><span><ShieldCheck size={17}/> Message sans nom affiché</span><span><LockKeyhole size={16}/> Code privé de suivi</span></div>
      </div>
      <div className="form-panel"><div className="panel-heading"><div><span className="panel-kicker">PRENDRE LA PAROLE</span><h2>Écrire un message</h2></div><div className="panel-icon"><MessageCircle size={21}/></div></div>
        <SubmissionForm/>
      </div>
    </section>
    <section className="bottom wrap">
      <div className="bottom-item"><div className="small-icon"><ShieldCheck/></div><div><b>Confidentialité</b><p>Ton nom et ton adresse e-mail ne sont pas demandés dans le formulaire.</p></div></div>
      <div className="bottom-item"><div className="small-icon"><MessageCircle/></div><div><b>Un vrai dialogue</b><p>Retrouve les réponses avec ton code privé, sans créer de compte.</p></div></div>
      <div className="bottom-item"><div className="small-icon"><Send/></div><div><b>À qui écrire ?</b><p>Choisis la direction ou le délégué général des élèves.</p></div></div>
    </section>
    <footer className="wrap footer"><span>© {new Date().getFullYear()} PAROLE LIBRE</span><span>Un espace où chaque élève peut dire ce qu'il n'ose pas dire.</span><Link href="/suivi">Accéder au suivi</Link></footer>
  </main>;
}
