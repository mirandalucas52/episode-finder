"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/lib/i18n-context";

const MAX_CHARS = 600;
const COUNTER_THRESHOLD = 400;

type SearchBarProps = {
  onSearch: (query: string) => void;
  isLoading: boolean;
  initialQuery?: string;
};

const SearchBar = ({ onSearch, isLoading, initialQuery }: SearchBarProps) => {
  const { t, locale } = useI18n();
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (trimmedLength >= 10 && !isLoading) {
      onSearch(query.trim());
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

  const hasSpeechRecognition = typeof window !== "undefined" &&
    ("SpeechRecognition" in window || "webkitSpeechRecognition" in window);

  const toggleVoice = useCallback(() => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.lang = locale === "fr" ? "fr-FR" : locale === "es" ? "es-ES" : locale === "pt" ? "pt-BR" : "en-US";
    recognition.interimResults = true;
    recognition.continuous = false;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = Array.from(event.results)
        .map((r) => r[0].transcript)
        .join("");
      setQuery(transcript.slice(0, MAX_CHARS));
    };

    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);

    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
  }, [isListening, locale]);

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-2xl mx-auto"
    >
      <motion.div
        animate={{
          boxShadow: isFocused
            ? "0 8px 40px rgba(139, 115, 85, 0.12), 0 2px 8px rgba(139, 115, 85, 0.08)"
            : "0 2px 16px rgba(26, 25, 23, 0.04), 0 1px 4px rgba(26, 25, 23, 0.02)",
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className={`relative rounded-2xl bg-card border overflow-hidden transition-colors ${
          isListening ? "border-rose-400/60" : "border-stone/60"
        }`}
      >
        <textarea
          ref={textareaRef}
          value={query}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleKeyDown}
          placeholder={isListening ? t("search.listening") : t("search.placeholder")}
          maxLength={MAX_CHARS}
          rows={3}
          className="w-full resize-none px-7 pt-6 pb-4 text-ink font-sans text-base leading-relaxed placeholder:text-ink-subtle/70 bg-transparent"
        />

        <div className="flex items-center justify-between px-7 pb-5">
          <div className="flex items-center gap-3">
            {hasSpeechRecognition && (
              <button
                type="button"
                onClick={toggleVoice}
                className={`flex items-center justify-center w-7 h-7 rounded-lg transition-all duration-200 ${
                  isListening
                    ? "text-rose-500 bg-rose-50 border border-rose-200"
                    : "text-ink-subtle hover:text-ink hover:bg-stone/30 border border-transparent"
                }`}
                title={t("search.voice")}
              >
                {isListening ? (
                  <motion.svg
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                    width="14" height="14" viewBox="0 0 24 24" fill="currentColor"
                  >
                    <rect x="9" y="2" width="6" height="12" rx="3" />
                    <path d="M5 10a7 7 0 0 0 14 0" fill="none" stroke="currentColor" strokeWidth="2" />
                    <line x1="12" y1="19" x2="12" y2="22" stroke="currentColor" strokeWidth="2" />
                  </motion.svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                    <rect x="9" y="2" width="6" height="12" rx="3" />
                    <path d="M5 10a7 7 0 0 0 14 0" />
                    <line x1="12" y1="19" x2="12" y2="22" />
                  </svg>
                )}
              </button>
            )}
            <p className="text-xs text-ink-subtle tracking-wide">
              {trimmedLength < 10 && query.length > 0
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
            disabled={trimmedLength < 10 || isLoading}
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
