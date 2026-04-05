"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useI18n } from "@/lib/i18n-context";
import type { SearchResult, TmdbData } from "@/types";
import { buildResultUrl } from "@/lib/slug";
import SpoilerReveal from "@/components/SpoilerReveal";
import WatchProviders from "@/components/WatchProviders";
import ShareButton from "@/components/ShareButton";
import FeedbackButtons from "@/components/FeedbackButtons";
import DidYouMean from "@/components/DidYouMean";
import TrailerEmbed from "@/components/TrailerEmbed";

type ResultCardProps = {
  result: SearchResult;
  tmdb: TmdbData | null;
  fromCache: boolean;
  query: string;
  cacheId?: number;
};

const EpisodeBadge = ({ season, episode }: { season: number; episode: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: 0.25 }}
    className="inline-flex items-center px-3 py-1.5 rounded-lg bg-accent/10 border border-accent/20"
  >
    <span className="text-sm font-serif font-semibold text-accent tracking-wide">
      S{String(season).padStart(2, "0")}E{String(episode).padStart(2, "0")}
    </span>
  </motion.div>
);

const ResultCard = ({ result, tmdb, fromCache, query, cacheId }: ResultCardProps) => {
  const { t } = useI18n();

  const confidenceLabels = {
    high: { text: t("result.confidenceHigh"), color: "text-emerald-700 bg-emerald-50 border-emerald-200" },
    medium: { text: t("result.confidenceMedium"), color: "text-amber-700 bg-amber-50 border-amber-200" },
    low: { text: t("result.confidenceLow"), color: "text-rose-700 bg-rose-50 border-rose-200" },
  };

  const confidence = confidenceLabels[result.confidence];
  const isEpisode = result.resultType === "episode";
  const isSeries = result.resultType === "series";
  const isFilm = result.resultType === "film";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="rounded-2xl bg-card border border-stone/60 overflow-hidden shadow-[0_2px_16px_rgba(26,25,23,0.04)]">
        {result.found ? (
          <>
            {tmdb?.stillUrl && isEpisode && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15, duration: 0.5 }}
                className="relative w-full aspect-video overflow-hidden"
              >
                <Image
                  src={tmdb.stillUrl}
                  alt={`${result.title} - ${result.episodeTitle}`}
                  fill
                  className="object-cover"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
              </motion.div>
            )}

            <div className="flex gap-6 p-8 md:p-10">
              {tmdb?.posterUrl && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  className="hidden md:block shrink-0"
                >
                  <Image
                    src={tmdb.posterUrl}
                    alt={result.title}
                    width={120}
                    height={180}
                    className="rounded-xl shadow-[0_4px_20px_rgba(26,25,23,0.1)]"
                    unoptimized
                  />
                </motion.div>
              )}

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <motion.h2
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="font-serif text-2xl md:text-3xl text-ink tracking-tight"
                    >
                      {result.title}
                    </motion.h2>

                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="mt-1 text-ink-subtle text-sm tracking-wide"
                    >
                      {isFilm && result.year && `${t("result.film")} · ${result.year}`}
                      {isSeries && result.year && `${t("result.series")} · ${result.year}`}
                      {isEpisode && result.episodeTitle && result.episodeTitle}
                    </motion.p>
                  </div>

                  <motion.span
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className={`shrink-0 px-3 py-1 text-xs font-medium rounded-full border ${confidence.color}`}
                  >
                    {confidence.text}
                  </motion.span>
                </div>

                <div className="mb-5">
                  {isEpisode && result.seasonNumber && result.episodeNumber && (
                    <EpisodeBadge
                      season={result.seasonNumber}
                      episode={result.episodeNumber}
                    />
                  )}
                  {isSeries && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.25 }}
                      className="flex items-center gap-2"
                    >
                      {result.totalSeasons && (
                        <span className="px-2.5 py-1 rounded-md bg-cream-dark border border-stone/40 text-xs text-ink-muted">
                          {result.totalSeasons} {result.totalSeasons > 1 ? t("result.seasonsPlural") : t("result.seasons")}
                        </span>
                      )}
                      {result.status && (
                        <span className={`px-2.5 py-1 rounded-md text-xs border ${
                          result.status.toLowerCase().includes("end") || result.status.toLowerCase().includes("termin") || result.status.toLowerCase().includes("final")
                            ? "bg-stone/20 border-stone/40 text-ink-subtle"
                            : "bg-emerald-50 border-emerald-200 text-emerald-700"
                        }`}>
                          {result.status}
                        </span>
                      )}
                    </motion.div>
                  )}
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.35 }}
                  className="space-y-4"
                >
                  <div>
                    <h3 className="text-xs font-medium text-ink-subtle uppercase tracking-widest mb-2">
                      {isEpisode ? t("result.synopsisEpisode") : isSeries ? t("result.synopsisSeries") : t("result.synopsisFilm")}
                    </h3>
                    <SpoilerReveal>
                      <p className="text-ink-light text-sm leading-relaxed">
                        {result.synopsis}
                      </p>
                    </SpoilerReveal>
                  </div>

                  <div className="pt-4 border-t border-stone/40">
                    <h3 className="text-xs font-medium text-ink-subtle uppercase tracking-widest mb-2">
                      {t("result.whyThis")}
                    </h3>
                    <p className="text-ink-light text-sm leading-relaxed">
                      {result.explanation}
                    </p>
                  </div>
                </motion.div>

                {tmdb?.trailerKey && (
                  <TrailerEmbed youtubeKey={tmdb.trailerKey} title={result.title} />
                )}

                {result.alternatives && result.alternatives.length > 0 && (
                  <DidYouMean alternatives={result.alternatives} />
                )}

                {tmdb && tmdb.watchProviders.length > 0 && (
                  <WatchProviders providers={tmdb.watchProviders} />
                )}

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-6 pt-4 border-t border-stone/40 flex items-center justify-between flex-wrap gap-3"
                >
                  <ShareButton
                    query={query}
                    title={result.title}
                    resultUrl={cacheId ? buildResultUrl(result, cacheId) : undefined}
                  />
                  {cacheId && <FeedbackButtons cacheId={cacheId} query={query} />}
                  {fromCache && (
                    <p className="text-[11px] text-ink-subtle tracking-wide">
                      {t("result.cached")}
                    </p>
                  )}
                </motion.div>
              </div>
            </div>
          </>
        ) : (
          <div className="p-8 md:p-10 text-center">
            <p className="font-serif text-xl text-ink-muted mb-2">
              {result.resultType === "episode"
                ? t("result.notFoundEpisode")
                : result.resultType === "series"
                  ? t("result.notFoundSeries")
                  : t("result.notFoundFilm")}
            </p>
            <p className="text-sm text-ink-subtle leading-relaxed max-w-md mx-auto">
              {result.explanation || t("result.moreDetails")}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ResultCard;
