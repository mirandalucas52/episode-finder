"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { faqItems } from "@/data/faq";

const features = [
  {
    title: "Any TV show, any movie",
    description:
      "Our catalog covers mainstream series, cult classics, anime, documentaries, and films from around the world.",
    icon: "🎬",
  },
  {
    title: "4 languages supported",
    description:
      "Search in English, French, Spanish, or Portuguese. Results come back in your native language.",
    icon: "🌍",
  },
  {
    title: "Find specific episodes",
    description:
      "Not just the show — the exact season and episode number. Perfect for pinpointing iconic scenes.",
    icon: "🎯",
  },
  {
    title: "Where to watch",
    description:
      "Each result includes streaming, rental, and purchase options for your country.",
    icon: "📺",
  },
  {
    title: "100% free, no signup",
    description:
      "No account needed, no credit card, no ads. Just search and get results instantly.",
    icon: "✨",
  },
  {
    title: "Watch the trailer",
    description:
      "Every result comes with the official trailer so you can confirm it's the right one.",
    icon: "🎞️",
  },
];

const HomeSeoContent = () => {
  return (
    <section className="w-full max-w-4xl mx-auto mt-24 mb-8 px-2">
      {/* Features grid */}
      <div className="mb-20">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-serif text-3xl md:text-4xl text-ink text-center tracking-tight mb-3"
        >
          Find any <span className="text-accent">episode</span> or movie
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center text-ink-muted text-base max-w-2xl mx-auto mb-12"
        >
          Describe a scene from memory — our tool identifies the exact episode, movie, or series in seconds.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="p-5 rounded-2xl bg-white border border-stone/60"
            >
              <div className="text-2xl mb-3">{f.icon}</div>
              <h3 className="font-serif text-lg text-ink mb-1">{f.title}</h3>
              <p className="text-sm text-ink-muted leading-relaxed">{f.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* How it works teaser */}
      <div className="mb-20 text-center">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-serif text-3xl md:text-4xl text-ink tracking-tight mb-3"
        >
          How it works
        </motion.h2>
        <p className="text-ink-muted text-base max-w-2xl mx-auto mb-10">
          Three simple steps to find any scene you remember.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {[
            {
              step: "1",
              title: "Choose a mode",
              text: "Film, Series, or Episode — pick what you're looking for.",
            },
            {
              step: "2",
              title: "Describe the scene",
              text: "Type what you remember: characters, dialogue, location, or plot.",
            },
            {
              step: "3",
              title: "Get the answer",
              text: "Title, season, episode, synopsis, trailer, and where to watch.",
            },
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-2xl bg-white border border-stone/60"
            >
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-accent/10 border border-accent/20 font-serif text-accent font-semibold mb-4">
                {s.step}
              </div>
              <h3 className="font-serif text-lg text-ink mb-2">{s.title}</h3>
              <p className="text-sm text-ink-muted leading-relaxed">{s.text}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-8">
          <Link
            href="/how-it-works"
            className="inline-flex items-center gap-2 text-sm text-accent hover:text-accent-dark transition-colors"
          >
            Read the full guide
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </div>

      {/* FAQ */}
      <div className="mb-12">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-serif text-3xl md:text-4xl text-ink text-center tracking-tight mb-3"
        >
          Frequently asked questions
        </motion.h2>
        <p className="text-center text-ink-muted text-base mb-10">
          Everything you need to know.
        </p>

        <div className="space-y-3 max-w-3xl mx-auto">
          {faqItems.slice(0, 6).map((item, i) => (
            <details
              key={i}
              className="group rounded-xl bg-white border border-stone/60 hover:border-stone-dark transition-colors"
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
              <div className="px-5 pb-5 text-sm text-ink-light leading-relaxed">
                {item.answer}
              </div>
            </details>
          ))}
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/faq"
            className="inline-flex items-center gap-2 text-sm text-accent hover:text-accent-dark transition-colors"
          >
            See all questions
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
