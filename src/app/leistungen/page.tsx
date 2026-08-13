import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Car,
  Check,
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
          <section
            key={s.slug}
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
              <h3 className="text-[16.5px] font-medium text-white">{b.title}</h3>
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
              <h3 className="text-[16.5px] font-medium text-white">{b.title}</h3>
              <p className="mt-3 text-[14.5px] leading-[1.7] text-white/55">
                {b.text}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-white/12 pt-8">
          <p className="max-w-[42rem] text-[15.5px] leading-[1.8] text-white/55">
            Patientendaten und Praxisabläufe sind hochsensibel. Die richtige Absicherung schafft Ruhe – und hilft, wenn es kritisch wird.
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
