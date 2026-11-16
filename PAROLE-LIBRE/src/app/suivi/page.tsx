import Link from "next/link";
import TrackingForm from "@/components/TrackingForm";
export default function TrackingPage() {
  return <main className="simple-page"><nav className="nav wrap"><Link href="/" className="brand"><span className="brand-mark">PL</span><span>PAROLE <b>LIBRE</b></span></Link><Link href="/" className="nav-link">Accueil</Link></nav><section className="simple-card"><span className="panel-kicker">ESPACE PERSONNEL</span><h1>Retrouver mon message</h1><p>Entre le code privé qui t'a été communiqué après l'envoi. Garde-le secret : il permet d'accéder à ta conversation.</p><TrackingForm/></section></main>;
}
