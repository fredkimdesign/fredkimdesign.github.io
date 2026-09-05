import type { CaseStudy } from "@/lib/case-study";

/**
 * WALMART — current work. Item Tile and the experimental layer are in
 * flight and are described as such; nothing here claims a result that
 * hasn't landed.
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
  collaborators: ["Design Systems", "Platform Engineering", "Tenant feature teams"],
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
        what: "Reviewing tenant requests against the system as they arrived, one at a time, and noting why each one was really being made.",
        found: "Almost every request that presented as a quality disagreement was a scope disagreement: the pattern was right for one surface and wrong for the rest. That reframed the job from defending decisions to widening the frame.",
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
      goal: "The most-rendered component in retail, made to hold across every tenant and every market at once.",
      body: [
        "A tile appears in search, browse, carousels, recommendations, cart, and ads. Every tenant has a stake in it and every merchandising, pricing, and ads team wants room on it — which makes it the hardest test of the line between appearance and behavior, because tenant requests for a tile are usually about content hierarchy, and hierarchy sits right on that line.",
        "What a tenant can change: theme, tokens, and use-case variants. What holds everywhere: the structure, the interaction model, and the accessibility contract — a tile is a link wrapping other controls, and the keyboard and screen-reader path through it is not something a market gets to redecide. Copy limits, badge stacking, and worst-case string lengths are specified so the tile survives a locale nobody in the room has thought about yet.",
        "In progress. The spec is written and the component is being built with tenants integrating; the results belong in this study when they exist, not before.",
      ],
      media: [
        {
          src: "/work/walmart/item-carousel.webp",
          alt: "Item Carousel component spec: copy limits, 4-up and 2-up layouts, light and dark mode",
          width: "full",
          caption: "The carousel that hosts the tile. Notice what is pinned — copy limits, the 4-up and 2-up grids, the light and dark contract — and what isn't: colour, type, and brand are the tenant's.",
        },
      ],
    },
    {
      title: "Versioning and adoption",
      goal: "Let many roadmaps move at their own speed without splintering the standard.",
      body: [
        "Multiple system versions run concurrently, and adoption is pursued across all tenants rather than staged tenant by tenant — so every change has to be defensible to everyone at once. That constraint quietly raises the bar on every decision, and it is why the system ships with documentation even under deadline: an urgent release still carries a design spec, because a pattern nobody can explain is a pattern nobody will keep.",
      ],
    },
    {
      title: "The experimental layer",
      goal: "Give feature teams a sanctioned way to move fast without leaving the system.",
      body: [
        "The system layer is robust and slow. A custom surface is fast and guarantees nothing. Between them there was nothing — so a team with an urgent need and a pattern that didn't clear our bar had two options, both bad. We're building the third: a layer where teams ship quickly under lighter requirements, with a path back into the system for patterns that prove themselves. It takes engineering collaboration on both sides, which is the honest reason it didn't exist sooner. In build now.",
      ],
    },
  ],

  friction: {
    heading: "For a while, the standard was me",
    body: [
      "I default to defending the system, and for a long time I read that as the job. But a bar high enough to be worth adopting also strands people — and the stranded teams were the ones who depended on us most. Saying no was defensible every time and wrong in aggregate: they build it themselves, and the thing I was protecting against happens anyway, outside my view and undocumented. The experimental layer exists because of that. It's a structural answer to a failure mode that was mine.",
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
    heading: "Where it stands",
    body: [
      "This is current work, so the numbers are scope rather than results. Three product pillars are building on the subsystem today, several system versions run in parallel by design, and the experimental tier is in build. The measure that matters — whether teams reach for the system instead of around it — is the one I'll be able to report next.",
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
