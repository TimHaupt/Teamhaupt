import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, Phone, X } from "lucide-react";
import { PageHero, Section } from "@/components/site/section";
import { JsonLd } from "@/components/site/json-ld";
import {
  breadcrumbSchema,
  faqListSchema,
  graph,
  serviceSchema,
} from "@/lib/schema";
import { kanzleiBausteine, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Versicherung für Steuerberater & Rechtsanwälte",
  description:
    "Komplettabsicherung für Kanzleien in Erfurt und Thüringen: Berufshaftpflicht, Cyber, Inhalt und Rechtsschutz – mit Sonderkonditionen für DAV- und StbV-Mitglieder. Über 107 versicherte Berufsträger.",
  alternates: { canonical: "/kanzleien" },
};

/**
 * Kennzahlen von der bisherigen Kanzleiseite (tim-haupt.de) übernommen.
 * Der Zähler 107+ stammt aus dem dortigen Counter-Element – bei Wachstum
 * hier nachziehen.
 */
const zahlen = [
  { value: "107+", label: "Rechtsanwälte und Steuerberater", note: "bei uns versichert" },
  { value: "4+", label: "Großschäden ab 1 Mio. € pro Woche", note: "in Deutschland" },
  { value: "1.100", label: "Betriebsarten mit passenden Lösungen", note: "inkl. Zusatzbausteinen" },
];

/** Case Study – realer Fall von der bisherigen Kanzleiseite. */
const caseStudy = {
  ausgangslage: [
    "Berufshaftpflicht der Gesellschaft",
    "Zusätzliche Berufshaftpflicht für die persönliche Haftung der Partner",
    "Betriebshaftpflicht",
    "Inventarversicherung",
    "Betriebsunterbrechungsversicherung",
    "Elektronikversicherung",
    "Cyberversicherung",
    "Maklervertrag",
  ],
  schwachstellen: [
    "Cyberversicherung mit möglichem Regress an Mitarbeitende",
    "Schwammige Regelung zur groben Fahrlässigkeit",
    "Erhöhte Selbstbeteiligung in der Inventarversicherung",
    "Unnötige Aufsplittung der Sachversicherungen",
    "Fehlende Erreichbarkeit des bisherigen Maklers",
  ],
};

const kanzleiFaqs = [
  {
    q: "Wir haben bereits einen Makler. Lohnt sich ein Check trotzdem?",
    a: "Gerade dann. In einem realen Fall haben wir bei einer Kanzlei mit drei Standorten acht zersplitterte Verträge zu fünf hochwertigen zusammengeführt – bei rund 20 Prozent geringerem Beitrag und besserem Schutz. Der Check ist kostenlos, das Ergebnis gehört Ihnen.",
  },
  {
    q: "Was bringt mir die Mitgliedschaft im DAV oder StbV konkret?",
    a: "Über unsere Kooperationen erhalten Mitglieder des Deutschen Anwaltvereins und des Steuerberaterverbands Sonderkonditionen auf die Bausteine der Kanzleiabsicherung – insbesondere bei der Berufshaftpflicht.",
  },
  {
    q: "Deckt die Berufshaftpflicht auch die persönliche Haftung der Partner?",
    a: "Die Berufshaftpflicht der Gesellschaft allein oft nicht vollständig. Je nach Sozietätsform sichern wir die persönliche Haftung der Partnerinnen und Partner über einen eigenen Baustein zusätzlich ab – genau das prüfen wir im Erstgespräch.",
  },
  {
    q: "Wie läuft das Erstgespräch ab?",
    a: "Wir gehen Ihre bestehenden Verträge gemeinsam durch und suchen die Schwachstellen – von Selbstbeteiligungen über Regressklauseln bis zur Frage, ob sich Verträge sinnvoll bündeln lassen. Kostenlos, unverbindlich und auf Wunsch bei Ihnen in der Kanzlei.",
  },
];

