import type { CaseStudy } from "@/lib/case-study";

/**
 * WALMART — in progress. The Item Tile chapter is the missing evidence;
 * answer the numbered prompts there and this ships.
 */
export const walmart: CaseStudy = {
  slug: "walmart",
  company: "Walmart",
  draft: false,

  title:
    "A design system is adopted, not enforced — so the hard part is relational, not technical",
  blurb:
    "Walmart's design standards have to hold across many businesses and international markets at once. I work on the patterns, and on the harder problem: a bar high enough to be worth adopting is also high enough to strand teams that need to move fast.",
  period: "2026–present",
  role: "Senior UX Designer, Design Systems",
  collaborators: ["TODO — orgs, tenants, engineering partners"],
  disciplines: ["Enterprise", "Design systems", "Multi-tenancy"],
  thumb: { src: "/work/walmart/tenants.webp", alt: "Walmart, Sam's Club, Member's Mark, and Bodega Aurrera logos" },
  hero: {
    src: "/work/walmart/item-carousel.webp",
    alt: "Item Carousel component spec: copy limits, 4-up and 2-up layouts, light and dark mode",
  },

  stakes: {
    heading: "One standard, many owners, no authority to compel it",
    body: [
      "Walmart is many businesses and many markets, each with its own roadmap and its own patterns. Left alone, each re-decides usability, accessibility, and scalability from scratch, badly, in parallel. The cost isn't inconsistency. It's the same problem solved wrong dozens of times.",
    ],
    constraint:
      "A tenant's preferred pattern isn't automatically wrong, and the system can't overrule one. Adoption is voluntary in practice even where it's mandated on paper.",
    media: [
      {
        src: "/work/walmart/tenants.webp",
        alt: "Four tenant logos: Walmart, Sam's Club, Member's Mark, Bodega Aurrera",
        caption: "Four of the tenants. Each one is a business with its own identity and its own reasons to say no.",
      },
    ],
  },

  read: {
    heading: "The disagreement isn't about quality. It's about frame size.",
    body: [
      "When a feature team pushes back, it's almost never because they want a worse experience. They're evaluating against the only scope they can see — their product, their release — and within that frame they're often right. The system's frame is every tenant and every market. The two sides aren't in conflict on the merits; they're answering different questions, and only one side knows it.",
      "So the work is relational. You can't resolve a frame-size mismatch by being right — that's what you already were. You resolve it by making the larger frame visible without spending the team's goodwill to do it.",
    ],
    evidence: [
      {
        kind: "audit",
        what: "TODO — what established the scope gap? A cross-tenant audit, a locale review, counting duplicate rebuilds?",
        found: "TODO — the finding that made the argument for you",
      },
    ],
  },

  bet: {
    heading: "Draw the line at behavior, not appearance",
    body: [
      "Where the line sits between tenant control and system control is the whole design. Too tight and tenants fork; too loose and the system guarantees nothing. We put it at behavior. Theming, tokens, and use-case variants are the tenant's — a business should look like itself. Structure, interaction, and accessibility are not negotiable, because those have to survive a locale nobody in the room has thought about yet.",
    ],
    rejected: [
      {
        option: "Absorb each tenant's existing patterns as-is",
        why: "Immediate adoption, and the system becomes documentation of variance rather than a source of guarantees.",
      },
      {
        option: "Lock appearance too",
        why: "Uniformity at the price of adoption. Businesses that can't look like themselves don't opt in.",
      },
      {
        option: "One version, everyone upgrades together",
        why: "Impossible to schedule across this many roadmaps. We run multiple versions and carry the maintenance cost, because a forced upgrade is the fastest way to make a tenant fork.",
      },
    ],
    media: [
      {
        src: "/work/walmart/tokens-doc.webp",
        alt: "Spacing and Layout documentation page for a text area component, annotated with token references and measurements",
        caption: "What 'not negotiable' looks like in practice: spacing, sizing, and padding specified in tokens a tenant can theme but not restructure.",
        width: "full",
      },
    ],
  },

  work: [
    {
      title: "Item Tile",
      goal: "TODO — what Item Tile had to accomplish that previous tiles couldn't",
      body: [
        // Answer in order; delete each prompt as you replace it.
        // 1. THE ASK — which tenant pushed hardest, and for what? State their case fairly.
        "TODO",
        // 2. THE WORLDWIDE CONSTRAINT — what broke once held against every market? Price/unit-price conventions, currency, text expansion, RTL, badge stacking, minimum legible size.
        "TODO",
        // 3. WHERE THE LINE LANDED — the payload. Which parts opened to tenants, which held, and the principle that decided it.
        "TODO",
        // 4. NESTED INTERACTIVE — a tile is a link wrapping controls. How did keyboard and screen-reader users get through it?
        "TODO",
        // 5. ADOPTION — system layer or experimental layer? If experimental, say so; it's the strongest evidence the tier was needed.
        "TODO",
        // 6. STATUS — exact. "Three tenants integrated, two in progress" beats a round-up.
        "TODO",
      ],
      media: [
        // Show the tile under stress: across tenants, across locales, at worst-case string lengths.
      ],
    },
    {
      title: "Versioning and adoption",
      goal: "Let many roadmaps move at their own speed without splintering the standard.",
      body: [
        "Multiple system versions run concurrently. Adoption is pursued across all tenants rather than staged, so every change has to be defensible to everyone at once. TODO — how many versions, how many tenants, how migration works.",
      ],
    },
    {
      title: "The experimental layer",
      goal: "Give feature teams a sanctioned way to move fast without leaving the system.",
      body: [
        "The system layer is robust and slow. A custom surface is fast and guarantees nothing. Between them there was nothing — so a team with an urgent need and a pattern that didn't clear our bar had two options, both bad. We're building the third: a layer where teams ship quickly under lighter requirements, with a path back into the system for patterns that prove themselves. TODO — where it stands, and the promotion criteria.",
      ],
    },
  ],

  friction: {
    heading: "For a while, the standard was me",
    body: [
      "I default to defending the system, and for a long time I read that as the job. But a bar high enough to be worth adopting also strands people — and the stranded teams were the ones who depended on us most. Saying no was defensible every time and wrong in aggregate: they build it themselves, and the thing I was protecting against happens anyway, outside my view and undocumented. The experimental layer exists because of that. It's a structural answer to a failure mode that was mine.",
      "TODO — one specific instance, names removed.",
    ],
    tradeoffs: [
      {
        gaveUp: "A single version and a clean migration story",
        toGet: "Tenants who upgrade on their own roadmap instead of forking",
      },
      {
        gaveUp: "Full documentation before every ship",
        toGet: "Urgent releases that still carry some design documentation — an imperfect floor, held",
      },
    ],
  },

  outcome: {
    heading: "TODO",
    body: [
      "TODO — tenants adopted, markets covered, patterns consolidated, time-to-ship via the experimental layer. `target` is fine.",
    ],
    metrics: [
      {
        value: "TODO",
        label: "TODO",
        basis: "target",
        source: "TODO",
      },
    ],
  },
};
