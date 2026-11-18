<script setup lang="ts">
import { useLocale } from '../composables/useLocale'

defineProps<{ compact?: boolean }>()
const { t } = useLocale()
</script>

<template>
  <div class="brand" :class="{ compact }">
    <div class="name">{{ t.brand }}</div>
    <div class="sub">{{ t.brandSub }}</div>
  </div>
</template>

<style scoped>
.brand {
  text-align: left;
}

.name {
  font-family: var(--slidev-font-serif), 'Noto Serif Georgian', serif;
  font-size: 1.35rem;
  letter-spacing: 0.22em;
  color: #f5f8f5;
  text-transform: uppercase;
}

.sub {
  margin-top: 0.2rem;
  font-size: 0.68rem;
  letter-spacing: 0.18em;
  color: #8fa89a;
  text-transform: uppercase;
}

.compact .name {
  font-size: 1.05rem;
}
</style>
