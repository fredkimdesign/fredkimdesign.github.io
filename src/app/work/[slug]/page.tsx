import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CaseStudyArticle } from "@/components/case-study";
import { caseStudies, getCaseStudy, publishedCaseStudies } from "@/content/case-studies";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  return { title: study.company, description: study.blurb };
}

export default async function CaseStudyPage({
  params,
}: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();
  const i = publishedCaseStudies.findIndex((c) => c.slug === study.slug);
  const next = i >= 0 ? publishedCaseStudies[(i + 1) % publishedCaseStudies.length] : undefined;
  return <CaseStudyArticle study={study} next={next?.slug === study.slug ? undefined : next} />;
}
