"use client";

import { useState, useRef, useCallback } from "react";

type Phase = "idle" | "running" | "done";

export default function PingTest() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [samples, setSamples] = useState<number[]>([]);
  const running = useRef(false);

  const start = useCallback(async () => {
    if (running.current) return;
    running.current = true;
    setPhase("running");
    setSamples([]);
    const collected: number[] = [];
    try {
      // Warmup so the connection is established before we time.
      await fetch("https://speed.cloudflare.com/__down?bytes=0&w=1", { cache: "no-store" });
      for (let i = 0; i < 20; i++) {
        const t = performance.now();
        await fetch(`https://speed.cloudflare.com/__down?bytes=0&i=${i}`, { cache: "no-store" });
        const rtt = performance.now() - t;
        collected.push(rtt);
        setSamples([...collected]);
        await new Promise((r) => setTimeout(r, 150));
      }
    } catch {
      /* network error; show what we have */
    } finally {
      setPhase("done");
      running.current = false;
    }
  }, []);

  const min = samples.length ? Math.min(...samples) : 0;
  const max = samples.length ? Math.max(...samples) : 0;
  const avg = samples.length ? samples.reduce((a, b) => a + b, 0) / samples.length : 0;
  let jitter = 0;
  for (let i = 1; i < samples.length; i++) jitter += Math.abs(samples[i] - samples[i - 1]);
  jitter = samples.length > 1 ? jitter / (samples.length - 1) : 0;

  const peak = Math.max(max, 1);

  return (
    <section className="tool">
      <div className="gauge">
        <div className="gauge-num">
          {samples.length ? avg.toFixed(0) : phase === "running" ? "…" : "0"}
        </div>
        <div className="gauge-unit">ms average</div>
        <div className="gauge-phase">
          {phase === "running"
            ? `Pinging… ${samples.length}/20`
            : phase === "done"
            ? "Test complete"
            : ""}
        </div>
      </div>

      <button className="copy-btn speedtest-btn" onClick={start} disabled={phase === "running"}>
        {phase === "running" ? "Testing…" : phase === "idle" ? "Start Ping Test" : "Test Again"}
      </button>

      {samples.length > 0 && (
        <>
          <div className="ping-bars" aria-hidden="true">
            {samples.map((s, i) => (
              <span
                key={i}
                className="ping-bar"
                style={{ height: `${Math.max(4, (s / peak) * 100)}%` }}
                title={`${s.toFixed(0)} ms`}
              />
            ))}
          </div>
          <div className="speed-grid">
            <Stat label="Min" value={min.toFixed(0)} />
            <Stat label="Average" value={avg.toFixed(0)} />
            <Stat label="Max" value={max.toFixed(0)} />
            <Stat label="Jitter" value={jitter.toFixed(0)} />
          </div>
        </>
      )}
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="speed-stat">
      <div className="speed-stat-label">{label}</div>
      <div className="speed-stat-val">
        {value}
        <span className="speed-stat-unit">ms</span>
      </div>
    </div>
  );
}
