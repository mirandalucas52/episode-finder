"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { EpisodeResult, TmdbData } from "@/types";
import SpoilerReveal from "@/components/SpoilerReveal";
import WatchProviders from "@/components/WatchProviders";
import ShareButton from "@/components/ShareButton";

type ResultCardProps = {
  result: EpisodeResult;
  tmdb: TmdbData | null;
  fromCache: boolean;
  query: string;
};

const confidenceLabels = {
  high: { text: "Confiance élevée", color: "text-emerald-700 bg-emerald-50 border-emerald-200" },
  medium: { text: "Confiance moyenne", color: "text-amber-700 bg-amber-50 border-amber-200" },
  low: { text: "Confiance faible", color: "text-rose-700 bg-rose-50 border-rose-200" },
};

const ResultCard = ({ result, tmdb, fromCache, query }: ResultCardProps) => {
  const confidence = confidenceLabels[result.confidence];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="rounded-2xl bg-white border border-stone/60 overflow-hidden shadow-[0_2px_16px_rgba(26,25,23,0.04)]">
        {result.found ? (
          <>
            {/* Episode still image */}
            {tmdb?.stillUrl && (
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
              {/* Poster */}
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
                {/* Header */}
                <div className="flex items-start justify-between gap-4 mb-6">
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
                      className="mt-1.5 text-ink-muted text-sm tracking-wide"
                    >
                      {result.season !== "N/A" && `${result.season} · `}
                      {result.episode !== "N/A" && `${result.episode} · `}
                      {result.episodeTitle !== "N/A" && result.episodeTitle}
                      {result.season === "N/A" && "Film"}
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

                {/* Synopsis with spoiler protection */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.35 }}
                  className="space-y-4"
                >
                  <div>
                    <h3 className="text-xs font-medium text-ink-subtle uppercase tracking-widest mb-2">
                      Synopsis
                    </h3>
                    <SpoilerReveal>
                      <p className="text-ink-light text-sm leading-relaxed">
                        {result.synopsis}
                      </p>
                    </SpoilerReveal>
                  </div>

                  <div className="pt-4 border-t border-stone/40">
                    <h3 className="text-xs font-medium text-ink-subtle uppercase tracking-widest mb-2">
                      Pourquoi ce résultat
                    </h3>
                    <p className="text-ink-light text-sm leading-relaxed">
                      {result.explanation}
                    </p>
                  </div>
                </motion.div>

                {/* Watch providers */}
                {tmdb && tmdb.watchProviders.length > 0 && (
                  <WatchProviders providers={tmdb.watchProviders} />
                )}

                {/* Footer: share + cache info */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-6 pt-4 border-t border-stone/40 flex items-center justify-between"
                >
                  <ShareButton query={query} title={result.title} />
                  {fromCache && (
                    <p className="text-[11px] text-ink-subtle tracking-wide">
                      Résultat en cache — réponse instantanée
                    </p>
                  )}
                </motion.div>
              </div>
            </div>
          </>
        ) : (
          <div className="p-8 md:p-10 text-center">
            <p className="font-serif text-xl text-ink-muted mb-2">
              Scène non identifiée
            </p>
            <p className="text-sm text-ink-subtle leading-relaxed max-w-md mx-auto">
              {result.explanation ||
                "Essayez d'ajouter plus de détails : noms de personnages, lieu, dialogues..."}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ResultCard;
