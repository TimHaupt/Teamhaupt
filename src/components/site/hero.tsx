"use client";

import Link from "next/link";
import { motion } from "framer-motion";
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

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.21, 0.47, 0.32, 0.98] as const },
  }),
};

export function Hero() {
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
          <motion.div
            initial="hidden"
            animate="show"
            custom={0}
            variants={fadeUp}
            className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-md"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime-300 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-lime-300" />
            </span>
            Offizielle HDI Generalvertretung · {site.city}
          </motion.div>

          <motion.h1
            initial="hidden"
            animate="show"
            custom={1}
            variants={fadeUp}
            className="text-[clamp(2.4rem,5.4vw,4.1rem)] font-extrabold leading-[1.06] tracking-[-0.03em] text-white"
          >
            Versicherung mit
            <br />
            <span className="bg-gradient-to-r from-white via-lime-100 to-lime-200 bg-clip-text text-transparent">
              echtem Ansprechpartner.
            </span>
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="show"
            custom={2}
            variants={fadeUp}
            className="mt-6 max-w-xl text-[17px] leading-relaxed text-white/75"
          >
            Schluss mit Warteschleifen und Lösungen von der Stange. Bei uns betreut
            Sie ein festes, IHK-geprüftes Team – persönlich, ehrlich und immer
            erreichbar.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="show"
            custom={3}
            variants={fadeUp}
            className="mt-9 flex flex-wrap gap-3"
          >
            <Link
              href="/kontakt"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-brand-dark shadow-xl shadow-black/20 transition-all hover:-translate-y-0.5 hover:shadow-2xl"
            >
              Kostenlos beraten lassen
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href={site.phoneHref}
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/35 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-white hover:bg-white/10"
            >
              <Phone className="h-4 w-4" />
              {site.phone}
            </a>
          </motion.div>

          <motion.ul
            initial="hidden"
            animate="show"
            custom={4}
            variants={fadeUp}
            className="mt-11 space-y-3.5"
          >
            {promises.map((p) => (
              <li key={p} className="flex items-center gap-3.5 text-[15px] font-medium text-white">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-white/25 bg-white/15">
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                </span>
                {p}
              </li>
            ))}
          </motion.ul>
        </div>

        {/* Kartenspalte */}
        <div className="hidden grid-cols-2 gap-4 lg:grid">
          {cards.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.div
                key={c.title}
                initial="hidden"
                animate="show"
                custom={i + 2}
                variants={fadeUp}
                className={`group rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-white/30 hover:bg-white/[0.16] ${
                  c.featured ? "col-span-2 flex items-center gap-5" : ""
                }`}
              >
                <span
                  className={`grid shrink-0 place-items-center rounded-xl bg-white/15 text-white ${
                    c.featured ? "h-14 w-14" : "mb-4 h-11 w-11"
                  }`}
                >
                  <Icon className={c.featured ? "h-7 w-7" : "h-5 w-5"} strokeWidth={1.8} />
                </span>
                <div>
                  <h3 className="text-[15px] font-bold text-white">{c.title}</h3>
                  <p className="mt-1 text-[13px] leading-relaxed text-white/65">{c.text}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
