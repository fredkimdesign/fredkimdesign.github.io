import Image from "next/image";
import mediaDims from "@/content/media-dims.json";
import { Slideshow } from "@/components/slideshow";
import {
  BASIS_LABEL,
  type CaseStudy,
  type Media,
  type MediaGroup,
  type MediaItem,
  type Metric,
  type Para,
} from "@/lib/case-study";
import { asset } from "@/lib/asset";

const DIMS = mediaDims as unknown as Record<string, [number, number]>;

/* ---------------------------------------------------------------- primitives */

export function Prose({ body }: { body: Para[] }) {
  return (
    <div className="measure space-y-6">
      {body.map((p, i) => (
        <p key={i} className="prose-body">
          {p}
        </p>
      ))}
    </div>
  );
}

/**
 * Raw media, no chrome. Images were exported with transparent backgrounds
 * and sit directly on the paper. Video is a rectangle by nature, so it gets
 * soft corners and a shadow — the one place a frame is earned.
 */
function Visual({ media, fixedHeight }: { media: Media; fixedHeight?: boolean }) {
  const [w, h] = DIMS[media.src] ?? [1600, 1000];
  const size = fixedHeight ? "h-[18rem] w-auto max-w-none" : "h-auto w-full";
  if (media.kind === "video") {
    return (
      <video
        src={asset(media.src)}
        width={w}
        height={h}
        muted={!media.controls}
        loop={!media.controls}
        autoPlay={!media.controls}
        controls={media.controls}
        playsInline
        preload="metadata"
        className={`${size} rounded-xl shadow-[0_24px_60px_-24px_rgba(22,21,15,0.35)]`}
      />
    );
  }
  return (
    <Image
      src={media.src}
      alt={media.alt}
      width={w}
      height={h}
      unoptimized={media.src.endsWith(".gif")}
      className={size}
      sizes={fixedHeight ? "50vw" : media.width === "full" ? "100vw" : "(max-width: 768px) 100vw, 34rem"}
    />
  );
}

function Caption({ text, className = "" }: { text?: string; className?: string }) {
  if (!text) return null;
  return (
    <figcaption className={`measure mt-4 text-sm leading-relaxed text-muted ${className}`}>
      {text}
    </figcaption>
  );
}

/** A single figure. Videos are always spotlighted: full width, extra room. */
export function Figure({ media }: { media: Media }) {
  const spotlight = media.kind === "video";
  const full = spotlight || media.width === "full";
  return (
    <figure className={`${full ? "col-span-full" : "measure"} ${spotlight ? "my-6" : ""}`}>
      <Visual media={media} />
      <Caption text={media.caption} />
    </figure>
  );
}

function Row({ group }: { group: MediaGroup }) {
  const cols = Math.min(group.items.length, 3);
  const spotlight = group.spotlight || group.items.every((m) => m.kind === "video");
  return (
    <figure className={spotlight ? "my-6" : ""}>
      <div
        className="grid items-start gap-8 sm:gap-10"
        style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
      >
        {group.items.map((m, i) => (
          <div key={i}>
            <Visual media={m} />
            {m.caption && (
              <p className="mt-4 text-sm leading-relaxed text-muted">{m.caption}</p>
            )}
          </div>
        ))}
      </div>
      <Caption text={group.caption} />
    </figure>
  );
}

function Carousel({ group }: { group: MediaGroup }) {
  const slides = group.items
    .filter((m) => m.kind !== "video")
    .map((m) => {
      const [w, h] = DIMS[m.src] ?? [1600, 1000];
      return { src: m.src, alt: m.alt, caption: m.caption, w, h };
    });
  return <Slideshow slides={slides} caption={group.caption} />;
}

function Figures({ media }: { media?: MediaItem[] }) {
  if (!media?.length) return null;
  return (
    <div className="mt-14 space-y-16">
      {media.map((m, i) =>
        "layout" in m ? (
          m.layout === "carousel" ? <Carousel key={i} group={m} /> : <Row key={i} group={m} />
        ) : (
          <Figure key={i} media={m} />
        ),
      )}
    </div>
  );
}

/**
 * Every beat renders identically: a numbered marker, a substantive heading,
 * prose, then whatever that beat's structured payload is. The consistency is
 * the point — a reader who has read one of these knows where to look in all
 * of them.
 */
function Beat({
  index,
  marker,
  heading,
  children,
}: {
  index: number;
  marker: string;
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-rule border-t pt-16 sm:pt-20">
      <div className="mb-8 flex items-baseline gap-3">
        <span className="eyebrow tabular-nums">{String(index).padStart(2, "0")}</span>
        <span className="eyebrow">{marker}</span>
      </div>
      <h2 className="font-display measure mb-9 text-3xl leading-tight tracking-tight text-balance sm:text-[2.25rem]">
        {heading}
      </h2>
      {children}
    </section>
  );
}

/* ------------------------------------------------------------------ payloads */

function Constraint({ text }: { text: string }) {
  return (
    <div className="border-accent measure mt-10 border-l-2 pl-6">
      <div className="eyebrow mb-3">The constraint</div>
      <p className="font-display text-lg leading-relaxed">{text}</p>
    </div>
  );
}

