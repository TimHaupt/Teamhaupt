import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  CalendarCheck,
  Car,
  FileWarning,
  HeartPulse,
  Home,
  LayoutDashboard,
  Mail,
  PencilLine,
  Phone,
  Scale,
  TrendingUp,
} from "lucide-react";
import { Hero } from "@/components/site/hero";
import { Section } from "@/components/site/section";
import { JsonLd } from "@/components/site/json-ld";
import { faqSchema, graph } from "@/lib/schema";
import ScrollTextHighlight from "@/components/originkit/scroll-text-highlight";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/lightswind/accordion";
import {
  advantages,
  faqs,
  provenExpert,
  schadenMelden,
  schadenmanagerin,
  selfservice,
  services,
  site,
  steps,
  team,
  testimonials,
} from "@/lib/site";

const icons = {
  Home,
  Building2,
  TrendingUp,
  Car,
  HeartPulse,
  Scale,
  FileWarning,
  PencilLine,
  CalendarCheck,
  LayoutDashboard,
} as const;

type IconName = keyof typeof icons;

export default function HomePage() {
  return (
    <>
      {/* Fragen und Antworten maschinenlesbar – Grundlage fuer FAQ-Rich-Results
          und fuer Zitate durch KI-Assistenten. */}
      <JsonLd data={graph(faqSchema())} />
      <Hero />

      {/* ── Selfservice ────────────────────────────────── */}
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
          <div className="grid grid-cols-1 gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
            {selfservice.map((s) => {
              const Icon = icons[s.icon as IconName];
              const inner = (
                <>
                  <span className="mb-6 inline-flex text-brand-bright">
                    <Icon className="h-[22px] w-[22px]" strokeWidth={1.5} />
                  </span>
                  <span className="flex items-start justify-between gap-3">
                    <span className="text-[16px] font-medium text-foreground">
                      {s.title}
                    </span>
                    <ArrowUpRight
                      className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      strokeWidth={1.6}
                    />
                  </span>
                  <span className="mt-2 block text-[14px] leading-relaxed text-muted-foreground">
                    {s.text}
                  </span>
                </>
              );

              const cls =
                "group flex flex-col bg-background px-7 py-9 transition-colors hover:bg-accent";

              return "internal" in s && s.internal ? (
                <a key={s.title} href={s.href} className={cls}>
                  {inner}
                </a>
              ) : (
                <a
                  key={s.title}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cls}
                >
                  {inner}
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Haltung ────────────────────────────────────── */}
      <section className="bg-background">
        <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
          <div className="grid gap-10 border-b border-border py-20 sm:py-24 lg:grid-cols-[auto_1fr] lg:gap-20">
            <p className="eyebrow lg:pt-3">Unsere Haltung</p>
            <ScrollTextHighlight
              text="Wir verkaufen keine Policen. Wir sorgen dafür, dass Sie im Ernstfall nicht allein dastehen – mit ehrlicher Beratung, festen Ansprechpartnern und einem Team, das Sie beim Namen kennt."
              highlightColor="var(--brand)"
              className="display max-w-[46rem] text-[clamp(1.45rem,2.6vw,2rem)]"
            />
          </div>
        </div>
      </section>

      {/* ── Inhaber ────────────────────────────────────── */}
      <Section tone="paper">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div className="order-2 lg:order-1">
            <p className="eyebrow">Ihr Ansprechpartner</p>
            <h2 className="display mt-5 text-[clamp(1.65rem,2.9vw,2.35rem)] text-foreground">
              Tim Haupt
            </h2>
            <p className="mt-2 text-[14px] text-muted-foreground">
              Inhaber der HDI Generalvertretung · {site.city}
            </p>

            <div className="mt-8 space-y-5 text-[16.5px] leading-[1.8] text-muted-foreground">
              <p>
                Versicherung ist für mich Vertrauenssache. Als ich diese Agentur
                gegründet habe, hatte ich ein klares Ziel: Beratung, die ehrlich
                ist, Entscheidungen, die schnell fallen – und Menschen, die man
                beim Namen kennt.
              </p>
              <p>
                Genau dafür stehen mein Team und ich, jeden Tag hier in{" "}
                {site.city}. Kein anonymer Konzern-Service, sondern feste
                Ansprechpartner, die bleiben.
              </p>
            </div>

            <blockquote className="display mt-9 border-l border-brand pl-6 text-[clamp(1.15rem,1.8vw,1.4rem)] italic text-foreground">
              Bei mir sind Sie keine Vertragsnummer. Sie sind mein Kunde – und
              das spüren Sie in jedem Gespräch.
            </blockquote>

            <Link
              href="https://cal.com/tim-haupt"
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-9 inline-flex items-center gap-2.5 rounded-md bg-brand px-6 py-3.5 text-[14px] font-medium text-white transition-colors hover:bg-brand-ink"
            >
              Termin bei Tim Haupt buchen
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                strokeWidth={1.8}
              />
            </Link>
          </div>

          <div className="order-1 lg:order-2">
            <div className="mx-auto max-w-[26rem] lg:mx-0 lg:ml-auto">
              <Image
                src="/img/team/tim-haupt.jpg"
                alt="Tim Haupt, Inhaber der HDI Generalvertretung Erfurt"
                width={520}
                height={650}
                sizes="(max-width: 1024px) 80vw, 26rem"
                className="w-full rounded-lg"
              />
              <div className="mt-7 border-t border-border pt-7">
                <Image
                  src="/img/siegel.png"
                  alt="Gütesiegel gut beraten – ausgezeichnet für engagierte Weiterbildung"
                  width={626}
                  height={204}
                  sizes="210px"
                  className="h-auto w-[210px]"
                />
                <p className="mt-4 max-w-[24rem] text-[13.5px] leading-relaxed text-muted-foreground">
                  Ausgezeichnet für engagierte Weiterbildung – eine Initiative
                  der deutschen Versicherungswirtschaft.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ── Leistungen ─────────────────────────────────── */}
      <Section
        eyebrow={`${services.length} Bereiche`}
        title="Wobei wir Sie unterstützen"
        lead="Ob privat, geschäftlich oder für Ihre Zukunft – wir erklären verständlich, was Sie wirklich brauchen."
      >
        <div className="mt-16 grid grid-cols-1 gap-px bg-border md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => {
            const Icon = icons[s.icon as IconName];
            return (
              <Link
                key={s.slug}
                href={`/leistungen#${s.slug}`}
                className="group flex flex-col bg-background px-8 py-10 transition-colors hover:bg-accent"
              >
                <span className="mb-7 inline-flex text-brand-bright">
                  <Icon className="h-6 w-6" strokeWidth={1.4} />
                </span>
                <h3 className="text-[17px] font-medium text-foreground">
                  {s.title}
                </h3>
                <p className="mt-3 flex-1 text-[14.5px] leading-[1.7] text-muted-foreground">
                  {s.teaser}
                </p>
                <span className="mt-7 inline-flex items-center gap-1.5 text-[13.5px] text-brand">
                  Mehr erfahren
                  <ArrowRight
                    className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                    strokeWidth={1.8}
                  />
                </span>
              </Link>
            );
          })}
        </div>
      </Section>

      {/* ── Unterschied ────────────────────────────────── */}
      <Section
        tone="paper"
        eyebrow="Der Unterschied"
        title="Warum Kunden zu uns wechseln"
      >
        <div className="mt-16 grid gap-x-14 gap-y-12 sm:grid-cols-2">
          {advantages.map((a, i) => (
            <div key={a.title} className="border-t border-border pt-7">
              <span className="display text-[15px] text-brand-bright tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 text-[17px] font-medium text-foreground">
                {a.title}
              </h3>
              <p className="mt-3 max-w-[34rem] text-[15px] leading-[1.75] text-muted-foreground">
                {a.text}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Schadensfall ───────────────────────────────── */}
      <Section id="schaden" tone="dark">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div>
            <p className="eyebrow text-brand-bright">Im Schadensfall</p>
            <h2 className="display mt-5 text-[clamp(1.65rem,2.9vw,2.35rem)] text-white">
              Eine Ansprechpartnerin,
              <br />
              die Sie kennt
            </h2>
            <div className="mt-7 space-y-5 text-[16.5px] leading-[1.8] text-white/60">
              <p>
                Wasserschaden in der Wohnung, Auffahrunfall auf dem Weg zur
                Arbeit: Situationen, in denen niemand Lust auf Formulare und
                Warteschleifen hat.
              </p>
              <p>
                {schadenmanagerin.name} nimmt Ihren Fall auf, kennt Ihren Vertrag
                und bleibt Ihre Ansprechpartnerin, bis alles geklärt ist. Sie
                erreichen sie unter ihrer eigenen Durchwahl – nicht über die
                Zentrale.
              </p>
            </div>

            <div className="mt-9 flex flex-wrap gap-3">
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
                E-Mail schreiben
              </a>
            </div>
          </div>

          {/* Schaden direkt melden */}
          <div className="border-t border-white/12 pt-9 lg:border-l lg:border-t-0 lg:pl-16 lg:pt-0">
            <p className="eyebrow text-brand-bright">Schaden online melden</p>
            <p className="mt-4 text-[15px] leading-relaxed text-white/50">
              Rund um die Uhr, ohne Anmeldung. Wählen Sie die passende Sparte:
            </p>
            <ul className="mt-8">
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
          </div>
        </div>
      </Section>

      {/* ── Team (kompakt – volle Ansicht auf /ueber-uns) ── */}
      <Section
        id="team"
        eyebrow="Das Team"
        title="Menschen, keine Hotline"
        lead="Buchen Sie direkt einen Termin im Kalender Ihres Ansprechpartners – ohne Rückruf-Warterei."
      >
        <Image
          src="/img/team-banner.jpg"
          alt="Das Team der HDI Generalvertretung Tim Haupt in Erfurt"
          width={1794}
          height={700}
          sizes="(max-width: 1240px) 100vw, 1160px"
          className="mt-14 w-full rounded-lg bg-muted"
        />

        <ul className="mt-12">
          {team.map((m) => (
            <li
              key={m.name}
              className="flex flex-col gap-1.5 border-b border-border py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
            >
              <span className="text-[15.5px]">
                <span className="font-medium text-foreground">{m.name}</span>
                <span className="text-muted-foreground">
                  {" "}
                  · {m.role}
                  {m.focus ? ` – ${m.focus}` : ""}
                </span>
              </span>
              {m.booking ? (
                <a
                  href={m.booking}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex shrink-0 items-center gap-1.5 text-[13.5px] text-brand"
                >
                  Termin buchen
                  <ArrowUpRight
                    className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    strokeWidth={1.8}
                  />
                </a>
              ) : m.phone ? (
                <a
                  href={`tel:${m.phone.replace(/\s/g, "")}`}
                  className="shrink-0 text-[13.5px] text-brand tabular-nums"
                >
                  {m.phone}
                </a>
              ) : null}
            </li>
          ))}
        </ul>

        <Link
          href="/ueber-uns#team"
          className="group mt-8 inline-flex items-center gap-2 text-[14.5px] text-brand"
        >
          Das ganze Team mit Fotos ansehen
          <ArrowRight
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
            strokeWidth={1.8}
          />
        </Link>
      </Section>

      {/* ── Kanzleien ──────────────────────────────────── */}
      <Section
        tone="paper"
        eyebrow="Spezialgebiet"
        title="Für Steuerberater und Rechtsanwälte"
        lead="Kanzleien haben Haftungsrisiken, die man wirklich verstehen muss. Mitglieder von DAV und StbV erhalten bei uns zusätzlich Sonderkonditionen."
      >
        <div className="mt-14 grid gap-x-14 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Vermögensschadenhaftpflicht", "Der Kern jeder Kanzleiabsicherung – passend zur Sozietätsform."],
            ["Büro und Betrieb", "Inventar, Elektronik, Betriebsunterbrechung."],
            ["Cyber-Schutz", "Mandantendaten sind das sensibelste Gut einer Kanzlei."],
            ["Sonderkonditionen", "Exklusive Sätze für Mitglieder von DAV und StbV."],
          ].map(([t, d]) => (
            <div key={t} className="border-t border-border pt-6">
              <h3 className="text-[15.5px] font-medium text-foreground">{t}</h3>
              <p className="mt-2.5 text-[14px] leading-[1.7] text-muted-foreground">
                {d}
              </p>
            </div>
          ))}
        </div>

        <Link
          href="/leistungen#kanzleien"
          className="group mt-12 inline-flex items-center gap-2 text-[14.5px] text-brand"
        >
          Mehr für Kanzleien
          <ArrowRight
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
            strokeWidth={1.8}
          />
        </Link>
      </Section>

      {/* ── Vertrauen: Kundenstimme + ProvenExpert ─────── */}
      <Section eyebrow="Vertrauen" title="Was Kunden sagen">
        <div className="mt-14 grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
          {testimonials[0] && (
            <figure>
              <blockquote className="display text-[clamp(1.25rem,2vw,1.6rem)] leading-[1.5] text-foreground">
                „{testimonials[0].quote}"
              </blockquote>
              <figcaption className="mt-6 text-[14px] text-muted-foreground">
                <span className="block font-medium text-foreground">
                  {testimonials[0].name}
                </span>
                {testimonials[0].role}
              </figcaption>
            </figure>
          )}

          <div className="border-t border-border pt-8 lg:border-l lg:border-t-0 lg:pl-16 lg:pt-0">
            <p className="eyebrow">ProvenExpert</p>
            <p className="display mt-5 text-[clamp(1.7rem,2.7vw,2.2rem)] text-brand tabular-nums">
              {provenExpert.rating.toLocaleString("de-DE", {
                minimumFractionDigits: 2,
              })}
              <span className="text-[0.55em] text-muted-foreground"> / 5</span>
            </p>
            <dl className="mt-6 space-y-2.5">
              <div className="flex justify-between gap-6 border-b border-border pb-2.5 text-[14.5px]">
                <dt className="text-muted-foreground">Bewertungen</dt>
                <dd className="text-foreground tabular-nums">
                  {provenExpert.count}
                </dd>
              </div>
              <div className="flex justify-between gap-6 border-b border-border pb-2.5 text-[14.5px]">
                <dt className="text-muted-foreground">Empfehlungsquote</dt>
                <dd className="text-foreground tabular-nums">
                  {provenExpert.recommendationRate} %
                </dd>
              </div>
            </dl>
            <a
              href={provenExpert.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-7 inline-flex items-center gap-1.5 text-[14px] text-brand"
            >
              Profil auf ProvenExpert ansehen
              <ArrowUpRight
                className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                strokeWidth={1.8}
              />
            </a>
          </div>
        </div>
      </Section>

      {/* ── Ablauf ─────────────────────────────────────── */}
      <Section
        tone="paper"
        eyebrow="In drei Schritten"
        title="So einfach kommen Sie zu Ihrem Schutz"
      >
        <div className="mt-16 grid gap-x-14 gap-y-12 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n} className="border-t border-border pt-7">
              <span className="display text-[15px] text-brand-bright tabular-nums">
                {s.n}
              </span>
              <h3 className="mt-4 text-[17px] font-medium text-foreground">
                {s.title}
              </h3>
              <p className="mt-3 text-[15px] leading-[1.75] text-muted-foreground">
                {s.text}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── FAQ ────────────────────────────────────────── */}
      <Section eyebrow="Häufige Fragen" title="Das fragen uns Kunden am häufigsten">
        <div className="mt-12 max-w-[52rem]">
          <Accordion type="single" collapsible>
            {faqs.map((f, i) => (
              <AccordionItem
                key={f.q}
                value={`item-${i}`}
                className="border-b border-border"
              >
                <AccordionTrigger className="py-6 text-left text-[16.5px] font-medium text-foreground hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="pb-6 text-[15.5px] leading-[1.75] text-muted-foreground">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Section>

      {/* ── Abschluss: gruene CI-Flaeche wie auf den Angebotsunterlagen ── */}
      <section className="relative overflow-hidden bg-[linear-gradient(140deg,#16281a_0%,#2d5e29_46%,#3d7a3a_76%,#4c8f42_110%)] text-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_82%_18%,rgba(104,160,64,0.38),transparent_55%)]" />
        <div className="relative mx-auto max-w-[1240px] px-6 py-20 sm:py-24 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <div>
            <p className="eyebrow text-white/65">Ihr nächster Schritt</p>
            <h2 className="display mt-5 text-[clamp(1.8rem,3.3vw,2.65rem)] text-white">
              Reden wir über das,
              <br />
              was Ihnen wichtig ist.
            </h2>
            <p className="mt-6 max-w-[32rem] text-[16.5px] leading-[1.75] text-white/75">
              Das Erstgespräch ist kostenlos und unverbindlich – vor Ort in{" "}
              {site.city}, telefonisch oder per Videocall.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 lg:justify-end">
            <Link
              href="/kontakt"
              className="group inline-flex items-center gap-2.5 rounded-md bg-white px-7 py-4 text-[14.5px] font-medium text-brand-ink transition-colors hover:bg-white/90"
            >
              Termin vereinbaren
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                strokeWidth={1.8}
              />
            </Link>
            <a
              href={site.phoneHref}
              className="inline-flex items-center gap-2.5 rounded-md border border-white/40 px-7 py-4 text-[14.5px] font-medium text-white tabular-nums transition-colors hover:border-white"
            >
              <Phone className="h-4 w-4" strokeWidth={1.8} />
              {site.phone}
            </a>
          </div>
        </div>
        </div>
      </section>
    </>
  );
}
