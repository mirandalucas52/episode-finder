import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
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
  title: "Retrouve mon épisode — Décris une scène, retrouve ton épisode",
  description:
    "Décrivez une scène de série ou de film et laissez l'IA retrouver l'épisode exact pour vous.",
  openGraph: {
    title: "Retrouve mon épisode",
    description:
      "Décrivez une scène de série ou de film et laissez l'IA retrouver l'épisode exact.",
    type: "website",
  },
};

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <html
      lang="fr"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
};

export default RootLayout;
