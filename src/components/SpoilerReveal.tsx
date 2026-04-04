"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type SpoilerRevealProps = {
  children: React.ReactNode;
  label?: string;
};

const SpoilerReveal = ({
  children,
  label = "Cliquer pour révéler le résumé (Spoilers)",
}: SpoilerRevealProps) => {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="relative">
      <motion.div
        animate={{ filter: revealed ? "blur(0px)" : "blur(8px)" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="select-none"
        style={{ userSelect: revealed ? "auto" : "none" }}
      >
        {children}
      </motion.div>

      <AnimatePresence>
        {!revealed && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setRevealed(true)}
            className="absolute inset-0 flex items-center justify-center cursor-pointer"
          >
            <span className="px-4 py-2 text-xs font-medium text-ink-muted bg-cream/90 border border-stone rounded-full backdrop-blur-sm tracking-wide hover:text-ink hover:border-stone-dark transition-colors duration-200">
              {label}
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SpoilerReveal;
