import type { Metadata } from "next";
import Link from "next/link";
import { howItWorksContent } from "@/data/how-it-works";
import { getServerT } from "@/lib/i18n-server";

const metaByLocale: Record<string, { title: string; description: string }> = {
  en: {
    title: "How to Find an Episode from a Scene — Find My Episode",
    description: "Learn how to find any TV episode or movie from a scene description.",
  },
  fr: {
    title: "Comment retrouver un épisode à partir d'une scène — Retrouve mon épisode",
    description: "Apprenez à retrouver n'importe quel épisode de série ou film à partir de la description d'une scène.",
  },
  es: {
    title: "Cómo encontrar un episodio a partir de una escena — Encuentra mi episodio",
    description: "Aprende a encontrar cualquier episodio de serie o película a partir de una descripción.",
  },
  pt: {
    title: "Como encontrar um episódio a partir de uma cena — Encontre meu episódio",
    description: "Aprenda a encontrar qualquer episódio de série ou filme a partir de uma descrição.",
  },
};

export const generateMetadata = async (): Promise<Metadata> => {
  const { locale } = await getServerT();
  const meta = metaByLocale[locale] || metaByLocale.en;
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: "/how-it-works" },
    openGraph: { title: meta.title, description: meta.description, url: "/how-it-works" },
  };
};

const HowItWorksPage = async () => {
  const { locale } = await getServerT();
  const c = howItWorksContent[locale] || howItWorksContent.en;

  return (
    <div className="flex flex-col flex-1 items-center">
      <main className="w-full max-w-3xl px-5 md:px-8 pt-20 md:pt-28 pb-16">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs text-ink-muted hover:text-ink mb-8 transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          {c.backToSearch}
        </Link>

        <article className="prose prose-stone max-w-none">
          <header className="text-center mb-12">
            <h1 className="font-serif text-4xl md:text-5xl text-ink tracking-tight leading-[1.1] mb-4">
              {c.heading1} <span className="text-accent">{c.heading2}</span>
            </h1>
            <p className="text-ink-muted text-lg max-w-2xl mx-auto">{c.subtitle}</p>
          </header>

          <section className="mb-10">
            <h2 className="font-serif text-2xl text-ink mb-4">{c.problemTitle}</h2>
            <p className="text-ink-light leading-relaxed mb-4">{c.problemP1}</p>
            <p className="text-ink-light leading-relaxed">
              <strong className="text-ink">{c.problemP2Prefix}</strong>{c.problemP2}
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-serif text-2xl text-ink mb-4">{c.stepsTitle}</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="shrink-0 w-10 h-10 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center font-serif text-accent font-semibold">
                  1
                </div>
                <div>
                  <h3 className="font-serif text-lg text-ink mb-2">{c.step1Title}</h3>
                  <p className="text-ink-light leading-relaxed text-sm">{c.step1Text}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="shrink-0 w-10 h-10 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center font-serif text-accent font-semibold">
                  2
                </div>
                <div>
                  <h3 className="font-serif text-lg text-ink mb-2">{c.step2Title}</h3>
                  <p className="text-ink-light leading-relaxed text-sm mb-2">{c.step2Intro}</p>
                  <ul className="text-ink-light text-sm leading-relaxed list-disc pl-5 space-y-1">
                    {c.step2List.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="shrink-0 w-10 h-10 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center font-serif text-accent font-semibold">
                  3
                </div>
                <div>
                  <h3 className="font-serif text-lg text-ink mb-2">{c.step3Title}</h3>
                  <p className="text-ink-light leading-relaxed text-sm">{c.step3Text}</p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="font-serif text-2xl text-ink mb-4">{c.examplesTitle}</h2>
            <div className="space-y-3">
              {c.examples.map((ex, i) => (
                <div key={i} className="p-4 rounded-xl bg-card border border-stone/60">
                  <p className="text-[11px] text-ink-subtle uppercase tracking-widest mb-2">{ex.searchLabel}</p>
                  <p className="text-sm text-ink-light italic mb-3">&ldquo;{ex.search}&rdquo;</p>
                  <p className="text-[11px] text-ink-subtle uppercase tracking-widest mb-1">{ex.resultLabel}</p>
                  <p className="text-sm text-ink font-medium">{ex.result}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-10">
            <h2 className="font-serif text-2xl text-ink mb-4">{c.langTitle}</h2>
            <p className="text-ink-light leading-relaxed">{c.langText}</p>
          </section>

          <section className="mb-10">
            <h2 className="font-serif text-2xl text-ink mb-4">{c.tipsTitle}</h2>
            <ul className="text-ink-light leading-relaxed list-disc pl-5 space-y-2">
              {c.tips.map((tip, i) => (
                <li key={i}>{tip}</li>
              ))}
            </ul>
          </section>

          <div className="mt-12 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-3 bg-ink text-cream text-sm font-medium rounded-xl hover:bg-ink-light transition-colors"
            >
              {c.tryNow}
            </Link>
          </div>
        </article>
      </main>
    </div>
  );
};

export default HowItWorksPage;
