/**
 * The case-study schema.
 *
 * This is deliberately a *closed* type rather than freeform MDX. Every case
 * study must make the same six-beat argument, in the same order, and the
 * compiler refuses to build if a beat is missing. The point is that the
 * structure is an argument, not a process: "Discovery / Ideation / Prototyping"
 * is identical for every project a designer has ever run, which is exactly why
 * it invites boilerplate. "What I understood that wasn't obvious" is not.
 */

/** A paragraph of prose. Arrays of these render as body copy. */
export type Para = string;

export type Media = {
  src: string;
  alt: string;
  /** Defaults to image. Video renders muted, looping, inline. */
  kind?: "image" | "video";
  /** For video: autoplays muted either way; this adds controls so the reader can unmute, and plays once instead of looping. Use for interviews. */
  controls?: boolean;
  /** Shown beneath the image. Say what the reader should notice, not what it is. */
  caption?: string;
  /** `full` breaks the text column; `inset` sits inside it. */
  width?: "inset" | "full";
  aspect?: string;
};

/**
 * Whether a number actually happened. Encoded in the type so it can never be
 * quietly dropped — the renderer always prints the basis next to the figure.
 */
export type MetricBasis =
  | "realized" // measured after ship
  | "shipped" // it landed; a fact, not a measurement
  | "estimated" // the author's estimate, not a measured figure
  | "projected" // modeled, not yet observed
  | "pilot" // measured, but on a limited population
  | "target"; // committed goal, outcome not yet known

export type Metric = {
  value: string;
  label: string;
  basis: MetricBasis;
  /** How the number was arrived at. Required — an unsourced metric is a claim. */
  source: string;
};

/**
 * Several related images under one caption. `stack` reads top to bottom like
 * the rest of the article — never side by side; `carousel` is a slideshow —
 * one image at a time, arrows and dots — for iterations, screens, or anything
 * with more than two items. Videos never go in a carousel; they are
 * spotlighted on their own.
 */
export type MediaGroup = {
  layout: "stack" | "carousel";
  items: Media[];
  caption?: string;
  /** Give the group its own room. Stacks of videos are spotlighted automatically. */
  spotlight?: boolean;
};

/**
 * A stand-in for an image that doesn't exist yet. It states what belongs
 * there and the ratio to export at, and is drawn so it can never be mistaken
 * for product UI.
 */
export type Placeholder = {
  kind: "placeholder";
  /** What belongs here. Written for the author, read by everyone. */
  label: string;
  /** CSS aspect ratio. Defaults to 16 / 9. */
  aspect?: string;
  caption?: string;
  width?: "inset" | "full";
};

/**
 * Data the page draws itself, rather than a picture of data. The numbers live
 * in the study file next to the prose that cites them.
 */
export type BarsExhibit = {
  kind: "bars";
  title: string;
  /** What is being measured against what. */
  note?: string;
  /** Appended to every value: ":1" for a contrast ratio. */
  unit: string;
  /** The scale. `min` is where bars start — 1 for contrast, which has no zero. */
  min: number;
  max: number;
  threshold: { value: number; label: string };
  rows: { label: string; value: number; pass: boolean }[];
  caption?: string;
};

export type StatsExhibit = {
  kind: "stats";
  title: string;
  /** Lines added and removed; drawn as a proportional bar. */
  diff?: { added: number; removed: number };
  items: { value: string; label: string }[];
  caption?: string;
};

export type TimelineExhibit = {
  kind: "timeline";
  title: string;
  /** `span` marks a stretch of time rather than a moment. */
  items: { when: string; event: string; span?: boolean }[];
  caption?: string;
};

export type Exhibit = BarsExhibit | StatsExhibit | TimelineExhibit;

export type MediaItem = Media | MediaGroup | Placeholder | Exhibit;

/** A titled point: a problem, a lesson. */
export type Point = {
  title: string;
  body: string;
};

export type Rejected = {
  option: string;
  why: string;
};

export type Tradeoff = {
  gaveUp: string;
  toGet: string;
};

export type Evidence = {
  kind: "interview" | "usability-test" | "analytics" | "audit" | "field-study";
  what: string;
  found: string;
};

/** BEAT 1 — Stakes. What was true before, and why it cost something. */
export type Stakes = {
  heading: string;
  body: Para[];
  /** The hard constraint the work had to survive. */
  constraint?: string;
  media?: MediaItem[];
};

/** BEAT 2 — The read. The non-obvious thing you understood. The judgment beat. */
export type Read = {
  heading: string;
  body: Para[];
  /** When the read is several distinct findings, number them. */
  points?: Point[];
  evidence?: Evidence[];
  media?: MediaItem[];
};

/** BEAT 3 — The bet. A decision, stated with the roads not taken. */
export type Bet = {
  heading: string;
  /** The bet in one line, when it can be said in one. Set large, before the prose. */
  pull?: string;
  body: Para[];
  /** At least one. A bet with no rejected alternative was not a decision. */
  rejected: [Rejected, ...Rejected[]];
  media?: MediaItem[];
};

/** BEAT 4 — The work. Shown, not narrated. One chapter per workstream. */
export type WorkChapter = {
  title: string;
  /** One sentence. What this chapter had to accomplish. */
  goal: string;
  body: Para[];
  media?: MediaItem[];
};

/** BEAT 5 — Friction. What fought back. Without this it reads as marketing. */
export type Friction = {
  heading: string;
  body: Para[];
  /** Two sides of one disagreement: what was visible, and what was argued. */
  dispute?: {
    seen: { label: string; items: string[] };
    argued: { label: string; items: string[] };
  };
  /** How it resolved, when the resolution was itself a decision. */
  resolution?: { heading: string; body: Para[] };
  tradeoffs: [Tradeoff, ...Tradeoff[]];
  /** The one line worth carrying out of the study. */
  lesson?: string;
  /** The best friction image is the thing you cut. */
  media?: MediaItem[];
};

/** BEAT 6 — Outcome. Numbers, honestly qualified. */
export type Outcome = {
  heading: string;
  body: Para[];
  metrics: Metric[];
  /** What I'd do differently. */
  hindsight?: Point[];
};

export type CaseStudy = {
  slug: string;
  company: string;
  /** The claim the study proves — NOT the company name. This is the <h1>. */
  title: string;
  /** Two sentences max, shown on the index. What you did and what changed. */
  blurb: string;
  period: string;
  role: string;
  /** How far the work reaches. One line, shown with role and timeline. */
  scope?: string;
  collaborators: string[];
  disciplines: string[];
  /** Hidden from the index while true. */
  draft?: boolean;
  /** Opens the study, full width, beneath the header. */
  hero?: Media | Placeholder;
  /** Shown on the index. Transparent background; sits on the paper. */
  thumb?: Media | Placeholder;
  /** A closing line beneath the study: what was withheld, and why. */
  note?: string;

  stakes: Stakes;
  read: Read;
  bet: Bet;
  work: [WorkChapter, ...WorkChapter[]];
  friction: Friction;
  outcome: Outcome;
};

export const BASIS_LABEL: Record<MetricBasis, string> = {
  realized: "Measured",
  shipped: "Shipped",
  estimated: "Estimate",
  projected: "Projected",
  pilot: "Pilot",
  target: "Target",
};
