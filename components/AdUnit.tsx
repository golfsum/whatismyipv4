"use client";

import { useEffect } from "react";
import { ADSENSE_CLIENT, ADSENSE_ENABLED } from "@/lib/config";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

export default function AdUnit({
  slot,
  label = "Advertisement",
  format = "auto",
}: {
  slot: string;
  label?: string;
  format?: string;
}) {
  useEffect(() => {
    if (!ADSENSE_ENABLED) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // AdSense not ready yet - ignored.
    }
  }, []);

  // Until a real publisher ID is configured we show a neutral placeholder so
  // the layout is preserved and the page never ships an invalid ad request.
  if (!ADSENSE_ENABLED) {
    return (
      <div className="ad ad--placeholder" aria-hidden="true">
        <span>Ad space - add your AdSense publisher ID in lib/config.ts</span>
      </div>
    );
  }

  return (
    <div className="ad">
      <span className="ad__label">{label}</span>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
