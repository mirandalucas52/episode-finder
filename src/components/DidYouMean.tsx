"use client";

import { useState } from "react";
import { motion, AnimatePresence, type PanInfo } from "framer-motion";
import { useI18n } from "@/lib/i18n-context";
import type { Alternative } from "@/types";

type DidYouMeanProps = {
  alternatives: Alternative[];
  onSelect?: (title: string) => void;
};

const DidYouMean = ({ alternatives, onSelect }: DidYouMeanProps) => {
  const { t } = useI18n();
  const [mobileIndex, setMobileIndex] = useState(0);

  if (!alternatives || alternatives.length === 0) return null;

  const items = alternatives.slice(0, 4);

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x < -50 && mobileIndex < items.length - 1) {
      setMobileIndex((i) => i + 1);
    } else if (info.offset.x > 50 && mobileIndex > 0) {
      setMobileIndex((i) => i - 1);
    }
  };

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

      {/* Desktop: list */}
      <div className="hidden sm:block space-y-2">
        {items.map((alt, i) => (
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
              width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2" strokeLinecap="round"
              className="text-ink-subtle/30 group-hover:text-accent group-hover:translate-x-0.5 transition-all mt-1 shrink-0"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </motion.button>
        ))}
      </div>

      {/* Mobile: swipeable cards */}
      <div className="sm:hidden relative overflow-hidden">
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={handleDragEnd}
          className="touch-pan-y"
        >
          <AnimatePresence mode="wait">
            <motion.button
              key={mobileIndex}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.2 }}
              onClick={() => onSelect?.(items[mobileIndex].title)}
              className="w-full flex items-start gap-2 px-3 py-3 rounded-lg bg-cream-dark/50 border border-stone/40
                         active:border-accent/40 active:bg-accent/5 transition-colors text-left"
            >
              <span className="text-accent text-xs font-medium mt-0.5">{mobileIndex + 1}.</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-ink font-medium">{items[mobileIndex].title}</p>
                <p className="text-xs text-ink-muted leading-relaxed mt-0.5">{items[mobileIndex].reason}</p>
              </div>
              <svg
                width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round"
                className="text-ink-subtle/30 mt-1 shrink-0"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </motion.button>
          </AnimatePresence>
        </motion.div>

        {/* Dots indicator */}
        {items.length > 1 && (
          <div className="flex justify-center gap-1.5 mt-3">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => setMobileIndex(i)}
                className={`w-1.5 h-1.5 rounded-full transition-colors ${
                  i === mobileIndex ? "bg-accent" : "bg-stone/40"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default DidYouMean;
