<script setup lang="ts">
import StageGlow from '../components/StageGlow.vue'
</script>

<template>
  <div class="immersive">
    <StageGlow />
    <div class="content">
      <slot />
    </div>
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
</style>
