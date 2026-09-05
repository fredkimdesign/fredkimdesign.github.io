export const metadata = { title: "About" };

const roles = [
  ["2026 —", "Walmart", "Senior UX Designer, Design Systems", "Multi-tenant subsystem across 3+ product pillars"],
  ["2023 – 26", "Sam's Club", "Senior UX Designer", "Message Center, Member's Mark Community, marketing automation"],
  ["2022 – 23", "Twitter", "Senior Product Designer", "Internal developer tooling for 2,000+ engineers"],
  ["2020 – 21", "Tesla", "Senior UX Designer", "Tesla OS internal tools; Account Master"],
  ["2019 – 20", "WANDR Studio", "Product Designer → Lead", "Client engagements, research through prototyping"],
] as const;

export default function About() {
  return (
    <div className="mx-auto w-full max-w-5xl px-8 pt-24 pb-8 sm:pt-32">
      <div className="grid gap-16 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <h1 className="font-display text-4xl leading-[1.08] tracking-tight text-balance sm:text-[3.25rem]">
            Good design disappears.
          </h1>
          <div className="measure mt-10 space-y-6">
            <p className="prose-body">
              You don&rsquo;t notice it — you just feel like things worked out.
              I&rsquo;ve spent my career trying to create that feeling: not through
              the artifact, but through the outcome. The moment something
              frustrating becomes easy, or something generic starts to feel like
              it was made for you.
            </p>
            <p className="prose-body">
              I trained as a mechanical engineer at USC, which is probably why I
              keep ending up on systems problems — design systems, internal
              tooling, the plumbing behind how a business talks to the people
              it serves. The interface is usually the smallest part.
            </p>
            <p className="prose-body">
              Outside work I mentor early-career designers through ADPList and
              lead a youth program in my community.
            </p>
          </div>
          <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 text-sm">
            <a href="mailto:fredkimdesign@gmail.com" className="link">fredkimdesign@gmail.com</a>
            <a href="https://www.linkedin.com/in/fredjameskim/" className="link">LinkedIn</a>
            <a href="https://twitter.com/fredkimdesign" className="link">Twitter</a>
          </div>
        </div>

        <aside className="lg:col-span-5 lg:pt-3">
          <div className="eyebrow mb-6">Experience</div>
          <ol className="border-rule border-t">
            {roles.map(([when, org, title, note]) => (
              <li key={org} className="border-rule grid grid-cols-[5.5rem_1fr] gap-4 border-b py-5">
                <span className="text-xs text-faint tabular-nums pt-0.5">{when}</span>
                <div>
                  <div className="font-display text-lg leading-snug">{org}</div>
                  <div className="mt-0.5 text-sm text-ink">{title}</div>
                  <div className="mt-1 text-sm leading-relaxed text-muted">{note}</div>
                </div>
              </li>
            ))}
          </ol>
          <div className="eyebrow mt-12 mb-6">Education</div>
          <div className="border-rule border-t pt-5">
            <div className="font-display text-lg leading-snug">University of Southern California</div>
            <div className="mt-0.5 text-sm text-ink">B.S. Mechanical Engineering, 2015</div>
          </div>
        </aside>
      </div>
    </div>
  );
}
