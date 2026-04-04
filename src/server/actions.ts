"use server";

import { supabase } from "@/lib/supabase";
import { geminiModel } from "@/lib/gemini";
import { generateEmbedding } from "@/lib/embeddings";
import { fetchTmdbData } from "@/lib/tmdb";
import type { EpisodeResult, TmdbData, SearchResponse } from "@/types";

const normalizeQuery = (query: string): string => {
  return query.trim().toLowerCase().replace(/\s+/g, " ");
};

const searchSemanticCache = async (
  embedding: number[]
): Promise<{ result: EpisodeResult; tmdb: TmdbData | null; id: number } | null> => {
  try {
    const { data, error } = await supabase.rpc("match_search_cache", {
      query_embedding: JSON.stringify(embedding),
      match_threshold: 0.9,
      match_count: 1,
    });

    if (error || !data || data.length === 0) return null;

    const match = data[0];

    supabase
      .rpc("increment_hit_count_by_id", { row_id: match.id })
      .then(() => {});

    return {
      result: match.result as EpisodeResult,
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
  embedding: number[],
  result: EpisodeResult,
  tmdbData: TmdbData | null
): Promise<void> => {
  try {
    await supabase.from("search_cache").insert({
      original_query: originalQuery.trim(),
      normalized_query: normalizedQuery,
      embedding: JSON.stringify(embedding),
      result,
      tmdb_data: tmdbData,
      created_at: new Date().toISOString(),
    });
  } catch {
    console.error("Failed to save to cache");
  }
};

const SYSTEM_PROMPT = `Tu es un expert en séries TV et films. L'utilisateur va décrire une scène qu'il a vue. Tu dois identifier précisément de quel épisode de série ou de quel film il s'agit.

Réponds UNIQUEMENT avec un objet JSON valide, sans markdown, sans backticks, avec cette structure exacte :
{
  "found": true/false,
  "title": "Nom de la série ou du film",
  "season": "Saison X" ou "N/A" si c'est un film,
  "episode": "Épisode X" ou "N/A" si c'est un film,
  "episodeTitle": "Titre de l'épisode" ou "N/A",
  "synopsis": "Bref résumé de l'épisode/film (2-3 phrases)",
  "confidence": "high" ou "medium" ou "low",
  "explanation": "Explication de pourquoi cette scène correspond (2-3 phrases)"
}

Si tu ne trouves pas, mets "found" à false et explique dans "explanation" pourquoi tu n'as pas pu identifier la scène. Remplis les autres champs avec "Non identifié".`;

const callGemini = async (query: string): Promise<EpisodeResult> => {
  const result = await geminiModel.generateContent([
    { text: SYSTEM_PROMPT },
    { text: `Scène décrite par l'utilisateur : "${query}"` },
  ]);

  const text = result.response.text();
  const cleaned = text.replace(/```json\n?|\n?```/g, "").trim();

  return JSON.parse(cleaned) as EpisodeResult;
};

export const searchEpisode = async (query: string): Promise<SearchResponse> => {
  if (!query.trim() || query.trim().length < 10) {
    return {
      result: null,
      tmdb: null,
      fromCache: false,
      error: "Décrivez la scène avec au moins 10 caractères.",
    };
  }

  const normalizedQuery = normalizeQuery(query);

  try {
    const embedding = await generateEmbedding(normalizedQuery);

    const cached = await searchSemanticCache(embedding);
    if (cached) {
      return {
        result: cached.result,
        tmdb: cached.tmdb,
        fromCache: true,
      };
    }

    const result = await callGemini(query.trim());

    let tmdbData: TmdbData | null = null;
    if (result.found) {
      tmdbData = await fetchTmdbData(
        result.title,
        result.season,
        result.episode
      );
    }

    await saveToCache(query, normalizedQuery, embedding, result, tmdbData);

    return { result, tmdb: tmdbData, fromCache: false };
  } catch (error) {
    console.error("Search error:", error);
    return {
      result: null,
      tmdb: null,
      fromCache: false,
      error: "Une erreur est survenue. Réessayez dans un instant.",
    };
  }
};
