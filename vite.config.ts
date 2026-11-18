import type { Connect, Plugin } from 'vite'
import { defineConfig } from 'vite'
import { addSubscriber, listSubscribers } from './server/subscribers.ts'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const CATEGORIES = new Set(['artist', 'lover'])
const LOCALES = new Set(['ka', 'en'])

async function readJson(req: Connect.IncomingMessage) {
  const chunks: Buffer[] = []
  for await (const chunk of req) chunks.push(Buffer.from(chunk))
  return JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}') as Record<string, unknown>
}

function send(res: Connect.ServerResponse, status: number, body: unknown) {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(body))
}

function subscribeApi(): Plugin {
  const mount = (middlewares: Connect.Server) => {
    middlewares.use(async (req, res, next) => {
      try {
        if (req.url?.startsWith('/api/subscribe') && req.method === 'POST') {
          const body = await readJson(req)
          const email = String(body.email ?? '').trim()
          const category = String(body.category ?? '')
          const locale = String(body.locale ?? 'en')
          const termsAccepted = Boolean(body.termsAccepted)

          if (!EMAIL_RE.test(email)) return send(res, 400, { error: 'invalid_email' })
          if (!CATEGORIES.has(category)) return send(res, 400, { error: 'invalid_category' })
          if (!LOCALES.has(locale)) return send(res, 400, { error: 'invalid_locale' })
          if (!termsAccepted) return send(res, 400, { error: 'terms_required' })

          const result = await addSubscriber({
            email,
            category: category as 'artist' | 'lover',
            locale: locale as 'ka' | 'en',
          })
          if (!result.created) return send(res, 409, { error: 'duplicate' })
          return send(res, 201, { ok: true, id: result.subscriber.id })
        }

        if (req.url?.startsWith('/api/subscribers') && req.method === 'GET') {
          const secret = process.env.ADMIN_SECRET
          const provided = req.headers['x-admin-secret']
          if (!secret || provided !== secret) return send(res, 401, { error: 'unauthorized' })
          const subscribers = await listSubscribers()
          return send(res, 200, { count: subscribers.length, subscribers })
        }
      }
      catch {
        return send(res, 500, { error: 'server_error' })
      }

      return next()
    })
  }

  return {
    name: 'vibeart-subscribe-api',
    configureServer(server) {
      mount(server.middlewares)
    },
    configurePreviewServer(server) {
      mount(server.middlewares)
    },
  }
}

export default defineConfig({
  plugins: [subscribeApi()],
  server: {
    port: 43123,
    strictPort: true,
  },
})
