---
theme: default
colorSchema: dark
title: VIBEART
info: |
  VIBEART waitlist — live platform for artists.
  Built with Slidev + Vue.
layout: immersive
class: text-center
drawings:
  persist: false
transition: fade
mdc: true
fonts:
  sans: 'Noto Sans Georgian'
  serif: 'Noto Serif Georgian'
  weights: '400,500,600,700'
aspectRatio: 16/9
canvasWidth: 980
favicon: /images/stage.jpg
---

<div class="cover">
  <div class="cover-visual">
    <img src="/images/stage.jpg" alt="" class="bg" />
    <div class="veil" />
    <SeatRows />
  </div>
  <HeroCopy />
  <button class="next" @click="$slidev.nav.next">
    <carbon:arrow-down />
  </button>
</div>

<style>
.cover {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.4rem;
  padding-top: 2.5rem;
}
.cover-visual {
  position: relative;
  width: min(100%, 34rem);
  aspect-ratio: 16 / 9;
  border-radius: 1.1rem;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,0.12);
  box-shadow: 0 28px 70px rgba(0,0,0,0.4);
  display: grid;
  place-items: end center;
  padding-bottom: 1.2rem;
}
.cover-visual .bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.55) saturate(0.9);
}
.cover-visual .veil {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(8,10,9,0.15), rgba(8,10,9,0.72));
}
.cover-visual :deep(.seats) {
  position: relative;
  z-index: 1;
}
.next {
  margin-top: 0.2rem;
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 999px;
  border: 1px solid rgba(255,255,255,0.16);
  background: rgba(255,255,255,0.04);
  color: #d7e4dc;
  display: grid;
  place-items: center;
  cursor: pointer;
  animation: bob 2.2s ease-in-out infinite;
}
@keyframes bob {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(5px); }
}
</style>

<!--
Cover — front-row stage visual
-->

---
layout: immersive
---

<div class="live-slide">
  <LiveArtistScreen />
</div>

<style>
.live-slide {
  flex: 1;
  display: grid;
  place-items: center;
  padding-top: 2.8rem;
}
</style>

<!--
Product screen — Twitch-like for artists
-->

---
layout: immersive
---

<div class="join-slide">
  <SubscribeForm />
</div>

<style>
.join-slide {
  flex: 1;
  display: grid;
  place-items: center;
  padding-top: 2.8rem;
}
</style>

<!--
Subscribe — email + role
-->

---
layout: immersive
---

<div class="terms-slide">
  <TermsPanel />
</div>

<style>
.terms-slide {
  flex: 1;
  display: grid;
  place-items: center;
  padding-top: 2.8rem;
}
</style>

<!--
Terms — short bilingual
-->
