import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/site/section";

export const metadata: Metadata = pageMetadata({
  title: "Nachhaltigkeitsinformation",
  description:
    "Informationen gemäß Transparenz-Verordnung zur Einbeziehung von Nachhaltigkeitsrisiken in der Versicherungsberatung der HDI Generalvertretung Tim Haupt.",
  path: "/nachhaltigkeitsinformation",
  noindex: true,
});

/**
 * Pflichtangaben nach Transparenz-Verordnung (EU) 2019/2088 fuer
 * Versicherungsvermittler. Wortlaut 1:1 uebernommen von der bisherigen
 * Website (tim-haupt.de/nachhaltigkeitsinformation, Stand 08/2026) –
 * inhaltliche AEnderungen nur nach fachlicher Freigabe des Inhabers.
 */
function Block({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-border py-6">
      <h2 className="text-[15px] font-medium text-foreground">{title}</h2>
      <div className="mt-4 space-y-3 text-[15px] leading-[1.75] text-muted-foreground">
        {children}
      </div>
    </section>
  );
}

export default function NachhaltigkeitsinformationPage() {
  return (
    <>
      <PageHero eyebrow="Rechtliches" title="Nachhaltigkeitsinformation" />

      <div className="bg-background">
        <div className="mx-auto max-w-[52rem] px-6 py-12 lg:px-10">
          <Block title="Allgemein">
            <p>
              Gemäß Transparenz-Verordnung besteht für Vermittler die
              Verpflichtung, über bestimmte Nachhaltigkeitsthemen zu
              informieren. Dieser Informationspflicht wird in den folgenden
              Absätzen nachgekommen.
            </p>
            <p>
              Unter Nachhaltigkeitsrisiken im Sinne der Transparenz-Verordnung
              sind Ereignisse oder Bedingungen in den Bereichen Umwelt,
              Soziales oder Unternehmensführung (Environment – Social –
              Governance, ESG) zu verstehen, deren Eintreten tatsächlich oder
              potenziell wesentliche negative Auswirkungen auf den Wert der
              Investition haben können.
            </p>
          </Block>

          <Block title="Informationen zu Strategien zur Einbeziehung von Nachhaltigkeitsrisiken in der Versicherungsberatung">
            <p>
              Im Bereich der Versicherungsvermittlung werden ausschließlich die
              HDI Versicherung AG, HDI Global SE, HDI Global Specialty SE, HDI
              Lebensversicherung AG, HDI Pensionsfonds AG, HDI Pensionskasse AG
              sowie die Kooperationspartner ROLAND
              Rechtsschutz-Versicherungs-AG, ROLAND Schutzbrief-Versicherung
              AG, Atradius Kreditversicherung, DKV Deutsche
              Krankenversicherung AG und IDEAL Lebensversicherung a.G
              vertreten.
            </p>
            <p>
              Der Vermittler berät auf Basis der Informationen dieser
              Versicherer und stützt seinen Rat auf deren Produkte und Tarife.
              Es werden die produkt- und unternehmensbezogenen Informationen zu
              Nachhaltigkeitsthemen der genannten Produktgeber genutzt.
            </p>
          </Block>

          <Block title="Einklang zwischen Vergütungspolitik und Einbeziehung von Nachhaltigkeitsrisiken">
            <p>
              Im Zusammenhang mit der Beratung und Vermittlung erhält der
              Vermittler eine Vergütung, die in den zu zahlenden Kundenbeträgen
              (Versicherungsprämien, Ausgabeaufschlägen, Leistungsraten)
              enthalten ist (sogenannte Provision). Nur verdiente Provisionen
              dürfen behalten werden.
            </p>
            <p>
              Die Vergütungssystematik vermeidet Steuerungsanreize, welche die
              Berücksichtigung des Kundeninteresses – und damit seiner
              Nachhaltigkeitspräferenzen – bei der Beratung beeinträchtigen
              können. Es gibt keine Geschäftspläne oder produktspezifische
              Zielvorgaben, die zu Nachhaltigkeitsrisiken oder zu einer
              Beratung entgegen Nachhaltigkeitspräferenzen führen könnten.
            </p>
          </Block>

          <Block title="Erklärung über die Berücksichtigung der wichtigsten nachteiligen Auswirkungen auf Nachhaltigkeitsfaktoren bei der Versicherungsvermittlung">
            <p>
              Bei der Versicherungsberatung berücksichtigt der Vermittler die
              wichtigsten nachteiligen Auswirkungen (Principal Adverse Impacts,
              PAI) von Investitionsentscheidungen in den vertriebenen Produkten
              auf Nachhaltigkeitsfaktoren. Unter Nachhaltigkeitsfaktoren
              versteht man: Umwelt-, Sozial- und Arbeitnehmerbelange, die
              Achtung der Menschenrechte und die Bekämpfung von Korruption und
              Bestechung. Die Berücksichtigung erfolgt auf Basis der zu den
              Finanzprodukten zur Verfügung gestellten Informationen. Dabei
              greift der Vermittler auf die Einstufung und Auswahl durch den
              jeweiligen Produktgeber zurück. Diese wiederum berücksichtigen
              bei ihren Finanzprodukten die wichtigsten nachteiligen
              Auswirkungen von Investitionsentscheidungen auf
              Nachhaltigkeitsfaktoren.
            </p>
            <p>
              Bei der Versicherungsberatung fragt der Vermittler den Kunden im
              Rahmen der Geeignetheitsprüfung nach dessen
              Nachhaltigkeitspräferenzen. Dabei unterscheidet der Vermittler
              die unterschiedlichen PAI-Indikatoren: Soziales und
              Beschäftigung, Treibhausgasemission, Wasser, Abfall und
              Biodiversität. Kunden können sämtliche oder einzelne dieser
              Indikatoren auswählen, um nachteilige Auswirkungen auf die
              Nachhaltigkeitsfaktoren bei Ihrer Investition zu
              berücksichtigen. Der Vermittler prüft sodann, ob dem Kunden ein
              seinen Nachhaltigkeitsfaktoren entsprechendes Produkt empfohlen
              werden kann. Ist dies nicht der Fall, wird der Kunde auf diesen
              Aspekt gesondert hingewiesen.
            </p>
            <p>
              Darüber hinaus legt der Vermittler besonderen Wert auf die
              Einhaltung von Organisationsanforderungen für die
              Versicherungsberatung: Der Vermittler ist vertraglich einem
              Basis-Kodex verpflichtet, der sich am Verhaltenskodex des
              Gesamtverbands der Deutschen Versicherungswirtschaft für den
              Vertrieb von Versicherungsprodukten orientiert.
            </p>
            <p>
              Allgemeine Compliance-Regelungen sind einzuhalten, insbesondere
              die strafrechtlich relevanten Regelungen zur Korruption,
              Bestechung und Bestechlichkeit sowie die wettbewerbsrechtlichen
              Vorgaben.
            </p>
            <p>
              Ziele, Wünsche und Bedürfnisse des Kunden zum Versicherungsschutz
              werden dem Anlass entsprechend ermittelt, analysiert und
              bewertet. Dies bildet die Basis jeder persönlichen und digitalen
              Beratung. Die wichtigsten Merkmale des Versicherungsproduktes –
              einschließlich der Ausschlüsse vom Versicherungsschutz – werden
              darauf aufbauend dem Kunden durch den Vermittler verständlich
              aufgezeigt.
            </p>
            <p>
              Der Vermittler hält die gesetzlichen Vorgaben zu
              Interessenkonflikten und zu Aufsichts- und Lenkungsanforderungen
              für Versicherungsvertreiber ein. Insbesondere trifft er
              angemessene Produktvertriebsvorkehrungen und prüft im
              Beratungsprozess, ob der für ein Produkt vorgesehene Zielmarkt in
              der Praxis auch gegeben ist.
            </p>
          </Block>
        </div>
      </div>
    </>
  );
}
