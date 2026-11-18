import { promises as fs } from "fs";
import path from "path";
import type { Category, Locale } from "@/lib/i18n";

export type Subscriber = {
  id: string;
  email: string;
  category: Category;
  locale: Locale;
  createdAt: string;
};

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "subscribers.json");

async function ensureStore(): Promise<Subscriber[]> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    const raw = await fs.readFile(DATA_FILE, "utf8");
    const parsed = JSON.parse(raw) as Subscriber[];
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    const err = error as NodeJS.ErrnoException;
    if (err.code === "ENOENT") {
      await fs.writeFile(DATA_FILE, "[]\n", "utf8");
      return [];
    }
    throw error;
  }
}

export async function listSubscribers(): Promise<Subscriber[]> {
  return ensureStore();
}

export async function addSubscriber(input: {
  email: string;
  category: Category;
  locale: Locale;
}): Promise<{ subscriber: Subscriber; created: boolean }> {
  const email = input.email.trim().toLowerCase();
  const subscribers = await ensureStore();
  const existing = subscribers.find((s) => s.email === email);

  if (existing) {
    return { subscriber: existing, created: false };
  }

  const subscriber: Subscriber = {
    id: crypto.randomUUID(),
    email,
    category: input.category,
    locale: input.locale,
    createdAt: new Date().toISOString(),
  };

  subscribers.push(subscriber);
  await fs.writeFile(DATA_FILE, `${JSON.stringify(subscribers, null, 2)}\n`, "utf8");
  return { subscriber, created: true };
}
