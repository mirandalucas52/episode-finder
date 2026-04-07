"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Toaster } from "sonner";
import { useI18n } from "@/lib/i18n-context";
import { addToHistory, type HistoryEntry } from "@/lib/search-history";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import ThemeToggle from "@/components/ThemeToggle";
import SearchModeSelector from "@/components/SearchModeSelector";
import SearchBar from "@/components/SearchBar";
import SearchHistory from "@/components/SearchHistory";
import QuickSuggestions from "@/components/QuickSuggestions";
import HomeSeoContent from "@/components/HomeSeoContent";
import TopNav from "@/components/TopNav";
import SocialProof from "@/components/SocialProof";
import ResultCard from "@/components/ResultCard";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import QuotaExceededView from "@/components/QuotaExceededView";
import DevModelSelector from "@/components/DevModelSelector";
import Footer from "@/components/Footer";
import { searchEpisode } from "@/server/actions";
import type { SearchResult, SearchMode, TmdbData, QuotaError, RateLimitError, PendingCache } from "@/types";

const Home = () => {
  const { t, locale } = useI18n();
  const [mode, setMode] = useState<SearchMode>("film");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<SearchResult | null>(null);
  const [tmdb, setTmdb] = useState<TmdbData | null>(null);
  const [fromCache, setFromCache] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [quotaError, setQuotaError] = useState<QuotaError | null>(null);
  const [rateLimitError, setRateLimitError] = useState<RateLimitError | null>(null);
  const [cacheId, setCacheId] = useState<number | undefined>(undefined);
  const [aiModel, setAiModel] = useState<string | undefined>(undefined);
  const [pendingCache, setPendingCache] = useState<PendingCache | undefined>(undefined);
  const [lastQuery, setLastQuery] = useState("");
  const [searchBarQuery, setSearchBarQuery] = useState<string | undefined>(undefined);
  const [historyKey, setHistoryKey] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  const lastQueryRef = useRef("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hist = localStorage.getItem("search-history");
      if (hist && JSON.parse(hist).length > 0) setHasInteracted(true);
    }
  }, []);

  const MIN_LOADING_MS = 5000;

  const handleSearch = useCallback(
    async (query: string, overrideMode?: SearchMode) => {
      const searchMode = overrideMode || mode;
      if (overrideMode) setMode(overrideMode);

      setHasInteracted(true);
      setIsLoading(true);
      setResult(null);
      setTmdb(null);
      setError(null);
      setQuotaError(null);
      setRateLimitError(null);
      setCacheId(undefined);
      setLastQuery(query);
      lastQueryRef.current = query;

      const startTime = Date.now();
      const response = await searchEpisode(query, searchMode, locale);

      // Wait for loading animation to complete all steps
      const elapsed = Date.now() - startTime;
      if (elapsed < MIN_LOADING_MS) {
        await new Promise((r) => setTimeout(r, MIN_LOADING_MS - elapsed));
      }

      if (response.quotaError) {
        setQuotaError(response.quotaError);
      } else if (response.rateLimitError) {
        setRateLimitError(response.rateLimitError);
      } else if (response.error) {
        setError(response.error);
      } else {
        setResult(response.result);
        setTmdb(response.tmdb);
        setFromCache(response.fromCache);
        setCacheId(response.cacheId);
        setAiModel(response.aiModel);
        setPendingCache(response.pendingCache);

        if (response.result?.found) {
          addToHistory({
            query,
            mode: searchMode,
            title: response.result.title,
          });
          setHistoryKey((k) => k + 1);
        }
      }

      setIsLoading(false);
    },
    [mode, locale]
  );

  const handleRetry = useCallback(() => {
    if (lastQueryRef.current) {
      handleSearch(lastQueryRef.current);
    }
  }, [handleSearch]);

  const handleHistorySelect = useCallback(
    (entry: HistoryEntry) => {
      setSearchBarQuery(entry.query);
      handleSearch(entry.query, entry.mode);
    },
    [handleSearch]
  );

  const handleSuggestionSelect = useCallback(
    (query: string, suggestedMode: SearchMode) => {
      setSearchBarQuery(query);
      handleSearch(query, suggestedMode);
    },
    [handleSearch]
  );

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

      <div className="fixed top-4 left-4 z-50">
        <TopNav />
      </div>

      <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
        <ThemeToggle />
        <LocaleSwitcher />
      </div>

      <main className="flex flex-col items-center w-full flex-1 px-5 md:px-8 min-h-screen">
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
          <SocialProof />
        </motion.header>

        <div className="mb-6">
          <SearchModeSelector mode={mode} onChange={setMode} />
        </div>

        <SearchBar
          onSearch={(q) => handleSearch(q)}
          isLoading={isLoading}
          initialQuery={searchBarQuery}
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-5 md:hidden"
        >
          <Link
            href="/trending"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs text-ink-muted bg-card border border-stone/60 hover:border-stone-dark transition-colors"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
              <polyline points="17 6 23 6 23 12" />
            </svg>
            {t("nav.trending")}
          </Link>
        </motion.div>

        <SearchHistory onSelect={handleHistorySelect} refreshKey={historyKey} />

        {!hasInteracted && !isLoading && !result && (
          <QuickSuggestions onSelect={handleSuggestionSelect} />
        )}

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

            {rateLimitError && !isLoading && (
              <motion.div
                key="rateLimit"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="w-full max-w-2xl mx-auto rounded-2xl bg-card border border-stone/60 p-8 text-center"
              >
                <p className="font-serif text-xl text-ink mb-2">{t("rateLimit.title")}</p>
                <p className="text-sm text-ink-muted">{t("rateLimit.message")}</p>
              </motion.div>
            )}

            {result && !isLoading && (
              <ResultCard
                key="result"
                result={result}
                tmdb={tmdb}
                fromCache={fromCache}
                query={lastQuery}
                cacheId={cacheId}
                aiModel={aiModel}
                pendingCache={pendingCache}
              />
            )}
          </AnimatePresence>
        </div>

        {!result && !isLoading && !error && !quotaError && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            onClick={() => {
              window.scrollTo({
                top: window.innerHeight - 80,
                behavior: "smooth",
              });
            }}
            className="group mt-auto mb-10 flex flex-col items-center gap-2.5 text-ink-subtle hover:text-ink-muted transition-colors"
          >
            <span className="text-[10px] uppercase tracking-[0.25em] font-medium">
              {t("scroll.hint")}
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              className="w-5 h-8 rounded-full border border-current flex items-start justify-center p-1"
            >
              <motion.div
                animate={{ y: [0, 8, 0], opacity: [1, 0, 1] }}
                transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                className="w-0.5 h-1.5 bg-current rounded-full"
              />
            </motion.div>
          </motion.button>
        )}
      </main>

      <HomeSeoContent />

      <Footer />

      {process.env.NODE_ENV === "development" && (
        <DevModelSelector lastModel={aiModel} />
      )}
    </div>
  );
};

export default Home;
