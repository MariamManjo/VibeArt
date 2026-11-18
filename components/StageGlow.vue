<template>
  <div class="stage-root" aria-hidden="true">
    <div class="stage-base" />
    <div class="stage-spot" />
    <div class="stage-orb left" />
    <div class="stage-orb right" />
    <div class="stage-grain" />
  </div>
</template>

<style scoped>
.stage-root {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
}

.stage-base {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(120% 70% at 50% -5%, rgba(168, 197, 181, 0.22), transparent 55%),
    radial-gradient(80% 50% at 85% 100%, rgba(72, 96, 88, 0.3), transparent 50%),
    linear-gradient(180deg, #121715 0%, #0c0f0e 55%, #090b0a 100%);
}

.stage-spot {
  position: absolute;
  left: 18%;
  right: 18%;
  top: -8%;
  height: 62%;
  background: radial-gradient(
    ellipse at center,
    rgba(232, 238, 233, 0.18) 0%,
    rgba(168, 197, 181, 0.08) 35%,
    transparent 70%
  );
  filter: blur(10px);
  animation: spot-drift 14s ease-in-out infinite alternate;
}

.stage-orb {
  position: absolute;
  width: 22rem;
  height: 22rem;
  border-radius: 9999px;
  filter: blur(48px);
  animation: orb-float 18s ease-in-out infinite;
}

.stage-orb.left {
  left: -6rem;
  top: 28%;
  background: rgba(111, 135, 123, 0.3);
}

.stage-orb.right {
  right: -5rem;
  bottom: 6%;
  background: rgba(168, 197, 181, 0.2);
  animation-duration: 22s;
  animation-direction: reverse;
}

.stage-grain {
  position: absolute;
  inset: 0;
  opacity: 0.16;
  mix-blend-mode: soft-light;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E");
}

@keyframes spot-drift {
  from {
    transform: translate3d(-3%, 0, 0) scale(1);
  }
  to {
    transform: translate3d(3%, 2%, 0) scale(1.06);
  }
}

@keyframes orb-float {
  0%,
  100% {
    transform: translate3d(0, 0, 0);
  }
  50% {
    transform: translate3d(4%, -3%, 0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .stage-spot,
  .stage-orb {
    animation: none;
  }
}
</style>
