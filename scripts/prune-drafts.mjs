// Runs after `next build`. A draft has no page in the export, but everything
// in public/ is copied into out/ regardless — so a draft's images would still
// be deployed, reachable by anyone who guesses the path. This removes every
// file only drafts use, and each draft's own folder under work/, from out/.
// Media shared with a published study stays. Dev is untouched: `next dev`
// serves public/ directly, so drafts still render locally.
import { existsSync, rmSync } from "node:fs";
import { join, resolve, sep } from "node:path";
import { createJiti } from "jiti";

const OUT = new URL("../out", import.meta.url).pathname;
if (!existsSync(OUT)) {
  console.error("prune-drafts: no out/ directory — run after `next build`.");
  process.exit(1);
}

const jiti = createJiti(import.meta.url);
const { caseStudies } = await jiti.import("../src/content/case-studies/index.ts");

/** Every `src` anywhere in a study: hero, thumb, figures, groups, slides. */
function sources(node, found = new Set()) {
  if (Array.isArray(node)) node.forEach((n) => sources(n, found));
  else if (node && typeof node === "object") {
    for (const [k, v] of Object.entries(node)) {
      if (k === "src" && typeof v === "string" && v.startsWith("/")) found.add(v);
      else sources(v, found);
    }
  }
  return found;
}

const published = new Set();
const drafts = [];
for (const s of caseStudies) {
  if (s.draft) drafts.push(s);
  else sources(s, published);
}

const doomed = new Set();
for (const d of drafts) {
  for (const src of sources(d)) if (!published.has(src)) doomed.add(src);
  // The draft's own folder, so unreferenced work-in-progress files go too —
  // unless a published study draws from it.
  const folder = `/work/${d.slug}/`;
  if (![...published].some((p) => p.startsWith(folder))) doomed.add(folder);
}

let removed = 0;
for (const path of doomed) {
  const target = resolve(join(OUT, path));
  if (!target.startsWith(OUT + sep)) throw new Error(`prune-drafts: refusing to touch ${target}`);
  if (!existsSync(target)) continue;
  rmSync(target, { recursive: true });
  console.log(`prune-drafts: removed ${path}`);
  removed++;
}
console.log(`prune-drafts: ${drafts.length} draft(s), ${removed} path(s) removed from out/.`);
