import type { Metadata } from "next";
import { site } from "@/lib/site";

/**
 * Seiten-Metadaten aus einer Quelle.
 *
 * Jede Unterseite erhaelt einen vollstaendigen openGraph- und twitter-Block,
 * damit Social-Media-Shares ein Bild zeigen. Ein seiteneigener Block ERSETZT
 * den des Layouts, er erweitert ihn nicht – ohne uebergebenes image waeren
 * die Shares sonst bildlos. Deshalb setzt jede Seite Titel, Beschreibung,
 * URL und ein Fallback-Bild hier gemeinsam.
 */
export function pageMetadata({
  title,
  description,
  path,
  image,
  noindex,
}: {
  title: string;
  description: string;
  /** Pfad mit fuehrendem Slash, z. B. "/kanzleien". */
  path: string;
  /** Abweichendes OG-Motiv; sonst das Team-Bild aus dem Layout. */
  image?: string;
  noindex?: boolean;
}): Metadata {
  const url = `${site.url}${path}`;
  // Das Layout-Template haengt " | Tim Haupt · HDI Erfurt" an – fuer OG gibt es
  // kein Template, der Zusatz muss hier also mitgeschrieben werden.
  const ogTitle = `${title} | Tim Haupt · HDI Erfurt`;
  // Fallback-Bild aus dem Layout; ueberschreibbar per image-Parameter.
  // Der Team-Alt-Text gilt nur fuers Team-Bild – bei eigenem Motiv
  // beschreibt der Seitentitel das Bild besser als eine falsche Behauptung.
  const ogImage = image || "/img/og.jpg";
  const ogImageAlt = image
    ? ogTitle
    : "Das Team der HDI Generalvertretung Tim Haupt in Erfurt";

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "de_DE",
      url,
      siteName: "HDI Generalvertretung Tim Haupt",
      title: ogTitle,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: ogImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: [ogImage],
    },
    ...(noindex ? { robots: { index: false, follow: true } } : null),
  };
}
