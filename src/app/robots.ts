import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://episode-finder.vercel.app";

const robots = (): MetadataRoute.Robots => {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/og/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
};

export default robots;
