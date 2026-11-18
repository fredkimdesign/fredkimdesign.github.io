import type { BarsExhibit, Exhibit, Placeholder, StatsExhibit, TimelineExhibit } from "@/lib/case-study";
import { typeset, typesetText } from "@/lib/typeset";

function Caption({ text }: { text?: string }) {
  if (!text) return null;
  return (
    <figcaption className="measure mx-auto mt-6 text-center text-sm leading-relaxed text-muted">{typeset(text)}</figcaption>
  );
}

/* -------------------------------------------------------------- placeholder */

/**
 * Where an image will go. A dashed frame with a drafting cross, the thing to
 * put there, and the ratio to export it at — unmistakably not product UI.
 * `fill` lets a parent own the shape (the index card frame).
 */
export function PlaceholderFrame({ item, fill }: { item: Placeholder; fill?: boolean }) {
  const ratio = item.aspect ?? "16 / 9";
  return (
    <div
      role="img"
      aria-label={`Image to come: ${typesetText(item.label)}`}
      className={`placeholder ${fill ? "h-full" : ""}`}
      style={fill ? undefined : { aspectRatio: ratio }}
    >
      <div className="bg-paper flex max-w-[min(24rem,82%)] flex-col items-center gap-2 px-5 py-3 text-center">
        <span className="eyebrow">Image to come</span>
        <span className="font-display text-base leading-snug text-balance text-muted sm:text-lg">
          {typeset(item.label)}
        </span>
      </div>
      {!fill && (
        <span className="eyebrow bg-paper absolute right-3 bottom-3 px-1.5 tabular-nums">
          {ratio.replace(/\s*\/\s*/, " : ")}
        </span>
      )}
    </div>
  );
}

/* --------------------------------------------------------------------- bars */

const fmt = (n: number) => n.toLocaleString("en-US");

/**
 * Horizontal bars against one threshold. Pass and fail differ by fill —
 * solid against hatched — and by the word beside each value, never by colour.
 * Every number is printed, so the rows read as a table with the bars removed.
 */
