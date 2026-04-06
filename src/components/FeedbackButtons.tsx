"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { useI18n } from "@/lib/i18n-context";
import { submitFeedback } from "@/server/actions";

type FeedbackButtonsProps = {
  cacheId: number;
  query: string;
  resultTitle: string;
  searchMode: string;
};

const FeedbackButtons = ({
  cacheId,
  query,
  resultTitle,
  searchMode,
}: FeedbackButtonsProps) => {
  const { t } = useI18n();
  const [voted, setVoted] = useState<1 | -1 | null>(null);
  const [showCorrection, setShowCorrection] = useState(false);
  const [correctTitle, setCorrectTitle] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleVote = async (vote: 1 | -1) => {
    if (voted || submitting) return;

    if (vote === -1) {
      setShowCorrection(true);
      return;
    }

    setSubmitting(true);
    setVoted(vote);
    const result = await submitFeedback(cacheId, query, vote);
    if (!result.success) setVoted(null);
    else {
      toast(t("feedback.thanks"), {
        duration: 2000,
        style: {
          background: "var(--cream)",
          border: "1px solid var(--stone)",
          color: "var(--ink)",
          fontSize: "13px",
        },
      });
    }
    setSubmitting(false);
  };

  const handleSubmitCorrection = async () => {
    setSubmitting(true);
    setVoted(-1);
    setShowCorrection(false);

    const result = await submitFeedback(
      cacheId,
      query,
      -1,
      resultTitle,
      correctTitle.trim() || undefined,
      searchMode
    );

    if (!result.success) {
      setVoted(null);
      setShowCorrection(true);
    } else {
      toast(t("feedback.correctionSaved"), {
        duration: 3000,
        style: {
          background: "var(--cream)",
          border: "1px solid var(--stone)",
          color: "var(--ink)",
          fontSize: "13px",
        },
      });
    }
    setSubmitting(false);
  };

  const handleSkipCorrection = async () => {
    setSubmitting(true);
    setVoted(-1);
    setShowCorrection(false);

    await submitFeedback(cacheId, query, -1, resultTitle, undefined, searchMode);

    toast(t("feedback.thanks"), {
      duration: 2000,
      style: {
        background: "var(--cream)",
        border: "1px solid var(--stone)",
        color: "var(--ink)",
        fontSize: "13px",
      },
    });
    setSubmitting(false);
  };

  return (
    <div className="flex flex-col gap-2">
      <AnimatePresence mode="wait">
        {voted === null && !showCorrection && (
          <motion.div
            key="buttons"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-1.5"
          >
            <span className="text-[11px] text-ink-subtle tracking-wide mr-1">
              {t("feedback.ask")}
            </span>
            <button
              onClick={() => handleVote(1)}
              className="w-7 h-7 flex items-center justify-center rounded-lg
                         text-ink-subtle hover:text-emerald-600 hover:bg-emerald-50
                         border border-transparent hover:border-emerald-200
                         transition-all duration-200"
              aria-label="Thumbs up"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 10v12" />
                <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H7a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L15 2a3.13 3.13 0 0 1 2 3 4.92 4.92 0 0 1-.88 3z" />
              </svg>
            </button>
            <button
              onClick={() => handleVote(-1)}
              className="w-7 h-7 flex items-center justify-center rounded-lg
                         text-ink-subtle hover:text-rose-600 hover:bg-rose-50
                         border border-transparent hover:border-rose-200
                         transition-all duration-200"
              aria-label="Thumbs down"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 14V2" />
                <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H17a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L9 22a3.13 3.13 0 0 1-2-3 4.9 4.9 0 0 1 .88-3z" />
              </svg>
            </button>
          </motion.div>
        )}

        {showCorrection && !voted && (
          <motion.div
            key="correction"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex flex-col gap-2 w-full"
          >
            <p className="text-[11px] text-ink-muted">
              {t("feedback.correctPrompt")}
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                value={correctTitle}
                onChange={(e) => setCorrectTitle(e.target.value)}
                placeholder={t("feedback.correctPlaceholder")}
                className="flex-1 px-3 py-1.5 text-xs bg-transparent border border-stone/60 rounded-lg
                           text-ink placeholder:text-ink-subtle/50 focus:outline-none focus:border-accent/40"
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSubmitCorrection();
                }}
              />
              <button
                onClick={handleSubmitCorrection}
                disabled={submitting}
                className="px-3 py-1.5 text-xs font-medium bg-ink text-cream rounded-lg
                           hover:bg-ink-light transition-colors disabled:opacity-50"
              >
                {t("feedback.send")}
              </button>
            </div>
            <button
              onClick={handleSkipCorrection}
              className="text-[10px] text-ink-subtle hover:text-ink-muted transition-colors text-left"
            >
              {t("feedback.skipCorrection")}
            </button>
          </motion.div>
        )}

        {voted !== null && (
          <motion.p
            key="voted"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[11px] text-ink-subtle tracking-wide"
          >
            {voted === 1 ? "👍" : "👎"} {t("feedback.thanks")}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FeedbackButtons;
