<script setup lang="ts">
import BrandMark from './components/BrandMark.vue'
import LangToggle from './components/LangToggle.vue'
</script>

<template>
  <div class="topbar">
    <BrandMark compact />
    <LangToggle />
  </div>
</template>

<style scoped>
.topbar {
  position: fixed;
  top: 0.85rem;
  left: 1rem;
  right: 1rem;
  z-index: 40;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  pointer-events: none;
}

.topbar :deep(.brand),
.topbar :deep(.lang) {
  pointer-events: auto;
}

@media (max-width: 640px) {
  .topbar {
    top: 0.65rem;
    left: 0.7rem;
    right: 0.7rem;
  }
}
</style>
