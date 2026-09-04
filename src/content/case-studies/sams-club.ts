import type { CaseStudy } from "@/lib/case-study";

export const samsClub: CaseStudy = {
  slug: "sams-club",
  company: "Sam's Club",
  title:
    "Reaching 1.8M members who had no way to hear from us — and no way to answer back",
  blurb:
    "Sam's Club could only reach members by email. I designed the in-app inbox, the member community, and the campaign workflow behind them as one loop.",
  period: "2023–2026",
  role: "Senior UX Designer — primary designer, end to end",
  collaborators: ["Product", "Engineering", "Marketing", "Content", "Legal"],
  disciplines: ["Consumer", "Enterprise", "Design systems"],
  thumb: { src: "/work/sams-club/thumb.webp", alt: "Sam's Club Message Center on a phone" },
  hero: {
    src: "/work/sams-club/hero.webp",
    alt: "Sam's Club app account screen beside the Member's Mark Community admin portal",
  },

  stakes: {
    heading: "One channel, and it was leaking",
    body: [
      "Sam's Club had one way to reach a member: email. A member who didn't open email wasn't under-engaged — they were outside the system entirely. And the gap ran both ways: there was no owned channel for member feedback, so Member's Mark decisions rested on slow, expensive vendor panels.",
    ],
    constraint:
      "Message Center was net-new surface in an app members already knew. No mental model existed for it, and nobody reads an onboarding tour.",
    media: [
      {
        src: "/work/sams-club/one-channel.webp",
        alt: "Diagram: of four possible channels between Sam's Club and members, only marketing email is active",
        caption:
          "Four channels drawn, one lit. Every member who ignored email was invisible to all of them.",
        width: "full",
      },
    ],
  },

  read: {
    heading: "Three briefs, one loop",
    body: [
      "These arrived as three requests from three owners — an inbox, a community, a campaign tool. Built separately, each would have shipped and none would have mattered: an inbox with nothing good in it, a community that couldn't route what it learned, campaign tooling with no channel to deliver into.",
      "What they shared was a loop. Marketing decides what to say, Message Center delivers it, the community says whether it landed, and that changes what Marketing says next.",
    ],
    media: [
      {
        src: "/work/sams-club/three-loops.webp",
        alt: "Three-panel illustration: a member shopping with her phone, a member at home on a laptop, a marketer at a desk",
        caption: "The three people in the loop. Two of them are members; the system only knew how to talk to one.",
        width: "full",
      },
    ],
  },

  bet: {
    heading: "Build the channel before the campaign",
    body: [
      "Marketing automation had the cleanest ROI and the most stakeholder pull, and I argued it shouldn't go first. Automating a workflow whose only outlet was email would have made an underperforming channel more efficient without adding a single reachable member. The inbox went first.",
    ],
    rejected: [
      {
        option: "Ship marketing automation first",
        why: "Loudest ask, easiest ROI story — and it would have optimized email delivery to the members who were already reachable.",
      },
      {
        option: "Buy a vendor community platform",
        why: "Faster to stand up, and it reproduces the failure we were replacing: member insight in someone else's system, priced per seat.",
      },
    ],
  },

  work: [
    {
      title: "Message Center",
      goal: "Let members find a feature they've never heard of, without being taught it.",
      body: [
        "A native inbox and push, for the first time. We tested red badges at three levels — app icon, account tab, Messages tile — so the path down was legible at each step with no explanation attached. Message types share one structure, so adding a category is a content decision, not a rebuild.",
      ],
      media: [
        {
          layout: "row",
          items: [
            {
              src: "/work/sams-club/message-center.webp",
              alt: "Two phones: the account screen with a 'You have 2 new messages' badge row, and the Messages inbox",
            },
            {
              src: "/work/sams-club/mc.gif",
              alt: "Animation of navigating from the account tab into Message Center",
            },
          ],
          caption: "Badge on the tab, badge on the row, then the inbox. Each level answers the one before it — and the path, as tested.",
        },
      ],
    },
    {
      title: "Member's Mark Community",
      goal: "Give the insights team a feedback loop they own.",
      body: [
        "The associate side: recruit members into the panel, launch research activities, and turn participation into something a merchandising decision can rest on. Rapid prototypes, tight stakeholder loops.",
      ],
      media: [
        {
          layout: "row",
          items: [
            {
              src: "/work/sams-club/community.webp",
              alt: "The member-facing community app beside the admin Campaigns table",
            },
            {
              src: "/work/sams-club/mmc-admin.gif",
              alt: "Animation of the admin portal creating a campaign",
            },
          ],
          caption: "Members see activities. Associates see campaigns, invites, response rates, and points spent.",
        },
      ],
    },
    {
      title: "Marketing automation",
      goal: "Close the gap between planning a campaign and delivering it.",
      body: [
        "I ran a two-day cross-functional workshop to find where the time actually went, then prototyped an integrated workflow. The part I care about most is personalization — with Content, shaping how messages get prioritized. Relevance as a property of the product, not a layer marketing applies on top.",
      ],
      media: [
        {
          layout: "carousel",
          items: [
            {
              src: "/work/sams-club/workshop-matrix.webp",
              alt: "Impact/effort matrix from the workshop with clustered sticky notes",
              caption: "Session three. Almost everything high-impact was also high-effort.",
            },
            {
              src: "/work/sams-club/ma-demo.gif",
              alt: "Animation of the marketing automation workflow prototype",
              caption: "The workflow prototype.",
            },
            {
              src: "/work/sams-club/nba-module.webp",
              alt: "Next Best Action module spec across desktop and mobile, with and without the member's name",
              caption: "Next Best Action: three nudges, with a fallback for members we can't name.",
            },
          ],
        },
      ],
    },
  ],

  friction: {
    heading: "Knowing which ideas to fight for",
    body: [
      "Generating options was never the hard part. Deciding which to spend credibility on was. In-product analytics and native survey tooling both had real value and both hit engineering walls, and I couldn't win both in one quarter.",
    ],
    tradeoffs: [
      {
        gaveUp: "Native survey tooling inside the community",
        toGet: "A pilot launch on schedule, with surveys through existing systems",
      },
      {
        gaveUp: "In-product analytics for the insights team",
        toGet: "Engineering capacity for recruiting and activity-launch flows, which gated everything else",
      },
    ],
    media: [
      {
        src: "/work/sams-club/community-analytics.webp",
        alt: "Campaign performance dashboard with response-rate charts and participation bars, beside the member survey on a phone",
        caption: "The analytics view we cut. It was designed, it was good, and it was the right thing to give up for the launch date.",
        width: "full",
      },
    ],
  },

  outcome: {
    heading: "How it added up",
    body: [
      "Three workstreams, one loop. In parallel I owned UX for the associate-facing tools used by 1,000+ supply-chain employees — a different audience, the same instinct to design the system rather than the screen. In 2026 the work moved with me into Walmart's design organization, where these patterns became the starting point for a multi-tenant system.",
    ],
    metrics: [
      {
        value: "1.8M",
        label: "members made reachable",
        basis: "projected",
        source: "Members with no email engagement, now addressable via in-app inbox and push at launch scope.",
      },
      {
        value: "$316M",
        label: "business value",
        basis: "projected",
        source: "Modeled from improved engagement and savings visibility across the newly reachable population.",
      },
      {
        value: "$4–5M",
        label: "incremental operating income",
        basis: "projected",
        source: "Validated journey roadmap; vendor partnerships signed and engineering in build at handoff.",
      },
      {
        value: "50K",
        label: "member community base",
        basis: "target",
        source: "Q4 FY26 pilot launch, against a goal of 30% active membership growth.",
      },
    ],
  },
};
