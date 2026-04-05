"use server";

import { unstable_cache } from "next/cache";
import { supabase } from "@/lib/supabase";

const fetchTotalSearches = unstable_cache(
  async (): Promise<number> => {
    try {
      const { data } = await supabase
        .from("search_cache")
        .select("hit_count, result")
        .limit(10000);

      if (!data) return 0;

      return data
        .filter((row) => {
          const r = row.result as { found?: boolean } | null;
          return r?.found === true;
        })
        .reduce((sum, row) => sum + (row.hit_count || 0), 0);
    } catch {
      return 0;
    }
  },
  ["total-search-count"],
  { revalidate: 300 } // Cache 5 minutes to avoid hammering Supabase
);

export const getTotalSearches = async (): Promise<number> => {
  return fetchTotalSearches();
};
