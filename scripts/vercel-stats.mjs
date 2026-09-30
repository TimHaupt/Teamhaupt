/**
 * Holt die Web-Analytics-Zahlen des Vormonats aus der Vercel-API.
 *
 *   node scripts/vercel-stats.mjs            # Vormonat, lesbar
 *   node scripts/vercel-stats.mjs --json     # als JSON fuers Dashboard
 *   node scripts/vercel-stats.mjs 2026-09    # bestimmter Monat
 *
 * Braucht VERCEL_TOKEN in .env.local (gitignored). Der Token muss ein
 * Access Token von vercel.com/account/tokens sein, Scope TeamHaupt – ein
 * Schluessel aus dem Bereich AI Gateway authentifiziert zwar, sieht aber
 * kein Projekt.
 *
 * Endpunkt: GET /v1/query/web-analytics/visits/aggregate, Parameter `by`
 * einfach (by=day), NICHT als JSON-Array.
 * https://vercel.com/docs/analytics/web-analytics-api
 *
 * Reporting-Fenster: Hobby haelt nur einen Monat vor. Aelteres ist bei
 * Vercel nicht mehr abrufbar – deshalb sammelt das Dashboard die
 * Monatswerte selbst und ist nach einem Jahr die einzige Quelle fuer den
 * Verlauf.
 */

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const JSON_ONLY = process.argv.includes("--json");
const MONAT_ARG = process.argv.find((a) => /^\d{4}-\d{2}$/.test(a));

const PROJECT = "prj_PxJ5HWTwYRHzSpqAabMTOnL1WbuX"; // teamhaupt
const TEAM = "team_jF21kJUTCzamT9118HZkZYHA"; // TeamHaupt
const API = "https://api.vercel.com/v1/query/web-analytics";

function token() {
  let roh = "";
  try {
    roh = readFileSync(join(ROOT, ".env.local"), "utf8");
  } catch {
    fehler("Datei .env.local fehlt. Lege sie an und trage VERCEL_TOKEN ein.");
  }
  const t = roh.match(/^\s*VERCEL_TOKEN\s*=\s*(.+)$/m)?.[1]?.trim();
  if (!t) fehler("VERCEL_TOKEN ist in .env.local nicht gesetzt.");
  return t;
}

function fehler(text) {
  console.error("\n" + text + "\n");
  process.exit(1);
}

/** Erster und letzter Tag des Monats, Vormonat als Standard. */
function zeitraum() {
  const heute = new Date();
  const [j, m] = MONAT_ARG
    ? MONAT_ARG.split("-").map(Number)
    : [heute.getUTCMonth() === 0 ? heute.getUTCFullYear() - 1 : heute.getUTCFullYear(),
       heute.getUTCMonth() === 0 ? 12 : heute.getUTCMonth()];
  const seit = new Date(Date.UTC(j, m - 1, 1));
  const bis = new Date(Date.UTC(j, m, 0)); // letzter Tag des Monats
  return {
    id: `${j}-${String(m).padStart(2, "0")}`,
    since: seit.toISOString().slice(0, 10),
    until: bis.toISOString().slice(0, 10),
  };
}

async function frage(pfad, params, tok) {
  const url = new URL(`${API}/${pfad}`);
  url.searchParams.set("projectId", PROJECT);
  url.searchParams.set("teamId", TEAM);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);

  const res = await fetch(url, { headers: { Authorization: `Bearer ${tok}` } });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    // payment_required ist kein Fehler im Skript, sondern eine Planfrage.
    return { fehlercode: body?.error?.code || String(res.status), nachricht: body?.error?.message };
  }
  return body;
}

const liste = (antwort, feld) =>
  (antwort.data || []).map((r) => ({
    name: r[feld] ?? null,
    besucher: r.visitors ?? 0,
    aufrufe: r.pageviews ?? 0,
  }));

async function main() {
  const tok = token();
  const { id, since, until } = zeitraum();
  const p = { since, until };

  const gesamt = await frage("visits/aggregate", { ...p, by: "month" }, tok);
  if (gesamt.fehlercode === "forbidden" || gesamt.fehlercode === "401") {
    fehler(`Vercel lehnt den Token ab (${gesamt.fehlercode}). Neuen Access Token unter vercel.com/account/tokens anlegen, Scope TeamHaupt.`);
  }

  const [seiten, herkunft, geraete, laender, events] = await Promise.all([
    frage("visits/aggregate", { ...p, by: "requestPath", limit: 15 }, tok),
    frage("visits/aggregate", { ...p, by: "referrerHostname", limit: 10 }, tok),
    frage("visits/aggregate", { ...p, by: "deviceType", limit: 5 }, tok),
    frage("visits/aggregate", { ...p, by: "country", limit: 8 }, tok),
    frage("events/aggregate", { ...p, by: "eventName", limit: 10 }, tok),
  ]);

  const summe = (gesamt.data || [])[0] || {};
  const eventsGesperrt = events.fehlercode === "payment_required";

  const traffic = {
    besucher: summe.visitors ?? 0,
    aufrufe: summe.pageviews ?? 0,
    topSeiten: liste(seiten, "requestPath"),
    herkunft: liste(herkunft, "referrerHostname"),
    geraete: liste(geraete, "deviceType"),
    laender: liste(laender, "country"),
    // Conversion-Events (anruf_klick, buchung_klick, formular_gesendet)
    // sammelt Vercel erst ab dem Pro-Plan. Auf Hobby bleibt das leer,
    // obwohl der Code auf der Seite sie sendet.
    events: eventsGesperrt ? null : liste(events, "eventName"),
    eventsHinweis: eventsGesperrt ? "Custom Events erfordern den Pro-Plan" : null,
  };

  if (JSON_ONLY) {
    console.log(JSON.stringify({ monat: id, zeitraum: { since, until }, traffic }, null, 2));
    return;
  }

  console.log(`\nVercel Web Analytics – ${id} (${since} bis ${until})\n`);
  console.log(`  Besucher      ${traffic.besucher}`);
  console.log(`  Seitenaufrufe ${traffic.aufrufe}\n`);
  console.log("  Meistbesucht:");
  for (const s of traffic.topSeiten.slice(0, 8)) console.log(`    ${String(s.name).padEnd(30)} ${String(s.besucher).padStart(4)}`);
  console.log("\n  Herkunft:");
  for (const h of traffic.herkunft.slice(0, 6)) console.log(`    ${String(h.name ?? "direkt").padEnd(30)} ${String(h.besucher).padStart(4)}`);
  console.log("\n  Geräte:");
  for (const g of traffic.geraete) console.log(`    ${String(g.name || "unbekannt").padEnd(30)} ${String(g.besucher).padStart(4)}`);
  if (eventsGesperrt) console.log("\n  Conversion-Events: nicht verfügbar (Pro-Plan erforderlich)");
  console.log();
}

main();
