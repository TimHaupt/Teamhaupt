import type { Metadata } from "next";
import { Fragment } from "react";
import { pageMetadata } from "@/lib/metadata";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Car,
  Check,
  Clock,
  HeartPulse,
  Home,
  Phone,
  Scale,
  TrendingUp,
} from "lucide-react";
import { PageHero, Section } from "@/components/site/section";
import { CtaSection } from "@/components/site/cta-section";
import { JsonLd } from "@/components/site/json-ld";
import { breadcrumbSchema, graph } from "@/lib/schema";
import {
  heilberufeBausteine,
  kanzleiBausteine,
  services,
  site,
  weitereLeistungen,
} from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Leistungen",
  description:
    "Privatschutz, Firmenschutz, Vorsorge, Kfz, Gesundheit und die Komplettabsicherung für Kanzleien – die Leistungen der HDI Generalvertretung Tim Haupt in Erfurt.",
  path: "/leistungen",
});

const icons = { Home, Building2, TrendingUp, Car, HeartPulse, Scale } as const;

/**
 * Praxisfall unter „Gewerbe“: Gebaeudeversicherung fuer ein denkmalgeschuetztes
 * Wohn- und Geschaeftshaus (Oktober 2026). Objekt und Kunde sind bewusst nicht
 * identifizierbar beschrieben – keine Adresse, kein Ort; die Zeichnung im
 * gezeigten Exposé ist verfremdet. Alle Texte des Blocks stehen hier.
 * Das Ergebnis wird nachgetragen, sobald der Kunde entschieden hat.
 */
const praxisfallGebaeude = {
  titel: "Ein Baudenkmal, richtig bewertet",
  lead: "Bei einem Baudenkmal entscheidet die Versicherungssumme, ob nach einem Großschaden so wiederaufgebaut werden kann, wie es die Denkmalbehörde verlangt. Deshalb schätzen wir den Wert nicht – wir ermitteln ihn.",
  ueberschriften: {
    anfrage: "Die Anfrage",
    vorgehen: "Unser Vorgehen",
    ergebnis: "Das Ergebnis",
  },
  anfrage: [
    "Gebäudeversicherung für ein denkmalgeschütztes Wohn- und Geschäftshaus",
    "Gründerzeitbau aus Sandstein, rund 2.000 m² Brutto-Grundfläche",
    "Eigentümerwechsel: Schutz ab dem Tag des Grundbucheintrags",
  ],
  anfrageZeile: "Die Anfrage kam herein – wir haben den Fall übernommen.",
  vorgehen: [
    "Alle Objektdaten beim Kunden erfragt",
    "Offene Punkte – Baujahr und Denkmalstatus – bei der zuständigen Denkmalbehörde geklärt",
    "Wertgutachten erstellt: Neuwert mit anerkanntem Programm, inklusive Denkmalschutz",
    "Versicherungsexposé erstellt: sechs Seiten zu Wert, Leistungen, Beitrag und Wechselklauseln",
    "Exposé und Angebot dem Kunden vorgestellt",
  ],
  ergebnis: [
    "Angebot über rund 6 Mio. € Versicherungssumme, jährlich an den Baupreisindex angepasst",
    "Kein Abzug wegen Unterversicherung, Denkmal-Mehrkosten mitversichert",
    "Besserstellung gegenüber dem Vorvertrag, Wechsel ohne Lücke vorbereitet",
  ],
  status: "Die Entscheidung des Kunden steht noch aus",
  statusZeile: "Stand Oktober 2026 – wir tragen das Ergebnis nach.",
  bildunterschrift: "Auszug aus dem Exposé – Kundendaten verfremdet",
  ctaText:
    "Sie besitzen ein Gewerbegebäude oder Baudenkmal? Wir ermitteln den Wert und prüfen, ob Ihre Versicherungssumme passt. Das Erstgespräch ist kostenlos und unverbindlich.",
  ctaButton: "Gebäude bewerten lassen",
};

