<p align="center">
  <img src="public/images/stage.jpg" alt="VIBEART stage" width="920" style="border-radius:16px" />
</p>

<h1 align="center">VIBEART</h1>

<p align="center">
  <strong>Take a front row seat.</strong><br/>
  Bilingual waitlist for a live platform built only for artists.<br/>
  <em>ქართული · English</em>
</p>

<p align="center">
  Keep creating. Keep believing.<br/>
  Let the world discover what you have to offer.
</p>

---

## Screens

<p align="center">
  <img src="docs/screenshots/01-cover.png" alt="Cover" width="900" />
</p>

<p align="center">
  <img src="docs/screenshots/02-live.png" alt="Live artist screen" width="900" />
</p>

<p align="center">
  <img src="docs/screenshots/03-subscribe.png" alt="Subscribe" width="900" />
</p>

<p align="center">
  <img src="docs/screenshots/04-terms.png" alt="Terms" width="700" />
</p>

---

## What’s inside

| Screen | Feeling |
| --- | --- |
| **1 · Subscribe** | Email + Artist / Art lover |
| **2 · Cover** | Stage light + title + tagline |
| **3 · Live** | Artist stream mock |
| **4 · Terms** | Short KA / EN copy |

Side arrows + bottom dots on every page. Language toggle stays top-right.

---

## Run locally

```bash
npm install
npm run dev
```

Open **http://127.0.0.1:43123**

---

## See who subscribed

### Local

Emails go to `data/subscribers.json`.

```bash
ADMIN_SECRET=change-me \
curl -H "x-admin-secret: change-me" \
  http://127.0.0.1:43123/api/subscribers
```

### Vercel (required for production)

Local files do **not** persist on Vercel. Save emails to a **Google Sheet**:

1. Create a Google Sheet  
2. **Extensions → Apps Script** → paste `docs/google-sheet-apps-script.gs`  
3. Run `setupSheet()` once  
4. **Deploy → New deployment → Web app**  
   - Execute as: **Me**  
   - Who has access: **Anyone**  
5. Copy the Web App URL  
6. Vercel → Project → **Settings → Environment Variables**  
   - `SUBSCRIBE_WEBHOOK_URL` = that URL  
7. **Redeploy**

Every subscribe on [vibeart-tau.vercel.app](https://vibeart-tau.vercel.app/) will appear as a new row in your Sheet.

---

<p align="center">
  <sub>VIBEART · for artists</sub>
</p>
