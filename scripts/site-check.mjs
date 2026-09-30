/**
 * Monatlicher Gesundheitscheck der Live-Seite.
 *
 *   node scripts/site-check.mjs            # gegen www.tim-haupt.de
 *   node scripts/site-check.mjs --json     # nur JSON, fuer das Dashboard
 *   BASE=http://localhost:3000 node scripts/site-check.mjs
 *
 * Misst, was ohne Zugangsdaten messbar ist: Erreichbarkeit und Tempo aller
 * Seiten, SEO-Grundangaben, tote Links (intern wie extern) und die
 * Kennzahlen, die im Code von Hand gepflegt werden und deshalb still
 * veralten. Traffic-Zahlen kommen aus Vercel Analytics und stehen hier
 * bewusst nicht drin.
 */

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const BASE = process.env.BASE || "https://www.tim-haupt.de";
const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const JSON_ONLY = process.argv.includes("--json");

/** Oeffentliche Routen. Bei neuer Seite hier und in sitemap.ts eintragen. */
const ROUTES = [
  "/",
  "/leistungen",
  "/kanzleien",
  "/heilberufe",
  "/cybersecurity",
  "/ueber-uns",
  "/kontakt",
  "/impressum",
  "/datenschutz",
  "/nachhaltigkeitsinformation",
];

/** Google wertet laengere Titel und Beschreibungen ab bzw. schneidet sie ab. */
const LIMITS = { title: 60, description: 160 };

const tag = (html, re) => (html.match(re)?.[1] ?? "").trim();

/**
 * Ohne Browser-Kennung liefern manche Seiten (ProvenExpert) eine abweichende
 * Fassung aus, in der die Gesamtzahlen fehlen.
 */
const UA = {
  "user-agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0 Safari/537.36",
};

async function fetchPage(url) {
  const started = Date.now();
  try {
    const res = await fetch(url, { redirect: "follow" });
    const html = await res.text();
    return { status: res.status, ms: Date.now() - started, html };
  } catch (err) {
    return { status: 0, ms: Date.now() - started, html: "", error: String(err) };
  }
}

/**
 * Soziale Netzwerke wehren Skripte grundsaetzlich ab, egal ob der Link
 * stimmt: LinkedIn antwortet mit 999, Facebook mit 400. Beide Seiten waren
 * am 30.09.2026 im Browser einwandfrei erreichbar. Nur fuer diese Hosts
 * gelten Fehlercodes als Abwehr statt als toter Link – sonst wuerde der
 * Bericht jeden Monat denselben Fehlalarm tragen. Wenn hier ein Profil
 * wirklich verschwindet, faellt es nicht auf: einmal im Jahr von Hand
 * anklicken.
 */
const BOT_ABWEHR_HOSTS = [
  "linkedin.com",
  "facebook.com",
  "instagram.com",
  "xing.com",
];

const istBotAbwehr = (url, status) =>
  status >= 400 && BOT_ABWEHR_HOSTS.some((h) => url.includes(h));

async function checkLink(url) {
  // Erst HEAD, das ist billiger; manche Server mögen es nicht, dann GET.
  for (const method of ["HEAD", "GET"]) {
    try {
      const res = await fetch(url, { method, redirect: "follow", headers: UA });
      if (res.status !== 405) return res.status;
    } catch {
      /* naechste Methode */
    }
  }
  return 0;
}

