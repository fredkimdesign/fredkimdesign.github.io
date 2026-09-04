import Image from "next/image";
import Link from "next/link";
import mediaDims from "@/content/media-dims.json";
import { publishedCaseStudies } from "@/content/case-studies";

const DIMS = mediaDims as unknown as Record<string, [number, number]>;

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-5xl px-8">
      <section className="py-24 sm:py-36">
        <h1 className="font-display max-w-3xl text-4xl leading-[1.06] tracking-tight text-balance sm:text-6xl">
          Product designer. I work on systems where the interface is the
          smallest part of the problem.
        </h1>
        <p className="measure prose-body mt-10 text-muted">
          Currently at Walmart. Previously Sam&rsquo;s Club, Twitter, and Tesla.
          This site is a Next.js app I built with Claude Code.
        </p>
      </section>

      <section className="grid gap-x-12 gap-y-20 sm:grid-cols-2">
        {publishedCaseStudies.map((s) => {
          const [w, h] = s.thumb ? (DIMS[s.thumb.src] ?? [1600, 1000]) : [0, 0];
          return (
            <Link key={s.slug} href={`/work/${s.slug}`} className="group block">
              {s.thumb && (
                <div className="relative flex aspect-[4/3] items-center justify-center">
                  <Image
                    src={s.thumb.src}
                    alt={s.thumb.alt}
                    width={w}
                    height={h}
                    className="max-h-full w-auto max-w-full object-contain transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                    sizes="(max-width: 640px) 100vw, 32rem"
                  />
                </div>
              )}
              <div className="mt-8 flex items-baseline justify-between">
                <span className="eyebrow">{s.company}</span>
                <span className="text-xs text-faint tabular-nums">{s.period}</span>
              </div>
              <h2 className="font-display group-hover:text-accent mt-3 text-2xl leading-snug tracking-tight text-balance transition-colors">
                {s.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">{s.blurb}</p>
              <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1">
                {s.disciplines.map((d) => (
                  <span key={d} className="eyebrow">{d}</span>
                ))}
              </div>
            </Link>
          );
        })}
      </section>
    </div>
  );
}
