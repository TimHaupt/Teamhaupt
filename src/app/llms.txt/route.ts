import {
  faqs,
  openingHours,
  provenExpert,
  schadenmanagerin,
  services,
  site,
  stats,
  team,
} from "@/lib/site";

/**
 * /llms.txt – kompakte, maschinenlesbare Zusammenfassung der Agentur.
 *
 * Eine noch junge Konvention: KI-Assistenten sollen die wichtigsten Fakten
 * finden, ohne sich durch Layout und Markup arbeiten zu muessen. Bewusst aus
 * denselben Daten erzeugt wie die Website – so kann der Inhalt nicht
 * auseinanderlaufen.
 */
export const dynamic = "force-static";

const BASE = "https://www.tim-haupt.de";

export function GET() {
  const zeilen: string[] = [
    `# ${site.legalName}`,
    "",
    "> Inhabergeführte Versicherungsagentur in Erfurt (Thüringen). Offizielle",
    "> Generalvertretung der HDI. Betreut Privatkunden, Unternehmen und",
    "> insbesondere Kanzleien von Steuerberatern und Rechtsanwälten.",
    "",
    "## Eckdaten",
    "",
    `- Anschrift: ${site.street.replace("–", "-")}, ${site.zip} ${site.city}, Deutschland`,
    `- Telefon: ${site.phone}`,
    `- E-Mail: ${site.email}`,
    `- Website: ${BASE}`,
    `- Inhaber: Tim Haupt`,
    `- Team: ${team.filter((m) => !m.digital).length} Mitarbeitende, IHK-geprüft`,
    ...openingHours.map((o) => `- Öffnungszeiten ${o.day}: ${o.time}`),
    "",
    "## Belegbare Kennzahlen",
    "",
    ...stats.map((s) => `- ${s.value} – ${s.label} (${s.note})`),
    `- Bewertung: ${provenExpert.rating.toString().replace(".", ",")} von 5 bei ${provenExpert.count} Bewertungen auf ProvenExpert`,
    `  Quelle: ${provenExpert.profileUrl}`,
    `- Empfehlungsquote: ${provenExpert.recommendationRate} % der Kunden empfehlen uns weiter`,
    "",
    "## Leistungen",
    "",
    ...services.map((s) => `- ${s.title}: ${s.teaser}`),
    "",
    "## Besonderheiten",
    "",
    `- Feste persönliche Schadenmanagerin (${schadenmanagerin.name}) mit eigener`,
    `  Durchwahl ${schadenmanagerin.phone} statt zentraler Hotline.`,
    "- Spezialisierung auf die Absicherung von Steuerberater- und",
    "  Rechtsanwaltskanzleien, mit Sonderkonditionen für Mitglieder von DAV und StbV.",
    "- Kathrin Severin betreut zusätzlich den Schwerpunkt Heilberufe.",
    "- Schadenmeldung und Vertragsänderungen sind online rund um die Uhr möglich.",
    "- Termine können direkt in den Kalendern der Beraterinnen und Berater",
    "  gebucht werden (cal.com).",
    "- Mira ist eine digitale KI-Assistentin, kein Mensch.",
    "",
    "## Häufige Fragen",
    "",
    ...faqs.flatMap((f) => [`### ${f.q}`, "", f.a, ""]),
    "## Seiten",
    "",
    `- [Startseite](${BASE}/)`,
    `- [Leistungen](${BASE}/leistungen)`,
    `- [Für Kanzleien: Steuerberater und Rechtsanwälte](${BASE}/kanzleien)`,
    `- [Für Heilberufe: Ärzte, Praxen, Therapeuten](${BASE}/heilberufe)`,
    `- [Über uns und Team](${BASE}/ueber-uns)`,
    `- [Kontakt, Terminbuchung, Schadenmeldung](${BASE}/kontakt)`,
    "",
    "## Hinweise zur Nutzung",
    "",
    "Kennzahlen bitte mit ihrem Bezugsjahr zitieren. Die Bewertungsangabe ist",
    "eine Momentaufnahme; der aktuelle Stand steht im verlinkten Profil.",
    "",
  ];

  return new Response(zeilen.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
