import { Fragment, type ReactNode } from "react";

/**
 * Content is written with a plain keyboard; this sets it properly.
 *
 * - straight quotes and apostrophes become curly ones
 * - an em dash is tied to the word before it, so a line never opens with one
 */
export function typesetText(s: string): string {
  return s
    .replace(/(^|[\s([{—–-])"/g, "$1“")
    .replace(/"/g, "”")
    .replace(/(^|[\s([{—–-])'/g, "$1‘")
    .replace(/'/g, "’")
    .replace(/ — /g, " — ");
}

// *emphasis*, then the things that must not break across a line: "72 → 97",
// numeric ranges ("5–10"), three-part compounds ("call-to-action"), and
// short-prefix compounds ("in-app", "4-up").
const INLINE = /\*([^*]+)\*|(\S+ → \S+|\d+–\d+|\b\w+(?:-\w+){2,}\b|\b\w{1,3}-\w+\b)/g;

/** `typesetText`, plus inline emphasis and no-break spans. Returns nodes. */
export function typeset(s: string): ReactNode {
  const text = typesetText(s);
  const out: ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(INLINE)) {
    if (m.index > last) out.push(text.slice(last, m.index));
    out.push(
      m[1] !== undefined ? (
        <em key={m.index}>{m[1]}</em>
      ) : (
        <span key={m.index} className="whitespace-nowrap">
          {m[2]}
        </span>
      ),
    );
    last = m.index + m[0].length;
  }
  if (last === 0) return text;
  if (last < text.length) out.push(text.slice(last));
  return <Fragment>{out}</Fragment>;
}
