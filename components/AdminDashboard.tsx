"use client";

import { useEffect, useState, useCallback } from "react";

interface DayStat {
  date: string;
  views: number;
  unique: number;
}
interface Stats {
  analyticsEnabled: boolean;
  message?: string;
  totalViews?: number;
  uniqueViews?: number;
  todayViews?: number;
  todayUnique?: number;
  series?: DayStat[];
  topCountries?: { country: string; views: number }[];
  topPages?: { path: string; views: number; unique: number }[];
}

const KEY_STORE = "wimi_admin_key";

function flagEmoji(cc: string): string {
  if (!cc || cc.length !== 2) return "🌐";
  return String.fromCodePoint(
    ...cc
      .toUpperCase()
      .split("")
      .map((c) => 0x1f1e6 + (c.charCodeAt(0) - 65))
  );
}

export default function AdminDashboard() {
  const [key, setKey] = useState("");
  const [authed, setAuthed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);
  const [days, setDays] = useState(30);

  const load = useCallback(
    async (k: string, d: number) => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/admin/stats?days=${d}`, {
          headers: { "x-admin-key": k },
        });
        const data = await res.json();
        if (res.status === 401) {
          setError("Wrong password.");
          setAuthed(false);
          sessionStorage.removeItem(KEY_STORE);
          return;
        }
        if (res.status === 503) {
          setError(data.error || "Dashboard not configured.");
          setAuthed(false);
          return;
        }
        setStats(data);
        setAuthed(true);
        sessionStorage.setItem(KEY_STORE, k);
      } catch {
        setError("Failed to load stats.");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Try a stored key on first render.
  useEffect(() => {
    const saved = sessionStorage.getItem(KEY_STORE);
    if (saved) {
      setKey(saved);
      load(saved, days);
    }
  }, [load, days]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    load(key, days);
  };

  const changeDays = (d: number) => {
    setDays(d);
    if (authed) load(key, d);
  };

  const logout = () => {
    sessionStorage.removeItem(KEY_STORE);
    setAuthed(false);
    setStats(null);
    setKey("");
  };

  const reset = async () => {
    if (
      !confirm(
        "Reset ALL traffic stats to zero? This permanently deletes every view, unique visitor, country and page count and cannot be undone."
      )
    )
      return;
    try {
      const res = await fetch("/api/admin/reset", {
        method: "POST",
        headers: { "x-admin-key": key },
      });
      if (res.ok) {
        await load(key, days);
      } else {
        setError("Reset failed.");
      }
    } catch {
      setError("Reset failed.");
    }
  };

  if (!authed) {
    return (
      <div className="admin-login">
        <h1>Admin Dashboard</h1>
        <p className="muted">Enter the admin password to view traffic stats.</p>
        <form onSubmit={submit}>
          <input
            type="password"
            placeholder="Admin password"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            autoFocus
          />
          <button type="submit" disabled={loading || !key}>
            {loading ? "Checking…" : "Sign in"}
          </button>
        </form>
        {error && <p className="err">{error}</p>}
      </div>
    );
  }

  if (stats && stats.analyticsEnabled === false) {
    return (
      <div className="admin-wrap">
        <div className="admin-top">
          <h1>Admin Dashboard</h1>
          <button className="ghost" onClick={logout}>
            Sign out
          </button>
        </div>
        <div className="notice">
          <h3>📦 Storage not connected yet</h3>
          <p>{stats.message}</p>
          <p className="muted">
            In Vercel → your project → <strong>Storage</strong> → create an{" "}
            <strong>Upstash Redis</strong> (KV) database and connect it. The
            required env vars are added automatically. Then redeploy.
          </p>
        </div>
      </div>
    );
  }

  const series = stats?.series ?? [];
  const maxViews = Math.max(1, ...series.map((d) => d.views));

  return (
    <div className="admin-wrap">
      <div className="admin-top">
        <h1>Traffic Dashboard</h1>
        <div className="admin-actions">
          <select
            value={days}
            onChange={(e) => changeDays(Number(e.target.value))}
          >
            <option value={7}>Last 7 days</option>
            <option value={14}>Last 14 days</option>
            <option value={30}>Last 30 days</option>
            <option value={90}>Last 90 days</option>
          </select>
          <button className="ghost" onClick={() => load(key, days)}>
            ↻ Refresh
          </button>
          <button className="ghost danger" onClick={reset}>
            Reset stats
          </button>
          <button className="ghost" onClick={logout}>
            Sign out
          </button>
        </div>
      </div>

      <div className="stat-grid">
        <Stat label="Total Views" value={stats?.totalViews} accent="brand" />
        <Stat
          label="Unique Visitors"
          value={stats?.uniqueViews}
          accent="violet"
        />
        <Stat label="Views Today" value={stats?.todayViews} accent="green" />
        <Stat
          label="Unique Today"
          value={stats?.todayUnique}
          accent="amber"
        />
      </div>

      <div className="panel">
        <div className="panel-head">
          <h3>Daily views &amp; unique visitors</h3>
          <div className="legend">
            <span>
              <i className="sw views" /> Views
            </span>
            <span>
              <i className="sw uniq" /> Unique
            </span>
          </div>
        </div>
        <div className="chart">
          {series.map((d) => {
            const vh = (d.views / maxViews) * 100;
            const uh = (d.unique / maxViews) * 100;
            return (
              <div
                className="bar-col"
                key={d.date}
                title={`${d.date}\nViews: ${d.views}\nUnique: ${d.unique}`}
              >
                <div className="bar-stack">
                  <div className="bar views" style={{ height: `${vh}%` }} />
                  <div className="bar uniq" style={{ height: `${uh}%` }} />
                </div>
                <span className="bar-label">{d.date.slice(5)}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="panel">
        <h3>Views by page</h3>
        {stats?.topPages && stats.topPages.length > 0 ? (
          <table className="ctable ptable">
            <thead>
              <tr>
                <th>Page</th>
                <th className="cnum">Views</th>
                <th className="cnum">Unique</th>
              </tr>
            </thead>
            <tbody>
              {stats.topPages.map((pg) => {
                const max = stats.topPages![0].views || 1;
                return (
                  <tr key={pg.path}>
                    <td className="ppath">
                      <span
                        className="cbar"
                        style={{ width: `${(pg.views / max) * 100}%` }}
                      />
                      <code>{pg.path}</code>
                    </td>
                    <td className="cnum">{pg.views.toLocaleString()}</td>
                    <td className="cnum">{pg.unique.toLocaleString()}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <p className="muted">No page data yet.</p>
        )}
      </div>

      <div className="panel">
        <h3>Top countries</h3>
        {stats?.topCountries && stats.topCountries.length > 0 ? (
          <table className="ctable">
            <tbody>
              {stats.topCountries.map((c) => {
                const max = stats.topCountries![0].views || 1;
                return (
                  <tr key={c.country}>
                    <td className="cflag">{flagEmoji(c.country)}</td>
                    <td className="ccode">{c.country}</td>
                    <td className="cbarcell">
                      <span
                        className="cbar"
                        style={{ width: `${(c.views / max) * 100}%` }}
                      />
                    </td>
                    <td className="cnum">{c.views.toLocaleString()}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <p className="muted">No country data yet.</p>
        )}
      </div>

      {error && <p className="err">{error}</p>}
    </div>
  );
}

function Stat({
  label,
  value,
  accent,
}: {
  label: string;
  value?: number;
  accent: string;
}) {
  return (
    <div className={`stat stat--${accent}`}>
      <div className="stat-num">{(value ?? 0).toLocaleString()}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}
