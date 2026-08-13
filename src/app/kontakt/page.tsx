import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import {
  ArrowUpRight,
  CalendarCheck,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import { PageHero, Section } from "@/components/site/section";
import { JsonLd } from "@/components/site/json-ld";
import { breadcrumbSchema, graph } from "@/lib/schema";
import { ContactForm } from "@/components/site/contact-form";
import {
  mapsUrl,
  openingHours,
  openingHoursNote,
  phoneHoursCompact,
  schadenMelden,
  schadenmanagerin,
  site,
  team,
} from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Kontakt",
  description:
    "HDI Generalvertretung Tim Haupt, Johannesstr. 62–64, 99084 Erfurt. Telefon 0361 56 53 660. Termin direkt online buchen oder Schaden melden.",
  path: "/kontakt",
});

export default function KontaktPage() {
  const buchbar = team.filter((m) => m.booking);

  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbSchema([
            { name: "Start", path: "/" },
            { name: "Kontakt", path: "/kontakt" },
          ]),
        )}
      />
      <PageHero
        eyebrow="Kontakt"
        title="Reden wir."
        lead="Das Erstgespräch ist kostenlos und unverbindlich – Ihre Möglichkeit, alle Fragen in Ruhe zu klären. Vor Ort in Erfurt, telefonisch oder per Videocall."
      />

      {/* Direkte Wege */}
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
          <div className="grid grid-cols-1 gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
            <a
              href={site.phoneHref}
              className="group flex flex-col bg-background px-7 py-7 transition-colors hover:bg-muted"
            >
              <Phone className="h-[22px] w-[22px] text-brand-text" strokeWidth={1.5} />
              <span className="mt-4 text-[16px] font-medium text-foreground tabular-nums">
                {site.phone}
              </span>
              <span className="mt-2 text-[14px] text-muted-foreground">
                {phoneHoursCompact}
              </span>
            </a>

            <a
              href={site.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col bg-background px-7 py-7 transition-colors hover:bg-muted"
            >
              <MessageCircle className="h-[22px] w-[22px] text-brand-text" strokeWidth={1.5} />
              <span className="mt-4 text-[16px] font-medium text-foreground tabular-nums">
                WhatsApp
              </span>
              <span className="mt-2 text-[14px] text-muted-foreground">
                {site.whatsapp} – Chat startet in Ihrer App
              </span>
            </a>

            <a
              href={site.emailHref}
              className="group flex flex-col bg-background px-7 py-7 transition-colors hover:bg-muted"
            >
              <Mail className="h-[22px] w-[22px] text-brand-text" strokeWidth={1.5} />
              <span className="mt-4 break-all text-[16px] font-medium text-foreground">
                {site.email}
              </span>
              <span className="mt-2 text-[14px] text-muted-foreground">
                Antwort werktags innerhalb von 24 Stunden
              </span>
            </a>

            {/* Klickbar wie die Nachbar-Kacheln – mobil erwartet man beim
                Tippen die Routenfuehrung. */}
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col bg-background px-7 py-7 transition-colors hover:bg-muted"
            >
              <MapPin className="h-[22px] w-[22px] text-brand-text" strokeWidth={1.5} />
              <span className="mt-4 text-[16px] font-medium text-foreground">
                {site.street}
              </span>
              <span className="mt-2 text-[14px] text-muted-foreground">
                {site.zip} {site.city}
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* Termin direkt buchen – Ankerziel aller "Termin vereinbaren"-CTAs.
          scroll-mt gleicht den 72px hohen fixen Header aus. */}
      <Section
        id="termin"
        className="scroll-mt-[88px]"
        eyebrow="Ohne Umweg"
        title="Termin direkt im Kalender buchen"
        lead="Sie sehen die freien Zeiten und wählen selbst – kein Rückruf nötig."
      >
        <div className="mt-8 grid grid-cols-1 gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
          {buchbar.map((m) => (
            <a
              key={m.name}
              href={m.booking}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start justify-between gap-4 bg-background px-7 py-7 transition-colors hover:bg-muted"
            >
              <span>
                <span className="block text-[15.5px] font-medium text-foreground">
                  {m.name}
                </span>
                <span className="mt-1 block text-[13.5px] text-muted-foreground">
                  {m.role}
                  {m.focus ? ` · ${m.focus}` : ""}
                </span>
              </span>
              <CalendarCheck
                className="mt-0.5 h-[18px] w-[18px] shrink-0 text-brand-text"
                strokeWidth={1.5}
              />
            </a>
          ))}
        </div>
      </Section>

      {/* Schaden melden */}
      <Section
        tone="dark"
        eyebrow="Im Schadensfall"
        title="Schaden online melden"
        lead={`Rund um die Uhr, ohne Anmeldung. ${schadenmanagerin.name} übernimmt Ihren Fall und bleibt Ihre Ansprechpartnerin, bis er geklärt ist.`}
      >
        <div className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
          <ul>
            {schadenMelden.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between border-b border-white/10 py-4 text-[15.5px] text-white/85 transition-colors hover:text-white"
                >
                  {s.label}
                  <ArrowUpRight
                    className="h-4 w-4 text-white/35 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white"
                    strokeWidth={1.6}
                  />
                </a>
              </li>
            ))}
          </ul>

          <div className="border-t border-white/12 pt-8 lg:border-l lg:border-t-0 lg:pl-16 lg:pt-0">
            <p className="eyebrow text-brand-bright">Lieber persönlich?</p>
            <p className="mt-4 text-[15.5px] font-medium text-white">
              {schadenmanagerin.name}
            </p>
            <p className="mt-1 text-[14px] text-white/50">
              {schadenmanagerin.role}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={schadenmanagerin.phoneHref}
                className="inline-flex items-center gap-2.5 rounded-md bg-white px-6 py-3.5 text-[14px] font-medium text-brand-ink tabular-nums transition-colors hover:bg-white/90"
              >
                <Phone className="h-4 w-4" strokeWidth={1.8} />
                {schadenmanagerin.phone}
              </a>
              <a
                href={schadenmanagerin.emailHref}
                className="inline-flex items-center gap-2.5 rounded-md border border-white/25 px-6 py-3.5 text-[14px] font-medium text-white transition-colors hover:border-white/60"
              >
                <Mail className="h-4 w-4" strokeWidth={1.8} />
                E-Mail
              </a>
            </div>
          </div>
        </div>
      </Section>

      {/* Formular + Öffnungszeiten */}
      <Section tone="paper" eyebrow="Nachricht" title="Schreiben Sie uns">
        <div className="mt-8 grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-14">
          <ContactForm />

          <div>
            <dl className="border-t border-border pt-7">
              <dt className="eyebrow">Öffnungszeiten</dt>
              <dd className="mt-6 space-y-3">
                {openingHours.map((o) => (
                  <span
                    key={o.day}
                    className="flex justify-between gap-6 border-b border-border pb-3 text-[15px]"
                  >
                    <span className="text-muted-foreground">{o.day}</span>
                    <span className="shrink-0 text-foreground tabular-nums">
                      {o.time}
                    </span>
                  </span>
                ))}
                <span className="block text-[14px] text-muted-foreground">
                  {openingHoursNote}
                </span>
              </dd>
            </dl>

            <div className="mt-10 border-t border-border pt-7">
              <p className="eyebrow">Anfahrt</p>
              <p className="mt-5 text-[15.5px] leading-relaxed text-foreground">
                {site.legalName}
                <br />
                {site.street}
                <br />
                {site.zip} {site.city}
              </p>

              {/* Haltestellen, Entfernungen und Linien per OpenStreetMap ab den
                  Buerokoordinaten verifiziert; Parken und Ladenlokal vom
                  Inhaber bestaetigt (08/2026). */}
              <dl className="mt-6 space-y-4 text-[14.5px] leading-relaxed text-muted-foreground">
                <div>
                  <dt className="font-medium text-foreground">
                    Mit der Straßenbahn
                  </dt>
                  <dd className="mt-1">
                    Die Haltestellen Augustinerkloster und Boyneburgufer liegen
                    beide keine drei Gehminuten entfernt – dort halten die
                    Linien 1 und 5. Vom Hauptbahnhof bringt Sie die Linie 5
                    ohne Umstieg zu uns.
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-foreground">Mit dem Auto</dt>
                  <dd className="mt-1">
                    Rund um die Johannesstraße gibt es öffentliche,
                    kostenpflichtige Parkplätze; die Tiefgarage im
                    Thüringenhaus ist etwa fünf Gehminuten entfernt.
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-foreground">Vor Ort</dt>
                  <dd className="mt-1">
                    Sie finden uns im Erdgeschoss: Unser Büro ist ein
                    Ladenlokal, der Eingang liegt direkt an der Straße.
                  </dd>
                </div>
              </dl>

              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-6 inline-flex items-center gap-1.5 text-[14px] text-brand-text"
              >
                In Google Maps öffnen
                <ArrowUpRight
                  className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  strokeWidth={1.8}
                />
              </a>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
