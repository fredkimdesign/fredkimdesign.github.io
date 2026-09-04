"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

export type Slide = { src: string; alt: string; caption?: string; w: number; h: number };

/**
 * A plain slideshow: one image at a time, crossfading in place. Arrows, dots,
 * keyboard left/right when focused, swipe on touch. Nothing moves sideways.
 */
export function Slideshow({ slides, caption }: { slides: Slide[]; caption?: string }) {
  const [i, setI] = useState(0);
  const touchX = useRef<number | null>(null);
  const n = slides.length;
  const go = useCallback((d: number) => setI((x) => (x + d + n) % n), [n]);

  useEffect(() => {
    if (slides[i]?.src.endsWith(".gif")) return;
  }, [i, slides]);

  return (
    <figure>
      <div
        className="group relative outline-none"
        tabIndex={0}
        role="region"
        aria-roledescription="slideshow"
        aria-label={caption ?? "Image slideshow"}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") go(1);
          if (e.key === "ArrowLeft") go(-1);
        }}
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchX.current == null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
          touchX.current = null;
        }}
      >
        <div className="relative h-[20rem] w-full sm:h-[32rem]">
          {slides.map((s, k) => (
            <div
              key={s.src}
              aria-hidden={k !== i}
              className="absolute inset-0 flex items-center justify-center transition-opacity duration-500 ease-out"
              style={{ opacity: k === i ? 1 : 0, pointerEvents: k === i ? "auto" : "none" }}
            >
              <Image
                src={s.src}
                alt={s.alt}
                width={s.w}
                height={s.h}
                unoptimized={s.src.endsWith(".gif")}
                className="max-h-full w-auto max-w-full object-contain"
                sizes="(max-width: 1024px) 100vw, 64rem"
                priority={k === 0}
              />
            </div>
          ))}
        </div>

        {n > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous"
              className="text-faint hover:text-ink absolute top-1/2 -left-3 -translate-y-1/2 p-3 text-2xl leading-none transition-colors sm:-left-12"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next"
              className="text-faint hover:text-ink absolute top-1/2 -right-3 -translate-y-1/2 p-3 text-2xl leading-none transition-colors sm:-right-12"
            >
              →
            </button>
          </>
        )}
      </div>

      <div className="mt-6 flex items-start justify-between gap-8">
        <figcaption className="measure min-h-[2.5rem] text-sm leading-relaxed text-muted">
          {slides[i]?.caption ?? caption}
        </figcaption>
        {n > 1 && (
          <div className="flex shrink-0 items-center gap-3 pt-1">
            <span className="eyebrow tabular-nums">
              {String(i + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
            </span>
            <div className="flex gap-1.5">
              {slides.map((_, k) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => setI(k)}
                  aria-label={`Slide ${k + 1}`}
                  aria-current={k === i ? "true" : undefined}
                  className={`h-1.5 w-1.5 rounded-full transition-colors ${k === i ? "bg-ink" : "bg-rule hover:bg-faint"}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
      {caption && slides[i]?.caption && (
        <p className="measure mt-2 text-sm leading-relaxed text-faint">{caption}</p>
      )}
    </figure>
  );
}
