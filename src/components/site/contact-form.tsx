"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { site } from "@/lib/site";

const themen = [
  "Privat & Familie",
  "Für mein Unternehmen",
  "Vorsorge & Zukunft",
  "Kfz-Versicherung",
  "Gesundheit & Zähne",
  "Steuerberater / Rechtsanwalt",
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

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const get = (k: string) => String(data.get(k) ?? "").trim();

    const betreff = `Anfrage über die Website${thema ? `: ${thema}` : ""}`;
    const text = [
      `Name: ${get("name")}`,
      `E-Mail: ${get("email")}`,
      get("telefon") && `Telefon: ${get("telefon")}`,
      thema && `Thema: ${thema}`,
      get("kontaktweg") && `Gewünschter Kontaktweg: ${get("kontaktweg")}`,
      "",
      get("nachricht"),
    ]
      .filter(Boolean)
      .join("\n");

    window.location.href = `${site.emailHref}?subject=${encodeURIComponent(
      betreff,
    )}&body=${encodeURIComponent(text)}`;
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
            Telefon
          </label>
          <input id="telefon" name="telefon" type="tel" className={field} placeholder="Für einen Rückruf" />
        </div>
      </div>

      <div className="mt-5">
        <label className={label} htmlFor="email">
          E-Mail *
        </label>
        <input id="email" name="email" type="email" required className={field} placeholder="ihre@adresse.de" />
      </div>

      <div className="mt-5">
        <span className={label}>Worum geht es?</span>
        <div className="flex flex-wrap gap-2">
          {themen.map((t) => (
            <button
              key={t}
              type="button"
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
      </div>

      <div className="mt-5">
        <label className={label} htmlFor="kontaktweg">
          Wie erreichen wir Sie am liebsten?
        </label>
        <select id="kontaktweg" name="kontaktweg" className={field} defaultValue="">
          <option value="">Bitte wählen</option>
          <option>Rückruf</option>
          <option>E-Mail</option>
          <option>Termin vor Ort in {site.city}</option>
          <option>Videocall</option>
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

      <p className="mt-4 max-w-[34rem] text-[13px] leading-relaxed text-muted-foreground">
        Beim Absenden öffnet sich Ihr E-Mail-Programm mit einer fertig
        ausgefüllten Nachricht an {site.email}. Sie sehen, was Sie senden, und
        schicken sie selbst ab – wir speichern hier nichts.
      </p>
    </form>
  );
}
