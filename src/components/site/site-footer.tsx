import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { nav, openingHours, services, site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/5 bg-[#0a0d0a] text-white/70">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1.3fr]">
          {/* Marke */}
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span className="relative grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-brand to-brand-dark text-[15px] font-extrabold tracking-tight text-white shadow-lg shadow-brand/25">
                TH
              </span>
              <span className="flex flex-col leading-tight">
                <span className="text-[15px] font-bold text-white">{site.name}</span>
                <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-white/50">
                  HDI Generalvertretung
                </span>
              </span>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-white/50">
              Ihr persönlicher Versicherungspartner in {site.city}. IHK-geprüft,
              ehrlich beraten, schnell im Ernstfall.
            </p>
          </div>

          {/* Leistungen */}
          <div>
            <h3 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white">
              Leistungen
            </h3>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/leistungen#${s.slug}`}
                    className="text-sm text-white/50 transition-colors hover:text-brand"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white">
              Navigation
            </h3>
            <ul className="space-y-2.5">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/50 transition-colors hover:text-brand"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/impressum"
                  className="text-sm text-white/50 transition-colors hover:text-brand"
                >
                  Impressum
                </Link>
              </li>
              <li>
                <Link
                  href="/datenschutz"
                  className="text-sm text-white/50 transition-colors hover:text-brand"
                >
                  Datenschutz
                </Link>
              </li>
            </ul>
          </div>

          {/* Kontakt */}
          <div>
            <h3 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white">
              Kontakt
            </h3>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                <span className="text-sm text-white/50">
                  {site.street}
                  <br />
                  {site.zip} {site.city}
                </span>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                <a
                  href={site.phoneHref}
                  className="text-sm text-white/50 transition-colors hover:text-brand"
                >
                  {site.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                <a
                  href={site.emailHref}
                  className="break-all text-sm text-white/50 transition-colors hover:text-brand"
                >
                  {site.email}
                </a>
              </li>
            </ul>

            <div className="mt-6 rounded-xl border border-white/5 bg-white/[0.03] p-4">
              <h4 className="mb-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/70">
                Öffnungszeiten
              </h4>
              <ul className="space-y-1.5">
                {openingHours.map((o) => (
                  <li key={o.day} className="flex justify-between gap-3 text-xs">
                    <span className="text-white/45">{o.day}</span>
                    <span className="shrink-0 font-medium text-brand">{o.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 text-xs text-white/35 sm:flex-row">
          <span>
            © {new Date().getFullYear()} {site.legalName} · {site.city}
          </span>
          <div className="flex gap-6">
            <Link href="/impressum" className="transition-colors hover:text-brand">
              Impressum
            </Link>
            <Link href="/datenschutz" className="transition-colors hover:text-brand">
              Datenschutz
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
