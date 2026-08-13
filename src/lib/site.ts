export const site = {
  name: "Tim Haupt",
  legalName: "HDI Generalvertretung Tim Haupt",
  street: "Johannesstr. 62–64",
  zip: "99084",
  city: "Erfurt",
  phone: "0361 56 53 660",
  phoneHref: "tel:+493615653660",
  /** WhatsApp-Nummer (eigene Durchwahl, vom Inhaber genannt 08/2026). */
  whatsapp: "0361 56 53 661",
  whatsappHref: "https://wa.me/493615653661",
  email: "agentur-tim-haupt@hdi.de",
  emailHref: "mailto:agentur-tim-haupt@hdi.de",
  url: "https://www.tim-haupt.de",
} as const;

export const nav = [
  { label: "Start", href: "/" },
  { label: "Leistungen", href: "/leistungen" },
  { label: "Kanzleien", href: "/kanzleien" },
  { label: "Heilberufe", href: "/heilberufe" },
  { label: "Über uns", href: "/ueber-uns" },
  { label: "Kontakt", href: "/kontakt" },
] as const;

export const openingHours = [
  { day: "Montag – Donnerstag", time: "09:00 – 18:00 Uhr" },
  { day: "Freitag", time: "09:00 – 16:00 Uhr" },
  { day: "Samstag – Sonntag", time: "Geschlossen" },
] as const;

/**
 * Kompaktform der Telefonzeiten fuer CTAs und Kacheln.
 * Haendisch synchron zu openingHours halten – die Kurzschreibweise
 * (Mo–Do statt "Montag – Donnerstag") laesst sich nicht sauber ableiten.
 */
export const phoneHoursCompact = "Mo–Do 9–18 Uhr, Fr 9–16 Uhr";

/** Zusatz zu den Oeffnungszeiten – so auf der HDI-Betreuerseite gelistet. */
export const openingHoursNote = "Sowie nach Vereinbarung";

/**
 * Social-Profile. Quelle: die eigene HDI-Betreuerseite
 * (hdi.de/betreuer/tim-haupt, Stand 08/2026). Agentur- und Inhaber-Profile
 * getrennt, damit Schema.org `sameAs` sauber zuordnen kann.
 */
export const social = {
  agentur: {
    facebook: "https://www.facebook.com/HDI.TimHaupt/",
    instagram: "https://www.instagram.com/hdierfurt/",
  },
  inhaber: {
    linkedin: "https://www.linkedin.com/in/tim-haupt/",
    xing: "https://www.xing.com/profile/Tim_Haupt4",
  },
} as const;

/** Google-Maps-Ziel der Agentur – eine Quelle fuer alle Anfahrt-Links. */
export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${site.street}, ${site.zip} ${site.city}`,
)}`;

/** Persönliche Schadenmanagerin – Durchwahl abweichend von der Zentrale. */
export const schadenmanagerin = {
  name: "Swenja-Elisè Möller",
  role: "Ihre persönliche Schadenmanagerin",
  phone: "0361 56 53 665",
  phoneHref: "tel:+493615653665",
  email: "Swenja.Moeller@hdi.de",
  emailHref: "mailto:Swenja.Moeller@hdi.de",
} as const;


export type Service = {
  slug: string;
  icon: string;
  title: string;
  tag: string;
  teaser: string;
  bullets: string[];
  featured?: boolean;
};

