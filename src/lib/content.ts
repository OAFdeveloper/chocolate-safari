import { promises as fs } from "fs";
import path from "path";
import {
  chocolateSchema,
  siteSettingsSchema,
  type Chocolate,
  type SiteSettings,
} from "./schemas";

const contentRoot = path.join(process.cwd(), "content");

export async function getSiteSettings(): Promise<SiteSettings> {
  const raw = await fs.readFile(
    path.join(contentRoot, "site-settings.json"),
    "utf8"
  );
  return siteSettingsSchema.parse(JSON.parse(raw));
}

export async function getChocolates(): Promise<Chocolate[]> {
  const dir = path.join(contentRoot, "chocolates");
  const files = await fs.readdir(dir);
  const chocolates = await Promise.all(
    files
      .filter((file) => file.endsWith(".json"))
      .map(async (file) => {
        const raw = await fs.readFile(path.join(dir, file), "utf8");
        return chocolateSchema.parse(JSON.parse(raw));
      })
  );

  return chocolates
    .filter((item) => item.status === "published")
    .sort((a, b) => {
      const rankA = a.recentRank ?? Number.MAX_SAFE_INTEGER;
      const rankB = b.recentRank ?? Number.MAX_SAFE_INTEGER;
      if (rankA !== rankB) return rankA - rankB;
      return a.title.localeCompare(b.title);
    });
}

export async function getChocolateBySlug(
  slug: string
): Promise<Chocolate | undefined> {
  const chocolates = await getChocolates();
  return chocolates.find((item) => item.slug === slug);
}

export async function getRecentDiscoveries(limit = 5): Promise<Chocolate[]> {
  const chocolates = await getChocolates();
  return chocolates
    .filter((item) => item.recentRank != null || item.featured)
    .slice(0, limit);
}

export async function getRelatedChocolates(
  chocolate: Chocolate,
  limit = 4
): Promise<Chocolate[]> {
  const chocolates = await getChocolates();
  return chocolates
    .filter((item) => item.slug !== chocolate.slug)
    .map((item) => ({
      item,
      score:
        item.tags.filter((tag) => chocolate.tags.includes(tag)).length +
        (item.originCode === chocolate.originCode ? 1 : 0),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ item }) => item);
}

export type ExploreFilters = {
  q?: string;
  tag?: string;
  country?: string;
  sort?: "recent" | "rating" | "price";
};

export async function exploreChocolates(
  filters: ExploreFilters
): Promise<Chocolate[]> {
  let results = await getChocolates();
  const q = filters.q?.trim().toLowerCase();

  if (q) {
    results = results.filter((item) => {
      const haystack = [
        item.title,
        item.brand,
        item.shortDescription,
        item.originCountry,
        ...item.tags,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }

  if (filters.tag) {
    const tag = filters.tag.toLowerCase();
    results = results.filter((item) =>
      item.tags.some((value) => value.toLowerCase() === tag)
    );
  }

  if (filters.country) {
    const country = filters.country.toLowerCase();
    results = results.filter(
      (item) =>
        item.originCode.toLowerCase() === country ||
        item.originCountry.toLowerCase() === country
    );
  }

  switch (filters.sort) {
    case "rating":
      results = [...results].sort((a, b) => b.rating - a.rating);
      break;
    case "price":
      results = [...results].sort((a, b) => a.price - b.price);
      break;
    case "recent":
    default:
      results = [...results].sort((a, b) => {
        const rankA = a.recentRank ?? Number.MAX_SAFE_INTEGER;
        const rankB = b.recentRank ?? Number.MAX_SAFE_INTEGER;
        return rankA - rankB;
      });
  }

  return results;
}
