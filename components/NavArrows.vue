<script setup lang="ts">
import { computed } from 'vue'
import { useNav, useSlideContext } from '@slidev/client'

const { currentPage, total, prev, next } = useNav()
const { $page } = useSlideContext()

const active = computed(() => currentPage.value === $page.value)
const atStart = computed(() => currentPage.value <= 1)
const atEnd = computed(() => currentPage.value >= total.value)

function goPrev(event: Event) {
  event.preventDefault()
  event.stopPropagation()
  if (!atStart.value) prev()
}

function goNext(event: Event) {
  event.preventDefault()
  event.stopPropagation()
  if (!atEnd.value) next()
}
</script>

<template>
  <div v-if="active" class="nav-root">
    <button
      type="button"
      class="side left"
      :disabled="atStart"
      aria-label="Previous"
      @click="goPrev"
      @touchend.prevent="goPrev"
    >
      <carbon:chevron-left />
    </button>

    <button
      type="button"
      class="side right"
      :disabled="atEnd"
      aria-label="Next"
      @click="goNext"
      @touchend.prevent="goNext"
    >
      <carbon:chevron-right />
    </button>

    <div class="nav" aria-label="Slide navigation">
      <button
        type="button"
        class="arrow"
        :disabled="atStart"
        aria-label="Previous"
        @click="goPrev"
        @touchend.prevent="goPrev"
      >
        <carbon:arrow-left />
      </button>

      <div class="dots" aria-hidden="true">
        <span
          v-for="n in total"
          :key="n"
          class="dot"
          :class="{ active: n === currentPage }"
        />
      </div>

      <button
        type="button"
        class="arrow"
        :disabled="atEnd"
        aria-label="Next"
        @click="goNext"
        @touchend.prevent="goNext"
      >
        <carbon:arrow-right />
      </button>
    </div>
  </div>
</template>

<style scoped>
.nav-root {
  pointer-events: none;
}

.side {
  pointer-events: auto;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 60;
  width: 2.6rem;
  height: 2.6rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.16);
  background: rgba(8, 10, 9, 0.55);
  color: #e8eee9;
  display: grid;
  place-items: center;
  cursor: pointer;
  backdrop-filter: blur(10px);
  touch-action: manipulation;
  transition:
    background 0.2s ease,
    border-color 0.2s ease,
    opacity 0.2s ease,
    transform 0.2s ease;
}

.side.left {
  left: 0.85rem;
}

.side.right {
  right: 0.85rem;
}

.side:hover:not(:disabled) {
  background: rgba(232, 238, 233, 0.92);
  color: #121614;
  border-color: transparent;
}

.side:disabled {
  opacity: 0.22;
  cursor: default;
}

.nav {
  pointer-events: auto;
  position: absolute;
  left: 50%;
  bottom: 0.85rem;
  transform: translateX(-50%);
  z-index: 60;
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding: 0.35rem 0.45rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(8, 10, 9, 0.72);
  backdrop-filter: blur(12px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
  touch-action: manipulation;
}

.arrow {
  width: 2.35rem;
  height: 2.35rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(255, 255, 255, 0.06);
  color: #e8eee9;
  display: grid;
  place-items: center;
  cursor: pointer;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  transition:
    background 0.2s ease,
    border-color 0.2s ease,
    opacity 0.2s ease,
    transform 0.2s ease;
}

.arrow:hover:not(:disabled) {
  background: rgba(232, 238, 233, 0.92);
  color: #121614;
  border-color: transparent;
  transform: scale(1.04);
}

.arrow:disabled {
  opacity: 0.28;
  cursor: default;
}

.dots {
  display: flex;
  gap: 0.35rem;
  align-items: center;
  padding: 0 0.15rem;
}

.dot {
  width: 0.38rem;
  height: 0.38rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.28);
  transition:
    width 0.2s ease,
    background 0.2s ease;
}

.dot.active {
  width: 1.05rem;
  background: #a8c5b5;
}

@media (max-width: 900px) {
  .side {
    display: none;
  }

  .nav {
    bottom: max(0.85rem, env(safe-area-inset-bottom));
    gap: 0.7rem;
    padding: 0.4rem 0.55rem;
    width: min(calc(100% - 1.5rem), 22rem);
    justify-content: space-between;
  }

  .arrow {
    width: 2.7rem;
    height: 2.7rem;
  }
}
</style>