export const services: Service[] = [
  {
    slug: "privat",
    icon: "Home",
    title: "Privat & Familie",
    tag: "Privat",
    teaser:
      "Haftpflicht, Hausrat, Wohngebäude und mehr – clever gebündelt, damit Sie und Ihre Liebsten in jeder Situation abgesichert sind.",
    bullets: [
      "Privathaftpflicht",
      "Hausrat & Wohngebäude",
      "Rechtsschutz",
      "Unfall & Berufsunfähigkeit",
    ],
  },
  {
    slug: "unternehmen",
    icon: "Building2",
    title: "Für Ihr Unternehmen",
    tag: "Gewerbe",
    teaser:
      "Modularer Firmenschutz für kleine und mittelständische Betriebe – auf Ihre Branche und Ihren Alltag zugeschnitten.",
    bullets: [
      "Betriebshaftpflicht",
      "Inhalts- & Sachversicherung",
      "Betriebsunterbrechung",
      "Firmenrechtsschutz",
    ],
  },
  {
    slug: "vorsorge",
    icon: "TrendingUp",
    title: "Vorsorge & Zukunft",
    tag: "Vorsorge",
    teaser:
      "Wir planen Ihre Altersvorsorge renditeorientiert und flexibel – verständlich erklärt, ohne Fachchinesisch.",
    bullets: [
      "Betriebliche Altersvorsorge",
      "Private Rentenversicherung",
      "Fondspolicen & ETF-Rente",
      "Berufsunfähigkeit",
    ],
  },
  {
    slug: "kfz",
    icon: "Car",
    title: "Mobilität & Kfz",
    tag: "Mobilität",
    teaser:
      "Faire Kfz-Tarife mit schneller Schadenhilfe. Wir finden den Schutz, der zu Ihrem Fahrzeug und Budget passt.",
    bullets: ["Haftpflicht", "Teil- & Vollkasko", "Schutzbrief", "Schnelle Schadenhilfe"],
  },
  {
    slug: "gesundheit",
    icon: "HeartPulse",
    title: "Gesundheit & Zähne",
    tag: "Gesundheit",
    teaser:
      "Top-Versorgung beim Zahnarzt ohne Kostenschock – die Zahnzusatzversicherung der DKV schließt die Lücke der Kasse.",
    bullets: ["Zahnersatz & Implantate", "Kieferorthopädie", "Prophylaxe", "Krankenzusatz"],
  },
  {
    slug: "kanzleien",
    icon: "Scale",
    title: "Steuerberater & Anwälte",
    tag: "Spezialgebiet",
    featured: true,
    teaser:
      "Unser Spezialgebiet: maßgeschneiderter Schutz für Kanzleien – mit echtem Fachwissen und Sonderkonditionen für DAV- und StbV-Mitglieder.",
    bullets: [
      "Vermögensschadenhaftpflicht",
      "Büro- & Kanzleiversicherung",
      "Cyber-Schutz für Kanzleien",
      "Sonderkonditionen DAV & StbV",
    ],
  },
];

export const advantages = [
  {
    icon: "Smile",
    title: "Ein Name, keine Ticketnummer",
    text: "Sie rufen an und sprechen mit jemandem, der Ihre Verträge bereits kennt. Kein Erklären von vorn, kein Weiterverbinden.",
  },
  {
    icon: "Compass",
    title: "Beratung, die auch abrät",
    text: "Wir prüfen, was Sie wirklich brauchen. Wenn ein bestehender Vertrag gut ist, sagen wir das – auch wenn wir daran nichts verdienen.",
  },
  {
    icon: "Zap",
    title: "Im Schadensfall an Ihrer Seite",
    text: "Eine feste Schadenmanagerin mit eigener Durchwahl übernimmt Ihren Fall und bleibt dran, bis er geklärt ist.",
  },
  {
    icon: "ShieldCheck",
    title: "Konzernstärke, Agenturservice",
    text: "Im Hintergrund die Leistungsfähigkeit der HDI, im Vordergrund ein festes Team in Erfurt, das Sie beim Namen kennt.",
  },
] as const;

export const steps = [
  {
    n: "01",
    title: "Kennenlernen",
    text: "In einem unverbindlichen Gespräch hören wir zu und verstehen Ihre Situation und Wünsche.",
  },
  {
    n: "02",
    title: "Bedarf prüfen",
    text: "Wir analysieren ehrlich, was Sie wirklich brauchen – und was nicht. Transparent und nachvollziehbar.",
  },
  {
    n: "03",
    title: "Entspannt abgesichert",
    text: "Sie erhalten eine klare Empfehlung und einen festen Ansprechpartner für alles Weitere.",
  },
] as const;

/**
 * Bewertungen bei ProvenExpert.
 *
 * ACHTUNG: Diese Werte sind eine Momentaufnahme (abgerufen am 09.08.2026) und
 * aktualisieren sich nicht von selbst. Bei neuen Bewertungen hier nachziehen,
 * sonst steht auf der Seite eine veraltete Zahl – das faellt Kunden auf, die
 * dem Link folgen. Quelle: das verlinkte Profil.
 */
export const provenExpert = {
  rating: 4.89,
  count: 207,
  /** Anteil der Kunden, die weiterempfehlen – gleiche Pflegepflicht wie rating/count. */
  recommendationRate: 99,
  profileUrl:
    "https://www.provenexpert.com/de-de/hdi-generalvertretung-tim-haupt/",
} as const;

