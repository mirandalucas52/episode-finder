"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n-context";

type QuotaExceededViewProps = {
  onRetryReady: () => void;
};

const QuotaExceededView = ({ onRetryReady }: QuotaExceededViewProps) => {
  const { t } = useI18n();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="rounded-2xl bg-card border border-stone/60 overflow-hidden shadow-[0_2px_16px_rgba(26,25,23,0.04)]">
        <div className="p-8 md:p-10">
          <div className="text-center">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-amber-50 border border-amber-200/60 mb-4"
            >
              <span className="text-2xl">⏳</span>
            </motion.div>

            <h2 className="font-serif text-2xl md:text-3xl text-ink tracking-tight">
              {t("quota.title")}
            </h2>
            <p className="mt-2 text-ink-muted text-sm leading-relaxed max-w-md mx-auto">
              {t("quota.message")}
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center mt-8"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onRetryReady}
              className="px-8 py-3 bg-ink text-cream text-sm font-medium tracking-wide rounded-xl
                         hover:bg-ink-light transition-colors duration-200"
            >
              {t("quota.retry")}
            </motion.button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default QuotaExceededView;
