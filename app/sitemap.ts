import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/config";
import { TOOLS, LEGAL_LINKS } from "@/lib/tools";
import { GUIDES } from "@/lib/guides";
import { CATEGORIES } from "@/lib/categories";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Unique paths from the tool registry + legal pages + guides hub & articles.
  const paths = Array.from(
    new Set([
      ...TOOLS.map((t) => t.href),
      ...LEGAL_LINKS.map((l) => l.href),
      "/tools",
      "/guides",
      ...GUIDES.map((g) => `/guides/${g.slug}`),
      ...CATEGORIES.map((c) => `/category/${c.slug}`),
    ])
  );

  return paths.map((path) => ({
    url: `${SITE_URL}${path === "/" ? "" : path}`,
    lastModified: now,
    changeFrequency: path === "/" ? "daily" : "weekly",
    priority: path === "/" ? 1 : path.startsWith("/about") ? 0.5 : 0.8,
  }));
}
