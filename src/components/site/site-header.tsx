"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { cn } from "@/components/lib/utils";
import { nav, site } from "@/lib/site";

export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  /**
   * Escape schliesst das Menue und gibt den Fokus an den Button zurueck.
   * Ohne das bleibt die Tastaturbedienung bei gesperrtem Body-Scroll
   * in einem Zustand haengen, aus dem nur die Maus herausfuehrt.
   */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      toggleRef.current?.focus();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  /** Über dem dunklen Hero hell, danach auf hellem Grund dunkel. */
  const onDark = isHome && !scrolled;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        onDark ? "bg-transparent" : "border-b border-border bg-background/95 backdrop-blur",
      )}
    >
      <div className="mx-auto flex h-[72px] max-w-[1240px] items-center justify-between gap-8 px-6 lg:px-10">
        {/* Wortmarke */}
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <Image
            src={onDark ? "/img/logo-weiss.png" : "/img/logo-gruen.png"}
            alt="HDI Generalvertretung Tim Haupt"
            width={645}
            height={645}
            priority
            sizes="34px"
            className="h-[34px] w-[34px]"
          />
          <span className="flex flex-col leading-none">
            <span
              className={cn(
                "text-[15px] font-medium tracking-[-0.01em] transition-colors",
                onDark ? "text-white" : "text-foreground",
              )}
            >
              Tim Haupt
            </span>
            <span
              className={cn(
                "mt-1 text-[9.5px] font-medium uppercase tracking-[0.16em] transition-colors",
                onDark ? "text-white/55" : "text-muted-foreground",
              )}
            >
              HDI Generalvertretung
            </span>
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-7 lg:flex">
          {nav.map((item) => {
            const active =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative py-1 text-[14px] transition-colors",
                  onDark
                    ? active
                      ? "text-white"
                      : "text-white/65 hover:text-white"
                    : active
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                )}
              >
                {item.label}
                {active && (
                  <span
                    className={cn(
                      "absolute -bottom-0.5 left-0 h-px w-full",
                      onDark ? "bg-brand-bright" : "bg-brand",
                    )}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Aktionen */}
        <div className="flex shrink-0 items-center gap-5">
          <a
            href={site.phoneHref}
            className={cn(
              "hidden items-center gap-2 text-[14px] tabular-nums transition-colors xl:flex",
              onDark ? "text-white/75 hover:text-white" : "text-muted-foreground hover:text-foreground",
            )}
          >
            <Phone className="h-3.5 w-3.5" strokeWidth={1.8} />
            {site.phone}
          </a>

          <Link
            href="/kontakt"
            className={cn(
              "hidden rounded-md px-5 py-2.5 text-[13.5px] font-medium transition-colors sm:inline-flex",
              onDark
                ? "bg-white text-brand-ink hover:bg-white/90"
                : "bg-brand text-white hover:bg-brand-ink",
            )}
          >
            Termin vereinbaren
          </Link>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Menü schließen" : "Menü öffnen"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className={cn(
              "-mr-2 grid h-10 w-10 place-items-center transition-colors lg:hidden",
              onDark ? "text-white" : "text-foreground",
            )}
          >
            {open ? <X className="h-5 w-5" strokeWidth={1.6} /> : <Menu className="h-5 w-5" strokeWidth={1.6} />}
          </button>
        </div>
      </div>

      {/* Mobiles Menü */}
      {open && (
        <div id="mobile-menu" className="border-t border-border bg-background lg:hidden">
          <nav className="mx-auto flex max-w-[1240px] flex-col px-6 py-2">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="border-b border-border py-4 text-[15px] text-foreground last:border-0"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mx-auto flex max-w-[1240px] flex-col gap-2 px-6 pb-6 pt-2">
            <Link
              href="/kontakt"
              className="flex items-center justify-center rounded-md bg-brand px-5 py-3.5 text-[14px] font-medium text-white"
            >
              Termin vereinbaren
            </Link>
            <a
              href={site.phoneHref}
              className="flex items-center justify-center gap-2 rounded-md border border-border px-5 py-3.5 text-[14px] font-medium text-foreground"
            >
              <Phone className="h-4 w-4" strokeWidth={1.8} />
              {site.phone}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
