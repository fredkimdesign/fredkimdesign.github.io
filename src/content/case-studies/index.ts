import type { CaseStudy } from "@/lib/case-study";
import { walmart } from "./walmart";
import { samsClub } from "./sams-club";
import { twitter } from "./twitter";
import { tesla } from "./tesla";

/** Order here is the order on the index page. Reverse chronological. */
export const caseStudies: CaseStudy[] = [walmart, samsClub, twitter, tesla];

export const publishedCaseStudies = caseStudies.filter((c) => !c.draft);

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