async function main() {
  const seiten = [];
  const externeLinks = new Set();
  const interneLinks = new Set();

  for (const route of ROUTES) {
    const { status, ms, html } = await fetchPage(BASE + route);
    const title = tag(html, /<title>([^<]*)<\/title>/);
    const description = tag(html, /<meta name="description" content="([^"]*)"/);
    const ogImage = /property="og:image"/.test(html);
    const canonical = tag(html, /<link rel="canonical" href="([^"]*)"/);
    const h1 = (html.match(/<h1[\s>]/g) || []).length;
    const text = html
      .replace(/<script[\s\S]*?<\/script>/g, " ")
      .replace(/<style[\s\S]*?<\/style>/g, " ")
      .replace(/<[^>]+>/g, " ");
    const woerter = text.split(/\s+/).filter((w) => w.length > 1).length;

    for (const m of html.matchAll(/href="(https?:\/\/[^"]+)"/g)) {
      const href = m[1];
      if (href.includes("tim-haupt.de")) interneLinks.add(href);
      else externeLinks.add(href);
    }
    for (const m of html.matchAll(/href="(\/[^"#]*)"/g)) {
      interneLinks.add(BASE + m[1]);
    }

    seiten.push({
      route,
      status,
      ms,
      kb: Math.round(html.length / 1024),
      title,
      titleLen: title.length,
      description,
      descriptionLen: description.length,
      canonical,
      ogImage,
      h1,
      woerter,
    });
  }

  // Links pruefen. Interne Routen sind oben schon abgedeckt, hier geht es um
  // die externen: Buchungskalender, Flixcheck-Widgets, HDI-Login, Profile.
  const links = [];
  for (const url of [...externeLinks].sort()) {
    links.push({ url, status: await checkLink(url) });
  }

  // Handgepflegte Kennzahlen aus site.ts gegen die Quelle halten.
  const siteTs = readFileSync(join(ROOT, "src/lib/site.ts"), "utf8");
  const hinterlegt = {
    rating: Number(siteTs.match(/rating:\s*([\d.]+)/)?.[1]),
    count: Number(siteTs.match(/count:\s*(\d+)/)?.[1]),
  };
  let provenExpert = { ...hinterlegt, aktuell: null };
  try {
    const res = await fetch(
      "https://www.provenexpert.com/de-de/hdi-generalvertretung-tim-haupt/",
      { headers: UA },
    );
    const html = await res.text();
    // Die Seite nennt viele Einzelbewertungen; die erste ratingValue-Angabe
    // ist die Gesamtnote, die Gesamtzahl steht nur im sichtbaren Text
    // ("208 Bewertungen") – reviewCount gehoert zu einer Teilkategorie.
    // Nachkommastelle optional, aber das Trennzeichen darf nur EINMAL
    // vorkommen – sonst frisst die Zeichenklasse das Komma der JSON-Liste mit.
    const rating = html.match(/"ratingValue"\s*:\s*"?(\d+[.,]?\d*)"?/)?.[1];
    const count = html.match(/([\d.]+)\s*Bewertungen/)?.[1];
    if (rating && count) {
      provenExpert.aktuell = {
        rating: Number(String(rating).replace(",", ".")),
        count: Number(String(count).replace(".", "")),
      };
    }
  } catch {
    /* Profil nicht erreichbar – bleibt null */
  }

  // Sitemap gegen die Routenliste halten.
  const sitemapXml = (await fetchPage(BASE + "/sitemap.xml")).html;
  const inSitemap = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) =>
    m[1].replace(BASE, "").replace(/\/$/, ""),
  );

  const bericht = {
    stand: new Date().toISOString().slice(0, 10),
    basis: BASE,
    seiten,
    tempo: {
      schnellste: Math.min(...seiten.map((s) => s.ms)),
      langsamste: Math.max(...seiten.map((s) => s.ms)),
      median: seiten.map((s) => s.ms).sort((a, b) => a - b)[
        Math.floor(seiten.length / 2)
      ],
      groessteSeiteKb: Math.max(...seiten.map((s) => s.kb)),
    },
    links: {
      geprueft: links.length,
      kaputt: links.filter(
        (l) => (l.status === 0 || l.status >= 400) && !istBotAbwehr(l.url, l.status),
      ),
      botAbwehr: links.filter((l) => istBotAbwehr(l.url, l.status)),
    },
    provenExpert,
    sitemap: {
      eintraege: inSitemap.length,
      fehlend: ROUTES.filter(
        (r) =>
          !inSitemap.includes(r === "/" ? "" : r) &&
          !["/impressum", "/datenschutz", "/nachhaltigkeitsinformation"].includes(r),
      ),
    },
    probleme: [],
  };

  for (const s of seiten) {
    if (s.status !== 200) bericht.probleme.push(`${s.route}: HTTP ${s.status}`);
    if (s.titleLen > LIMITS.title)
      bericht.probleme.push(`${s.route}: Titel ${s.titleLen} Zeichen (max ${LIMITS.title})`);
    if (!s.description)
      bericht.probleme.push(`${s.route}: keine Meta-Description`);
    else if (s.descriptionLen > LIMITS.description)
      bericht.probleme.push(
        `${s.route}: Description ${s.descriptionLen} Zeichen (max ${LIMITS.description})`,
      );
    if (s.h1 !== 1) bericht.probleme.push(`${s.route}: ${s.h1} H1-Überschriften`);
    if (!s.ogImage) bericht.probleme.push(`${s.route}: kein og:image`);
  }
  for (const l of bericht.links.kaputt)
    bericht.probleme.push(`Toter Link: ${l.url} (HTTP ${l.status})`);
  if (provenExpert.aktuell) {
    const { rating, count } = provenExpert.aktuell;
    if (rating !== hinterlegt.rating || count !== hinterlegt.count)
      bericht.probleme.push(
        `ProvenExpert im Code ${hinterlegt.rating}/${hinterlegt.count}, aktuell ${rating}/${count}`,
      );
  }

  if (JSON_ONLY) {
    console.log(JSON.stringify(bericht, null, 2));
    return;
  }

  console.log(`\nStand ${bericht.stand} – ${BASE}\n`);
  console.log("Seite                 HTTP    ms    kB  Titel  Desc  Wörter");
  for (const s of seiten) {
    console.log(
      `${s.route.padEnd(22)}${String(s.status).padEnd(6)}${String(s.ms).padStart(4)}${String(s.kb).padStart(6)}${String(s.titleLen).padStart(7)}${String(s.descriptionLen).padStart(6)}${String(s.woerter).padStart(8)}`,
    );
  }
  console.log(
    `\nLinks geprüft: ${bericht.links.geprueft}, davon kaputt: ${bericht.links.kaputt.length}`,
  );
  if (provenExpert.aktuell)
    console.log(
      `ProvenExpert: Code ${hinterlegt.rating}/${hinterlegt.count} · live ${provenExpert.aktuell.rating}/${provenExpert.aktuell.count}`,
    );
  console.log(`\nBefunde (${bericht.probleme.length}):`);
  for (const p of bericht.probleme) console.log(`  · ${p}`);
  console.log();
}

main();
