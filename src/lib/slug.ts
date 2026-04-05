import type { SearchResult } from "@/types";

export const slugify = (str: string): string => {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 60);
};

export const buildResultSlug = (result: SearchResult, id: number): string => {
  let base = slugify(result.title);

  if (result.resultType === "episode" && result.seasonNumber && result.episodeNumber) {
    base += `-s${String(result.seasonNumber).padStart(2, "0")}e${String(result.episodeNumber).padStart(2, "0")}`;
  } else if (result.resultType === "film" && result.year) {
    base += `-${result.year}`;
  }

  return `${base}-${id}`;
};

export const parseIdFromSlug = (slugId: string): number | null => {
  const match = slugId.match(/-(\d+)$/);
  if (!match) return null;
  const id = parseInt(match[1], 10);
  return isNaN(id) ? null : id;
};

export const buildResultUrl = (result: SearchResult, id: number): string => {
  return `/r/${buildResultSlug(result, id)}`;
};
