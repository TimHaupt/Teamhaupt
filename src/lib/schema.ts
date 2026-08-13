import {
  faqs,
  openingHours,
  provenExpert,
  schadenmanagerin,
  services,
  site,
  team,
} from "@/lib/site";

/**
 * Strukturierte Daten (JSON-LD).
 *
 * Zweck ist doppelt: klassische Rich Results bei Google und Zitierfähigkeit
 * durch KI-Assistenten. Beide brauchen dieselbe Grundlage – eindeutig
 * benannte Entitäten mit Adresse, Leistungen und Belegen.
 */

const BASE = "https://www.tim-haupt.de";

/** Stabile IDs, damit die Knoten aufeinander verweisen können. */
export const ids = {
  agency: `${BASE}/#agentur`,
  owner: `${BASE}/#tim-haupt`,
  website: `${BASE}/#website`,
} as const;

/** Öffnungszeiten in das von schema.org erwartete Format übersetzen. */
function openingSpec() {
  const map: Record<string, string[]> = {
    "Montag – Donnerstag": ["Monday", "Tuesday", "Wednesday", "Thursday"],
    Freitag: ["Friday"],
  };

  return openingHours
    .filter((o) => o.time !== "Geschlossen")
    .map((o) => {
      const [opens, closes] = o.time.replace(" Uhr", "").split(" – ");
      return {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: map[o.day] ?? [],
        opens,
        closes,
      };
    });
}

export function agencySchema() {
  // Maps-Link: siehe kontakt/page.tsx ~211-224
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${site.street}, ${site.zip} ${site.city}`,
  )}`;

  return {
    "@type": "InsuranceAgency",
    "@id": ids.agency,
    name: site.legalName,
    alternateName: "Tim Haupt Versicherung Erfurt",
    url: BASE,
    logo: `${BASE}/img/logo-gruen.png`,
    image: `${BASE}/img/team-banner.jpg`,
    telephone: site.phoneHref.replace("tel:", ""),
    email: site.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.street,
      postalCode: site.zip,
      addressLocality: site.city,
      addressRegion: "Thüringen",
      addressCountry: "DE",
    },
    // Über OpenStreetMap verifiziert – nicht schätzen, falsche Koordinaten
    // schaden der lokalen Auffindbarkeit mehr als fehlende.
    geo: {
      "@type": "GeoCoordinates",
      latitude: 50.9837976,
      longitude: 11.0288257,
    },
    openingHoursSpecification: openingSpec(),
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: site.phoneHref.replace("tel:", ""),
        availableLanguage: "German",
      },
      {
        "@type": "ContactPoint",
        contactType: "claims",
        telephone: schadenmanagerin.phoneHref.replace("tel:", ""),
        availableLanguage: "German",
      },
    ],
    hasMap: mapsUrl,
    areaServed: [
      { "@type": "City", name: "Erfurt" },
      { "@type": "State", name: "Thüringen" },
      { "@type": "Country", name: "Deutschland" },
    ],
    founder: { "@id": ids.owner },
    employee: team
      .filter((m) => !m.digital)
      .map((m) => ({
        "@type": "Person",
        name: m.name,
        jobTitle: m.focus ? `${m.role} – ${m.focus}` : m.role,
      })),
    knowsAbout: [
      "Privathaftpflichtversicherung",
      "Hausratversicherung",
      "Wohngebäudeversicherung",
      "Gewerbeversicherung",
      "Betriebshaftpflicht",
      "Berufshaftpflicht für Steuerberater und Rechtsanwälte",
      "Vermögensschadenhaftpflicht",
      "Cyberversicherung",
      "Betriebliche Altersvorsorge",
      "Kfz-Versicherung",
      "Zahnzusatzversicherung",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Leistungen",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.title,
          description: s.teaser,
          url: `${BASE}/leistungen#${s.slug}`,
        },
      })),
    },
    /**
     * Bewertungen stammen von ProvenExpert, nicht von dieser Website;
     * `sameAs` verweist auf die prüfbare Quelle.
     *
     * Erwartungsmanagement: Google zeigt für Bewertungen, die ein Unternehmen
     * auf der eigenen Seite über sich selbst ausweist, in aller Regel KEINE
     * Sterne im Suchergebnis („self-serving reviews"). Die Auszeichnung ist
     * trotzdem sinnvoll – sie macht die Bewertung für KI-Assistenten und
     * andere Auswerter maschinenlesbar. Wer Sterne in der Suche will, braucht
     * ein gepflegtes Google-Unternehmensprofil.
     */
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: provenExpert.rating,
      reviewCount: provenExpert.count,
      bestRating: 5,
      worstRating: 1,
    },
    sameAs: [provenExpert.profileUrl],
  };
}

export function ownerSchema() {
  return {
    "@type": "Person",
    "@id": ids.owner,
    name: "Tim Haupt",
    jobTitle: "Inhaber der HDI Generalvertretung Erfurt",
    worksFor: { "@id": ids.agency },
    image: `${BASE}/img/team/tim-haupt.jpg`,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.city,
      addressCountry: "DE",
    },
    knowsAbout: [
      "Versicherungen für Firmen und Freiberufler",
      "Kanzleiabsicherung für Steuerberater und Rechtsanwälte",
    ],
  };
}

export function teamPersonsSchema() {
  return team
    .filter((m) => !m.digital)
    .map((m) => ({
      "@type": "Person",
      // NFD-Normalisierung: Diakritika raus, damit die Fragmente stabil
      // ASCII bleiben ("Swenja-Elisè Möller" -> "swenja-elise-moller").
      "@id": `${BASE}/#member-${m.name
        .toLowerCase()
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")}`,
      name: m.name,
      jobTitle: m.focus ? `${m.role} – ${m.focus}` : m.role,
      worksFor: { "@id": ids.agency },
      image: `${BASE}${m.photo}`,
      ...(m.focus && { knowsAbout: [m.focus] }),
    }));
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": ids.website,
    url: BASE,
    name: site.legalName,
    inLanguage: "de",
    publisher: { "@id": ids.agency },
  };
}

export function faqSchema() {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/** Zielgruppenseite als eigenständige Dienstleistung auszeichnen. */
export function serviceSchema(opts: {
  name: string;
  description: string;
  path: string;
  audience: string;
}) {
  return {
    "@type": "Service",
    "@id": `${BASE}${opts.path}#service`,
    name: opts.name,
    description: opts.description,
    url: `${BASE}${opts.path}`,
    provider: { "@id": ids.agency },
    areaServed: [
      { "@type": "City", name: "Erfurt" },
      { "@type": "State", name: "Thüringen" },
      { "@type": "Country", name: "Deutschland" },
    ],
    audience: { "@type": "Audience", audienceType: opts.audience },
  };
}

/** FAQ-Auszeichnung für seitenspezifische Fragenlisten. */
export function faqListSchema(list: { q: string; a: string }[]) {
  return {
    "@type": "FAQPage",
    mainEntity: list.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: `${BASE}${t.path}`,
    })),
  };
}

/** Mehrere Knoten in einen @graph bündeln – ein Script-Tag pro Seite genügt. */
export function graph(...nodes: object[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}
