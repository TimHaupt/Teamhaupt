"use client";

// Traegheits-Scrolling (Lenis) im Zusammenspiel mit GSAP ScrollTrigger,
// plus sanfte Stopps an den Abschnittsgrenzen.
//
// Der entscheidende Punkt beim Zusammenspiel: Beide muessen sich EINEN Ticker
// teilen. Laufen zwei requestAnimationFrame-Schleifen nebeneinander, rechnet
// ScrollTrigger mit der Scrollposition des vorherigen Frames – der
// Highlight-Effekt in scroll-text-highlight.tsx loest dann sichtbar zu frueh
// oder zu spaet aus. Darum treibt der GSAP-Ticker Lenis an (autoRaf: false).

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import Snap from "lenis/snap";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * ease-out-expo: laeuft laenger aus als das ease-out-cubic der Texteffekte.
 * Bewusst zurueckhaltend dosiert – bei einer Versicherungsseite soll das
 * Scrollen ruhig wirken, nicht nach Award-Site schwingen.
 */
const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

/** Hoehe des fixierten Headers – ohne diesen Versatz landet jede
 *  Abschnittsueberschrift beim Stopp hinter der Kopfzeile. */
const HEADER_HOEHE = 72;

/** Neu vermessen erst, wenn sich die Seitenhoehe eine Weile nicht mehr aendert. */
const MESS_VERZOEGERUNG = 150;

export function SmoothScroll() {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Wer Bewegung reduziert haben moechte, bekommt natives Scrollen: Lenis
    // wird gar nicht erst gestartet. Damit bleibt auch die Klasse `lenis` aus,
    // und `scroll-behavior: smooth` aus globals.css greift weiterhin.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: easeOutExpo,
      // Touch bleibt nativ. Abgefangenes Touch-Scrolling fuehlt sich auf dem
      // Handy traege an und kollidiert mit Pull-to-refresh.
      syncTouch: false,
      autoRaf: false,
    });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const drive = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(drive);
    // lagSmoothing wuerde bei Framedrops Zeit "verschlucken" – Lenis ruckelt dann.
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(drive);
      gsap.ticker.lagSmoothing(500, 33); // GSAP-Standardwerte wiederherstellen
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Stopps an den Abschnittsgrenzen.
  //
  // Bewusst `proximity` und nicht `mandatory`: 11 der 13 Abschnitte sind hoeher
  // als ein Bildschirm, einer ueber fuenf Bildschirme. Erzwungene Stopps wuerden
  // mitten im Lesen an die naechste Grenze reissen und Inhalt ueberspringen.
  // `proximity` zieht nur nach, wenn die Grenze ohnehin schon nah ist – im
  // Inneren langer Abschnitte scrollt die Seite voellig normal.
  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return; // reduzierte Bewegung: kein Lenis, also auch keine Stopps

    const snap = new Snap(lenis, {
      type: "proximity",
      // Standard waere 50 % der Fensterhoehe – das greift viel zu weit und
      // fuehlt sich an, als wuerde die Seite staendig ziehen.
      distanceThreshold: "12%",
      duration: 0.6,
      easing: easeOutExpo,
    });

    let abmelden: Array<() => void> = [];

    const vermessen = () => {
      abmelden.forEach((weg) => weg());
      abmelden = [];

      document.querySelectorAll<HTMLElement>("main > section").forEach((sec) => {
        const oben = window.scrollY + sec.getBoundingClientRect().top;
        abmelden.push(snap.add(Math.max(0, Math.round(oben - HEADER_HOEHE))));
      });
    };

    vermessen();

    // Bilder und Schriften aendern die Seitenhoehe noch nach dem ersten Rendern;
    // ohne Nachmessen zeigen die Stopps dann auf veraltete Positionen.
    let timer: number;
    const spaeterVermessen = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(vermessen, MESS_VERZOEGERUNG);
    };

    const beobachter = new ResizeObserver(spaeterVermessen);
    beobachter.observe(document.body);
    window.addEventListener("resize", spaeterVermessen);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("resize", spaeterVermessen);
      beobachter.disconnect();
      abmelden.forEach((weg) => weg());
      snap.destroy();
    };
  }, [pathname]);

  // Nach einem Seitenwechsel ist die Seite anders hoch als vorher – die
  // gecachten Trigger-Positionen von ScrollTrigger stimmen dann nicht mehr.
  useEffect(() => {
    ScrollTrigger.refresh();
  }, [pathname]);

  return null;
}
