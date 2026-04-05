import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { I18nProvider } from "@/lib/i18n-context";
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

export const metadata: Metadata = {
  title: "Find My Episode — Describe a scene, find your episode",
  description:
    "Describe a scene from a TV show or movie and find the exact episode in seconds.",
  openGraph: {
    title: "Find My Episode",
    description:
      "Describe a scene from a TV show or movie and find the exact episode.",
    type: "website",
  },
};

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <html
      lang="fr"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
};

export default RootLayout;
