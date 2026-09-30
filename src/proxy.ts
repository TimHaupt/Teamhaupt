import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Falsch geschriebene Adressen auffangen, bevor sie auf 404 laufen.
 *
 * Next.js unterscheidet Gross- und Kleinschreibung: /Kanzleien ist eine
 * andere Adresse als /kanzleien. Handytastaturen setzen den ersten
 * Buchstaben gern gross – im September 2026 landete genau so ein Besucher
 * auf der Fehlerseite (Vercel Analytics). Ausserdem tippen Leute Umlaute,
 * die es in den Adressen nicht gibt: /über-uns statt /ueber-uns.
 *
 * Next empfiehlt Proxy nur als letztes Mittel. Hier gibt es kein anderes:
 * Die Weiterleitungen in next.config.ts bilden eine Adresse nur eins zu eins
 * ab, umformen koennen sie sie nicht. Der Matcher unten laesst deshalb nur
 * Pfade durch, die ueberhaupt einen Grossbuchstaben oder ein kodiertes
 * Zeichen enthalten – alle normalen Aufrufe laufen am Proxy vorbei.
 */

const UMLAUTE: Record<string, string> = { ä: "ae", ö: "oe", ü: "ue", ß: "ss" };

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  let lesbar: string;
  try {
    lesbar = decodeURIComponent(pathname);
  } catch {
    // Kaputte Kodierung: nicht anfassen, endet regulaer auf der Fehlerseite.
    return NextResponse.next();
  }

  const sauber = lesbar.toLowerCase().replace(/[äöüß]/g, (z) => UMLAUTE[z]);
  if (sauber === lesbar) return NextResponse.next();

  const ziel = request.nextUrl.clone();
  ziel.pathname = sauber;
  // 308 = dauerhaft: Suchmaschinen merken sich die richtige Adresse.
  return NextResponse.redirect(ziel, 308);
}

export const config = {
  matcher: [
    // Nur Pfade mit Grossbuchstaben, %-Kodierung (so kommen Umlaute an) oder
    // einem Umlaut – ohne Next-Interna und ohne Dateien mit Endung, damit
    // Bilder wie /img/team/Foto.jpg unberuehrt bleiben.
    "/((?!_next/)(?!.*\\.[a-zA-Z0-9]+$).*[A-Z%äöüßÄÖÜ].*)",
  ],
};