export default function KanzleienPage() {
  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbSchema([
            { name: "Start", path: "/" },
            { name: "Für Kanzleien", path: "/kanzleien" },
          ]),
          serviceSchema({
            name: "Kanzleiabsicherung für Steuerberater und Rechtsanwälte",
            description:
              "Komplettabsicherung für Kanzleien: Berufshaftpflicht, Cyber, Inhalt, Rechtsschutz und Vorsorge – mit Sonderkonditionen für DAV- und StbV-Mitglieder.",
            path: "/kanzleien",
            audience: "Steuerberater, Rechtsanwälte, Kanzleien",
          }),
          faqListSchema(kanzleiFaqs),
        )}
      />

      <PageHero
        eyebrow="Spezialgebiet Kanzleien"
        title="Komplettabsicherung für Ihre Kanzlei."
        lead="Rechtsanwältinnen, Rechtsanwälte und Steuerberatende tragen Haftungsrisiken, die man wirklich verstehen muss. Wir tun das seit Jahren – mit Sonderkonditionen für Mitglieder von DAV und StbV."
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/kontakt"
            className="group inline-flex items-center gap-2.5 rounded-md bg-white px-6 py-3.5 text-[14px] font-medium text-brand-ink transition-colors hover:bg-white/90"
          >
            Kanzlei-Check anfragen
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

      {/* Kennzahlen */}
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
          <dl className="grid grid-cols-1 gap-px bg-border sm:grid-cols-3">
            {zahlen.map((s) => (
              <div key={s.label} className="bg-background px-7 py-8">
                <dd className="display text-[clamp(1.6rem,2.6vw,2.1rem)] text-brand tabular-nums">
                  {s.value}
                </dd>
                <dt className="mt-2 text-[14px] leading-snug text-muted-foreground">
                  {s.label}
                  <span className="block text-[13px] text-muted-foreground/70">
                    {s.note}
                  </span>
                </dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Bausteine */}
      <Section
        eyebrow="Die Bausteine"
        title="Alles, was eine Kanzlei absichert"
        lead="Jede Kanzlei ist anders – die Bausteine kombinieren wir passend zu Sozietätsform, Größe und Mandatsstruktur."
      >
        <div className="mt-10 grid gap-x-14 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {kanzleiBausteine.map((b) => (
            <div key={b.title} className="border-t border-border pt-5">
              <h3 className="text-[16px] font-medium text-foreground">{b.title}</h3>
              <p className="mt-2 text-[14.5px] leading-[1.7] text-muted-foreground">
                {b.text}
              </p>
              {b.highlight && (
                <p className="mt-3 inline-block rounded bg-accent px-2.5 py-1 text-[11.5px] font-medium uppercase tracking-[0.1em] text-accent-foreground">
                  {b.highlight}
                </p>
              )}
            </div>
          ))}
        </div>
      </Section>

      {/* Case Study */}
      <Section
        tone="dark"
        eyebrow="Aus der Praxis"
        title="Acht Verträge, fünf Lücken, eine Lösung"
        lead="Komplettabsicherung einer Rechtsanwalts- und Steuerberatungsgesellschaft mit drei Standorten und rund 30 Berufsangehörigen."
      >
        <div className="mt-10 grid gap-12 lg:grid-cols-3 lg:gap-14">
          <div>
            <p className="eyebrow text-brand-bright">Ausgangslage</p>
            <ul className="mt-5 space-y-2.5">
              {caseStudy.ausgangslage.map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-[14px] leading-snug text-white/65">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-white/40" />
                  {p}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[13.5px] text-white/45">
              Acht Verträge, historisch gewachsen und zersplittert.
            </p>
          </div>

          <div>
            <p className="eyebrow text-brand-bright">Gefundene Schwachstellen</p>
            <ul className="mt-5 space-y-2.5">
              {caseStudy.schwachstellen.map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-[14px] leading-snug text-white/65">
                  <X className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-red/80" strokeWidth={2.2} />
                  {p}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow text-brand-bright">Das Ergebnis</p>
            <ul className="mt-5 space-y-2.5">
              {[
                "Aus acht Verträgen werden fünf hochwertige",
                "Auf alle Wünsche der Kanzlei zugeschnitten",
                "Rund 20 % geringerer Beitrag",
                "Bei höherwertigem Versicherungsschutz",
              ].map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-[14px] leading-snug text-white/85">
                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-bright" strokeWidth={2.5} />
                  {p}
                </li>
              ))}
            </ul>
            <blockquote className="mt-6 border-l border-brand-bright pl-4 text-[14.5px] italic leading-relaxed text-white/70">
              Nicht mir müssen die Punkte wichtig sein, sondern dem
              Versicherungsnehmer.
            </blockquote>
          </div>
        </div>
      </Section>

      {/* Ansprechpartner */}
      <Section tone="paper">
        <div className="grid items-center gap-10 lg:grid-cols-[auto_1fr] lg:gap-16">
          <Image
            src="/img/team/tim-haupt.jpg"
            alt="Tim Haupt, Inhaber und Spezialist für Firmen und Freiberufler"
            width={520}
            height={650}
            sizes="(max-width: 1024px) 60vw, 300px"
            className="mx-auto w-full max-w-[300px] rounded-lg lg:mx-0"
          />
          <div>
            <p className="eyebrow">Ihr Ansprechpartner</p>
            <h2 className="display mt-4 text-[clamp(1.65rem,2.9vw,2.35rem)] text-foreground">
              Tim Haupt
            </h2>
            <p className="mt-1.5 text-[14px] text-muted-foreground">
              Inhaber · Spezialist für Firmen und Freiberufler
            </p>
            <p className="mt-5 max-w-[36rem] text-[15.5px] leading-[1.75] text-muted-foreground">
              Die Kanzleiabsicherung ist Chefsache: Tim Haupt betreut die
              Verbandskooperationen mit DAV und StbV persönlich und kennt die
              Haftungsfragen von Sozietäten aus über hundert betreuten
              Berufsträgern.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="https://cal.com/tim-haupt"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-md bg-brand px-6 py-3.5 text-[14px] font-medium text-white transition-colors hover:bg-brand-ink"
              >
                Termin direkt buchen
                <ArrowUpRight
                  className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  strokeWidth={1.8}
                />
              </a>
              <a
                href={site.phoneHref}
                className="inline-flex items-center gap-2 rounded-md border border-border px-6 py-3.5 text-[14px] font-medium text-foreground tabular-nums transition-colors hover:border-brand"
              >
                <Phone className="h-4 w-4" strokeWidth={1.8} />
                {site.phone}
              </a>
            </div>
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section eyebrow="Häufige Fragen" title="Was Kanzleien uns fragen">
        <div className="mt-8 max-w-[52rem]">
          {kanzleiFaqs.map((f) => (
            <details key={f.q} className="group border-b border-border">
              <summary className="cursor-pointer list-none py-5 text-[16px] font-medium text-foreground [&::-webkit-details-marker]:hidden">
                {f.q}
              </summary>
              <p className="pb-5 text-[15px] leading-[1.75] text-muted-foreground">
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </Section>

      {/* Abschluss */}
      <section className="relative overflow-hidden bg-[linear-gradient(140deg,#16281a_0%,#2d5e29_46%,#3d7a3a_76%,#4c8f42_110%)] text-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_82%_18%,rgba(104,160,64,0.38),transparent_55%)]" />
        <div className="relative mx-auto max-w-[1240px] px-6 py-16 sm:py-20 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-end">
            <div>
              <p className="eyebrow text-white/65">Kostenlos und unverbindlich</p>
              <h2 className="display mt-4 text-[clamp(1.8rem,3.3vw,2.65rem)] text-white">
                Lassen Sie Ihre Verträge prüfen.
              </h2>
              <p className="mt-5 max-w-[32rem] text-[16px] leading-[1.75] text-white/75">
                Im schlechtesten Fall bestätigen wir Ihnen, dass alles passt. Im
                besten Fall sparen Sie wie in unserer Case Study rund 20 % – bei
                besserem Schutz.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Link
                href="/kontakt"
                className="group inline-flex items-center gap-2.5 rounded-md bg-white px-7 py-4 text-[14.5px] font-medium text-brand-ink transition-colors hover:bg-white/90"
              >
                Kanzlei-Check anfragen
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  strokeWidth={1.8}
                />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
