import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { I18nProvider } from "@/lib/i18n-context";
import { ThemeProvider } from "@/lib/theme-context";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://episode-finder.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Find My Episode — Describe a scene, find the movie, series or episode",
    template: "%s · Find My Episode",
  },
  description:
    "Describe a scene from memory and find the exact movie, TV series, or episode in seconds.",
  keywords: [
    "find movie from scene",
    "find episode from scene",
    "what movie is this",
    "what episode is this",
    "tv show finder",
    "movie finder",
    "scene search",
    "episode search",
    "identify movie",
    "identify series",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Find My Episode",
    description:
      "Describe a scene from memory and find the exact movie, TV series, or episode.",
    url: "/",
    siteName: "Find My Episode",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Find My Episode",
    description: "Describe a scene, find the movie, series or episode",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Find My Episode",
  url: SITE_URL,
  description: "Describe a scene from memory and find the exact movie, TV series, or episode in seconds.",
  inLanguage: ["en", "fr", "es", "pt"],
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Find My Episode",
  url: SITE_URL,
  applicationCategory: "EntertainmentApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <I18nProvider>{children}</I18nProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
};

export default RootLayout;
