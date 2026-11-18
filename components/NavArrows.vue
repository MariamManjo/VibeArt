<script setup lang="ts">
import { computed } from 'vue'
import { useNav } from '@slidev/client'

const { currentPage, total, prev, next } = useNav()

const atStart = computed(() => currentPage.value <= 1)
const atEnd = computed(() => currentPage.value >= total.value)
</script>

<template>
  <div class="nav-root">
    <button
      type="button"
      class="side left"
      :disabled="atStart"
      aria-label="Previous"
      @click="prev()"
    >
      <carbon:chevron-left />
    </button>

    <button
      type="button"
      class="side right"
      :disabled="atEnd"
      aria-label="Next"
      @click="next()"
    >
      <carbon:chevron-right />
    </button>

    <div class="nav" aria-label="Slide navigation">
      <button
        type="button"
        class="arrow"
        :disabled="atStart"
        aria-label="Previous"
        @click="prev()"
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
        @click="next()"
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
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  z-index: 50;
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
  position: fixed;
  left: 50%;
  bottom: 0.85rem;
  transform: translateX(-50%);
  z-index: 50;
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding: 0.35rem 0.45rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(8, 10, 9, 0.55);
  backdrop-filter: blur(12px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
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
</style>
