import Link from "next/link";

export function ComingSoon({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-3xl flex-col justify-center px-4 py-20 sm:px-6">
      <p className="section-label">Coming soon</p>
      <h1 className="mt-3 font-display text-4xl text-text-on-dark">{title}</h1>
      <p className="mt-4 max-w-xl text-base leading-relaxed text-text-muted">
        {description}
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/explore"
          className="inline-flex h-11 items-center rounded-xl bg-brass px-5 text-sm font-semibold text-bg-base transition hover:bg-brass-hover"
        >
          Explore chocolates
        </Link>
        <Link
          href="/"
          className="inline-flex h-11 items-center rounded-xl border border-brass px-5 text-sm font-semibold text-brass transition hover:bg-brass/10"
        >
          Back home
        </Link>
      </div>
    </main>
  );
}
