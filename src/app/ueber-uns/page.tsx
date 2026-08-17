import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Phone } from "lucide-react";
import { PageHero, Section } from "@/components/site/section";
import { CtaSection } from "@/components/site/cta-section";
import { JsonLd } from "@/components/site/json-ld";
import { breadcrumbSchema, graph, teamPersonsSchema } from "@/lib/schema";
import { ProvenExpertBadge } from "@/components/site/proven-expert";
import {
  openingHours,
  openingHoursNote,
  site,
  stats,
  team,
  teamSize,
} from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Über uns",
  description: `${teamSize} Köpfe mit IHK-Ausbildung in Erfurt: Das Team der HDI Generalvertretung Tim Haupt, unsere Haltung und wie wir arbeiten.`,
  path: "/ueber-uns",
});

/** Die vier Gründe – Haltung der Agentur, übernommen von tim-haupt.de. */
const gruende = [
  {
    title: "Wir sind begeistert",
    text: "Versicherungen gelten oft als notwendiges Übel. Wir sehen das anders: Mit dem richtigen Schutz lässt sich das Leben ohne Angst vor Risiken genießen. Diese Begeisterung möchten wir weitergeben.",
  },
  {
    title: "Sie sind unsere Nummer eins",
    text: "Ihre Wünsche und Bedürfnisse haben oberste Priorität. Wir wollen Ihre Erwartungen nicht erfüllen, sondern übertreffen.",
  },
  {
    title: "Wir sind unkompliziert",
    text: "Fachchinesisch, das verunsichert und in die Irre führt, vermeiden wir. Wir wollen verstanden werden – und Sie entscheiden, über welchen Kanal wir kommunizieren.",
  },
  {
    title: "Wir sind erfahren",
    text: "Jedes Teammitglied hat eine von der IHK abgenommene Ausbildung durchlaufen oder befindet sich darin. Wir bilden uns laufend fort – nach dem Motto: Stillstand ist Rückschritt.",
  },
];