/**
 * Selfservice – Links aus dem Linktree der Agentur, hier bewusst direkt
 * eingebunden statt über den Umweg einer Fremdplattform.
 * Die Flixcheck-Widget-URLs koennen sich aendern; bei Aenderung hier pflegen.
 */
export const schadenMelden = [
  { label: "Kfz-Schaden", href: "https://api.flixcheck.com/api/v1/widget/KKdvlJLRHCuCWtcIZjpNzdIzcRCohIAf/transactions/redirect" },
  { label: "Privathaftpflicht", href: "https://api.flixcheck.com/api/v1/widget/VBejyOUQPyxETpLEizlLIjvuEsTpfhRp/transactions/redirect" },
  { label: "Hausrat", href: "https://api.flixcheck.com/api/v1/widget/VrtwApdaTKQLMsCPgwCtDgUtYruKCWNE/transactions/redirect" },
  { label: "Wohngebäude", href: "https://api.flixcheck.com/api/v1/widget/FlOLmDBjLHgEeostwaTprvNKajnzXoBI/transactions/redirect" },
  { label: "Sonstiger Schaden", href: "https://api.flixcheck.com/api/v1/widget/HOsoegHQjiHUYOqANRvYftbjwzWBBYvk/transactions/redirect" },
] as const;

export const selfservice = [
  {
    icon: "FileWarning",
    title: "Schaden melden",
    text: "Formular für Kfz, Hausrat, Haftpflicht und Gebäude – rund um die Uhr.",
    href: "#schaden",
    internal: true,
  },
  {
    icon: "PencilLine",
    title: "Daten ändern",
    text: "Neue Bankverbindung oder Anschrift in zwei Minuten mitteilen.",
    href: "https://api.flixcheck.com/api/v1/widget/qwxjBtbxUsKJKafbTaFVlRyxCjJfvRzv/transactions/redirect",
  },
  {
    icon: "LayoutDashboard",
    title: "Mein HDI",
    text: "Ihre Verträge und Dokumente im Kundenportal der HDI.",
    href: "https://www.hdi.de/mein-hdi/login",
  },
] as const;

/**
 * Team – Namen und Buchungslinks aus cal.com. Fotos und Rollen bitte
 * ergaenzen; bis dahin werden Initialen angezeigt.
 */
export type Member = {
  name: string;
  role: string;
  /** Schwerpunkt, auf der Teamseite hinter dem Pipe-Zeichen gefuehrt */
  focus?: string;
  photo: string;
  booking?: string;
  email?: string;
  phone?: string;
  /**
   * Kein Mensch. Wird auf der Karte deutlich ausgewiesen, damit niemand
   * glaubt, hier einen Menschen zu erreichen – und weil das Portraet
   * KI-generiert ist.
   */
  digital?: boolean;
};

export const team: Member[] = [
  {
    name: "Tim Haupt",
    role: "Inhaber",
    focus: "Firmen und Freiberufler",
    photo: "/img/team/tim-haupt.jpg",
    booking: "https://cal.com/tim-haupt",
  },
  {
    name: "Swenja-Elisè Möller",
    role: "Schadenmanagerin",
    focus: "Kundenservice",
    photo: "/img/team/swenja-moeller.jpg",
    booking: "https://cal.eu/swenja-elise-moller",
    email: "Swenja.Moeller@hdi.de",
    phone: "0361 56 53 665",
  },
  {
    name: "Nancy Richter",
    role: "Büroleitung",
    photo: "/img/team/nancy-richter.jpg",
  },
  {
    name: "Kathrin Severin",
    role: "Kundenberaterin",
    focus: "Heilberufe und Privatversicherungen",
    photo: "/img/team/kathrin-severin.jpg",
    booking: "https://cal.com/kathrin-letsch",
  },
  {
    name: "Lisa Lübke",
    role: "Kundenberaterin",
    focus: "Vorsorge & Privatversicherungen",
    photo: "/img/team/lisa-luebke.jpg",
    booking: "https://cal.com/Lisa.Luebke",
  },
  {
    name: "Frederic Loll",
    role: "Kundenberater",
    focus: "Vorsorge & Privatversicherungen",
    photo: "/img/team/frederic-loll.jpg",
    booking: "https://cal.com/frederic.loll",
  },
  {
    name: "Amanuel Tekeste",
    role: "Kundenberater",
    focus: "Firmen und Privatversicherungen",
    photo: "/img/team/amanuel-tekeste.jpg",
    booking: "https://cal.com/amanueltekeste",
  },
  {
    name: "Philip Schmidt",
    role: "Kundenberater",
    focus: "Privatversicherungen",
    photo: "/img/team/philip-schmidt.jpg",
  },
  {
    name: "Mira",
    role: "Digitale KI-Assistentin",
    focus: "Beantwortet Standardfragen rund um die Uhr",
    photo: "/img/team/mira.jpg",
    digital: true,
  },
];

