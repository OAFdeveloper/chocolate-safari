import Link from "next/link";
import {
  BookOpen,
  Building2,
  Columns2,
  Trophy,
  Users,
} from "lucide-react";
import type { SiteSettings } from "@/lib/schemas";

const icons = {
  trophy: Trophy,
  columns: Columns2,
  book: BookOpen,
  users: Users,
  building: Building2,
} as const;

export function UpcomingFeatures({
  settings,
}: {
  settings: SiteSettings;
}) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-start">
        <div>
          <h2 className="font-display text-3xl tracking-tight text-text-on-dark sm:text-4xl">
            The journey is just beginning…
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-text-muted sm:text-base">
            Rankings, comparisons, guides, and community spaces are on the map.
            For now these are trail markers — the catalogue and Sommelier are
            ready to explore.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {settings.upcomingFeatures.map((feature) => {
            const Icon = icons[feature.icon as keyof typeof icons] ?? Trophy;
            return (
              <Link
                key={feature.slug}
                href={`/coming-soon/${feature.slug}`}
                className="rounded-2xl border border-border bg-bg-elevated/60 p-4 transition hover:border-brass/50"
              >
                <Icon className="mb-3 size-5 text-brass" strokeWidth={1.5} />
                <h3 className="text-sm font-semibold text-text-on-dark">
                  {feature.title}
                </h3>
                <p className="mt-1.5 text-[12px] leading-relaxed text-text-muted">
                  {feature.blurb}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
