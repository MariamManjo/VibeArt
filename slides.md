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
aspectRatio: 16/10
canvasWidth: 1100
favicon: /images/stage.jpg
---

<div class="join-slide">
  <SubscribeForm />
</div>

<style>
.join-slide {
  flex: 1;
  min-height: 0;
  display: grid;
  place-items: center;
  overflow: auto;
}
</style>

<!--
Subscribe — email + role
-->

---
layout: immersive
---

<div class="cover">
  <div class="cover-visual">
    <img src="/images/stage.jpg" alt="" class="bg" />
    <div class="veil" />
    <div class="cover-copy">
      <HeroCopy />
    </div>
  </div>
</div>

<style>
.cover {
  flex: 1;
  min-height: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.cover-visual {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 1.05rem;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,0.12);
  box-shadow: 0 22px 60px rgba(0,0,0,0.4);
  display: flex;
  align-items: flex-end;
  justify-content: center;
}
.cover-visual .bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.5) saturate(0.9);
}
.cover-visual .veil {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, rgba(8,10,9,0.2) 0%, rgba(8,10,9,0.55) 45%, rgba(8,10,9,0.88) 100%);
}
.cover-copy {
  position: relative;
  z-index: 1;
  width: 100%;
  padding: 1.1rem 1.2rem 1.35rem;
  display: grid;
  gap: 0.75rem;
  justify-items: center;
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
  min-height: 0;
  display: grid;
  place-items: center;
}
</style>

<!--
Product screen — Twitch-like for artists
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
  min-height: 0;
  display: grid;
  place-items: center;
  overflow: auto;
}
</style>

<!--
Terms — short bilingual
-->
