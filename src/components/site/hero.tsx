"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, Phone } from "lucide-react";
import { cn } from "@/components/lib/utils";
import { site, stats } from "@/lib/site";

/**
 * Einblenden per CSS-Transition: Der Hero ist der wichtigste Bereich der Seite
 * und darf nicht davon abhängen, dass eine Animations-Runtime durchläuft.
 */
function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

export function Hero() {
  const mounted = useMounted();

  const rise = (delay: string) =>
    cn(
      "transition-[opacity,transform] duration-[900ms] ease-out motion-reduce:transition-none",
      delay,
      mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
    );

  return (
    <section className="relative isolate overflow-hidden bg-brand-ink">
      {/* Teamfoto: rechts angeschnitten, nach links in die Fläche verlaufend */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-y-0 right-0 w-full lg:w-[64%]">
          <Image
            src="/img/team-dunkel.png"
            alt=""
            aria-hidden
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 64vw"
            className="object-cover object-[62%_center] opacity-70 lg:opacity-90"
          />
        </div>
        {/* Verlauf, der die Textseite freistellt */}
        <div className="absolute inset-0 bg-[linear-gradient(100deg,var(--brand-ink)_0%,var(--brand-ink)_36%,rgba(13,20,16,0.82)_54%,rgba(13,20,16,0.35)_78%,rgba(13,20,16,0.15)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(to_top,var(--brand-ink),transparent)]" />
      </div>

      <div className="relative mx-auto max-w-[1240px] px-6 pb-20 pt-40 sm:pb-24 sm:pt-44 lg:px-10 lg:pb-28 lg:pt-52">
        <div className="max-w-[46rem]">
          <p className={cn("eyebrow text-white/50", rise("delay-0"))}>
            HDI Generalvertretung · Erfurt
          </p>

          <h1
            className={cn(
              "display mt-6 text-[clamp(2.6rem,6vw,4.6rem)] text-white",
              rise("delay-100"),
            )}
          >
            Versicherung ist
            <br />
            Vertrauenssache.
          </h1>

          <p
            className={cn(
              "mt-7 max-w-[34rem] text-[17px] leading-[1.75] text-white/65",
              rise("delay-200"),
            )}
          >
            Acht IHK-geprüfte Köpfe in Erfurt betreuen über 5.000 Privat- und
            Firmenkunden. Im Schadensfall erreichen Sie eine feste
            Ansprechpartnerin unter ihrer eigenen Durchwahl – nicht über eine
            Hotline.
          </p>

          <div className={cn("mt-10 flex flex-wrap items-center gap-3", rise("delay-300"))}>
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
              className="inline-flex items-center gap-2.5 rounded-md border border-white/25 px-7 py-4 text-[14.5px] font-medium text-white tabular-nums transition-colors hover:border-white/60"
            >
              <Phone className="h-4 w-4" strokeWidth={1.8} />
              {site.phone}
            </a>
          </div>
        </div>

        {/* Kennzahlen als ruhige Zeile statt bunter Kacheln */}
        <dl
          className={cn(
            "mt-20 grid max-w-[54rem] grid-cols-1 gap-px border-t border-white/12 sm:grid-cols-3",
            rise("delay-500"),
          )}
        >
          {stats.map((s) => (
            <div key={s.label} className="pt-7 sm:pr-8">
              <dd className="display text-[clamp(1.8rem,3vw,2.4rem)] text-white tabular-nums">
                {s.value}
              </dd>
              <dt className="mt-2 text-[13.5px] leading-snug text-white/50">
                {s.label}
                <span className="block text-white/35">{s.note}</span>
              </dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
