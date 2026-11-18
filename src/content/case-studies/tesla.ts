import type { CaseStudy } from "@/lib/case-study";

export const tesla: CaseStudy = {
  slug: "tesla",
  company: "Tesla",
  title: "Giving Tesla advisors one view of the customer",
  blurb:
    "Tesla advisors used five to ten internal tools to resolve one customer issue. I designed Account Master, a single view of a customer's account, products, and history, and the layout later internal tools were built on.",
  period: "2020–2021",
  role: "Senior UX Designer",
  collaborators: ["Product", "Engineering", "Design"],
  disciplines: ["Enterprise", "Design systems"],
  thumb: { src: "/work/tesla/thumb.webp", alt: "Tesla Account Master on a laptop" },
  hero: {
    src: "/work/tesla/hero.webp",
    alt: "Tesla Account Master on a laptop showing a customer's account, alerts, and products",
  },

  stakes: {
    heading: "Advisors were working across too many tools",
    body: [
      "Customers deal with Tesla through one account and one app. Advisors had to piece each customer together from five to ten tools, each holding part of the picture. The customer waited on hold while they searched.",
    ],
    constraint:
      "Tesla's internal tools were moving to a modular, plug-and-play architecture. The design had to fit it.",
    media: [
      {
        src: "/work/tesla/asymmetry.webp",
        alt: "The Tesla customer app beside a cascade of five advisor tools: Sales, Fleet, Admin, Energy, Scheduling",
        caption: "The customer app next to five of the tools an advisor might need for the same customer.",
        width: "full",
      },
    ],
  },

  read: {
    heading: "Every team owned a tool, but no one owned the customer view",
    body: [
      "The brief was a better lookup tool. But each team owned its own tool, and no one owned the full customer record. A new tool would have been one more tab. Advisors needed one place where the customer stayed fixed and other tools attached to it.",
    ],
    media: [
      {
        src: "/work/tesla/frame.webp",
        alt: "Hub diagram: Customer Overview at center, with Products, Notifications, Account, and History around it, and ten tool families on the outer ring",
        caption: "The model we landed on: four things always visible in the center, and ten groups of tools that plug in around them.",
      },
    ],
  },

  bet: {
    heading: "Host the existing tools instead of rebuilding them",
    body: [
      "Instead of rebuilding every workflow, we built a shell. Account Master handled customer identity and navigation, and existing tools ran inside it as modules. Teams kept ownership of their tools; advisors got one view.",
    ],
    rejected: [
      {
        option: "Rebuild the main advisor workflows as one product",
        why: "Cleaner, but every team would have had to hand over its tool, and someone would have had to maintain all of it.",
      },
      {
        option: "Design new components for Account Master",
        why: "Engineering pushed back, correctly. Custom components would have made Account Master an exception in the system it was meant to standardize.",
      },
    ],
    media: [
      {
        layout: "stack",
        items: [
          {
            src: "/work/tesla/module-slots.webp",
            alt: "Energy and Sales tool windows with a highlighted slot where the Stream module attaches",
            caption: "Where a module attaches. It has to fit in every host tool, at every size.",
          },
          {
            src: "/work/tesla/modules.webp",
            alt: "The Stream communication module rendered inside Energy, Sales, and a mobile host",
            caption: "The Stream messaging module running inside three different host tools.",
          },
        ],
      },
    ],
  },

  work: [
    {
      title: "Account Master",
      goal: "One view of a customer's relationship with Tesla.",
      body: [
        "Account, alerts, products, payments, and activity in one view, built entirely from existing components.",
      ],
      media: [
        {
          layout: "carousel",
          items: [
            {
              src: "/work/tesla/layouts.webp",
              alt: "Five low-fidelity layout options for Account Master",
              caption: "Five early layouts, working out which information should always be visible and which should be a module.",
            },
            {
              src: "/work/tesla/v1.webp",
              alt: "Early Account Master: dense three-column layout with account, alerts, products, payments, and activity",
              caption: "An early version. Everything was on screen, with nothing prioritized.",
            },
            {
              src: "/work/tesla/final.webp",
              alt: "Final Account Master: account card on the left, product cards on the right",
              caption: "The final layout. The account card stays on the left, and products are the first module.",
            },
          ],
        },
        {
          src: "/work/tesla/prototype.mp4",
          kind: "video",
          alt: "Prototype walkthrough of Account Master",
          caption: "Prototype: search for a customer, open their account, and drill into a product.",
        },
      ],
    },
    {
      title: "The modular framework",
      goal: "Make Account Master the model for other tools.",
      body: [
        "Account Master became the reference for Tesla's plug-and-play tooling. Later tools used the same structure, so advisors met the same layout everywhere.",
      ],
      media: [
        {
          src: "/work/tesla/devices.webp",
          alt: "Account Master on phone, laptop, and tablet",
          caption: "The same layout on phone, laptop, and tablet.",
          width: "full",
        },
      ],
    },
  ],

  friction: {
    heading: "Engineering pushed back on custom components",
    body: [
      "My first designs used new components. Engineering's response: \"Too much engineering overhead. Use existing components.\" They were right. A tool meant to standardize the others should use the same parts. The result looked less distinctive and was easier to adopt, which was the goal.",
    ],
    tradeoffs: [
      {
        gaveUp: "Custom components and a more distinctive look",
        toGet: "A tool built from the same parts as everything else, which engineering was willing to build",
      },
      {
        gaveUp: "One rebuilt product for all advisor workflows",
        toGet: "Tool teams kept ownership, which is why they agreed to plug in",
      },
    ],
  },

  outcome: {
    heading: "Active users doubled",
    body: [
      "Account Master launched inside Stream, and Stream's active users doubled. Later internal tools were built on its structure. I shipped two other tools that year: Stream's multi-platform messaging and an email campaign manager for global commercial communications.",
    ],
    metrics: [
      {
        value: "400 → 800",
        label: "active Stream users, before and after launch",
        basis: "realized",
        source: "Platform active-user count before and after Account Master shipped inside Stream. A 100% increase.",
      },
      {
        value: "5–10 → 1",
        label: "tools per customer issue",
        basis: "realized",
        source: "Advisor workflow before and after; the pre-launch figure came from discovery.",
      },
    ],
  },
};
