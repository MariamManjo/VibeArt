"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { copy, type Category, type Locale } from "@/lib/i18n";

type SubscribeFormProps = {
  locale: Locale;
};

export function SubscribeForm({ locale }: SubscribeFormProps) {
  const t = copy[locale];
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState<Category | null>(null);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [pending, startTransition] = useTransition();

  function mapError(code: string | undefined) {
    switch (code) {
      case "invalid_email":
        return t.errorEmail;
      case "invalid_category":
        return t.errorCategory;
      case "terms_required":
        return t.errorTerms;
      case "duplicate":
        return t.errorDuplicate;
      default:
        return t.errorGeneric;
    }
  }

  function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);

    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError(t.errorEmail);
      return;
    }
    if (!category) {
      setError(t.errorCategory);
      return;
    }
    if (!termsAccepted) {
      setError(t.errorTerms);
      return;
    }

    startTransition(async () => {
      try {
        const res = await fetch("/api/subscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            category,
            locale,
            termsAccepted,
          }),
        });
        const data = (await res.json()) as { error?: string };

        if (!res.ok) {
          setError(mapError(data.error));
          return;
        }
        setDone(true);
      } catch {
        setError(t.errorGeneric);
      }
    });
  }

  if (done) {
    return (
      <div className="success-pop flex w-full max-w-md flex-col items-center text-center">
        <p className="font-display text-2xl tracking-tight text-[#F4F6F4] sm:text-3xl">
          {t.successTitle}
        </p>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-[#A8B3AE]">
          {t.successBody}
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="flex w-full max-w-md flex-col gap-5"
      noValidate
    >
      <div className="space-y-2">
        <label
          htmlFor="email"
          className="block text-[11px] font-medium tracking-[0.16em] text-[#9AA8A1] uppercase"
        >
          {t.emailLabel}
        </label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          placeholder={t.emailPlaceholder}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-12 rounded-xl border-white/15 bg-white/[0.04] px-4 text-base text-[#F2F5F2] placeholder:text-white/30 focus-visible:border-[#A8C5B5]/60 focus-visible:ring-[#A8C5B5]/25"
          aria-invalid={Boolean(error && error === t.errorEmail)}
        />
      </div>

      <div className="space-y-2">
        <p className="text-[11px] font-medium tracking-[0.16em] text-[#9AA8A1] uppercase">
          {t.categoryLabel}
        </p>
        <div className="grid grid-cols-2 gap-2">
          {(
            [
              { id: "artist", label: t.artist },
              { id: "lover", label: t.lover },
            ] as const
          ).map((option) => {
            const selected = category === option.id;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => setCategory(option.id)}
                className={cn(
                  "h-12 rounded-xl border px-3 text-sm transition-all duration-300",
                  selected
                    ? "border-[#A8C5B5]/55 bg-[#A8C5B5]/15 text-[#F4F7F4] shadow-[0_0_28px_rgba(168,197,181,0.12)]"
                    : "border-white/12 bg-white/[0.03] text-white/70 hover:border-white/25 hover:text-white"
                )}
                aria-pressed={selected}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>

      <label className="flex items-start gap-3 text-sm leading-snug text-[#A0ADA7]">
        <Checkbox
          checked={termsAccepted}
          onCheckedChange={(value) => setTermsAccepted(value === true)}
          className="mt-0.5 border-white/25 data-[state=checked]:border-[#A8C5B5] data-[state=checked]:bg-[#A8C5B5] data-[state=checked]:text-[#121614]"
        />
        <span>
          {t.termsPrefix}{" "}
          <Link
            href={`/terms?lang=${locale}`}
            className="underline decoration-white/25 underline-offset-4 transition-colors hover:text-[#D7E4DC] hover:decoration-[#A8C5B5]/70"
          >
            {t.termsLink}
          </Link>
        </span>
      </label>

      {error ? (
        <p className="text-sm text-[#E8A090]" role="alert">
          {error}
        </p>
      ) : null}

      <Button
        type="submit"
        disabled={pending}
        size="lg"
        className="h-12 rounded-xl border-0 bg-[#E8EEE9] text-[13px] font-semibold tracking-[0.12em] text-[#121614] uppercase shadow-[0_10px_40px_rgba(168,197,181,0.18)] transition-all duration-300 hover:bg-white hover:shadow-[0_14px_48px_rgba(168,197,181,0.28)]"
      >
        {pending ? t.subscribing : t.subscribe}
      </Button>
    </form>
  );
}
