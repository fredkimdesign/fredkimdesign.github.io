"use client";

import { useEffect, useState } from "react";

type Beat = { id: string; index: number; marker: string };

/**
 * A fixed index of the six beats, shown only where there is room to the left
 * of the reading column. Tracks the beat currently in view. It is orientation,
 * not navigation — on an eleven-viewport page the reader should always know
 * which part of the argument they are in.
 */
export function BeatRail({ beats }: { beats: Beat[] }) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const els = beats.map((b) => document.getElementById(b.id)).filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        // The beat whose top has most recently crossed the upper third wins.
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.1, 0.5] },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [beats]);

  return (
    <nav
      aria-label="Sections"
      className="fixed top-1/2 left-[max(1.5rem,calc((100vw-76rem)/2-8.5rem))] hidden -translate-y-1/2 2xl:block"
    >
      <ol className="space-y-3">
        {beats.map((b) => {
          const on = b.id === active;
          return (
            <li key={b.id}>
              <a
                href={`#${b.id}`}
                aria-current={on ? "location" : undefined}
                className={`eyebrow flex items-baseline gap-2.5 transition-colors ${on ? "!text-ink" : "!text-faint hover:!text-muted"}`}
              >
                <span className="tabular-nums">{String(b.index).padStart(2, "0")}</span>
                <span>{b.marker}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
