import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  Building2,
  Car,
  Check,
  Compass,
  HeartPulse,
  Home,
  Mail,
  MapPin,
  Phone,
  Quote,
  Scale,
  ShieldCheck,
  Smile,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { Hero } from "@/components/site/hero";
import ScrollTextHighlight from "@/components/originkit/scroll-text-highlight";
import { GlowingCards, GlowingCard } from "@/components/lightswind/glowing-cards";
import { BorderBeam } from "@/components/lightswind/border-beam";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/lightswind/accordion";
import {
  advantages,
  faqs,
  schadenmanagerin,
  services,
  site,
  stats,
  steps,
  testimonials,
} from "@/lib/site";

const iconMap = {
  Home,
  Building2,
  TrendingUp,
  Car,
  HeartPulse,
  Scale,
  Smile,
  Compass,
  Zap,
  ShieldCheck,
} as const;

const trustItems = [
  { icon: Users, label: "Persönlicher Ansprechpartner" },
  { icon: Zap, label: "Schnelle Schadenhilfe" },
  { icon: Award, label: "IHK-geprüftes Team" },
  { icon: Scale, label: "Spezialist für Kanzleien" },
  { icon: MapPin, label: `Mitten in ${site.city}` },
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="mb-3 inline-block text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
      {children}
    </span>
  );
}

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* ── Vertrauensleiste ───────────────────────────── */}
      <section className="border-y border-border bg-muted/60">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 px-5 py-7 sm:px-8">
          {trustItems.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-3">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground">
                <Icon className="h-4 w-4" strokeWidth={2} />
              </span>
              <span className="text-sm font-medium text-foreground/80">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Kennzahlen ─────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#0a0d0a] py-20 text-white sm:py-24">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[320px] w-[720px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />
        <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
          <p className="mb-12 max-w-2xl text-[15px] leading-relaxed text-white/45">
            Zahlen sagen mehr als Versprechen. Ein Auszug aus unserer Arbeit:
          </p>

          <dl className="grid gap-px overflow-hidden rounded-2xl bg-white/10 sm:grid-cols-3">
            {stats.map((s) => (
              <div key={s.label} className="bg-[#0a0d0a] px-7 py-9">
                <dt className="mb-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-primary">
                  {s.note}
                </dt>
                <dd>
                  <span className="block text-[clamp(2rem,3.6vw,2.9rem)] font-extrabold leading-none tracking-[-0.035em] text-white tabular-nums">
                    {s.value}
                  </span>
                  <span className="mt-3 block text-[14px] leading-snug text-white/50">
                    {s.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── Haltung (Originkit ScrollTextHighlight) ────── */}
      <section className="py-28 sm:py-36">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <SectionLabel>Unsere Haltung</SectionLabel>
          <ScrollTextHighlight
            text="Versicherung ist Vertrauenssache. Deshalb setzen wir auf das, was wirklich zählt: zuhören, ehrlich beraten und im Ernstfall sofort da sein – mit festen Ansprechpartnern, die Sie beim Namen kennen."
            className="mt-4 text-[clamp(1.5rem,3.4vw,2.6rem)] font-bold leading-[1.32] tracking-[-0.02em] text-foreground"
          />
        </div>
      </section>

      {/* ── Inhaber ─────────────────────────────────────── */}
      <section className="relative overflow-hidden py-24 sm:py-28">
        <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-5 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div className="relative">
            <div className="absolute inset-0 translate-x-5 translate-y-5 rounded-3xl border-2 border-primary/30" />
            <div className="relative overflow-hidden rounded-3xl shadow-2xl">
              <Image
                src="/img/team.png"
                alt="Das Team der HDI Generalvertretung Tim Haupt in Erfurt"
                width={1800}
                height={980}
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="w-full"
              />
            </div>
            {/* Echtes Gütesiegel der Initiative „gut beraten" */}
            <div className="absolute -bottom-7 -right-3 rounded-2xl bg-background p-3 shadow-2xl ring-1 ring-border sm:-right-6">
              <Image
                src="/img/siegel.png"
                alt="Gütesiegel gut beraten – ausgezeichnet für engagierte Weiterbildung"
                width={626}
                height={204}
                sizes="220px"
                className="h-auto w-[190px] sm:w-[220px]"
              />
            </div>
          </div>

          <div>
            <SectionLabel>Ihr persönlicher Ansprechpartner</SectionLabel>
            <h2 className="text-[clamp(1.9rem,3.4vw,2.7rem)] font-extrabold tracking-[-0.025em] text-foreground">
              Tim Haupt
            </h2>
            <p className="mt-1.5 text-sm font-semibold uppercase tracking-[0.08em] text-primary">
              Inhaber der HDI Generalvertretung · {site.city}
            </p>

            <div className="mt-7 space-y-4 text-[16px] leading-[1.8] text-muted-foreground">
              <p>
                Versicherung ist für mich Vertrauenssache. Als ich diese Agentur
                gegründet habe, hatte ich ein klares Ziel: Beratung, die ehrlich ist,
                Entscheidungen, die schnell fallen – und Menschen, die man beim Namen
                kennt.
              </p>
              <p>
                Genau dafür stehen mein Team und ich – jeden Tag, hier in {site.city}.
                Kein anonymer Konzern-Service, sondern ein fester Ansprechpartner, der
                bleibt.
              </p>
            </div>

            <blockquote className="mt-7 border-l-[3px] border-primary py-1.5 pl-5 text-[17px] italic leading-relaxed text-foreground/85">
              „Bei mir sind Sie keine Vertragsnummer. Sie sind mein Kunde – und das
              spüren Sie in jedem Gespräch."
            </blockquote>
          </div>
        </div>
      </section>

      {/* ── Vorteile (Lightswind GlowingCards) ─────────── */}
      <section className="bg-muted/50 py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <SectionLabel>Der Unterschied</SectionLabel>
            <h2 className="text-[clamp(1.9rem,3.4vw,2.7rem)] font-extrabold tracking-[-0.025em] text-foreground">
              Warum Kunden zu uns wechseln
            </h2>
            <p className="mt-4 text-[16px] leading-relaxed text-muted-foreground">
              Wir machen Versicherung so, wie sie sein sollte: verständlich,
              persönlich und ohne Kleingedrucktes.
            </p>
            <div className="mx-auto mt-5 h-1 w-12 rounded-full bg-primary" />
          </div>

          <GlowingCards
            enableGlow
            glowRadius={22}
            glowOpacity={0.55}
            enableHover
            gap="1.5rem"
            maxWidth="100%"
            padding="0"
            backgroundColor="transparent"
          >
            {advantages.map((a) => {
              const Icon = iconMap[a.icon as keyof typeof iconMap];
              return (
                <GlowingCard
                  key={a.title}
                  glowColor="#68a040"
                  className="rounded-2xl border border-border bg-background p-7"
                >
                  <span className="mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-primary/12 text-brand-dark">
                    <Icon className="h-6 w-6" strokeWidth={1.9} />
                  </span>
                  <h3 className="mb-2 text-[17px] font-bold text-foreground">{a.title}</h3>
                  <p className="text-[14px] leading-relaxed text-muted-foreground">{a.text}</p>
                </GlowingCard>
              );
            })}
          </GlowingCards>
        </div>
      </section>

      {/* ── Leistungen ──────────────────────────────────── */}
      <section className="py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <SectionLabel>Für jede Lebenslage</SectionLabel>
            <span className="mx-auto mb-2 block bg-gradient-to-b from-brand to-brand-dark bg-clip-text text-[clamp(3.4rem,7vw,5.4rem)] font-extrabold leading-none tracking-[-0.05em] text-transparent">
              {services.length}
            </span>
            <h2 className="text-[clamp(1.9rem,3.4vw,2.7rem)] font-extrabold leading-[1.18] tracking-[-0.025em] text-foreground">
              Bereiche, in denen wir Sie
              <br className="hidden sm:block" /> unterstützen
            </h2>
            <p className="mt-4 text-[16px] leading-relaxed text-muted-foreground">
              Ob privat, geschäftlich oder für Ihre Zukunft – wir haben die passende
              Lösung und erklären sie verständlich.
            </p>
            <div className="mx-auto mt-5 h-1 w-12 rounded-full bg-primary" />
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => {
              const Icon = iconMap[s.icon as keyof typeof iconMap];
              return (
                <Link
                  key={s.slug}
                  href={`/leistungen#${s.slug}`}
                  className={`group relative overflow-hidden rounded-2xl border p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${
                    s.featured
                      ? "border-primary/40 bg-gradient-to-br from-accent to-muted"
                      : "border-border bg-background hover:border-primary/40"
                  }`}
                >
                  {s.featured && <BorderBeam size={220} duration={9} />}

                  <span
                    className={`mb-5 grid h-14 w-14 place-items-center rounded-2xl transition-colors ${
                      s.featured
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-brand-dark group-hover:bg-primary/12"
                    }`}
                  >
                    <Icon className="h-6 w-6" strokeWidth={1.9} />
                  </span>

                  <h3 className="mb-2 text-[17px] font-bold text-foreground">{s.title}</h3>
                  <p className="mb-5 text-[14px] leading-relaxed text-muted-foreground">
                    {s.teaser}
                  </p>

                  <ul className="mb-6 space-y-2">
                    {s.bullets.map((b) => (
                      <li
                        key={b}
                        className="flex items-center gap-2.5 text-[13px] text-foreground/70"
                      >
                        <Check className="h-3.5 w-3.5 shrink-0 text-primary" strokeWidth={3} />
                        {b}
                      </li>
                    ))}
                  </ul>

                  <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-primary">
                    Mehr erfahren
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Ablauf ──────────────────────────────────────── */}
      <section className="bg-muted/50 py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <SectionLabel>In drei Schritten</SectionLabel>
            <h2 className="text-[clamp(1.9rem,3.4vw,2.7rem)] font-extrabold tracking-[-0.025em] text-foreground">
              So einfach kommen Sie zu Ihrem Schutz
            </h2>
            <p className="mt-4 text-[16px] leading-relaxed text-muted-foreground">
              Kein Papierkram-Stress, kein Fachchinesisch. Wir machen es Ihnen leicht.
            </p>
            <div className="mx-auto mt-5 h-1 w-12 rounded-full bg-primary" />
          </div>

          <div className="relative grid gap-12 md:grid-cols-3 md:gap-8">
            <div className="absolute left-[16.6%] right-[16.6%] top-9 hidden h-px md:block">
              <div className="h-full w-full bg-[repeating-linear-gradient(to_right,var(--primary)_0_10px,transparent_10px_20px)] opacity-40" />
            </div>

            {steps.map((s) => (
              <div key={s.n} className="relative text-center">
                <span className="mx-auto mb-6 grid h-[72px] w-[72px] place-items-center rounded-full bg-gradient-to-br from-brand to-brand-dark text-2xl font-extrabold text-white shadow-[0_0_0_10px_var(--muted),0_10px_28px_-8px_rgba(61,122,58,0.5)]">
                  {s.n}
                </span>
                <h3 className="mb-2.5 text-[19px] font-bold text-foreground">{s.title}</h3>
                <p className="mx-auto max-w-[34ch] text-[14px] leading-relaxed text-muted-foreground">
                  {s.text}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-14 text-center">
            <Link
              href="/kontakt"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-bold text-primary-foreground shadow-xl shadow-brand/25 transition-all hover:-translate-y-0.5 hover:bg-brand-dark"
            >
              Gespräch vereinbaren
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Swenja ──────────────────────────────────────── */}
      <section className="py-24 sm:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
          <div className="relative">
            <div className="relative overflow-hidden rounded-3xl bg-background p-9 shadow-2xl ring-1 ring-border">
              <BorderBeam size={260} duration={11} />
              <span className="mb-6 grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-brand to-brand-dark text-3xl font-bold text-white shadow-lg">
                S
              </span>
              <h3 className="text-[19px] font-bold text-foreground">
                {schadenmanagerin.name}
              </h3>
              <p className="mt-1 text-[12px] font-semibold uppercase tracking-[0.1em] text-primary">
                {schadenmanagerin.role}
              </p>
              <Quote className="mt-6 h-7 w-7 text-primary/25" />
              <p className="mt-2 border-l-[3px] border-primary pl-5 text-[15px] italic leading-[1.75] text-foreground/80">
                „Ich begleite Sie persönlich durch jeden Schadensfall – von der ersten
                Meldung bis zur Lösung. Ohne Warteschleife, ohne Bürokratie."
              </p>

              {/* Direkte Durchwahl statt Zentrale – der eigentliche Beweis */}
              <div className="mt-7 grid gap-2 border-t border-border pt-6 sm:grid-cols-2">
                <a
                  href={schadenmanagerin.phoneHref}
                  className="flex items-center gap-2.5 rounded-xl bg-muted px-4 py-3 text-[14px] font-semibold text-foreground transition-colors hover:bg-accent"
                >
                  <Phone className="h-4 w-4 shrink-0 text-primary" />
                  {schadenmanagerin.phone}
                </a>
                <a
                  href={schadenmanagerin.emailHref}
                  className="flex items-center gap-2.5 rounded-xl bg-muted px-4 py-3 text-[13px] font-semibold text-foreground transition-colors hover:bg-accent"
                >
                  <Mail className="h-4 w-4 shrink-0 text-primary" />
                  <span className="truncate">Direkt schreiben</span>
                </a>
              </div>
            </div>
            <span className="absolute -right-3 -top-3 rounded-full bg-primary px-4 py-2 text-center text-[12px] font-bold leading-tight text-primary-foreground shadow-xl">
              Eigene
              <br />
              Durchwahl
            </span>
          </div>

          <div>
            <SectionLabel>Im Schadensfall an Ihrer Seite</SectionLabel>
            <h2 className="text-[clamp(1.9rem,3.4vw,2.7rem)] font-extrabold leading-[1.15] tracking-[-0.025em] text-foreground">
              Eine Ansprechpartnerin, die Sie kennt
            </h2>

            <div className="mt-6 space-y-4 text-[16px] leading-[1.8] text-muted-foreground">
              <p>
                Wasserschaden in der Wohnung, Auffahrunfall auf dem Weg zur Arbeit:
                Situationen, in denen niemand Lust auf Formulare und Warteschleifen
                hat. Genau dafür gibt es bei uns eine feste Schadenmanagerin.
              </p>
              <p>
                Swenja-Elisè Möller nimmt Ihren Fall auf, kennt Ihren Vertrag und
                bleibt Ihre Ansprechpartnerin, bis alles geklärt ist. Sie erreichen
                sie unter ihrer eigenen Durchwahl – nicht über die Zentrale.
              </p>
            </div>

            <ul className="mt-8 space-y-3.5">
              {[
                "Schadenmeldung per Telefon, E-Mail oder WhatsApp",
                "Eigene Durchwahl – kein Weiterverbinden über die Zentrale",
                "Sie erfahren von uns, wie der Stand ist, nicht umgekehrt",
                "Über 1,1 Mio. € Schäden allein 2025 für unsere Kunden reguliert",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3 text-[15px] text-foreground/80">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary/12">
                    <Check className="h-3 w-3 text-primary" strokeWidth={3.5} />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Kanzleien ───────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#0a0d0a] py-24 text-white sm:py-28">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-primary/12 blur-[130px]" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <span className="mb-3 inline-block text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
              Unser Spezialgebiet
            </span>
            <h2 className="text-[clamp(1.9rem,3.4vw,2.7rem)] font-extrabold tracking-[-0.025em] text-white">
              Maßgeschneidert für Steuerberater &amp; Anwälte
            </h2>
            <p className="mt-4 text-[16px] leading-relaxed text-white/55">
              Kanzleien haben besondere Anforderungen – und verdienen einen Partner,
              der sie versteht.
            </p>
            <div className="mx-auto mt-5 h-1 w-12 rounded-full bg-primary" />
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Scale,
                title: "Wir kennen Ihre Welt",
                text: "Wir wissen, welche Risiken in einer Kanzlei wirklich zählen – und beraten Sie auf Augenhöhe.",
              },
              {
                icon: Award,
                title: "Sonderkonditionen DAV",
                text: "Als Mitglied im Deutschen Anwaltverein profitieren Sie von exklusiven Konditionen.",
              },
              {
                icon: TrendingUp,
                title: "Sonderkonditionen StbV",
                text: "Steuerberaterinnen und Steuerberater erhalten Schutz zu attraktiven Verbandskonditionen.",
              },
              {
                icon: ShieldCheck,
                title: "Rundum geschützt",
                text: "Von der Berufshaftpflicht bis zum Cyber-Schutz – abgestimmt auf Ihren Kanzleibetrieb.",
              },
            ].map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:bg-white/[0.07]"
              >
                <span className="mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-primary/15 text-primary">
                  <Icon className="h-6 w-6" strokeWidth={1.9} />
                </span>
                <h3 className="mb-2 text-[17px] font-bold text-white">{title}</h3>
                <p className="text-[14px] leading-relaxed text-white/55">{text}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 text-center">
            <Link
              href="/leistungen#kanzleien"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-bold text-primary-foreground shadow-xl shadow-brand/25 transition-all hover:-translate-y-0.5 hover:bg-brand-dark"
            >
              Mehr für Kanzleien erfahren
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Kundenstimmen (nur wenn echte vorhanden) ───── */}
      {testimonials.length > 0 && (
        <section className="bg-muted/50 py-24 sm:py-28">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="mx-auto mb-14 max-w-2xl text-center">
              <SectionLabel>Was Kunden sagen</SectionLabel>
              <h2 className="text-[clamp(1.9rem,3.4vw,2.7rem)] font-extrabold tracking-[-0.025em] text-foreground">
                Vertrauen, das gewachsen ist
              </h2>
              <div className="mx-auto mt-5 h-1 w-12 rounded-full bg-primary" />
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {testimonials.map((t) => (
                <figure
                  key={t.name}
                  className="flex flex-col rounded-2xl border border-border bg-background p-7 shadow-sm"
                >
                  <Quote className="mb-4 h-7 w-7 shrink-0 text-primary/25" />
                  <blockquote className="flex-1 text-[15px] leading-[1.75] text-foreground/80">
                    {t.quote}
                  </blockquote>
                  <figcaption className="mt-6 border-t border-border pt-5">
                    <span className="block text-[14px] font-bold text-foreground">
                      {t.name}
                    </span>
                    <span className="text-[13px] text-muted-foreground">{t.role}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── FAQ (Lightswind Accordion) ─────────────────── */}
      <section className="py-24 sm:py-28">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <div className="mb-12 text-center">
            <SectionLabel>Häufige Fragen</SectionLabel>
            <h2 className="text-[clamp(1.9rem,3.4vw,2.7rem)] font-extrabold tracking-[-0.025em] text-foreground">
              Das fragen uns Kunden am häufigsten
            </h2>
            <div className="mx-auto mt-5 h-1 w-12 rounded-full bg-primary" />
          </div>

          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((f, i) => (
              <AccordionItem
                key={f.q}
                value={`item-${i}`}
                className="overflow-hidden rounded-xl border border-border bg-background px-5"
              >
                <AccordionTrigger className="py-5 text-left text-[16px] font-semibold text-foreground hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-[15px] leading-relaxed text-muted-foreground">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ── Abschluss-CTA ───────────────────────────────── */}
      <section className="relative overflow-hidden bg-[linear-gradient(135deg,#2d5e29_0%,#3d7a3a_50%,#68a040_100%)] py-24 text-center text-white sm:py-28">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
        <div className="relative mx-auto max-w-3xl px-5 sm:px-8">
          <span className="mb-3 inline-block text-[11px] font-semibold uppercase tracking-[0.16em] text-white/70">
            Ihr nächster Schritt
          </span>
          <h2 className="text-[clamp(1.9rem,3.6vw,2.9rem)] font-extrabold leading-[1.15] tracking-[-0.025em] text-white">
            Bereit für Versicherung, die sich um Sie kümmert?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[17px] leading-relaxed text-white/75">
            Vereinbaren Sie Ihr kostenloses, unverbindliches Kennenlerngespräch –
            vor Ort, telefonisch oder per Videocall.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link
              href="/kontakt"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-bold text-brand-dark shadow-xl shadow-black/20 transition-all hover:-translate-y-0.5"
            >
              Gespräch vereinbaren
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href={site.phoneHref}
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/35 px-8 py-3.5 text-sm font-semibold text-white transition-all hover:border-white hover:bg-white/10"
            >
              {site.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
