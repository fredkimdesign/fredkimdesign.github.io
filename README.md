# fredkim.co

Portfolio site for Fred Kim, product designer. Live at
**https://fredkimdesign.github.io**.

Next.js 16 (App Router) + Tailwind 4, statically exported and deployed to
GitHub Pages by `.github/workflows/deploy.yml` on every push to `main`.

## Case studies

Each study is a typed object, not MDX — the schema in
[`src/lib/case-study.ts`](src/lib/case-study.ts) makes the structure a compile
error to get wrong. Every study argues the same six beats in the same order:

| Beat | What it has to do |
| --- | --- |
| Stakes | What was true before, and what it cost |
| The read | What I understood that wasn't obvious |
| The bet | A decision, with the roads not taken |
| The work | What shipped, shown rather than narrated |
| Friction | What fought back, and what I got wrong |
| Outcome | Numbers, honestly qualified |

Two constraints are enforced by the type system rather than by discipline:

- `bet.rejected` is `[Rejected, ...Rejected[]]` — at least one entry. A bet with
  no rejected alternative was a preference, not a decision.
- Every `Metric` carries a `basis` (`realized` / `projected` / `pilot` /
  `target`) and a `source`. The renderer always prints the basis next to the
  figure, so a projected number can never be dressed up as a measured one.

Add a study in `src/content/case-studies/`, then register it in
`index.ts` — array order is page order.

## Local development

```bash
npm install
npm run dev
```

## Assets

Images live in `public/work/<slug>/`. They're pre-compressed to WebP (max
1800px) because Pages has no image optimizer, and the images are exported with
transparent backgrounds so they sit directly on the page with no frame or fill.

After adding or replacing any asset, regenerate the dimensions map so figures
reserve the right box before they load:

```bash
npm run media
```

This must run on macOS — it reads video dimensions via `mdls`. The generated
`src/content/media-dims.json` is committed, so CI never runs it.

## Deploying

Pushing to `main` builds and deploys. `NEXT_PUBLIC_BASE_PATH` is empty for this
user site at the domain root; a project site at `<user>.github.io/<repo>` would
set the repo variable `BASE_PATH` to `/<repo>`.
