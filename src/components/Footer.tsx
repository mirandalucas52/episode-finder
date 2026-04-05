"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n-context";

const Footer = () => {
  const { t } = useI18n();

  return (
    <footer className="w-full py-12 px-6 border-t border-stone/30">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-serif text-base text-ink mb-3">Find My Episode</h3>
            <p className="text-xs text-ink-muted leading-relaxed">
              Describe any scene and find the exact TV episode or movie it comes from.
            </p>
          </div>
          <div>
            <h3 className="text-[11px] text-ink-subtle uppercase tracking-widest mb-3">Explore</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-xs text-ink-muted hover:text-accent transition-colors">
                  Search
                </Link>
              </li>
              <li>
                <Link href="/trending" className="text-xs text-ink-muted hover:text-accent transition-colors">
                  Trending
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="text-xs text-ink-muted hover:text-accent transition-colors">
                  How it works
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-xs text-ink-muted hover:text-accent transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-[11px] text-ink-subtle uppercase tracking-widest mb-3">Languages</h3>
            <ul className="space-y-2 text-xs text-ink-muted">
              <li>🇬🇧 English</li>
              <li>🇫🇷 Français</li>
              <li>🇪🇸 Español</li>
              <li>🇵🇹 Português</li>
            </ul>
          </div>
        </div>
        <div className="pt-6 border-t border-stone/30 flex items-center justify-between flex-wrap gap-3">
          <p className="text-[11px] text-ink-subtle/60 tracking-wide">{t("footer.madeIn")}</p>
          <p className="text-[11px] text-ink-subtle/60">
            © {new Date().getFullYear()} Find My Episode
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
