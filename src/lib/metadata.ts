import type { Metadata } from "next";
import { site } from "@/lib/site";

/**
 * Seiten-Metadaten aus einer Quelle.
 *
 * Ohne eigenes `openGraph` erbt jede Unterseite den Block aus dem Root-Layout –
 * inklusive dessen `og:url`. Geteilte Unterseiten zeigen dann die Karte der
 * Startseite und melden eine URL, die dem eigenen canonical widerspricht.
 * Deshalb setzt jede Seite Titel, Beschreibung und URL hier gemeinsam.
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

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: ogTitle,
      description,
      url,
      ...(image
        ? { images: [{ url: image, width: 1200, height: 630, alt: title }] }
        : null),
    },
    twitter: {
      title: ogTitle,
      description,
      ...(image ? { images: [image] } : null),
    },
    ...(noindex ? { robots: { index: false, follow: true } } : null),
  };
}
