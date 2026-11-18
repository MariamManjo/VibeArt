<script setup lang="ts">
import { useLocale } from '../composables/useLocale'

const { t } = useLocale()
</script>

<template>
  <div
    v-motion
    :initial="{ opacity: 0, y: 18 }"
    :enter="{ opacity: 1, y: 0, transition: { duration: 700 } }"
    class="hero"
  >
    <h1>{{ t.title }}</h1>
    <p>{{ t.tagline }}</p>
  </div>
</template>

<style scoped>
.hero {
  text-align: center;
  max-width: 18ch;
  margin: 0 auto;
}

h1 {
  margin: 0;
  font-family: var(--slidev-font-serif), 'Noto Serif Georgian', serif;
  font-size: clamp(1.9rem, 5vw, 3.2rem);
  line-height: 1.12;
  letter-spacing: -0.02em;
  color: #f4f7f4;
  font-weight: 600;
}

p {
  margin: 0.9rem 0 0;
  font-size: clamp(0.95rem, 2vw, 1.08rem);
  line-height: 1.45;
  color: #a8b5af;
  font-style: italic;
}
</style>