function MetricCard({ metric }: { metric: Metric }) {
  return (
    <div className="border-rule flex flex-col border-t pt-5">
      <div className="font-display text-4xl leading-none tracking-tight sm:text-[2.75rem]">
        {metric.value}
      </div>
      <div className="mt-3 text-sm leading-snug text-ink">{metric.label}</div>
      <div className="mt-4 flex items-center gap-2">
        <span
          className={`eyebrow rounded-full px-2 py-0.5 ${
            metric.basis === "realized" || metric.basis === "pilot"
              ? "bg-wash text-ink"
              : "border-rule border"
          }`}
        >
          {BASIS_LABEL[metric.basis]}
        </span>
      </div>
      <p className="mt-4 text-xs leading-relaxed text-faint">{metric.source}</p>
    </div>
  );
}

/* --------------------------------------------------------------------- study */

export function CaseStudyArticle({ study }: { study: CaseStudy }) {
  return (
    <article className="mx-auto w-full max-w-5xl px-8 pb-32">
      {/* Header */}
      <header className="pt-12 pb-20 sm:pt-16 sm:pb-24">
        <div className="eyebrow mb-6">{study.company}</div>
        <h1 className="font-display max-w-3xl text-4xl leading-[1.08] tracking-tight text-balance sm:text-[3.25rem]">
          {study.title}
        </h1>
        <p className="measure prose-body mt-8 text-muted">{study.blurb}</p>

        <dl className="border-rule mt-16 grid grid-cols-2 gap-x-10 gap-y-8 border-t pt-10 sm:grid-cols-4">
          {[
            ["Role", study.role],
            ["Period", study.period],
            ["With", study.collaborators.join(", ") || "—"],
            ["Disciplines", study.disciplines.join(", ")],
          ].map(([k, v]) => (
            <div key={k}>
              <dt className="eyebrow mb-3">{k}</dt>
              <dd className="text-sm leading-relaxed text-ink">{v}</dd>
            </div>
          ))}
        </dl>
      </header>

      {study.hero && (
        <div className="mb-28 sm:mb-36">
          <Figure media={{ ...study.hero, width: "full" }} />
        </div>
      )}

      <div className="space-y-28 sm:space-y-36">
        {/* 01 — Stakes */}
        <Beat index={1} marker="Stakes" heading={study.stakes.heading}>
          <Prose body={study.stakes.body} />
          {study.stakes.constraint && <Constraint text={study.stakes.constraint} />}
          <Figures media={study.stakes.media} />
        </Beat>

        {/* 02 — The read */}
        <Beat index={2} marker="What I read" heading={study.read.heading}>
          <Prose body={study.read.body} />
          {study.read.evidence?.length ? (
            <ul className="measure mt-12 space-y-8">
              {study.read.evidence.map((e, i) => (
                <li key={i} className="border-rule border-l pl-6">
                  <div className="eyebrow mb-3">{e.kind.replace("-", " ")}</div>
                  <p className="text-sm leading-relaxed text-muted">{e.what}</p>
                  <p className="mt-2 text-sm leading-relaxed text-ink">{e.found}</p>
                </li>
              ))}
            </ul>
          ) : null}
          <Figures media={study.read.media} />
        </Beat>

        {/* 03 — The bet */}
        <Beat index={3} marker="The bet" heading={study.bet.heading}>
          <Prose body={study.bet.body} />
          <div className="mt-14">
            <div className="eyebrow mb-5">What I argued against</div>
            <ul className="grid gap-4 sm:grid-cols-2">
              {study.bet.rejected.map((r, i) => (
                <li key={i} className="bg-wash rounded-lg p-7">
                  <p className="font-display mb-3 text-lg leading-snug">{r.option}</p>
                  <p className="text-sm leading-relaxed text-muted">{r.why}</p>
                </li>
              ))}
            </ul>
          </div>
          <Figures media={study.bet.media} />
        </Beat>

        {/* 04 — The work */}
        <Beat index={4} marker="The work" heading="What shipped">
          <div className="space-y-28 sm:space-y-32">
            {study.work.map((chapter, i) => (
              <div key={i}>
                <h3 className="font-display text-2xl tracking-tight sm:text-[1.75rem]">
                  {chapter.title}
                </h3>
                <p className="measure mt-3 mb-8 text-sm leading-relaxed text-muted">
                  {chapter.goal}
                </p>
                <Prose body={chapter.body} />
                <Figures media={chapter.media} />
              </div>
            ))}
          </div>
        </Beat>

        {/* 05 — Friction */}
        <Beat index={5} marker="Friction" heading={study.friction.heading}>
          <Prose body={study.friction.body} />
          <div className="mt-14">
            <div className="eyebrow mb-5">Traded</div>
            <ul className="border-rule border-t">
              {study.friction.tradeoffs.map((t, i) => (
                <li
                  key={i}
                  className="border-rule grid gap-3 border-b py-7 sm:grid-cols-2 sm:gap-10"
                >
                  <div>
                    <div className="eyebrow mb-2">Gave up</div>
                    <p className="text-sm leading-relaxed">{t.gaveUp}</p>
                  </div>
                  <div>
                    <div className="eyebrow mb-2">To get</div>
                    <p className="text-sm leading-relaxed">{t.toGet}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <Figures media={study.friction.media} />
        </Beat>

        {/* 06 — Outcome */}
        <Beat index={6} marker="Outcome" heading={study.outcome.heading}>
          <Prose body={study.outcome.body} />
          <div className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {study.outcome.metrics.map((m, i) => (
              <MetricCard key={i} metric={m} />
            ))}
          </div>
        </Beat>
      </div>
    </article>
  );
}
