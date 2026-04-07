"use server";

import { headers } from "next/headers";
import { supabase } from "@/lib/supabase";
import { generateContent, getModelStats } from "@/lib/gemini";
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
    // Only serve verified (thumbs-up) results from cache
    // 1. Exact match (same query + same mode + verified)
    const { data: exact } = await supabase
      .from("search_cache")
      .select("id, result, tmdb_data")
      .eq("normalized_query", normalizedQuery)
      .eq("search_mode", mode)
      .eq("verified", true)
      .maybeSingle();

    if (exact?.result) {
      supabase.rpc("increment_hit_count_by_id", { row_id: exact.id }).then(() => {});
      return {
        result: exact.result as SearchResult,
        tmdb: (exact.tmdb_data as TmdbData) || null,
        id: exact.id,
      };
    }

    // 2. Fuzzy match (similar query, same mode, verified only)
    const { data: fuzzy, error } = await supabase.rpc("match_similar_query", {
      search_query: normalizedQuery,
      query_mode: mode,
      match_threshold: 0.35,
      match_count: 1,
    });

    if (error || !fuzzy || fuzzy.length === 0) return null;

    const match = fuzzy[0];

    // Only serve verified fuzzy results
    if (!match.verified) return null;

    // Detect query modification: if the queries share most words but the user
    // added OR removed at least 3 words, they're refining → skip cache
    const cachedWords = new Set((match.normalized_query as string).split(" "));
    const queryWords = normalizedQuery.split(" ");
    const overlap = queryWords.filter((w) => cachedWords.has(w)).length;
    const overlapRatio = cachedWords.size > 0 ? overlap / cachedWords.size : 0;
    const addedWords = queryWords.length - overlap;
    const removedWords = cachedWords.size - overlap;

    if (overlapRatio > 0.5 && (addedWords >= 3 || removedWords >= 3)) return null;

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

const SHARED_RULES = `Rules: JSON only, no markdown/backticks. Prefer low-confidence match over found=false. Always 2-4 alternatives when not high confidence (even if found=false). Cover ALL cinema: mainstream, indie, foreign, anime, Soviet, Bollywood, cult, silent, puppet, stop-motion. Think step by step: 1) identify key details (characters, setting, era, genre), 2) match against your knowledge, 3) verify match fits ALL described details before answering.`;

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

const callAI = async (
  query: string,
  mode: SearchMode,
  locale: string
): Promise<{ result: SearchResult; model: string }> => {
  const corrections = await fetchCorrections(mode);
  const prompt = buildPrompt(mode, locale) + corrections;

  const response = await generateContent(
    [{ text: prompt }, { text: `"${query}"` }]
  );

  const cleaned = response.text.replace(/```json\n?|\n?```/g, "").trim();

  return { result: JSON.parse(cleaned) as SearchResult, model: response.model };
};

export const searchEpisode = async (
  query: string,
  mode: SearchMode = "episode",
  locale: string = "fr"
): Promise<SearchResponse> => {
  const trimmed = query.trim().replace(/\s+/g, " ").slice(0, 600);

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

    let { result, model } = await callAI(trimmed, mode, locale);
    const isDev = process.env.NODE_ENV === "development";

    // Auto-retry with reformulated query if confidence is low
    if (result.found && result.confidence === "low") {
      const retryQuery = `Be more specific. The user described: "${trimmed}". Your first guess was "${result.title}" but with low confidence. Re-analyze and try harder to find the exact match. If "${result.title}" is truly the best match, confirm it with higher confidence.`;
      const retry = await callAI(retryQuery, mode, locale);
      if (retry.result.found && retry.result.confidence !== "low") {
        result = retry.result;
        model = retry.model;
      }
    }

    let tmdbData: TmdbData | null = null;
    if (result.found) {
      tmdbData = await fetchTmdbData(
        result.title,
        result.seasonNumber ? `Saison ${result.seasonNumber}` : "N/A",
        result.episodeNumber ? `Épisode ${result.episodeNumber}` : "N/A",
        result.resultType
      );
    }

    // Don't cache yet — wait for user thumbs up
    return {
      result,
      tmdb: tmdbData,
      fromCache: false,
      aiModel: isDev ? model : undefined,
      pendingCache: {
        query: trimmed,
        normalizedQuery,
        mode,
      },
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("Search error:", message);

    const isQuota = /429|quota exhausted/i.test(message);
    const isRateLimit = /403.*rate.?limit|rate.?limit.*403/i.test(message);
    if (isQuota || isRateLimit) {
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
  vote: 1 | -1,
  query: string,
  searchMode: string,
  wrongTitle?: string,
  correctTitle?: string,
  cacheId?: number,
  pendingData?: {
    normalizedQuery: string;
    result: SearchResult;
    tmdb: TmdbData | null;
  }
): Promise<{ success: boolean; cacheId?: number }> => {
  try {
    if (vote === 1 && pendingData) {
      // Thumbs up → save to cache as verified
      const { data } = await supabase
        .from("search_cache")
        .upsert(
          {
            original_query: query.trim(),
            normalized_query: pendingData.normalizedQuery,
            search_mode: searchMode,
            result: pendingData.result,
            tmdb_data: pendingData.tmdb,
            verified: true,
            created_at: new Date().toISOString(),
          },
          { onConflict: "normalized_query,search_mode" }
        )
        .select("id")
        .single();

      const newCacheId = data?.id || null;

      await supabase.from("result_feedback").insert({
        cache_id: newCacheId,
        query: query.trim(),
        vote,
        search_mode: searchMode,
      });

      return { success: true, cacheId: newCacheId || undefined };
    }

    if (vote === -1) {
      // Delete from cache if it exists
      if (cacheId) {
        await supabase.from("search_cache").delete().eq("id", cacheId);
      }

      await supabase.from("result_feedback").insert({
        cache_id: null,
        query: query.trim(),
        vote,
        wrong_title: wrongTitle || null,
        correct_title: correctTitle || null,
        search_mode: searchMode,
      });
    }

    return { success: true };
  } catch {
    return { success: false };
  }
};

export const getAIModelStats = async () => {
  if (process.env.NODE_ENV !== "development") return null;
  return getModelStats();
};
