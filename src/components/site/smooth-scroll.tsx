"use client";

// Traegheits-Scrolling (Lenis) im Zusammenspiel mit GSAP ScrollTrigger.
//
// Der entscheidende Punkt: Beide muessen sich EINEN Ticker teilen. Laufen zwei
// requestAnimationFrame-Schleifen nebeneinander, rechnet ScrollTrigger mit der
// Scrollposition des vorherigen Frames – der Highlight-Effekt in
// scroll-text-highlight.tsx loest dann sichtbar zu frueh oder zu spaet aus.
// Darum treibt der GSAP-Ticker Lenis an (autoRaf: false).

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * ease-out-expo: laeuft laenger aus als das ease-out-cubic der Texteffekte.
 * Bewusst zurueckhaltend dosiert – bei einer Versicherungsseite soll das
 * Scrollen ruhig wirken, nicht nach Award-Site schwingen.
 */
const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

export function SmoothScroll() {
  const pathname = usePathname();

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

    lenis.on("scroll", ScrollTrigger.update);

    const drive = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(drive);
    // lagSmoothing wuerde bei Framedrops Zeit "verschlucken" – Lenis ruckelt dann.
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(drive);
      gsap.ticker.lagSmoothing(500, 33); // GSAP-Standardwerte wiederherstellen
      lenis.destroy();
    };
  }, []);

  // Nach einem Seitenwechsel ist die Seite anders hoch als vorher – die
  // gecachten Trigger-Positionen von ScrollTrigger stimmen dann nicht mehr.
  useEffect(() => {
    ScrollTrigger.refresh();
  }, [pathname]);

  return null;
}
