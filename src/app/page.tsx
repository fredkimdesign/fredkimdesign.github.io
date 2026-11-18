import Image from "next/image";
import Link from "next/link";
import { routableCaseStudies } from "@/content/case-studies";
import type { CaseStudy } from "@/lib/case-study";
import { mediaSize } from "@/lib/media";
import { typeset, typesetText } from "@/lib/typeset";
import { PlaceholderFrame } from "@/components/exhibits";

/** "2020 — 2026", or "2020 — Now" while something is still in flight. */
function span(studies: CaseStudy[]) {
  const years = studies.flatMap((s) => s.period.match(/\d{4}/g) ?? []).map(Number);
  const current = studies.some((s) => /present/i.test(s.period));
  return `${Math.min(...years)} — ${current ? "Now" : Math.max(...years)}`;
}

function Card({ study, lead }: { study: CaseStudy; lead: boolean }) {
  const pending = study.thumb?.kind === "placeholder" ? study.thumb : undefined;
  const thumb = study.thumb && study.thumb.kind !== "placeholder" ? study.thumb : undefined;
  const { w, h, plate } = thumb ? mediaSize(thumb.src) : { w: 0, h: 0, plate: false };
  return (
    <Link href={`/work/${study.slug}`} className={`group block min-w-0 ${lead ? "sm:col-span-2" : ""}`}>
      {pending && (
        <div className="aspect-[9/4]">
          <PlaceholderFrame item={pending} fill />
        </div>
      )}
      {thumb && (
        // One frame for every card. Plates fill it edge to edge; a cut-out
        // (logos, a lone device) is set inside it with air around it.
        <div className={`aspect-[9/4] overflow-hidden ${plate ? "plate" : ""}`}>
          <Image
            src={thumb.src}
            alt={thumb.alt}
            width={w}
            height={h}
            preload={lead}
            className={`h-full w-full transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.015] ${
              plate ? "object-cover" : "object-contain p-4"
            }`}
            sizes={lead ? "(max-width: 1088px) 100vw, 64rem" : "(max-width: 640px) 100vw, 32rem"}
          />
        </div>
      )}
      <div className="mt-6 flex items-baseline justify-between gap-4">
        <span className="flex items-baseline gap-3">
          <span className="eyebrow">{typesetText(study.company)}</span>
          {study.draft && (
            <span className="eyebrow border-accent !text-accent rounded-full border px-2 py-0.5">Draft</span>
          )}
        </span>
        <span className="text-xs text-faint tabular-nums">{study.period}</span>
      </div>
      <h3
        className={`font-display group-hover:text-accent mt-3 leading-snug tracking-tight text-balance transition-colors ${
          lead ? "max-w-3xl text-2xl sm:text-[2.125rem] sm:leading-[1.16]" : "text-2xl"
        }`}
      >
        {typeset(study.title)}
      </h3>
      {/* What is inside, by name — the workstreams, not a summary of them. */}
      <p className="mt-3 text-sm leading-relaxed text-muted">
        {/* The dot is tied to the name before it, so it never opens a line. */}
        {study.work.map((c) => typesetText(c.title)).join("\u00A0\u00A0\u00B7\u00A0 ")}
      </p>
    </Link>
  );
}

export default function Home() {
  // Drafts show in `next dev` only; the production build never sees them.
  const studies = routableCaseStudies;
  // An odd count would strand a card on its own row; let the newest lead instead.
  const hasLead = studies.length % 2 === 1;
  return (
    <div className="mx-auto w-full max-w-[68rem] px-8">
      <section className="pt-20 pb-24 sm:pt-28 sm:pb-32">
        <div className="eyebrow mb-6">Product designer</div>
        <h1 className="font-display max-w-3xl text-4xl leading-[1.06] tracking-tight text-balance sm:text-6xl">
          I design scalable platforms that help companies build and ship
          faster&nbsp;&mdash; and better.
        </h1>
        <p className="measure prose-body mt-10 text-muted">
          Currently at Walmart. Previously Sam&rsquo;s Club, Twitter, and Tesla.
        </p>
      </section>

      <section aria-labelledby="work">
        <div className="border-rule mb-12 flex items-baseline justify-between border-t pt-5">
          <h2 id="work" className="eyebrow">Selected work</h2>
          <span className="eyebrow tabular-nums">{span(studies)}</span>
        </div>
        <div className="grid gap-x-12 gap-y-20 sm:grid-cols-2">
          {studies.map((s, i) => (
            <Card key={s.slug} study={s} lead={hasLead && i === 0} />
          ))}
        </div>
      </section>
    </div>
  );
}
