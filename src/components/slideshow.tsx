"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";

export type Slide = { src: string; alt: string; caption?: string; w: number; h: number };

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d={dir === "left" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * A plain slideshow: one image at a time, crossfading in place. Arrows, dots,
 * keyboard left/right when focused, swipe on touch. Nothing moves sideways.
 * On small screens the arrows move into the control row so they never sit on
 * top of the image.
 */
export function Slideshow({ slides, caption }: { slides: Slide[]; caption?: string }) {
  const [i, setI] = useState(0);
  const touchX = useRef<number | null>(null);
  const n = slides.length;
  const go = useCallback((d: number) => setI((x) => (x + d + n) % n), [n]);

  const arrowBtn =
    "text-muted hover:text-ink flex h-10 w-10 items-center justify-center rounded-full transition-colors";

  return (
    <figure>
      <div
        className="group relative rounded-sm"
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
              className={`${arrowBtn} absolute top-1/2 -left-14 hidden -translate-y-1/2 sm:flex`}
            >
              <Chevron dir="left" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next"
              className={`${arrowBtn} absolute top-1/2 -right-14 hidden -translate-y-1/2 sm:flex`}
            >
              <Chevron dir="right" />
            </button>
          </>
        )}
      </div>

      <div className="mt-6 flex flex-col-reverse gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
        <figcaption className="measure min-h-[2.5rem] text-sm leading-relaxed text-muted">
          {slides[i]?.caption ?? caption}
        </figcaption>
        {n > 1 && (
          <div className="flex shrink-0 items-center justify-end gap-3 sm:justify-start">
            <button type="button" onClick={() => go(-1)} aria-label="Previous" className={`${arrowBtn} -my-2 sm:hidden`}>
              <Chevron dir="left" />
            </button>
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
            <button type="button" onClick={() => go(1)} aria-label="Next" className={`${arrowBtn} -my-2 sm:hidden`}>
              <Chevron dir="right" />
            </button>
          </div>
        )}
      </div>
      {caption && slides[i]?.caption && (
        <p className="measure mt-2 text-sm leading-relaxed text-faint">{caption}</p>
      )}
    </figure>
  );
}
