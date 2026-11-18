import { NextResponse } from "next/server";
import { listSubscribers } from "@/lib/subscribers";

export async function GET(request: Request) {
  const secret = process.env.ADMIN_SECRET;
  const provided = request.headers.get("x-admin-secret");

  if (!secret || provided !== secret) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const subscribers = await listSubscribers();
  return NextResponse.json({ count: subscribers.length, subscribers });
}
