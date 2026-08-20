import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, ChevronDown, Phone } from "lucide-react";
import { pageMetadata } from "@/lib/metadata";
import { PageHero, Section } from "@/components/site/section";
import { CtaSection } from "@/components/site/cta-section";
import { JsonLd } from "@/components/site/json-ld";
import {
  breadcrumbSchema,
  faqListSchema,
  graph,
  serviceSchema,
} from "@/lib/schema";
import { bookingUrl, cyberBausteine, site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Cyberversicherung für Unternehmen",
  description:
    "Cyberangriffe verständlich erklärt – und was die HDI Cyberversicherung leistet: Soforthilfe rund um die Uhr, Betriebsunterbrechung, Drittschäden und kostenfreie Prävention mit Perseus. Beratung aus Erfurt.",
  path: "/cybersecurity",
});

/**
 * Kennzahlen aus dem HDI-Material.
 * - 46 %: HDI Versicherung AG, Produktinformation Cyberversicherung
 *   (Formular 7003001125-202210), Seite 3.
 * - 90 Minuten und 24/7/365: ebenda, Seite 1 und 4.
 * Bei neuer Fassung der Unterlage prüfen.
 */
const zahlen = [
  {
    value: "46 %",
    label: "der Cyberschäden verursachen die eigenen Mitarbeitenden",
    note: "Quelle: HDI, Produktinformation Cyber 2022",
  },
  {
    value: "90 Min.",
    label: "Soforthilfe ohne Anrechnung auf den Selbstbehalt",
    note: "ab dem ersten Anruf",
  },
  {
    value: "24 / 7 / 365",
    label: "Cyberschaden-Hotline, auch beim bloßen Verdacht",
    note: "IT-Dienstleister binnen 24 Stunden vor Ort",
  },
];

/**
 * Grundlagenteil. Definitionen sinngemäß nach dem HDI Cyber-Glossar
 * (Marketing-Unterlage, Einträge Phishing, Ransomware, Business E-Mail
 * Compromise, Credential Stuffing).
 */
const angriffswege = [
  {
    n: "01",
    title: "Phishing",
    text: "Eine E-Mail führt auf eine Webseite, die das Design einer vertrauten Seite nachbaut – Bank, Portal, die eigene IT. Wer dort seine Zugangsdaten eingibt, übergibt sie dem Angreifer. Es braucht keine Sicherheitslücke, nur einen normalen Arbeitstag.",
  },
  {
    n: "02",
    title: "Ransomware",
    text: "Ein Schadprogramm verschlüsselt Daten und Systeme und gibt sie erst gegen Lösegeld wieder frei. Keine Akten, keine Termine, keine Buchhaltung – ein Angriff auf die Verfügbarkeit und damit auf den laufenden Betrieb.",
  },
  {
    n: "03",
    title: "Business E-Mail Compromise",
    text: "Gefälschte E-Mails im Namen der Geschäftsführung oder eines Geschäftspartners. Oder eine echte Rechnung, auf der nur die Bankverbindung geändert wurde. Kein technischer Angriff, sondern ein sozialer – und einer, der direkt Geld kostet.",
  },
  {
    n: "04",
    title: "Credential Stuffing",
    text: "Angreifer probieren Zugangsdaten aus fremden Datenlecks bei Ihren Diensten durch. Wer dasselbe Passwort mehrfach nutzt, ist angreifbar, obwohl im eigenen Haus nie etwas passiert ist.",
  },
];

/** Eskalationsstufen der Cyber-Erpressung, nach dem HDI Cyber-Glossar. */
const erpressungsstufen = [
  {
    stufe: "Einfach",
    text: "Eindringen, Daten verschlüsseln, Lösegeld fordern.",
  },
  {
    stufe: "Doppelt",
    text: "Zusätzlich die Drohung, die erbeuteten Daten zu veröffentlichen.",
  },
  {
    stufe: "Dreifach",
    text: "Auch Ihre Kunden, Mandanten oder Patienten werden direkt erpresst.",
  },
];

