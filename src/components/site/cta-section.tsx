import type { ReactNode } from "react";

/**
 * Gruene Abschlussflaeche im Stil der Angebotsunterlagen.
 *
 * Lag zuvor dreimal wortgleich in page/kanzleien/heilberufe. Die Klasse
 * `cta-green` ist zugleich der Anker fuer den hellen Fokusring in
 * globals.css – auf dem Verlauf waere der normale gruene Ring unsichtbar.
 */
export function CtaSection({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  lead: ReactNode;
  /** Buttons rechts unten. */
  children: ReactNode;
}) {
  return (
    <section className="cta-green relative overflow-hidden bg-[linear-gradient(140deg,var(--brand-deep)_0%,#2d5e29_46%,#3d7a3a_76%,#4c8f42_110%)] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_82%_18%,rgba(104,160,64,0.38),transparent_55%)]" />
      <div className="relative mx-auto max-w-[1240px] px-6 py-16 sm:py-20 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <div>
            <p className="eyebrow text-white/65">{eyebrow}</p>
            <h2 className="display mt-4 text-[clamp(1.8rem,3.3vw,2.65rem)] text-white">
              {title}
            </h2>
            <p className="mt-5 max-w-[32rem] text-[16.5px] leading-[1.75] text-white/75">
              {lead}
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">{children}</div>
        </div>
      </div>
    </section>
  );
}
