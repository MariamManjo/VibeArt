const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const CATEGORIES = new Set(['artist', 'lover'])
const LOCALES = new Set(['ka', 'en'])

function json(res, status, body) {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(body))
}

async function readBody(req) {
  const chunks = []
  for await (const chunk of req) chunks.push(chunk)
  return JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}')
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return json(res, 405, { error: 'method_not_allowed' })
  }

  try {
    const body = await readBody(req)
    const email = String(body.email ?? '').trim().toLowerCase()
    const category = String(body.category ?? '')
    const locale = String(body.locale ?? 'en')
    const termsAccepted = Boolean(body.termsAccepted)

    if (!EMAIL_RE.test(email)) return json(res, 400, { error: 'invalid_email' })
    if (!CATEGORIES.has(category)) return json(res, 400, { error: 'invalid_category' })
    if (!LOCALES.has(locale)) return json(res, 400, { error: 'invalid_locale' })
    if (!termsAccepted) return json(res, 400, { error: 'terms_required' })

    const webhook = process.env.SUBSCRIBE_WEBHOOK_URL
    if (!webhook) {
      return json(res, 503, {
        error: 'server_error',
        message: 'SUBSCRIBE_WEBHOOK_URL is not set on Vercel',
      })
    }

    const payload = {
      email,
      category,
      locale,
      termsAccepted: true,
      createdAt: new Date().toISOString(),
      source: 'vibeart-vercel',
    }

    const upstream = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      redirect: 'follow',
    })

    const text = await upstream.text()
    let data = {}
    try {
      data = JSON.parse(text)
    }
    catch {
      data = { raw: text }
    }

    const status = Number(data.status) || upstream.status

    if (status === 409 || data.error === 'duplicate') {
      return json(res, 409, { error: 'duplicate' })
    }

    if (!upstream.ok || (status >= 400 && status !== 201)) {
      return json(res, 502, { error: 'server_error' })
    }

    return json(res, 201, { ok: true, id: data.id ?? email })
  }
  catch {
    return json(res, 500, { error: 'server_error' })
  }
}
