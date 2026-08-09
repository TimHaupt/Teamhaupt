import type { Metadata } from "next";
import { PageHero } from "@/components/site/section";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Datenschutz",
  description:
    "Datenschutzerklärung der HDI Generalvertretung Tim Haupt, Erfurt.",
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

export default function DatenschutzPage() {
  return (
    <>
      <PageHero
        eyebrow="Rechtliches"
        title="Datenschutz"
        lead="Wir verarbeiten so wenige Daten wie möglich. Diese Seite erklärt, welche das sind."
      />

      <div className="bg-background">
        <div className="mx-auto max-w-[52rem] px-6 py-20 lg:px-10">
          <Block title="Verantwortlich">
            <p>
              {site.legalName}
              <br />
              {site.street}, {site.zip} {site.city}
              <br />
              <a href={site.phoneHref} className="text-brand tabular-nums">
                {site.phone}
              </a>
              {" · "}
              <a href={site.emailHref} className="break-all text-brand">
                {site.email}
              </a>
            </p>
          </Block>

          <Block title="Aufruf dieser Website">
            <p>
              Beim Aufruf werden technisch notwendige Daten verarbeitet, die Ihr
              Browser automatisch übermittelt: IP-Adresse, Datum und Uhrzeit,
              aufgerufene Seite, Browsertyp und Betriebssystem. Diese
              Verarbeitung ist für die Auslieferung und Sicherheit der Seite
              erforderlich und stützt sich auf Art. 6 Abs. 1 lit. f DSGVO.
            </p>
            <p>
              Diese Website setzt <span className="text-foreground">keine
              Cookies zu Analyse- oder Marketingzwecken</span> ein. Es findet
              kein Tracking statt.
            </p>
          </Block>

          <Block title="Schriftarten">
            <p>
              Die verwendete Schrift Titillium Web wird direkt von diesem Server
              ausgeliefert. Es besteht keine Verbindung zu Google Fonts, es
              werden keine Daten an Dritte übertragen.
            </p>
          </Block>

          <Block title="Kontaktformular">
            <p>
              Das Kontaktformular auf dieser Seite überträgt Ihre Eingaben{" "}
              <span className="text-foreground">nicht an unseren Server</span>.
              Beim Absenden wird ausschließlich lokal in Ihrem Browser eine
              vorausgefüllte E-Mail erzeugt, die Sie selbst mit Ihrem
              Mailprogramm versenden. Wir erhalten Ihre Daten also erst mit
              Ihrer E-Mail.
            </p>
            <p>
              Ihre Anfrage verarbeiten wir zur Bearbeitung des Anliegens auf
              Grundlage von Art. 6 Abs. 1 lit. b bzw. lit. f DSGVO und löschen
              sie, sobald sie nicht mehr benötigt wird und keine gesetzlichen
              Aufbewahrungspflichten entgegenstehen.
            </p>
          </Block>

          <Block title="Externe Dienste, die Sie aktiv aufrufen">
            <p>
              An mehreren Stellen verlinken wir Werkzeuge, die von Dritten
              betrieben werden. Eine Datenübertragung findet erst statt, wenn
              Sie einen dieser Links anklicken. Dann gelten die
              Datenschutzhinweise des jeweiligen Anbieters:
            </p>
            <ul className="ml-5 list-disc space-y-2">
              <li>
                <span className="text-foreground">cal.com</span> – Terminbuchung
                bei einzelnen Teammitgliedern
              </li>
              <li>
                <span className="text-foreground">Flixcheck</span> –
                Schadenmeldung und Änderungsmitteilungen
              </li>
              <li>
                <span className="text-foreground">Mein HDI</span> – Kundenportal
                der HDI
              </li>
              <li>
                <span className="text-foreground">ProvenExpert</span> – unser
                Bewertungsprofil
              </li>
              <li>
                <span className="text-foreground">Google Maps</span> – Anfahrt,
                nur über den Link auf der Kontaktseite
              </li>
            </ul>
            <p>
              Karten und Bewertungssiegel sind bewusst{" "}
              <span className="text-foreground">nicht eingebettet</span>,
              sondern verlinkt, damit ohne Ihr Zutun keine Daten an diese
              Anbieter fließen.
            </p>
          </Block>

          <Block title="Ihre Rechte">
            <p>
              Sie haben das Recht auf Auskunft (Art. 15), Berichtigung
              (Art. 16), Löschung (Art. 17), Einschränkung der Verarbeitung
              (Art. 18), Datenübertragbarkeit (Art. 20) sowie ein
              Widerspruchsrecht (Art. 21 DSGVO). Wenden Sie sich dafür an die
              oben genannten Kontaktdaten.
            </p>
            <p>
              Zuständige Aufsichtsbehörde ist der Thüringer Landesbeauftragte
              für den Datenschutz und die Informationsfreiheit, Häßlerstraße 8,
              99096 Erfurt.
            </p>
          </Block>
        </div>
      </div>
    </>
  );
}
