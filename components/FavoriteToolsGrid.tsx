"use client";

import { useEffect, useState } from "react";

interface T {
  href: string;
  label: string;
  desc: string;
  category: string;
}

const KEY = "wimi_fav_tools";

export default function FavoriteToolsGrid({
  tools,
  categories,
}: {
  tools: T[];
  categories: string[];
}) {
  const [favs, setFavs] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setFavs(JSON.parse(raw));
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  const toggle = (href: string) => {
    setFavs((prev) => {
      const next = prev.includes(href)
        ? prev.filter((h) => h !== href)
        : [...prev, href];
      try {
        localStorage.setItem(KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  };

  const Card = ({ t }: { t: T }) => {
    const on = favs.includes(t.href);
    return (
      <div className="tool-card-wrap">
        <a href={t.href} className="tool-card">
          <span className="tc-label">{t.label}</span>
          <span className="tc-desc">{t.desc}</span>
        </a>
        <button
          className={`fav-star${on ? " on" : ""}`}
          onClick={() => toggle(t.href)}
          aria-label={on ? "Remove from favorites" : "Save to favorites"}
          title={on ? "Remove from favorites" : "Save to favorites"}
        >
          {on ? "★" : "☆"}
        </button>
      </div>
    );
  };

  const favTools = tools.filter((t) => favs.includes(t.href));

  return (
    <>
      {ready && favTools.length > 0 && (
        <section className="content">
          <h2>Your favorites</h2>
          <div className="card-grid">
            {favTools.map((t) => (
              <Card key={t.href} t={t} />
            ))}
          </div>
        </section>
      )}

      {categories.map((cat) => {
        const items = tools.filter((t) => t.category === cat);
        if (items.length === 0) return null;
        return (
          <section key={cat} className="tool-cat">
            <h2 id={cat.toLowerCase()}>{cat} tools</h2>
            <div className="card-grid">
              {items.map((t) => (
                <Card key={t.href} t={t} />
              ))}
            </div>
          </section>
        );
      })}
    </>
  );
}
