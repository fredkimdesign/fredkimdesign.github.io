import type { CaseStudy } from "@/lib/case-study";
import { itemTile } from "./item-tile";
import { walmart } from "./walmart";
import { samsClub } from "./sams-club";
import { twitter } from "./twitter";
import { tesla } from "./tesla";

/** Order here is the order on the index page. Reverse chronological. */
export const caseStudies: CaseStudy[] = [itemTile, walmart, samsClub, twitter, tesla];

export const publishedCaseStudies = caseStudies.filter((c) => !c.draft);

/**
 * Studies that get a route. Drafts are served by `next dev` so they can be
 * read in place, and never exported: the production build only ever sees
 * published studies.
 */
export const routableCaseStudies =
  process.env.NODE_ENV === "development" ? caseStudies : publishedCaseStudies;

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
