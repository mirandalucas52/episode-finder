import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to Find an Episode from a Scene — Find My Episode",
  description:
    "Learn how to find any TV episode or movie from a scene description. Our tool identifies episodes using character names, dialogue, locations, or plot details.",
  alternates: { canonical: "/how-it-works" },
  openGraph: {
    title: "How to Find an Episode from a Scene",
    description: "Step-by-step guide to finding any TV episode or movie from a scene description.",
    url: "/how-it-works",
  },
};

const HowItWorksPage = () => {
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
          Back to search
        </Link>

        <article className="prose prose-stone max-w-none">
          <header className="text-center mb-12">
            <h1 className="font-serif text-4xl md:text-5xl text-ink tracking-tight leading-[1.1] mb-4">
              How to find an <span className="text-accent">episode</span> from a scene
            </h1>
            <p className="text-ink-muted text-lg max-w-2xl mx-auto">
              Ever remembered a specific TV scene but forgot which episode it was from? Here&apos;s exactly how our tool helps you find it in seconds.
            </p>
          </header>

          <section className="mb-10">
            <h2 className="font-serif text-2xl text-ink mb-4">The problem we solve</h2>
            <p className="text-ink-light leading-relaxed mb-4">
              You remember a TV scene perfectly — maybe a character&apos;s monologue, a shocking death, or a funny moment — but you can&apos;t remember which episode it was from. Scrolling through seasons to find it is painful. Googling vague descriptions rarely works because search engines match keywords, not context.
            </p>
            <p className="text-ink-light leading-relaxed">
              <strong className="text-ink">Find My Episode</strong> solves this by understanding your description semantically. Describe a scene in your own words — character names, dialogue fragments, locations, plot points, or just the vibe — and our system identifies the exact episode, movie, or series.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-serif text-2xl text-ink mb-4">How it works in 3 steps</h2>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="shrink-0 w-10 h-10 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center font-serif text-accent font-semibold">
                  1
                </div>
                <div>
                  <h3 className="font-serif text-lg text-ink mb-2">Choose your search mode</h3>
                  <p className="text-ink-light leading-relaxed text-sm">
                    Pick <strong>Movie</strong> if you&apos;re looking for a film, <strong>Series</strong> to identify a TV show as a whole, or <strong>Episode</strong> for a specific episode. This helps narrow down results and improves accuracy.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="shrink-0 w-10 h-10 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center font-serif text-accent font-semibold">
                  2
                </div>
                <div>
                  <h3 className="font-serif text-lg text-ink mb-2">Describe the scene</h3>
                  <p className="text-ink-light leading-relaxed text-sm mb-2">
                    Type what you remember. The more details you add, the better. Good descriptions include:
                  </p>
                  <ul className="text-ink-light text-sm leading-relaxed list-disc pl-5 space-y-1">
                    <li>Character names or nicknames</li>
                    <li>Dialogue snippets or memorable quotes</li>
                    <li>Location (forest, restaurant, spaceship...)</li>
                    <li>What happened (fight, confession, death...)</li>
                    <li>Emotional tone or context</li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="shrink-0 w-10 h-10 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center font-serif text-accent font-semibold">
                  3
                </div>
                <div>
                  <h3 className="font-serif text-lg text-ink mb-2">Get your answer instantly</h3>
                  <p className="text-ink-light leading-relaxed text-sm">
                    You&apos;ll get the title, season and episode number (for TV shows), synopsis, confidence level, and links to where you can watch it. If the first match isn&apos;t right, we&apos;ll show alternative possibilities.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="font-serif text-2xl text-ink mb-4">Examples of what works</h2>
            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-white border border-stone/60">
                <p className="text-[11px] text-ink-subtle uppercase tracking-widest mb-2">Search</p>
                <p className="text-sm text-ink-light italic mb-3">
                  &ldquo;A man on a bench tells a woman his life story while eating chocolates&rdquo;
                </p>
                <p className="text-[11px] text-ink-subtle uppercase tracking-widest mb-1">Result</p>
                <p className="text-sm text-ink font-medium">Forrest Gump (1994)</p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-stone/60">
                <p className="text-[11px] text-ink-subtle uppercase tracking-widest mb-2">Search</p>
                <p className="text-sm text-ink-light italic mb-3">
                  &ldquo;A wedding that turns into a massacre in a medieval castle&rdquo;
                </p>
                <p className="text-[11px] text-ink-subtle uppercase tracking-widest mb-1">Result</p>
                <p className="text-sm text-ink font-medium">Game of Thrones — S03E09 &ldquo;The Rains of Castamere&rdquo;</p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-stone/60">
                <p className="text-[11px] text-ink-subtle uppercase tracking-widest mb-2">Search</p>
                <p className="text-sm text-ink-light italic mb-3">
                  &ldquo;A chemistry teacher diagnosed with cancer starts making drugs&rdquo;
                </p>
                <p className="text-[11px] text-ink-subtle uppercase tracking-widest mb-1">Result</p>
                <p className="text-sm text-ink font-medium">Breaking Bad</p>
              </div>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="font-serif text-2xl text-ink mb-4">Languages supported</h2>
            <p className="text-ink-light leading-relaxed">
              Our tool works in English, French, Spanish, and Portuguese. Describe the scene in your native language and get results back in the same language — movie titles are translated to their official local version when available.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-serif text-2xl text-ink mb-4">Tips for better results</h2>
            <ul className="text-ink-light leading-relaxed list-disc pl-5 space-y-2">
              <li><strong className="text-ink">Be specific about the genre</strong> — mentioning &ldquo;sci-fi&rdquo;, &ldquo;comedy&rdquo;, or &ldquo;thriller&rdquo; narrows the search.</li>
              <li><strong className="text-ink">Include unique identifiers</strong> — an unusual character name, a specific object, or a memorable line of dialogue.</li>
              <li><strong className="text-ink">Mention the era if you know it</strong> — &ldquo;a 90s movie where...&rdquo; or &ldquo;an early 2000s series&rdquo;.</li>
              <li><strong className="text-ink">Don&apos;t worry about exact words</strong> — our system understands paraphrasing and context, not just keywords.</li>
            </ul>
          </section>

          <div className="mt-12 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-3 bg-ink text-cream text-sm font-medium rounded-xl hover:bg-ink-light transition-colors"
            >
              Try it now
            </Link>
          </div>
        </article>
      </main>
    </div>
  );
};

export default HowItWorksPage;
