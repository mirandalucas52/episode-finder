"use client";

import { useI18n } from "@/lib/i18n-context";

const Footer = () => {
  const { t } = useI18n();

  return (
    <footer className="w-full py-10 px-6">
      <div className="max-w-2xl mx-auto flex flex-col items-center gap-5">
        <div className="h-px w-16 bg-stone-dark/50" />

        <p className="text-xs text-ink-subtle text-center leading-relaxed max-w-sm">
          {t("footer.coffee")}{" "}
          <a
            href="https://buymeacoffee.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:text-accent-dark transition-colors duration-200 font-medium"
          >
            buymeacoffee.com
          </a>
        </p>

        <p className="text-[11px] text-ink-subtle/60 tracking-wide">
          {t("footer.madeIn")}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
