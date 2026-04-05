import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { buildResultSlug } from "@/lib/slug";
import { getServerT } from "@/lib/i18n-server";
import type { SearchResult, TmdbData } from "@/types";

type RelatedResultsProps = {
  currentId: number;
  mode: string;
};

type RelatedRow = {
  id: number;
  result: SearchResult;
  tmdb_data: TmdbData | null;
};

const RelatedResults = async ({ currentId, mode }: RelatedResultsProps) => {
  const { t } = await getServerT();

  const { data } = await supabase
    .from("search_cache")
    .select("id, result, tmdb_data")
    .eq("search_mode", mode)
    .neq("id", currentId)
    .order("hit_count", { ascending: false })
    .limit(6);

  const rows = (data as RelatedRow[] | null)?.filter((r) => r.result?.found) || [];

  if (rows.length === 0) return null;

  return (
    <section className="mt-12">
      <h2 className="text-xs font-medium text-ink-subtle uppercase tracking-widest mb-4">
        {t("related.title")}
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {rows.map((row) => {
          const r = row.result;
          const href = `/r/${buildResultSlug(r, row.id)}`;
          return (
            <Link
              key={row.id}
              href={href}
              className="group flex gap-3 p-3 rounded-xl bg-card border border-stone/60 hover:border-stone-dark transition-all"
            >
              {row.tmdb_data?.posterUrl ? (
                <div className="shrink-0 w-10 h-14 rounded-md overflow-hidden">
                  <Image
                    src={row.tmdb_data.posterUrl}
                    alt={r.title}
                    width={40}
                    height={56}
                    className="object-cover w-full h-full"
                    unoptimized
                  />
                </div>
              ) : (
                <div className="shrink-0 w-10 h-14 rounded-md bg-cream-dark flex items-center justify-center text-xs">
                  {r.resultType === "film" ? "🎬" : "📺"}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="font-serif text-sm text-ink line-clamp-2 leading-tight group-hover:text-accent transition-colors">
                  {r.title}
                </p>
                {r.resultType === "episode" && r.seasonNumber && r.episodeNumber && (
                  <p className="text-[10px] text-ink-subtle mt-0.5">
                    S{String(r.seasonNumber).padStart(2, "0")}E{String(r.episodeNumber).padStart(2, "0")}
                  </p>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default RelatedResults;
