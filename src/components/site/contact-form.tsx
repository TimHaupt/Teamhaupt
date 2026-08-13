"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Copy, Check } from "lucide-react";
import { site } from "@/lib/site";

const themen = [
  "Privat & Familie",
  "Für mein Unternehmen",
  "Vorsorge & Zukunft",
  "Kfz-Versicherung",
  "Gesundheit & Zähne",
  "Steuerberater / Rechtsanwalt",
  "Heilberufe / Praxis",
  "Etwas anderes",
];

const field =
  "w-full rounded-md border border-border bg-surface px-4 py-3 text-[15px] text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-brand";
const label = "mb-2 block text-[13px] font-medium text-foreground";

/**
 * Ohne Backend: Das Formular stellt eine vorausgefuellte E-Mail im Mailprogramm
 * des Besuchers zusammen. Das funktioniert sofort und ohne Datenverarbeitung
 * auf unserer Seite – der Versand liegt beim Absender.
 * Fuer echten Serverversand braeuchte es einen Maildienst; siehe README.
 */
export function ContactForm() {
  const [thema, setThema] = useState("");
  const [kontaktweg, setKontaktweg] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [copiedFeedback, setCopiedFeedback] = useState(false);
  const [messageText, setMessageText] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const get = (k: string) => String(data.get(k) ?? "").trim();

    const betreff = `Anfrage über die Website${thema ? `: ${thema}` : ""}`;
    const text = [
      `Name: ${get("name")}`,
      get("email") && `E-Mail: ${get("email")}`,
      get("telefon") && `Telefon: ${get("telefon")}`,
      thema && `Thema: ${thema}`,
      get("kontaktweg") && `Gewünschter Kontaktweg: ${get("kontaktweg")}`,
      "",
      get("nachricht"),
    ]
      .filter(Boolean)
      .join("\n");

    setMessageText(text);
    window.location.href = `${site.emailHref}?subject=${encodeURIComponent(
      betreff,
    )}&body=${encodeURIComponent(text)}`;
    setShowConfirmation(true);
  }

  async function handleCopyMessage() {
    try {
      await navigator.clipboard.writeText(messageText);
      setCopiedFeedback(true);
      setTimeout(() => setCopiedFeedback(false), 2000);
    } catch (err) {
      console.error("Fehler beim Kopieren:", err);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-[38rem]">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="name">
            Name *
          </label>
          <input id="name" name="name" required className={field} placeholder="Vor- und Nachname" />
        </div>
        <div>
          <label className={label} htmlFor="telefon">
            Telefon {kontaktweg === "Rückruf" && "*"}
          </label>
          <input
            id="telefon"
            name="telefon"
            type="tel"
            required={kontaktweg === "Rückruf"}
            className={field}
            placeholder="Für einen Rückruf"
          />
        </div>
      </div>

      <div className="mt-5">
        <label className={label} htmlFor="email">
          E-Mail {kontaktweg === "E-Mail" && "*"}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required={kontaktweg === "E-Mail"}
          className={field}
          placeholder="ihre@adresse.de"
        />
      </div>

      {/* fieldset/legend gibt der Gruppe einen Namen, aria-pressed macht den
          gewaehlten Zustand ansagbar – vorher war er nur farblich erkennbar. */}
      <fieldset className="mt-5 border-0 p-0">
        <legend className={label}>Worum geht es?</legend>
        <div className="flex flex-wrap gap-2">
          {themen.map((t) => (
            <button
              key={t}
              type="button"
              aria-pressed={thema === t}
              onClick={() => setThema(thema === t ? "" : t)}
              className={`rounded-md border px-3.5 py-2 text-[13.5px] transition-colors ${
                thema === t
                  ? "border-brand bg-brand text-white"
                  : "border-border bg-surface text-muted-foreground hover:border-brand/50 hover:text-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="mt-5">
        <label className={label} htmlFor="kontaktweg">
          Wie erreichen wir Sie am liebsten?
        </label>
        <select
          id="kontaktweg"
          name="kontaktweg"
          value={kontaktweg}
          onChange={(e) => setKontaktweg(e.target.value)}
          className={field}
        >
          <option value="">Bitte wählen</option>
          <option value="Rückruf">Rückruf</option>
          <option value="E-Mail">E-Mail</option>
          <option value={`Termin vor Ort in ${site.city}`}>Termin vor Ort in {site.city}</option>
          <option value="Videocall">Videocall</option>
        </select>
      </div>

      <div className="mt-5">
        <label className={label} htmlFor="nachricht">
          Ihre Nachricht
        </label>
        <textarea
          id="nachricht"
          name="nachricht"
          rows={5}
          className={`${field} resize-y`}
          placeholder="Beschreiben Sie kurz Ihr Anliegen."
        />
      </div>

      {!showConfirmation ? (
        <button
          type="submit"
          className="group mt-7 inline-flex items-center gap-2.5 rounded-md bg-brand px-7 py-4 text-[14.5px] font-medium text-white transition-colors hover:bg-brand-ink"
        >
          Nachricht vorbereiten
          <ArrowRight
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
            strokeWidth={1.8}
          />
        </button>
      ) : (
        <div className="mt-7 rounded-md border border-green-200 bg-green-50 px-6 py-5 text-[14.5px] text-foreground">
          <p className="mb-4 font-medium">Ihr E-Mail-Programm sollte sich jetzt geöffnet haben.</p>
          <p className="mb-5 text-[13.5px] text-muted-foreground">
            Falls nichts passiert ist, schreiben Sie uns direkt an:
          </p>

          <div className="flex flex-col gap-3">
            {/* mailto/tel sind keine Routen – schlichtes <a> wie im Rest der Site */}
            <a
              href={site.emailHref}
              className="inline-flex items-center gap-2 rounded-md bg-white px-4 py-2.5 text-[13.5px] font-medium text-brand underline-offset-2 border border-brand/20 hover:bg-brand/5 transition-colors"
            >
              {site.email}
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
            </a>

            <button
              type="button"
              onClick={handleCopyMessage}
              className={`inline-flex items-center gap-2 rounded-md px-4 py-2.5 text-[13.5px] font-medium transition-colors ${
                copiedFeedback
                  ? "bg-green-100 text-green-700 border border-green-300"
                  : "bg-white text-foreground border border-border hover:bg-surface"
              }`}
            >
              {copiedFeedback ? (
                <>
                  <Check className="h-3.5 w-3.5" strokeWidth={2} />
                  Kopiert
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" strokeWidth={1.8} />
                  Nachricht kopieren
                </>
              )}
            </button>

            <a
              href={site.phoneHref}
              className="inline-flex items-center gap-2 rounded-md bg-white px-4 py-2.5 text-[13.5px] font-medium text-brand underline-offset-2 border border-brand/20 hover:bg-brand/5 transition-colors"
            >
              Anrufen: {site.phone}
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
            </a>
          </div>

          {/* Weg zurueck: sonst laesst sich das Formular nach einer Korrektur
              nie wieder absenden. */}
          <button
            type="button"
            onClick={() => setShowConfirmation(false)}
            className="mt-5 text-[13.5px] text-muted-foreground underline underline-offset-2 transition-colors hover:text-foreground"
          >
            Angaben ändern und erneut vorbereiten
          </button>
        </div>
      )}

      <p className="mt-4 max-w-[34rem] text-[13px] leading-relaxed text-muted-foreground">
        Beim Absenden öffnet sich Ihr E-Mail-Programm mit einer fertig
        ausgefüllten Nachricht an {site.email}. Sie sehen, was Sie senden, und
        schicken sie selbst ab – wir speichern hier nichts. Mehr dazu in der{" "}
        <Link href="/datenschutz" className="text-brand-text underline underline-offset-2">
          Datenschutzerklärung
        </Link>
        .
      </p>
    </form>
  );
}
