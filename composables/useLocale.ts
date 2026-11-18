import { computed, ref, watchEffect } from 'vue'

export type Locale = 'ka' | 'en'
export type Category = 'artist' | 'lover'

const STORAGE_KEY = 'vibeart-locale'
const locale = ref<Locale>('ka')

if (typeof window !== 'undefined') {
  const saved = window.localStorage.getItem(STORAGE_KEY)
  if (saved === 'ka' || saved === 'en') locale.value = saved
}

watchEffect(() => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(STORAGE_KEY, locale.value)
  }
})

export const copy = {
  ka: {
    brand: 'VIBEART',
    brandSub: 'ხელოვანებისთვის',
    title: 'დაიკავე წინა რიგი',
    tagline: 'განაგრძე შექმნა. მიეცი სამყაროს აღმოჩენის საშუალება.',
    live: 'ცოცხალი',
    viewers: 'მაყურებელი',
    artist: 'ხელოვანი',
    lover: 'მოყვარული',
    pickRole: 'აირჩიე შენი ადგილი',
    email: 'ელფოსტა',
    emailPh: 'შენი@ელფოსტა.com',
    subscribe: 'გამოწერა',
    sending: '…',
    terms: 'პირობები',
    agree: 'ვეთანხმები',
    success: 'ადგილი შენია',
    errEmail: 'სწორი ელფოსტა',
    errRole: 'აირჩიე კატეგორია',
    errTerms: 'დაეთანხმე პირობებს',
    errDup: 'უკვე რეგისტრირებულია',
    errGeneric: 'სცადე თავიდან',
    stack: 'Vue · Slidev · Vite',
  },
  en: {
    brand: 'VIBEART',
    brandSub: 'for artists',
    title: 'Take a front-row seat',
    tagline: 'Keep creating. Let the world discover you.',
    live: 'LIVE',
    viewers: 'watching',
    artist: 'Artist',
    lover: 'Art lover',
    pickRole: 'Choose your seat',
    email: 'Email',
    emailPh: 'you@email.com',
    subscribe: 'Subscribe',
    sending: '…',
    terms: 'Terms',
    agree: 'I agree',
    success: 'Seat reserved',
    errEmail: 'Valid email needed',
    errRole: 'Pick a category',
    errTerms: 'Accept terms',
    errDup: 'Already registered',
    errGeneric: 'Try again',
    stack: 'Vue · Slidev · Vite',
  },
} as const

export function useLocale() {
  const t = computed(() => copy[locale.value])

  function setLocale(next: Locale) {
    locale.value = next
  }

  function toggle() {
    locale.value = locale.value === 'ka' ? 'en' : 'ka'
  }

  return { locale, t, setLocale, toggle }
}
