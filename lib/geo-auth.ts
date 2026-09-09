import { Redis } from "@upstash/redis";
import crypto from "crypto";

export type GeoUser = { id: string; email: string; createdAt: string; plan: "free" | "pro" | "team" };
export type SavedLocation = { id: string; name: string; latitude: number; longitude: number; timezone: string; createdAt: string };

let client: Redis | null | undefined;
function redis(): Redis | null {
  if (client !== undefined) return client;
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  client = url && token ? new Redis({ url, token }) : null;
  return client;
}

function emailKey(email: string) {
  return crypto.createHash("sha256").update(email.trim().toLowerCase()).digest("hex").slice(0, 32);
}
function hashPassword(password: string, salt = crypto.randomBytes(16).toString("hex")) {
  const digest = crypto.scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${digest}`;
}
function verifyPassword(password: string, stored: string) {
  const [salt, digest] = stored.split(":");
  if (!salt || !digest) return false;
  const candidate = crypto.scryptSync(password, salt, 64);
  const expected = Buffer.from(digest, "hex");
  return expected.length === candidate.length && crypto.timingSafeEqual(expected, candidate);
}

export async function createGeoUser(email: string, password: string): Promise<GeoUser> {
  const r = redis();
  if (!r) throw new Error("Account storage is not configured.");
  const normalized = email.trim().toLowerCase();
  if (!/^\S+@\S+\.\S+$/.test(normalized)) throw new Error("Enter a valid email address.");
  if (password.length < 10) throw new Error("Password must be at least 10 characters.");
  const ek = emailKey(normalized);
  if (await r.get(`geo:user-email:${ek}`)) throw new Error("An account already exists for this email.");
  const id = crypto.randomUUID();
  const user: GeoUser = { id, email: normalized, createdAt: new Date().toISOString(), plan: "free" };
  const p = r.pipeline();
  p.set(`geo:user-email:${ek}`, id);
  p.set(`geo:user:${id}`, JSON.stringify(user));
  p.set(`geo:password:${id}`, hashPassword(password));
  await p.exec();
  return user;
}

export async function authenticateGeoUser(email: string, password: string): Promise<GeoUser | null> {
  const r = redis();
  if (!r) throw new Error("Account storage is not configured.");
  const id = await r.get<string>(`geo:user-email:${emailKey(email)}`);
  if (!id) return null;
  const [storedPassword, rawUser] = await Promise.all([
    r.get<string>(`geo:password:${id}`),
    r.get<string>(`geo:user:${id}`),
  ]);
  if (!storedPassword || !rawUser || !verifyPassword(password, storedPassword)) return null;
  return typeof rawUser === "string" ? JSON.parse(rawUser) : rawUser as unknown as GeoUser;
}

export async function createGeoSession(userId: string): Promise<string> {
  const r = redis();
  if (!r) throw new Error("Account storage is not configured.");
  const token = crypto.randomBytes(32).toString("base64url");
  await r.set(`geo:session:${token}`, userId, { ex: 60 * 60 * 24 * 30 });
  return token;
}

export async function getGeoUserForSession(token?: string | null): Promise<GeoUser | null> {
  const r = redis();
  if (!r || !token) return null;
  const id = await r.get<string>(`geo:session:${token}`);
  if (!id) return null;
  const raw = await r.get<string>(`geo:user:${id}`);
  if (!raw) return null;
  return typeof raw === "string" ? JSON.parse(raw) : raw as unknown as GeoUser;
}

export async function deleteGeoSession(token?: string | null) {
  const r = redis();
  if (r && token) await r.del(`geo:session:${token}`);
}

export async function listGeoLocations(userId: string): Promise<SavedLocation[]> {
  const r = redis();
  if (!r) return [];
  const value = await r.get<SavedLocation[]>(`geo:locations:${userId}`);
  return Array.isArray(value) ? value : [];
}

export async function addGeoLocation(userId: string, input: Omit<SavedLocation, "id" | "createdAt">): Promise<SavedLocation[]> {
  const r = redis();
  if (!r) throw new Error("Account storage is not configured.");
  const current = await listGeoLocations(userId);
  if (current.length >= 10) throw new Error("Free accounts can save up to 10 locations.");
  const next = [...current, { ...input, id: crypto.randomUUID(), createdAt: new Date().toISOString() }];
  await r.set(`geo:locations:${userId}`, next);
  return next;
}

export async function removeGeoLocation(userId: string, id: string): Promise<SavedLocation[]> {
  const r = redis();
  if (!r) throw new Error("Account storage is not configured.");
  const next = (await listGeoLocations(userId)).filter((location) => location.id !== id);
  await r.set(`geo:locations:${userId}`, next);
  return next;
}
