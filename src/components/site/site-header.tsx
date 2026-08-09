"use client";

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

  // Über dem Hero transparent, danach solide
  const transparent = isHome && !scrolled;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        transparent
          ? "bg-transparent"
          : "border-b border-border/70 bg-background/80 backdrop-blur-xl"
      )}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-3">
          <span
            className={cn(
              "relative grid h-11 w-11 shrink-0 place-items-center rounded-xl text-[15px] font-extrabold tracking-tight shadow-lg transition-colors",
              transparent
                ? "bg-white text-brand-dark shadow-black/20"
                : "bg-gradient-to-br from-brand to-brand-dark text-white shadow-brand/30"
            )}
          >
            TH
            <span className="pointer-events-none absolute inset-0 rounded-xl bg-[radial-gradient(circle_at_30%_22%,rgba(255,255,255,0.35),transparent_55%)]" />
          </span>
          <span className="flex flex-col leading-tight">
            <span
              className={cn(
                "text-[15px] font-bold tracking-tight transition-colors",
                transparent ? "text-white" : "text-foreground"
              )}
            >
              {site.name}
            </span>
            <span
              className={cn(
                "text-[10px] font-medium uppercase tracking-[0.14em] transition-colors",
                transparent ? "text-white/65" : "text-muted-foreground"
              )}
            >
              HDI Generalvertretung
            </span>
          </span>
        </Link>

        {/* Desktop-Navigation */}
        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => {
            const active =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                  transparent
                    ? "text-white/85 hover:bg-white/10 hover:text-white"
                    : "text-foreground/75 hover:bg-muted hover:text-foreground",
                  active && (transparent ? "text-white" : "text-primary")
                )}
              >
                {item.label}
                {active && (
                  <span
                    className={cn(
                      "absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full",
                      transparent ? "bg-white" : "bg-primary"
                    )}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Aktionen */}
        <div className="flex items-center gap-3">
          <a
            href={site.phoneHref}
            className={cn(
              "hidden items-center gap-2 text-sm font-semibold transition-colors md:flex",
              transparent ? "text-white/90 hover:text-white" : "text-primary hover:text-brand-dark"
            )}
          >
            <Phone className="h-4 w-4" />
            {site.phone}
          </a>

          <Link
            href="/kontakt"
            className={cn(
              "hidden rounded-full px-5 py-2.5 text-sm font-semibold shadow-lg transition-all hover:-translate-y-0.5 sm:inline-flex",
              transparent
                ? "bg-white text-brand-dark shadow-black/20 hover:bg-white/92"
                : "bg-primary text-primary-foreground shadow-brand/30 hover:bg-brand-dark"
            )}
          >
            Beratung anfragen
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Menü schließen" : "Menü öffnen"}
            aria-expanded={open}
            className={cn(
              "grid h-10 w-10 place-items-center rounded-lg transition-colors lg:hidden",
              transparent
                ? "text-white hover:bg-white/10"
                : "text-foreground hover:bg-muted"
            )}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile-Navigation */}
      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-5 sm:px-8">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-4 py-3 text-base font-medium text-foreground hover:bg-muted"
              >
                {item.label}
              </Link>
            ))}
            <a
              href={site.phoneHref}
              className="mt-2 flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
            >
              <Phone className="h-4 w-4" />
              {site.phone}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
