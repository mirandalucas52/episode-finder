import type { SearchMode } from "@/types";

export type HistoryEntry = {
  query: string;
  mode: SearchMode;
  title: string;
  timestamp: number;
};

const KEY = "search-history";
const MAX_ENTRIES = 5;

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
