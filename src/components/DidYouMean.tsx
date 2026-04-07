"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n-context";
import type { Alternative } from "@/types";

type DidYouMeanProps = {
  alternatives: Alternative[];
  onSelect?: (title: string) => void;
};

const DidYouMean = ({ alternatives, onSelect }: DidYouMeanProps) => {
  const { t } = useI18n();

  if (!alternatives || alternatives.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.45 }}
      className="pt-4 border-t border-stone/40"
    >
      <h3 className="text-xs font-medium text-ink-subtle uppercase tracking-widest mb-3">
        {t("result.didYouMean")}
      </h3>
      <div className="space-y-2">
        {alternatives.slice(0, 3).map((alt, i) => (
          <motion.button
            key={i}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect?.(alt.title)}
            className="w-full flex items-start gap-2 px-3 py-2 rounded-lg bg-cream-dark/50 border border-stone/40
                       hover:border-accent/40 hover:bg-accent/5 transition-colors text-left cursor-pointer group"
          >
            <span className="text-accent text-xs font-medium mt-0.5">{i + 1}.</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-ink font-medium group-hover:text-accent transition-colors">{alt.title}</p>
              <p className="text-xs text-ink-muted leading-relaxed mt-0.5">{alt.reason}</p>
            </div>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="text-ink-subtle/30 group-hover:text-accent group-hover:translate-x-0.5 transition-all mt-1 shrink-0"
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

export default DidYouMean;
