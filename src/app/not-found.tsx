import type { Metadata } from "next";
import Link from "next/link";
import { getServerT } from "@/lib/i18n-server";

export const metadata: Metadata = {
  title: "Page not found — Find My Episode",
  robots: { index: false, follow: true },
};

const NotFound = async () => {
  const { t } = await getServerT();

  return (
    <div className="flex flex-col flex-1 items-center justify-center px-5 py-20">
      <div className="text-center max-w-md">
        <p className="font-serif text-6xl md:text-7xl text-accent mb-4">404</p>
        <h1 className="font-serif text-2xl md:text-3xl text-ink mb-3">{t("notFound.title")}</h1>
        <p className="text-ink-muted text-sm leading-relaxed mb-8">{t("notFound.text")}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-ink text-cream text-sm font-medium hover:bg-ink-light transition-colors"
          >
            {t("notFound.search")}
          </Link>
          <Link
            href="/trending"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-stone text-ink text-sm font-medium hover:bg-cream-dark transition-colors"
          >
            {t("notFound.browse")}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
