"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Toaster } from "sonner";
import SearchBar from "@/components/SearchBar";
import ResultCard from "@/components/ResultCard";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import Footer from "@/components/Footer";
import { searchEpisode } from "@/server/actions";
import type { EpisodeResult, TmdbData } from "@/types";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<EpisodeResult | null>(null);
  const [tmdb, setTmdb] = useState<TmdbData | null>(null);
  const [fromCache, setFromCache] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastQuery, setLastQuery] = useState("");

  const handleSearch = useCallback(async (query: string) => {
    setIsLoading(true);
    setResult(null);
    setTmdb(null);
    setError(null);
    setLastQuery(query);

    const response = await searchEpisode(query);

    if (response.error) {
      setError(response.error);
    } else {
      setResult(response.result);
      setTmdb(response.tmdb);
      setFromCache(response.fromCache);
    }

    setIsLoading(false);
  }, []);

  return (
    <div className="flex flex-col flex-1 items-center">
      <Toaster position="bottom-center" />

      <main className="flex flex-col items-center w-full flex-1 px-5 md:px-8">
        <motion.header
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-2xl pt-20 md:pt-32 pb-12 md:pb-16 text-center"
        >
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-ink tracking-tight leading-[1.1]">
            Retrouve mon
            <br />
            <span className="text-accent">épisode</span>
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mt-5 text-ink-muted text-base md:text-lg font-light tracking-wide max-w-md mx-auto"
          >
            Décrivez une scène de mémoire. L&apos;IA retrouve l&apos;épisode
            exact pour vous.
          </motion.p>
        </motion.header>

        <SearchBar onSearch={handleSearch} isLoading={isLoading} />

        <div className="w-full mt-10 mb-16">
          <AnimatePresence mode="wait">
            {error && (
              <motion.p
                key="error"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-center text-sm text-rose-600/80"
              >
                {error}
              </motion.p>
            )}

            {isLoading && <LoadingSkeleton key="loading" />}

            {result && !isLoading && (
              <ResultCard
                key="result"
                result={result}
                tmdb={tmdb}
                fromCache={fromCache}
                query={lastQuery}
              />
            )}
          </AnimatePresence>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
