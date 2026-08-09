import { Star } from "lucide-react";
import { cn } from "@/components/lib/utils";
import { provenExpert } from "@/lib/site";

/**
 * Bewertungsnachweis von ProvenExpert.
 *
 * Bewusst als statisches Abzeichen mit Link auf das Profil statt als
 * eingebundenes ProSeal-Widget: Das offizielle Widget laedt Fremd-JavaScript
 * beim Seitenaufruf, was Ladezeit kostet und in der DSGVO-Betrachtung
 * einwilligungspflichtig sein kann. Die Zahlen stehen darum in site.ts und
 * muessen dort gepflegt werden – siehe Hinweis am Datensatz.
 */
export function ProvenExpertBadge({
  tone = "dark",
  className = "",
}: {
  tone?: "dark" | "light";
  className?: string;
}) {
  const onDark = tone === "dark";
  const full = Math.floor(provenExpert.rating);

  return (
    <a
      href={provenExpert.profileUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group inline-flex items-center gap-4 rounded-md border px-5 py-3.5 transition-colors",
        onDark
          ? "border-white/20 hover:border-white/45"
          : "border-border bg-surface hover:border-brand/50",
        className,
      )}
    >
      <span className="flex flex-col gap-1.5">
        <span className="flex items-center gap-2">
          <span
            className={cn(
              "text-[19px] font-semibold leading-none tabular-nums",
              onDark ? "text-white" : "text-foreground",
            )}
          >
            {provenExpert.rating.toLocaleString("de-DE", {
              minimumFractionDigits: 2,
            })}
          </span>
          <span className="flex gap-0.5" aria-hidden>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "h-3.5 w-3.5",
                  i < full
                    ? "fill-[#f5a623] text-[#f5a623]"
                    : "fill-[#f5a623]/45 text-[#f5a623]/45",
                )}
                strokeWidth={0}
              />
            ))}
          </span>
        </span>
        <span
          className={cn(
            "text-[12.5px] leading-none",
            onDark ? "text-white/50" : "text-muted-foreground",
          )}
        >
          {provenExpert.count} Bewertungen · ProvenExpert
        </span>
      </span>
    </a>
  );
}
