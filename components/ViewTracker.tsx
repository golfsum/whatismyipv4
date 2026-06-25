"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function ViewTracker() {
  const pathname = usePathname();
  // Remember the last path we tracked so React strict-mode's double-invoke
  // (dev) doesn't double-count, while still re-counting a real navigation
  // back to a page we visited earlier.
  const last = useRef<string | null>(null);

  useEffect(() => {
    if (!pathname) return;
    // Never count the admin dashboard or API routes.
    if (pathname.startsWith("/admin") || pathname.startsWith("/api")) return;
    if (last.current === pathname) return;
    last.current = pathname;

    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path: pathname }),
      keepalive: true,
    }).catch(() => {});
  }, [pathname]);

  return null;
}
