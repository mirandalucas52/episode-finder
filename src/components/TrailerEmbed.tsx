"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/lib/i18n-context";

type TrailerEmbedProps = {
  youtubeKey: string;
  youtubeKeys?: string[];
  title: string;
};

const TrailerEmbed = ({ youtubeKey, youtubeKeys, title }: TrailerEmbedProps) => {
  const { t } = useI18n();
  const [playing, setPlaying] = useState(false);
  const keys = youtubeKeys && youtubeKeys.length > 0 ? youtubeKeys : [youtubeKey];
  const [index, setIndex] = useState(0);

  const currentKey = keys[index];
  const hasAlternative = keys.length > 1;
  const thumbnailUrl = `https://i.ytimg.com/vi/${currentKey}/maxresdefault.jpg`;
  const fallbackUrl = `https://i.ytimg.com/vi/${currentKey}/hqdefault.jpg`;

  const tryNext = () => {
    setIndex((prev) => (prev + 1) % keys.length);
    setPlaying(false);
  };

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
              key={`iframe-${currentKey}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              src={`https://www.youtube-nocookie.com/embed/${currentKey}?autoplay=1&rel=0`}
              title={`${title} trailer`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          ) : (
            <motion.button
              key={`thumb-${currentKey}`}
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

      {/* Fallback controls: video may be geo-blocked in some countries */}
      <div className="mt-2 flex items-center justify-end gap-4 flex-wrap">
        {hasAlternative && (
          <button
            onClick={tryNext}
            className="text-[11px] text-ink-muted hover:text-ink underline underline-offset-2 transition-colors"
          >
            {t("trailer.tryAnother")}
          </button>
        )}
        <a
          href={`https://www.youtube.com/watch?v=${currentKey}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-[11px] text-ink-muted hover:text-ink transition-colors"
        >
          {t("trailer.watchOnYoutube")}
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </a>
      </div>
    </motion.div>
  );
};

export default TrailerEmbed;
