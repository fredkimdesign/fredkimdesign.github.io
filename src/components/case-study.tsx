import { Slideshow } from "@/components/slideshow";
import { ZoomImage } from "@/components/zoom-image";
import {
  BASIS_LABEL,
  type CaseStudy,
  type Media,
  type MediaGroup,
  type MediaItem,
  type Metric,
  type Para,
  type Placeholder,
  type Point,
} from "@/lib/case-study";
import Link from "next/link";
import { asset } from "@/lib/asset";
import { BeatRail } from "@/components/beat-rail";
import { mediaSize } from "@/lib/media";
import { typeset, typesetText } from "@/lib/typeset";
import { ExhibitFigure, PlaceholderFrame } from "@/components/exhibits";

/* ---------------------------------------------------------------- primitives */

export function Prose({ body }: { body: Para[] }) {
  if (!body.length) return null;
  return (
    <div className="measure space-y-6">
      {body.map((p, i) => (
        <p key={i} className="prose-body">
          {typeset(p)}
        </p>
      ))}
    </div>
  );
}

/**
 * Raw media, no chrome. Cut-outs exported with transparent backgrounds sit
 * directly on the paper. Anything that is a rectangle by nature — video, a
 * screenshot, a photo — gets soft corners; video alone gets a shadow. Every
 * still opens larger on click.
 */
function Visual({ media, preload }: { media: Media; preload?: boolean }) {
  const { w, h, plate } = mediaSize(media.src);
  const size = "h-auto w-full";
  if (media.kind === "video") {
    return (
      <video
        src={asset(media.src)}
        width={w}
        height={h}
        muted
        loop={!media.controls}
        autoPlay
        controls={media.controls}
        aria-label={media.alt}
        playsInline
        preload="metadata"
        className={`${size} rounded-xl shadow-[0_24px_60px_-24px_rgba(22,21,15,0.35)]`}
      />
    );
  }
  return (
    <ZoomImage
      src={media.src}
      alt={media.alt}
      w={w}
      h={h}
      plate={plate}
      preload={preload}
      caption={media.caption ? typeset(media.caption) : undefined}
      className="block w-full"
      imgClassName={size}
      sizes={media.width === "full" ? "(max-width: 1088px) 100vw, 64rem" : "(max-width: 768px) 100vw, 34rem"}
    />
  );
}

function Caption({ text, className = "" }: { text?: string; className?: string }) {
  if (!text) return null;
  return (
    <figcaption className={`measure mx-auto mt-4 text-center text-sm leading-relaxed text-muted ${className}`}>
      {typeset(text)}
    </figcaption>
  );
}

/** A single figure. Videos are always spotlighted: full width, extra room. */
export function Figure({ media, hero }: { media: Media | Placeholder; hero?: boolean }) {
  if (media.kind === "placeholder") {
    const width = hero ? "w-full" : media.width === "full" ? "figure-wide" : "measure";
    return (
      <figure className={width}>
        <PlaceholderFrame item={media} />
        <Caption text={media.caption} />
      </figure>
    );
  }
  const spotlight = media.kind === "video";
  const full = spotlight || media.width === "full";
  const width = hero ? "w-full" : full ? "figure-wide" : "measure";
  return (
    <figure className={`${width} ${spotlight ? "my-6" : ""}`}>
      <Visual media={media} preload={hero} />
      <Caption text={media.caption} />
    </figure>
  );
}

