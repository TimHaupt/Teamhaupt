import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Phone } from "lucide-react";
import { PageHero, Section } from "@/components/site/section";
import { JsonLd } from "@/components/site/json-ld";
import {
  breadcrumbSchema,
  faqListSchema,
  graph,
  serviceSchema,
} from "@/lib/schema";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Versicherung für Heilberufe – Ärzte, Praxen & Therapeuten",
  description:
    "Absicherung für Heilberufe in Erfurt und Thüringen: Berufshaftpflicht, Praxisinventar, Praxisausfall, Cyber-Schutz für Patientendaten und Vorsorge – mit fester Spezialistin als Ansprechpartnerin.",
  alternates: { canonical: "/heilberufe" },
};

/**
 * Inhalte beschreiben das Leistungsangebot der Agentur (Schwerpunkt von
 * Kathrin Letsch laut Teamseite). Bewusst ohne Kennzahlen-Behauptungen –
 * anders als bei /kanzleien liegen hier keine belegten Zahlen vor.
 */
const bausteine = [
  {
    title: "Berufshaftpflicht für Heilberufe",
    text: "Der Kern jeder Absicherung im Gesundheitswesen – abgestimmt auf Fachrichtung, Tätigkeitsumfang und Anstellungsverhältnis.",
  },
  {
    title: "Praxisinventar & Elektronik",
    text: "Behandlungseinheiten, Diagnostik und IT sind teuer. Wir sichern Einrichtung und Geräte gegen Schäden und Ausfall ab.",
  },
  {
    title: "Praxisausfall",
    text: "Wenn die Praxis stillsteht, laufen Miete und Gehälter weiter. Die Ausfallversicherung fängt den Umsatzverlust auf.",
  },
  {
    title: "Cyber-Schutz & Patientendaten",
    text: "Patientendaten gehören zu den sensibelsten Daten überhaupt. Absicherung gegen Angriffe und Datenpannen – inklusive Prävention.",
  },
  {
    title: "Berufsunfähigkeit",
    text: "Wer mit den eigenen Händen behandelt, sollte die eigene Arbeitskraft zuerst absichern – möglichst früh und passend zum Fachgebiet.",
  },
  {
    title: "Team & betriebliche Vorsorge",
    text: "Gute MFA und Pflegekräfte sind rar. Betriebliche Altersvorsorge und Zusatzleistungen helfen, Ihr Team zu halten.",
  },
];

/**
 * Realer Fall aus der Agentur (LinkedIn-Post, begleitet von Kathrin Letsch):
 * Impf-GmbH von der Gruendung bis zum zweiten Standort.
 */
const caseStudy = {
  stationen: [
    {
      n: "01",
      title: "Der Start",
      text: "Ende 2025 meldet sich ein Gründer: frisch gegründete GmbH, spezialisiert auf Reise- und Standardimpfungen. Ein Arzt auf Honorarbasis, ein gemieteter Raum in einer Praxis, geschätzter Jahresumsatz zwischen 70.000 und 120.000 Euro. Viel Energie, klare Vision – und beim Thema Versicherung erst einmal Fragezeichen: Was brauchen wir? Was ist mit dem Honorararzt? Was, wenn wir wachsen?",
    },
    {
      n: "02",
      title: "Das Wachstum",
      text: "Risikoanalyse, Fragen geklärt, Angebot erstellt – dann ging es los. Erste Ärztin angestellt, dann eine zweite, medizinische Assistenten dazu. Mit jedem Schritt neue Fragen: Was passiert, wenn jemand unterjährig ausscheidet? Wie läuft die Nachhaftung? Wird der Beitrag angepasst? Alles beantwortet, alles geregelt.",
    },
    {
      n: "03",
      title: "Standort Nummer zwei",
      text: "Keine 18 Monate später kommt die Nachricht: der zweite Standort – München. Nicht weil wir eine Police verkauft haben, sondern weil von Anfang an jemand mitgedacht hat, der versteht, was das Unternehmen vorhat. Und der mitwächst.",
    },
  ],
  zitat: "Ich freue mich, euch unseren neuen Standort mitteilen zu können.",
};

const heilberufeFaqs = [
  {
    q: "Für wen ist das Angebot gedacht?",
    a: "Für niedergelassene Ärztinnen und Ärzte, Zahnarztpraxen, Therapeutinnen und Therapeuten, Pflegedienste und andere Heilberufe – angestellt oder selbstständig. Im Erstgespräch klären wir, welche Bausteine zu Ihrer Situation passen.",
  },
  {
    q: "Wir gründen gerade erst. Lohnt sich Beratung schon vor dem Start?",
    a: "Gerade dann. Bei einer neu gegründeten Impf-GmbH haben wir von der ersten Risikoanalyse an begleitet – inklusive Fragen wie Honorarärzte, Nachhaftung und Beitragsanpassung beim Wachsen. Keine 18 Monate später eröffnete das Unternehmen seinen zweiten Standort.",
  },
  {
    q: "Wir haben bestehende Verträge. Prüfen Sie die auch?",
    a: "Ja, das ist meist der beste Einstieg. Wir gehen Ihre bestehende Absicherung durch und zeigen, wo Lücken oder Doppelungen liegen – ehrlich, auch wenn das Ergebnis lautet: alles gut so.",
  },
  {
    q: "Was kostet die Beratung?",
    a: "Nichts. Erstgespräch und Analyse sind kostenlos und unverbindlich – vor Ort in Ihrer Praxis, bei uns in Erfurt oder per Videocall.",
  },
];

