import type { Metadata } from "next";
import Link from "next/link";
import { faqItems } from "@/data/faq";

export const metadata: Metadata = {
  title: "FAQ — Find My Episode",
  description:
    "Frequently asked questions about Find My Episode. Learn how to identify TV episodes and movies from scene descriptions, supported languages, and more.",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "FAQ — Find My Episode",
    description: "Everything you need to know about finding TV episodes and movies from scene descriptions.",
    url: "/faq",
  },
};

const FaqPage = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

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

          <header className="text-center mb-12">
            <h1 className="font-serif text-4xl md:text-5xl text-ink tracking-tight leading-[1.1]">
              Frequently asked <span className="text-accent">questions</span>
            </h1>
            <p className="mt-4 text-ink-muted text-base max-w-xl mx-auto">
              Everything you need to know about finding TV episodes and movies from scene descriptions.
            </p>
          </header>

          <div className="space-y-4">
            {faqItems.map((item, i) => (
              <details
                key={i}
                className="group rounded-xl bg-white border border-stone/60 hover:border-stone-dark transition-colors"
              >
                <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer list-none">
                  <h2 className="font-serif text-base md:text-lg text-ink">
                    {item.question}
                  </h2>
                  <svg
                    width="16"
                    height="16"
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

          <div className="mt-12 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-3 bg-ink text-cream text-sm font-medium rounded-xl hover:bg-ink-light transition-colors"
            >
              Back to search
            </Link>
          </div>
        </main>
      </div>
    </>
  );
};

export default FaqPage;
