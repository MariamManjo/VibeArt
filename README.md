# VIBEART — Front-row waitlist

Single-page bilingual (ქართული / English) subscribe landing for market research ahead of a live artist platform.

## What it includes

- Non-scrollable landing with email, category (Artist / Art lover), and Subscribe
- KA / EN language toggle
- Working subscribe API that stores emails in `data/subscribers.json`
- Terms of Use page (placeholder copy until final legal text arrives)

## Run locally

```bash
npm install
npm run dev -- -p 43123
```

Open [http://127.0.0.1:43123](http://127.0.0.1:43123).

## Export subscribers

Set an admin secret, then:

```bash
export ADMIN_SECRET=your-secret
curl -H "x-admin-secret: $ADMIN_SECRET" http://127.0.0.1:43123/api/subscribers
```

## Notes

- Contact email and custom domain can be wired later (footer/terms already anticipate this).
- File storage is fine for local research. For production hosting with durable storage, move `src/lib/subscribers.ts` to a database.
