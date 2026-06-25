import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { analyticsEnabled, getStats } from "@/lib/analytics";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// Constant-time string comparison to avoid leaking the password via timing.
function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) return false;
  return crypto.timingSafeEqual(ab, bb);
}

export async function GET(req: NextRequest) {
  const password = process.env.ADMIN_PASSWORD;

  if (!password) {
    return NextResponse.json(
      {
        error:
          "ADMIN_PASSWORD is not set. Add it as an environment variable in Vercel to protect the dashboard.",
        configured: false,
      },
      { status: 503 }
    );
  }

  const provided =
    req.headers.get("x-admin-key") ||
    req.nextUrl.searchParams.get("key") ||
    "";

  if (!provided || !safeEqual(provided, password)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!analyticsEnabled()) {
    return NextResponse.json({
      analyticsEnabled: false,
      message:
        "Connect an Upstash Redis (Vercel KV) store to start collecting views. See README.",
    });
  }

  const daysParam = parseInt(req.nextUrl.searchParams.get("days") || "30", 10);
  const days = Math.min(90, Math.max(7, isNaN(daysParam) ? 30 : daysParam));

  const stats = await getStats(days);

  return NextResponse.json(
    { analyticsEnabled: true, ...stats },
    { headers: { "Cache-Control": "no-store" } }
  );
}
