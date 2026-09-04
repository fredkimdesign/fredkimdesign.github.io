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
  /** For video: show controls and play with sound on click, instead of a silent loop. Use for interviews. */
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
 * Several related images shown together instead of stacked. `row` is a
 * side-by-side grid (2–3 across); `carousel` is a slideshow — one image at a
 * time, arrows and dots — for iterations, screens, or anything with more than
 * two items. Videos never go in a carousel; they are spotlighted on their own.
 */
export type MediaGroup = {
  layout: "row" | "carousel";
  items: Media[];
  caption?: string;
  /** Give the group its own room. Rows of videos are spotlighted automatically. */
  spotlight?: boolean;
};

export type MediaItem = Media | MediaGroup;

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
  evidence?: Evidence[];
  media?: MediaItem[];
};

/** BEAT 3 — The bet. A decision, stated with the roads not taken. */
export type Bet = {
  heading: string;
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
  tradeoffs: [Tradeoff, ...Tradeoff[]];
  /** The best friction image is the thing you cut. */
  media?: MediaItem[];
};

/** BEAT 6 — Outcome. Numbers, honestly qualified. */
export type Outcome = {
  heading: string;
  body: Para[];
  metrics: Metric[];
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
  collaborators: string[];
  disciplines: string[];
  /** Hidden from the index while true. */
  draft?: boolean;
  hero?: Media;
  /** Shown on the index. Transparent background; sits on the paper. */
  thumb?: Media;

  stakes: Stakes;
  read: Read;
  bet: Bet;
  work: [WorkChapter, ...WorkChapter[]];
  friction: Friction;
  outcome: Outcome;
};

export const BASIS_LABEL: Record<MetricBasis, string> = {
  realized: "Measured",
  projected: "Projected",
  pilot: "Pilot",
  target: "Target",
};