/** Related figures, one under the next. The article never splits into columns. */
function Stack({ group }: { group: MediaGroup }) {
  const spotlight = group.spotlight || group.items.every((m) => m.kind === "video");
  return (
    <figure className={`figure-wide ${spotlight ? "my-6" : ""}`}>
      <div className="space-y-16">
        {group.items.map((m, i) => (
          <div key={i}>
            <Visual media={{ ...m, width: "full" }} />
            {m.caption && (
              <p className="measure mx-auto mt-4 text-center text-sm leading-relaxed text-muted">{typeset(m.caption)}</p>
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
      return { src: m.src, alt: m.alt, caption: m.caption, ...mediaSize(m.src) };
    });
  return <Slideshow slides={slides} caption={group.caption} />;
}

function Figures({ media }: { media?: MediaItem[] }) {
  if (!media?.length) return null;
  return (
    <div className="mt-14 space-y-16">
      {media.map((m, i) =>
        "layout" in m ? (
          m.layout === "carousel" ? <Carousel key={i} group={m} /> : <Stack key={i} group={m} />
        ) : m.kind === "bars" || m.kind === "stats" || m.kind === "timeline" ? (
          <ExhibitFigure key={i} exhibit={m} />
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
    <section id={`beat-${index}`} className="border-rule scroll-mt-24 border-t pt-14 sm:pt-16">
      <div className="mb-8 flex items-baseline gap-3">
        <span className="eyebrow tabular-nums">{String(index + 1).padStart(2, "0")}</span>
        <span className="eyebrow">{marker}</span>
      </div>
      <h2 className="font-display measure mb-9 text-3xl leading-tight tracking-tight text-balance sm:text-[2.25rem]">
        {typeset(heading)}
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
      <p className="font-display text-lg leading-relaxed">{typeset(text)}</p>
    </div>
  );
}

/** Titled points on rules: problems numbered across, lessons listed down. */
function Points({ points }: { points: Point[] }) {
  return (
    <ol className="grid gap-x-10 gap-y-10 lg:grid-cols-3">
      {points.map((p, i) => (
        <li key={i} className="border-rule border-t pt-5">
          <div aria-hidden="true" className="font-display text-accent text-2xl leading-none tabular-nums lining-nums">
            {i + 1}
          </div>
          <h3 className="font-display mt-5 text-[1.375rem] leading-snug tracking-tight text-balance">{typeset(p.title)}</h3>
          <p className="mt-3 max-w-[34rem] text-[0.9375rem] leading-relaxed text-muted">{typeset(p.body)}</p>
        </li>
      ))}
    </ol>
  );
}

function MetricCard({ metric }: { metric: Metric }) {
  return (
    <div className="border-rule flex flex-col border-t pt-5">
      <div className="font-display text-4xl leading-none tracking-tight whitespace-nowrap tabular-nums lining-nums sm:text-[2.75rem]">
        {metric.value}
      </div>
      <div className="mt-3 text-sm leading-snug text-ink">{typeset(metric.label)}</div>
      <div className="mt-4 flex items-center gap-2">
        <span
          className={`eyebrow rounded-full px-2 py-0.5 ${
            metric.basis === "realized" || metric.basis === "pilot" || metric.basis === "shipped"
              ? "bg-wash text-ink"
              : "border-rule border"
          }`}
        >
          {BASIS_LABEL[metric.basis]}
        </span>
      </div>
      <p className="mt-4 text-xs leading-relaxed text-faint">{typeset(metric.source)}</p>
    </div>
  );
}

/** The line to carry out: its first sentence set large, the rest as prose. */
function Lesson({ text }: { text: string }) {
  const cut = text.indexOf(". ");
  const [lead, rest] = cut === -1 ? [text, ""] : [text.slice(0, cut + 1), text.slice(cut + 2)];
  return (
    <blockquote className="border-ink mt-20 border-t pt-8">
      <div className="eyebrow mb-6">The lesson</div>
      <p className="font-display max-w-[44rem] text-[1.75rem] leading-[1.2] tracking-tight text-balance sm:text-[2.5rem]">
        {typeset(lead)}
      </p>
      {rest && <p className="measure prose-body mt-7 text-muted">{typeset(rest)}</p>}
    </blockquote>
  );
}

/* --------------------------------------------------------------------- study */

// Display number, label, anchor. Overview is 01; section ids stay beat-1..6.
const BEATS = [
  [1, "Overview", "overview"],
  [2, "Context", "beat-1"],
  [3, "Problem", "beat-2"],
  [4, "Approach", "beat-3"],
  [5, "The work", "beat-4"],
  [6, "Challenges", "beat-5"],
  [7, "Results", "beat-6"],
] as const;

export function CaseStudyArticle({ study, next }: { study: CaseStudy; next?: CaseStudy }) {
  return (
    <article className="relative mx-auto w-full max-w-[68rem] px-8 pb-8">
      <BeatRail beats={BEATS.map(([i, m, id]) => ({ id, index: i, marker: m }))} />
      {/* Header: the claim and the facts. Results wait for the Results
          section so the ending isn't given away up top. */}
      <header id="overview" className="scroll-mt-24 pt-12 pb-16 sm:pt-16 sm:pb-20">
        <div className="mb-6 flex items-baseline gap-3">
          <span className="eyebrow">{typesetText(study.company)}</span>
          {study.draft && (
            <span className="eyebrow border-accent !text-accent rounded-full border px-2 py-0.5">Draft · not published</span>
          )}
        </div>
        <h1 className="font-display max-w-3xl text-4xl leading-[1.08] tracking-tight text-balance sm:text-[3.25rem]">
          {typeset(study.title)}
        </h1>
        <p className="measure prose-body mt-8 text-muted">{typeset(study.blurb)}</p>

        <div className="border-rule mt-14 border-t pt-7">
          <dl className="measure grid grid-cols-[5.5rem_1fr] gap-x-4 gap-y-2.5 text-sm leading-relaxed">
            <dt className="eyebrow pt-[0.3em]">Role</dt>
            <dd>{typeset(study.role)}</dd>
            <dt className="eyebrow pt-[0.3em]">Timeline</dt>
            <dd className="tabular-nums">{study.period}</dd>
            {study.scope && (
              <>
                <dt className="eyebrow pt-[0.3em]">Scope</dt>
                <dd>{typeset(study.scope)}</dd>
              </>
            )}
            {study.collaborators.length > 0 && (
              <>
                <dt className="eyebrow pt-[0.3em]">With</dt>
                <dd className="text-muted">{study.collaborators.join(", ")}</dd>
              </>
            )}
          </dl>
        </div>
      </header>

      {study.hero && (
        <div className="mb-28 sm:mb-36">
          <Figure media={{ ...study.hero, width: "full" }} hero />
        </div>
      )}

      <div className="space-y-28 sm:space-y-36">
        {/* 01 — Stakes */}
        <Beat index={1} marker="Context" heading={study.stakes.heading}>
          <Prose body={study.stakes.body} />
          {study.stakes.constraint && <Constraint text={study.stakes.constraint} />}
          <Figures media={study.stakes.media} />
        </Beat>

        {/* 02 — The read */}
        <Beat index={2} marker="Problem" heading={study.read.heading}>
          <Prose body={study.read.body} />
          {study.read.points?.length ? <Points points={study.read.points} /> : null}
          {study.read.evidence?.length ? (
            <ul className="measure mt-12 space-y-8">
              {study.read.evidence.map((e, i) => (
                <li key={i} className="border-rule border-l pl-6">
                  <div className="eyebrow mb-3">{e.kind.replace("-", " ")}</div>
                  <p className="text-sm leading-relaxed text-muted">{typeset(e.what)}</p>
                  <p className="mt-2 text-sm leading-relaxed text-ink">{typeset(e.found)}</p>
                </li>
              ))}
            </ul>
          ) : null}
          <Figures media={study.read.media} />
        </Beat>

        {/* 03 — The bet */}
        <Beat index={3} marker="Approach" heading={study.bet.heading}>
          {study.bet.pull && (
            <p className="font-display border-accent mb-10 max-w-[40rem] border-l-2 pl-6 text-2xl leading-[1.3] tracking-tight text-balance italic sm:text-[1.75rem]">
              {typeset(study.bet.pull)}
            </p>
          )}
          <Prose body={study.bet.body} />
          <div className="mt-14">
            <div className="eyebrow mb-5">Other options we considered</div>
            <ul className="border-rule border-t">
              {study.bet.rejected.map((r, i) => (
                <li
                  key={i}
                  className="border-rule grid gap-3 border-b py-7 sm:grid-cols-[minmax(0,18rem)_1fr] sm:gap-10"
                >
                  <p className="font-display text-lg leading-snug text-balance">{typeset(r.option)}</p>
                  <p className="text-sm leading-relaxed text-muted">{typeset(r.why)}</p>
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
                  {typeset(chapter.title)}
                </h3>
                <p className="measure mt-3 mb-8 text-sm leading-relaxed text-muted">
                  {typeset(chapter.goal)}
                </p>
                <Prose body={chapter.body} />
                <Figures media={chapter.media} />
              </div>
            ))}
          </div>
        </Beat>

        {/* 05 — Friction */}
        <Beat index={5} marker="Challenges" heading={study.friction.heading}>
          <Prose body={study.friction.body} />
          {/* With a dispute, the thing argued over is shown before the argument. */}
          {study.friction.dispute && <Figures media={study.friction.media} />}
          {study.friction.dispute && (
            <div className="mt-16 grid gap-x-12 gap-y-12 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <div className="eyebrow border-rule border-b pb-3">{study.friction.dispute.seen.label}</div>
                <ul>
                  {study.friction.dispute.seen.items.map((t, i) => (
                    <li key={i} className="border-rule border-b py-4 text-sm leading-relaxed">
                      {typeset(t)}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="lg:col-span-7">
                <div className="eyebrow border-rule border-b pb-3">{study.friction.dispute.argued.label}</div>
                <ol className="mt-6 space-y-7">
                  {study.friction.dispute.argued.items.map((t, i) => (
                    <li key={i} className="border-accent border-l-2 pl-6">
                      <p className="font-display text-[1.375rem] leading-[1.35] tracking-tight text-balance">{typeset(t)}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          )}
          {study.friction.resolution && (
            <div className="mt-20">
              <div className="eyebrow mb-4">The decision</div>
              <h3 className="font-display mb-8 text-2xl tracking-tight sm:text-[1.75rem]">
                {typeset(study.friction.resolution.heading)}
              </h3>
              <Prose body={study.friction.resolution.body} />
            </div>
          )}
          <div className="mt-14">
            <div className="border-rule hidden grid-cols-2 gap-10 border-b pb-3 sm:grid">
              <div className="eyebrow">Gave up</div>
              <div className="eyebrow">To get</div>
            </div>
            <ul>
              {study.friction.tradeoffs.map((t, i) => (
                <li
                  key={i}
                  className="border-rule grid gap-3 border-b py-6 sm:grid-cols-2 sm:gap-10"
                >
                  <div>
                    <div className="eyebrow mb-2 sm:hidden">Gave up</div>
                    <p className="text-sm leading-relaxed">{typeset(t.gaveUp)}</p>
                  </div>
                  <div>
                    <div className="eyebrow mb-2 sm:hidden">To get</div>
                    <p className="text-sm leading-relaxed">{typeset(t.toGet)}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          {!study.friction.dispute && <Figures media={study.friction.media} />}
          {study.friction.lesson && <Lesson text={study.friction.lesson} />}
        </Beat>

        {/* 06 — Outcome */}
        <Beat index={6} marker="Results" heading={study.outcome.heading}>
          <Prose body={study.outcome.body} />
          <div
            className={`mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2 ${study.outcome.metrics.length === 3 ? "lg:grid-cols-3" : ""}`}
          >
            {study.outcome.metrics.map((m, i) => (
              <MetricCard key={i} metric={m} />
            ))}
          </div>
          {study.outcome.hindsight?.length ? (
            <div className="mt-20">
              <div className="eyebrow mb-5">What I&rsquo;d do differently</div>
              <ul className="border-rule border-t">
                {study.outcome.hindsight.map((p, i) => (
                  <li key={i} className="border-rule grid gap-3 border-b py-7 sm:grid-cols-[minmax(0,18rem)_1fr] sm:gap-10">
                    <p className="font-display text-lg leading-snug text-balance">{typeset(p.title)}</p>
                    <p className="text-sm leading-relaxed text-muted">{typeset(p.body)}</p>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </Beat>
      </div>

      {study.note && <p className="mt-16 text-xs leading-relaxed text-faint">{typeset(study.note)}</p>}

      {next && (
        <Link
          href={`/work/${next.slug}`}
          className="group border-rule mt-32 block border-t pt-10 sm:mt-40"
        >
          <div className="eyebrow mb-4">Next</div>
          <div className="flex items-baseline justify-between gap-6">
            <div>
              <div className="text-sm text-muted">{typesetText(next.company)}</div>
              <div className="font-display group-hover:text-accent mt-2 max-w-2xl text-2xl leading-snug tracking-tight text-balance transition-colors sm:text-3xl">
                {typeset(next.title)}
              </div>
            </div>
            <span className="text-faint group-hover:text-ink shrink-0 text-2xl transition-colors" aria-hidden="true">→</span>
          </div>
        </Link>
      )}
    </article>
  );
}