function Bars({ ex }: { ex: BarsExhibit }) {
  const pct = (v: number) => `${((v - ex.min) / (ex.max - ex.min)) * 100}%`;
  const ticks = Array.from({ length: ex.max - ex.min + 1 }, (_, i) => ex.min + i);
  // Rows, the threshold and the axis share one grid, so they line up at every width.
  const cols = "sm:grid-cols-[8.5rem_1fr_7.5rem] sm:gap-x-5";
  return (
    <figure className="figure-wide">
      <div className="border-rule flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-t pt-5">
        <div className="eyebrow">{ex.title}</div>
        {ex.note && <p className="text-sm text-muted">{typeset(ex.note)}</p>}
      </div>

      <div className="relative mt-8 pt-9 pb-7">
        {/* Scale, gridlines and the threshold: one layer behind and above the rows. */}
        <div aria-hidden="true" className={`grid grid-cols-1 ${cols} pointer-events-none absolute inset-0`}>
          <div className="relative sm:col-start-2">
            {ticks.map((t) => (
              <span key={t} className="bg-rule absolute top-9 bottom-7 hidden w-px sm:block" style={{ left: pct(t) }} />
            ))}
            {ticks
              .filter((_, i) => i % 2 === 0)
              .map((t) => (
                <span
                  key={t}
                  className="absolute bottom-0 -translate-x-1/2 text-xs text-faint tabular-nums first:translate-x-0"
                  style={{ left: pct(t) }}
                >
                  {t}
                  {ex.unit}
                </span>
              ))}
            <span
              className="bg-accent absolute top-7 bottom-7 z-20 w-px shadow-[0_0_0_1.5px_var(--color-paper)]"
              style={{ left: pct(ex.threshold.value) }}
            />
            <span
              className="absolute top-0 -translate-x-1/2 text-xs leading-none whitespace-nowrap text-ink"
              style={{ left: pct(ex.threshold.value) }}
            >
              {ex.threshold.label} · <span className="tabular-nums">{ex.threshold.value}{ex.unit}</span>
            </span>
          </div>
        </div>

        <ul className="relative z-10">
          {ex.rows.map((r) => (
            <li key={r.label} className={`grid grid-cols-[1fr_auto] items-center gap-x-5 py-2 sm:py-0 ${cols}`}>
              <span className="text-sm">{r.label}</span>
              <span className="col-span-2 row-start-2 flex h-7 items-center sm:col-span-1 sm:col-start-2 sm:row-start-1 sm:h-10">
                <span
                  aria-hidden="true"
                  className={`h-3.5 rounded-r-[4px] ${r.pass ? "bg-ink" : "hatch"}`}
                  style={{ width: pct(r.value) }}
                />
              </span>
              <span className="col-start-2 row-start-1 flex items-baseline justify-between gap-3 sm:col-start-3">
                <span className="text-sm tabular-nums">
                  {r.value}
                  {ex.unit}
                </span>
                <span className="eyebrow flex w-[3.25rem] items-center gap-1.5 !text-ink">
                  <span aria-hidden="true" className={`size-2 shrink-0 ${r.pass ? "bg-ink" : "hatch"}`} />
                  {r.pass ? "Pass" : "Fail"}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>
      <Caption text={ex.caption} />
    </figure>
  );
}

/* -------------------------------------------------------------------- stats */

/** Figures on rules. The diff is drawn to scale: added solid, removed hatched. */
function Stats({ ex }: { ex: StatsExhibit }) {
  const figure = "font-display text-[2rem] leading-none tracking-tight whitespace-nowrap tabular-nums lining-nums sm:text-[2.5rem]";
  return (
    <figure className="figure-wide">
      <div className="eyebrow mb-5">{ex.title}</div>
      <div className="grid grid-cols-2 gap-x-8 gap-y-9 lg:grid-cols-4">
        {ex.diff && (
          <div className="border-rule col-span-2 border-t pt-5">
            <div className={figure}>
              +{fmt(ex.diff.added)} <span className="text-faint">/</span> −{fmt(ex.diff.removed)}
            </div>
            <div aria-hidden="true" className="mt-4 flex h-2.5 gap-[2px]">
              <span className="bg-ink rounded-l-[3px]" style={{ flexGrow: ex.diff.added }} />
              <span className="hatch rounded-r-[3px]" style={{ flexGrow: ex.diff.removed }} />
            </div>
            <div className="mt-2.5 flex justify-between text-sm text-muted">
              <span>lines added</span>
              <span>lines removed</span>
            </div>
          </div>
        )}
        {ex.items.map((s) => (
          <div key={s.label} className="border-rule border-t pt-5">
            <div className={figure}>{s.value}</div>
            <div className="mt-3 text-sm leading-snug text-muted">{typeset(s.label)}</div>
          </div>
        ))}
      </div>
      <Caption text={ex.caption} />
    </figure>
  );
}

/* ----------------------------------------------------------------- timeline */

/**
 * Moments are dots; a stretch of time is a heavy line running from the moment
 * before it to the moment after. Left to right where there is room, top to
 * bottom on a phone.
 */
function Timeline({ ex }: { ex: TimelineExhibit }) {
  const last = ex.items.length - 1;
  return (
    <figure className="figure-wide">
      <div className="eyebrow mb-9">{ex.title}</div>
      <ol className="ml-[5px] grid sm:ml-0 sm:grid-cols-4">
          {ex.items.map((item, i) => {
            const heavy = item.span || ex.items[i + 1]?.span;
            return (
              <li key={i} className="relative pb-8 pl-6 sm:pt-6 sm:pr-6 sm:pb-0 sm:pl-0">
                {i < last && (
                  <span
                    aria-hidden="true"
                    className={`absolute top-0 bottom-0 left-0 sm:right-0 sm:bottom-auto ${
                      heavy
                        ? "bg-ink w-[3px] -translate-x-[1px] sm:h-[3px] sm:w-auto sm:translate-x-0 sm:-translate-y-[1px]"
                        : "bg-rule w-px sm:h-px sm:w-auto"
                    }`}
                  />
                )}
                {!item.span && (
                  <span
                    aria-hidden="true"
                    className={`border-ink absolute top-0 left-0 size-[11px] -translate-x-1/2 rounded-full border sm:translate-x-0 sm:-translate-y-1/2 ${
                      i === last ? "bg-ink" : "bg-paper"
                    }`}
                  />
                )}
                <div className="eyebrow -mt-1 tabular-nums sm:mt-0">{item.when}</div>
                <p className="mt-2 text-sm leading-snug">{typeset(item.event)}</p>
              </li>
            );
          })}
      </ol>
      <Caption text={ex.caption} />
    </figure>
  );
}

export function ExhibitFigure({ exhibit }: { exhibit: Exhibit }) {
  switch (exhibit.kind) {
    case "bars":
      return <Bars ex={exhibit} />;
    case "stats":
      return <Stats ex={exhibit} />;
    case "timeline":
      return <Timeline ex={exhibit} />;
  }
}