/**
 * Anzahl der Menschen im Team – Mira ist eine KI und zaehlt nicht mit.
 * Alle sichtbaren Angaben leiten sich hiervon ab, damit beim Ausscheiden
 * einer Person nicht vier Stellen einzeln nachgezogen werden muessen.
 */
/**
 * Person aus `team` nachschlagen. Wirft beim Build, wenn der Name nicht
 * (mehr) existiert – besser ein roter Build als ein stiller toter Button.
 */
export function member(name: string): Member {
  const found = team.find((m) => m.name === name);
  if (!found) throw new Error(`Unbekanntes Teammitglied: ${name}`);
  return found;
}

/**
 * Buchungslink einer Person. Wirft, wenn sie keinen hat – Seiten, die
 * gezielt auf einen Kalender verlinken, sollen beim Build scheitern statt
 * einen Button ins Leere zu rendern.
 */
export function bookingUrl(name: string): string {
  const { booking } = member(name);
  if (!booking) throw new Error(`Kein Buchungslink für ${name} hinterlegt`);
  return booking;
}

export const teamSize = team.filter((m) => !m.digital).length;

/** Teamgroesse ausgeschrieben, fuer Fliesstext. */
export const teamSizeWord =
  ["null", "eine", "zwei", "drei", "vier", "fünf", "sechs", "sieben", "acht", "neun", "zehn"][
    teamSize
  ] ?? String(teamSize);

/**
 * Kennzahlen von tim-haupt.de übernommen (Stand: Startseite der Altsite).
 * Bei Aktualisierung bitte auch das Bezugsjahr mitpflegen – Zahlen ohne
 * Zeitbezug sind werblich angreifbar.
 *
 * Steht bewusst NACH `team`: die Teamgroesse wird daraus abgeleitet, damit
 * Kennzahl, Fliesstext und Teamraster nicht auseinanderlaufen.
 */
export const stats = [
  {
    value: "1.193.144 €",
    label: "Schäden für unsere Kunden reguliert",
    note: "im Jahr 2025",
  },
  {
    value: "5.000+",
    label: "Privat- und Firmenkunden",
    note: "vertrauen uns",
  },
  {
    value: String(teamSize),
    label: "Köpfe im Team",
    note: "IHK-Ausbildung",
  },
];

/**
 * ECHTE Kundenstimmen hier eintragen — erfundene Referenzen sind rechtlich
 * angreifbar (UWG) und zerstören genau das Vertrauen, das sie schaffen sollen.
 * Solange `quote` leer ist, blendet die Startseite die Sektion automatisch aus.
 * Für die Veröffentlichung braucht es die schriftliche Freigabe der genannten Person.
 */
export type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Tim Haupt erklärt alles wirklich super verständlich! Sogar für Leute, die nicht so viel mit Versicherungen am Hut haben.",
    name: "Tino Mangner",
    role: "Geschäftsführer, Cineblock Verkehrssicherung Hessen GmbH",
  },
];

/** Bausteine der Kanzleiabsicherung – von der Seite „Steuerberater und Rechtsanwälte". */
export type Baustein = { title: string; text: string; highlight?: string };

export const kanzleiBausteine: Baustein[] = [
  {
    title: "Berufshaftpflicht",
    text: "Ihre Expertise und das Vertrauen Ihrer Mandanten sind das Fundament der Kanzlei. Wir sichern es ab – mit Sonderkonditionen für Mitglieder von DAV und StbV.",
    highlight: "Sonderkonditionen DAV & StbV",
  },
  {
    title: "Cybersecurity",
    text: "Mandantendaten sind das sensibelste Gut einer Kanzlei. Inklusive Präventionspaket und DSGVO-Schulungen für Ihr Team.",
  },
  {
    title: "Kanzlei-Inhaltsversicherung",
    text: "Schutz für Kanzleiräume, Einrichtung, Akten und entgangene Honorare – branchenspezifisch statt von der Stange.",
  },
  {
    title: "Rechtsschutz",
    text: "Umfassender Rechtsschutz für den Kanzleibetrieb – mit exklusivem Steuerberaterrechtsschutz inklusive Strafrechtsschutz.",
  },
  {
    title: "Betriebshaftpflicht",
    text: "Schutz vor Ansprüchen, die den Kanzleibetrieb und im Ernstfall auch Ihre persönliche Existenz gefährden können.",
  },
  {
    title: "Vorsorge fürs Team",
    text: "Betriebliche Altersvorsorge und Zusatzversicherungen binden qualifizierte Mitarbeitende langfristig an Ihre Kanzlei.",
  },
];

