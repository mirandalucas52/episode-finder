"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/lib/i18n-context";
import type { Locale } from "@/lib/i18n";

const FUN_FACTS: Record<Locale, string[]> = {
  fr: [
    "Plus de 500 000 films ont été produits dans l'histoire du cinéma.",
    "Le premier film de l'histoire dure seulement 2 secondes (1888).",
    "Le Seigneur des Anneaux a nécessité 274 jours de tournage.",
    "Bollywood produit environ 1 500 films par an.",
    "Le plan le plus long de l'histoire du cinéma dure 7h20.",
    "Breaking Bad a été refusé par HBO, FOX et TNT avant d'atterrir sur AMC.",
    "La série Friends a failli s'appeler 'Insomnia Cafe'.",
    "Le film Titanic a coûté plus cher que le vrai Titanic.",
  ],
  en: [
    "Over 500,000 films have been produced in cinema history.",
    "The first film ever made is only 2 seconds long (1888).",
    "Lord of the Rings took 274 days to shoot.",
    "Bollywood produces about 1,500 films per year.",
    "The longest single take in cinema history is 7h20m.",
    "Breaking Bad was rejected by HBO, FOX and TNT before landing on AMC.",
    "Friends was almost called 'Insomnia Cafe'.",
    "The movie Titanic cost more than the actual Titanic.",
  ],
  es: [
    "Se han producido más de 500 000 películas en la historia del cine.",
    "La primera película de la historia dura solo 2 segundos (1888).",
    "El Señor de los Anillos necesitó 274 días de rodaje.",
    "Bollywood produce unos 1 500 films al año.",
    "El plano más largo de la historia del cine dura 7h20.",
    "Breaking Bad fue rechazada por HBO, FOX y TNT antes de llegar a AMC.",
    "La serie Friends casi se llamó 'Insomnia Cafe'.",
    "La película Titanic costó más que el Titanic real.",
  ],
  pt: [
    "Mais de 500 000 filmes foram produzidos na história do cinema.",
    "O primeiro filme da história tem apenas 2 segundos (1888).",
    "O Senhor dos Anéis precisou de 274 dias de filmagem.",
    "Bollywood produz cerca de 1 500 filmes por ano.",
    "O plano mais longo da história do cinema dura 7h20.",
    "Breaking Bad foi rejeitada pela HBO, FOX e TNT antes de chegar à AMC.",
    "A série Friends quase se chamou 'Insomnia Cafe'.",
    "O filme Titanic custou mais do que o Titanic real.",
  ],
};

const STEPS = ["loading.step1", "loading.step2", "loading.step3", "loading.step4", "loading.step5"] as const;

const LoadingSkeleton = () => {
  const { t, locale } = useI18n();
  const [step, setStep] = useState(0);
  const [fact, setFact] = useState("");

  useEffect(() => {
    const facts = FUN_FACTS[locale] || FUN_FACTS.en;
    setFact(facts[Math.floor(Math.random() * facts.length)]);
  }, [locale]);

  useEffect(() => {
    const delays = [2000, 2500, 3000, 3500];
    if (step >= STEPS.length - 1) return;

    const timer = setTimeout(() => setStep((s) => s + 1), delays[step] || 2500);
    return () => clearTimeout(timer);
  }, [step]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="rounded-2xl bg-card border border-stone/60 overflow-hidden shadow-[0_2px_16px_rgba(26,25,23,0.04)] p-8 md:p-10">

        {/* Progress bar */}
        <div className="relative h-1 bg-stone/30 rounded-full overflow-hidden mb-8">
          <motion.div
            className="absolute inset-y-0 left-0 bg-accent rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: `${Math.min(((step + 1) / STEPS.length) * 100, 95)}%` }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
        </div>

        {/* Steps */}
        <div className="space-y-3 mb-8">
          {STEPS.map((stepKey, i) => (
            <motion.div
              key={stepKey}
              initial={{ opacity: 0, x: -10 }}
              animate={{
                opacity: i <= step ? 1 : 0.3,
                x: 0,
              }}
              transition={{ delay: i * 0.1, duration: 0.3 }}
              className="flex items-center gap-3"
            >
              <div className="relative w-5 h-5 flex items-center justify-center shrink-0">
                <AnimatePresence mode="wait">
                  {i < step ? (
                    <motion.svg
                      key="check"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      className="text-emerald-500"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </motion.svg>
                  ) : i === step ? (
                    <motion.div
                      key="spinner"
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      className="w-4 h-4 border-2 border-accent/30 border-t-accent rounded-full"
                    />
                  ) : (
                    <div key="dot" className="w-2 h-2 rounded-full bg-stone/40" />
                  )}
                </AnimatePresence>
              </div>
              <span className={`text-sm transition-colors duration-300 ${
                i < step ? "text-ink-muted line-through" :
                i === step ? "text-ink font-medium" : "text-ink-subtle/50"
              }`}>
                {t(stepKey)}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Skeleton preview */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="space-y-3 mb-8"
        >
          <div className="flex items-start gap-4">
            <div className="w-20 h-28 rounded-lg shimmer shrink-0" />
            <div className="flex-1 space-y-2 pt-1">
              <div className="h-6 w-40 rounded-lg shimmer" />
              <div className="h-4 w-24 rounded-md shimmer" />
              <div className="h-4 w-full rounded-md shimmer mt-3" />
              <div className="h-4 w-4/5 rounded-md shimmer" />
            </div>
          </div>
        </motion.div>

        {/* Fun fact */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="pt-6 border-t border-stone/30"
        >
          <p className="text-[10px] text-accent/70 uppercase tracking-widest mb-1.5">
            {t("loading.funFact")}
          </p>
          <p className="text-xs text-ink-subtle leading-relaxed italic">
            {fact}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoadingSkeleton;
