import type { CaseStudy } from "@/lib/case-study";

export const twitter: CaseStudy = {
  slug: "twitter",
  company: "Twitter",
  title:
    "Internal tools for engineers who would rather you didn't design them anything",
  blurb:
    "On Redbird, Twitter's core infrastructure org, I designed the tools engineers used to search, provision, and build the platform. The users were experts with opinions; the job was velocity.",
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
    heading: "Thousands of engineers, and the platform was slowing them down",
    body: [
      "Docs, pages, and libraries lived in silos with no single search. Capacity recommendations arrived as bare numbers, so engineers didn't trust them and over-provisioned. There was no interface for GraphQL schemas at all. Each cost minutes per engineer per day, across 2,000+ engineers — and none of it had ever been designed, only built.",
    ],
    constraint:
      "The users were senior engineers with their own workarounds. Anything that felt designed *at* them would be ignored.",
    media: [
      {
        layout: "row",
        items: [
          {
            src: "/work/twitter/search-old.webp",
            alt: "The legacy go/Find search interface",
            caption: "go/Find before. It worked, in the sense that it returned results.",
          },
          {
            src: "/work/twitter/grafana-old.webp",
            alt: "A Grafana capacity dashboard being shared over a video call",
            caption: "RedCurve before: one large number, no visible reasoning. Engineers ignored it.",
          },
        ],
      },
    ],
  },

  read: {
    heading: "Expert users don't want an experience. They want to stop noticing the tool.",
    body: [
      "Consumer instincts fail here. The measure isn't engagement — it's how fast the tool disappears. That reframed everything: search was a latency and relevance problem, not a search experience. The capacity dashboard was a trust problem — engineers accept a recommendation when they can see the test results under it.",
    ],
    evidence: [
      {
        kind: "interview",
        what: "Engineer interviews before any design, synthesized by user story.",
        found: "The same three complaints came up unprompted in nearly every conversation: nothing could be found, capacity numbers couldn't be trusted, and there was nowhere to look at a schema. The scope came from the users, not the roadmap.",
      },
    ],
    media: [
      {
        layout: "row",
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
        caption: "Two of the interviews. The tool is not the subject; the workaround is.",
      },
      {
        layout: "row",
        items: [
          {
            src: "/work/twitter/user-stories.webp",
            alt: "Interview synthesis board grouped by user story: core API engineers, backend engineers, client engineers",
            caption: "Synthesis by story. The third column — client engineers unblocking themselves — became API Designer's reason to exist.",
          },
          {
            src: "/work/twitter/paper-notes.webp",
            alt: "Notebook sketches of the capacity dashboard and the throughput formula",
            caption: "The weighted-RPS formula by hand, before drawing anything. You can't design a number you don't understand.",
          },
        ],
      },
    ],
  },

  bet: {
    heading: "Rebuild the stack, not the skin",
    body: [
      "Search was the highest-traffic surface and where I made the least visible call: take on the frontend stack rather than restyle on top of it. The old stack made accessibility fixes structurally impossible. A restyle would have shipped in weeks and changed nothing.",
    ],
    rejected: [
      {
        option: "Restyle the existing search UI",
        why: "Fast and visible, and it would have locked in every structural accessibility problem while looking like progress.",
      },
      {
        option: "Make the capacity dashboard a visualization showcase",
        why: "The problem was trust, not beauty. Showing the test results was a plainer, denser, less impressive answer — and the right one.",
      },
    ],
    media: [
      {
        layout: "row",
        items: [
          {
            src: "/work/twitter/requirements.webp",
            alt: "Technical design doc for the new go/Find with product UI requirements and engineer comments",
            caption: "The bet written down. Accessible UI is a P0; engineers are commenting in the margins.",
          },
          {
            src: "/work/twitter/explorations.webp",
            alt: "Three concept directions for go/Find: MVP, MVP+, and Modern",
            caption: "Three directions. V2 won: a search box should look like it wants to be typed in.",
          },
        ],
      },
    ],
  },

  work: [
    {
      title: "go/Find",
      goal: "One place to search every doc, page, and library — fast enough to feel like nothing.",
      body: [
        "New interface, new frontend stack, better relevance. Accessibility score from 72 to 97 — the number I'm proudest of on this page because no engineer would ever have asked for it.",
      ],
      media: [
        {
          layout: "row",
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
          caption: "Results, empty states, and operator help. The refine page teaches AND, NOT, fuzzy, and exact — the four things power users asked for.",
        },
      ],
    },
    {
      title: "RedCurve",
      goal: "Make a capacity recommendation something an engineer would accept.",
      body: [
        "Redesigned the Grafana dashboard around the evidence — test runs, CPU, max RPS — and built a wizard for YAML configuration so provisioning didn't require already knowing the format.",
      ],
      media: [
        {
          layout: "carousel",
          items: [
            {
              src: "/work/twitter/journey.webp",
              alt: "Service-owner journey from capacity test through inspection to requesting capacity, with open questions annotated",
              caption: "The journey with its questions left on. 'Trust result?' is the diamond the redesign is about.",
            },
            {
              src: "/work/twitter/redcurve.webp",
              alt: "RedCurve dashboard on a monitor: service summary, recommendation, and taskrun performance charts",
              caption: "The recommendation now sits beside the data that produced it.",
            },
          ],
        },
        {
          src: "/work/twitter/redcurve-proto.mp4",
          kind: "video",
          alt: "Prototype walkthrough of the RedCurve dashboard",
          caption: "The prototype: from service summary to a capacity request without leaving the page.",
        },
      ],
    },
    {
      title: "API Designer",
      goal: "Let engineers explore, test, and share GraphQL schemas in the browser.",
      body: [
        "Explore thousands of types and fields, run test queries, share a schema before anyone implements it. Previously, APIs were designed with no interface at all.",
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
      goal: "Stop every dashboard from inventing its own chart conventions.",
      body: [
        "Audited internal dashboards and the field, then wrote a twelve-page guideline — types, variants, accessibility, interaction — and the Feather chart components that implement it.",
      ],
      media: [
        {
          layout: "carousel",
          items: [
            {
              src: "/work/twitter/audit.webp",
              alt: "Audit grid of Kibana, Datadog, Prometheus, Splunk, Tableau, and Grafana dashboards",
              caption: "What everyone else does, before deciding what we do.",
            },
            {
              src: "/work/twitter/dataviz-book.webp",
              alt: "Spread from the data visualization guideline showing palette rules and diverging data",
              caption: "The guideline.",
            },
            {
              src: "/work/twitter/grid-charts.webp",
              alt: "Feather grid chart components: bar, diverging, line, grouped, sequential, area, stacked",
              caption: "The components. Each one maps to a rule in the book.",
            },
          ],
        },
      ],
    },
    {
      title: "GraphQL-Java benchmarks",
      goal: "Show the open-source community how performance changes between commits.",
      body: [
        "A public dashboard for the GraphQL-Java repository — the only piece of this work anyone outside Twitter could see.",
      ],
      media: [
        {
          src: "/work/twitter/graphql-java.webp",
          alt: "GraphQL Java compare-test-runs dashboard on a laptop",
          width: "full",
        },
      ],
    },
  ],

  friction: {
    heading: "Winning arguments with people who write the code you're designing for",
    body: [
      "Every user was also a stakeholder with commit access. An engineer who disagreed could build the alternative before the review ended. You can't win on authority, and only partly on research — the person across the table has more domain expertise than any interview subject.",
      "The YAML wizard was the sharpest case. Engineers who already wrote the format by hand read a form on top of it as a step backward, and they were exactly the people whose approval the tool needed. It shipped as an on-ramp rather than a replacement — the raw config stayed one click away. That satisfied nobody completely, which is usually what adoption looks like.",
    ],
    tradeoffs: [
      {
        gaveUp: "Visible progress in the first months of search",
        toGet: "A stack that could actually support accessibility and richer results",
      },
    ],
  },

  outcome: {
    heading: "What it added up to",
    body: [
      "Five tools, one metric: how much faster engineers could build Twitter. None of them had a launch. They just stopped being in the way.",
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
