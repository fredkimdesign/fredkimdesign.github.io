"use client";

import Image from "next/image";
import { useRef } from "react";

type Props = {
  src: string;
  alt: string;
  w: number;
  h: number;
  /** Opaque rectangle: gets the plate corners. */
  plate?: boolean;
  caption?: React.ReactNode;
  sizes?: string;
  preload?: boolean;
  /** Classes for the trigger button (layout) and the image inside it. */
  className?: string;
  imgClassName?: string;
};

/**
 * An image you can open. Most figures here are dense interface screenshots
 * shown well below their native size; a click sets one on the paper at the
 * largest size the window allows. Native <dialog>, so Esc, focus return, and
 * the inert page behind it come for free. Click anywhere to close.
 */
export function ZoomImage({ src, alt, w, h, plate, caption, sizes, preload, className = "", imgClassName = "" }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  const gif = src.endsWith(".gif");
  return (
    <>
      <button
        type="button"
        onClick={() => dialog.current?.showModal()}
        aria-label={`Enlarge image: ${alt}`}
        className={`cursor-zoom-in ${className}`}
      >
        <Image
          src={src}
          alt=""
          width={w}
          height={h}
          unoptimized={gif}
          sizes={sizes}
          preload={preload}
          className={`${imgClassName} ${plate ? "plate" : ""}`}
        />
      </button>
      <dialog
        ref={dialog}
        aria-label={alt}
        onClick={() => dialog.current?.close()}
        className="lightbox m-0 h-dvh max-h-none w-screen max-w-none cursor-zoom-out flex-col items-center justify-center gap-5 bg-transparent p-5 open:flex sm:p-10"
      >
        <Image
          src={src}
          alt={alt}
          width={w}
          height={h}
          unoptimized={gif}
          loading="lazy"
          sizes="100vw"
          // Never past native size: a small screenshot stays sharp rather than filling the window.
          style={{ maxWidth: `min(100%, ${w}px)` }}
          className={`h-auto max-h-[calc(100dvh-9rem)] w-auto object-contain ${plate ? "plate" : ""}`}
        />
        {caption && <p className="measure text-center text-sm leading-relaxed text-muted">{caption}</p>}
        <button type="button" className="eyebrow absolute top-5 right-5 cursor-pointer p-2 sm:top-8 sm:right-10">
          Close
        </button>
      </dialog>
    </>
  );
}
