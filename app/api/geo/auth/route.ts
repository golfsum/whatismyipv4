import { NextRequest, NextResponse } from "next/server";
import { authenticateGeoUser, createGeoSession, createGeoUser, deleteGeoSession, getGeoUserForSession } from "@/lib/geo-auth";

const COOKIE = "geo_session";
const cookieOptions = { httpOnly: true, sameSite: "lax" as const, secure: process.env.NODE_ENV === "production", path: "/", maxAge: 60 * 60 * 24 * 30 };

export async function GET(req: NextRequest) {
  const user = await getGeoUserForSession(req.cookies.get(COOKIE)?.value);
  return NextResponse.json({ user });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const action = String(body?.action || "");
    if (action === "logout") {
      const token = req.cookies.get(COOKIE)?.value;
      await deleteGeoSession(token);
      const res = NextResponse.json({ ok: true });
      res.cookies.set(COOKIE, "", { ...cookieOptions, maxAge: 0 });
      return res;
    }
    const email = String(body?.email || "");
    const password = String(body?.password || "");
    const user = action === "signup" ? await createGeoUser(email, password) : await authenticateGeoUser(email, password);
    if (!user) return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    const token = await createGeoSession(user.id);
    const res = NextResponse.json({ user });
    res.cookies.set(COOKIE, token, cookieOptions);
    return res;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to complete request.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
