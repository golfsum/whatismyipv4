"use client";

import { useState, useRef, useCallback, useEffect } from "react";

type Phase = "idle" | "running" | "done" | "error";

interface ServerLoc {
  city?: string;
  country?: string;
  colo?: string;
}

// Custom measurement sequence: run ALL download rounds first, then ALL upload
// rounds (the library's default interleaves them). Latency first, then the
// bandwidth ramps from small to large payloads.
const MEASUREMENTS = [
  { type: "latency", numPackets: 20 },
  { type: "download", bytes: 1e5, count: 1, bypassMinDuration: true },
  { type: "download", bytes: 1e5, count: 9 },
  { type: "download", bytes: 1e6, count: 8 },
  { type: "download", bytes: 1e7, count: 6 },
  { type: "download", bytes: 2.5e7, count: 4 },
  { type: "download", bytes: 1e8, count: 3 },
  { type: "upload", bytes: 1e5, count: 8 },
  { type: "upload", bytes: 1e6, count: 4 },
  { type: "upload", bytes: 1e7, count: 4 },
  { type: "upload", bytes: 2.5e7, count: 3 },
];

// Cloudflare data-center (IATA) code -> friendly city. Covers the major PoPs;
// anything not listed falls back to showing the raw code.
const COLO_CITY: Record<string, string> = {
  LAX: "Los Angeles", SJC: "San Jose", SFO: "San Francisco", SEA: "Seattle",
  DFW: "Dallas", IAD: "Ashburn", EWR: "Newark", ORD: "Chicago", ATL: "Atlanta",
  MIA: "Miami", DEN: "Denver", PHX: "Phoenix", BOS: "Boston", IAH: "Houston",
  MCI: "Kansas City", MSP: "Minneapolis", SLC: "Salt Lake City", LAS: "Las Vegas",
  PDX: "Portland", DTW: "Detroit", PHL: "Philadelphia", TPA: "Tampa",
  SAN: "San Diego", YYZ: "Toronto", YVR: "Vancouver", YUL: "Montreal",
  LHR: "London", MAN: "Manchester", DUB: "Dublin", CDG: "Paris",
  MRS: "Marseille", FRA: "Frankfurt", MUC: "Munich", DUS: "Düsseldorf",
  HAM: "Hamburg", BER: "Berlin", AMS: "Amsterdam", BRU: "Brussels",
  MAD: "Madrid", BCN: "Barcelona", LIS: "Lisbon", MXP: "Milan", FCO: "Rome",
  ZRH: "Zurich", VIE: "Vienna", PRG: "Prague", WAW: "Warsaw", ARN: "Stockholm",
  CPH: "Copenhagen", OSL: "Oslo", HEL: "Helsinki", ATH: "Athens",
  IST: "Istanbul", OTP: "Bucharest", SOF: "Sofia", KBP: "Kyiv",
  DXB: "Dubai", DOH: "Doha", RUH: "Riyadh", JED: "Jeddah", TLV: "Tel Aviv",
  BOM: "Mumbai", DEL: "Delhi", MAA: "Chennai", BLR: "Bangalore",
  HYD: "Hyderabad", CCU: "Kolkata", SIN: "Singapore", KUL: "Kuala Lumpur",
  BKK: "Bangkok", CGK: "Jakarta", MNL: "Manila", HKG: "Hong Kong",
  TPE: "Taipei", NRT: "Tokyo", HND: "Tokyo", KIX: "Osaka", ICN: "Seoul",
  PVG: "Shanghai", SHA: "Shanghai", PEK: "Beijing", SYD: "Sydney",
  MEL: "Melbourne", BNE: "Brisbane", PER: "Perth", AKL: "Auckland",
  GRU: "São Paulo", GIG: "Rio de Janeiro", EZE: "Buenos Aires",
  SCL: "Santiago", LIM: "Lima", BOG: "Bogotá", MEX: "Mexico City",
  JNB: "Johannesburg", CPT: "Cape Town", LOS: "Lagos", NBO: "Nairobi",
  CAI: "Cairo",
};

function fmt(n: number, d = 1): string {
  return isFinite(n) && n > 0 ? n.toFixed(d) : "-";
}

