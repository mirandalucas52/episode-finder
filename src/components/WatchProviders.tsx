"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useI18n } from "@/lib/i18n-context";
import type { WatchProvider } from "@/types";

type WatchProvidersProps = {
  providers: WatchProvider[];
};

const WatchProviders = ({ providers }: WatchProvidersProps) => {
  const { t } = useI18n();

  if (providers.length === 0) return null;

  const grouped = providers.reduce(
    (acc, p) => {
      if (!acc[p.type]) acc[p.type] = [];
      acc[p.type].push(p);
      return acc;
    },
    {} as Record<string, WatchProvider[]>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="pt-4 border-t border-stone/40"
    >
      <h3 className="text-xs font-medium text-ink-subtle uppercase tracking-widest mb-3">
        {t("watch.title")}
      </h3>
      <div className="space-y-3">
        {Object.entries(grouped).map(([type, items]) => (
          <div key={type}>
            <p className="text-[11px] text-ink-subtle mb-1.5">
              {t(`watch.${type}`)}
            </p>
            <div className="flex flex-wrap gap-2">
              {items.map((provider) => (
                <a
                  key={provider.name}
                  href={provider.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 px-3 py-1.5 rounded-lg border border-stone/60
                             hover:border-stone-dark hover:bg-cream-dark transition-all duration-200"
                >
                  <Image
                    src={provider.logoUrl}
                    alt={provider.name}
                    width={20}
                    height={20}
                    className="rounded"
                    unoptimized
                  />
                  <span className="text-xs text-ink-muted group-hover:text-ink transition-colors">
                    {provider.name}
                  </span>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default WatchProviders;
