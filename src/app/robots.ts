import type { MetadataRoute } from "next";

const BASE = "https://www.tim-haupt.de";

/**
 * Crawler von KI-Assistenten sind bewusst zugelassen.
 *
 * Wer in ChatGPT, Perplexity oder Google AI Overviews als Antwort auftauchen
 * will, muss sich lesen lassen. Fuer eine Agentur, die ueber Sichtbarkeit
 * Kunden gewinnt, ueberwiegt das klar. Soll das eingeschraenkt werden,
 * hier die entsprechenden User-Agents auf `disallow` setzen.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Impressum und Datenschutz stehen hier bewusst NICHT auf disallow.
        // Beide tragen `robots: noindex` in ihren Metadaten – und dieses Tag
        // kann eine Suchmaschine nur lesen, wenn sie die Seite auch abrufen
        // darf. Ein Disallow wuerde das noindex unsichtbar machen und die URLs
        // koennten trotzdem im Index landen, nur ohne Inhalt.
      },
    ],
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  };
}
