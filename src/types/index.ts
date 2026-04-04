export type EpisodeResult = {
  found: boolean;
  title: string;
  season: string;
  episode: string;
  episodeTitle: string;
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

export type SearchResponse = {
  result: EpisodeResult | null;
  tmdb: TmdbData | null;
  fromCache: boolean;
  error?: string;
};
