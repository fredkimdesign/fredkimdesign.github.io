import type { CaseStudy } from "@/lib/case-study";

/**
 * WALMART — Item Tile.
 *
 * The wording comes from the approved draft and is trimmed, never extended:
 * no fact, number, name, or outcome here is absent from it. Tenants are
 * abstracted to groups A–E. Images are placeholders until real assets exist —
 * nothing on the page is drawn to look like product UI.
 */
export const itemTile: CaseStudy = {
  slug: "item-tile",
  company: "Walmart",
  draft: true,

  title: "Shipping Item Tile, and knowing when to make an exception",
  blurb:
    "How do you uphold a high bar for craft when dozens of teams, several brands and real revenue all want something different from the same component?",
  period: "Aug–Nov 2026",
  role: "Designer, design systems (WCP, LD\u00A03.5, LD\u00A04)",
  scope: "One of the highest-traffic commerce components, used across multiple Walmart arms and 7–10 tenants",
  collaborators: ["Design engineering", "Kit maintainers", "Feature teams"],
  disciplines: ["Enterprise", "Design systems", "Multi-tenancy"],
  thumb: { kind: "placeholder", label: "Item Tile variants, vertical and horizontal" },
  hero: { kind: "placeholder", label: "Item Tile variants, vertical and horizontal", aspect: "16 / 9" },
  note: "Details abstracted for confidentiality.",

  stakes: {
    heading: "Small design choices carry real business weight",
    body: [
      "Item Tile is the product card in search, browse, deals, lists, carts and carousels. The design system around it serves multiple tenants (consumer, membership, business, international), each with its own tokens, type and brand rules.",
      "I worked on the WCP subsystem, then LD 3.5, and now LD 4. I was usually the designer closest to the component: writing specs, reviewing requests, and keeping docs accurate. On WCP I shared the work with one other designer.",
    ],
  },

  read: {
    heading: "Three problems kept recurring",
    body: [],
    points: [
      {
        title: "No single source of truth",
        body: "The component lived in Figma branches, code, docs and spec files, and they drifted. One spec capped a tile around 200px; the code used 343 and 464px for horizontal layouts. Six Figma values had no matching token.",
      },
      {
        title: "Many tenants, one component",
        body: "A fixed fill color can pass contrast in one brand and fail in another. One badge fill measured 5.5:1 against one tenant's text and 1.8:1 against another's.",
      },
      {
        title: "A constant stream of requests",
        body: "Every team wanted its own variation, and many of the requests touched revenue directly.",
      },
    ],
    media: [
      {
        kind: "placeholder",
        label: "The same tile in Figma, spec and code, side by side",
        aspect: "2 / 1",
        width: "full",
      },
    ],
  },

  bet: {
    heading: "Every request got the same question",
    pull: "Does this serve other customers, builders, and the community, or only the requestor?",
    body: [
      "If it served one team, it stayed in that team's code. If it served many, it went into the system and met its quality bar. It also gave me a clear way to say no.",
    ],
    rejected: [
      {
        option: "One tenant's business logic in a shared pattern",
        why: "Shared patterns must work for all tenants. One tenant's business logic doesn't belong in them.",
      },
      {
        option: "A tenant-specific event name on the badge",
        why: "A generic \"New\" badge instead, so one pattern could serve everyone.",
      },
    ],
  },

  work: [
    {
      title: "One source of truth",
      goal: "Turn the most varied component in the system into one that holds everywhere.",
      body: [
        "Item Tile was the least standardized component in the system. We shipped it as one component with one source of truth, used everywhere from search to cart.",
        "The variation moved into configurable properties, so each tenant gets the tile it needs without building its own.",
      ],
      media: [
        {
          kind: "placeholder",
          label: "One Item Tile, configured for different tenants and surfaces",
          aspect: "16 / 9",
          width: "full",
        },
      ],
    },
    {
      title: "Inside the guardrails",
      goal: "Contribute inside the guardrails, not around them.",
      body: [
        "The LD Kit has a contribution model: tiered code owners, a PR template with an accessibility checklist (axe, keyboard, screen reader, AA contrast, 44px targets), CI gates, changesets, and a per-component intent file for people and AI agents.",
        "New to contributing code, I built a learning plan around those rules and shipped through them.",
      ],
    },
    {
      title: "Item Tile PR",
      goal: "An AI-assisted contribution, reviewed in the open.",
      body: [
        "The Item Tile PR was my biggest code contribution, built with AI tools.",
        "It added a fulfillment slot, custom widths, vertical and horizontal size presets, an expandable details section, a dev-viewer configurator, and swatch telemetry. It removed a duplicate GenericItemTile component as a documented breaking change.",
      ],
      media: [
        {
          kind: "stats",
          title: "The pull request",
          diff: { added: 1783, removed: 1250 },
          items: [
            { value: "25", label: "files changed" },
            { value: "47", label: "commits" },
            { value: "≈55", label: "props" },
            { value: "≈6", label: "review passes" },
            { value: "≈9", label: "weeks in review" },
            { value: "10", label: "changesets" },
          ],
        },
        {
          kind: "placeholder",
          label: "Fulfillment slot, custom widths, size presets, expandable details",
          aspect: "16 / 9",
          width: "full",
        },
      ],
    },
    {
      title: "Review",
      goal: "I treated review as a quality system rather than a gate.",
      body: [
        "Reviewers pushed on markup, accessibility claims, docs, telemetry disclosure, and swatch focus at small widths. I addressed each point, rebased a branch about 865 commits behind main, and re-ran CI until every required check passed.",
        "I split an unrelated accessibility fix into its own PR, and argued early that Item Tile deserved its own pattern with several variants.",
        "I now hold my own work to the same standard: every change disclosed, every claim accurate, every interaction keyboard-reachable.",
      ],
      media: [
        {
          kind: "timeline",
          title: "Timeline",
          items: [
            { when: "Aug 2026", event: "Early kit contribution merged" },
            { when: "Sep 2026", event: "Item Tile PR opened" },
            { when: "Sep–Nov 2026", event: "About six review passes; rebase and CI re-runs", span: true },
            { when: "Nov 2026", event: "Merged into the production-ready kit" },
          ],
          caption:
            "Approved by design and design-engineering reviewers, with an additional maintainer approval because the PR touched files outside the component folders.",
        },
      ],
    },
  ],

  friction: {
    heading: "A yellow button and a governance question",
    body: [
      "In late July a feature team asked for a yellow call-to-action in the shared tile, driven by backend business configuration. Design review surfaced visual problems, but the bigger question was governance.",
    ],
    media: [
      {
        kind: "placeholder",
        label: "The yellow call-to-action in the shared tile, as requested",
        aspect: "16 / 9",
        width: "full",
      },
    ],
    dispute: {
      seen: {
        label: "Visible in design review",
        items: [
          "The yellow control was hard to read",
          "It competed with the primary button",
          "It crammed several lines of text into one button",
          "In some placements it was too small to tap",
        ],
      },
      argued: {
        label: "My case, in the team thread",
        items: [
          "Shared patterns exist so every tenant can use them, and tenants govern them together.",
          "Putting one tenant's business logic into a shared pattern defeats the goal of keeping business logic out of the front end.",
        ],
      },
    },
    resolution: {
      heading: "An exception, made deliberately",
      body: [
        "The team's need was real, and Item Tile is heavily shaped by business requirements. The Item Tile source-of-truth designer agreed to add the CTA and proposed a governance model covering ownership, priority, behavior, and extensibility.",
        "A custom solution was too big a lift for a high-visibility launch. Letting one tenant's need into the shared layer wasn't ideal for the system, but the system exists to help teams ship. We made the exception and unblocked the launch.",
      ],
    },
    tradeoffs: [
      {
        gaveUp: "A shared layer with no single tenant's need in it",
        toGet: "The launch unblocked, without a custom solution that was too big a technical lift",
      },
      {
        gaveUp: "A system that was better off for that specific choice",
        toGet: "A clearer way to say yes, and greater guardrails around governance and collaboration for the next time",
      },
    ],
    lesson:
      "Standards are only useful if teams can actually ship within them. I held my position, made an exception when the business needed one, and used it to write clearer rules for the next team.",
  },

  outcome: {
    heading: "Merged, and available to every team using the kit",
    body: [
      "Item Tile merged into the production LD Kit. The exception led to clearer governance for future requests.",
    ],
    metrics: [
      {
        value: "Nov 10",
        label: "Item Tile merged into the production-ready LD Kit",
        basis: "shipped",
        source: "Merged Nov 10, 2026, after about six review passes. Available to every team using the kit.",
      },
      {
        value: "50–100",
        label: "teams can use it",
        basis: "estimated",
        source: "My estimate, not a measured figure.",
      },
      {
        value: "7–10",
        label: "tenants those teams span",
        basis: "estimated",
        source: "Part of the same estimate: a range, not a count.",
      },
    ],
    hindsight: [
      {
        title: "Write tests alongside the component",
        body: "The PR added no new test files, and the review bot noticed.",
      },
      {
        title: "Keep PRs smaller",
        body: "Forty-seven commits is a lot to review; smaller PRs are easier on everyone.",
      },
      {
        title: "Document the admission test",
        body: "It lived in my head and in meetings. It should be a one-page contribution guide.",
      },
      {
        title: "Disclose every change up front",
        body: "A short \"what changed and why\" in the PR description would have made review smoother.",
      },
    ],
  },
};
