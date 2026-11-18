<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useLocale } from '../composables/useLocale'

const { t } = useLocale()
const viewers = ref(1284)
const pulse = ref(true)
let timer: ReturnType<typeof setInterval> | undefined

onMounted(() => {
  timer = setInterval(() => {
    viewers.value += Math.floor(Math.random() * 7) - 2
    if (viewers.value < 1000) viewers.value = 1000
    pulse.value = !pulse.value
  }, 1800)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})

const formatted = computed(() =>
  new Intl.NumberFormat().format(viewers.value),
)
</script>

<template>
  <div
    v-motion
    :initial="{ opacity: 0, y: 18, scale: 0.98 }"
    :enter="{ opacity: 1, y: 0, scale: 1, transition: { duration: 650 } }"
    class="screen"
  >
    <div class="bezel">
      <div class="chrome">
        <div class="live">
          <span class="dot" :class="{ on: pulse }" />
          {{ t.live }}
        </div>
        <div class="viewers">
          <carbon:user-multiple />
          {{ formatted }} {{ t.viewers }}
        </div>
      </div>

      <div class="stage">
        <img src="/images/artist.jpg" alt="" class="hero" />
        <div class="overlay" />
        <div class="canvas-float desktop-only">
          <img src="/images/canvas.jpg" alt="" />
        </div>
        <div class="chat desktop-only">
          <div class="line"><span>nino</span> 🔥</div>
          <div class="line"><span>luka</span> brush stroke?</div>
          <div class="line"><span>ana</span> front row ✨</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.screen {
  width: 100%;
  max-width: 52rem;
  margin: 0 auto;
}

.bezel {
  border-radius: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(10, 12, 11, 0.72);
  box-shadow:
    0 22px 60px rgba(0, 0, 0, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.06);
  overflow: hidden;
  backdrop-filter: blur(8px);
}

.chrome {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.55rem 0.75rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  font-size: 0.7rem;
  letter-spacing: 0.08em;
}

.live {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: #f2f5f2;
  font-weight: 600;
}

.dot {
  width: 0.45rem;
  height: 0.45rem;
  border-radius: 999px;
  background: #e8a090;
  opacity: 0.55;
  transition: opacity 0.4s ease;
}

.dot.on {
  opacity: 1;
  box-shadow: 0 0 12px rgba(232, 160, 144, 0.7);
}

.viewers {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  color: rgba(232, 238, 233, 0.7);
}

.stage {
  position: relative;
  aspect-ratio: 16 / 8.2;
  overflow: hidden;
}

.hero {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: saturate(0.9) contrast(1.05);
  transform: scale(1.04);
  animation: ken 18s ease-in-out infinite alternate;
}

.overlay {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(90deg, rgba(8, 10, 9, 0.5), transparent 35%),
    linear-gradient(0deg, rgba(8, 10, 9, 0.5), transparent 40%);
}

.canvas-float {
  position: absolute;
  left: 3.5%;
  bottom: 9%;
  width: 22%;
  border-radius: 0.55rem;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4);
  animation: floaty 5s ease-in-out infinite;
}

.canvas-float img {
  display: block;
  width: 100%;
  aspect-ratio: 3 / 4;
  object-fit: cover;
}

.chat {
  position: absolute;
  right: 2.5%;
  bottom: 9%;
  width: min(40%, 10.5rem);
  display: grid;
  gap: 0.28rem;
}

.line {
  padding: 0.28rem 0.45rem;
  border-radius: 0.45rem;
  background: rgba(0, 0, 0, 0.45);
  color: rgba(242, 245, 242, 0.88);
  font-size: 0.65rem;
  backdrop-filter: blur(6px);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.line span {
  color: #a8c5b5;
  margin-right: 0.3rem;
  font-weight: 600;
}

@keyframes ken {
  from {
    transform: scale(1.04) translate3d(0, 0, 0);
  }
  to {
    transform: scale(1.08) translate3d(-1%, -0.8%, 0);
  }
}

@keyframes floaty {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

@media (max-width: 900px) {
  .screen {
    max-width: none;
  }

  .bezel {
    border-radius: 0.85rem;
    box-shadow: none;
  }

  .chrome {
    padding: 0.7rem 0.85rem;
    font-size: 0.78rem;
  }

  .stage {
    aspect-ratio: 4 / 5;
  }

  .desktop-only {
    display: none !important;
  }

  .overlay {
    background: linear-gradient(0deg, rgba(8, 10, 9, 0.35), transparent 45%);
  }
}
</style>
