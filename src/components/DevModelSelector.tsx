"use client";

import { useState, useEffect, useCallback } from "react";
import { getAIModelStats } from "@/server/actions";

type Stats = { flashUsed: number; flashLimit: number };

const DevModelSelector = ({ lastModel }: { lastModel?: string }) => {
  const [stats, setStats] = useState<Stats | null>(null);

  const refresh = useCallback(() => {
    getAIModelStats().then((s) => s && setStats(s));
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh, lastModel]);

  if (!stats) return null;

  const percent = Math.round((stats.flashUsed / stats.flashLimit) * 100);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 px-4 py-3 rounded-xl
                    bg-ink/90 text-cream text-[11px] font-mono shadow-lg backdrop-blur-sm min-w-[180px]">
      <div className="flex items-center justify-between">
        <span className="text-cream/50 text-[10px] uppercase tracking-wider">Gemini Flash</span>
        {lastModel && (
          <span className="text-[9px] px-1.5 py-0.5 rounded bg-accent/30 text-accent">
            {lastModel}
          </span>
        )}
      </div>

      <div>
        <div className="flex justify-between text-[10px] mb-0.5">
          <span className="text-cream/70">Requests</span>
          <span className={percent >= 80 ? "text-rose-400" : "text-cream/50"}>
            {stats.flashUsed}/{stats.flashLimit}
          </span>
        </div>
        <div className="h-1 bg-cream/10 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all ${
              percent >= 80 ? "bg-rose-400" : "bg-emerald-400"
            }`}
            style={{ width: `${Math.min(percent, 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default DevModelSelector;
