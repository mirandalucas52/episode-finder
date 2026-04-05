import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { parseIdFromSlug, buildResultSlug } from "@/lib/slug";
import TrailerEmbed from "@/components/TrailerEmbed";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedResults from "@/components/RelatedResults";
import { getServerT } from "@/lib/i18n-server";
import type { SearchResult, TmdbData } from "@/types";

type PageProps = {
  params: Promise<{ slugId: string }>;
};

type CacheRow = {
  id: number;
  original_query: string;
  result: SearchResult;
  tmdb_data: TmdbData | null;
  search_mode: string;
  hit_count: number;
  created_at: string;
};

const fetchResultById = async (id: number): Promise<CacheRow | null> => {
  const { data } = await supabase
    .from("search_cache")
    .select("id, original_query, result, tmdb_data, search_mode, hit_count, created_at")
    .eq("id", id)
    .maybeSingle();
  return data as CacheRow | null;
};

export const generateMetadata = async ({ params }: PageProps): Promise<Metadata> => {
  const { slugId } = await params;
  const id = parseIdFromSlug(slugId);
  if (!id) return { title: "Not found" };

  const row = await fetchResultById(id);
  if (!row || !row.result.found) return { title: "Not found" };

  const { result } = row;
  const canonicalSlug = buildResultSlug(result, row.id);
  const canonicalUrl = `/r/${canonicalSlug}`;

  const titleLine =
    result.resultType === "episode" && result.seasonNumber && result.episodeNumber
      ? `${result.title} — S${String(result.seasonNumber).padStart(2, "0")}E${String(result.episodeNumber).padStart(2, "0")}`
      : result.resultType === "film" && result.year
        ? `${result.title} (${result.year})`
        : result.title;

  const description = result.synopsis.slice(0, 160);
  const ogImageUrl = `/og/${slugId}`;

  return {
    title: `${titleLine} · Find My Episode`,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: titleLine,
      description,
      url: canonicalUrl,
      type: "article",
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: titleLine }],
    },
    twitter: {
      card: "summary_large_image",
      title: titleLine,
      description,
      images: [ogImageUrl],
    },
  };
};

const ResultPage = async ({ params }: PageProps) => {
  const { slugId } = await params;
  const id = parseIdFromSlug(slugId);
  if (!id) notFound();

  const row = await fetchResultById(id);
  if (!row || !row.result.found) notFound();

  const { t } = await getServerT();
  const { result, tmdb_data: tmdb } = row;
  const isEpisode = result.resultType === "episode";
  const isFilm = result.resultType === "film";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": isFilm ? "Movie" : isEpisode ? "TVEpisode" : "TVSeries",
    name: result.title,
    description: result.synopsis,
    ...(isFilm && result.year && { datePublished: result.year }),
    ...(isEpisode && {
      episodeNumber: result.episodeNumber,
      partOfSeason: { "@type": "TVSeason", seasonNumber: result.seasonNumber },
      partOfSeries: { "@type": "TVSeries", name: result.title },
    }),
    ...(tmdb?.posterUrl && { image: tmdb.posterUrl }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="flex flex-col flex-1 items-center">
        <main className="flex flex-col items-center w-full flex-1 px-5 md:px-8 pt-20 md:pt-28 pb-16">
          <div className="w-full max-w-2xl">
            <Breadcrumbs
              items={[
                { label: t("nav.home"), href: "/" },
                { label: t("nav.trending"), href: "/trending" },
                { label: result.title },
              ]}
            />

            <article className="rounded-2xl bg-card border border-stone/60 overflow-hidden shadow-[0_2px_16px_rgba(26,25,23,0.04)]">
              {tmdb?.stillUrl && isEpisode && (
                <div className="relative w-full aspect-video overflow-hidden">
                  <Image
                    src={tmdb.stillUrl}
                    alt={`${result.title} - ${result.episodeTitle || ""}`}
                    fill
                    className="object-cover"
                    unoptimized
                    priority
                  />
                </div>
              )}

              <div className="flex gap-6 p-8 md:p-10">
                {tmdb?.posterUrl && (
                  <div className="hidden md:block shrink-0">
                    <Image
                      src={tmdb.posterUrl}
                      alt={result.title}
                      width={140}
                      height={210}
                      className="rounded-xl shadow-[0_4px_20px_rgba(26,25,23,0.1)]"
                      unoptimized
                    />
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <h1 className="font-serif text-3xl md:text-4xl text-ink tracking-tight">
                    {result.title}
                  </h1>

                  <p className="mt-2 text-ink-muted text-sm tracking-wide">
                    {isFilm && result.year && `${t("result.film")} · ${result.year}`}
                    {result.resultType === "series" && result.year && `${t("result.series")} · ${result.year}`}
                    {isEpisode && result.episodeTitle}
                  </p>

                  {isEpisode && result.seasonNumber && result.episodeNumber && (
                    <div className="mt-4 inline-flex items-center px-3 py-1.5 rounded-lg bg-accent/10 border border-accent/20">
                      <span className="text-sm font-serif font-semibold text-accent tracking-wide">
                        S{String(result.seasonNumber).padStart(2, "0")}E{String(result.episodeNumber).padStart(2, "0")}
                      </span>
                    </div>
                  )}

                  <div className="mt-6 space-y-4">
                    <div>
                      <h2 className="text-xs font-medium text-ink-subtle uppercase tracking-widest mb-2">
                        {t("resultPage.synopsis")}
                      </h2>
                      <p className="text-ink-light text-sm leading-relaxed">
                        {result.synopsis}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-stone/40">
                      <h2 className="text-xs font-medium text-ink-subtle uppercase tracking-widest mb-2">
                        {t("resultPage.whyThis")}
                      </h2>
                      <p className="text-ink-light text-sm leading-relaxed">
                        {result.explanation}
                      </p>
                    </div>

                    {tmdb?.trailerKey && (
                      <TrailerEmbed youtubeKey={tmdb.trailerKey} title={result.title} />
                    )}
                  </div>
                </div>
              </div>
            </article>

            <RelatedResults currentId={row.id} mode={row.search_mode} />

            <div className="mt-10 text-center">
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-ink text-cream text-sm font-medium hover:bg-ink-light transition-colors"
              >
                {t("resultPage.searchAnother")}
              </Link>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export const revalidate = 3600;

export default ResultPage;
