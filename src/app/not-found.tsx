import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto w-full max-w-5xl px-8 py-32 sm:py-44">
      <div className="eyebrow mb-6">404</div>
      <h1 className="font-display max-w-2xl text-4xl leading-[1.08] tracking-tight text-balance sm:text-[3.25rem]">
        Nothing here. Which, in fairness, is a kind of design.
      </h1>
      <p className="measure prose-body mt-8 text-muted">
        The page you wanted has moved or never existed.
      </p>
      <Link href="/" className="link mt-10 inline-block text-sm">
        Back to the work
      </Link>
    </div>
  );
}
