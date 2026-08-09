import type { Metadata } from "next";
import { Titillium_Web } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";

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
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: "https://www.tim-haupt.de",
    siteName: "HDI Generalvertretung Tim Haupt",
    title: "HDI Generalvertretung Tim Haupt | Versicherung in Erfurt",
    description:
      "Persönliche Beratung, ein festes IHK-geprüftes Team und schnelle Schadenhilfe – für Privat, Unternehmen und Kanzleien.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de" className={titillium.variable}>
      <body className="font-sans antialiased">
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
