"use client";

import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Toaster } from "sonner";
import { useI18n } from "@/lib/i18n-context";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import SearchModeSelector from "@/components/SearchModeSelector";
import SearchBar from "@/components/SearchBar";
import ResultCard from "@/components/ResultCard";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import QuotaExceededView from "@/components/QuotaExceededView";
import Footer from "@/components/Footer";
import { searchEpisode } from "@/server/actions";
import type { SearchResult, SearchMode, TmdbData, QuotaError } from "@/types";

const Home = () => {
  const { t } = useI18n();
  const [mode, setMode] = useState<SearchMode>("film");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<SearchResult | null>(null);
  const [tmdb, setTmdb] = useState<TmdbData | null>(null);
  const [fromCache, setFromCache] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [quotaError, setQuotaError] = useState<QuotaError | null>(null);
  const [lastQuery, setLastQuery] = useState("");
  const lastQueryRef = useRef("");
  const lastModeRef = useRef<SearchMode>("film");

  const handleSearch = useCallback(
    async (query: string) => {
      setIsLoading(true);
      setResult(null);
      setTmdb(null);
      setError(null);
      setQuotaError(null);
      setLastQuery(query);
      lastQueryRef.current = query;
      lastModeRef.current = mode;

      const response = await searchEpisode(query, mode);

      if (response.quotaError) {
        setQuotaError(response.quotaError);
      } else if (response.error) {
        setError(response.error);
      } else {
        setResult(response.result);
        setTmdb(response.tmdb);
        setFromCache(response.fromCache);
      }

      setIsLoading(false);
    },
    [mode]
  );

  const handleRetry = useCallback(() => {
    if (lastQueryRef.current) {
      handleSearch(lastQueryRef.current);
    }
  }, [handleSearch]);

  const isDebug = process.env.NEXT_PUBLIC_DEBUG_MODE === "true";

  const simulateQuota = () => {
    setResult(null);
    setTmdb(null);
    setError(null);
    setQuotaError({ type: "quota" });
  };

  return (
    <div className="flex flex-col flex-1 items-center">
      <Toaster position="bottom-center" />

      {isDebug && (
        <button
          onClick={simulateQuota}
          className="fixed bottom-4 right-4 z-50 px-3 py-1.5 text-[10px] text-ink-subtle/50
                     bg-cream-dark/80 border border-stone/40 rounded-lg
                     hover:text-ink-muted hover:border-stone-dark transition-colors"
        >
          Debug: Quota Exceeded
        </button>
      )}

      {/* Language switcher */}
      <div className="fixed top-4 right-4 z-50">
        <LocaleSwitcher />
      </div>

      <main className="flex flex-col items-center w-full flex-1 px-5 md:px-8">
        <motion.header
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-2xl pt-20 md:pt-32 pb-8 md:pb-10 text-center"
        >
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-ink tracking-tight leading-[1.1]">
            {t("site.heading1")}
            <br />
            <span className="text-accent">{t("site.heading2")}</span>
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mt-5 text-ink-muted text-base md:text-lg font-light tracking-wide max-w-md mx-auto"
          >
            {t("site.subtitle")}
          </motion.p>
        </motion.header>

        <div className="mb-6">
          <SearchModeSelector mode={mode} onChange={setMode} />
        </div>

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

            {quotaError && !isLoading && (
              <QuotaExceededView
                key="quota"
                onRetryReady={handleRetry}
              />
            )}

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
