import type { CaseStudy } from "@/lib/case-study";

export const tesla: CaseStudy = {
  slug: "tesla",
  company: "Tesla",
  title: "The customer had one Tesla. The advisor serving them had ten tools.",
  blurb:
    "Tesla Advisors resolved issues by jumping across five to ten internal tools. I designed Account Master — one view of a customer's relationship with Tesla — and the frame other tools plugged into.",
  period: "2020–2021",
  role: "Senior UX Designer, Tesla OS internal tools",
  collaborators: ["Product", "Engineering", "Design"],
  disciplines: ["Enterprise", "Design systems"],
  thumb: { src: "/work/tesla/thumb.webp", alt: "Tesla Account Master on a laptop" },
  hero: {
    src: "/work/tesla/hero.webp",
    alt: "Tesla Account Master on a laptop showing a customer's account, alerts, and products",
  },

  stakes: {
    heading: "An asymmetry nobody was measuring",
    body: [
      "The customer had one account, one app, one relationship. The advisor behind it had five to ten tools, each holding one slice of the customer and none holding all of it. Every minute of that scavenger hunt was a minute the customer was on hold.",
    ],
    constraint:
      "Internal tooling was mid-transition to a modular, plug-and-play model. Anything I built had to fit the architecture that was arriving.",
    media: [
      {
        src: "/work/tesla/asymmetry.webp",
        alt: "The Tesla customer app beside a cascade of five advisor tools: Sales, Fleet, Admin, Energy, Scheduling",
        caption: "One screen versus five. The customer never saw this gap; the advisor lived in it.",
        width: "full",
      },
    ],
  },

  read: {
    heading: "This wasn't a tool. It was a frame the other tools had to fit into.",
    body: [
      "The brief said build a better lookup tool. The real problem was that every team owned a tool and nobody owned the customer. Another tool — even a good one — would have been the eleventh tab. What the advisor needed was a container: one place where the customer's identity was fixed and everything else attached to it.",
    ],
    media: [
      {
        src: "/work/tesla/frame.webp",
        alt: "Hub diagram: Customer Overview at center, with Products, Notifications, Account, and History around it, and ten tool families on the outer ring",
        caption: "The frame. Four things fixed at the center; ten tool families that plug into the ring.",
      },
    ],
  },

  bet: {
    heading: "A shell that hosts existing tools, not a rebuild of them",
    body: [
      "Rebuilding the advisor workflows into one product would have been the better experience for a year and a maintenance disaster forever — every tool team would have had to hand over their surface. Instead: a shell. Account Master fixed identity and navigation and hosted existing tools as modules. Teams kept ownership. Advisors got one view.",
    ],
    rejected: [
      {
        option: "Rebuild the core advisor workflows in one product",
        why: "Cleaner, and organizationally impossible — it required every tool-owning team to give up their surface.",
      },
      {
        option: "Design a custom component set for the new surface",
        why: "Engineering's answer was blunt, and they were right. Custom components would have made Account Master a special case in the ecosystem it was meant to standardize.",
      },
    ],
    media: [
      {
        layout: "row",
        items: [
          {
            src: "/work/tesla/module-slots.webp",
            alt: "Energy and Sales tool windows with a highlighted slot where the Stream module attaches",
            caption: "The slot. A module has to fit here, in every host, at every size.",
          },
          {
            src: "/work/tesla/modules.webp",
            alt: "The Stream communication module rendered inside Energy, Sales, and a mobile host",
            caption: "The same module, three hosts. What 'plug-and-play' had to mean in practice.",
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
        "Account, alerts, products, payments, activity — one frame instead of ten, built entirely from existing components.",
      ],
      media: [
        {
          layout: "carousel",
          items: [
            {
              src: "/work/tesla/layouts.webp",
              alt: "Five low-fidelity layout options for Account Master",
              caption: "Five layouts. Which information is fixed, and which is a module?",
            },
            {
              src: "/work/tesla/v1.webp",
              alt: "Early Account Master: dense three-column layout with account, alerts, products, payments, and activity",
              caption: "Early. Everything visible, nothing prioritized.",
            },
            {
              src: "/work/tesla/final.webp",
              alt: "Final Account Master: account card on the left, product cards on the right",
              caption: "Final. The account card is fixed; products are the first module.",
            },
          ],
        },
        {
          src: "/work/tesla/prototype.mp4",
          kind: "video",
          alt: "Prototype walkthrough of Account Master",
          caption: "The prototype: search a customer, land on one view, drill into a product.",
        },
      ],
    },
    {
      title: "The modular framework",
      goal: "Make Account Master the standard, not the exception.",
      body: [
        "Account Master became the reference implementation for Tesla's plug-and-play tooling — the structure later tools were built against. It simplified the experience for thousands of advisors by setting the standard, not by being the only tool that followed it.",
      ],
      media: [
        {
          src: "/work/tesla/devices.webp",
          alt: "Account Master on phone, laptop, and tablet",
          caption: "Same frame, three form factors.",
          width: "full",
        },
      ],
    },
  ],

  friction: {
    heading: "\"Too much engineering overhead. Use existing components.\"",
    body: [
      "A direct quote from Engineering, and the most useful thing anyone said. My first designs assumed a new surface earned new components. Engineering's position: a tool meant to standardize the ecosystem should be built from the ecosystem's parts. I lost that argument, and it was the right outcome — the versions on existing components were less distinctive and more adoptable, and adoption was the metric.",
    ],
    tradeoffs: [
      {
        gaveUp: "A custom component set and a more distinctive surface",
        toGet: "A tool built from the same parts as the ecosystem — and engineering's willingness to build it",
      },
      {
        gaveUp: "Rebuilding the advisor workflows into one product",
        toGet: "Every tool team keeping their surface, which is why they adopted the frame",
      },
    ],
  },

  outcome: {
    heading: "Doubled, then copied",
    body: [
      "Account Master launched inside Stream and doubled its active users. More durably, it set the structure later tools were built against. It was one of three Tesla OS tools I shipped in the year — alongside Stream's multi-platform messaging and an email campaign manager for global commercial communications — and the one that changed how the other two were built.",
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
