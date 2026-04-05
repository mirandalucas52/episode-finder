import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { buildResultSlug } from "@/lib/slug";
import type { SearchResult, TmdbData } from "@/types";

export const metadata: Metadata = {
  title: "Trending Searches — Find My Episode",
  description:
    "Discover the most popular TV episodes, movies, and scenes being identified by our community. Browse trending results from real user searches.",
  alternates: { canonical: "/trending" },
  openGraph: {
    title: "Trending Searches — Find My Episode",
    description: "Discover the most popular TV episodes and movies being identified right now.",
    url: "/trending",
  },
};

type TrendingRow = {
  id: number;
  result: SearchResult;
  tmdb_data: TmdbData | null;
  hit_count: number;
  created_at: string;
};

export const revalidate = 3600;

const TrendingPage = async () => {
  const { data: allTime } = await supabase
    .from("search_cache")
    .select("id, result, tmdb_data, hit_count, created_at")
    .order("hit_count", { ascending: false })
    .limit(24);

  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
  const { data: recent } = await supabase
    .from("search_cache")
    .select("id, result, tmdb_data, hit_count, created_at")
    .gte("created_at", weekAgo)
    .order("hit_count", { ascending: false })
    .limit(12);

  const renderCard = (row: TrendingRow) => {
    if (!row.result?.found) return null;
    const r = row.result;
    const href = `/r/${buildResultSlug(r, row.id)}`;
    const subtitle =
      r.resultType === "episode" && r.seasonNumber && r.episodeNumber
        ? `S${String(r.seasonNumber).padStart(2, "0")}E${String(r.episodeNumber).padStart(2, "0")}`
        : r.resultType === "film" && r.year
          ? `Movie · ${r.year}`
          : r.resultType === "series" && r.year
            ? `Series · ${r.year}`
            : "";

    return (
      <Link
        key={row.id}
        href={href}
        className="group flex gap-3 p-3 rounded-xl bg-white border border-stone/60 hover:border-stone-dark hover:shadow-[0_4px_20px_rgba(26,25,23,0.04)] transition-all"
      >
        {row.tmdb_data?.posterUrl ? (
          <div className="shrink-0 w-14 h-20 rounded-md overflow-hidden">
            <Image
              src={row.tmdb_data.posterUrl}
              alt={r.title}
              width={56}
              height={80}
              className="object-cover w-full h-full"
              unoptimized
            />
          </div>
        ) : (
          <div className="shrink-0 w-14 h-20 rounded-md bg-cream-dark flex items-center justify-center text-accent text-xl">
            {r.resultType === "film" ? "🎬" : r.resultType === "series" ? "📺" : "🎯"}
          </div>
        )}
        <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
          <div>
            <h3 className="font-serif text-sm text-ink leading-tight line-clamp-2 group-hover:text-accent transition-colors">
              {r.title}
            </h3>
            {subtitle && (
              <p className="text-[11px] text-ink-subtle mt-1 tracking-wide">{subtitle}</p>
            )}
          </div>
          <p className="text-[10px] text-ink-subtle/70 uppercase tracking-widest">
            {row.hit_count} {row.hit_count > 1 ? "searches" : "search"}
          </p>
        </div>
      </Link>
    );
  };

  return (
    <div className="flex flex-col flex-1 items-center">
      <main className="w-full max-w-4xl px-5 md:px-8 pt-20 md:pt-28 pb-16">
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
            Trending <span className="text-accent">searches</span>
          </h1>
          <p className="mt-4 text-ink-muted text-base max-w-xl mx-auto">
            The most popular TV episodes, movies, and scenes being identified right now by our community.
          </p>
        </header>

        {recent && recent.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xs font-medium text-ink-subtle uppercase tracking-widest mb-4">
              Popular this week
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {(recent as TrendingRow[]).map(renderCard)}
            </div>
          </section>
        )}

        <section>
          <h2 className="text-xs font-medium text-ink-subtle uppercase tracking-widest mb-4">
            All-time favorites
          </h2>
          {allTime && allTime.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {(allTime as TrendingRow[]).map(renderCard)}
            </div>
          ) : (
            <p className="text-sm text-ink-subtle text-center py-12">
              No searches yet. Be the first to{" "}
              <Link href="/" className="text-accent underline underline-offset-4">
                find an episode
              </Link>
              .
            </p>
          )}
        </section>
      </main>
    </div>
  );
};

export default TrendingPage;
