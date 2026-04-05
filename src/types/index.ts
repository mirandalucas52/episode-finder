export type SearchMode = "film" | "series" | "episode";

export type Alternative = {
  title: string;
  reason: string;
};

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
  alternatives?: Alternative[];
};

export type TmdbData = {
  posterUrl: string | null;
  stillUrl: string | null;
  trailerKey: string | null;
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

export type RateLimitError = {
  type: "rateLimit";
};

export type SearchResponse = {
  result: SearchResult | null;
  tmdb: TmdbData | null;
  fromCache: boolean;
  cacheId?: number;
  error?: string;
  quotaError?: QuotaError;
  rateLimitError?: RateLimitError;
};