export default function LeistungenPage() {
  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbSchema([
            { name: "Start", path: "/" },
            { name: "Leistungen", path: "/leistungen" },
          ]),
        )}
      />
      <PageHero
        eyebrow="Leistungen"
        title="Ein breites Portfolio, ein Ansprechpartner."
        lead="Für Privat- und Firmenkunden. Scheuen Sie sich nicht, uns bei individuellen Fragen direkt anzusprechen – das Erstgespräch ist kostenlos."
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/kontakt#termin"
            className="group inline-flex items-center gap-2.5 rounded-md bg-white px-6 py-3.5 text-[14px] font-medium text-brand-ink transition-colors hover:bg-white/90"
          >
            Termin vereinbaren
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              strokeWidth={1.8}
            />
          </Link>
          <a
            href={site.phoneHref}
            className="inline-flex items-center gap-2.5 rounded-md border border-white/40 px-6 py-3.5 text-[14px] font-medium text-white tabular-nums transition-colors hover:border-white"
          >
            <Phone className="h-4 w-4" strokeWidth={1.8} />
            {site.phone}
          </a>
        </div>
      </PageHero>

      {/* Die sechs Hauptbereiche, jeweils mit Detailabschnitt */}
      {services.map((s, i) => {
        const Icon = icons[s.icon as keyof typeof icons];
        const paper = i % 2 === 1;

        return (
          <Fragment key={s.slug}>
            <section
              id={s.slug}
              className={`scroll-mt-24 ${paper ? "bg-muted" : "bg-background"}`}
            >
              <div className="mx-auto max-w-[1240px] px-6 py-12 sm:py-16 lg:px-10">
                <div className="grid gap-6 lg:grid-cols-[1fr_1.15fr] lg:gap-14">
                  <div>
                    <span className="inline-flex text-brand-text">
                      <Icon className="h-7 w-7" strokeWidth={1.3} />
                    </span>
                    <p className="eyebrow mt-4">{s.tag}</p>
                    <h2 className="display mt-2 text-[clamp(1.55rem,2.6vw,2.05rem)] text-foreground">
                      {s.title}
                    </h2>
                  </div>

                  <div>
                    <p className="max-w-[38rem] text-[16.5px] leading-[1.8] text-muted-foreground">
                      {s.teaser}
                    </p>

                    <ul className="mt-6 grid gap-x-10 gap-y-2 sm:grid-cols-2">
                      {s.bullets.map((b) => (
                        <li
                          key={b}
                          className="flex items-start gap-3 border-t border-border pt-3 text-[15px] text-foreground"
                        >
                          <Check
                            className="mt-1 h-3.5 w-3.5 shrink-0 text-brand-text"
                            strokeWidth={2.5}
                          />
                          {b}
                        </li>
                      ))}
                    </ul>

                    {s.weiter && (
                      <p className="mt-6 max-w-[38rem] text-[15.5px] leading-[1.75] text-muted-foreground">
                        {s.weiter.text}{" "}
                        <Link
                          href={s.weiter.href}
                          className="text-brand-text underline decoration-brand-text/35 underline-offset-4 transition-colors hover:decoration-brand-text"
                        >
                          {s.weiter.link}
                        </Link>
                        .
                      </p>
                    )}

                    <Link
                      href="/kontakt"
                      className="group mt-6 inline-flex items-center gap-2 text-[14.5px] text-brand-text"
                    >
                      Dazu beraten lassen
                      <ArrowRight
                        className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                        strokeWidth={1.8}
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* Praxisfall direkt unter Gewerbe – gleiche Mechanik wie die Case
              Study auf der Kanzleiseite, nur eingebettet statt als eigene Seite. */}
            {s.slug === "unternehmen" && <PraxisfallGebaeude />}
          </Fragment>
        );
      })}

      {/* Kanzleien im Detail */}
      <Section
        id="kanzleien-detail"
        tone="dark"
        eyebrow="Spezialgebiet"
        title="Komplettabsicherung für Ihre Kanzlei"
        lead="Rechtsanwältinnen, Rechtsanwälte und Steuerberatende sind besonderen Haftungsrisiken ausgesetzt. Wir kennen die Anforderungen und halten für nahezu 1.100 Betriebsarten passende Lösungen bereit."
        className="scroll-mt-24"
      >
        <div className="mt-10 grid gap-x-14 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {kanzleiBausteine.map((b) => (
            <div key={b.title} className="border-t border-white/12 pt-7">
              <h3 className="text-[16.5px] font-medium text-white">
                {b.title}
              </h3>
              <p className="mt-3 text-[14.5px] leading-[1.7] text-white/55">
                {b.text}
              </p>
              {b.highlight && (
                <p className="mt-4 inline-block rounded bg-white/10 px-2.5 py-1 text-[11.5px] font-medium uppercase tracking-[0.1em] text-white/80">
                  {b.highlight}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-white/12 pt-8">
          <p className="max-w-[42rem] text-[15.5px] leading-[1.8] text-white/55">
            In Deutschland ereignen sich jede Woche mehr als vier Großschäden ab
            einer Million Euro. Ein einzelner davon kann eine Kanzlei und die
            persönliche berufliche Existenz treffen.
          </p>
          <Link
            href="/kanzleien"
            className="group mt-8 inline-flex items-center gap-2.5 rounded-md bg-white px-7 py-4 text-[14.5px] font-medium text-brand-ink transition-colors hover:bg-white/90"
          >
            Zur Kanzleiseite mit Case Study
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              strokeWidth={1.8}
            />
          </Link>
        </div>
      </Section>

      {/* Heilberufe im Detail */}
      <Section
        id="heilberufe-detail"
        tone="dark"
        eyebrow="Spezialgebiet"
        title="Komplettabsicherung für Ihre Praxis"
        lead="Niedergelassene Ärztinnen und Ärzte, Zahnarztpraxen, Therapeutinnen und Therapeuten sowie Pflegedienste – alle kennen ihre besonderen Risiken. Wir begleiten Sie mit spezialisierter Absicherung und einer festen Ansprechpartnerin."
        className="scroll-mt-24"
      >
        <div className="mt-10 grid gap-x-14 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {heilberufeBausteine.map((b) => (
            <div key={b.title} className="border-t border-white/12 pt-7">
              <h3 className="text-[16.5px] font-medium text-white">
                {b.title}
              </h3>
              <p className="mt-3 text-[14.5px] leading-[1.7] text-white/55">
                {b.text}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-white/12 pt-8">
          <p className="max-w-[42rem] text-[15.5px] leading-[1.8] text-white/55">
            Patientendaten und Praxisabläufe sind hochsensibel. Die richtige
            Absicherung schafft Ruhe – und hilft, wenn es kritisch wird.
          </p>
          <Link
            href="/heilberufe"
            className="group mt-8 inline-flex items-center gap-2.5 rounded-md bg-white px-7 py-4 text-[14.5px] font-medium text-brand-ink transition-colors hover:bg-white/90"
          >
            Zur Seite für Heilberufe mit Case Study
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              strokeWidth={1.8}
            />
          </Link>
        </div>
      </Section>

      {/* Weitere Leistungen */}
      <Section
        eyebrow="Darüber hinaus"
        title="Weitere Leistungen"
        lead="Nicht jedes Anliegen passt in eine der sechs Kategorien. Auch dafür sind wir da."
      >
        <ul className="mt-8 max-w-[52rem]">
          {weitereLeistungen.map((l) => (
            <li
              key={l}
              className="flex items-start gap-4 border-b border-border py-3.5 text-[15.5px] text-foreground"
            >
              <Check
                className="mt-1.5 h-3.5 w-3.5 shrink-0 text-brand-text"
                strokeWidth={2.5}
              />
              {l}
            </li>
          ))}
        </ul>
      </Section>

      {/* Abschluss */}
      <CtaSection
        eyebrow="Erstgespräch"
        title="Kostenlos und unverbindlich."
        lead="Ihre Möglichkeit, individuelle Fragen in einem persönlichen Gespräch zu klären – ohne Verpflichtung."
      >
        <Link
          href="/kontakt"
          className="group inline-flex items-center gap-2.5 rounded-md bg-white px-7 py-4 text-[14.5px] font-medium text-brand-ink transition-colors hover:bg-white/90"
        >
          Termin vereinbaren
          <ArrowRight
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
            strokeWidth={1.8}
          />
        </Link>
      </CtaSection>
    </>
  );
}

