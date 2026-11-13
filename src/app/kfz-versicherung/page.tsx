import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Phone,
} from "lucide-react";
import { pageMetadata } from "@/lib/metadata";
import { Section } from "@/components/site/section";
import { CtaSection } from "@/components/site/cta-section";
import { JsonLd } from "@/components/site/json-ld";
import { ProvenExpertBadge } from "@/components/site/proven-expert";
import {
  breadcrumbSchema,
  faqListSchema,
  graph,
  serviceSchema,
} from "@/lib/schema";
import { schadenMelden, schadenmanagerin, site } from "@/lib/site";
import { Countdown } from "./countdown";

export const metadata: Metadata = pageMetadata({
  title: "Kfz-Versicherung in Erfurt",
  description:
    "Beitragsrechnung hochladen, wir rechnen gegen: Kfz-Versicherung mit festem Ansprechpartner in Erfurt. Kostenlos, unverbindlich, Wechsel bis 30.11.",
  path: "/kfz-versicherung",
});

/**
 * Eigene Produktseite fuer Kfz – bewusst KEIN Menuepunkt (Navigation waere zu
 * voll). Erreichbar ueber den Kfz-Abschnitt der Leistungsseite, die
 * Weiterleitung /deine-kfz-versicherung und die Suche.
 *
 * Preisorientiert, aber ohne Preisversprechen: Die Seite verspricht keine
 * Ersparnis, sondern die Gegenrechnung mit der eigenen Beitragsrechnung (so
 * fragt es der Admiral-Funnel ab). Die Spartipps sind allgemeine
 * Tarifmechanik. Die Zusatzbausteine stammen aus dem Funnel "kfz-daten-2026"
 * (Stand 11/2026) – aendern sie sich dort, hier nachziehen.
 */

/** Admiral-Funnel; utm trennt diese Seite von Laufband und WhatsApp-Status. */
const ANGEBOT =
  "https://admiral.tim-haupt.de/f/kfz-daten-2026?utm_source=website&utm_medium=kfz-seite&utm_campaign=kfz";

const heroSchritte = [
  "Beitragsrechnung und Fahrzeugschein fotografieren",
  "Wir rechnen Ihren Beitrag bei HDI gegen",
  "Sie bekommen eine ehrliche Antwort – auch wenn sie „bleiben“ lautet",
];

const kennzahlen = [
  { value: "1 : 1", label: "Gegenrechnung mit Ihrer Beitragsrechnung", note: "statt pauschaler Sparversprechen" },
  { value: "Wenige Min.", label: "für Ihre Daten", note: "per Foto, am Handy oder Rechner" },
  { value: "0 €", label: "für Angebot und Beratung", note: "kostenlos und unverbindlich" },
];

const sparhebel = [
  {
    title: "Jährlich statt monatlich zahlen",
    text: "Bei vielen Tarifen kostet die Ratenzahlung einen Aufschlag. Wer einmal im Jahr zahlt, spart ihn.",
  },
  {
    title: "Fahrerkreis eingrenzen",
    text: "„Nur ich“ oder „ich und mein Partner“ ist günstiger als „beliebige Fahrer“. Fährt das Kind nicht mit, muss es auch nicht mitversichert sein.",
  },
  {
    title: "Kilometer realistisch angeben",
    text: "Wer heute weniger fährt, als im Vertrag steht, zahlt für Kilometer, die es nicht gibt. Weniger Kilometer, weniger Beitrag.",
  },
  {
    title: "Selbstbeteiligung anpassen",
    text: "Wer kleine Schäden selbst trägt, zahlt spürbar weniger. Wir rechnen Ihnen die Varianten nebeneinander.",
  },
  {
    title: "Vollkasko prüfen",
    text: "Bei älteren Autos lohnt sich die Vollkasko oft nicht mehr – dann reicht die Teilkasko.",
  },
  {
    title: "Zweitwagen und SF-Klasse",
    text: "Ein Zweitwagen kann günstiger eingestuft werden, und eine gute Schadenfreiheitsklasse lässt sich unter Umständen von Partner oder Eltern übernehmen.",
  },
];

