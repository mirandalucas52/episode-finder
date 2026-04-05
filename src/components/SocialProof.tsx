"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n-context";
import { getTotalSearches } from "@/server/stats";

const SocialProof = () => {
  const { t, locale } = useI18n();
  const [count, setCount] = useState<number | null>(null);
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    getTotalSearches().then((n) => setCount(n));
  }, []);

  // Count-up animation from 0 to count
  useEffect(() => {
    if (count === null || count === 0) return;

    const duration = 1500;
    const start = performance.now();
    let rafId: number;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayed(Math.round(eased * count));
      if (progress < 1) rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [count]);

  // Hide until we have data; also hide if count is too small (< 10) to avoid awkward "3 scenes identified"
  if (count === null || count < 10) return null;

  const localeMap: Record<string, string> = {
    fr: "fr-FR",
    en: "en-US",
    es: "es-ES",
    pt: "pt-PT",
  };
  const formatted = displayed.toLocaleString(localeMap[locale] || "en-US");

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
      className="flex items-center justify-center gap-2 mt-6"
    >
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-60 animate-ping" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
      </span>
      <p className="text-xs text-ink-subtle tracking-wide tabular-nums">
        <span className="font-medium text-ink-muted">{formatted}</span>{" "}
        {t("social.count")}
      </p>
    </motion.div>
  );
};

export default SocialProof;
