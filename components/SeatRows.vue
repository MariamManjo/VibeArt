<script setup lang="ts">
const rows = [
  { id: 'a', seats: 7, glow: true },
  { id: 'b', seats: 9, glow: false },
]
</script>

<template>
  <div class="seats" aria-hidden="true">
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
  gap: 0.35rem;
  justify-items: center;
  width: min(100%, 16rem);
  margin: 0 auto;
}

.stage-line {
  width: 65%;
  height: 0.28rem;
  border-radius: 999px;
  background: linear-gradient(90deg, transparent, #a8c5b5, transparent);
  margin-bottom: 0.25rem;
  box-shadow: 0 0 18px rgba(168, 197, 181, 0.35);
}

.row {
  display: flex;
  gap: 0.28rem;
}

.seat {
  width: 0.82rem;
  height: 0.82rem;
  border-radius: 0.22rem 0.22rem 0.32rem 0.32rem;
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
  box-shadow: 0 0 14px rgba(232, 238, 233, 0.45);
  transform: translateY(-1px);
}
</style>
