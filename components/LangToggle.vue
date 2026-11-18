<script setup lang="ts">
import { useLocale } from '../composables/useLocale'

const { locale, setLocale } = useLocale()
</script>

<template>
  <div class="lang" role="group" aria-label="Language">
    <button
      type="button"
      class="lang-btn"
      :class="{ active: locale === 'ka' }"
      :aria-pressed="locale === 'ka'"
      @click="setLocale('ka')"
    >
      ქარ
    </button>
    <button
      type="button"
      class="lang-btn"
      :class="{ active: locale === 'en' }"
      :aria-pressed="locale === 'en'"
      @click="setLocale('en')"
    >
      EN
    </button>
  </div>
</template>

<style scoped>
.lang {
  display: inline-flex;
  gap: 0.2rem;
  padding: 0.25rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(0, 0, 0, 0.28);
  backdrop-filter: blur(10px);
}

.lang-btn {
  border: 0;
  background: transparent;
  color: rgba(255, 255, 255, 0.55);
  font-size: 0.68rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  padding: 0.4rem 0.75rem;
  border-radius: 999px;
  cursor: pointer;
  transition: all 0.25s ease;
}

.lang-btn.active {
  background: rgba(232, 238, 233, 0.92);
  color: #121614;
  box-shadow: 0 0 24px rgba(168, 197, 181, 0.25);
}

.lang-btn:hover:not(.active) {
  color: rgba(255, 255, 255, 0.9);
}
</style>
