"use server";

import { headers } from "next/headers";
import { supabase } from "@/lib/supabase";
import { geminiModel } from "@/lib/gemini";
import { fetchTmdbData } from "@/lib/tmdb";
import { checkRateLimit } from "@/lib/rate-limit";
import type { SearchResult, SearchMode, TmdbData, SearchResponse } from "@/types";

const getClientIp = async (): Promise<string> => {
  const h = await headers();
  const forwarded = h.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return h.get("x-real-ip") || "unknown";
};

const normalizeQuery = (query: string): string => {
  return query.trim().toLowerCase().replace(/\s+/g, " ");
};

const searchCache = async (
  normalizedQuery: string,
  mode: SearchMode
): Promise<{ result: SearchResult; tmdb: TmdbData | null; id: number } | null> => {
  try {
    // 1. Exact match (same query + same mode)
    const { data: exact } = await supabase
      .from("search_cache")
      .select("id, result, tmdb_data")
      .eq("normalized_query", normalizedQuery)
      .eq("search_mode", mode)
      .maybeSingle();

    if (exact?.result) {
      supabase.rpc("increment_hit_count_by_id", { row_id: exact.id }).then(() => {});
      return {
        result: exact.result as SearchResult,
        tmdb: (exact.tmdb_data as TmdbData) || null,
        id: exact.id,
      };
    }

    // 2. Fuzzy match (similar query, same mode, lower threshold for more hits)
    const { data: fuzzy, error } = await supabase.rpc("match_similar_query", {
      search_query: normalizedQuery,
      query_mode: mode,
      match_threshold: 0.35,
      match_count: 1,
    });

    if (error || !fuzzy || fuzzy.length === 0) return null;

    const match = fuzzy[0];
    supabase.rpc("increment_hit_count_by_id", { row_id: match.id }).then(() => {});

    return {
      result: match.result as SearchResult,
      tmdb: (match.tmdb_data as TmdbData) || null,
      id: match.id,
    };
  } catch {
    return null;
  }
};

const saveToCache = async (
  originalQuery: string,
  normalizedQuery: string,
  mode: SearchMode,
  result: SearchResult,
  tmdbData: TmdbData | null
): Promise<number | null> => {
  try {
    const { data } = await supabase
      .from("search_cache")
      .upsert(
        {
          original_query: originalQuery.trim(),
          normalized_query: normalizedQuery,
          search_mode: mode,
          result,
          tmdb_data: tmdbData,
          created_at: new Date().toISOString(),
        },
        { onConflict: "normalized_query,search_mode" }
      )
      .select("id")
      .single();
    return data?.id || null;
  } catch {
    console.error("Failed to save to cache");
    return null;
  }
};

const LANG_NAMES: Record<string, string> = {
  fr: "FRENCH (français)",
  en: "ENGLISH",
  es: "SPANISH (español)",
  pt: "PORTUGUESE (português)",
};

const getLangInstruction = (locale: string): string => {
  const lang = LANG_NAMES[locale] || "ENGLISH";
  return `CRITICAL LANGUAGE RULE: You MUST write ALL text values in ${lang}. This includes the synopsis, explanation, status, and episodeTitle. Do NOT use any other language. The JSON keys stay in English, but every text value must be in ${lang}. Translate proper nouns (movie/series titles) to their official ${lang} version if one exists, otherwise keep the original.`;
};

