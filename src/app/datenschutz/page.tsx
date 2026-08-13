import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/site/section";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Datenschutz",
  description:
    "Datenschutzerklärung der HDI Generalvertretung Tim Haupt, Erfurt.",
  path: "/datenschutz",
  noindex: true,
});

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

export default function DatenschutzPage() {
  return (
    <>
      <PageHero
        eyebrow="Rechtliches"
        title="Datenschutz"
        lead="Wir verarbeiten so wenige Daten wie möglich. Diese Seite erklärt, welche das sind."
      />

      <div className="bg-background">
        <div className="mx-auto max-w-[52rem] px-6 py-12 lg:px-10">
          <Block title="Verantwortlich">
            <p>
              {site.legalName}
              <br />
              {site.street}, {site.zip} {site.city}
              <br />
              <a href={site.phoneHref} className="text-brand-text tabular-nums">
                {site.phone}
              </a>
              {" · "}
              <a href={site.emailHref} className="break-all text-brand-text">
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
              Cookies zu Analyse- oder Marketingzwecken</span> ein und erstellt
              keine Nutzerprofile. Zur Verbesserung der Website werten wir
              lediglich anonyme, aggregierte Zugriffszahlen aus – Details im
              nächsten Abschnitt.
            </p>
          </Block>

          <Block title="Hosting und Reichweitenmessung (Vercel)">
            <p>
              Diese Website wird bei Vercel Inc. (440 N Barranca Ave #4133,
              Covina, CA 91723, USA) gehostet. Beim Aufruf verarbeitet Vercel
              die oben genannten technisch notwendigen Daten in unserem
              Auftrag (Art. 28 DSGVO).
            </p>
            <p>
              Zusätzlich nutzen wir Vercel Web Analytics, um zu verstehen,
              welche Seiten besucht werden und ob Kontaktwege wie Telefon,
              WhatsApp oder Terminbuchung genutzt werden. Dieses Verfahren
              arbeitet <span className="text-foreground">ohne Cookies und ohne
              seitenübergreifende Verfolgung</span>: Es werden keine
              dauerhaften Kennungen gespeichert und keine Profile gebildet;
              die Auswertung erfolgt anonym und aggregiert. Rechtsgrundlage
              ist unser berechtigtes Interesse an einer funktionierenden,
              nachvollziehbar gestalteten Website (Art. 6 Abs. 1 lit. f
              DSGVO).
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
                <span className="text-foreground">cal.com und cal.eu</span> – Terminbuchung
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
              <li>
                <span className="text-foreground">WhatsApp</span> – Kontakt
                per Chat. Erst wenn Sie den Chat selbst starten, verarbeitet
                WhatsApp (Meta Platforms Ireland Ltd.) Ihre Daten nach den
                dortigen Datenschutzhinweisen; unsere Website übermittelt
                vorher nichts.
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
