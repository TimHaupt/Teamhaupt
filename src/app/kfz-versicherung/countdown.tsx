"use client";

import { useSyncExternalStore } from "react";

/** Ende des 30.11.2026 in deutscher Zeit (MEZ = UTC+1). */
const STICHTAG = Date.parse("2026-12-01T00:00:00+01:00");
const TAG = 24 * 60 * 60 * 1000;

const nieAendern = () => () => {};
/**
 * Volle Tage bis zum Stichtag: 17 am 13.11., 0 am 30.11. selbst,
 * danach -2 (= vorbei). -1 ist fuer "beim Bauen" reserviert.
 */
const resttage = () => {
  const rest = STICHTAG - Date.now();
  return rest <= 0 ? -2 : Math.floor(rest / TAG);
};
/** Beim Bauen unbekannt – dann steht nur der Stichtag da. */
const beimBauen = () => -1;

/**
 * Zaehlt die Tage bis zum Kfz-Wechselstichtag. Die Seite ist statisch gebaut,
 * deshalb rechnet der Browser. Nach dem Stichtag erscheint ein Hinweis auf
 * die Wechselmoeglichkeiten unterm Jahr.
 */
export function Countdown() {
  const tage = useSyncExternalStore(nieAendern, resttage, beimBauen);

  if (tage === -2) {
    return (
      <p className="mt-2 text-[14px] leading-snug text-white/65">
        Stichtag verpasst? Bei Beitragserhöhung oder neuem Auto geht der
        Wechsel trotzdem.
      </p>
    );
  }

  return (
    <p className="mt-2 text-[14px] text-white/65">
      {tage === 0 ? (
        <span className="font-medium text-brand-bright">
          Heute ist der letzte Tag zum Wechseln
        </span>
      ) : tage > 0 ? (
        <>
          Noch{" "}
          <span className="font-medium text-brand-bright tabular-nums">
            {tage === 1 ? "1 Tag" : `${tage} Tage`}
          </span>{" "}
          bis zum Wechselstichtag
        </>
      ) : (
        "Wechselstichtag für die meisten Verträge"
      )}
    </p>
  );
}
