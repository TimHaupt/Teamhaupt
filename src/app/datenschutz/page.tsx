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
                <span className="text-foreground">HDI Kundenwelt</span> –
                Kundenportal der HDI
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

          {/* Die Kundenservice-Seite in Admiral verweist fuer den Datenschutz auf
              diese Seite; Stand der Angaben: Oktober 2026 (Admiral-Code,
              Superchat-AVV vom 10.07.2026). */}
          <Block title="Kundenservice-Seite und Online-Terminbuchung">
            <p>
              Unter admiral.tim-haupt.de betreiben wir unsere
              Kundenservice-Seite und die Online-Terminbuchung einzelner
              Teammitglieder. Beides läuft in unserer Agentursoftware auf
              einem Server der Hetzner Online GmbH (Industriestr. 25, 91710
              Gunzenhausen) im Rechenzentrum Nürnberg. Hetzner ist in unserem
              Auftrag tätig (Art. 28 DSGVO).
            </p>
            <p>
              Beim Aufruf verarbeitet der Server die technisch notwendigen
              Daten wie oben beschrieben (IP-Adresse, Zeitpunkt, aufgerufene
              Seite, Browser). Auf der Kundenservice-Seite zählen wir
              lediglich, wie oft die Seite aufgerufen und welcher Link
              angeklickt wird – als reine Tageszahlen,{" "}
              <span className="text-foreground">
                ohne IP-Adresse, ohne Cookies und ohne Bezug zu Ihrer Person
              </span>
              . Für die Darstellung legt die Seite technische Einstellungen im
              Speicher Ihres Browsers ab, aber keine Angaben über Sie.
              Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO.
            </p>
            <p>
              Wenn Sie online einen Termin buchen, verarbeiten wir Ihre
              Angaben aus dem Buchungsformular – Name, E-Mail-Adresse,
              Mobilnummer, Terminwunsch und, falls Sie sie machen, Ihr
              Anliegen, eine Adresse und Antworten auf Zusatzfragen – zur
              Vereinbarung und Durchführung des Termins (Art. 6 Abs. 1 lit. b
              DSGVO). Sie erhalten eine Bestätigung per E-Mail. Der Termin wird
              mit diesen Angaben in den Google-Kalender der Beraterin bzw. des
              Beraters eingetragen; dabei werden die Daten an Google Ireland
              Limited (Gordon House, Barrow Street, Dublin 4, Irland)
              übermittelt, bei Videoterminen erzeugt Google den Link zu Google
              Meet. Google kann Daten auch in den USA verarbeiten; Google LLC
              ist nach dem EU-US Data Privacy Framework zertifiziert.
            </p>
            <p>
              Wir speichern Ihre Angaben, solange sie für den Termin und Ihre
              Betreuung erforderlich sind, und löschen sie danach, soweit keine
              gesetzlichen Aufbewahrungspflichten entgegenstehen.
            </p>
          </Block>

          <Block title="Chat mit unserer digitalen Assistentin (Superchat)">
            <p>
              Auf der Kundenservice-Seite können Sie mit uns chatten. Dafür
              nutzen wir den Webchat der SuperX GmbH (Superchat), Prenzlauer
              Allee 242–247, 10405 Berlin, die in unserem Auftrag tätig ist
              (Art. 28 DSGVO).
            </p>
            <p>
              Der Chat wird{" "}
              <span className="text-foreground">
                erst geladen, wenn Sie auf „Chat starten“ klicken
              </span>
              ; vorher besteht keine Verbindung zu Superchat. Beim Start legt
              der Chat eine Sitzungs- und Kontaktkennung im Speicher Ihres
              Browsers ab, damit Ihr Gespräch fortgesetzt werden kann. Diese
              Speicherung ist für den von Ihnen angeforderten Chat
              erforderlich (§ 25 Abs. 2 Nr. 2 TDDDG).
            </p>
            <p>
              Im Chat antwortet zunächst unsere digitale Assistentin Mira –
              eine KI, kein Mensch. Ihre Antworten sind keine Beratung und keine
              Deckungszusage; verbindlich ist nur, was Ihnen unser Team
              bestätigt. Bitte teilen Sie im Chat keine Gesundheitsdaten mit.
            </p>
            <p>
              Verarbeitet werden Ihre Nachrichten, die Angaben, die Sie im Chat
              machen (zum Beispiel Name, Telefonnummer oder E-Mail-Adresse),
              und technische Verbindungsdaten. Superchat speichert die Daten bei
              Amazon Web Services in der EU. Für die Antworten der KI werden
              Nachrichten an OpenAI Ireland Ltd. (Dublin) übermittelt; die
              Abläufe der KI steuert die LangChain, Inc. (USA) mit
              Datenhaltung in Deutschland. In Ausnahmefällen können Daten in
              die USA übermittelt werden; Grundlage sind dann
              Standardvertragsklauseln der EU-Kommission oder das EU-US Data
              Privacy Framework.
            </p>
            <p>
              Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, soweit Ihre
              Anfrage einen Vertrag betrifft, im Übrigen unser berechtigtes
              Interesse an der Beantwortung Ihrer Anfrage (Art. 6 Abs. 1 lit. f
              DSGVO). Wir löschen Chatverläufe, sobald sie für die Bearbeitung
              nicht mehr erforderlich sind und keine gesetzlichen
              Aufbewahrungspflichten entgegenstehen.
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
