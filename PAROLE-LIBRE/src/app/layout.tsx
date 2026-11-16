import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PAROLE LIBRE — Ta voix compte",
  description: "Un espace confidentiel pour faire entendre la voix des élèves.",
  manifest: "/manifest.webmanifest",
};
export const viewport: Viewport = { themeColor: "#101827", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="fr"><body>{children}</body></html>;
}
