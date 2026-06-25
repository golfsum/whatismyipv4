// ---------------------------------------------------------------------------
// Lightweight view analytics backed by Upstash Redis (a.k.a. Vercel KV).
//
// Why Redis: Vercel functions are stateless, so we need an external store to
// persist counts. Upstash has a generous free tier and supports HyperLogLog
// (PFADD/PFCOUNT) which counts UNIQUE visitors using tiny, fixed memory.
//
// Storage layout:
//   views:total              -> integer, every page view
//   views:day:YYYY-MM-DD     -> integer, views that day
//   unique:total             -> HLL of visitor hashes (all-time unique)
//   unique:day:YYYY-MM-DD    -> HLL of visitor hashes that day
//   views:country            -> hash { US: 1234, GB: 567, ... }
//
// If no Redis credentials are present every function becomes a safe no-op so
// the site still builds and runs.
// ---------------------------------------------------------------------------

import { Redis } from "@upstash/redis";
import crypto from "crypto";

let client: Redis | null | undefined;

function getRedis(): Redis | null {
  if (client !== undefined) return client;
  const url =
    process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token =
    process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  client = url && token ? new Redis({ url, token }) : null;
  return client;
}

export function analyticsEnabled(): boolean {
  return getRedis() !== null;
}

const SALT = process.env.ANALYTICS_SALT || "whatismyipv4-analytics-salt";

// A privacy-preserving visitor fingerprint: we never store the raw IP, only a
// salted hash used to de-duplicate unique visitors.
function visitorHash(ip: string, ua: string): string {
  return crypto
    .createHash("sha256")
    .update(`${ip}|${ua}|${SALT}`)
    .digest("hex")
    .slice(0, 24);
}

function dayKey(d: Date): string {
  return d.toISOString().slice(0, 10); // UTC YYYY-MM-DD
}

function lastNDays(n: number): string[] {
  const out: string[] = [];
  const now = Date.now();
  for (let i = n - 1; i >= 0; i--) {
    out.push(dayKey(new Date(now - i * 86_400_000)));
  }
  return out;
}

// Paths we never count in the traffic dashboard.
const EXCLUDED_PREFIXES = ["/admin", "/api"];

// Normalize a request path for grouping, or return null if it should not be
// tracked at all (e.g. the admin dashboard itself).
export function normalizePath(input?: string | null): string | null {
  let path = (input || "/").trim().split(/[?#]/)[0]; // drop query/hash
  if (!path.startsWith("/")) path = "/" + path;
  if (path.length > 1) path = path.replace(/\/+$/, ""); // trim trailing slash
  if (path.length > 120) path = path.slice(0, 120);
  const excluded = EXCLUDED_PREFIXES.some(
    (p) => path === p || path.startsWith(p + "/")
  );
  return excluded ? null : path;
}

export async function recordView(opts: {
  ip: string;
  ua: string;
  country?: string | null;
  path?: string | null;
}): Promise<void> {
  const r = getRedis();
  if (!r) return;

  // Excluded paths (admin/api) contribute to NO metric.
  const path = normalizePath(opts.path);
  if (!path) return;

  const day = dayKey(new Date());
  const h = visitorHash(opts.ip || "unknown", opts.ua || "");

  const p = r.pipeline();
  p.incr("views:total");
  p.incr(`views:day:${day}`);
  p.pfadd("unique:total", h);
  p.pfadd(`unique:day:${day}`, h);
  if (opts.country) p.hincrby("views:country", opts.country, 1);
  p.hincrby("views:page", path, 1);
  p.pfadd(`unique:page:${path}`, h);
  await p.exec();
}

// Wipes ALL analytics data (counters, daily series, unique HLLs, country and
// page breakdowns). Used by the admin "Reset stats" action to clear inflated
// test data. Returns the number of keys deleted.
export async function resetStats(): Promise<number> {
  const r = getRedis();
  if (!r) return 0;

  const exact = ["views:total", "unique:total", "views:country", "views:page"];
  const patterns = ["views:day:*", "unique:day:*", "unique:page:*"];

  const keys = [...exact];
  for (const pattern of patterns) {
    const found = await r.keys(pattern);
    keys.push(...found);
  }
  if (keys.length === 0) return 0;
  return r.del(...keys);
}

export interface DayStat {
  date: string;
  views: number;
  unique: number;
}

export interface Stats {
  totalViews: number;
  uniqueViews: number;
  todayViews: number;
  todayUnique: number;
  series: DayStat[];
  topCountries: { country: string; views: number }[];
  topPages: { path: string; views: number; unique: number }[];
}

export async function getStats(days = 30): Promise<Stats | null> {
  const r = getRedis();
  if (!r) return null;

  const dayList = lastNDays(days);

  const p = r.pipeline();
  p.get<number>("views:total"); // 0
  p.pfcount("unique:total"); // 1
  for (const d of dayList) p.get<number>(`views:day:${d}`); // 2 .. 2+n-1
  for (const d of dayList) p.pfcount(`unique:day:${d}`); // next n
  p.hgetall<Record<string, string>>("views:country");
  p.hgetall<Record<string, string>>("views:page"); // last

  const res = (await p.exec()) as unknown[];

  let i = 0;
  const totalViews = Number(res[i++] ?? 0);
  const uniqueViews = Number(res[i++] ?? 0);

  const viewsByDay = dayList.map(() => Number(res[i++] ?? 0));
  const uniqueByDay = dayList.map(() => Number(res[i++] ?? 0));
  const countryHash = (res[i++] as Record<string, string> | null) || {};
  const pageHash = (res[i++] as Record<string, string> | null) || {};

  const series: DayStat[] = dayList.map((date, idx) => ({
    date,
    views: viewsByDay[idx] || 0,
    unique: uniqueByDay[idx] || 0,
  }));

  const topCountries = Object.entries(countryHash)
    .map(([country, views]) => ({ country, views: Number(views) }))
    .sort((a, b) => b.views - a.views)
    .slice(0, 12);

  // Top pages by views (excluding any legacy /admin or /api entries), then
  // fetch unique visitors per page via a second pipeline.
  const pages = Object.entries(pageHash)
    .map(([path, views]) => ({ path, views: Number(views) }))
    .filter((x) => normalizePath(x.path) !== null)
    .sort((a, b) => b.views - a.views)
    .slice(0, 15);

  let topPages = pages.map((pg) => ({ ...pg, unique: 0 }));
  if (pages.length > 0) {
    const pp = r.pipeline();
    for (const pg of pages) pp.pfcount(`unique:page:${pg.path}`);
    const ures = (await pp.exec()) as unknown[];
    topPages = pages.map((pg, idx) => ({
      ...pg,
      unique: Number(ures[idx] ?? 0),
    }));
  }

  const last = series[series.length - 1];

  return {
    totalViews,
    uniqueViews,
    todayViews: last?.views ?? 0,
    todayUnique: last?.unique ?? 0,
    series,
    topCountries,
    topPages,
  };
}
