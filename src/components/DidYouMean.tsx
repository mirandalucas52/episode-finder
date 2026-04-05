"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n-context";
import type { Alternative } from "@/types";

type DidYouMeanProps = {
  alternatives: Alternative[];
};

const DidYouMean = ({ alternatives }: DidYouMeanProps) => {
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
          <div
            key={i}
            className="flex items-start gap-2 px-3 py-2 rounded-lg bg-cream-dark/50 border border-stone/40"
          >
            <span className="text-accent text-xs font-medium mt-0.5">{i + 1}.</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-ink font-medium">{alt.title}</p>
              <p className="text-xs text-ink-muted leading-relaxed mt-0.5">{alt.reason}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default DidYouMean;