/**
 * Drei von sechs Seiten des Exposés zum Praxisfall, als Mappe gezeigt. Kunde,
 * Ort und Beitrag sind im PDF selbst verfremdet bzw. unkenntlich gemacht.
 */
const exposeSeiten = [
  {
    src: "/img/praxis/expose-deckblatt.jpg",
    seite: 1,
    titel: "Deckblatt",
  },
  {
    src: "/img/praxis/expose-wertermittlung.jpg",
    seite: 2,
    titel: "Wertermittlung",
  },
  {
    src: "/img/praxis/expose-leistungsumfang.jpg",
    seite: 4,
    titel: "Leistungsumfang",
  },
];

function Blatt({
  seite,
  sizes,
  className,
}: {
  seite: (typeof exposeSeiten)[number];
  sizes: string;
  className: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-[3px] bg-white shadow-[0_24px_50px_-20px_rgba(0,0,0,0.8)] ring-1 ring-black/5 ${className}`}
    >
      <Image
        src={seite.src}
        alt={`Versicherungsexposé, Seite ${seite.seite}: ${seite.titel} (verfremdet)`}
        width={1000}
        height={1414}
        sizes={sizes}
        className="h-auto w-full"
      />
    </div>
  );
}

function PraxisfallGebaeude() {
  const t = praxisfallGebaeude;
  return (
    <Section
      id="praxisfall-gebaeude"
      tone="dark"
      eyebrow="Aus der Praxis"
      title={t.titel}
      lead={t.lead}
      className="scroll-mt-24"
    >
      {/* Oben Anfrage und Vorgehen, darunter das Ergebnis in eigener Zeile –
          links Punkte, Status und Handlungsaufforderung, rechts das Exposé. */}
      <div className="mt-10 grid gap-12 lg:grid-cols-2 lg:gap-14">
        <div>
          <p className="eyebrow text-brand-bright">
            {t.ueberschriften.anfrage}
          </p>
          <ul className="mt-5 space-y-2.5">
            {t.anfrage.map((p) => (
              <li
                key={p}
                className="flex items-start gap-2.5 text-[14px] leading-snug text-white/65"
              >
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-white/40" />
                {p}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-[13.5px] text-white/45">{t.anfrageZeile}</p>
        </div>

        <div>
          <p className="eyebrow text-brand-bright">
            {t.ueberschriften.vorgehen}
          </p>
          <ol className="mt-5 space-y-2.5">
            {t.vorgehen.map((p, i) => (
              <li
                key={p}
                className="flex items-start gap-3 text-[14px] leading-snug text-white/65"
              >
                <span className="mt-px w-4 shrink-0 text-[12px] tabular-nums text-brand-bright">
                  {i + 1}
                </span>
                {p}
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Ergebnis-Zeile. Desktop: links Ergebnis und darunter die
          Handlungsaufforderung, rechts ueber beide Zeilen die Mappe.
          Handy: Ergebnis, Mappe, Handlungsaufforderung. */}
      <div className="mt-12 grid gap-x-16 gap-y-10 border-t border-white/12 pt-10 lg:grid-cols-[1fr_360px]">
        <div className="lg:col-start-1 lg:row-start-1 lg:self-end">
          <p className="eyebrow text-brand-bright">
            {t.ueberschriften.ergebnis}
          </p>
          <ul className="mt-5 space-y-3">
            {t.ergebnis.map((p) => (
              <li
                key={p}
                className="flex items-start gap-2.5 text-[15.5px] leading-snug text-white/85"
              >
                <Check
                  className="mt-1 h-3.5 w-3.5 shrink-0 text-brand-bright"
                  strokeWidth={2.5}
                />
                {p}
              </li>
            ))}
          </ul>
          <div className="mt-7 max-w-[26rem] rounded bg-white/10 px-3.5 py-2.5 text-[13px]">
            <p className="flex items-center gap-2 font-medium text-white/85">
              <Clock
                className="h-3.5 w-3.5 shrink-0 text-brand-bright"
                strokeWidth={2}
              />
              {t.status}
            </p>
            <p className="mt-0.5 pl-[22px] text-white/45">{t.statusZeile}</p>
          </div>
        </div>

        {/* Das Exposé als leicht gefaecherte Mappe: Seite 2 hinten links,
            Seite 4 hinten rechts, Deckblatt vorn. */}
        <figure className="mx-auto w-[290px] sm:w-[360px] lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:mx-0 lg:self-center">
          <div className="relative h-[262px] sm:h-[318px]">
            <Blatt
              seite={exposeSeiten[1]}
              sizes="220px"
              className="absolute left-3 top-5 w-[160px] -rotate-[4deg] sm:w-[200px] sm:-rotate-[5deg]"
            />
            <Blatt
              seite={exposeSeiten[2]}
              sizes="220px"
              className="absolute right-3 top-5 w-[160px] rotate-[4deg] sm:w-[200px] sm:rotate-[5deg]"
            />
            <Blatt
              seite={exposeSeiten[0]}
              sizes="240px"
              className="absolute left-1/2 top-0 w-[180px] -translate-x-1/2 sm:w-[218px]"
            />
          </div>
          <figcaption className="mt-4 text-center text-[12.5px] text-white/45">
            {t.bildunterschrift}
          </figcaption>
        </figure>

        <div className="lg:col-start-1 lg:row-start-2 lg:self-start">
          <p className="max-w-[30rem] text-[15px] leading-[1.75] text-white/55">
            {t.ctaText}
          </p>
          <Link
            href="/kontakt#termin"
            className="group mt-5 inline-flex items-center gap-2.5 rounded-md bg-white px-7 py-4 text-[14.5px] font-medium text-brand-ink transition-colors hover:bg-white/90"
          >
            {t.ctaButton}
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              strokeWidth={1.8}
            />
          </Link>
        </div>
      </div>
    </Section>
  );
}
