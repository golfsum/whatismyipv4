import { NextRequest, NextResponse } from "next/server";
import { detectVpn } from "@/lib/vpn";

// Always run dynamically per-request, never cache.
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function firstIp(value: string | null): string | null {
  if (!value) return null;
  // x-forwarded-for can be a comma-separated list; the client is the first.
  const ip = value.split(",")[0]?.trim();
  return ip || null;
}

function isPrivate(ip: string): boolean {
  return (
    ip === "127.0.0.1" ||
    ip === "::1" ||
    ip.startsWith("10.") ||
    ip.startsWith("192.168.") ||
    ip.startsWith("172.16.") ||
    ip.startsWith("fc") ||
    ip.startsWith("fd") ||
    ip === "::ffff:127.0.0.1"
  );
}

export async function GET(req: NextRequest) {
  const h = req.headers;

  // Resolve the visitor IP from the proxy headers Vercel sets.
  const ip =
    firstIp(h.get("x-forwarded-for")) ||
    h.get("x-real-ip") ||
    h.get("x-vercel-forwarded-for") ||
    "";

  const isV6 = ip.includes(":") && !ip.startsWith("::ffff:");

  // Vercel geolocation headers (available in production) as a fast fallback.
  const vercelGeo = {
    city: h.get("x-vercel-ip-city")
      ? decodeURIComponent(h.get("x-vercel-ip-city") as string)
      : undefined,
    country: h.get("x-vercel-ip-country") || undefined,
    countryRegion: h.get("x-vercel-ip-country-region") || undefined,
    latitude: h.get("x-vercel-ip-latitude") || undefined,
    longitude: h.get("x-vercel-ip-longitude") || undefined,
    timezone: h.get("x-vercel-ip-timezone") || undefined,
  };

  let geo: any = null;

  // Query ip-api.com server-side (HTTP is fine for server-to-server; this
  // avoids mixed-content issues and hides the lookup from the client).
  if (ip && !isPrivate(ip)) {
    try {
      const fields =
        "status,message,continent,country,countryCode,region,regionName,city,zip,lat,lon,timezone,currency,isp,org,as,asname,reverse,mobile,proxy,hosting,query";
      const res = await fetch(
        `http://ip-api.com/json/${encodeURIComponent(ip)}?fields=${fields}`,
        { cache: "no-store", signal: AbortSignal.timeout(4000) }
      );
      const data = await res.json();
      if (data && data.status === "success") geo = data;
    } catch {
      // Swallow — we fall back to Vercel geo below.
    }
  }

  // Merge Vercel geo as a fallback when ip-api is unavailable.
  const lat =
    geo?.lat ?? (vercelGeo.latitude ? parseFloat(vercelGeo.latitude) : null);
  const lon =
    geo?.lon ?? (vercelGeo.longitude ? parseFloat(vercelGeo.longitude) : null);

  const ipInfo = {
    proxy: geo?.proxy,
    hosting: geo?.hosting,
    mobile: geo?.mobile,
    org: geo?.org,
    isp: geo?.isp,
    as: geo?.as,
    asname: geo?.asname,
  };

  const vpn = detectVpn({ ipInfo });

  return NextResponse.json(
    {
      ip: ip || null,
      ipVersion: ip ? (isV6 ? 6 : 4) : null,
      city: geo?.city ?? vercelGeo.city ?? null,
      region: geo?.regionName ?? vercelGeo.countryRegion ?? null,
      country: geo?.country ?? null,
      countryCode: geo?.countryCode ?? vercelGeo.country ?? null,
      continent: geo?.continent ?? null,
      zip: geo?.zip ?? null,
      latitude: lat,
      longitude: lon,
      timezone: geo?.timezone ?? vercelGeo.timezone ?? null,
      currency: geo?.currency ?? null,
      isp: geo?.isp ?? null,
      org: geo?.org ?? null,
      asn: geo?.as ?? null,
      asName: geo?.asname ?? null,
      reverse: geo?.reverse ?? null,
      mobile: geo?.mobile ?? null,
      proxy: geo?.proxy ?? null,
      hosting: geo?.hosting ?? null,
      vpn,
      source: geo ? "ip-api" : "vercel",
    },
    { headers: { "Cache-Control": "no-store, max-age=0" } }
  );
}
