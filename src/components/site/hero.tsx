"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  Building2,
  Check,
  Home,
  Phone,
  Scale,
  TrendingUp,
  Users,
} from "lucide-react";
import { cn } from "@/components/lib/utils";
import FocusReveal from "@/components/originkit/focus-reveal";
import { site } from "@/lib/site";

const promises = [
  "Ein fester Ansprechpartner – kein Callcenter",
  "Ehrliche Empfehlungen statt Verkaufsdruck",
  "Schnelle Hilfe, wenn es darauf ankommt",
];

const cards = [
  {
    icon: Users,
    title: "Persönliche Betreuung",
    text: "Von der ersten Frage bis zum Schadensfall: Menschen an Ihrer Seite, die Sie und Ihre Verträge kennen.",
    featured: true,
  },
  { icon: Home, title: "Privat & Familie", text: "Sicher zuhause und im Alltag." },
  { icon: Building2, title: "Ihr Unternehmen", text: "Schutz, der zum Betrieb passt." },
  { icon: Scale, title: "Kanzlei-Spezialist", text: "Für Steuerberater & Anwälte." },
  { icon: TrendingUp, title: "Clever vorsorgen", text: "Zukunft durchdacht planen." },
];

/**
 * Einblenden per CSS-Transition statt JS-Animation: Der Hero ist der wichtigste
 * Bereich der Seite und soll nicht davon abhängen, dass eine Animations-Runtime
 * durchläuft. Die Endzustände stehen im Markup, die Bewegung ist nur Zugabe.
 */
function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

const rise = (mounted: boolean) =>
  cn(
    "transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none",
    mounted ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
  );

export function Hero() {
  const mounted = useMounted();

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-[linear-gradient(145deg,#1b431a_0%,#2d5e29_38%,#3d7a3a_72%,#68a040_100%)] pt-20">
      {/* Lichtstimmung */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_78%,rgba(0,0,0,0.28),transparent_55%),radial-gradient(circle_at_82%_18%,rgba(255,255,255,0.10),transparent_45%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_78%)]" />
      </div>

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-16 px-5 py-24 sm:px-8 lg:grid-cols-2 lg:gap-20">
        {/* Textspalte */}
        <div>
          <div
            className={cn(
              "mb-7 inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-md",
              rise(mounted),
            )}
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime-300 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-lime-300" />
            </span>
            Offizielle HDI Generalvertretung · {site.city}
          </div>

          <div className="text-[clamp(2.4rem,5.4vw,4.1rem)] font-extrabold leading-[1.06] tracking-[-0.03em]">
            <FocusReveal
              as="h1"
              text="Versicherung mit"
              className="text-white"
              blur={14}
              transition={{ duration: 0.5, delay: 0.15, staggerChildren: 0.028 }}
            />
            <FocusReveal
              as="span"
              text="echtem Ansprechpartner."
              className="text-lime-200"
              blur={14}
              transition={{ duration: 0.5, delay: 0.62, staggerChildren: 0.028 }}
            />
          </div>

          <p
            className={cn(
              "mt-6 max-w-xl text-[17px] leading-relaxed text-white/75 delay-150",
              rise(mounted),
            )}
          >
            Acht IHK-geprüfte Köpfe in Erfurt, über 5.000 betreute Privat- und
            Firmenkunden – und im Schadensfall eine feste Ansprechpartnerin mit
            eigener Durchwahl statt einer Hotline.
          </p>

          <div className={cn("mt-9 flex flex-wrap gap-3 delay-200", rise(mounted))}>
            <Link
              href="/kontakt"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-brand-dark shadow-xl shadow-black/20 transition-all hover:-translate-y-0.5 hover:shadow-2xl"
            >
              Gespräch vereinbaren
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href={site.phoneHref}
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/35 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-white hover:bg-white/10"
            >
              <Phone className="h-4 w-4" />
              {site.phone}
            </a>
          </div>

          <ul className={cn("mt-11 space-y-3.5 delay-300", rise(mounted))}>
            {promises.map((p) => (
              <li
                key={p}
                className="flex items-center gap-3.5 text-[15px] font-medium text-white"
              >
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-white/25 bg-white/15">
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                </span>
                {p}
              </li>
            ))}
          </ul>
        </div>

        {/* Kartenspalte */}
        <div className="hidden grid-cols-2 gap-4 lg:grid">
          {cards.map((c, i) => {
            const Icon = c.icon;
            return (
              <div
                key={c.title}
                style={{ transitionDelay: `${150 + i * 90}ms` }}
                className={cn(
                  "group rounded-2xl border border-white/15 bg-white/10 p-6 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.25)] backdrop-blur-xl hover:border-white/30 hover:bg-white/[0.16]",
                  rise(mounted),
                  c.featured && "col-span-2 flex items-center gap-5",
                )}
              >
                <span
                  className={cn(
                    "grid shrink-0 place-items-center rounded-xl bg-white/15 text-white",
                    c.featured ? "h-14 w-14" : "mb-4 h-11 w-11",
                  )}
                >
                  <Icon className={c.featured ? "h-7 w-7" : "h-5 w-5"} strokeWidth={1.8} />
                </span>
                <div>
                  <h3 className="text-[15px] font-bold text-white">{c.title}</h3>
                  <p className="mt-1 text-[13px] leading-relaxed text-white/65">{c.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
