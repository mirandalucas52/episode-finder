"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/lib/i18n-context";
import { compressImage } from "@/lib/image-utils";

const MAX_CHARS = 600;
const COUNTER_THRESHOLD = 400;

type SearchBarProps = {
  onSearch: (query: string, imageBase64?: string) => void;
  isLoading: boolean;
  initialQuery?: string;
};

const SearchBar = ({ onSearch, isLoading, initialQuery }: SearchBarProps) => {
  const { t } = useI18n();
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialQuery !== undefined) {
      setQuery(initialQuery.slice(0, MAX_CHARS));
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
        textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
      }
    }
  }, [initialQuery]);

  const trimmedLength = query.trim().length;
  const showCounter = query.length > COUNTER_THRESHOLD;
  const hasImage = !!imageBase64;
  const canSubmit = hasImage || trimmedLength >= 10;

  const handleImageFile = async (file: File) => {
    if (!file.type.startsWith("image/")) return;
    try {
      const base64 = await compressImage(file);
      setImageBase64(base64);
      setImagePreview(URL.createObjectURL(file));
    } catch {}
  };

  const clearImage = () => {
    setImageBase64(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (canSubmit && !isLoading) {
      onSearch(query.trim(), imageBase64 || undefined);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    if (val.length <= MAX_CHARS) {
      setQuery(val);
    }
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleImageFile(file);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-2xl mx-auto"
      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
    >
      <motion.div
        animate={{
          boxShadow: isFocused
            ? "0 8px 40px rgba(139, 115, 85, 0.12), 0 2px 8px rgba(139, 115, 85, 0.08)"
            : "0 2px 16px rgba(26, 25, 23, 0.04), 0 1px 4px rgba(26, 25, 23, 0.02)",
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className={`relative rounded-2xl bg-card border overflow-hidden transition-colors ${
          isDragging ? "border-accent border-dashed" : "border-stone/60"
        }`}
      >
        {imagePreview && (
          <div className="px-7 pt-5 flex items-center gap-3">
            <div className="relative">
              <img
                src={imagePreview}
                alt="Screenshot"
                className="h-16 w-auto rounded-lg border border-stone/40 object-cover"
              />
              <button
                type="button"
                onClick={clearImage}
                className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-ink text-cream rounded-full
                           flex items-center justify-center text-[10px] hover:bg-rose-600 transition-colors"
              >
                ×
              </button>
            </div>
            <p className="text-[11px] text-ink-subtle">{t("search.imageAttached")}</p>
          </div>
        )}

        <textarea
          ref={textareaRef}
          value={query}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleKeyDown}
          placeholder={hasImage ? t("search.imagePlaceholder") : t("search.placeholder")}
          maxLength={MAX_CHARS}
          rows={3}
          className="w-full resize-none px-7 pt-6 pb-4 text-ink font-sans text-base leading-relaxed placeholder:text-ink-subtle/70 bg-transparent"
        />

        <div className="flex items-center justify-between px-7 pb-5">
          <div className="flex items-center gap-3">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleImageFile(file);
              }}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-1.5 text-xs text-ink-subtle hover:text-ink
                         transition-colors duration-200"
              title={t("search.uploadImage")}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
            </button>

            <p className="text-xs text-ink-subtle tracking-wide">
              {!hasImage && trimmedLength < 10 && query.length > 0
                ? `${10 - trimmedLength} ${t("search.charsRemaining")}`
                : t("search.hint")}
            </p>
            {showCounter && (
              <span className={`text-[10px] tabular-nums tracking-wide ${
                query.length >= MAX_CHARS ? "text-rose-500" : "text-ink-subtle/50"
              }`}>
                {query.length}/{MAX_CHARS}
              </span>
            )}
          </div>

          <motion.button
            type="submit"
            disabled={!canSubmit || isLoading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-2.5 bg-ink text-cream text-sm font-medium tracking-wide rounded-xl
                       disabled:opacity-30 disabled:cursor-not-allowed
                       transition-colors duration-200 hover:bg-ink-light"
          >
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.span
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2"
                >
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{
                      repeat: Infinity,
                      duration: 1,
                      ease: "linear",
                    }}
                    className="inline-block w-3.5 h-3.5 border-2 border-cream/30 border-t-cream rounded-full"
                  />
                  {t("search.loading")}
                </motion.span>
              ) : (
                <motion.span
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {t("search.button")}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.div>
    </motion.form>
  );
};

export default SearchBar;
