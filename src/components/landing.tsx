"use client";

import { useEffect, useState } from "react";
import { LanguageToggle } from "@/components/language-toggle";
import { SubscribeForm } from "@/components/subscribe-form";
import { copy, type Locale } from "@/lib/i18n";

const STORAGE_KEY = "vibeart-locale";

export function Landing() {
  const [locale, setLocale] = useState<Locale>("ka");
  const [ready, setReady] = useState(false);
  const t = copy[locale];

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "ka" || saved === "en") {
      setLocale(saved);
    }
    setReady(true);
  }, []);

  function changeLocale(next: Locale) {
    setLocale(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }

  return (
    <main className="relative h-dvh w-full overflow-hidden text-[#E8EEE9]">
      <div className="stage-atmosphere" aria-hidden />
      <div className="stage-spotlight" aria-hidden />
      <div className="stage-grain" aria-hidden />
      <div className="stage-orb stage-orb-a" aria-hidden />
      <div className="stage-orb stage-orb-b" aria-hidden />

      <div className="relative z-10 flex h-full flex-col px-5 pt-[max(1.25rem,env(safe-area-inset-top))] pb-[max(1rem,env(safe-area-inset-bottom))] sm:px-8">
        <header className="flex items-start justify-between gap-4">
          <div
            className={`reveal ${ready ? "reveal-in" : ""}`}
            style={{ transitionDelay: "40ms" }}
          >
            <p className="font-display text-xl tracking-[0.22em] text-[#F5F8F5] uppercase sm:text-2xl">
              {t.brand}
            </p>
            <p className="mt-1 text-[11px] tracking-[0.2em] text-[#8FA89A] uppercase">
              {t.brandSub}
            </p>
          </div>
          <div
            className={`reveal ${ready ? "reveal-in" : ""}`}
            style={{ transitionDelay: "120ms" }}
          >
            <LanguageToggle locale={locale} onChange={changeLocale} />
          </div>
        </header>

        <section className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center text-center">
          <div
            key={locale}
            className={`reveal reveal-in w-full transition-opacity`}
          >
            <h1 className="font-display mx-auto max-w-[16ch] text-[clamp(1.85rem,5.2vw,3.35rem)] leading-[1.12] tracking-tight text-[#F4F7F4] text-balance">
              {t.title}
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-[clamp(0.92rem,2.1vw,1.08rem)] leading-relaxed text-[#A8B5AF] italic">
              {t.tagline}
            </p>
          </div>

          <div
            className={`reveal mt-8 w-full sm:mt-10 ${ready ? "reveal-in" : ""}`}
            style={{ transitionDelay: "220ms" }}
          >
            <div className="mx-auto flex justify-center">
              <SubscribeForm locale={locale} />
            </div>
          </div>
        </section>

        <footer
          className={`reveal pb-1 text-center ${ready ? "reveal-in" : ""}`}
          style={{ transitionDelay: "320ms" }}
        >
          <p className="text-[11px] tracking-[0.14em] text-white/35 uppercase">
            {t.footerHint}
          </p>
        </footer>
      </div>
    </main>
  );
}
