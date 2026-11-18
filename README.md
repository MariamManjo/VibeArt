<div align="center">

# VIBEART

**Take a front row seat.**

A bilingual waitlist for a live platform built only for artists —  
ქართული + English, one immersive experience.

<br/>

[![Slidev](https://img.shields.io/badge/Slidev-0c0f0e?style=for-the-badge&logo=slidev&logoColor=A8C5B5)](https://sli.dev)
[![Vue](https://img.shields.io/badge/Vue_3-0c0f0e?style=for-the-badge&logo=vuedotjs&logoColor=42b883)](https://vuejs.org)
[![KA%2FEN](https://img.shields.io/badge/KA%2FEN-0c0f0e?style=for-the-badge&logoColor=E8EEE9)](#)

</div>

<br/>

<p align="center">
  <img src="docs/screenshots/01-cover.png" alt="VIBEART cover — front row seat" width="920" />
</p>

---

## Preview

| Stage | Live | Subscribe |
| :---: | :---: | :---: |
| <img src="docs/screenshots/01-cover.png" alt="Cover" width="280" /> | <img src="docs/screenshots/02-live.png" alt="Live" width="280" /> | <img src="docs/screenshots/03-subscribe.png" alt="Subscribe" width="280" /> |

<p align="center">
  <img src="docs/screenshots/04-terms.png" alt="Terms" width="520" />
</p>

---

## What it is

A **4-screen** product waitlist for market research:

1. **Cover** — stage atmosphere + title + tagline  
2. **Live** — artist stream mock (Twitch-like for creatives)  
3. **Subscribe** — email + Artist / Art lover  
4. **Terms** — short bilingual copy  

Language toggle stays in the corner. Side + bottom arrows on every screen.

---

## Quick start

```bash
npm install
npm run dev
```

Open [http://127.0.0.1:43123](http://127.0.0.1:43123)

| Command | Purpose |
| --- | --- |
| `npm run dev` | Local Slidev server |
| `npm run build` | Static export to `dist/` |
| `npm run export` | Export slides |

---

## Subscribe data

Emails are saved locally to `data/subscribers.json`.

```bash
ADMIN_SECRET=change-me \
curl -H "x-admin-secret: change-me" \
  http://127.0.0.1:43123/api/subscribers
```

> For a public deploy (Vercel / Netlify), wire a durable store next  
> (Google Sheet, Airtable, or a database) — local JSON will not persist there.

---

## Structure

```text
├── slides.md              # 4 visual screens
├── components/            # Vue UI (form, live screen, nav…)
├── composables/           # KA / EN locale
├── layouts/immersive.vue  # Full-bleed stage layout
├── public/images/         # Real stage / studio photos
├── server/subscribers.ts  # Email storage
└── docs/screenshots/      # README previews
```

---

<div align="center">

**Keep creating. Keep believing.**

`VIBEART` · for artists

</div>
