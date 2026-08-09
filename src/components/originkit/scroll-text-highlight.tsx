"use client";

// Scroll Text Highlight — Originkit (GSAP ScrollTrigger)
// https://originkit.dev
// Angepasst: Demo-Padding (100dvh) entfernt, Farben via CSS-Variablen,
// prefers-reduced-motion respektiert, Tailwind-Klassen statt Inline-Font.

import * as React from "react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type SplitBy = "characters" | "words";

type ScrollHighlightProps = {
  text: string;
  className?: string;
  /** Farbe der noch nicht hervorgehobenen Wörter */
  dimColor?: string;
  /** Farbe der hervorgehobenen Wörter */
  highlightColor?: string;
  splitBy?: SplitBy;
  scrollStart?: string;
  scrollEnd?: string;
};

const CHAR_STAGGER = 0.03;
const WORD_STAGGER = 0.1;

export default function ScrollTextHighlight({
  text,
  className = "",
  // Absolute Werte statt `currentColor`: Sonst wird die bereits gedimmte
  // Elternfarbe erneut gedimmt und der Text ist praktisch unsichtbar.
  dimColor = "color-mix(in oklab, var(--foreground) 20%, transparent)",
  highlightColor = "var(--foreground)",
  splitBy = "words",
  scrollStart = "top 78%",
  scrollEnd = "bottom 62%",
}: ScrollHighlightProps) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const words = text.trim().split(/\s+/).filter(Boolean);
  const chars = Array.from(text);
  const stagger = splitBy === "characters" ? CHAR_STAGGER : WORD_STAGGER;

  useEffect(() => {
    const paragraph = containerRef.current;
    if (!paragraph) return;

    // Bei reduzierter Bewegung sofort vollständig anzeigen
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const targets = paragraph.querySelectorAll(
      splitBy === "characters" ? ".char" : ".word",
    );

    if (prefersReduced) {
      gsap.set(targets, { color: highlightColor });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(targets, { color: dimColor });

      gsap.to(targets, {
        color: highlightColor,
        stagger,
        ease: "none",
        scrollTrigger: {
          trigger: paragraph,
          start: scrollStart,
          end: scrollEnd,
          scrub: true,
        },
      });
    }, paragraph);

    return () => ctx.revert();
  }, [
    text,
    dimColor,
    highlightColor,
    splitBy,
    stagger,
    scrollStart,
    scrollEnd,
  ]);

  return (
    <p ref={containerRef} className={className} style={{ color: dimColor }}>
      {splitBy === "characters"
        ? chars.map((char, index) => (
            <span key={`${char}-${index}`} className="char inline-block">
              {char === " " ? " " : char}
            </span>
          ))
        : words.map((word, index) => (
            <React.Fragment key={`${word}-${index}`}>
              <span className="word inline-block">{word}</span>
              {index < words.length - 1 ? " " : null}
            </React.Fragment>
          ))}
    </p>
  );
}
