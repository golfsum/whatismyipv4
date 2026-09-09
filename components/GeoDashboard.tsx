"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type User = { email: string; plan: string };
type SavedLocation = { id: string; name: string; latitude: number; longitude: number; timezone: string; createdAt: string };

type BrowserLocation = { latitude: number; longitude: number; accuracy: number } | null;

export default function GeoDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [locations, setLocations] = useState<SavedLocation[]>([]);
  const [browserLocation, setBrowserLocation] = useState<BrowserLocation>(null);
  const [geoError, setGeoError] = useState("");
  const [name, setName] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [timezone, setTimezone] = useState("");
  const [message, setMessage] = useState("");

  const detectedTimezone = useMemo(() => Intl.DateTimeFormat().resolvedOptions().timeZone || "Unknown", []);
  const locale = useMemo(() => navigator.language || "Unknown", []);

  useEffect(() => {
    Promise.all([fetch("/api/geo/auth"), fetch("/api/geo/locations")]).then(async ([auth, loc]) => {
      const authData = await auth.json();
      if (!authData.user) {
        router.replace("/geo-test/login");
        return;
      }
      setUser(authData.user);
      const locData = await loc.json();
      if (loc.ok) setLocations(locData.locations || []);
    });
  }, [router]);

  function detectLocation() {
    setGeoError("");
    if (!navigator.geolocation) {
      setGeoError("This browser does not expose the Geolocation API.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => setBrowserLocation({ latitude: pos.coords.latitude, longitude: pos.coords.longitude, accuracy: pos.coords.accuracy }),
      (err) => setGeoError(err.message || "Location permission was not granted."),
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }

  async function addLocation(e: FormEvent) {
    e.preventDefault();
    setMessage("");
    const res = await fetch("/api/geo/locations", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ name, latitude: Number(latitude), longitude: Number(longitude), timezone }),
    });
    const data = await res.json();
    if (!res.ok) return setMessage(data.error || "Unable to save location.");
    setLocations(data.locations || []);
    setName(""); setLatitude(""); setLongitude(""); setTimezone("");
    setMessage("Location saved.");
  }

  async function removeLocation(id: string) {
    const res = await fetch(`/api/geo/locations?id=${encodeURIComponent(id)}`, { method: "DELETE" });
    const data = await res.json();
    if (res.ok) setLocations(data.locations || []);
  }

  async function logout() {
    await fetch("/api/geo/auth", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ action: "logout" }) });
    router.push("/geo-test");
    router.refresh();
  }

  if (!user) return <section className="content"><p>Loading Geo Test…</p></section>;

  return (
    <>
      <section className="hero">
        <h1>Geo Test Dashboard</h1>
        <p>Compare the location signals your browser exposes and save location profiles for future testing.</p>
        <div className="cta-row">
          <button onClick={detectLocation} className="cta cta-primary" style={{ border: 0, cursor: "pointer" }}>Check browser location</button>
          <button onClick={logout} className="cta" style={{ cursor: "pointer" }}>Sign out</button>
        </div>
      </section>

      <section className="content">
        <h2>What your browser reveals</h2>
        <div className="card-grid">
          <article className="tool-card"><span className="tc-label">Browser geolocation</span><span className="tc-desc">{browserLocation ? `${browserLocation.latitude.toFixed(5)}, ${browserLocation.longitude.toFixed(5)} (±${Math.round(browserLocation.accuracy)}m)` : "Not requested yet"}</span></article>
          <article className="tool-card"><span className="tc-label">Timezone</span><span className="tc-desc">{detectedTimezone}</span></article>
          <article className="tool-card"><span className="tc-label">Browser locale</span><span className="tc-desc">{locale}</span></article>
          <article className="tool-card"><span className="tc-label">Account</span><span className="tc-desc">{user.email} · {user.plan}</span></article>
        </div>
        {geoError ? <p><strong>{geoError}</strong></p> : null}
        <p className="muted">Your IP-based location remains available on the main WhatsMyIPv4 page. Geo Test adds browser-level location, timezone and locale signals so you can spot mismatches.</p>
      </section>

      <section className="content">
        <h2>Saved test locations</h2>
        <p>Save up to 10 profiles on the free plan. The future browser extension will use these profiles to apply test geolocation and matching timezone settings.</p>
        {locations.length ? <div className="card-grid">{locations.map((location) => (
          <article className="tool-card" key={location.id}>
            <span className="tc-label">{location.name}</span>
            <span className="tc-desc">{location.latitude.toFixed(5)}, {location.longitude.toFixed(5)}{location.timezone ? ` · ${location.timezone}` : ""}</span>
            <button onClick={() => removeLocation(location.id)} style={{ marginTop: 10 }}>Remove</button>
          </article>
        ))}</div> : <p>No saved locations yet.</p>}

        <form onSubmit={addLocation} style={{ marginTop: 24, maxWidth: 720 }}>
          <h3>Add a location profile</h3>
          <label style={{ display: "block", marginTop: 12 }}>Profile name</label>
          <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="London QA" style={{ width: "100%", padding: 10 }} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 12 }}>
            <div><label style={{ display: "block", marginTop: 12 }}>Latitude</label><input required type="number" step="any" value={latitude} onChange={(e) => setLatitude(e.target.value)} style={{ width: "100%", padding: 10 }} /></div>
            <div><label style={{ display: "block", marginTop: 12 }}>Longitude</label><input required type="number" step="any" value={longitude} onChange={(e) => setLongitude(e.target.value)} style={{ width: "100%", padding: 10 }} /></div>
            <div><label style={{ display: "block", marginTop: 12 }}>Timezone</label><input value={timezone} onChange={(e) => setTimezone(e.target.value)} placeholder="Europe/London" style={{ width: "100%", padding: 10 }} /></div>
          </div>
          <button className="cta cta-primary" style={{ marginTop: 16, border: 0, cursor: "pointer" }}>Save location</button>
          {message ? <p>{message}</p> : null}
        </form>
      </section>

      <section className="content">
        <h2>Geo Test Pro is next</h2>
        <p>The extension can use these saved profiles to override browser geolocation for QA and localization testing. Planned Pro features include one-click profiles, timezone matching, per-site rules, WebRTC leak checks, and team-shared profiles.</p>
      </section>
    </>
  );
}
