<script setup lang="ts">
import type { Category } from '../composables/useLocale'
import { useLocale } from '../composables/useLocale'

const props = defineProps<{
  modelValue: Category | null
}>()

const emit = defineEmits<{
  'update:modelValue': [Category]
}>()

const { t } = useLocale()

const roles = [
  {
    id: 'artist' as const,
    image: '/images/studio.jpg',
    icon: 'i-carbon-paint-brush',
  },
  {
    id: 'lover' as const,
    image: '/images/audience.jpg',
    icon: 'i-carbon-favorite',
  },
]
</script>

<template>
  <div class="roles">
    <p class="label">{{ t.pickRole }}</p>
    <div class="grid">
      <button
        v-for="role in roles"
        :key="role.id"
        type="button"
        class="role"
        :class="{ active: modelValue === role.id }"
        :aria-pressed="modelValue === role.id"
        @click="emit('update:modelValue', role.id)"
      >
        <img :src="role.image" alt="" />
        <div class="shade" />
        <div class="meta">
          <span class="title">{{ role.id === 'artist' ? t.artist : t.lover }}</span>
        </div>
      </button>
    </div>
  </div>
</template>

<style scoped>
.roles {
  width: 100%;
}

.label {
  margin: 0 0 0.65rem;
  font-size: 0.68rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #9aa8a1;
  text-align: left;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.65rem;
}

.role {
  position: relative;
  height: 7.5rem;
  border-radius: 0.95rem;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: #101412;
  cursor: pointer;
  padding: 0;
  transition:
    transform 0.3s ease,
    border-color 0.3s ease,
    box-shadow 0.3s ease;
}

.role img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: saturate(0.85) brightness(0.78);
  transition: transform 0.5s ease, filter 0.3s ease;
}

.shade {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 30%, rgba(8, 10, 9, 0.85));
}

.meta {
  position: absolute;
  left: 0.75rem;
  right: 0.75rem;
  bottom: 0.7rem;
  text-align: left;
}

.title {
  color: #f2f5f2;
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: 0.02em;
}

.role:hover img {
  transform: scale(1.05);
  filter: saturate(0.95) brightness(0.88);
}

.role.active {
  border-color: rgba(168, 197, 181, 0.55);
  box-shadow: 0 0 28px rgba(168, 197, 181, 0.16);
  transform: translateY(-2px);
}

.role.active img {
  filter: saturate(1) brightness(0.95);
}

@media (max-width: 640px) {
  .role {
    height: 6.4rem;
  }
}
</style>
