"use client";

import { toast } from "sonner";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n-context";

type ShareButtonProps = {
  query: string;
  title: string;
};

const ShareButton = ({ query, title }: ShareButtonProps) => {
  const { t } = useI18n();

  const handleShare = async () => {
    const text = t("share.text", {
      query: query.slice(0, 60) + (query.length > 60 ? "..." : ""),
      title,
    });
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({ title: t("share.nativeTitle"), text, url });
        return;
      } catch {
        // fall through to clipboard
      }
    }

    await navigator.clipboard.writeText(`${text}\n${url}`);
    toast(t("share.copied"), {
      duration: 2500,
      style: {
        background: "#FAF8F5",
        border: "1px solid #E8E4DE",
        color: "#1A1917",
        fontSize: "13px",
        fontFamily: "var(--font-sans)",
      },
    });
  };

  return (
    <motion.button
      onClick={handleShare}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-ink-muted
                 border border-stone rounded-xl hover:border-stone-dark hover:text-ink
                 transition-colors duration-200"
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
        <polyline points="16 6 12 2 8 6" />
        <line x1="12" y1="2" x2="12" y2="15" />
      </svg>
      {t("share.button")}
    </motion.button>
  );
};

export default ShareButton;
