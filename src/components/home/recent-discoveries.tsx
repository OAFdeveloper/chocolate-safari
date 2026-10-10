import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Chocolate } from "@/lib/schemas";
import { ChocolateCard } from "@/components/chocolates/chocolate-card";

export function RecentDiscoveries({ chocolates }: { chocolates: Chocolate[] }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-end justify-between gap-4">
        <h2 className="section-label">Recent Discoveries</h2>
        <Link
          href="/explore"
          className="inline-flex items-center gap-1 text-sm text-brass transition hover:text-brass-hover"
        >
          View all
          <ArrowRight className="size-3.5" />
        </Link>
      </div>

      <div className="hidden gap-4 xl:grid xl:grid-cols-5">
        {chocolates.map((chocolate) => (
          <ChocolateCard key={chocolate.slug} chocolate={chocolate} />
        ))}
      </div>

      <div className="hidden gap-4 md:grid md:grid-cols-3 xl:hidden">
        {chocolates.slice(0, 3).map((chocolate) => (
          <ChocolateCard key={chocolate.slug} chocolate={chocolate} />
        ))}
      </div>

      <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 md:hidden">
        {chocolates.map((chocolate) => (
          <div
            key={chocolate.slug}
            className="w-[78%] max-w-xs shrink-0 snap-start"
          >
            <ChocolateCard chocolate={chocolate} />
          </div>
        ))}
      </div>
    </section>
  );
}
