import Script from "next/script";
import { SITE_URL } from "@/lib/config";

export interface Crumb {
  name: string;
  href: string;
}

// Renders a visible breadcrumb trail plus BreadcrumbList structured data.
// BreadcrumbList is one of the few rich results Google still shows broadly, and
// it reinforces site structure for crawlers.
export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  const last = items[items.length - 1];
  return (
    <>
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <ol>
          {items.map((it, i) => {
            const isLast = i === items.length - 1;
            return (
              <li key={it.href}>
                {isLast ? (
                  <span aria-current="page">{it.name}</span>
                ) : (
                  <a href={it.href}>{it.name}</a>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <Script
        id={`ld-breadcrumb-${last.href}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: items.map((it, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: it.name,
              item: `${SITE_URL}${it.href === "/" ? "" : it.href}`,
            })),
          }),
        }}
      />
    </>
  );
}
