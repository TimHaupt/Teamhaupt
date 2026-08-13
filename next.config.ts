import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Weiterleitungen der alten WordPress-URLs (Stand der wp-sitemap 08/2026).
   * Muessen VOR der Domain-Umstellung deployt sein, damit Google-Treffer und
   * externe Links nicht ins Leere laufen. permanent: true = HTTP 308, Google
   * uebertraegt das Ranking auf das neue Ziel.
   */
  async redirects() {
    return [
      // Team und Karriere
      { source: "/unser-team", destination: "/ueber-uns", permanent: true },
      { source: "/karriere", destination: "/ueber-uns", permanent: true },
      {
        source: "/kundenberater-m-w-d",
        destination: "/ueber-uns",
        permanent: true,
      },

      // Zielgruppen
      {
        source: "/steuerberater-und-rechtsanwaelte",
        destination: "/kanzleien",
        permanent: true,
      },
      {
        source: "/rechtsanwaelte-steuerberater",
        destination: "/kanzleien",
        permanent: true,
      },

      // Produkte -> Leistungsbereiche (Anker = service-Slugs)
      {
        source: "/kfz-versicherung",
        destination: "/leistungen#kfz",
        permanent: true,
      },
      {
        source: "/deine-kfz-versicherung",
        destination: "/leistungen#kfz",
        permanent: true,
      },
      {
        source: "/hdi-privatschutz",
        destination: "/leistungen#privat",
        permanent: true,
      },
      {
        source: "/copy-privatschutz",
        destination: "/leistungen#privat",
        permanent: true,
      },
      {
        source: "/cyber-security-2",
        destination: "/leistungen#unternehmen",
        permanent: true,
      },
      { source: "/hdi-compact", destination: "/leistungen", permanent: true },
      { source: "/clever-invest", destination: "/leistungen", permanent: true },

      // Termin- und Feedback-Seiten
      {
        source: "/termin-anfragen",
        destination: "/kontakt#termin",
        permanent: true,
      },
      {
        source: "/termin-kfz",
        destination: "/kontakt#termin",
        permanent: true,
      },
      { source: "/kundenbewertungen", destination: "/", permanent: true },
      { source: "/dankesseite", destination: "/", permanent: true },
      { source: "/test", destination: "/", permanent: true },

      // Blog-Reste des WordPress-Themes (Demo-Inhalte) pauschal zur Startseite
      { source: "/campaign/:slug*", destination: "/", permanent: true },
      { source: "/news-updates/:slug*", destination: "/", permanent: true },
      { source: "/uncategorized/:slug*", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
