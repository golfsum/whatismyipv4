"use client";

import { useEffect, useState } from "react";
import { dohQuery } from "@/lib/doh";

interface Health {
  score: number;
  label: string;
  latency: number | null;
  ipv6: boolean;
  secure: boolean;
  dns: boolean;
  recommendations: string[];
}

async function measureLatency(): Promise<number | null> {
  try {
    const samples: number[] = [];
    await fetch("https://speed.cloudflare.com/__down?bytes=0&w=1", {
      cache: "no-store",
    });
    for (let i = 0; i < 4; i++) {
      const t = performance.now();
      await fetch(`https://speed.cloudflare.com/__down?bytes=0&i=${i}`, {
        cache: "no-store",
      });
      samples.push(performance.now() - t);
    }
    return Math.min(...samples);
  } catch {
    return null;
  }
}

function grade(score: number): string {
  if (score >= 85) return "Excellent";
  if (score >= 70) return "Good";
  if (score >= 50) return "Fair";
  return "Poor";
}

export default function NetworkHealth() {
  const [health, setHealth] = useState<Health | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const [latency, ipv6, dns] = await Promise.all([
        measureLatency(),
        fetch("https://api6.ipify.org?format=json")
          .then((r) => r.json())
          .then((d) => !!(d.ip && d.ip.includes(":")))
          .catch(() => false),
        dohQuery("cloudflare.com", "A")
          .then((r) => r.status === 0 && r.answers.length > 0)
          .catch(() => false),
      ]);

      const secure =
        typeof window !== "undefined" && window.location.protocol === "https:";

      let score = 15; // online
      const recommendations: string[] = [];

      if (latency == null) {
        score += 10;
      } else if (latency < 30) score += 40;
      else if (latency < 60) score += 32;
      else if (latency < 100) score += 24;
      else if (latency < 150) {
        score += 14;
        recommendations.push(
          "Your latency is a bit high — use a wired connection or move closer to the router for smoother calls and gaming."
        );
      } else {
        score += 6;
        recommendations.push(
          "High latency detected. Restart your router, switch to Ethernet, or contact your ISP if it persists."
        );
      }

      if (ipv6) score += 20;
      else {
        score += 8;
        recommendations.push(
          "Your connection is IPv4-only. IPv6 is the modern standard — ask your ISP whether it's available."
        );
      }

      if (secure) score += 10;
      if (dns) score += 15;
      else
        recommendations.push(
          "DNS resolution looked slow or blocked. Try a fast public resolver like 1.1.1.1 or 8.8.8.8."
        );

      score = Math.min(100, score);

      if (!cancelled) {
        setHealth({
          score,
          label: grade(score),
          latency,
          ipv6,
          secure,
          dns,
          recommendations,
        });
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const score = health?.score ?? 0;
  const tone =
    score >= 85 ? "good" : score >= 50 ? "warn" : health ? "bad" : "warn";

  return (
    <section className="health">
      <div className="health-top">
        <div className={`health-score health-score--${tone}`}>
          <div className="health-num">{health ? score : "—"}</div>
          <div className="health-max">/100</div>
        </div>
        <div className="health-meta">
          <h2>Network Health Score</h2>
          <p className="health-label">
            {health ? health.label : "Analysing your connection…"}
          </p>
          <div className="health-chips">
            <HealthChip
              label="Latency"
              value={
                health
                  ? health.latency == null
                    ? "n/a"
                    : `${Math.round(health.latency)} ms`
                  : "…"
              }
              ok={!!health && health.latency != null && health.latency < 100}
            />
            <HealthChip
              label="IPv6"
              value={health ? (health.ipv6 ? "Yes" : "No") : "…"}
              ok={!!health && health.ipv6}
            />
            <HealthChip
              label="DNS"
              value={health ? (health.dns ? "OK" : "Slow") : "…"}
              ok={!!health && health.dns}
            />
            <HealthChip
              label="Secure"
              value={health ? (health.secure ? "HTTPS" : "No") : "…"}
              ok={!!health && health.secure}
            />
          </div>
        </div>
      </div>

      {health && health.recommendations.length > 0 && (
        <ul className="health-recs">
          {health.recommendations.map((r, i) => (
            <li key={i}>{r}</li>
          ))}
        </ul>
      )}

      <p className="health-cta">
        Want the full picture?{" "}
        <a href="/speedtest">Run a complete speed test →</a>
      </p>
    </section>
  );
}

function HealthChip({
  label,
  value,
  ok,
}: {
  label: string;
  value: string;
  ok: boolean;
}) {
  return (
    <span className={`health-chip${ok ? " ok" : ""}`}>
      <span className="hc-label">{label}</span>
      <span className="hc-value">{value}</span>
    </span>
  );
}
