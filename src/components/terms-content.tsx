"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { Locale } from "@/lib/i18n";

const content = {
  ka: {
    title: "გამოყენების პირობები",
    updated: "განახლებულია: 2026 წლის 18 ნოემბერი",
    back: "← უკან",
    sections: [
      {
        heading: "1. რა არის ეს",
        body: "VIBEART ამ ეტაპზე აგროვებს ადრეული ინტერესის სიას (waitlist) მომავალი პლატფორმისთვის — ცოცხალი შემოქმედებითი სივრცისთვის, რომელიც განკუთვნილია ხელოვანებისა და ხელოვნების მოყვარულებისთვის. გამოწერა არ ქმნის ფასიან მომსახურებას და არ იძლევა გარანტიას კონკრეტულ ფუნქციებზე.",
      },
      {
        heading: "2. რა მონაცემებს ვაგროვებთ",
        body: "გამოწერისას ვინახავთ ელფოსტას, არჩეულ კატეგორიას (ხელოვანი ან ხელოვნების მოყვარული), ენის არჩევანს და რეგისტრაციის დროს. ეს მონაცემები გამოიყენება მხოლოდ market research-ისთვის და განახლებების გასაგზავნად.",
      },
      {
        heading: "3. კომუნიკაცია",
        body: "შეგიძლია მიიღო იშვიათი ელფოსტები პროდუქტის განვითარების, გაშვების თარიღებისა და ადრეული წვდომის შესახებ. ნებისმიერ დროს შეგიძლია გამოწერის გაუქმება მოთხოვნით იმავე მისამართზე, საიდანაც მოგწერთ.",
      },
      {
        heading: "4. შენახვა და უსაფრთხოება",
        body: "მონაცემებს ვინახავთ გონივრული დაცვით. სერვისის განვითარებისას შესაძლოა გადავიდეთ უფრო მდგრად საცავზე ან ელფოსტის პროვაიდერზე. მესამე მხარეებს არ ვყიდით შენს ელფოსტას.",
      },
      {
        heading: "5. ცვლილებები",
        body: "პლატფორმის გაშვებამდე ეს პირობები შეიძლება განახლდეს. მნიშვნელოვანი ცვლილებების შემთხვევაში შეგატყობინებთ ელფოსტით ან საიტზე.",
      },
      {
        heading: "6. კონტაქტი",
        body: "კითხვებისთვის ან მონაცემების წაშლის მოთხოვნისთვის მოგვწერე მოგვიანებით მითითებულ საკონტაქტო მეილზე. დომენი და საკონტაქტო მისამართი დაემატება გაშვებისას.",
      },
    ],
  },
  en: {
    title: "Terms of Use",
    updated: "Last updated: November 18, 2026",
    back: "← Back",
    sections: [
      {
        heading: "1. What this is",
        body: "VIBEART is currently collecting an early-interest waitlist for a future platform — a live creative space built for artists and art lovers. Subscribing does not create a paid service and does not guarantee specific features.",
      },
      {
        heading: "2. Data we collect",
        body: "When you subscribe, we store your email, selected category (artist or art lover), language preference, and registration time. This data is used only for market research and product updates.",
      },
      {
        heading: "3. Communication",
        body: "You may receive occasional emails about product progress, launch timing, and early access. You can unsubscribe at any time by replying to the address we contact you from.",
      },
      {
        heading: "4. Storage and security",
        body: "We keep waitlist data with reasonable care. As the service grows, we may move to a more durable database or email provider. We do not sell your email to third parties.",
      },
      {
        heading: "5. Changes",
        body: "These terms may be updated before launch. If changes are material, we will notify you by email or on the site.",
      },
      {
        heading: "6. Contact",
        body: "For questions or deletion requests, email the contact address we publish later. Domain and contact email will be added as we ship.",
      },
    ],
  },
} as const;

export function TermsContent() {
  const searchParams = useSearchParams();
  const locale: Locale = searchParams.get("lang") === "en" ? "en" : "ka";
  const t = content[locale];

  return (
    <main className="min-h-dvh overflow-y-auto bg-[#0c0f0e] px-5 py-10 text-[#E8EEE9] sm:px-8">
      <div className="mx-auto w-full max-w-2xl">
        <Link
          href="/"
          className="text-sm text-[#A8C5B5] transition-colors hover:text-[#D7E4DC]"
        >
          {t.back}
        </Link>
        <h1 className="font-display mt-8 text-3xl tracking-tight sm:text-4xl">
          {t.title}
        </h1>
        <p className="mt-2 text-sm text-[#8FA89A]">{t.updated}</p>
        <div className="mt-10 space-y-8">
          {t.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-lg font-medium text-[#F2F5F2]">
                {section.heading}
              </h2>
              <p className="mt-2 text-[15px] leading-relaxed text-[#A8B5AF]">
                {section.body}
              </p>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
