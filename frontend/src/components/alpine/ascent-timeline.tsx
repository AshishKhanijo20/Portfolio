import type { Locale } from "@/i18n/config";
import { ascent, tr } from "@/data/profile";

/** Career timeline styled as a climb: summit at the top, base camp at the bottom. */
export function AscentTimeline({ locale }: { locale: Locale }) {
  return (
    <ol className="relative ml-3 border-l-2 border-dashed border-pine/60">
      {ascent.map((c) => (
        <li key={`${c.org}-${c.period.en}`} className="relative mb-12 pl-8 last:mb-0">
          <span
            aria-hidden
            className="absolute top-0.5 -left-[11px] grid size-5 place-items-center bg-background text-sm leading-none text-accent"
          >
            ▲
          </span>
          <p className="text-xs font-bold tracking-[0.14em] text-accent uppercase">
            {tr(c.camp, locale)} · {tr(c.period, locale)}
          </p>
          <h3 className="mt-1 text-xl font-bold">
            {tr(c.title, locale)} — <span className="text-pine">{c.org}</span>
          </h3>
          <p className="text-sm text-muted">{tr(c.place, locale)}</p>
          <ul className="mt-3 space-y-1.5 text-muted">
            {c.points.map((p) => (
              <li key={p.en} className="flex gap-2">
                <span aria-hidden className="text-pine">–</span>
                <span>{tr(p, locale)}</span>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  );
}