const buildPrompt = (mode: SearchMode, locale: string): string => {
  const langInstruction = getLangInstruction(locale);

  if (mode === "film") {
    return `You are a cinema expert. The user describes a scene from a MOVIE. You must identify the exact movie.

${langInstruction}

Respond ONLY with a valid JSON object, no markdown, no backticks:
{
  "found": true/false,
  "resultType": "film",
  "title": "Movie name",
  "year": "Release year",
  "seasonNumber": null,
  "episodeNumber": null,
  "episodeTitle": null,
  "totalSeasons": null,
  "status": null,
  "synopsis": "Movie summary (2-3 sentences)",
  "confidence": "high" or "medium" or "low",
  "explanation": "Why this movie matches the description (2-3 sentences)",
  "alternatives": [{"title": "Other possible movie", "reason": "Brief why"}]
}

Search ONLY movies, never TV series. If not found, set "found" to false.
If your confidence is medium or low, include 2-3 alternative movies in "alternatives". If confidence is high, use an empty array [].`;
  }

  if (mode === "series") {
    return `You are a TV series expert. The user is looking for a TV SERIES as a whole (not a specific episode). Describe the work globally.

${langInstruction}

Respond ONLY with a valid JSON object, no markdown, no backticks:
{
  "found": true/false,
  "resultType": "series",
  "title": "Series name",
  "year": "First air year",
  "seasonNumber": null,
  "episodeNumber": null,
  "episodeTitle": null,
  "totalSeasons": total number of seasons (integer),
  "status": "Ongoing" or "Ended" (in the target language),
  "synopsis": "Global overview of the series (2-3 sentences, not a specific episode)",
  "confidence": "high" or "medium" or "low",
  "explanation": "Why this series matches the description (2-3 sentences)",
  "alternatives": [{"title": "Other possible series", "reason": "Brief why"}]
}

NEVER give a season or episode number. Describe the series as a whole. If not found, set "found" to false.
If your confidence is medium or low, include 2-3 alternative series in "alternatives". If confidence is high, use an empty array [].`;
  }

  return `You are a TV and movie expert. The user describes a specific scene. You must identify the EXACT EPISODE.

${langInstruction}

Respond ONLY with a valid JSON object, no markdown, no backticks:
{
  "found": true/false,
  "resultType": "episode",
  "title": "Series name",
  "year": null,
  "seasonNumber": season number (integer, mandatory if found=true),
  "episodeNumber": episode number (integer, mandatory if found=true),
  "episodeTitle": "Episode title",
  "totalSeasons": null,
  "status": null,
  "synopsis": "Summary of this specific episode (2-3 sentences)",
  "confidence": "high" or "medium" or "low",
  "explanation": "Why this episode matches the described scene (2-3 sentences)",
  "alternatives": [{"title": "Other possible episode (Series SxEy)", "reason": "Brief why"}]
}

You MUST provide seasonNumber and episodeNumber if found. If the description is too vague, set "found" to false.
If your confidence is medium or low, include 2-3 alternative episodes in "alternatives". If confidence is high, use an empty array [].`;
};

const callGemini = async (
  query: string,
  mode: SearchMode,
  locale: string
): Promise<SearchResult> => {
  const result = await geminiModel.generateContent([
    { text: buildPrompt(mode, locale) },
    { text: `User query: "${query}"` },
  ]);

  const text = result.response.text();
  const cleaned = text.replace(/```json\n?|\n?```/g, "").trim();

  return JSON.parse(cleaned) as SearchResult;
};

export const searchEpisode = async (
  query: string,
  mode: SearchMode = "episode",
  locale: string = "fr"
): Promise<SearchResponse> => {
  if (!query.trim() || query.trim().length < 10) {
    return {
      result: null,
      tmdb: null,
      fromCache: false,
      error: "Décrivez la scène avec au moins 10 caractères.",
    };
  }

  // Locale is part of the cache key to avoid cross-language pollution
  const normalizedQuery = `${locale}::${normalizeQuery(query)}`;

  try {
    const cached = await searchCache(normalizedQuery, mode);
    if (cached) {
      return {
        result: cached.result,
        tmdb: cached.tmdb,
        fromCache: true,
        cacheId: cached.id,
      };
    }

    // Rate limit only on fresh AI calls (not cache hits)
    const ip = await getClientIp();
    const { allowed } = await checkRateLimit(ip);
    if (!allowed) {
      return {
        result: null,
        tmdb: null,
        fromCache: false,
        rateLimitError: { type: "rateLimit" },
      };
    }

    const result = await callGemini(query.trim(), mode, locale);

    let tmdbData: TmdbData | null = null;
    if (result.found) {
      tmdbData = await fetchTmdbData(
        result.title,
        result.seasonNumber ? `Saison ${result.seasonNumber}` : "N/A",
        result.episodeNumber ? `Épisode ${result.episodeNumber}` : "N/A",
        result.resultType
      );
    }

    const cacheId = await saveToCache(query, normalizedQuery, mode, result, tmdbData);

    return { result, tmdb: tmdbData, fromCache: false, cacheId: cacheId || undefined };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("Search error:", message);

    const isQuota = /429|403|quota|rate.?limit/i.test(message);
    if (isQuota) {
      return {
        result: null,
        tmdb: null,
        fromCache: false,
        quotaError: { type: "quota" },
      };
    }

    return {
      result: null,
      tmdb: null,
      fromCache: false,
      error: "Une erreur est survenue. Réessayez dans un instant.",
    };
  }
};

export const submitFeedback = async (
  cacheId: number,
  query: string,
  vote: 1 | -1
): Promise<{ success: boolean }> => {
  try {
    await supabase.from("result_feedback").insert({
      cache_id: cacheId,
      query: query.trim(),
      vote,
    });
    return { success: true };
  } catch {
    return { success: false };
  }
};
