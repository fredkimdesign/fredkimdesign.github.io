import type { CaseStudy } from "@/lib/case-study";

/**
 * WALMART — current work. Item Tile and the experimental layer are in
 * flight and are described as such; nothing here claims a result that
 * hasn't landed.
 */
export const walmart: CaseStudy = {
  slug: "walmart",
  company: "Walmart",
  draft: true,

  title:
    "Getting teams across Walmart to adopt one design system",
  blurb:
    "Walmart's design standards must work across many businesses and international markets. I work on the shared patterns, and on keeping a high quality bar from blocking teams that need to move fast.",
  period: "2026–present",
  role: "Senior UX Designer, Design Systems",
  collaborators: ["Design Systems", "Platform Engineering", "Tenant feature teams"],
  disciplines: ["Enterprise", "Design systems", "Multi-tenancy"],
  thumb: { src: "/work/walmart/tenants.webp", alt: "Walmart, Sam's Club, Member's Mark, and Bodega Aurrera logos" },

  stakes: {
    heading: "One standard, many teams, and no way to require it",
    body: [
      "Walmart spans many businesses and markets, each with its own roadmap and patterns. Without a shared system, each team solves usability, accessibility, and scale on its own, and the same problem gets solved badly many times.",
    ],
    constraint:
      "The system can't overrule a team's preferred pattern. In practice adoption is voluntary, even where it's required.",
    media: [
      {
        src: "/work/walmart/tenants.webp",
        alt: "Four tenant logos: Walmart, Sam's Club, Member's Mark, Bodega Aurrera",
        caption: "Four of the brands the system supports. Each has its own identity and its own reasons to push back.",
      },
    ],
  },

  read: {
    heading: "Most disagreements were about scope",
    body: [
      "When a feature team pushes back, they're judging a pattern against their own product, and within that scope they're often right. The system has to work for every brand and market. Both sides can be right.",
      "So much of the work is showing teams the wider picture without burning their goodwill.",
    ],
    evidence: [
      {
        kind: "audit",
        what: "Reviewing each request as it came in and noting the reason behind it.",
        found: "Most requests that looked like quality disputes were about scope: the pattern worked for one product and not the others.",
      },
    ],
  },

  bet: {
    heading: "Brands control the look; the system controls behavior",
    body: [
      "Too strict and teams build their own; too loose and the system guarantees nothing. We drew the line at behavior. Theming, tokens, and variants belong to each brand. Structure, interaction, and accessibility are fixed, so they hold up in every market.",
    ],
    rejected: [
      {
        option: "Adopt each brand's existing patterns as they are",
        why: "Instant adoption, but the system would only document differences.",
      },
      {
        option: "Lock down appearance too",
        why: "Businesses that can't look like themselves won't opt in.",
      },
      {
        option: "One version that everyone upgrades to together",
        why: "Impossible to schedule across this many roadmaps. We run several versions and absorb the maintenance cost, because forced upgrades push teams to build their own.",
      },
    ],
    media: [
      {
        src: "/work/walmart/tokens-doc.webp",
        alt: "Spacing and Layout documentation page for a text area component, annotated with token references and measurements",
        caption: "Spacing, sizing, and padding are specified as tokens. A brand can theme them but can't change the structure.",
        width: "full",
      },
    ],
  },

  work: [
    {
      title: "Item Tile",
      goal: "The most common component in retail, built to work for every brand and market.",
      body: [
        "The tile appears in search, browse, carousels, recommendations, cart, and ads, and merchandising, pricing, and ads teams all want space on it. Most requests are about content hierarchy, which makes it the hardest test of the line.",
        "Brands control theme, tokens, and variants. Structure, interaction, and keyboard navigation stay the same everywhere. In build now, with teams integrating.",
      ],
      media: [
        {
          src: "/work/walmart/item-carousel.webp",
          alt: "Item Carousel component spec: copy limits, 4-up and 2-up layouts, light and dark mode",
          width: "full",
          caption: "The carousel that holds the tile. Copy limits, the 4-up and 2-up grids, and light and dark mode are fixed. Color, type, and branding are up to each brand.",
        },
      ],
    },
    {
      title: "Versioning and adoption",
      goal: "Let teams move at their own pace without splitting the standard.",
      body: [
        "Several versions run at once, and every change has to work for all brands. We write a spec for each change, even under deadline, because teams don't keep patterns they can't understand.",
      ],
    },
    {
      title: "The experimental layer",
      goal: "Give feature teams an approved way to move fast without leaving the system.",
      body: [
        "The system is reliable but slow; a custom build is fast but guarantees nothing. We're building a middle option: ship quickly with lighter requirements, and move patterns that work into the system later. In build now.",
      ],
    },
  ],

  friction: {
    heading: "I was part of the problem",
    body: [
      "My instinct was to defend the system. But each \"no\" pushed a team to build its own version anyway, outside the system and undocumented, and those teams often depended on us most. The experimental layer came from recognizing that.",
    ],
    tradeoffs: [
      {
        gaveUp: "A single version and a simple migration path",
        toGet: "Teams that upgrade on their own schedule instead of building their own",
      },
      {
        gaveUp: "Full documentation before every release",
        toGet: "Urgent releases that still include some design documentation",
      },
    ],
  },

  outcome: {
    heading: "Where it stands",
    body: [
      "This work is ongoing, so these numbers describe scope, not results. Three product pillars build on the system today, and the experimental layer is in build. The measure I care about, whether teams use the system instead of working around it, comes next.",
    ],
    metrics: [
      {
        value: "3+",
        label: "product pillars building on the subsystem",
        basis: "realized",
        source: "Pillars actively consuming the subsystem design system as of 2026.",
      },
      {
        value: "All",
        label: "tenants targeted for adoption, not a staged subset",
        basis: "target",
        source: "Adoption is pursued across every tenant at once; each change must be defensible to all of them.",
      },
    ],
  },
};