const ablauf = [
  {
    n: "01",
    title: "Daten senden",
    text: "Beitragsrechnung und Fahrzeugschein fotografieren oder die Daten eintippen. Am Handy in wenigen Minuten erledigt.",
  },
  {
    n: "02",
    title: "Wir rechnen gegen",
    text: "Wir berechnen Ihren Beitrag bei HDI mit Ihrer Schadenfreiheitsklasse und vergleichen mit dem, was Sie heute zahlen.",
  },
  {
    n: "03",
    title: "Sie entscheiden",
    text: "Sie bekommen Ihr Angebot und eine klare Einschätzung. Abgeschlossen wird erst mit Ihrem Okay – ohne Druck.",
  },
];

const schutz = [
  {
    title: "Kfz-Haftpflicht",
    tag: "Pflicht",
    text: "Zahlt, wenn Sie mit Ihrem Fahrzeug anderen einen Schaden zufügen – an Personen, Fahrzeugen oder Sachen.",
  },
  {
    title: "Teilkasko",
    tag: "Eigenes Auto",
    text: "Für Schäden, die Sie nicht selbst verursacht haben – etwa Diebstahl, Sturm und Hagel, Glasbruch oder Wildunfall.",
  },
  {
    title: "Vollkasko",
    tag: "Rundum",
    text: "Zusätzlich selbst verschuldete Unfallschäden am eigenen Auto und Vandalismus. Sinnvoll bei neueren und finanzierten Fahrzeugen.",
  },
];

/** Wählbare Zusatzbausteine laut Admiral-Funnel "kfz-daten-2026". */
const extras = [
  "Mobilitätsschutz bei Panne oder Unfall",
  "Fahrerschutz – Fahrer bis 8 Mio. € versichert",
  "Auslandsschutz",
  "Rabattschutz – ein Schaden pro Jahr frei",
  "HDI Werkstatt-Service",
  "ROLAND Verkehrsrechtsschutz",
];

const wechsel = [
  {
    title: "Zum Jahresende",
    text: "Läuft Ihr Vertrag bis zum 31.12., muss die Kündigung spätestens einen Monat vorher beim bisherigen Versicherer sein – also bis zum 30.11.",
  },
  {
    title: "Nach einer Beitragserhöhung",
    text: "Erhöht Ihr Versicherer den Beitrag, ohne dass sich der Schutz verbessert, können Sie innerhalb eines Monats nach der Mitteilung kündigen.",
  },
  {
    title: "Bei einem neuen Fahrzeug",
    text: "Für ein Auto, das Sie neu zulassen oder ummelden, wählen Sie den Versicherer frei – an jedem Tag des Jahres.",
  },
];

const kfzFaqs = [
  {
    q: "Ist HDI günstiger als mein jetziger Versicherer?",
    a: "Das hängt von Fahrzeug, Wohnort, Fahrerkreis und Schadenfreiheitsklasse ab – pauschal kann das niemand seriös sagen. Genau deshalb rechnen wir mit Ihrer Beitragsrechnung gegen. Ist Ihr jetziger Vertrag gut, sagen wir Ihnen das.",
  },
  {
    q: "Bis wann kann ich meine Kfz-Versicherung wechseln?",
    a: "Das hängt von der Fälligkeit Ihres Vertrags ab, sie steht auf Ihrer Beitragsrechnung. Läuft er bis zum 31.12., muss die Kündigung bis zum 30.11. bei Ihrem bisherigen Versicherer eingehen; bei jedem anderen Datum einen Monat vorher. Nach einer Beitragserhöhung oder bei einem neuen Fahrzeug können Sie zusätzlich unterjährig wechseln.",
  },
  {
    q: "Was brauche ich für ein Angebot?",
    a: "Am schnellsten geht es mit einem Foto Ihrer letzten Beitragsrechnung und des Fahrzeugscheins (Zulassungsbescheinigung Teil I). Dazu kommen ein paar Angaben zu Fahrern und Kilometern – alles im Formular, in wenigen Minuten.",
  },
  {
    q: "Nehme ich meinen Schadenfreiheitsrabatt mit?",
    a: "Ja. Ihre Schadenfreiheitsklasse geht beim Wechsel mit, der neue Versicherer übernimmt sie vom bisherigen.",
  },
  {
    q: "Wer kündigt meinen alten Vertrag?",
    a: "Die Kündigung schicken Sie an Ihren bisherigen Versicherer – rechtzeitig, damit sie bis zum 30.11. dort ist. Wenn Sie unsicher sind, wie das aussehen muss, helfen wir Ihnen dabei.",
  },
];

