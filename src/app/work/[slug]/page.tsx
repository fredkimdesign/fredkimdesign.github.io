import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CaseStudyArticle } from "@/components/case-study";
import { getCaseStudy, publishedCaseStudies, routableCaseStudies } from "@/content/case-studies";

/** Drafts get a route under `next dev` only — in the export, hidden means not reachable by URL either. */
export function generateStaticParams() {
  return routableCaseStudies.map((c) => ({ slug: c.slug }));
}

function routable(slug: string) {
  const study = getCaseStudy(slug);
  return study && routableCaseStudies.includes(study) ? study : undefined;
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const study = routable(slug);
  if (!study) return {};
  return { title: study.draft ? `Draft · ${study.company}` : study.company, description: study.blurb };
}

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const study = routable(slug);
  if (!study) notFound();
  // "Next" always leads to published work; a draft is never linked from another page.
  const i = publishedCaseStudies.findIndex((c) => c.slug === study.slug);
  const next = publishedCaseStudies[(i + 1) % publishedCaseStudies.length];
  return <CaseStudyArticle study={study} next={next.slug === study.slug ? undefined : next} />;
}