export default function SpeedTest() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [active, setActive] = useState<string>(""); // current measurement type
  const [dl, setDl] = useState(0); // Mbps
  const [ul, setUl] = useState(0); // Mbps
  const [ping, setPing] = useState(0); // ms
  const [jitter, setJitter] = useState(0); // ms
  const [server, setServer] = useState<ServerLoc | null>(null);
  const engineRef = useRef<unknown>(null);

  // The nearest Cloudflare location (chosen automatically via anycast). The
  // trace endpoint returns the data-center code (`colo`) and country (`loc`).
  useEffect(() => {
    fetch("https://speed.cloudflare.com/cdn-cgi/trace")
      .then((r) => r.text())
      .then((text) => {
        const m: Record<string, string> = {};
        for (const line of text.trim().split("\n")) {
          const i = line.indexOf("=");
          if (i > 0) m[line.slice(0, i)] = line.slice(i + 1);
        }
        if (m.colo) {
          setServer({
            colo: m.colo,
            country: m.loc,
            city: COLO_CITY[m.colo],
          });
        }
      })
      .catch(() => {});
  }, []);

  const start = useCallback(async () => {
    if (phase === "running") return;
    setPhase("running");
    setActive("latency");
    setDl(0);
    setUl(0);
    setPing(0);
    setJitter(0);

    try {
      // Loaded lazily so the browser-only library never runs during SSR.
      const { default: SpeedTest } = await import("@cloudflare/speedtest");
      // Runs entirely client-side against Cloudflare's global network - no
      // Vercel bandwidth used. logAimApiUrl:null disables extra logging.
      const engine = new SpeedTest({
        autoStart: false,
        logAimApiUrl: null,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        measurements: MEASUREMENTS as any,
      });
      engineRef.current = engine;

      engine.onPhaseChange = ({ measurement }) => {
        if (measurement?.type) setActive(measurement.type);
      };

      engine.onResultsChange = () => {
        const r = engine.results;
        const d = r.getDownloadBandwidth();
        const u = r.getUploadBandwidth();
        const l = r.getUnloadedLatency();
        const j = r.getUnloadedJitter();
        if (d) setDl(d / 1e6);
        if (u) setUl(u / 1e6);
        if (l) setPing(l);
        if (j) setJitter(j);
      };

      engine.onFinish = (results) => {
        const s = results.getSummary();
        if (s.download) setDl(s.download / 1e6);
        if (s.upload) setUl(s.upload / 1e6);
        if (s.latency) setPing(s.latency);
        if (s.jitter) setJitter(s.jitter);
        setActive("");
        setPhase("done");
      };

      engine.onError = () => setPhase("error");

      engine.play();
    } catch {
      setPhase("error");
    }
  }, [phase]);

  const busy = phase === "running";
  const gaugeValue = active === "upload" ? ul : dl;

  const phaseLabel = busy
    ? active === "upload"
      ? "Testing upload…"
      : active === "download"
      ? "Testing download…"
      : active === "packetLoss"
      ? "Measuring packet loss…"
      : "Measuring latency…"
    : phase === "done"
    ? "Test complete"
    : phase === "error"
    ? "Something went wrong. Please try again."
    : "";

  return (
    <section className="speedtest">
      <div className="gauge">
        <div className="gauge-num">
          {busy && active === "latency" && gaugeValue === 0 ? (
            <span className="skeleton" />
          ) : (
            fmt(gaugeValue)
          )}
        </div>
        <div className="gauge-unit">Mbps {active === "upload" ? "up" : "down"}</div>
        <div className="gauge-phase">{phaseLabel}</div>
      </div>

      <button className="copy-btn speedtest-btn" onClick={start} disabled={busy}>
        {busy
          ? "Testing…"
          : phase === "idle"
          ? "Start Speed Test"
          : "Test Again"}
      </button>

      <div className="speed-grid">
        <SpeedStat
          label="Download"
          value={fmt(dl)}
          unit="Mbps"
          active={active === "download"}
        />
        <SpeedStat
          label="Upload"
          value={fmt(ul)}
          unit="Mbps"
          active={active === "upload"}
        />
        <SpeedStat
          label="Ping"
          value={fmt(ping, 0)}
          unit="ms"
          active={active === "latency"}
        />
        <SpeedStat
          label="Jitter"
          value={fmt(jitter, 0)}
          unit="ms"
          active={active === "latency"}
        />
      </div>

      <p className="speed-note">
        {server?.colo ? (
          <>
            Server:{" "}
            <strong>
              {[server.city || server.colo, server.country]
                .filter(Boolean)
                .join(", ")}
              {server.city ? ` (${server.colo})` : ""}
            </strong>{" "}
            , the Cloudflare location closest to you, chosen automatically.
          </>
        ) : (
          <>Measurements run against Cloudflare&apos;s global network for accuracy.</>
        )}
      </p>
    </section>
  );
}

function SpeedStat({
  label,
  value,
  unit,
  active,
}: {
  label: string;
  value: string;
  unit: string;
  active: boolean;
}) {
  return (
    <div className={`speed-stat${active ? " active" : ""}`}>
      <div className="speed-stat-label">{label}</div>
      <div className="speed-stat-val">
        {value}
        <span className="speed-stat-unit">{unit}</span>
      </div>
    </div>
  );
}
