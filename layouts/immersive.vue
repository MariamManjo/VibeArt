<script setup lang="ts">
import StageGlow from '../components/StageGlow.vue'
import NavArrows from '../components/NavArrows.vue'
</script>

<template>
  <div class="immersive">
    <StageGlow />
    <div class="content">
      <slot />
    </div>
    <NavArrows />
  </div>
</template>

<style scoped>
.immersive {
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
  color: #e8eee9;
  background: #0c0f0e;
}

.content {
  position: relative;
  z-index: 1;
  height: 100%;
  width: 100%;
  padding: 3.2rem 2.4rem 3.4rem;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

@media (max-width: 900px) {
  .immersive {
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }

  .content {
    padding:
      max(4.5rem, calc(env(safe-area-inset-top) + 3.6rem))
      1rem
      max(5.5rem, calc(env(safe-area-inset-bottom) + 4.5rem));
    min-height: 100%;
  }
}
</style>
