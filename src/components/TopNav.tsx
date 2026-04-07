"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n-context";

const TopNav = () => {
  const { t } = useI18n();

  return (
    <nav className="hidden md:flex items-center gap-1 text-xs">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-ink-muted hover:bg-cream-dark border border-transparent hover:border-stone/40 transition-all duration-200 font-medium"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
        {t("nav.home")}
      </Link>
      <Link
        href="/trending"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-ink-muted hover:bg-cream-dark border border-transparent hover:border-stone/40 transition-all duration-200"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
          <polyline points="17 6 23 6 23 12" />
        </svg>
        {t("nav.trending")}
      </Link>
      <Link
        href="/how-it-works"
        className="px-3 py-1.5 rounded-lg text-ink-muted hover:bg-cream-dark border border-transparent hover:border-stone/40 transition-all duration-200"
      >
        {t("nav.howItWorks")}
      </Link>
      <Link
        href="/faq"
        className="px-3 py-1.5 rounded-lg text-ink-muted hover:bg-cream-dark border border-transparent hover:border-stone/40 transition-all duration-200"
      >
        {t("nav.faq")}
      </Link>
      <Link
        href="/stats"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-ink-muted hover:bg-cream-dark border border-transparent hover:border-stone/40 transition-all duration-200"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8" />
          <path d="M4 16s1-1 4-1 5 2 8 2 4-1 4-1" />
          <circle cx="12" cy="7" r="4" />
        </svg>
        {t("nav.stats")}
      </Link>
    </nav>
  );
};

export default TopNav;
