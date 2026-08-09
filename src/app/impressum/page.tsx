import type { Metadata } from "next";
import { PageHero } from "@/components/site/section";
import { legal, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Impressum und Pflichtangaben der HDI Generalvertretung Tim Haupt, Erfurt.",
  robots: { index: false, follow: true },
};

function Block({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-border py-9">
      <h2 className="text-[15px] font-medium text-foreground">{title}</h2>
      <div className="mt-4 space-y-3 text-[15px] leading-[1.75] text-muted-foreground">
        {children}
      </div>
    </section>
  );
}

export default function ImpressumPage() {
  return (
    <>
      <PageHero eyebrow="Rechtliches" title="Impressum" />

      <div className="bg-background">
        <div className="mx-auto max-w-[52rem] px-6 py-20 lg:px-10">
          <Block title="Anbieter">
            <p>
              {site.legalName}
              <br />
              {site.street}
              <br />
              {site.zip} {site.city}
            </p>
            <p>
              Telefon:{" "}
              <a href={site.phoneHref} className="text-brand tabular-nums">
                {site.phone}
              </a>
              <br />
              E-Mail:{" "}
              <a href={site.emailHref} className="break-all text-brand">
                {site.email}
              </a>
            </p>
          </Block>

          <Block title="Versicherungsvermittlung">
            <p>
              Gebundener Versicherungsvermittler nach § 34d Abs. 7
              Gewerbeordnung (GewO). Eingetragen in das Vermittlerregister nach
              § 34d Abs. 10 Satz 1 GewO.
            </p>
            <p>
              Registernummer:{" "}
              <span className="text-foreground">{legal.vermittlerNr}</span>
            </p>
            <p>
              <span className="text-foreground">Erlaubnisbehörde:</span>
              <br />
              {legal.erlaubnisbehoerde.join(", ")}
            </p>
            <p>
              <span className="text-foreground">Registerbehörde:</span>
              <br />
              {legal.registerbehoerde.join(", ")}
            </p>
            <p>
              Vertreten werden im Bereich der Versicherungsvermittlung
              ausschließlich die {legal.vertretene}
            </p>
          </Block>

          <Block title="Finanzanlagenvermittlung">
            <p>
              Finanzanlagenvermittler mit Erlaubnis nach § 34f Abs. 1 Satz 1
              Nr. 1 GewO. Eingetragen in das Vermittlerregister nach § 34f
              Abs. 4 und 6 GewO.
            </p>
            <p>
              Registernummer:{" "}
              <span className="text-foreground">{legal.finanzanlagenNr}</span>
            </p>
            <p>
              <span className="text-foreground">Erlaubnisbehörde:</span>
              <br />
              {legal.erlaubnisbehoerde.join(", ")}
            </p>
            <p>
              <span className="text-foreground">Registerbehörde:</span>
              <br />
              {legal.registerbehoerde.join(", ")}
            </p>
            <p>{legal.finanzanlagenHinweis}</p>
          </Block>

          <Block title="Gemeinsame Stelle nach § 11a Abs. 1 GewO">
            <p>
              Deutscher Industrie- und Handelskammertag (DIHK) e.V.
              <br />
              Breite Str. 29, 10178 Berlin
              <br />
              Tel. 0180 6 00 58 50 (20 Ct./Anruf aus dt. Festnetzen, max.
              60 Ct./Anruf aus Mobilfunknetzen)
            </p>
            <p>
              <a
                href="https://www.vermittlerregister.info"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand"
              >
                www.vermittlerregister.info
              </a>
            </p>
          </Block>

          <Block title="Schlichtungsstellen">
            <p>
              <span className="text-foreground">
                Versicherungen und Immobiliardarlehen:
              </span>
              <br />
              Versicherungsombudsmann e.V., Kronenstraße 13, 10117 Berlin
              <br />
              <a
                href="https://www.versicherungsombudsmann.de"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand"
              >
                www.versicherungsombudsmann.de
              </a>
            </p>
            <p>
              <span className="text-foreground">
                Private Kranken- und Pflegeversicherung:
              </span>
              <br />
              Ombudsmann Private Kranken- und Pflegeversicherung, Kronenstraße
              13, 10117 Berlin
              <br />
              <a
                href="https://www.pkv-ombudsmann.de"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand"
              >
                www.pkv-ombudsmann.de
              </a>
            </p>
            <p>
              <span className="text-foreground">Investmentfonds:</span>
              <br />
              Bundesverband Investment und Asset Management e.V. (BVI), Unter
              den Linden 42, 10117 Berlin
              <br />
              info@ombudsstelle-investmentfonds.de
            </p>
          </Block>

          <Block title="Haftung für Inhalte und Links">
            <p>
              Als Diensteanbieter sind wir für eigene Inhalte auf diesen Seiten
              nach den allgemeinen Gesetzen verantwortlich. Für Inhalte
              verlinkter externer Seiten ist stets deren jeweiliger Anbieter
              verantwortlich. Zum Zeitpunkt der Verlinkung waren keine
              rechtswidrigen Inhalte erkennbar.
            </p>
          </Block>

          <Block title="Bildnachweis">
            <p>
              Einige der verwendeten Bilder sind urheberrechtlich geschützte
              Werke von Fotografinnen und Fotografen, die ihre Werke über
              Bildplattformen zur Verfügung gestellt haben. Das Porträt der
              digitalen Assistentin Mira ist computergeneriert.
            </p>
          </Block>
        </div>
      </div>
    </>
  );
}
