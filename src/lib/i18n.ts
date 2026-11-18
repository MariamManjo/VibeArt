export type Locale = "ka" | "en";
export type Category = "artist" | "lover";

export const copy = {
  ka: {
    brand: "VIBEART",
    brandSub: "ხელოვანებისთვის",
    title: "დარეგისტრირდი და დაიკავე წინა რიგი",
    tagline:
      "განაგრძე შექმნა, განაგრძე რწმენა და მიეცი სამყაროს საშუალება აღმოგაჩინოს.",
    emailLabel: "ელფოსტა",
    emailPlaceholder: "შენი@ელფოსტა.com",
    categoryLabel: "ვინ ხარ?",
    artist: "ხელოვანი",
    lover: "ხელოვნების მოყვარული",
    subscribe: "გამოწერა",
    subscribing: "იგზავნება…",
    termsPrefix: "ვეთანხმები",
    termsLink: "გამოყენების პირობებს",
    successTitle: "ადგილი დაჯავშნილია",
    successBody: "მალე მოგწერთ. დარჩი წინა რიგში.",
    errorGeneric: "რაღაც შეცდომა მოხდა. სცადე თავიდან.",
    errorEmail: "შეიყვანე სწორი ელფოსტა.",
    errorCategory: "აირჩიე კატეგორია.",
    errorTerms: "დაეთანხმე პირობებს გასაგრძელებლად.",
    errorDuplicate: "ეს ელფოსტა უკვე დარეგისტრირებულია.",
    footerHint: "მალე — ცოცხალი პლატფორმა მხოლოდ ხელოვანებისთვის.",
  },
  en: {
    brand: "VIBEART",
    brandSub: "for artists",
    title: "Register and take a front-row seat",
    tagline:
      "Keep creating, keep believing, and let the world discover what you have to offer.",
    emailLabel: "Email",
    emailPlaceholder: "you@email.com",
    categoryLabel: "Who are you?",
    artist: "Artist",
    lover: "Art lover",
    subscribe: "Subscribe",
    subscribing: "Sending…",
    termsPrefix: "I agree to the",
    termsLink: "Terms of Use",
    successTitle: "Your seat is reserved",
    successBody: "We'll be in touch soon. Stay front row.",
    errorGeneric: "Something went wrong. Please try again.",
    errorEmail: "Enter a valid email.",
    errorCategory: "Choose a category.",
    errorTerms: "Agree to the terms to continue.",
    errorDuplicate: "This email is already registered.",
    footerHint: "Coming soon — a live platform built only for artists.",
  },
} as const;

export type Copy = (typeof copy)[Locale];
