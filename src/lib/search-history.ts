import type { SearchMode } from "@/types";

import type { SearchResult, TmdbData } from "@/types";

export type HistoryEntry = {
  query: string;
  mode: SearchMode;
  title: string;
  posterUrl?: string | null;
  result?: SearchResult;
  tmdb?: TmdbData | null;
  timestamp: number;
};

const KEY = "search-history";
const STATS_KEY = "search-stats";
const MAX_ENTRIES = 20;

export const getHistory = (): HistoryEntry[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const addToHistory = (entry: Omit<HistoryEntry, "timestamp">) => {
  if (typeof window === "undefined") return;
  try {
    const current = getHistory();
    const filtered = current.filter(
      (e) => e.query.toLowerCase() !== entry.query.toLowerCase()
    );
    const updated = [
      { ...entry, timestamp: Date.now() },
      ...filtered,
    ].slice(0, MAX_ENTRIES);
    localStorage.setItem(KEY, JSON.stringify(updated));
  } catch {}
};

export const clearHistory = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEY);
};

export type UserStats = {
  totalSearches: number;
  films: number;
  series: number;
  episodes: number;
};

export const getUserStats = (): UserStats => {
  if (typeof window === "undefined") return { totalSearches: 0, films: 0, series: 0, episodes: 0 };
  try {
    const raw = localStorage.getItem(STATS_KEY);
    return raw ? JSON.parse(raw) : { totalSearches: 0, films: 0, series: 0, episodes: 0 };
  } catch {
    return { totalSearches: 0, films: 0, series: 0, episodes: 0 };
  }
};

export const incrementStats = (mode: SearchMode) => {
  if (typeof window === "undefined") return;
  try {
    const stats = getUserStats();
    stats.totalSearches++;
    if (mode === "film") stats.films++;
    else if (mode === "series") stats.series++;
    else stats.episodes++;
    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
  } catch {}
};
