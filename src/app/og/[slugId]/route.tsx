import { ImageResponse } from "next/og";
import { supabase } from "@/lib/supabase";
import { parseIdFromSlug } from "@/lib/slug";
import type { SearchResult, TmdbData } from "@/types";

export const runtime = "nodejs";

type CacheRow = {
  id: number;
  result: SearchResult;
  tmdb_data: TmdbData | null;
};

export const GET = async (
  req: Request,
  { params }: { params: Promise<{ slugId: string }> }
) => {
  const { slugId } = await params;
  const id = parseIdFromSlug(slugId);

  if (!id) {
    return new Response("Not found", { status: 404 });
  }

  const { data } = await supabase
    .from("search_cache")
    .select("id, result, tmdb_data")
    .eq("id", id)
    .maybeSingle();

  const row = data as CacheRow | null;
  if (!row || !row.result?.found) {
    return new Response("Not found", { status: 404 });
  }

  const { result, tmdb_data: tmdb } = row;
  const isEpisode = result.resultType === "episode";
  const isFilm = result.resultType === "film";

  const subtitle =
    isEpisode && result.seasonNumber && result.episodeNumber
      ? `Season ${result.seasonNumber} · Episode ${result.episodeNumber}${result.episodeTitle ? ` · ${result.episodeTitle}` : ""}`
      : isFilm && result.year
        ? `Movie · ${result.year}`
        : result.resultType === "series" && result.year
          ? `Series · ${result.year}`
          : "";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          background: "linear-gradient(135deg, #FAF8F5 0%, #F3F0EB 100%)",
          padding: "60px",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontSize: 20,
                color: "#8B7355",
                letterSpacing: 4,
                textTransform: "uppercase",
                marginBottom: 20,
              }}
            >
              Find My Episode
            </div>
            <div
              style={{
                fontSize: 72,
                fontWeight: 600,
                color: "#1A1917",
                lineHeight: 1.1,
                marginBottom: 16,
                maxWidth: 800,
              }}
            >
              {result.title}
            </div>
            {subtitle && (
              <div
                style={{
                  fontSize: 28,
                  color: "#6B6860",
                  marginBottom: 24,
                }}
              >
                {subtitle}
              </div>
            )}
            <div
              style={{
                fontSize: 22,
                color: "#3D3B37",
                lineHeight: 1.5,
                maxWidth: 780,
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {result.synopsis}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: 18,
              color: "#9C9890",
              letterSpacing: 2,
            }}
          >
            Describe a scene · Find the exact episode
          </div>
        </div>

        {tmdb?.posterUrl && (
          <div
            style={{
              display: "flex",
              marginLeft: 40,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={tmdb.posterUrl}
              alt={result.title}
              width={320}
              height={480}
              style={{
                borderRadius: 16,
                objectFit: "cover",
                boxShadow: "0 20px 60px rgba(26, 25, 23, 0.15)",
              }}
            />
          </div>
        )}
      </div>
    ),
    {
      width: 1200,
      height: 630,
      headers: {
        "Cache-Control": "public, max-age=86400, s-maxage=86400",
      },
    }
  );
};
