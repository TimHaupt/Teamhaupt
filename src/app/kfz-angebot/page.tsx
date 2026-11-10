import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { Weiter } from "./weiter";

export const metadata: Metadata = pageMetadata({
  title: "Ihr persönliches Kfz-Angebot",
  description:
    "Fahrzeugschein fotografieren oder Daten eingeben – in wenigen Minuten erledigt. Wir melden uns mit Ihrem Angebot. Wechselstichtag ist der 30.11.",
  path: "/kfz-angebot",
  noindex: true,
});

// Muss mit der Konstante in weiter.tsx übereinstimmen (ohne utm-Parameter dort).
const ZIEL =
  "https://admiral.tim-haupt.de/f/kfz-daten-2026?utm_source=whatsapp&utm_medium=status";

/**
 * Kurzlink für den WhatsApp-Status. Bewusst KEINE serverseitige Weiterleitung:
 * Link-Vorschauen würden ihr folgen und die Vorschau des Ziels zeigen.
 * Die Seite ist statisch; die Weiterleitung kommt per meta refresh (ohne JS)
 * und per Client-Komponente (mit JS, übernimmt utm-Parameter).
 */
export default function KfzAngebotPage() {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-[640px] flex-col items-center justify-center px-6 py-24 text-center">
      <meta httpEquiv="refresh" content={`2;url=${ZIEL}`} />
      <p className="eyebrow">Kfz-Angebot</p>
      <h1 className="display mt-5 text-[clamp(1.65rem,2.9vw,2.35rem)] text-foreground">
        Ihr persönliches Kfz-Angebot
      </h1>
      <p className="mt-5 text-[16.5px] leading-[1.75] text-muted-foreground">
        Sie werden weitergeleitet …
      </p>
      <a
        href={ZIEL}
        className="mt-7 text-[15px] font-medium text-brand-text underline underline-offset-4"
      >
        Weiter zum Angebot
      </a>
      <Weiter />
    </section>
  );
}