/** Ablauf eines Schadenfalls; Fristen aus dem HDI-Produktprofil und Art. 33 DSGVO. */
const ernstfall = [
  {
    zeit: "Stunde 0",
    title: "Der Betrieb steht",
    text: "Bildschirme sperren, Systeme reagieren nicht. Niemand weiß im ersten Moment, wie weit der Angriff reicht – und ob der Angreifer noch im Netz sitzt.",
  },
  {
    zeit: "Erste 90 Minuten",
    title: "Soforthilfe",
    text: "Ein Anruf bei der Cyberschaden-Hotline genügt, ein Verdacht reicht aus. Diese erste Hilfe wird nicht auf den Selbstbehalt angerechnet.",
  },
  {
    zeit: "Tag 1–3",
    title: "Forensik und Meldepflicht",
    text: "Der IT-Dienstleister klärt Hergang, Ursache und Umfang. Parallel läuft die 72-Stunden-Frist des Art. 33 DSGVO für die Meldung an die Aufsichtsbehörde.",
  },
  {
    zeit: "Ab Stunde 12",
    title: "Betriebsunterbrechung",
    text: "Nach 12 Stunden Wartezeit greift der Ersatz für entgangenen Gewinn und fortlaufende Kosten – für längstens sechs Monate.",
  },
  {
    zeit: "Wochen danach",
    title: "Ansprüche Dritter",
    text: "Kunden fordern Schadenersatz, die Aufsichtsbehörde prüft. Der Angriff ist längst vorbei, der Fall noch nicht.",
  },
];

/** Perseus-Prävention. Quelle: Produktblatt „Perseus Präventionsangebot für Cyber Awareness". */
const perseus = [
  {
    title: "Vier Kurse mit Zertifikat",
    text: "Cybersicherheit, Datenschutz, Phishing und KI – kurze Videoeinheiten mit Quiz statt Frontalschulung. Wer durch ist, bekommt ein Zertifikat.",
  },
  {
    title: "Simulierte Phishingmails",
    text: "Perseus verschickt regelmäßig täuschend echte Testmails, orientiert an aktuellen Angriffsmustern. Der Lerneffekt entsteht im Arbeitsalltag, nicht im Seminarraum.",
  },
  {
    title: "Gefahrenwarnungen in Echtzeit",
    text: "Bei relevanten Vorfällen informiert das Expertenteam per E-Mail – mit Einordnung und konkreter Handlungsempfehlung statt bloßer Meldung.",
  },
  {
    title: "IT-Sicherheits-Dashboard",
    text: "Ein regelmäßiger Outside-In-Scan prüft Ihre Domain aus der Sicht eines Angreifers auf öffentlich sichtbare Lücken und fasst das Ergebnis übersichtlich zusammen.",
  },
];

/** Zielgruppen mit den bestehenden Spezialseiten verknüpft. */
const zielgruppen = [
  {
    title: "Kanzleien",
    text: "Mandantendaten und Fristen: Ein Ausfall trifft Anwälte und Steuerberater doppelt – im Betrieb und in der Berufshaftung.",
    href: "/kanzleien",
    cta: "Zur Kanzleiabsicherung",
  },
  {
    title: "Heilberufe",
    text: "Patientendaten zählen zu den sensibelsten Daten überhaupt. Praxisausfall und Datenschutz greifen hier unmittelbar ineinander.",
    href: "/heilberufe",
    cta: "Zur Praxisabsicherung",
  },
  {
    title: "Handwerk, Handel, Mittelstand",
    text: "Warenwirtschaft, Kasse, Auftragsplanung: Wo der Betrieb digital läuft, steht er bei einem Angriff still.",
    href: "/leistungen",
    cta: "Zu den Leistungen",
  },
];

/** Selbstcheck – bewusst Fragen, keine Behauptungen. */
const selbstcheck = [
  "Wissen Sie, wann Ihr Backup zuletzt erfolgreich zurückgespielt wurde?",
  "Würden Ihre Mitarbeitenden eine gut gemachte Phishing-Mail erkennen?",
  "Ist die Anmeldung an Ihren Systemen durch einen zweiten Faktor geschützt?",
  "Wissen Sie, wen Sie am Samstagmorgen anrufen, wenn nichts mehr geht?",
  "Wie lange könnte Ihr Betrieb ohne IT weiterarbeiten – Tage oder Stunden?",
  "Wer meldet den Vorfall innerhalb von 72 Stunden an die Aufsichtsbehörde?",
];

