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

    // 2. Fuzzy match (similar query, same mode)
    const { data: fuzzy, error } = await supabase.rpc("match_similar_query", {
      search_query: normalizedQuery,
      query_mode: mode,
      match_threshold: 0.35,
      match_count: 1,
    });

    if (error || !fuzzy || fuzzy.length === 0) return null;

    const match = fuzzy[0];
    const cachedLen = (match.normalized_query as string).length;
    const queryLen = normalizedQuery.length;

    // If user's query is 30%+ longer than cached → they're refining, skip cache
    if (queryLen > cachedLen * 1.3) return null;

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
  return `LANG:${lang}. All text values in ${lang}. Keep titles in ORIGINAL form (never translate/invent titles).`;
};

const SHARED_RULES = `Rules: JSON only, no markdown. Be generous: prefer low-confidence match over found=false. Always 2-4 alternatives when not high confidence (even if found=false). Cover all cinema: mainstream, indie, foreign, anime, Soviet, Bollywood, cult, silent, puppet, stop-motion.`;

const buildPrompt = (mode: SearchMode, locale: string): string => {
  const lang = getLangInstruction(locale);

  if (mode === "film") {
    return `Cinema expert. Identify the MOVIE. ${lang}
${SHARED_RULES} Movies only, never TV.
JSON:{found,resultType:"film",title,year,seasonNumber:null,episodeNumber:null,episodeTitle:null,totalSeasons:null,status:null,synopsis(2-3 sentences),confidence:"high"|"medium"|"low",explanation(2-3 sentences),alternatives:[{title,reason}]}`;
  }

  if (mode === "series") {
    return `TV expert. Identify the SERIES (not episode). ${lang}
${SHARED_RULES} No season/episode numbers. Include totalSeasons(int) and status(Ongoing/Ended in target lang).
JSON:{found,resultType:"series",title,year,seasonNumber:null,episodeNumber:null,episodeTitle:null,totalSeasons,status,synopsis(2-3 sentences),confidence:"high"|"medium"|"low",explanation(2-3 sentences),alternatives:[{title,reason}]}`;
  }

  return `TV/movie expert. Identify the EXACT EPISODE. ${lang}
${SHARED_RULES} seasonNumber+episodeNumber mandatory if found=true. If too vague, found=false but still fill alternatives with SxEy format.
JSON:{found,resultType:"episode",title,year:null,seasonNumber,episodeNumber,episodeTitle,totalSeasons:null,status:null,synopsis(2-3 sentences),confidence:"high"|"medium"|"low",explanation(2-3 sentences),alternatives:[{title,reason}]}`;
};

const fetchCorrections = async (mode: SearchMode): Promise<string> => {
  try {
    const { data } = await supabase
      .from("result_feedback")
      .select("query, wrong_title, correct_title")
      .eq("vote", -1)
      .eq("search_mode", mode)
      .not("wrong_title", "is", null)
      .order("created_at", { ascending: false })
      .limit(10);

    if (!data || data.length === 0) return "";

    const lines = data.map((r) => {
      if (r.correct_title) {
        return `- "${r.query}" → NOT "${r.wrong_title}", correct: "${r.correct_title}"`;
      }
      return `- "${r.query}" → NOT "${r.wrong_title}" (confirmed wrong by user)`;
    });

    return `\nCommunity corrections (avoid these mistakes):\n${lines.join("\n")}`;
  } catch {
    return "";
  }
};

const callGemini = async (
  query: string,
  mode: SearchMode,
  locale: string
): Promise<SearchResult> => {
  const corrections = await fetchCorrections(mode);
  const prompt = buildPrompt(mode, locale) + corrections;

  const result = await geminiModel.generateContent([
    { text: prompt },
    { text: `"${query}"` },
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
  const trimmed = query.trim().replace(/\s+/g, " ").slice(0, 300);

  if (!trimmed || trimmed.length < 10) {
    return {
      result: null,
      tmdb: null,
      fromCache: false,
      error: "Décrivez la scène avec au moins 10 caractères.",
    };
  }

  // Locale is part of the cache key to avoid cross-language pollution
  const normalizedQuery = `${locale}::${normalizeQuery(trimmed)}`;

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

    const result = await callGemini(trimmed, mode, locale);

    let tmdbData: TmdbData | null = null;
    if (result.found) {
      tmdbData = await fetchTmdbData(
        result.title,
        result.seasonNumber ? `Saison ${result.seasonNumber}` : "N/A",
        result.episodeNumber ? `Épisode ${result.episodeNumber}` : "N/A",
        result.resultType
      );
    }

    const cacheId = await saveToCache(trimmed, normalizedQuery, mode, result, tmdbData);

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
  vote: 1 | -1,
  wrongTitle?: string,
  correctTitle?: string,
  searchMode?: string
): Promise<{ success: boolean }> => {
  try {
    await supabase.from("result_feedback").insert({
      cache_id: cacheId,
      query: query.trim(),
      vote,
      wrong_title: wrongTitle || null,
      correct_title: correctTitle || null,
      search_mode: searchMode || null,
    });

    // On thumbs down: delete the bad cache entry so next search gets a fresh result
    if (vote === -1) {
      await supabase.from("search_cache").delete().eq("id", cacheId);
    }

    return { success: true };
  } catch {
    return { success: false };
  }
};
