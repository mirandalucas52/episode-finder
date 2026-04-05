"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/lib/i18n-context";
import { getHistory, clearHistory, type HistoryEntry } from "@/lib/search-history";

type SearchHistoryProps = {
  onSelect: (entry: HistoryEntry) => void;
  refreshKey: number;
};

const SearchHistory = ({ onSelect, refreshKey }: SearchHistoryProps) => {
  const { t } = useI18n();
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    setHistory(getHistory());
  }, [refreshKey]);

  if (history.length === 0) return null;

  const handleClear = () => {
    clearHistory();
    setHistory([]);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="w-full max-w-2xl mx-auto mt-4"
    >
      <div className="flex items-center justify-between mb-2 px-1">
        <p className="text-[10px] text-ink-subtle uppercase tracking-widest">
          {t("history.title")}
        </p>
        <button
          onClick={handleClear}
          className="text-[10px] text-ink-subtle/60 hover:text-ink-muted transition-colors"
        >
          {t("history.clear")}
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        <AnimatePresence>
          {history.map((entry) => (
            <motion.button
              key={entry.timestamp}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => onSelect(entry)}
              className="group flex items-center gap-2 px-3 py-1.5 rounded-lg
                         bg-white border border-stone/60 hover:border-stone-dark
                         transition-all duration-200 max-w-[240px]"
            >
              <svg
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                className="text-ink-subtle shrink-0"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span className="text-xs text-ink-muted group-hover:text-ink truncate">
                {entry.title}
              </span>
            </motion.button>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default SearchHistory;
