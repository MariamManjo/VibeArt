"use client";

import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n";

type LanguageToggleProps = {
  locale: Locale;
  onChange: (locale: Locale) => void;
};

export function LanguageToggle({ locale, onChange }: LanguageToggleProps) {
  return (
    <div
      className="inline-flex items-center gap-0.5 rounded-full border border-white/15 bg-black/25 p-1 backdrop-blur-md"
      role="group"
      aria-label="Language"
    >
      {(["ka", "en"] as const).map((code) => {
        const active = locale === code;
        return (
          <button
            key={code}
            type="button"
            onClick={() => onChange(code)}
            className={cn(
              "relative rounded-full px-3 py-1.5 text-[11px] font-medium tracking-[0.14em] uppercase transition-all duration-300",
              active
                ? "bg-white/90 text-[#121614] shadow-[0_0_24px_rgba(168,197,181,0.25)]"
                : "text-white/55 hover:text-white/85"
            )}
            aria-pressed={active}
          >
            {code === "ka" ? "ქარ" : "EN"}
          </button>
        );
      })}
    </div>
  );
}
