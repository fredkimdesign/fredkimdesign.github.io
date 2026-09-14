import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CaseStudyArticle } from "@/components/case-study";
import { getCaseStudy, publishedCaseStudies } from "@/content/case-studies";

/** Drafts get no route at all — hidden means not reachable by URL either. */
export function generateStaticParams() {
  return publishedCaseStudies.map((c) => ({ slug: c.slug }));
}

function published(slug: string) {
  const study = getCaseStudy(slug);
  return study && !study.draft ? study : undefined;
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const study = published(slug);
  if (!study) return {};
  return { title: study.company, description: study.blurb };
}

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const study = published(slug);
  if (!study) notFound();
  const i = publishedCaseStudies.findIndex((c) => c.slug === study.slug);
  const next = publishedCaseStudies[(i + 1) % publishedCaseStudies.length];
  return <CaseStudyArticle study={study} next={next.slug === study.slug ? undefined : next} />;
}
