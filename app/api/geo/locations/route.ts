import { NextRequest, NextResponse } from "next/server";
import { addGeoLocation, getGeoUserForSession, listGeoLocations, removeGeoLocation } from "@/lib/geo-auth";

const COOKIE = "geo_session";

async function userFrom(req: NextRequest) {
  return getGeoUserForSession(req.cookies.get(COOKIE)?.value);
}

export async function GET(req: NextRequest) {
  const user = await userFrom(req);
  if (!user) return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  return NextResponse.json({ locations: await listGeoLocations(user.id) });
}

export async function POST(req: NextRequest) {
  try {
    const user = await userFrom(req);
    if (!user) return NextResponse.json({ error: "Sign in required." }, { status: 401 });
    const body = await req.json();
    const name = String(body?.name || "").trim().slice(0, 80);
    const latitude = Number(body?.latitude);
    const longitude = Number(body?.longitude);
    const timezone = String(body?.timezone || "").trim().slice(0, 80);
    if (!name || !Number.isFinite(latitude) || !Number.isFinite(longitude)) throw new Error("Name, latitude and longitude are required.");
    if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) throw new Error("Coordinates are out of range.");
    const locations = await addGeoLocation(user.id, { name, latitude, longitude, timezone });
    return NextResponse.json({ locations });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to save location." }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
  const user = await userFrom(req);
  if (!user) return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  const id = new URL(req.url).searchParams.get("id") || "";
  return NextResponse.json({ locations: await removeGeoLocation(user.id, id) });
}
