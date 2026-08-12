"use client";

// Sanftes Einblenden, sobald ein Abschnitt in den sichtbaren Bereich kommt.
//
// Bewusst grob geschnitten: ein Reveal pro Sinnabschnitt statt pro Karte. Bei
// einer Versicherungsseite soll der Inhalt ruhig ankommen und nicht einzeln
// hereintanzen – das wirkt schnell nach Effekt statt nach Seriositaet.

import { useRef, useSyncExternalStore, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

/** ease-out-cubic – identisch zu FocusReveal, damit die Seite eine Handschrift behaelt */
const EASE_OUT = [0.215, 0.61, 0.355, 1] as const;

const SICHTBAR = { opacity: 1, y: 0 } as const;
const VERSTECKT = { opacity: 0, y: 24 } as const;

/**
 * Sicherheitsnetz gegen dauerhaft unsichtbaren Inhalt.
 *
 * Der versteckte Startzustand wird erst gesetzt, nachdem React erfolgreich
 * hydriert hat. Im ausgelieferten HTML steht der Text sichtbar – faellt
 * JavaScript aus, schlaegt die Hydration fehl oder blockiert ein Adblocker das
 * Bundle, bleibt der Abschnitt lesbar statt unsichtbar.
 *
 * useSyncExternalStore statt setState-im-Effect: Letzteres verstoesst gegen die
 * react-hooks/set-state-in-effect-Regel des Projekts.
 */
const nieAendern = () => () => {};
const useHydriert = () =>
  useSyncExternalStore(
    nieAendern,
    () => true, // Client, nach der Hydration
    () => false, // Server und erster Hydration-Durchlauf
  );

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Versatz in Sekunden, um Kopf und Inhalt leicht nacheinander laufen zu lassen */
  delay?: number;
};

export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const hydriert = useHydriert();

  // Startet leicht, bevor der Abschnitt die Unterkante erreicht.
  // once: Einmal sichtbar, bleibt sichtbar – wiederholtes Ein- und Ausblenden
  // beim Zurueckscrollen wirkt unruhig.
  const imBild = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });

  // Nur animieren, wenn React laeuft UND der Nutzer Bewegung nicht abbestellt hat.
  const animieren = hydriert && reduceMotion !== true;
  const zeigen = !animieren || imBild;

  return (
    <motion.div
      ref={ref}
      data-reveal // Griff zum Nachpruefen im Browser, sonst ohne Funktion
      className={className}
      // initial={false}: Beim ersten Rendern wird der Zielwert direkt gesetzt,
      // ohne Animation – sonst faengt jeder Abschnitt beim Laden an zu blenden.
      initial={false}
      animate={zeigen ? SICHTBAR : VERSTECKT}
      transition={
        zeigen
          ? { duration: animieren ? 0.55 : 0, delay: animieren ? delay : 0, ease: EASE_OUT }
          : // Der Wechsel auf "versteckt" passiert einmalig direkt nach der
            // Hydration. Ohne duration 0 wuerde ein Abschnitt, der beim Laden
            // schon im Bild steht, sichtbar wegblenden statt einfach da zu sein.
            { duration: 0 }
      }
    >
      {children}
    </motion.div>
  );
}
