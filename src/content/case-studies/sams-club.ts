import type { CaseStudy } from "@/lib/case-study";

export const samsClub: CaseStudy = {
  slug: "sams-club",
  company: "Sam's Club",
  title:
    "Giving Sam's Club a way to reach members outside of email",
  blurb:
    "Sam's Club could reach members only by email and had no direct way to hear back. I designed the in-app Message Center, the Member's Mark Community, and the marketing workflow behind them.",
  period: "2023–2026",
  role: "Senior UX Designer, end to end",
  collaborators: ["Product", "Engineering", "Marketing", "Content", "Legal"],
  disciplines: ["Consumer", "Enterprise", "Design systems"],
  thumb: { src: "/work/sams-club/thumb.webp", alt: "Sam's Club Message Center on a phone" },
  hero: {
    src: "/work/sams-club/hero.webp",
    alt: "Sam's Club app account screen beside the Member's Mark Community admin portal",
  },

  stakes: {
    heading: "Email was the only channel",
    body: [
      "Email was the only channel to members, so anyone who didn't open email never heard from us. There was also no channel for feedback, so Member's Mark product decisions relied on slow, expensive vendor panels.",
    ],
    constraint:
      "Message Center was new in an app members already knew. They had no reason to look for it, and few read onboarding tours.",
    media: [
      {
        src: "/work/sams-club/one-channel.webp",
        alt: "Diagram: of four possible channels between Sam's Club and members, only marketing email is active",
        caption:
          "Four possible channels to members. Only marketing email was in use.",
        width: "full",
      },
    ],
  },

  read: {
    heading: "Three projects that depended on each other",
    body: [
      "These came in as three requests from three owners: an inbox, a community, and a campaign tool. None works alone. An inbox needs content, a community needs somewhere to send what it learns, and a campaign tool needs a channel.",
      "Together they form a cycle: Marketing decides what to send, Message Center delivers it, and the community's response shapes the next message.",
    ],
  },

  bet: {
    heading: "Ship the inbox before the automation",
    body: [
      "Marketing automation had the clearest ROI and the most stakeholder support. I argued against doing it first: with email as its only outlet, it wouldn't reach a single new member. We built the inbox first.",
    ],
    rejected: [
      {
        option: "Ship marketing automation first",
        why: "Easiest ROI case, but it only improved delivery to members we could already reach.",
      },
      {
        option: "Buy a vendor community platform",
        why: "Faster to set up, but member insight would sit in a vendor's system, priced per seat. That's what we were replacing.",
      },
    ],
  },

  work: [
    {
      title: "Message Center",
      goal: "Help members find a new feature without having to be taught it.",
      body: [
        "The app's first native inbox and push notifications. We tested red badges on the app icon, account tab, and Messages tile so members could follow them to the inbox without instructions. All message types share one structure, so a new category is a content change, not an engineering project.",
      ],
      media: [
        {
          layout: "stack",
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
          caption: "The badge path as tested: a badge on the tab, then on the row, then the inbox.",
        },
      ],
    },
    {
      title: "Member's Mark Community",
      goal: "Give the insights team a way to hear from members directly.",
      body: [
        "I designed the associate side: recruiting members, launching research activities, and turning responses into input for merchandising decisions.",
      ],
      media: [
        {
          layout: "stack",
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
      goal: "Shorten the time between planning a campaign and sending it.",
      body: [
        "I ran a two-day cross-team workshop to find where campaign time went, then prototyped a connected workflow. Most of my effort went into personalization: working with Content on how messages are prioritized for each member.",
      ],
      media: [
        {
          layout: "carousel",
          items: [
            {
              src: "/work/sams-club/workshop-matrix.webp",
              alt: "Impact/effort matrix from the workshop with clustered sticky notes",
              caption: "From the third workshop session. Nearly every high-impact idea was also high-effort.",
            },
            {
              src: "/work/sams-club/ma-demo.gif",
              alt: "Animation of the marketing automation workflow prototype",
              caption: "The workflow prototype.",
            },
            {
              src: "/work/sams-club/nba-module.webp",
              alt: "Next Best Action module spec across desktop and mobile, with and without the member's name",
              caption: "Next Best Action: three suggested nudges, with a fallback for members we can't identify.",
            },
          ],
        },
      ],
    },
  ],

  friction: {
    heading: "Choosing what to push for",
    body: [
      "In-product analytics and native surveys were both valuable, and both hit engineering limits. I couldn't get both into one quarter, so I chose what kept the pilot on schedule.",
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
        caption: "The analytics view we cut. The design was done, but dropping it kept the launch on schedule.",
        width: "full",
      },
    ],
  },

  outcome: {
    heading: "Results",
    body: [
      "The three projects launched as one system. In 2026 I moved with the work to Walmart's design organization, where these patterns became the starting point for a design system shared across brands.",
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
