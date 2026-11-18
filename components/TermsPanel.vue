<script setup lang="ts">
import { computed } from 'vue'
import { useLocale } from '../composables/useLocale'

const { locale } = useLocale()

const content = computed(() =>
  locale.value === 'ka'
    ? {
        title: 'პირობები',
        points: [
          'Waitlist — market research მომავალი ხელოვანების live პლატფორმისთვის.',
          'ვინახავთ ელფოსტას, კატეგორიას და ენას.',
          'არ ვყიდით მეილებს. გაუქმება — მოთხოვნით.',
          'საკონტაქტო მეილი და დომენი დაემატება გზაში.',
        ],
      }
    : {
        title: 'Terms',
        points: [
          'Waitlist for market research on a live platform for artists.',
          'We store email, category, and language.',
          'We do not sell emails. Unsubscribe on request.',
          'Contact email and domain come later.',
        ],
      },
)
</script>

<template>
  <div
    v-motion
    :initial="{ opacity: 0, y: 16 }"
    :enter="{ opacity: 1, y: 0, transition: { duration: 600 } }"
    class="terms"
  >
    <h1>{{ content.title }}</h1>
    <ul>
      <li v-for="(point, i) in content.points" :key="i">
        <span class="n">{{ String(i + 1).padStart(2, '0') }}</span>
        <span>{{ point }}</span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.terms {
  width: min(100%, 34rem);
  margin: 0 auto;
  text-align: left;
}

h1 {
  margin: 0 0 1.4rem;
  font-family: var(--slidev-font-serif), 'Noto Serif Georgian', serif;
  font-size: clamp(1.8rem, 4vw, 2.6rem);
  color: #f4f7f4;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0.85rem;
}

li {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.75rem;
  align-items: start;
  padding: 0.85rem 0.95rem;
  border-radius: 0.9rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.03);
  color: #a8b5af;
  line-height: 1.45;
}

.n {
  color: #a8c5b5;
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  padding-top: 0.15rem;
}
</style>
