"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n-context";
import type { SearchMode } from "@/types";

type SearchModeSelectorProps = {
  mode: SearchMode;
  onChange: (mode: SearchMode) => void;
};

const modes: { value: SearchMode; icon: string; labelKey: string }[] = [
  { value: "film", icon: "🎬", labelKey: "mode.film" },
  { value: "series", icon: "📺", labelKey: "mode.series" },
  { value: "episode", icon: "🎯", labelKey: "mode.episode" },
];

const SearchModeSelector = ({ mode, onChange }: SearchModeSelectorProps) => {
  const { t } = useI18n();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
      className="relative flex items-center bg-card border border-stone/60 rounded-xl p-1
                 shadow-[0_1px_8px_rgba(26,25,23,0.03)]"
    >
      {modes.map((m) => {
        const isActive = mode === m.value;
        return (
          <button
            key={m.value}
            onClick={() => onChange(m.value)}
            className="relative z-10 flex items-center gap-1.5 px-5 py-2 rounded-lg text-sm font-medium
                       transition-colors duration-200"
          >
            {isActive && (
              <motion.div
                layoutId="activeMode"
                className="absolute inset-0 bg-ink rounded-lg shadow-sm"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10 text-xs">{m.icon}</span>
            <span
              className={`relative z-10 tracking-wide ${
                isActive ? "text-cream" : "text-ink-muted"
              }`}
            >
              {t(m.labelKey)}
            </span>
          </button>
        );
      })}
    </motion.div>
  );
};

export default SearchModeSelector;
