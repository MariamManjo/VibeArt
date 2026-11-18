<script setup lang="ts">
const rows = [
  { id: 'a', seats: 7, glow: true },
  { id: 'b', seats: 9, glow: false },
  { id: 'c', seats: 11, glow: false },
]
</script>

<template>
  <div
    v-motion
    :initial="{ opacity: 0, y: 18 }"
    :enter="{ opacity: 1, y: 0, transition: { duration: 650, delay: 120 } }"
    class="seats"
    aria-hidden="true"
  >
    <div class="stage-line" />
    <div v-for="row in rows" :key="row.id" class="row" :class="{ glow: row.glow }">
      <span
        v-for="n in row.seats"
        :key="`${row.id}-${n}`"
        class="seat"
        :class="{ front: row.glow && n === Math.ceil(row.seats / 2) }"
      />
    </div>
  </div>
</template>

<style scoped>
.seats {
  display: grid;
  gap: 0.55rem;
  justify-items: center;
  width: min(100%, 22rem);
  margin: 0 auto;
}

.stage-line {
  width: 70%;
  height: 0.35rem;
  border-radius: 999px;
  background: linear-gradient(90deg, transparent, #a8c5b5, transparent);
  margin-bottom: 0.4rem;
  box-shadow: 0 0 24px rgba(168, 197, 181, 0.35);
}

.row {
  display: flex;
  gap: 0.35rem;
}

.seat {
  width: 1.05rem;
  height: 1.05rem;
  border-radius: 0.28rem 0.28rem 0.4rem 0.4rem;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.row.glow .seat {
  background: rgba(168, 197, 181, 0.14);
  border-color: rgba(168, 197, 181, 0.28);
}

.seat.front {
  background: #e8eee9;
  border-color: #e8eee9;
  box-shadow: 0 0 18px rgba(232, 238, 233, 0.45);
  transform: translateY(-2px);
}
</style>
