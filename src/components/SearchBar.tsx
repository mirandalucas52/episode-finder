"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

type SearchBarProps = {
  onSearch: (query: string) => void;
  isLoading: boolean;
};

const SearchBar = ({ onSearch, isLoading }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim().length >= 10 && !isLoading) {
      onSearch(query);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleTextareaInput = () => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = `${Math.min(el.scrollHeight, 200)}px`;
    }
  };

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
        className="relative rounded-2xl bg-white border border-stone/60 overflow-hidden"
      >
        <textarea
          ref={textareaRef}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            handleTextareaInput();
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleKeyDown}
          placeholder="Décrivez la scène dont vous vous souvenez..."
          rows={3}
          className="w-full resize-none px-7 pt-6 pb-4 text-ink font-sans text-base leading-relaxed placeholder:text-ink-subtle/70 bg-transparent"
        />

        <div className="flex items-center justify-between px-7 pb-5">
          <p className="text-xs text-ink-subtle tracking-wide">
            {query.trim().length < 10 && query.length > 0
              ? `${10 - query.trim().length} caractères restants`
              : "Entrée pour rechercher"}
          </p>

          <motion.button
            type="submit"
            disabled={query.trim().length < 10 || isLoading}
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
                  Recherche...
                </motion.span>
              ) : (
                <motion.span
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  Rechercher
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
