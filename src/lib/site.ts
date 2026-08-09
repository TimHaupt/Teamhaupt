export const site = {
  name: "Tim Haupt",
  legalName: "HDI Generalvertretung Tim Haupt",
  tagline: "Versicherung mit echtem Ansprechpartner.",
  street: "Johannesstr. 62–64",
  zip: "99084",
  city: "Erfurt",
  phone: "0361 56 53 660",
  phoneHref: "tel:+493615653660",
  email: "agentur-tim-haupt@hdi.de",
  emailHref: "mailto:agentur-tim-haupt@hdi.de",
  url: "https://www.tim-haupt.de",
} as const;

export const nav = [
  { label: "Start", href: "/" },
  { label: "Leistungen", href: "/leistungen" },
  { label: "Über uns", href: "/ueber-uns" },
  { label: "Kontakt", href: "/kontakt" },
] as const;

export const openingHours = [
  { day: "Montag – Donnerstag", time: "08:30 – 17:00 Uhr" },
  { day: "Freitag", time: "08:30 – 15:00 Uhr" },
  { day: "Samstag – Sonntag", time: "Geschlossen" },
] as const;

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
    title: "Ein Gesicht statt Hotline",
    text: "Sie sprechen immer mit Menschen, die Sie und Ihre Verträge kennen. Keine Warteschleife, keine wechselnden Berater.",
  },
  {
    icon: "Compass",
    title: "Ehrlich statt aufdringlich",
    text: "Wir analysieren Ihren echten Bedarf und empfehlen nur, was wirklich zu Ihnen passt – auch wenn das manchmal weniger ist.",
  },
  {
    icon: "Zap",
    title: "Schnell im Ernstfall",
    text: "Wenn etwas passiert, kümmert sich Ihre persönliche Schadenmanagerin sofort und unkompliziert um Ihren Fall.",
  },
  {
    icon: "ShieldCheck",
    title: "Stark im Rücken",
    text: "Die Sicherheit eines der größten Versicherer Europas – kombiniert mit dem Service Ihrer Agentur vor Ort.",
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
  // Beispielaufbau — bitte durch echte, freigegebene Zitate ersetzen:
  // {
  //   quote: "…",
  //   name: "Vorname Nachname",
  //   role: "Geschäftsführer, Musterfirma GmbH",
  // },
];

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
