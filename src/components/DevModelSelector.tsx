"use client";

import { useState, useEffect, useCallback } from "react";
import { getAIModelStats } from "@/server/actions";
import type { ModelPreference } from "@/lib/gemini";

type Stats = { proUsed: number; proLimit: number; flashUsed: number; flashLimit: number };

type DevModelSelectorProps = {
  value: ModelPreference;
  onChange: (pref: ModelPreference) => void;
  lastModel?: string;
};

const DevModelSelector = ({ value, onChange, lastModel }: DevModelSelectorProps) => {
  const [stats, setStats] = useState<Stats | null>(null);

  const refresh = useCallback(() => {
    getAIModelStats().then((s) => s && setStats(s));
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh, lastModel]);

  if (!stats) return null;

  const options: { value: ModelPreference; label: string }[] = [
    { value: "auto", label: "Auto" },
    { value: "pro", label: "Pro" },
    { value: "flash", label: "Flash" },
  ];

  const proPercent = Math.round((stats.proUsed / stats.proLimit) * 100);
  const flashPercent = Math.round((stats.flashUsed / stats.flashLimit) * 100);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 px-4 py-3 rounded-xl
                    bg-ink/90 text-cream text-[11px] font-mono shadow-lg backdrop-blur-sm min-w-[200px]">
      <div className="flex items-center justify-between">
        <span className="text-cream/50 text-[10px] uppercase tracking-wider">AI Model</span>
        {lastModel && (
          <span className="text-[9px] px-1.5 py-0.5 rounded bg-accent/30 text-accent">
            {lastModel}
          </span>
        )}
      </div>

      <div className="flex gap-1">
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={`flex-1 px-2 py-1 rounded-md transition-colors text-center ${
              value === opt.value
                ? "bg-accent text-cream"
                : "text-cream/60 hover:text-cream hover:bg-cream/10"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-1.5 mt-1">
        <div>
          <div className="flex justify-between text-[10px] mb-0.5">
            <span className="text-cream/70">Pro</span>
            <span className={proPercent >= 80 ? "text-rose-400" : "text-cream/50"}>
              {stats.proUsed}/{stats.proLimit}
            </span>
          </div>
          <div className="h-1 bg-cream/10 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${
                proPercent >= 80 ? "bg-rose-400" : "bg-emerald-400"
              }`}
              style={{ width: `${Math.min(proPercent, 100)}%` }}
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between text-[10px] mb-0.5">
            <span className="text-cream/70">Flash</span>
            <span className="text-cream/50">
              {stats.flashUsed}/{stats.flashLimit}
            </span>
          </div>
          <div className="h-1 bg-cream/10 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${
                flashPercent >= 80 ? "bg-rose-400" : "bg-emerald-400"
              }`}
              style={{ width: `${Math.min(flashPercent, 100)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DevModelSelector;
