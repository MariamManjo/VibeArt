function json(res, status, body) {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(body))
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return json(res, 405, { error: 'method_not_allowed' })
  }

  const secret = process.env.ADMIN_SECRET
  const provided = req.headers['x-admin-secret']
  if (!secret || provided !== secret) {
    return json(res, 401, { error: 'unauthorized' })
  }

  return json(res, 200, {
    store: 'google_sheet',
    message:
      'On Vercel, open your Google Sheet connected via SUBSCRIBE_WEBHOOK_URL to see all emails.',
    webhookConfigured: Boolean(process.env.SUBSCRIBE_WEBHOOK_URL),
  })
}
