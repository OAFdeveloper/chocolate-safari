"use client";

import { Bookmark } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "chocolate-safari-bookmarks";

function readBookmarks(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function BookmarkButton({
  slug,
  className,
}: {
  slug: string;
  className?: string;
}) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSaved(readBookmarks().includes(slug));
  }, [slug]);

  function toggle(event: React.MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    const next = new Set(readBookmarks());
    if (next.has(slug)) next.delete(slug);
    else next.add(slug);
    const list = Array.from(next);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    setSaved(next.has(slug));
  }

  return (
    <button
      type="button"
      aria-label={saved ? "Remove bookmark" : "Bookmark chocolate"}
      aria-pressed={saved}
      onClick={toggle}
      className={cn(
        "inline-flex size-8 items-center justify-center rounded-full border border-border bg-bg-base/60 text-text-muted backdrop-blur transition hover:border-brass hover:text-brass",
        saved && "border-brass text-brass",
        className
      )}
    >
      <Bookmark className={cn("size-3.5", saved && "fill-current")} />
    </button>
  );
}
