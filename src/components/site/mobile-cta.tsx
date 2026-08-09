"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CalendarCheck, Phone } from "lucide-react";
import { site } from "@/lib/site";

/**
 * Mobile Kontakt-Leiste: erscheint unterhalb von lg nach ~600 px Scroll.
 * Der Spacer reserviert am Seitenende Platz, damit die fixe Leiste den
 * Footer nicht verdeckt.
 */
export function MobileCta() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div aria-hidden className="h-20 lg:hidden" />
      <div
        className={`fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur transition-transform duration-300 motion-reduce:transition-none lg:hidden ${
          show ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="mx-auto grid max-w-[1240px] grid-cols-2 gap-2.5 px-4 pb-[calc(env(safe-area-inset-bottom)+10px)] pt-2.5">
          <a
            href={site.phoneHref}
            className="inline-flex items-center justify-center gap-2 rounded-md border border-border px-4 py-3 text-[14px] font-medium text-foreground tabular-nums"
          >
            <Phone className="h-4 w-4" strokeWidth={1.8} />
            Anrufen
          </a>
          <Link
            href="/kontakt"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-brand px-4 py-3 text-[14px] font-medium text-white"
          >
            <CalendarCheck className="h-4 w-4" strokeWidth={1.8} />
            Termin
          </Link>
        </div>
      </div>
    </>
  );
}
