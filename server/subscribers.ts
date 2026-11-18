import { promises as fs } from 'node:fs'
import path from 'node:path'

export type Subscriber = {
  id: string
  email: string
  category: 'artist' | 'lover'
  locale: 'ka' | 'en'
  createdAt: string
}

const DATA_DIR = path.join(process.cwd(), 'data')
const DATA_FILE = path.join(DATA_DIR, 'subscribers.json')

async function ensureStore(): Promise<Subscriber[]> {
  await fs.mkdir(DATA_DIR, { recursive: true })
  try {
    const raw = await fs.readFile(DATA_FILE, 'utf8')
    const parsed = JSON.parse(raw) as Subscriber[]
    return Array.isArray(parsed) ? parsed : []
  }
  catch (error) {
    const err = error as NodeJS.ErrnoException
    if (err.code === 'ENOENT') {
      await fs.writeFile(DATA_FILE, '[]\n', 'utf8')
      return []
    }
    throw error
  }
}

export async function listSubscribers() {
  return ensureStore()
}

export async function addSubscriber(input: {
  email: string
  category: 'artist' | 'lover'
  locale: 'ka' | 'en'
}) {
  const email = input.email.trim().toLowerCase()
  const subscribers = await ensureStore()
  const existing = subscribers.find(s => s.email === email)
  if (existing) return { subscriber: existing, created: false }

  const subscriber: Subscriber = {
    id: crypto.randomUUID(),
    email,
    category: input.category,
    locale: input.locale,
    createdAt: new Date().toISOString(),
  }
  subscribers.push(subscriber)
  await fs.writeFile(DATA_FILE, `${JSON.stringify(subscribers, null, 2)}\n`, 'utf8')

  const webhook = process.env.SUBSCRIBE_WEBHOOK_URL
  if (webhook) {
    try {
      await fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: subscriber.email,
          category: subscriber.category,
          locale: subscriber.locale,
          createdAt: subscriber.createdAt,
          source: 'vibeart-local',
        }),
        redirect: 'follow',
      })
    }
    catch {
      // Local file is source of truth in dev; webhook is best-effort.
    }
  }

  return { subscriber, created: true }
}
