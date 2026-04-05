export type SearchMode = "film" | "series" | "episode";

export type SearchResult = {
  found: boolean;
  resultType: SearchMode;
  title: string;
  year: string | null;
  seasonNumber: number | null;
  episodeNumber: number | null;
  episodeTitle: string | null;
  totalSeasons: number | null;
  status: string | null;
  synopsis: string;
  confidence: "high" | "medium" | "low";
  explanation: string;
};

export type TmdbData = {
  posterUrl: string | null;
  stillUrl: string | null;
  watchProviders: WatchProvider[];
};

export type WatchProvider = {
  name: string;
  logoUrl: string;
  type: "flatrate" | "rent" | "buy";
  url: string;
};

export type QuotaError = {
  type: "quota";
};

export type SearchResponse = {
  result: SearchResult | null;
  tmdb: TmdbData | null;
  fromCache: boolean;
  error?: string;
  quotaError?: QuotaError;
};