/** Kurzdefinitionen, sinngemäß nach dem HDI Cyber-Glossar. */
const glossar = [
  {
    begriff: "Social Engineering",
    text: "Gezielte Manipulation von Menschen als Teil eines Angriffs – etwa über gefälschte Absender oder nachgebaute Webseiten.",
  },
  {
    begriff: "Pharming",
    text: "Opfer werden unbemerkt auf manipulierte Webseiten umgeleitet, um dort an Bank- oder Zugangsdaten zu kommen.",
  },
  {
    begriff: "DDoS-Angriff",
    text: "Sehr viele Rechner greifen gleichzeitig auf einen Server zu, bis der Dienst nicht mehr erreichbar ist.",
  },
  {
    begriff: "Zero-Day-Schwachstelle",
    text: "Ein Fehler in einer Software, für den es noch kein Update gibt – das Loch in der Mauer, für das der Flicken fehlt.",
  },
  {
    begriff: "Zwei-Faktor-Authentifizierung",
    text: "Anmeldung über zwei unabhängige Komponenten: Passwort plus ein Code, meist vom eigenen Smartphone.",
  },
  {
    begriff: "IT-Forensik",
    text: "Aufklärung eines Vorfalls von den Sofortmaßnahmen über die Spurensicherung bis zur Analyse von Ursache und Umfang.",
  },
  {
    begriff: "Informationssicherheitsverletzung",
    text: "Der Versicherungsfall der HDI Cyberversicherung: eine Datenschutz-, Datenvertraulichkeits- oder Netzwerksicherheitsverletzung.",
  },
  {
    begriff: "Cyber-Risiko",
    text: "Wird unterschieden in technische Risiken, menschliche Risiken und organisatorische Risiken durch fehlende Prozesse.",
  },
];

const cyberFaqs = [
  {
    q: "Wir haben eine IT-Firma. Brauchen wir trotzdem eine Cyberversicherung?",
    a: "Ja – die beiden lösen verschiedene Probleme. Ihre IT sorgt dafür, dass möglichst nichts passiert. Die Versicherung trägt die Kosten, wenn es doch passiert: Forensik, Wiederherstellung, Umsatzausfall, Rechtsberatung und Ansprüche Dritter. Ein gut gepflegtes Netzwerk senkt die Wahrscheinlichkeit, nicht die Rechnung im Ernstfall.",
  },
  {
    q: "Wir sind zu klein, um für Angreifer interessant zu sein – stimmt das?",
    a: "Nach den Zahlen der HDI werden 46 Prozent aller Cyberschäden von den eigenen Mitarbeitenden verursacht. Es braucht also gar keinen Angreifer, der sich Ihr Unternehmen ausgesucht hat. Dazu kommt: Die meisten Angriffe suchen kein Ziel aus, sondern durchsuchen automatisiert das Netz nach offenen Türen.",
  },
  {
    q: "Was gilt überhaupt als Versicherungsfall?",
    a: "Die HDI fasst das unter dem Begriff Informationssicherheitsverletzung zusammen: eine Datenschutzverletzung, eine Datenvertraulichkeitsverletzung oder eine Netzwerksicherheitsverletzung. Damit sind sowohl der Hackerangriff als auch die versehentlich falsch verschickte Datei erfasst – nicht nur der spektakuläre Fall.",
  },
  {
    q: "Wie hoch ist der Selbstbehalt – und lässt er sich senken?",
    a: "Wählbar sind 500, 1.000, 2.500 oder 5.000 Euro. Wer das kostenfreie Präventionsangebot von Perseus regelmäßig nutzt, kann ihn über die Awarenessklausel um 25 Prozent reduzieren, mit einem bestandenen Security-Baseline-Check um weitere 75 Prozent. Aus 5.000 Euro Selbstbehalt können so 0 Euro werden – und bei positivem Check verzichtet die HDI zusätzlich auf die Prüfung einer vorvertraglichen Obliegenheitsverletzung.",
  },
  {
    q: "Zahlt die Versicherung ein Lösegeld?",
    a: "Die Abwehr einer Cybererpressung ist versichert, einschließlich der damit verbundenen Kosten. Ob im Einzelfall gezahlt wird, ist keine Automatik, sondern eine Entscheidung im Krisenmanagement – wir gehen den Punkt vor Abschluss konkret durch. Wichtiger ist ohnehin: Wer zahlt, hat seine Daten damit nicht zurück, und die Erpressung geht heute oft weiter, als das Lösegeld reicht.",
  },
  {
    q: "Was bedeutet „keine Stand-der-Technik-Klausel“?",
    a: "Manche Cyberpolicen verlangen, dass Ihre IT-Sicherheit dauerhaft dem aktuellen Stand der Technik entspricht – im Schadenfall wird das dann geprüft und kann die Leistung kosten. Die HDI verzichtet nach ihrem Produktprofil auf solche versteckten Obliegenheiten. Das ist genau der Punkt, an dem sich Verträge im Ernstfall unterscheiden.",
  },
  {
    q: "Sind die privaten Geräte unserer Mitarbeitenden mitversichert?",
    a: "Ja, sofern es dazu eine vertragliche Vereinbarung zwischen Arbeitgeber und Mitarbeitenden gibt (Bring Your Own Device). Ebenfalls mitversichert sind Bedien- und Programmierfehler – also der Klassiker, dass jemand versehentlich das Falsche löscht oder einstellt.",
  },
  {
    q: "Was ist, wenn der Angriff längst läuft und wir es nur nicht wissen?",
    a: "Genau dafür gibt es die Rückwärtsdeckung: Sie gilt unbegrenzt für Informationssicherheitsverletzungen, die vor Vertragsbeginn eingetreten, aber noch nicht festgestellt worden sind. Umgekehrt haben Sie nach Vertragsende eine Nachmeldefrist von zehn Jahren.",
  },
  {
    q: "Deckt unsere Betriebshaftpflicht das nicht schon ab?",
    a: "In aller Regel nicht. Die Betriebshaftpflicht zielt auf Personen- und Sachschäden. Der typische Cyberschaden ist ein reiner Vermögensschaden – dazu kommen die eigenen Kosten für Forensik, Wiederherstellung und Ausfall, die eine Haftpflicht grundsätzlich nicht ersetzt.",
  },
  {
    q: "Was kostet eine Cyberversicherung?",
    a: "Das hängt von Umsatz, Branche, Datenbestand, Selbstbehalt und Versicherungssumme ab – eine Pauschalzahl wäre unseriös. Bis 10 Millionen Euro Umsatz läuft der Abschluss digital, darüber im Individualgeschäft. Ein Angebot bekommen Sie nach einem Gespräch über Ihre IT-Landschaft, kostenlos und unverbindlich.",
  },
];

