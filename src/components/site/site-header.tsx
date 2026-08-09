"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { cn } from "@/components/lib/utils";
import { nav, site } from "@/lib/site";

export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  /** Über dem Hero dunkel-transparent, nach dem Scrollen hell. */
  const dark = isHome && !scrolled;

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:pt-5">
      <div
        className={cn(
          "mx-auto flex h-16 max-w-5xl items-center justify-between gap-3 rounded-full border pl-4 pr-2 transition-all duration-300 sm:pl-5",
          dark
            ? "border-white/15 bg-black/25 shadow-2xl shadow-black/25 backdrop-blur-xl"
            : "border-border bg-background/90 shadow-xl shadow-black/[0.06] backdrop-blur-xl",
        )}
      >
        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <Image
            src={dark ? "/img/logo-weiss.png" : "/img/logo-gruen.png"}
            alt="Logo der HDI Generalvertretung Tim Haupt"
            width={645}
            height={645}
            priority
            sizes="40px"
            className="h-10 w-10 shrink-0"
          />
          <span className="flex flex-col leading-tight">
            <span
              className={cn(
                "text-[14px] font-bold tracking-tight transition-colors",
                dark ? "text-white" : "text-foreground",
              )}
            >
              {site.name}
            </span>
            <span
              className={cn(
                "hidden text-[9px] font-medium uppercase tracking-[0.14em] transition-colors sm:block",
                dark ? "text-white/60" : "text-muted-foreground",
              )}
            >
              HDI Generalvertretung
            </span>
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-0.5 lg:flex">
          {nav.map((item) => {
            const active =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-4 py-2 text-[14px] font-medium transition-colors",
                  dark
                    ? active
                      ? "bg-white/15 text-white"
                      : "text-white/75 hover:bg-white/10 hover:text-white"
                    : active
                      ? "bg-primary/10 text-primary"
                      : "text-foreground/70 hover:bg-muted hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Aktionen */}
        <div className="flex shrink-0 items-center gap-2">
          <a
            href={site.phoneHref}
            className={cn(
              "hidden items-center gap-1.5 rounded-full px-3 py-2 text-[13px] font-semibold transition-colors xl:flex",
              dark
                ? "text-white/85 hover:bg-white/10 hover:text-white"
                : "text-primary hover:bg-muted",
            )}
          >
            <Phone className="h-3.5 w-3.5" />
            {site.phone}
          </a>

          <Link
            href="/kontakt"
            className="hidden rounded-full bg-primary px-5 py-2.5 text-[14px] font-semibold text-primary-foreground shadow-lg shadow-brand/25 transition-all hover:-translate-y-0.5 hover:bg-brand-dark sm:inline-flex"
          >
            Gespräch vereinbaren
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Menü schließen" : "Menü öffnen"}
            aria-expanded={open}
            className={cn(
              "grid h-11 w-11 place-items-center rounded-full transition-colors lg:hidden",
              dark ? "text-white hover:bg-white/10" : "text-foreground hover:bg-muted",
            )}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile-Menü als schwebende Karte */}
      {open && (
        <div className="mx-auto mt-2 max-w-5xl overflow-hidden rounded-3xl border border-border bg-background p-3 shadow-2xl lg:hidden">
          <nav className="flex flex-col gap-1">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl px-4 py-3 text-base font-medium text-foreground hover:bg-muted"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-2 flex flex-col gap-2 border-t border-border pt-3">
            <Link
              href="/kontakt"
              className="flex items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
            >
              Gespräch vereinbaren
            </Link>
            <a
              href={site.phoneHref}
              className="flex items-center justify-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-semibold text-primary"
            >
              <Phone className="h-4 w-4" />
              {site.phone}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
