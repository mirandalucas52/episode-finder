import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found — Find My Episode",
  description: "The page you're looking for doesn't exist. Try searching for an episode or movie from a scene description.",
  robots: { index: false, follow: true },
};

const NotFound = () => {
  return (
    <div className="flex flex-col flex-1 items-center justify-center px-5 py-20">
      <div className="text-center max-w-md">
        <p className="font-serif text-6xl md:text-7xl text-accent mb-4">404</p>
        <h1 className="font-serif text-2xl md:text-3xl text-ink mb-3">
          This scene isn&apos;t in our library
        </h1>
        <p className="text-ink-muted text-sm leading-relaxed mb-8">
          The page you&apos;re looking for doesn&apos;t exist. But we can help you find the one you meant — just describe the scene.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-ink text-cream text-sm font-medium hover:bg-ink-light transition-colors"
          >
            Search for a scene
          </Link>
          <Link
            href="/trending"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-stone text-ink text-sm font-medium hover:bg-cream-dark transition-colors"
          >
            Browse trending
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
