"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n-context";

const LoadingSkeleton = () => {
  const { t } = useI18n();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="rounded-2xl bg-white border border-stone/60 overflow-hidden shadow-[0_2px_16px_rgba(26,25,23,0.04)] p-8 md:p-10">
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2 flex-1">
              <div className="h-7 w-48 rounded-lg shimmer" />
              <div className="h-4 w-64 rounded-md shimmer" />
            </div>
            <div className="h-6 w-28 rounded-full shimmer" />
          </div>

          <div className="pt-4 space-y-2">
            <div className="h-3 w-16 rounded shimmer" />
            <div className="h-4 w-full rounded-md shimmer" />
            <div className="h-4 w-4/5 rounded-md shimmer" />
          </div>

          <div className="pt-4 border-t border-stone/40 space-y-2">
            <div className="h-3 w-28 rounded shimmer" />
            <div className="h-4 w-full rounded-md shimmer" />
            <div className="h-4 w-3/5 rounded-md shimmer" />
          </div>
        </div>

        <motion.p
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="mt-8 text-center text-xs text-ink-subtle tracking-wide"
        >
          {t("loading.text")}
        </motion.p>
      </div>
    </motion.div>
  );
};

export default LoadingSkeleton;
