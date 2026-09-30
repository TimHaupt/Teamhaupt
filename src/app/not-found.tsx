import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { PageHero } from "@/components/site/section";
import { nav, site } from "@/lib/site";

/**
 * Fehlerseite fuer unbekannte Adressen.
 *
 * Vorher zeigte Next seine englische Standardseite ("This page could not be
 * found"). Wer hier landet, kommt meist ueber einen alten Link der frueheren
 * WordPress-Seite oder einen Tippfehler – er sucht also etwas Bestimmtes.
 * Statt nur den Fehler zu melden, bietet die Seite die Hauptziele an.
 * noindex setzt Next bei Status 404 selbst.
 */
export const metadata: Metadata = {
  title: "Seite nicht gefunden",
};

export default function NotFound() {
  const ziele = nav.filter((n) => n.href !== "/");

  return (
    <PageHero
      eyebrow="Fehler 404"
      title="Diese Seite gibt es nicht."
      lead="Vielleicht ein alter Link oder ein Tippfehler in der Adresse. Hier finden Sie, was Sie wahrscheinlich gesucht haben:"
    >
      <ul className="mt-9 grid max-w-[40rem] gap-x-10 sm:grid-cols-2">
        {ziele.map((z) => (
          <li key={z.href} className="border-t border-white/12">
            <Link
              href={z.href}
              className="group flex items-center justify-between gap-4 py-3.5 text-[16px] text-white/85 transition-colors hover:text-white"
            >
              {z.label}
              <ArrowRight
                className="h-4 w-4 shrink-0 text-white/40 transition-transform group-hover:translate-x-0.5 group-hover:text-brand-bright"
                strokeWidth={1.8}
              />
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2.5 rounded-md bg-white px-6 py-3.5 text-[14px] font-medium text-brand-ink transition-colors hover:bg-white/90"
        >
          Zur Startseite
        </Link>
        <a
          href={site.phoneHref}
          className="inline-flex items-center gap-2.5 text-[14px] text-white/70 tabular-nums transition-colors hover:text-white"
        >
          <Phone className="h-4 w-4" strokeWidth={1.8} />
          Oder direkt anrufen: {site.phone}
        </a>
      </div>
    </PageHero>
  );
}
