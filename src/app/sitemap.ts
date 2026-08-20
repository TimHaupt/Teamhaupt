import type { MetadataRoute } from "next";

const BASE = "https://www.tim-haupt.de";

/**
 * Die Seite ist klein und vollstaendig statisch – eine handgepflegte Liste ist
 * hier ehrlicher als eine generierte. Neue Route: hier eintragen.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  // Zeitpunkt des Builds. Ein hart codiertes Datum veraltet stillschweigend
  // bei jeder Aenderung; da jeder Inhalt hier per Deploy ausgeliefert wird,
  // ist der Build-Zeitpunkt die ehrlichere Angabe.
  const lastModified = new Date();

  return [
    { url: BASE, lastModified, changeFrequency: "monthly", priority: 1 },
    {
      url: `${BASE}/leistungen`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE}/kanzleien`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE}/heilberufe`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${BASE}/cybersecurity`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${BASE}/ueber-uns`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE}/kontakt`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.8,
    },
    // Impressum und Datenschutz stehen bewusst nicht drin: Sie sind auf
    // noindex gesetzt und haben in der Sitemap nichts verloren.
  ];
}