function AngebotButton({ hell = false, text = "Beitrag prüfen lassen" }) {
  return (
    <a
      href={ANGEBOT}
      className={
        hell
          ? "group inline-flex items-center justify-center gap-2.5 rounded-md bg-white px-7 py-4 text-[14.5px] font-medium text-brand-ink transition-colors hover:bg-white/90"
          : "group inline-flex items-center justify-center gap-2.5 rounded-md bg-brand px-7 py-4 text-[14.5px] font-medium text-white transition-colors hover:bg-brand-ink"
      }
    >
      {text}
      <ArrowRight
        className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
        strokeWidth={1.8}
      />
    </a>
  );
}

export default function KfzVersicherungPage() {
  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbSchema([
            { name: "Start", path: "/" },
            { name: "Leistungen", path: "/leistungen" },
            { name: "Kfz-Versicherung", path: "/kfz-versicherung" },
          ]),
          serviceSchema({
            name: "HDI Kfz-Versicherung",
            description:
              "Kfz-Haftpflicht, Teil- und Vollkasko mit wählbaren Zusatzbausteinen – Gegenrechnung zur bisherigen Beitragsrechnung und persönliche Schadenbetreuung durch die HDI Generalvertretung Tim Haupt in Erfurt.",
            path: "/kfz-versicherung",
            audience: "Privatpersonen und Selbstständige mit Pkw",
          }),
          faqListSchema(kfzFaqs),
        )}
      />

      {/* Kopf: Botschaft links, Beitrags-Check rechts */}
      <section className="relative overflow-hidden bg-brand-ink">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_75%_25%,rgba(61,122,58,0.28),transparent_60%)]" />
        <div className="relative mx-auto grid max-w-[1240px] gap-12 px-6 pb-16 pt-32 sm:pb-20 sm:pt-36 lg:grid-cols-[1.25fr_1fr] lg:items-center lg:gap-16 lg:px-10">
          <div>
            <p className="eyebrow text-brand-bright">Kfz-Versicherung · Erfurt</p>
            <h1 className="display mt-6 text-[clamp(2.1rem,4.6vw,3.5rem)] text-white">
              Zahlen Sie zu viel für Ihr Auto?
            </h1>
            <p className="mt-7 max-w-[34rem] text-[17px] leading-[1.75] text-white/65">
              Schicken Sie uns Ihre aktuelle Beitragsrechnung. Wir rechnen
              gegen und sagen Ihnen ehrlich, ob sich der Wechsel lohnt –
              kostenlos, unverbindlich und mit festem Ansprechpartner statt
              Hotline.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <AngebotButton hell />
              <a
                href={site.phoneHref}
                className="inline-flex items-center gap-2.5 rounded-md border border-white/25 px-7 py-4 text-[14.5px] font-medium text-white tabular-nums transition-colors hover:border-white/60"
              >
                <Phone className="h-4 w-4" strokeWidth={1.8} />
                {site.phone}
              </a>
            </div>
            <div className="mt-9">
              <ProvenExpertBadge tone="dark" />
            </div>
          </div>

          <div className="rounded-xl border border-white/12 bg-white/[0.04] p-7 backdrop-blur sm:p-8">
            <p className="eyebrow text-white/50">Stichtag für Verträge zum 1.1.</p>
            <p className="display mt-3 text-[clamp(2.6rem,5vw,3.6rem)] leading-none text-white tabular-nums">
              30.11.
            </p>
            <Countdown />
            <ul className="mt-7 space-y-4 border-t border-white/12 pt-7">
              {heroSchritte.map((s) => (
                <li key={s} className="flex items-start gap-3 text-[15px] leading-snug text-white/80">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-bright/20">
                    <Check className="h-3 w-3 text-brand-bright" strokeWidth={2.5} />
                  </span>
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Kennzahlen */}
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
          <dl className="grid grid-cols-1 gap-px bg-border sm:grid-cols-3">
            {kennzahlen.map((k) => (
              <div key={k.label} className="bg-background px-7 py-8">
                <dd className="display text-[clamp(1.6rem,2.6vw,2.1rem)] text-brand-text tabular-nums">
                  {k.value}
                </dd>
                <dt className="mt-2 text-[14px] leading-snug text-foreground">
                  {k.label}
                  <span className="block text-[13px] text-muted-foreground">{k.note}</span>
                </dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Sparhebel */}
      <Section
        eyebrow="Sparen"
        title="Sechs Stellen, an denen Ihr Beitrag sinken kann"
        lead="Viele Verträge laufen seit Jahren unverändert weiter – mit Angaben, die längst nicht mehr stimmen. Diese Punkte gehen wir mit Ihnen durch."
      >
        <div className="mt-10 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {sparhebel.map((s, i) => (
            <div key={s.title} className="bg-background p-7">
              <span className="display text-[15px] text-brand-text tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2.5 text-[17px] font-medium text-foreground">{s.title}</h3>
              <p className="mt-2 text-[14.5px] leading-[1.7] text-muted-foreground">{s.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
          <AngebotButton />
          <p className="text-[14px] text-muted-foreground">
            Wir rechnen alle Varianten für Sie durch.
          </p>
        </div>
      </Section>

      {/* Ablauf */}
      <Section
        tone="paper"
        eyebrow="So läuft's"
        title="Gegenrechnen in drei Schritten"
        lead="Kein Formular-Marathon und kein Rückruf aus einem Callcenter – Ihre Daten landen direkt bei uns im Büro in Erfurt."
      >
        <div className="mt-10 grid gap-x-14 gap-y-8 md:grid-cols-3">
          {ablauf.map((a) => (
            <div key={a.n} className="border-t border-border pt-5">
              <span className="display text-[15px] text-brand-text tabular-nums">{a.n}</span>
              <h3 className="mt-2.5 text-[17px] font-medium text-foreground">{a.title}</h3>
              <p className="mt-2 text-[14.5px] leading-[1.7] text-muted-foreground">{a.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Schutz + Extras */}
      <Section
        eyebrow="Der Schutz"
        title="Nur zahlen, was Sie wirklich brauchen"
        lead="Die Haftpflicht schützt die anderen, die Kasko Ihr eigenes Auto. Alles Weitere wählen Sie dazu – oder eben nicht."
      >
        <div className="mt-10 grid gap-x-14 gap-y-8 md:grid-cols-3">
          {schutz.map((s) => (
            <div key={s.title} className="border-t border-border pt-5">
              <p className="eyebrow text-brand-text">{s.tag}</p>
              <h3 className="mt-2.5 text-[17px] font-medium text-foreground">{s.title}</h3>
              <p className="mt-2 text-[14.5px] leading-[1.7] text-muted-foreground">{s.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 rounded-lg bg-muted px-7 py-7">
          <h3 className="text-[16px] font-medium text-foreground">Bausteine zum Dazuwählen</h3>
          <ul className="mt-5 flex flex-wrap gap-2.5">
            {extras.map((e) => (
              <li
                key={e}
                className="rounded-full border border-border bg-background px-4 py-2 text-[13.5px] text-foreground"
              >
                {e}
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-8 max-w-[46rem] text-[13px] leading-[1.7] text-muted-foreground">
          Kurzbeschreibung. Der genaue Leistungsumfang hängt vom gewählten Tarif
          ab; rechtsverbindlich sind die jeweils aktuellen Versicherungsbedingungen.
        </p>
      </Section>

      {/* Wechsel */}
      <Section
        tone="dark"
        eyebrow="Wechseln"
        title="Wann Sie wechseln können"
        lead="Der bekannteste Termin ist der 30.11. – aber längst nicht mehr für jeden der richtige."
      >
        {/* Marktzahl: Nafi GmbH (Höxter), berichtet in Autoflotte 15.04.2024
            und Versicherungsmagazin 16.05.2024 ("rund 31 Prozent aller
            bestehenden Verträge unterjährig"). Bei neuerer Erhebung ersetzen. */}
        <div className="mt-10 grid gap-8 rounded-lg border border-white/12 bg-white/[0.03] p-7 sm:p-8 lg:grid-cols-[auto_1fr] lg:items-center lg:gap-12">
          <div>
            <p className="display text-[clamp(2.6rem,5vw,3.6rem)] leading-none text-brand-bright tabular-nums">
              rund 31 %
            </p>
            <p className="mt-3 text-[14px] text-white/75">
              der Kfz-Verträge enden nicht mehr zum 31.12.
            </p>
            <p className="mt-1 text-[12.5px] text-white/50">
              Quelle: Marktbeobachter Nafi, 2024
            </p>
          </div>
          <p className="max-w-[38rem] text-[15.5px] leading-[1.75] text-white/70">
            Viele Versicherer verteilen die Fälligkeit inzwischen über das ganze
            Jahr. Schauen Sie deshalb auf Ihre Beitragsrechnung: Steht dort ein
            anderes Datum als der 1.1., endet Ihre Kündigungsfrist einen Monat
            vor diesem Datum. Beim Gegenrechnen prüfen wir das für Sie mit.
          </p>
        </div>
        <div className="mt-10 grid gap-x-10 gap-y-8 md:grid-cols-3">
          {wechsel.map((w) => (
            <div key={w.title} className="border-t border-white/12 pt-5">
              <h3 className="text-[17px] font-medium text-white">{w.title}</h3>
              <p className="mt-2 text-[14.5px] leading-[1.7] text-white/60">{w.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Schadenfall */}
      <Section tone="paper">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-end lg:gap-16">
          <div>
            <p className="eyebrow">Nicht nur der Preis zählt</p>
            <h2 className="display mt-4 text-[clamp(1.65rem,2.9vw,2.35rem)] text-foreground">
              Im Schadenfall eine feste Ansprechpartnerin.
            </h2>
            <p className="mt-5 max-w-[36rem] text-[15.5px] leading-[1.75] text-muted-foreground">
              Bei uns kümmert sich eine Schadenmanagerin mit eigener Durchwahl
              um Ihren Fall – so lange, bis alles geklärt ist. Melden können
              Sie den Schaden rund um die Uhr online.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
            <a
              href={schadenMelden.href}
              className="group inline-flex items-center justify-center gap-2 rounded-md border border-border bg-background px-6 py-3.5 text-[14px] font-medium text-foreground transition-colors hover:border-brand"
            >
              Schaden melden
              <ArrowUpRight
                className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                strokeWidth={1.8}
              />
            </a>
            <a
              href={schadenmanagerin.phoneHref}
              className="inline-flex items-center justify-center gap-2 rounded-md border border-border bg-background px-6 py-3.5 text-[14px] font-medium text-foreground tabular-nums transition-colors hover:border-brand"
            >
              <Phone className="h-4 w-4" strokeWidth={1.8} />
              {schadenmanagerin.phone}
            </a>
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section eyebrow="Häufige Fragen" title="Was uns zur Kfz-Versicherung gefragt wird">
        <div className="mt-8 max-w-[52rem]">
          {kfzFaqs.map((f) => (
            <details key={f.q} className="group border-b border-border">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 py-5 text-[16px] font-medium text-foreground [&::-webkit-details-marker]:hidden">
                {f.q}
                <ChevronDown
                  className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180"
                  strokeWidth={1.8}
                />
              </summary>
              <p className="pb-5 text-[15px] leading-[1.75] text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </Section>

      {/* Abschluss */}
      <CtaSection
        eyebrow="Kostenlos und unverbindlich"
        title="Lassen Sie uns gegenrechnen."
        lead={
          <>
            Beitragsrechnung hochladen, Angebot bekommen, in Ruhe entscheiden.
            Lieber persönlich? Rufen Sie uns an oder vereinbaren Sie einen
            Termin.
          </>
        }
      >
        <AngebotButton hell />
        <Link
          href="/kontakt#termin"
          className="inline-flex items-center gap-2.5 rounded-md border border-white/40 px-7 py-4 text-[14.5px] font-medium text-white transition-colors hover:border-white"
        >
          Termin vereinbaren
        </Link>
      </CtaSection>
    </>
  );
}