export default function HeilberufePage() {
  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbSchema([
            { name: "Start", path: "/" },
            { name: "Für Heilberufe", path: "/heilberufe" },
          ]),
          serviceSchema({
            name: "Versicherung für Heilberufe",
            description:
              "Absicherung für Ärzte, Zahnärzte, Therapeuten und Pflege: Berufshaftpflicht, Praxisinventar, Praxisausfall, Cyber-Schutz und Vorsorge.",
            path: "/heilberufe",
            audience: "Ärzte, Zahnärzte, Therapeuten, Pflegedienste, Heilberufe",
          }),
          faqListSchema(heilberufeFaqs),
        )}
      />

      <PageHero
        eyebrow="Schwerpunkt Heilberufe"
        title="Sie kümmern sich um Patienten. Wir uns um den Rest."
        lead="Eine Praxis ist beides: Betrieb und Verantwortung. Wir sichern Behandlung, Räume, Daten und Ihre eigene Arbeitskraft ab – mit einer festen Spezialistin als Ansprechpartnerin."
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/kontakt"
            className="group inline-flex items-center gap-2.5 rounded-md bg-white px-6 py-3.5 text-[14px] font-medium text-brand-ink transition-colors hover:bg-white/90"
          >
            Praxis-Check anfragen
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

      {/* Bausteine */}
      <Section
        eyebrow="Die Bausteine"
        title="Was eine Praxis wirklich absichert"
        lead="Sechs Bereiche, die zusammengehören – wir kombinieren sie passend zu Fachrichtung und Praxisgröße."
      >
        <div className="mt-10 grid gap-x-14 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {bausteine.map((b) => (
            <div key={b.title} className="border-t border-border pt-5">
              <h3 className="text-[16px] font-medium text-foreground">{b.title}</h3>
              <p className="mt-2 text-[14.5px] leading-[1.7] text-muted-foreground">
                {b.text}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Case Study */}
      <Section
        tone="dark"
        eyebrow="Aus der Praxis"
        title="Von der ersten Anfrage bis zum zweiten Standort"
        lead="Ein realer Fall, begleitet von Kathrin Letsch: eine junge Impf-GmbH auf dem Weg von einem gemieteten Praxisraum zum zweiten Standort."
      >
        <div className="mt-10 grid gap-x-14 gap-y-8 md:grid-cols-3">
          {caseStudy.stationen.map((s) => (
            <div key={s.n} className="border-t border-white/12 pt-5">
              <span className="display text-[15px] text-brand-bright tabular-nums">
                {s.n}
              </span>
              <h3 className="mt-2.5 text-[17px] font-medium text-white">
                {s.title}
              </h3>
              <p className="mt-2 text-[14.5px] leading-[1.75] text-white/60">
                {s.text}
              </p>
            </div>
          ))}
        </div>

        <blockquote className="display mt-10 max-w-[38rem] border-l border-brand-bright pl-5 text-[clamp(1.15rem,1.8vw,1.45rem)] italic leading-snug text-white">
          „{caseStudy.zitat}"
        </blockquote>
        <p className="mt-3 text-[13.5px] text-white/45">
          Nachricht des Gründers, rund 18 Monate nach dem Erstgespräch
        </p>
      </Section>

      {/* Ansprechpartnerin */}
      <Section tone="paper">
        <div className="grid items-center gap-10 lg:grid-cols-[auto_1fr] lg:gap-16">
          <Image
            src="/img/team/kathrin-letsch.jpg"
            alt="Kathrin Letsch, Kundenberaterin und Spezialistin für Heilberufe"
            width={520}
            height={650}
            sizes="(max-width: 1024px) 60vw, 300px"
            className="mx-auto w-full max-w-[300px] rounded-lg lg:mx-0"
          />
          <div>
            <p className="eyebrow">Ihre Ansprechpartnerin</p>
            <h2 className="display mt-4 text-[clamp(1.65rem,2.9vw,2.35rem)] text-foreground">
              Kathrin Letsch
            </h2>
            <p className="mt-1.5 text-[14px] text-muted-foreground">
              Kundenberaterin · Spezialistin für Privatversicherungen und Heilberufe
            </p>
            <p className="mt-5 max-w-[36rem] text-[15.5px] leading-[1.75] text-muted-foreground">
              Kathrin Letsch betreut bei uns den Schwerpunkt Heilberufe – von der
              Berufshaftpflicht bis zur Absicherung der eigenen Arbeitskraft. Sie
              buchen Ihren Termin direkt in ihrem Kalender, ohne Umweg über die
              Zentrale.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="https://cal.com/kathrin-letsch"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-md bg-brand px-6 py-3.5 text-[14px] font-medium text-white transition-colors hover:bg-brand-ink"
              >
                Termin bei Kathrin Letsch buchen
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
      <Section eyebrow="Häufige Fragen" title="Was Praxen uns fragen">
        <div className="mt-8 max-w-[52rem]">
          {heilberufeFaqs.map((f) => (
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
                Reden wir über Ihre Praxis.
              </h2>
              <p className="mt-5 max-w-[32rem] text-[16px] leading-[1.75] text-white/75">
                Erstgespräch und Analyse kosten nichts – und Sie wissen danach
                genau, wo Ihre Praxis steht.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Link
                href="/kontakt"
                className="group inline-flex items-center gap-2.5 rounded-md bg-white px-7 py-4 text-[14.5px] font-medium text-brand-ink transition-colors hover:bg-white/90"
              >
                Praxis-Check anfragen
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
