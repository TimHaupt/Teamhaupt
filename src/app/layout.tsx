import type { Metadata } from "next";
import { Titillium_Web } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { JsonLd } from "@/components/site/json-ld";
import { agencySchema, graph, ownerSchema } from "@/lib/schema";

/**
 * Titillium Web – die Hausschrift der HDI und der bisherigen Agenturseite.
 * Bewusst nur bis 600: Die schweren Schnitte (800/900) waren es, die den
 * alten Auftritt laut wirken liessen. Groesse schafft hier die Hierarchie.
 */
const titillium = Titillium_Web({
  variable: "--font-titillium",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.tim-haupt.de"),
  title: {
    default: "HDI Generalvertretung Tim Haupt | Versicherung in Erfurt",
    template: "%s | Tim Haupt · HDI Erfurt",
  },
  description:
    "Ihre HDI Generalvertretung in Erfurt. Persönliche Beratung, ein festes IHK-geprüftes Team und schnelle Schadenhilfe – für Privat, Unternehmen und Kanzleien.",
  keywords: [
    "Versicherung Erfurt",
    "HDI Erfurt",
    "Versicherungsmakler Erfurt",
    "Tim Haupt",
    "Berufshaftpflicht Steuerberater",
    "Berufshaftpflicht Rechtsanwalt",
    "Altersvorsorge Erfurt",
  ],
  authors: [{ name: "Tim Haupt" }],
  creator: "HDI Generalvertretung Tim Haupt",
  publisher: "HDI Generalvertretung Tim Haupt",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: "https://www.tim-haupt.de",
    siteName: "HDI Generalvertretung Tim Haupt",
    title: "HDI Generalvertretung Tim Haupt | Versicherung in Erfurt",
    description:
      "Persönliche Beratung, ein festes IHK-geprüftes Team und schnelle Schadenhilfe – für Privat, Unternehmen und Kanzleien.",
    images: [
      {
        url: "/img/team-banner.png",
        width: 1794,
        height: 700,
        alt: "Das Team der HDI Generalvertretung Tim Haupt in Erfurt",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HDI Generalvertretung Tim Haupt | Versicherung in Erfurt",
    description:
      "Persönliche Beratung, ein festes IHK-geprüftes Team und schnelle Schadenhilfe.",
    images: ["/img/team-banner.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  // Ort explizit auszeichnen – hilft der lokalen Zuordnung zusaetzlich
  // zu den strukturierten Daten.
  other: {
    "geo.region": "DE-TH",
    "geo.placename": "Erfurt",
    "geo.position": "50.9837976;11.0288257",
    ICBM: "50.9837976, 11.0288257",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de" className={titillium.variable}>
      <body className="font-sans antialiased">
        {/* Agentur und Inhaber als Entitaeten – auf jeder Seite, damit die
            Zuordnung unabhaengig vom Einstiegspunkt eindeutig ist. */}
        <JsonLd data={graph(agencySchema(), ownerSchema())} />
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
