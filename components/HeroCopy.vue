<script setup lang="ts">
import { useLocale } from '../composables/useLocale'

const { t } = useLocale()
</script>

<template>
  <div
    v-motion
    :initial="{ opacity: 0, y: 14 }"
    :enter="{ opacity: 1, y: 0, transition: { duration: 650 } }"
    class="hero"
  >
    <h1>{{ t.title }}</h1>
    <p>{{ t.tagline }}</p>
  </div>
</template>

<style scoped>
.hero {
  text-align: center;
  max-width: min(36rem, 92%);
  margin: 0 auto;
}

h1 {
  margin: 0;
  font-family: var(--slidev-font-serif), 'Noto Serif Georgian', serif;
  font-size: clamp(1.55rem, 3.6vw, 2.45rem);
  line-height: 1.15;
  letter-spacing: -0.02em;
  color: #f4f7f4;
  font-weight: 600;
  text-wrap: balance;
}

p {
  margin: 0.55rem 0 0;
  font-size: clamp(0.85rem, 1.6vw, 1rem);
  line-height: 1.4;
  color: #a8b5af;
  font-style: italic;
  text-wrap: balance;
}
</style>
