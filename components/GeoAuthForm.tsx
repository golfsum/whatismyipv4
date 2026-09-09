"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function GeoAuthForm({ mode }: { mode: "signup" | "login" }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/geo/auth", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ action: mode, email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Unable to continue.");
      router.push("/geo-test/dashboard");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to continue.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} className="content" style={{ maxWidth: 520, margin: "2rem auto" }}>
      <h1>{mode === "signup" ? "Create your Geo Test account" : "Sign in to Geo Test"}</h1>
      <p>{mode === "signup" ? "Save test locations and compare what your browser reveals." : "Open your saved locations and browser diagnostics."}</p>
      <label style={{ display: "block", marginTop: 18 }}>Email</label>
      <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" autoComplete="email" required style={{ width: "100%", padding: 12, marginTop: 6 }} />
      <label style={{ display: "block", marginTop: 18 }}>Password</label>
      <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" autoComplete={mode === "signup" ? "new-password" : "current-password"} minLength={10} required style={{ width: "100%", padding: 12, marginTop: 6 }} />
      {error ? <p style={{ marginTop: 14 }}><strong>{error}</strong></p> : null}
      <button className="cta cta-primary" disabled={busy} style={{ marginTop: 20, border: 0, cursor: "pointer" }}>
        {busy ? "Working…" : mode === "signup" ? "Create free account" : "Sign in"}
      </button>
      <p style={{ marginTop: 18 }}>
        {mode === "signup" ? <a href="/geo-test/login">Already have an account? Sign in</a> : <a href="/geo-test/signup">Need an account? Sign up free</a>}
      </p>
    </form>
  );
}
