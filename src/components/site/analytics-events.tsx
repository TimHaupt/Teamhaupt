"use client";

// Conversion-Events fuer Vercel Web Analytics.
//
// Ein globaler Listener statt onClick-Handler an jedem Link: So bleiben die
// Seiten Server-Komponenten, und neue CTAs sind automatisch erfasst, solange
// sie auf tel:, wa.me oder cal.com/cal.eu zeigen. Erfasst wird nur, WOHIN
// geklickt wurde und von welcher Seite – keine Personendaten, keine Cookies.

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { track } from "@vercel/analytics";

export function AnalyticsEvents() {
  const pathname = usePathname();

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest?.("a[href]");
      if (!(link instanceof HTMLAnchorElement)) return;
      const href = link.href;

      if (href.startsWith("tel:")) {
        track("anruf_klick", { seite: pathname });
      } else if (href.includes("wa.me")) {
        track("whatsapp_klick", { seite: pathname });
      } else if (href.includes("cal.com") || href.includes("cal.eu")) {
        // Kalender-Slug statt Name: identifiziert das gebuchte Teammitglied,
        // ohne hier Namen zu verdrahten.
        const slug = new URL(href).pathname.replaceAll("/", "") || "unbekannt";
        track("buchung_klick", { seite: pathname, kalender: slug });
      }
    };

    // Das Kontaktformular ruft preventDefault – das submit-Event feuert
    // trotzdem und reicht als Signal "Formular abgeschickt".
    const onSubmit = () => {
      track("formular_gesendet", { seite: pathname });
    };

    document.addEventListener("click", onClick, { capture: true });
    document.addEventListener("submit", onSubmit, { capture: true });
    return () => {
      document.removeEventListener("click", onClick, { capture: true });
      document.removeEventListener("submit", onSubmit, { capture: true });
    };
  }, [pathname]);

  return null;
}
