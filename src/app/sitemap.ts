import type { MetadataRoute } from "next";
import { supabase } from "@/lib/supabase";
import { buildResultSlug } from "@/lib/slug";
import type { SearchResult } from "@/types";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://episode-finder.vercel.app";

type CacheRow = {
  id: number;
  result: SearchResult;
  created_at: string;
};

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const staticEntries: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
  ];

  try {
    const { data } = await supabase
      .from("search_cache")
      .select("id, result, created_at")
      .order("hit_count", { ascending: false })
      .limit(5000);

    if (!data) return staticEntries;

    const resultEntries: MetadataRoute.Sitemap = (data as CacheRow[])
      .filter((row) => row.result?.found)
      .map((row) => ({
        url: `${SITE_URL}/r/${buildResultSlug(row.result, row.id)}`,
        lastModified: new Date(row.created_at),
        changeFrequency: "weekly" as const,
        priority: 0.7,
      }));

    return [...staticEntries, ...resultEntries];
  } catch {
    return staticEntries;
  }
};

export default sitemap;
