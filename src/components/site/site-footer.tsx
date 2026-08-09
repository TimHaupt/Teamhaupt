import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { nav, openingHours, services, site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-[1240px] px-6 py-20 lg:px-10">
        <div className="grid gap-14 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
          {/* Marke */}
          <div>
            <div className="flex items-center gap-3">
              <Image
                src="/img/logo-gruen.png"
                alt="HDI Generalvertretung Tim Haupt"
                width={645}
                height={645}
                sizes="38px"
                className="h-[38px] w-[38px]"
              />
              <span className="flex flex-col leading-none">
                <span className="text-[15px] font-medium text-foreground">
                  Tim Haupt
                </span>
                <span className="mt-1 text-[9.5px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                  HDI Generalvertretung
                </span>
              </span>
            </div>

            <p className="mt-6 max-w-[24rem] text-[14.5px] leading-[1.7] text-muted-foreground">
              Ihre Versicherungsagentur in {site.city}. Acht IHK-geprüfte Köpfe,
              über 5.000 betreute Privat- und Firmenkunden.
            </p>

            <div className="mt-8 flex items-center gap-6">
              <Image
                src="/img/siegel.png"
                alt="Gütesiegel gut beraten"
                width={626}
                height={204}
                sizes="170px"
                className="h-auto w-[170px]"
              />
            </div>
          </div>

          {/* Leistungen */}
          <div>
            <h3 className="eyebrow">Leistungen</h3>
            <ul className="mt-6 space-y-3">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/leistungen#${s.slug}`}
                    className="text-[14.5px] text-muted-foreground transition-colors hover:text-brand"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="eyebrow">Navigation</h3>
            <ul className="mt-6 space-y-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[14.5px] text-muted-foreground transition-colors hover:text-brand"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/impressum"
                  className="text-[14.5px] text-muted-foreground transition-colors hover:text-brand"
                >
                  Impressum
                </Link>
              </li>
              <li>
                <Link
                  href="/datenschutz"
                  className="text-[14.5px] text-muted-foreground transition-colors hover:text-brand"
                >
                  Datenschutz
                </Link>
              </li>
            </ul>
          </div>

          {/* Kontakt */}
          <div>
            <h3 className="eyebrow">Kontakt</h3>
            <ul className="mt-6 space-y-4">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" strokeWidth={1.6} />
                <span className="text-[14.5px] leading-relaxed text-muted-foreground">
                  {site.street}
                  <br />
                  {site.zip} {site.city}
                </span>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand" strokeWidth={1.6} />
                <a
                  href={site.phoneHref}
                  className="text-[14.5px] text-muted-foreground tabular-nums transition-colors hover:text-brand"
                >
                  {site.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand" strokeWidth={1.6} />
                <a
                  href={site.emailHref}
                  className="break-all text-[14.5px] text-muted-foreground transition-colors hover:text-brand"
                >
                  {site.email}
                </a>
              </li>
            </ul>

            <dl className="mt-8 border-t border-border pt-6">
              <dt className="eyebrow">Öffnungszeiten</dt>
              <dd className="mt-4 space-y-2">
                {openingHours.map((o) => (
                  <span key={o.day} className="flex justify-between gap-4 text-[13.5px]">
                    <span className="text-muted-foreground">{o.day}</span>
                    <span className="shrink-0 text-foreground tabular-nums">{o.time}</span>
                  </span>
                ))}
              </dd>
            </dl>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-border pt-8 text-[13px] text-muted-foreground sm:flex-row sm:items-center">
          <span>
            © {new Date().getFullYear()} {site.legalName} · {site.city}
          </span>
          <div className="flex gap-7">
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