export default function UeberUnsPage() {
  return (
    <>
      {/* Personen-Knoten fuers Team: bestaetigt Suchanfragen wie
          "Kathrin Severin HDI Erfurt" maschinenlesbar. */}
      <JsonLd
        data={graph(
          breadcrumbSchema([
            { name: "Start", path: "/" },
            { name: "Über uns", path: "/ueber-uns" },
          ]),
          ...teamPersonsSchema(),
        )}
      />
      <PageHero
        eyebrow="Über uns"
        title="Ihr HDI Team in Erfurt."
        lead="Ob Sie als Privat- oder Geschäftskunde nach individuellen Lösungen suchen: Wir stehen Ihnen jederzeit zur Seite – von der Kfz-Versicherung bis zur betrieblichen Altersvorsorge."
      >
        <div className="mt-10">
          <ProvenExpertBadge tone="dark" />
        </div>
      </PageHero>

      {/* Kennzahlen */}
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
          <dl className="grid grid-cols-1 gap-px bg-border sm:grid-cols-3">
            {stats.map((s) => (
              <div key={s.label} className="bg-background px-7 py-8">
                <dd className="display text-[clamp(1.6rem,2.6vw,2.1rem)] text-foreground tabular-nums">
                  {s.value}
                </dd>
                <dt className="mt-3 text-[14px] leading-snug text-muted-foreground">
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

      {/* Philosophie */}
      <Section eyebrow="Unsere Philosophie" title="Offen und ehrlich kommunizieren">
        {/* Text und Gruende zusammen in der linken Spalte, das eigene Zeichen
            als hohe Flaeche rechts daneben – so traegt das Bild die Hoehe des
            Abschnitts mit, statt darunter zu haengen. */}
        <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_minmax(0,0.62fr)] lg:gap-16">
          <div>
            <div className="space-y-5 text-[16.5px] leading-[1.8] text-muted-foreground">
            <p>
              Unsere Philosophie beruht auf offener und ehrlicher Kommunikation –
              das unterscheidet uns von vielen anderen Anbietern. Eine
              erfolgreiche Zusammenarbeit setzt eine vertrauensvolle Beziehung
              voraus. Daher setzen wir alles daran, Ihr Vertrauen zu gewinnen
              und zu bewahren.
            </p>
            <p>
              Erreichbar sind wir über viele Wege: telefonisch, per E-Mail, über
              das Kontaktformular oder direkt im Kalender Ihres Ansprechpartners.
              Sie entscheiden, was Ihnen am besten passt.
            </p>
            </div>

            <div className="mt-10 grid gap-x-12 gap-y-7 sm:grid-cols-2">
            {gruende.map((g, i) => (
              <div key={g.title} className="border-t border-border pt-6">
                <span className="display text-[14px] text-brand-text tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-[16px] font-medium text-foreground">
                  {g.title}
                </h3>
                <p className="mt-2.5 text-[14.5px] leading-[1.7] text-muted-foreground">
                  {g.text}
                </p>
              </div>
            ))}
            </div>
          </div>

          <Image
            src="/img/buero/th-logo.jpg"
            alt="Das Zeichen der Generalvertretung Tim Haupt an der Bürowand in Erfurt"
            width={1333}
            height={2000}
            // 4:5 statt 2:3: Der Ring fuellt das Original fast randlos, ein
            // staerkerer Beschnitt wuerde ihn oben und unten anschneiden.
            className="aspect-[4/5] w-full rounded-md object-cover"
            sizes="(max-width: 1024px) 100vw, 430px"
          />
        </div>
      </Section>

      {/* Team */}
      <Section
        id="team"
        tone="paper"
        eyebrow="Das Team"
        title="Menschen, keine Hotline"
        lead="Unser Team am Standort Erfurt berät Sie in unterschiedlichen Themengebieten. Buchen Sie direkt im Kalender Ihres Ansprechpartners."
      >
        <Image
          src="/img/team-banner.jpg"
          alt="Das Team der HDI Generalvertretung Tim Haupt in Erfurt"
          width={1794}
          height={700}
          sizes="(max-width: 1240px) 100vw, 1160px"
          className="mt-10 w-full rounded-lg bg-background"
        />

        <div className="mt-10 grid grid-cols-1 gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
          {team.map((m) => (
            <div key={m.name} className="flex flex-col bg-background">
              {/* Festes Seitenverhaeltnis: sonst richtet sich die Kachelhoehe
                  nach der Proportion der Bilddatei und die Rasterkacheln
                  franst bei ausgetauschten Fotos unterschiedlich hoch aus. */}
              <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                <Image
                  src={m.photo}
                  alt={
                    m.digital
                      ? `${m.name} – ${m.role} (computergeneriertes Bild)`
                      : `${m.name}, ${m.role}`
                  }
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover object-top"
                />
                {m.digital && (
                  <span className="absolute bottom-3 left-3 rounded bg-brand-ink/85 px-2.5 py-1 text-[10.5px] font-medium uppercase tracking-[0.12em] text-white backdrop-blur">
                    KI · kein Mensch
                  </span>
                )}
              </div>
              <div className="flex flex-1 flex-col px-7 py-7">
                <h3 className="text-[16.5px] font-medium text-foreground">
                  {m.name}
                </h3>
                <p className="mt-1.5 text-[14px] text-brand-text">{m.role}</p>
                {m.focus && (
                  <p className="mt-1 flex-1 text-[13.5px] leading-snug text-muted-foreground">
                    {m.focus}
                  </p>
                )}
                <div className="mt-5 flex flex-col gap-1.5">
                  {m.booking && (
                    <a
                      href={m.booking}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-1.5 text-[13.5px] text-foreground"
                    >
                      Termin buchen
                      <ArrowUpRight
                        className="h-3.5 w-3.5 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        strokeWidth={1.8}
                      />
                    </a>
                  )}
                  {m.phone && (
                    <a
                      href={`tel:${m.phone.replace(/\s/g, "")}`}
                      className="text-[13.5px] text-foreground tabular-nums"
                    >
                      {m.phone}
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Karriere */}
      <Section>
        <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
          <div>
            <p className="eyebrow">Karriere</p>
            <h2 className="display mt-5 text-[clamp(1.65rem,2.9vw,2.35rem)] text-foreground">
              Wir suchen Sie
            </h2>
            <p className="mt-6 max-w-[34rem] text-[16.5px] leading-[1.8] text-muted-foreground">
              Wir sind immer auf der Suche nach einer passenden Erweiterung für
              unser Team. Zögern Sie nicht und bewerben Sie sich – auch
              initiativ.
            </p>
            <a
              href={site.emailHref}
              className="group mt-8 inline-flex items-center gap-2.5 rounded-md bg-brand px-7 py-4 text-[14.5px] font-medium text-white transition-colors hover:bg-brand-ink"
            >
              Initiativ bewerben
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                strokeWidth={1.8}
              />
            </a>
          </div>

          <dl className="border-t border-border pt-8">
            <dt className="eyebrow">Öffnungszeiten</dt>
            <dd className="mt-6 space-y-3">
              {openingHours.map((o) => (
                <span
                  key={o.day}
                  className="flex justify-between gap-6 border-b border-border pb-3 text-[15px]"
                >
                  <span className="text-muted-foreground">{o.day}</span>
                  <span className="shrink-0 text-foreground tabular-nums">
                    {o.time}
                  </span>
                </span>
              ))}
              <span className="block text-[14px] text-muted-foreground">
                {openingHoursNote}
              </span>
            </dd>
            <p className="mt-7 text-[14.5px] leading-relaxed text-muted-foreground">
              {site.street} · {site.zip} {site.city}
              <br />
              <a href={site.phoneHref} className="text-brand-text tabular-nums">
                {site.phone}
              </a>
            </p>
          </dl>
        </div>
      </Section>

      {/* Wer bis hier gelesen hat, ist der waermste Besucher der Website –
          und bekam bisher keinen naechsten Schritt als Kunde angeboten. */}
      <CtaSection
        eyebrow="Der nächste Schritt"
        title="Lernen Sie uns persönlich kennen."
        lead="Sie wissen jetzt, wer wir sind und wie wir arbeiten. Das Erstgespräch ist kostenlos und unverbindlich – vor Ort in Erfurt, telefonisch oder per Video."
      >
        <Link
          href="/kontakt#termin"
          className="group inline-flex items-center gap-2.5 rounded-md bg-white px-7 py-4 text-[14.5px] font-medium text-brand-ink transition-colors hover:bg-white/90"
        >
          Termin vereinbaren
          <ArrowRight
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
            strokeWidth={1.8}
          />
        </Link>
        <a
          href={site.phoneHref}
          className="inline-flex items-center gap-2.5 rounded-md border border-white/30 px-7 py-4 text-[14.5px] font-medium text-white tabular-nums transition-colors hover:border-white/60"
        >
          <Phone className="h-4 w-4" strokeWidth={1.8} />
          {site.phone}
        </a>
      </CtaSection>
    </>
  );
}
