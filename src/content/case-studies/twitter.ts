import type { CaseStudy } from "@/lib/case-study";

export const twitter: CaseStudy = {
  slug: "twitter",
  company: "Twitter",
  title:
    "Internal tools for Twitter's infrastructure engineers",
  blurb:
    "On Redbird, Twitter's core infrastructure org, I designed tools engineers used to search internal docs, provision capacity, and design APIs. The goal was to help them ship faster.",
  period: "2022–2023",
  role: "Senior Product Designer, Redbird",
  collaborators: ["Engineering", "Product", "Research", "Design Systems"],
  disciplines: ["Enterprise", "Developer tools", "Design systems"],
  thumb: { src: "/work/twitter/thumb.webp", alt: "Twitter internal tools on a laptop" },
  hero: {
    src: "/work/twitter/hero.webp",
    alt: "go/Find, Twitter's internal search, on a laptop",
  },

  stakes: {
    heading: "Everyday tools were slowing engineers down",
    body: [
      "Docs, pages, and libraries had no single search. Capacity recommendations were one unexplained number, so engineers over-provisioned. GraphQL schemas had no interface at all. Each cost minutes a day across 2,000+ engineers, and none had been designed.",
    ],
    constraint:
      "The users were senior engineers with their own workarounds. A tool that felt designed *at* them would be ignored.",
    media: [
      {
        layout: "stack",
        items: [
          {
            src: "/work/twitter/search-old.webp",
            alt: "The legacy go/Find search interface",
            caption: "go/Find before the redesign.",
          },
          {
            src: "/work/twitter/grafana-old.webp",
            alt: "A Grafana capacity dashboard being shared over a video call",
            caption: "RedCurve before: one large number with nothing showing how it was calculated. Engineers mostly ignored it.",
          },
        ],
      },
    ],
  },

  read: {
    heading: "Engineers wanted speed and evidence",
    body: [
      "Success here is how quickly engineers get what they need and leave. Search came down to speed and relevance. The capacity dashboard came down to trust: engineers accept a recommendation when they can see the test results behind it.",
    ],
    evidence: [
      {
        kind: "interview",
        what: "Interviews with engineers before any design work, grouped by user story.",
        found: "Three complaints came up unprompted in nearly every interview: they couldn't find things, didn't trust capacity numbers, and had nowhere to view a schema. Those became the scope.",
      },
    ],
    media: [
      {
        layout: "stack",
        spotlight: true,
        items: [
          {
            src: "/work/twitter/interview-danielle.mp4",
            kind: "video",
            controls: true,
            alt: "Recorded user interview with an engineer",
          },
          {
            src: "/work/twitter/interview-kelly.mp4",
            kind: "video",
            controls: true,
            alt: "Recorded user interview with a second engineer",
          },
        ],
        caption: "Two of the interviews. We spent more time on engineers' workarounds than on the tools themselves.",
      },
      {
        layout: "stack",
        items: [
          {
            src: "/work/twitter/user-stories.webp",
            alt: "Interview synthesis board grouped by user story: core API engineers, backend engineers, client engineers",
            caption: "Findings grouped by story. The third column, client engineers trying to unblock themselves, is where API Designer came from.",
          },
          {
            src: "/work/twitter/paper-notes.webp",
            alt: "Notebook sketches of the capacity dashboard and the throughput formula",
            caption: "Working through the weighted-RPS formula by hand before designing anything, so I understood the number I'd be showing.",
          },
        ],
      },
    ],
  },

  bet: {
    heading: "Rebuild search instead of restyling it",
    body: [
      "Search had the most traffic. I pushed to rebuild its frontend rather than restyle it, because the old stack blocked accessibility fixes. A restyle would have shipped in weeks and fixed nothing underneath.",
    ],
    rejected: [
      {
        option: "Restyle the existing search UI",
        why: "Fast and visible, but it would have locked in the accessibility problems.",
      },
      {
        option: "Turn the capacity dashboard into a showcase visualization",
        why: "The problem was trust. Engineers needed the test results, shown plainly.",
      },
    ],
    media: [
      {
        layout: "stack",
        items: [
          {
            src: "/work/twitter/requirements.webp",
            alt: "Technical design doc for the new go/Find with product UI requirements and engineer comments",
            caption: "The plan, written down. Accessible UI is marked P0, with engineers commenting in the margins.",
          },
          {
            src: "/work/twitter/explorations.webp",
            alt: "Three concept directions for go/Find: MVP, MVP+, and Modern",
            caption: "Three directions. We went with V2, which made the search box the obvious place to start.",
          },
        ],
      },
    ],
  },

  work: [
    {
      title: "go/Find",
      goal: "One fast place to search every doc, page, and library.",
      body: [
        "New interface, new frontend stack, better relevance. Accessibility score went from 72 to 97, the result I'm proudest of because no engineer asked for it.",
      ],
      media: [
        {
          layout: "stack",
          items: [
            {
              src: "/work/twitter/search-results.webp",
              alt: "go/Find results page with source filters, top hits, and people results",
            },
            {
              src: "/work/twitter/hifi.webp",
              alt: "Four go/Find screens: results, no results, refine your search, and a 404",
            },
          ],
          caption: "Results, empty states, and search help. The refine page explains AND, NOT, fuzzy, and exact search, the four operators power users asked for.",
        },
      ],
    },
    {
      title: "RedCurve",
      goal: "Make capacity recommendations something engineers would trust.",
      body: [
        "I redesigned the Grafana dashboard to show the evidence behind each recommendation (test runs, CPU, max RPS) and built a wizard so engineers could provision without knowing the YAML format.",
      ],
      media: [
        {
          layout: "carousel",
          items: [
            {
              src: "/work/twitter/journey.webp",
              alt: "Service-owner journey from capacity test through inspection to requesting capacity, with open questions annotated",
              caption: "The user journey with open questions still noted. \"Trust result?\" is the step the redesign focused on.",
            },
            {
              src: "/work/twitter/redcurve.webp",
              alt: "RedCurve dashboard on a monitor: service summary, recommendation, and taskrun performance charts",
              caption: "The recommendation now sits next to the data behind it.",
            },
          ],
        },
        {
          src: "/work/twitter/redcurve-proto.mp4",
          kind: "video",
          alt: "Prototype walkthrough of the RedCurve dashboard",
          caption: "Prototype: going from a service summary to a capacity request on one page.",
        },
      ],
    },
    {
      title: "API Designer",
      goal: "Let engineers explore, test, and share GraphQL schemas in the browser.",
      body: [
        "Browse thousands of types and fields, run test queries, and share a schema before it's built. Previously there was no interface for this.",
      ],
      media: [
        {
          src: "/work/twitter/api-designer.webp",
          alt: "API Designer schema sandbox: select type, manage fields, preview operation",
          width: "full",
        },
      ],
    },
    {
      title: "Data visualization guidelines",
      goal: "Give every internal dashboard the same chart conventions.",
      body: [
        "I audited internal dashboards and other companies' guidelines, then wrote a twelve-page guide (chart types, variants, accessibility, interaction) and the Feather chart components that implement it.",
      ],
      media: [
        {
          layout: "carousel",
          items: [
            {
              src: "/work/twitter/audit.webp",
              alt: "Audit grid of Kibana, Datadog, Prometheus, Splunk, Tableau, and Grafana dashboards",
              caption: "Reviewing how other teams and companies handle charts before setting our own rules.",
            },
            {
              src: "/work/twitter/dataviz-book.webp",
              alt: "Spread from the data visualization guideline showing palette rules and diverging data",
              caption: "The guideline.",
            },
            {
              src: "/work/twitter/grid-charts.webp",
              alt: "Feather grid chart components: bar, diverging, line, grouped, sequential, area, stacked",
              caption: "The components. Each one maps to a rule in the guide.",
            },
          ],
        },
      ],
    },

  ],

  friction: {
    heading: "Designing for people who could build it themselves",
    body: [
      "Every user was a stakeholder who could write code. An engineer who disagreed could build an alternative before the review ended, and often knew the domain better than anyone I'd interviewed.",
      "The YAML wizard was the clearest case. Engineers who wrote config by hand saw a form as a step backward. We shipped it as an optional starting point, with raw config one click away. Not everyone loved it, but people used it.",
    ],
    tradeoffs: [
      {
        gaveUp: "Visible progress on search in the first few months",
        toGet: "A frontend that could support accessibility and better results",
      },
    ],
  },

  outcome: {
    heading: "Results",
    body: [
      "Five tools with one goal: help engineers build Twitter faster. None had a big launch. They saved engineers time every day.",
    ],
    metrics: [
      {
        value: "72 → 97",
        label: "accessibility score, go/Find",
        basis: "realized",
        source: "Lighthouse audit before and after the frontend rebuild.",
      },
      {
        value: "1000s",
        label: "fields explorable in API Designer",
        basis: "realized",
        source: "Scope of the redesigned GraphQL interface at ship.",
      },
      {
        value: "12 pp.",
        label: "data-viz guideline, in the design system",
        basis: "realized",
        source: "Published internally with matching Feather components.",
      },
    ],
  },
};
