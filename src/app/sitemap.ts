import type { MetadataRoute } from "next";

const BASE = "https://www.tim-haupt.de";

/**
 * Die Seite ist klein und vollstaendig statisch – eine handgepflegte Liste ist
 * hier ehrlicher als eine generierte. Neue Route: hier eintragen.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-08-09");

  return [
    { url: `${BASE}/`, lastModified, changeFrequency: "monthly", priority: 1 },
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
