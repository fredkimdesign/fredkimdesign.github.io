export const metadata = { title: "About" };

export default function About() {
  return (
    <div className="mx-auto w-full max-w-5xl px-8 py-24">
      <h1 className="font-display max-w-2xl text-4xl leading-tight tracking-tight text-balance">
        About Fred
      </h1>
      <div className="measure mt-10 space-y-5">
        <p className="prose-body">
          I&rsquo;ve always believed good design disappears. You don&rsquo;t
          notice it — you just feel like things worked out. I&rsquo;ve spent my
          career trying to create that feeling.
        </p>
        <p className="prose-body">
          Not through the artifact, but through the outcome. The moment
          something frustrating becomes easy, or something generic starts to
          feel like it was made for you. That&rsquo;s what I aim for.
        </p>
      </div>
    </div>
  );
}
