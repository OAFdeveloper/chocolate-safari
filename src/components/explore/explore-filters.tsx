"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ExploreFilters({
  tags,
  countries,
}: {
  tags: string[];
  countries: { code: string; name: string }[];
}) {
  const router = useRouter();
  const params = useSearchParams();
  const [pending, startTransition] = useTransition();
  const [q, setQ] = useState(params.get("q") ?? "");

  const activeTag = params.get("tag") ?? "";
  const activeCountry = params.get("country") ?? "";
  const activeSort = params.get("sort") ?? "recent";

  function push(next: Record<string, string | undefined>) {
    const search = new URLSearchParams(params.toString());
    Object.entries(next).forEach(([key, value]) => {
      if (!value) search.delete(key);
      else search.set(key, value);
    });
    startTransition(() => {
      router.push(`/explore?${search.toString()}`);
    });
  }

  function onSearch(event: FormEvent) {
    event.preventDefault();
    push({ q: q.trim() || undefined });
  }

  return (
    <div className="space-y-5">
      <form onSubmit={onSearch} className="flex flex-col gap-3 sm:flex-row">
        <Input
          value={q}
          onChange={(event) => setQ(event.target.value)}
          placeholder="Search title, brand, origin, tags…"
          className="h-11 rounded-xl border-border bg-bg-elevated"
          aria-label="Search chocolates"
        />
        <Button
          type="submit"
          disabled={pending}
          className="h-11 rounded-xl bg-brass px-5 text-bg-base hover:bg-brass-hover"
        >
          Search
        </Button>
      </form>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => push({ tag: undefined })}
          className={cn(
            "rounded-full border px-3 py-1.5 text-xs",
            !activeTag
              ? "border-brass bg-brass text-bg-base"
              : "border-border text-text-muted hover:border-brass hover:text-brass"
          )}
        >
          All tags
        </button>
        {tags.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => push({ tag: activeTag === tag ? undefined : tag })}
            className={cn(
              "rounded-full border px-3 py-1.5 text-xs",
              activeTag === tag
                ? "border-brass bg-brass text-bg-base"
                : "border-border text-text-muted hover:border-brass hover:text-brass"
            )}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <label className="flex items-center gap-2 text-sm text-text-muted">
          Country
          <select
            value={activeCountry}
            onChange={(event) =>
              push({ country: event.target.value || undefined })
            }
            className="h-9 rounded-lg border border-border bg-bg-elevated px-2 text-text-on-dark"
          >
            <option value="">All countries</option>
            {countries.map((country) => (
              <option key={country.code} value={country.code}>
                {country.name}
              </option>
            ))}
          </select>
        </label>

        <label className="flex items-center gap-2 text-sm text-text-muted">
          Sort
          <select
            value={activeSort}
            onChange={(event) => push({ sort: event.target.value })}
            className="h-9 rounded-lg border border-border bg-bg-elevated px-2 text-text-on-dark"
          >
            <option value="recent">Recent</option>
            <option value="rating">Rating</option>
            <option value="price">Price</option>
          </select>
        </label>
      </div>
    </div>
  );
}
