"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n-context";
import { faqItems } from "@/data/faq";

const HomeSeoContent = () => {
  const { t, locale } = useI18n();

  const features = [
    { titleKey: "home.featureAny", descKey: "home.featureAnyDesc", icon: "🎬" },
    { titleKey: "home.featureLang", descKey: "home.featureLangDesc", icon: "🌍" },
    { titleKey: "home.featureEpisode", descKey: "home.featureEpisodeDesc", icon: "🎯" },
    { titleKey: "home.featureWatch", descKey: "home.featureWatchDesc", icon: "📺" },
    { titleKey: "home.featureFree", descKey: "home.featureFreeDesc", icon: "✨" },
    { titleKey: "home.featureTrailer", descKey: "home.featureTrailerDesc", icon: "🎞️" },
  ];

  const steps = [
    { step: "1", titleKey: "home.step1Title", textKey: "home.step1Text" },
    { step: "2", titleKey: "home.step2Title", textKey: "home.step2Text" },
    { step: "3", titleKey: "home.step3Title", textKey: "home.step3Text" },
  ];

  const localFaq = (faqItems[locale] || faqItems.en).slice(0, 6);

  return (
    <section className="w-full max-w-4xl mx-auto mt-24 mb-8 px-2">
      <div className="mb-20">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-serif text-3xl md:text-4xl text-ink text-center tracking-tight mb-3"
        >
          {t("home.seoTitle1")} <span className="text-accent">{t("home.seoTitle2")}</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center text-ink-muted text-base max-w-2xl mx-auto mb-12"
        >
          {t("home.seoSubtitle")}
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="p-5 rounded-2xl bg-card border border-stone/60"
            >
              <div className="text-2xl mb-3">{f.icon}</div>
              <h3 className="font-serif text-lg text-ink mb-1">{t(f.titleKey)}</h3>
              <p className="text-sm text-ink-muted leading-relaxed">{t(f.descKey)}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mb-20 text-center">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-serif text-3xl md:text-4xl text-ink tracking-tight mb-3"
        >
          {t("home.howItWorksTitle")}
        </motion.h2>
        <p className="text-ink-muted text-base max-w-2xl mx-auto mb-10">
          {t("home.howItWorksSubtitle")}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {steps.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-2xl bg-card border border-stone/60"
            >
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-accent/10 border border-accent/20 font-serif text-accent font-semibold mb-4">
                {s.step}
              </div>
              <h3 className="font-serif text-lg text-ink mb-2">{t(s.titleKey)}</h3>
              <p className="text-sm text-ink-muted leading-relaxed">{t(s.textKey)}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-8">
          <Link
            href="/how-it-works"
            className="inline-flex items-center gap-2 text-sm text-accent hover:text-accent-dark transition-colors"
          >
            {t("home.readGuide")}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </div>

      <div className="mb-12">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-serif text-3xl md:text-4xl text-ink text-center tracking-tight mb-3"
        >
          {t("home.faqTitle")}
        </motion.h2>
        <p className="text-center text-ink-muted text-base mb-10">{t("home.faqSubtitle")}</p>

        <div className="space-y-3 max-w-3xl mx-auto">
          {localFaq.map((item, i) => (
            <details
              key={i}
              className="group rounded-xl bg-card border border-stone/60 hover:border-stone-dark transition-colors"
            >
              <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer list-none">
                <h3 className="font-serif text-base text-ink">{item.question}</h3>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-ink-subtle shrink-0 transition-transform group-open:rotate-180"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </summary>
              <div className="px-5 pb-5 text-sm text-ink-light leading-relaxed">{item.answer}</div>
            </details>
          ))}
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/faq"
            className="inline-flex items-center gap-2 text-sm text-accent hover:text-accent-dark transition-colors"
          >
            {t("home.seeAllFaq")}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomeSeoContent;
