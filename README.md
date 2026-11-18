# VIBEART — Slidev waitlist

Visual-first bilingual waitlist for a live artist platform. Built with [Slidev](https://sli.dev) + Vue components.

## Screens

1. **Stage** — front-row seats over a live stage image  
2. **Live product** — artist stream UI mock (Vue screen)  
3. **Subscribe** — role picker + email capture  
4. **Terms** — short KA/EN copy  

## Run

```bash
npm install
npm run dev
```

Open [http://127.0.0.1:43123](http://127.0.0.1:43123).

## Stack

- Slidev / Vite / Vue 3
- `@vueuse/motion` for UI motion
- UnoCSS + Iconify (via Slidev)
- Local JSON subscribe API (`/api/subscribe`) in `vite.config.ts`

## Export emails

```bash
ADMIN_SECRET=your-secret curl -H "x-admin-secret: your-secret" http://127.0.0.1:43123/api/subscribers
```

Subscribers are stored in `data/subscribers.json`.
