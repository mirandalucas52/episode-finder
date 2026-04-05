"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n-context";
import type { Locale } from "@/lib/i18n";
import type { SearchMode } from "@/types";

type Suggestion = {
  query: string;
  mode: SearchMode;
};

const SUGGESTIONS: Record<Locale, Suggestion[]> = {
  fr: [
    { query: "Un homme mange du chocolat sur un banc et raconte sa vie", mode: "film" },
    { query: "Un chimiste atteint d'un cancer fabrique de la drogue", mode: "series" },
    { query: "Un mariage qui tourne mal dans un château", mode: "episode" },
  ],
  en: [
    { query: "A man eats chocolates on a bench and tells his life story", mode: "film" },
    { query: "A chemistry teacher with cancer makes drugs", mode: "series" },
    { query: "A wedding that turns into a massacre in a castle", mode: "episode" },
  ],
  es: [
    { query: "Un hombre come chocolate en un banco y cuenta su vida", mode: "film" },
    { query: "Un profesor de química con cáncer fabrica drogas", mode: "series" },
    { query: "Una boda que acaba en masacre en un castillo", mode: "episode" },
  ],
  pt: [
    { query: "Um homem come chocolate num banco e conta a sua vida", mode: "film" },
    { query: "Um professor de química com cancro fabrica drogas", mode: "series" },
    { query: "Um casamento que acaba em massacre num castelo", mode: "episode" },
  ],
};

const MODE_LABELS: Record<SearchMode, string> = {
  film: "🎬",
  series: "📺",
  episode: "🎯",
};

type QuickSuggestionsProps = {
  onSelect: (query: string, mode: SearchMode) => void;
};

const QuickSuggestions = ({ onSelect }: QuickSuggestionsProps) => {
  const { locale, t } = useI18n();
  const suggestions = SUGGESTIONS[locale] || SUGGESTIONS.en;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="w-full max-w-2xl mx-auto mt-8"
    >
      <p className="text-center text-[10px] text-ink-subtle uppercase tracking-widest mb-4">
        {t("suggestions.title")}
      </p>

      <div className="flex flex-col gap-2">
        {suggestions.map((s, i) => (
          <motion.button
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + i * 0.05 }}
            whileHover={{ x: 4 }}
            onClick={() => onSelect(s.query, s.mode)}
            className="group flex items-center gap-3 px-4 py-3 rounded-xl
                       bg-card border border-stone/40 hover:border-stone-dark
                       text-left transition-all duration-200"
          >
            <span className="text-sm shrink-0">{MODE_LABELS[s.mode]}</span>
            <span className="text-sm text-ink-muted group-hover:text-ink flex-1">
              {s.query}
            </span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="text-ink-subtle/40 group-hover:text-accent group-hover:translate-x-0.5 transition-all shrink-0"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default QuickSuggestions;
