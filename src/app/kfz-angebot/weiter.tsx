"use client";

import { useEffect } from "react";

// Muss mit ZIEL in page.tsx übereinstimmen. Nicht aus page.tsx importieren:
// Werte aus einem "use client"-Modul sind in der Server-Komponente nur
// Client-Referenzen, keine Strings.
const ZIEL = "https://admiral.tim-haupt.de/f/kfz-daten-2026";

/**
 * Leitet Besucher per JavaScript weiter und übernimmt eingehende utm_*-Parameter.
 * Ohne eingehende utm_source gilt der WhatsApp-Status als Quelle.
 * Liest window.location.search im Effect, damit die Seite statisch bleibt.
 */
export function Weiter() {
  useEffect(() => {
    const eingehend = new URLSearchParams(window.location.search);
    const ziel = new URL(ZIEL);
    let hatUtmSource = false;

    eingehend.forEach((wert, schluessel) => {
      if (schluessel.startsWith("utm_")) {
        ziel.searchParams.set(schluessel, wert);
        if (schluessel === "utm_source") hatUtmSource = true;
      }
    });

    if (!hatUtmSource) {
      ziel.searchParams.set("utm_source", "whatsapp");
      ziel.searchParams.set("utm_medium", "status");
    }

    window.location.replace(ziel.toString());
  }, []);

  return null;
}
