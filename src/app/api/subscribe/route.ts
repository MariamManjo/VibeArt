import { NextResponse } from "next/server";
import { addSubscriber } from "@/lib/subscribers";
import type { Category, Locale } from "@/lib/i18n";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CATEGORIES: Category[] = ["artist", "lover"];
const LOCALES: Locale[] = ["ka", "en"];

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      email?: string;
      category?: string;
      locale?: string;
      termsAccepted?: boolean;
    };

    const email = body.email?.trim() ?? "";
    const category = body.category as Category | undefined;
    const locale = (body.locale as Locale | undefined) ?? "en";

    if (!EMAIL_RE.test(email)) {
      return NextResponse.json({ error: "invalid_email" }, { status: 400 });
    }
    if (!category || !CATEGORIES.includes(category)) {
      return NextResponse.json({ error: "invalid_category" }, { status: 400 });
    }
    if (!LOCALES.includes(locale)) {
      return NextResponse.json({ error: "invalid_locale" }, { status: 400 });
    }
    if (!body.termsAccepted) {
      return NextResponse.json({ error: "terms_required" }, { status: 400 });
    }

    const result = await addSubscriber({ email, category, locale });

    if (!result.created) {
      return NextResponse.json({ error: "duplicate" }, { status: 409 });
    }

    return NextResponse.json({ ok: true, id: result.subscriber.id }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
