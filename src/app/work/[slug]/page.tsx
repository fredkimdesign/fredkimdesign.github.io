import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CaseStudyArticle } from "@/components/case-study";
import { caseStudies, getCaseStudy } from "@/content/case-studies";

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
  return <CaseStudyArticle study={study} />;
}
