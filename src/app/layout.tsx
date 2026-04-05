import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
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
    default: "Find My Episode — Describe a scene, find your episode",
    template: "%s · Find My Episode",
  },
  description:
    "Describe a scene from a TV show or movie and find the exact episode in seconds.",
  keywords: [
    "find episode",
    "what episode",
    "tv show finder",
    "movie finder",
    "scene search",
    "episode search",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Find My Episode",
    description:
      "Describe a scene from a TV show or movie and find the exact episode.",
    url: "/",
    siteName: "Find My Episode",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Find My Episode",
    description: "Describe a scene, find your episode",
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

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <html
      lang="fr"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <I18nProvider>{children}</I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
