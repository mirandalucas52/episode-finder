const TMDB_BASE = "https://api.themoviedb.org/3";
const TMDB_IMG = "https://image.tmdb.org/t/p";

type TmdbSearchResult = {
  id: number;
  media_type: string;
  poster_path: string | null;
};

type TmdbWatchProviderEntry = {
  provider_name: string;
  logo_path: string;
};

type TmdbWatchProviders = {
  link?: string;
  flatrate?: TmdbWatchProviderEntry[];
  rent?: TmdbWatchProviderEntry[];
  buy?: TmdbWatchProviderEntry[];
};

type TmdbEpisodeStill = {
  still_path: string | null;
};

const headers = {
  Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
  "Content-Type": "application/json",
};

const searchTitle = async (
  title: string,
  isMovie: boolean
): Promise<TmdbSearchResult | null> => {
  const type = isMovie ? "movie" : "tv";
  const res = await fetch(
    `${TMDB_BASE}/search/${type}?query=${encodeURIComponent(title)}&language=fr-FR`,
    { headers }
  );

  if (!res.ok) return null;

  const data = await res.json();
  const result = data.results?.[0];
  if (!result) return null;

  return {
    id: result.id,
    media_type: type,
    poster_path: result.poster_path,
  };
};

const getEpisodeStill = async (
  tvId: number,
  season: number,
  episode: number
): Promise<string | null> => {
  const res = await fetch(
    `${TMDB_BASE}/tv/${tvId}/season/${season}/episode/${episode}?language=fr-FR`,
    { headers }
  );

  if (!res.ok) return null;

  const data: TmdbEpisodeStill = await res.json();
  return data.still_path
    ? `${TMDB_IMG}/w780${data.still_path}`
    : null;
};

const getWatchProviders = async (
  id: number,
  mediaType: string
): Promise<{ providers: TmdbWatchProviders; link: string } | null> => {
  const res = await fetch(
    `${TMDB_BASE}/${mediaType}/${id}/watch/providers`,
    { headers }
  );

  if (!res.ok) return null;

  const data = await res.json();
  const fr: TmdbWatchProviders | undefined = data.results?.FR;
  const us: TmdbWatchProviders | undefined = data.results?.US;
  const providers = fr || us;

  if (!providers) return null;

  return {
    providers,
    link: providers.link || "",
  };
};

const parseSeasonEpisode = (
  seasonStr: string,
  episodeStr: string
): { season: number; episode: number } | null => {
  const sMatch = seasonStr.match(/\d+/);
  const eMatch = episodeStr.match(/\d+/);
  if (!sMatch || !eMatch) return null;
  return { season: parseInt(sMatch[0]), episode: parseInt(eMatch[0]) };
};

export const fetchTmdbData = async (
  title: string,
  seasonStr: string,
  episodeStr: string
) => {
  try {
    const isMovie = seasonStr === "N/A";
    const searchResult = await searchTitle(title, isMovie);

    if (!searchResult) {
      return { posterUrl: null, stillUrl: null, watchProviders: [] };
    }

    const posterUrl = searchResult.poster_path
      ? `${TMDB_IMG}/w500${searchResult.poster_path}`
      : null;

    let stillUrl: string | null = null;
    if (!isMovie) {
      const parsed = parseSeasonEpisode(seasonStr, episodeStr);
      if (parsed) {
        stillUrl = await getEpisodeStill(
          searchResult.id,
          parsed.season,
          parsed.episode
        );
      }
    }

    const watchData = await getWatchProviders(
      searchResult.id,
      searchResult.media_type
    );

    type ProviderType = "flatrate" | "rent" | "buy";

    const watchProviders = !watchData
      ? []
      : (["flatrate", "rent", "buy"] as ProviderType[]).flatMap((type) => {
          const list = watchData.providers[type];
          if (!list) return [];
          return list.slice(0, 3).map((p) => ({
            name: p.provider_name,
            logoUrl: `${TMDB_IMG}/original${p.logo_path}`,
            type,
            url: watchData.link,
          }));
        });

    return { posterUrl, stillUrl, watchProviders };
  } catch (error) {
    console.error("TMDB error:", error);
    return { posterUrl: null, stillUrl: null, watchProviders: [] };
  }
};
