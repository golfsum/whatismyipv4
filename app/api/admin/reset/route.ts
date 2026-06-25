import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { analyticsEnabled, resetStats } from "@/lib/analytics";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) return false;
  return crypto.timingSafeEqual(ab, bb);
}

export async function POST(req: NextRequest) {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) {
    return NextResponse.json(
      { error: "ADMIN_PASSWORD is not set." },
      { status: 503 }
    );
  }

  const provided = req.headers.get("x-admin-key") || "";
  if (!provided || !safeEqual(provided, password)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!analyticsEnabled()) {
    return NextResponse.json({ ok: true, deleted: 0, analyticsEnabled: false });
  }

  const deleted = await resetStats();
  return NextResponse.json(
    { ok: true, deleted },
    { headers: { "Cache-Control": "no-store" } }
  );
}
