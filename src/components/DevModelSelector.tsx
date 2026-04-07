"use client";

import { useState, useEffect } from "react";
import { getAIModelStats } from "@/server/actions";
import type { ModelPreference } from "@/lib/gemini";

type DevModelSelectorProps = {
  value: ModelPreference;
  onChange: (pref: ModelPreference) => void;
};

const DevModelSelector = ({ value, onChange }: DevModelSelectorProps) => {
  const [stats, setStats] = useState<{ proUsed: number; proLimit: number } | null>(null);

  useEffect(() => {
    getAIModelStats().then(setStats);
  }, []);

  if (!stats) return null;

  const options: { value: ModelPreference; label: string }[] = [
    { value: "auto", label: "Auto" },
    { value: "pro", label: "Pro" },
    { value: "flash", label: "Flash" },
  ];

  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 px-3 py-2 rounded-xl
                    bg-ink/90 text-cream text-[11px] font-mono shadow-lg backdrop-blur-sm">
      <span className="text-cream/50">AI:</span>
      <div className="flex gap-1">
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={`px-2 py-0.5 rounded-md transition-colors ${
              value === opt.value
                ? "bg-accent text-cream"
                : "text-cream/60 hover:text-cream hover:bg-cream/10"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
      <span className="text-cream/40 ml-1">
        {stats.proUsed}/{stats.proLimit}
      </span>
    </div>
  );
};

export default DevModelSelector;
