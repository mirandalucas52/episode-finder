"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/lib/i18n-context";

type TrailerEmbedProps = {
  youtubeKey: string;
  title: string;
};

const TrailerEmbed = ({ youtubeKey, title }: TrailerEmbedProps) => {
  const { t } = useI18n();
  const [playing, setPlaying] = useState(false);

  const thumbnailUrl = `https://i.ytimg.com/vi/${youtubeKey}/maxresdefault.jpg`;
  const fallbackUrl = `https://i.ytimg.com/vi/${youtubeKey}/hqdefault.jpg`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.45 }}
      className="pt-4 border-t border-stone/40"
    >
      <h3 className="text-xs font-medium text-ink-subtle uppercase tracking-widest mb-3">
        {t("trailer.title")}
      </h3>

      <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-ink/5 border border-stone/40">
        <AnimatePresence mode="wait">
          {playing ? (
            <motion.iframe
              key="iframe"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              src={`https://www.youtube-nocookie.com/embed/${youtubeKey}?autoplay=1&rel=0`}
              title={`${title} trailer`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          ) : (
            <motion.button
              key="thumb"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPlaying(true)}
              className="group absolute inset-0 w-full h-full"
              aria-label={`Play ${title} trailer`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={thumbnailUrl}
                alt={`${title} trailer thumbnail`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = fallbackUrl;
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              <motion.div
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-[0_4px_30px_rgba(0,0,0,0.3)] transition-all group-hover:bg-white">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="#1A1917"
                    className="ml-1"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </motion.div>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default TrailerEmbed;
