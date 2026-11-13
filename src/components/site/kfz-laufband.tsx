"use client";

import { useSyncExternalStore } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/components/lib/utils";

/**
 * Laufband "Kfz-Wechsel im Herbst" ueber der Navigation.
 *
 * Fuehrt auf den Kfz-Funnel in Admiral. Die utm-Parameter trennen die
 * Website-Klicks dort von denen aus dem WhatsApp-Status (/kfz-angebot).
 *
 * Saisonal: Nach dem Wechselstichtag blendet es sich von selbst aus. Die
 * Seiten sind statisch gebaut, deshalb entscheidet der Browser anhand des
 * Datums; danach die Komponente beim naechsten Aufraeumen entfernen.
 */
const ZIEL =
  "https://admiral.tim-haupt.de/f/kfz-daten-2026?utm_source=website&utm_medium=laufband&utm_campaign=kfz-herbst-2026";

/** Ende des 30.11.2026 in deutscher Zeit (MEZ = UTC+1). */
const ENDE = Date.parse("2026-12-01T00:00:00+01:00");

const BOTSCHAFTEN = [
  "Kfz-Versicherung wechseln – Stichtag ist der 30.11.",
  "Fahrzeugschein fotografieren, wir rechnen Ihr Angebot",
  "In wenigen Minuten erledigt",
  "Persönlich betreut von Ihrem Team in Erfurt",
];

const nieAendern = () => () => {};
const imBrowser = () => Date.now() < ENDE;
/** Auf dem Server (beim Bauen) gilt das Laufband als aktiv. */
const beimBauen = () => true;

export function KfzLaufband({ eingeklappt }: { eingeklappt: boolean }) {
  const aktiv = useSyncExternalStore(nieAendern, imBrowser, beimBauen);
  if (!aktiv) return null;

  return (
    // Beim Scrollen klappt das Band weg, damit die Kopfzeile wieder ihre
    // normale Hoehe hat; oben auf der Seite ist es wieder da.
    <div
      className={cn(
        "grid transition-[grid-template-rows] duration-300 motion-reduce:transition-none",
        eingeklappt ? "grid-rows-[0fr]" : "grid-rows-[1fr]",
      )}
    >
      <div className="overflow-hidden">
        <a
          href={ZIEL}
          aria-label="Kfz-Versicherung wechseln bis 30.11. – jetzt persönliches Angebot anfordern"
          tabIndex={eingeklappt ? -1 : undefined}
          className="group flex h-9 items-center bg-brand text-[13px] text-white"
        >
          {/* Laufende Zeile: zwei gleiche Haelften, die um -50 % wandern –
              so schliesst das Band nahtlos an. Bei reduzierter Bewegung steht
              stattdessen ein ruhiger Satz in der Mitte. */}
          <span
            aria-hidden
            className="relative flex min-w-0 flex-1 overflow-hidden motion-reduce:hidden"
          >
            <span className="flex shrink-0 animate-[laufband_45s_linear_infinite] group-hover:[animation-play-state:paused]">
              {[0, 1].map((haelfte) => (
                <span key={haelfte} className="flex shrink-0">
                  {BOTSCHAFTEN.map((text) => (
                    <span key={text} className="flex shrink-0 items-center whitespace-nowrap">
                      <span className="px-6">{text}</span>
                      <span className="h-1 w-1 rounded-full bg-white/50" />
                    </span>
                  ))}
                </span>
              ))}
            </span>
          </span>
          <span
            aria-hidden
            className="hidden flex-1 truncate px-6 text-center motion-reduce:block"
          >
            Kfz-Versicherung wechseln – Stichtag ist der 30.11.
          </span>

          <span
            aria-hidden
            className="flex h-full shrink-0 items-center gap-1.5 bg-brand-ink px-4 font-medium sm:px-6"
          >
            <span className="hidden sm:inline">Jetzt Angebot anfordern</span>
            <span className="sm:hidden">Angebot</span>
            <ArrowRight
              className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
              strokeWidth={2}
            />
          </span>
        </a>
      </div>
    </div>
  );
}