/**
 * Bausteine der Heilberufe-Absicherung – von der Seite /heilberufe.
 * Inhalte beschreiben das Leistungsangebot der Agentur (Schwerpunkt von
 * Kathrin Severin laut Teamseite). Bewusst ohne Kennzahlen-Behauptungen –
 * anders als bei /kanzleien liegen hier keine belegten Zahlen vor.
 */
export const heilberufeBausteine: Baustein[] = [
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

/** Weitere Leistungen jenseits der sechs Hauptbereiche. */
export const weitereLeistungen = [
  "Rechtsschutzversicherung – privat und gewerblich (Privat, Beruf, Verkehr, Immobilien)",
  "Fondsanlagen",
  "Krankenzusatzversicherungen – stationär und ambulant, z. B. Brillenversicherung",
  "Pflege- und Sterbegeldversicherung",
  "Rundum-Versicherungscheck bestehender Verträge",
] as const;

/** Pflichtangaben – übernommen aus dem Impressum der bisherigen Seite. */
export const legal = {
  vermittlerNr: "D-DU96-AJJ6T-38",
  finanzanlagenNr: "D-W-145-EXTG-13",
  erlaubnisbehoerde: [
    "Stadtverwaltung Erfurt",
    "Bürgermeister-Wagner-Str. 1",
    "99084 Erfurt",
  ],
  registerbehoerde: [
    "Industrie- und Handelskammer Erfurt",
    "Arnstädter Str. 34",
    "99096 Erfurt",
  ],
  vertretene:
    "HDI Versicherung AG, HDI Global SE, HDI Global Specialty SE, HDI Lebensversicherung AG, HDI Pensionsfonds AG, HDI Pensionskasse AG sowie die Kooperationspartner ROLAND Rechtsschutz-Versicherungs-AG, ROLAND Schutzbrief-Versicherung AG, Atradius Kreditversicherung, DKV Deutsche Krankenversicherung AG und IDEAL Lebensversicherung a.G.",
  finanzanlagenHinweis:
    "Im Bereich der Finanzanlagen werden ausschließlich Vermittlungs- oder Beratungsleistungen für Produkte der Ampega Investment GmbH erbracht.",
} as const;

export const faqs = [
  {
    q: "Was kostet eine Beratung bei Ihnen?",
    a: "Nichts. Das Erstgespräch und die Bedarfsanalyse sind für Sie kostenlos und unverbindlich. Sie entscheiden danach in Ruhe, ob und was Sie abschließen möchten.",
  },
  {
    q: "Ich bin schon woanders versichert. Lohnt sich ein Wechsel?",
    a: "Das prüfen wir ehrlich für Sie. Wir schauen uns Ihre bestehenden Verträge an und sagen Ihnen offen, wo Sie gut aufgestellt sind und wo es Lücken oder Sparpotenzial gibt – auch wenn das Ergebnis lautet: Bleiben Sie, wo Sie sind.",
  },
  {
    q: "Was passiert, wenn ich einen Schaden habe?",
    a: "Sie melden sich direkt bei uns – telefonisch oder per E-Mail. Ihre persönliche Schadenmanagerin Swenja übernimmt von dort an und begleitet Sie bis zur Lösung. Kein Callcenter, keine Warteschleife.",
  },
  {
    q: "Warum sind Sie auf Kanzleien spezialisiert?",
    a: "Steuerberater und Rechtsanwälte haben besondere Haftungsrisiken, die man wirklich verstehen muss. Wir haben uns über Jahre in dieses Feld eingearbeitet und können Mitgliedern von DAV und StbV zusätzlich Sonderkonditionen anbieten.",
  },
  {
    q: "Kann ich mich auch online oder telefonisch beraten lassen?",
    a: "Selbstverständlich. Wir beraten Sie gern persönlich in Erfurt, telefonisch oder per Videocall – ganz wie es Ihnen am besten passt.",
  },
] as const;
