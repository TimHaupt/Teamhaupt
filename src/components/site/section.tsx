import { cn } from "@/components/lib/utils";
import { Reveal } from "@/components/site/reveal";

type Tone = "light" | "paper" | "dark";

const toneClass: Record<Tone, string> = {
  light: "bg-background",
  paper: "bg-muted",
  dark: "bg-brand-ink text-white",
};

export function Section({
  eyebrow,
  title,
  lead,
  children,
  className,
  tone = "light",
  id,
}: {
  eyebrow?: string;
  title?: string;
  lead?: string;
  children?: React.ReactNode;
  className?: string;
  tone?: Tone;
  id?: string;
}) {
  const dark = tone === "dark";
  const hasHeader = Boolean(eyebrow || title || lead);

  return (
    <section id={id} className={cn(toneClass[tone], className)}>
      <div className="mx-auto max-w-[1240px] px-6 py-16 sm:py-20 lg:px-10">
        {hasHeader && (
          <Reveal className="max-w-[42rem]">
            {eyebrow && (
              <p className={cn("eyebrow", dark && "text-brand-bright")}>{eyebrow}</p>
            )}
            {title && (
              <h2
                className={cn(
                  "display mt-5 text-[clamp(1.65rem,2.9vw,2.35rem)]",
                  dark ? "text-white" : "text-foreground",
                )}
              >
                {title}
              </h2>
            )}
            {lead && (
              <p
                className={cn(
                  "mt-5 text-[16.5px] leading-[1.75]",
                  dark ? "text-white/55" : "text-muted-foreground",
                )}
              >
                {lead}
              </p>
            )}
          </Reveal>
        )}
        {/* Leichter Versatz, damit Kopf und Inhalt nacheinander ankommen statt
            als ein Block – aber nur, wenn es ueberhaupt einen Kopf gibt. */}
        {children && <Reveal delay={hasHeader ? 0.1 : 0}>{children}</Reveal>}
      </div>
    </section>
  );
}

/** Kopfbereich der Unterseiten – dunkel, damit der helle Header darauf sitzt. */
export function PageHero({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-brand-ink">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_75%_25%,rgba(61,122,58,0.22),transparent_60%)]" />
      <div className="relative mx-auto max-w-[1240px] px-6 pb-16 pt-32 sm:pb-20 sm:pt-36 lg:px-10">
        <p className="eyebrow text-brand-bright">{eyebrow}</p>
        <h1 className="display mt-6 max-w-[24ch] text-[clamp(2rem,4.2vw,3.2rem)] text-white">
          {title}
        </h1>
        {lead && (
          <p className="mt-7 max-w-[38rem] text-[17px] leading-[1.75] text-white/60">
            {lead}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