export default function CybersecurityPage() {
  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbSchema([
            { name: "Start", path: "/" },
            { name: "Cybersecurity", path: "/cybersecurity" },
          ]),
          serviceSchema({
            name: "HDI Cyberversicherung für Firmen und Freie Berufe",
            description:
              "Absicherung gegen Cyberangriffe: Soforthilfe rund um die Uhr, IT-Forensik, Wiederherstellung, Betriebsunterbrechung und Ansprüche Dritter – mit kostenfreiem Präventionstraining von Perseus.",
            path: "/cybersecurity",
            audience: "Unternehmen, Kanzleien, Praxen, Freie Berufe",
          }),
          faqListSchema(cyberFaqs),
        )}
      />

      <PageHero
        eyebrow="Cyberschutz"
        title="Ein Klick genügt – und der Betrieb steht."
        lead="Cyberangriffe treffen längst nicht mehr nur Konzerne. Hier erklären wir zuerst, was dabei tatsächlich passiert – und danach, was die HDI Cyberversicherung davon auffängt."
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={bookingUrl("Tim Haupt")}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 rounded-md bg-white px-6 py-3.5 text-[14px] font-medium text-brand-ink transition-colors hover:bg-white/90"
          >
            Cyber-Check-Termin buchen
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              strokeWidth={1.8}
            />
          </a>
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
              <div key={s.value} className="bg-background px-7 py-8">
                <dd className="display text-[clamp(1.6rem,2.6vw,2.1rem)] text-brand-text tabular-nums">
                  {s.value}
                </dd>
                <dt className="mt-2 text-[14px] leading-snug text-muted-foreground">
                  {s.label}
                  <span className="block text-[13px] text-muted-foreground">
                    {s.note}
                  </span>
                </dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Grundlagen */}
      <Section
        eyebrow="Die Grundlagen"
        title="Wie ein Angriff wirklich beginnt"
        lead="Nicht mit einem Hacker im Kapuzenpulli, sondern mit einer E-Mail, die niemandem verdächtig vorkommt. Vier Wege, auf denen es in der Praxis passiert."
      >
        <div className="mt-10 grid gap-x-14 gap-y-8 sm:grid-cols-2">
          {angriffswege.map((a) => (
            <div key={a.title} className="border-t border-border pt-5">
              <span className="display text-[15px] text-brand-text tabular-nums">
                {a.n}
              </span>
              <h3 className="mt-2.5 text-[17px] font-medium text-foreground">
                {a.title}
              </h3>
              <p className="mt-2 text-[14.5px] leading-[1.7] text-muted-foreground">
                {a.text}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-lg bg-muted px-7 py-7">
          <h3 className="text-[16px] font-medium text-foreground">
            Erpressung hat heute drei Stufen
          </h3>
          <p className="mt-2 max-w-[46rem] text-[14.5px] leading-[1.7] text-muted-foreground">
            Wer nur an das verschlüsselte Laufwerk denkt, denkt zu kurz. Die
            Angreifer haben ihr Geschäftsmodell erweitert.
          </p>
          <dl className="mt-6 grid gap-x-12 gap-y-5 sm:grid-cols-3">
            {erpressungsstufen.map((e) => (
              <div key={e.stufe}>
                <dt className="eyebrow text-brand-text">{e.stufe}</dt>
                <dd className="mt-2 text-[14.5px] leading-[1.7] text-muted-foreground">
                  {e.text}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      {/* Ernstfall */}
      <Section
        tone="dark"
        eyebrow="Der Ernstfall"
        title="Was in den ersten Wochen passiert"
        lead="Ein Cyberschaden ist kein Moment, sondern ein Verlauf. Die Kosten entstehen an fünf verschiedenen Stellen – und keine davon lässt sich aussitzen."
      >
        <div className="mt-10 grid gap-x-10 gap-y-8 md:grid-cols-3 lg:grid-cols-5">
          {ernstfall.map((e) => (
            <div key={e.zeit} className="border-t border-white/12 pt-5">
              <span className="display text-[13.5px] text-brand-bright tabular-nums">
                {e.zeit}
              </span>
              <h3 className="mt-2.5 text-[16px] font-medium text-white">
                {e.title}
              </h3>
              <p className="mt-2 text-[14px] leading-[1.7] text-white/60">
                {e.text}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Bausteine */}
      <Section
        eyebrow="Die Bausteine"
        title="Was die HDI Cyberversicherung leistet"
        lead="Eigene Kosten, stillstehender Betrieb, Ansprüche Dritter – und die Prävention, die vorher greift. Sechs Bausteine, die zusammen den Schaden abdecken, nicht nur den Angriff."
      >
        <div className="mt-10 grid gap-x-14 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {cyberBausteine.map((b) => (
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
        {/* Pflichthinweis: Die Bausteine nennen Sublimits und Fristen im
            Klartext – ohne diesen Satz waere das eine Leistungszusage. */}
        <p className="mt-10 max-w-[46rem] text-[13px] leading-[1.7] text-muted-foreground">
          Kurzbeschreibung der versicherten Leistungen. Rechtsverbindlich ist
          ausschließlich der Wortlaut der jeweils aktuellen Bedingungen, die
          beantragt und im Versicherungsschein dokumentiert werden. Stand der
          Angaben: HDI Cyberversicherung Produktprofil 06/2024.
        </p>
      </Section>

      {/* Prävention */}
      <Section
        tone="paper"
        eyebrow="Prävention"
        title="Der Selbstbehalt, der auf null sinken kann"
        lead="Zur Cyberversicherung gehört das Präventionsangebot des HDI-Partners Perseus – kostenfrei. Wer es nutzt, senkt seinen Selbstbehalt um 25 Prozent, mit einem bestandenen Security-Baseline-Check um weitere 75 Prozent."
      >
        <div className="mt-10 grid gap-x-14 gap-y-8 sm:grid-cols-2">
          {perseus.map((p) => (
            <div key={p.title} className="border-t border-border pt-5">
              <h3 className="text-[16px] font-medium text-foreground">{p.title}</h3>
              <p className="mt-2 text-[14.5px] leading-[1.7] text-muted-foreground">
                {p.text}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-9 max-w-[46rem] border-l border-brand pl-5 text-[15px] leading-[1.75] text-muted-foreground">
          Fällt der Security-Baseline-Check positiv aus, verzichtet die HDI im
          Schadenfall zusätzlich auf die Prüfung einer vorvertraglichen
          Obliegenheitsverletzung. Aus einer Schulung für das Team wird damit
          ein handfester Vorteil im Ernstfall.
        </p>
      </Section>

      {/* Zielgruppen */}
      <Section
        tone="dark"
        eyebrow="Für wen"
        title="Wo wir das jeden Tag machen"
        lead="Cyberschutz sieht in jeder Branche anders aus – weil die Daten, die Ausfallzeiten und die Pflichten andere sind."
      >
        <div className="mt-10 grid gap-x-14 gap-y-8 lg:grid-cols-3">
          {zielgruppen.map((z) => (
            <div key={z.title} className="border-t border-white/12 pt-5">
              <h3 className="text-[17px] font-medium text-white">{z.title}</h3>
              <p className="mt-2 text-[14.5px] leading-[1.7] text-white/60">
                {z.text}
              </p>
              <Link
                href={z.href}
                className="group mt-4 inline-flex items-center gap-2 text-[14px] font-medium text-brand-bright transition-colors hover:text-white"
              >
                {z.cta}
                <ArrowRight
                  className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                  strokeWidth={1.8}
                />
              </Link>
            </div>
          ))}
        </div>
      </Section>

      {/* Selbstcheck */}
      <Section
        eyebrow="Selbstcheck"
        title="Sechs Fragen an Ihren Betrieb"
        lead="Wenn Sie bei einer Frage zögern, ist das kein Vorwurf – es ist der Normalfall. Es ist aber ein guter Grund für ein Gespräch."
      >
        <ol className="mt-10 grid gap-x-14 gap-y-6 sm:grid-cols-2">
          {selbstcheck.map((f, i) => (
            <li key={f} className="flex items-start gap-4 border-t border-border pt-5">
              <span className="display shrink-0 text-[15px] text-brand-text tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-[15px] leading-[1.7] text-muted-foreground">
                {f}
              </span>
            </li>
          ))}
        </ol>
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
              Cyberschutz ist Beratungssache: Wie Ihr Betrieb tatsächlich
              arbeitet, entscheidet über Deckungssumme, Selbstbehalt und die
              Frage, welche Bausteine Sie überhaupt brauchen. Das klären wir im
              Gespräch – kostenlos, unverbindlich und auf Wunsch bei Ihnen vor
              Ort.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={bookingUrl("Tim Haupt")}
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

      {/* FAQ + Glossar */}
      <Section eyebrow="Häufige Fragen" title="Was Unternehmen uns zum Cyberschutz fragen">
        <div className="mt-8 max-w-[52rem]">
          {cyberFaqs.map((f) => (
            <details key={f.q} className="group border-b border-border">
              <summary className="flex cursor-pointer items-center justify-between gap-3 list-none py-5 text-[16px] font-medium text-foreground [&::-webkit-details-marker]:hidden">
                {f.q}
                <ChevronDown
                  className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180"
                  strokeWidth={1.8}
                />
              </summary>
              <p className="pb-5 text-[15px] leading-[1.75] text-muted-foreground">
                {f.a}
              </p>
            </details>
          ))}
        </div>

        <div className="mt-16">
          <p className="eyebrow">Kurz erklärt</p>
          <h3 className="display mt-4 text-[clamp(1.3rem,2.2vw,1.7rem)] text-foreground">
            Die Begriffe, die im Ernstfall fallen
          </h3>
          <dl className="mt-8 grid gap-x-14 gap-y-6 sm:grid-cols-2">
            {glossar.map((g) => (
              <div key={g.begriff} className="border-t border-border pt-4">
                <dt className="text-[15px] font-medium text-foreground">
                  {g.begriff}
                </dt>
                <dd className="mt-1.5 text-[14.5px] leading-[1.7] text-muted-foreground">
                  {g.text}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      {/* Abschluss */}
      <CtaSection
        eyebrow="Kostenlos und unverbindlich"
        title="Reden wir, bevor es passiert."
        lead={
          <>
            Wir schauen uns an, wo Ihr Betrieb angreifbar ist und was ein
            Ausfall Sie tatsächlich kosten würde. Danach wissen Sie, ob sich
            eine Cyberversicherung für Sie rechnet – und in welcher Höhe.
          </>
        }
      >
        <a
          href={bookingUrl("Tim Haupt")}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2.5 rounded-md bg-white px-7 py-4 text-[14.5px] font-medium text-brand-ink transition-colors hover:bg-white/90"
        >
          Cyber-Check-Termin buchen
          <ArrowRight
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
            strokeWidth={1.8}
          />
        </a>
      </CtaSection>
    </>
  );
}
