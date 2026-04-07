"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n-context";
import { getUserStats, getHistory, type UserStats, type HistoryEntry } from "@/lib/search-history";
import TopNav from "@/components/TopNav";
import Footer from "@/components/Footer";

const StatCard = ({ label, value, icon, delay }: { label: string; value: number; icon: string; delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.4 }}
    className="flex flex-col items-center gap-2 px-6 py-5 rounded-2xl bg-card border border-stone/60"
  >
    <span className="text-2xl">{icon}</span>
    <motion.span
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: delay + 0.2, type: "spring", stiffness: 200 }}
      className="text-3xl font-serif font-bold text-ink"
    >
      {value}
    </motion.span>
    <span className="text-xs text-ink-subtle tracking-wide">{label}</span>
  </motion.div>
);

const StatsPage = () => {
  const { t } = useI18n();
  const [stats, setStats] = useState<UserStats | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    setStats(getUserStats());
    setHistory(getHistory());
  }, []);

  if (!stats) return null;

  const shareText = `${t("stats.shareText")} ${stats.totalSearches} ${t("stats.searches")}, ${stats.films} ${t("mode.film")}s, ${stats.series} ${t("mode.series")}, ${stats.episodes} ${t("mode.episode")}s — findmyepisode.com`;

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ text: shareText });
    } else {
      await navigator.clipboard.writeText(shareText);
    }
  };

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <TopNav />
      <main className="flex-1 px-6 py-12 max-w-2xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mb-10"
        >
          <h1 className="font-serif text-3xl text-ink mb-2">{t("stats.title")}</h1>
          <p className="text-sm text-ink-muted">{t("stats.subtitle")}</p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
          <StatCard label={t("stats.total")} value={stats.totalSearches} icon="🔍" delay={0.1} />
          <StatCard label={t("mode.film")} value={stats.films} icon="🎬" delay={0.2} />
          <StatCard label={t("mode.series")} value={stats.series} icon="📺" delay={0.3} />
          <StatCard label={t("mode.episode")} value={stats.episodes} icon="🎯" delay={0.4} />
        </div>

        {history.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-10"
          >
            <h2 className="font-serif text-lg text-ink mb-4">{t("stats.recentTitle")}</h2>
            <div className="space-y-2">
              {history.slice(0, 10).map((entry, i) => (
                <motion.div
                  key={entry.timestamp}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.05 }}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-card border border-stone/40"
                >
                  {entry.posterUrl ? (
                    <Image
                      src={entry.posterUrl}
                      alt={entry.title}
                      width={28}
                      height={42}
                      className="rounded-sm object-cover shrink-0"
                    />
                  ) : (
                    <div className="w-7 h-[42px] rounded-sm bg-stone/30 shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-ink font-medium truncate">{entry.title}</p>
                    <p className="text-[10px] text-ink-subtle truncate">{entry.query}</p>
                  </div>
                  <span className="text-[10px] text-ink-subtle/50 shrink-0">
                    {entry.mode === "film" ? "🎬" : entry.mode === "series" ? "📺" : "🎯"}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col items-center gap-4"
        >
          <button
            onClick={handleShare}
            className="px-6 py-2.5 bg-ink text-cream text-sm font-medium tracking-wide rounded-xl
                       hover:bg-ink-light transition-colors"
          >
            {t("stats.share")}
          </button>
          <Link href="/" className="text-xs text-ink-subtle hover:text-ink transition-colors">
            {t("stats.backHome")}
          </Link>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default StatsPage;
