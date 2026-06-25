import { NextRequest, NextResponse } from "next/server";
import { recordView } from "@/lib/analytics";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function firstIp(value: string | null): string {
  if (!value) return "";
  return value.split(",")[0]?.trim() || "";
}

// IPs (comma-separated) to exclude from analytics - set IGNORED_IPS in Vercel,
// e.g. "203.0.113.7, 2001:db8::1". Your own IP shows on the home page.
function isIgnoredIp(ip: string): boolean {
  if (!ip) return false;
  const list = (process.env.IGNORED_IPS || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  return list.includes(ip);
}

export async function POST(req: NextRequest) {
  const h = req.headers;
  const ip =
    firstIp(h.get("x-forwarded-for")) ||
    h.get("x-real-ip") ||
    "";
  const ua = h.get("user-agent") || "";
  const country = h.get("x-vercel-ip-country");

  // Ignore obvious bots/crawlers so counts reflect real visitors.
  if (/bot|crawl|spider|slurp|bing|preview|monitor|curl|wget/i.test(ua)) {
    return NextResponse.json({ ok: true, skipped: "bot" });
  }

  // Ignore the owner's / excluded IPs.
  if (isIgnoredIp(ip)) {
    return NextResponse.json({ ok: true, skipped: "ignored" });
  }

  let path: string | null = null;
  try {
    const body = await req.json();
    if (body && typeof body.path === "string") path = body.path;
  } catch {
    // No/invalid body - recordView defaults to "/".
  }

  try {
    await recordView({ ip, ua, country, path });
  } catch {
    // Never let analytics break the page.
  }
  return NextResponse.json(
    { ok: true },
    { headers: { "Cache-Control": "no-store" } }
  );
}
