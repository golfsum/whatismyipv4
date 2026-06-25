# WhatIsMyIPv4

A fast, SEO-optimized "What is my IP?" website built with **Next.js (App Router)** and ready to deploy on **Vercel**. It shows the visitor's public **IPv4 & IPv6** address, geolocation on a map, ISP/network details, and a best-effort **VPN/proxy detection**.

## Features

- 🌐 Detects **IPv4** and **IPv6** independently
- 📍 **IP geolocation** with an interactive OpenStreetMap (no API key needed)
- 🏢 ISP, organization, ASN, hostname and connection type
- 🛡️ **VPN / proxy / datacenter detection** with a confidence score and provider guess (NordVPN, ExpressVPN, Surfshark, Proton VPN, Mullvad, …)
- 🔍 **SEO**: rich metadata, FAQ + WebApplication structured data, sitemap, robots, manifest, OG image
- 💰 **Google AdSense** ad slots wired in (placeholders until you add your IDs)

## Local development

```bash
npm install
npm run dev
# open http://localhost:3000
```

> Note: on `localhost` your IP resolves to a private address, so geolocation
> and VPN detection only fully populate once deployed (or behind a real public IP).

## Deploy to Vercel

1. Push this folder to a GitHub repo.
2. Import it at https://vercel.com/new — Next.js is auto-detected, no config needed.
3. (Optional) add a custom domain, then set the env var `NEXT_PUBLIC_SITE_URL` to your domain.

## Configuration

Edit **`lib/config.ts`** (or set env vars in Vercel):

| Setting | Env var | Purpose |
| --- | --- | --- |
| Canonical URL | `NEXT_PUBLIC_SITE_URL` | SEO canonical, sitemap, robots |
| AdSense client | `NEXT_PUBLIC_ADSENSE_CLIENT` | `ca-pub-9338208326017502` |
| Top ad slot | `NEXT_PUBLIC_ADSENSE_SLOT_TOP` | ad unit slot id |
| Bottom ad slot | `NEXT_PUBLIC_ADSENSE_SLOT_BOTTOM` | ad unit slot id |
| Admin password | `ADMIN_PASSWORD` | protects `/admin` dashboard |
| Ignored IPs | `IGNORED_IPS` | comma-separated IPs excluded from view counts (e.g. your own) |

To stop your own visits inflating the dashboard, set `IGNORED_IPS` in Vercel to
your public IP (shown on the home page), e.g. `203.0.113.7, 2001:db8::1`. To
clear views already recorded (test traffic), use **Reset stats** in `/admin` —
note it wipes all counts and can't be undone.

Ads stay as neutral placeholders until a real publisher ID is set, so the site
is safe to ship before AdSense approval.

### Google AdSense checklist

1. Apply at https://adsense.google.com and add this site.
2. Set `NEXT_PUBLIC_ADSENSE_CLIENT` and the two slot IDs.
3. Update **`public/ads.txt`** with your `pub-XXXXXXXXXXXXXXXX` number.

## SEO / traffic notes

- Verify the site in **Google Search Console** and submit `/sitemap.xml`.
- Target keywords: *what is my ip, my ip address, whatismyip, what is my ipv4, ip lookup, vpn check*.
- A short, exact-match domain (e.g. `whatismyipv4.com`) significantly helps ranking — point it at Vercel and update `NEXT_PUBLIC_SITE_URL`.

## Pages (SEO landing pages)

Each targets a distinct keyword cluster, is statically prerendered, has unique
content + FAQ schema, and cross-links the others:

| Path | Target intent |
| --- | --- |
| `/` | what is my ip / my ip address |
| `/what-is-my-ipv4` | what is my ipv4 |
| `/what-is-my-ipv6` | what is my ipv6 / ipv6 test |
| `/ip-location` | where is my ip / ip location |
| `/vpn-check` | is my vpn working / vpn check |
| `/speedtest` | internet speed test |
| `/hide-my-ip` | how to hide my ip |
| `/what-is-my-router-ip` | router ip / default gateway |

To add another page: create `app/<slug>/page.tsx` (copy an existing one), add it
to `ROUTES` in `app/sitemap.ts` and to `TOOL_LINKS` in `components/SiteChrome.tsx`.
It's then tracked automatically in the admin dashboard's per-page breakdown.

## Speed test

`/speedtest` uses the official **`@cloudflare/speedtest`** library, which runs
entirely client-side against Cloudflare's global anycast network
(`speed.cloudflare.com`). Benefits:
- **Accurate** — multi-stream, duration-based, latency-corrected, percentile
  aggregation; results are comparable to speedtest.net on fast lines.
- **Zero Vercel bandwidth** — the data never touches your server, so it's free
  to run and can't be abused to run up your egress bill.

Implementation is in `components/SpeedTest.tsx` (lazy-loaded so the browser-only
library never executes during SSR). There are no speed-test API routes.

## How it works

- `app/api/ip/route.ts` reads the visitor IP from Vercel's proxy headers and enriches it via [ip-api.com](https://ip-api.com) **server-side** (avoids mixed-content & hides the lookup). Falls back to Vercel's own geo headers.
- The browser independently queries `api.ipify.org` / `api6.ipify.org` to confirm IPv4 vs IPv6.
- VPN logic lives in `lib/vpn.ts`.

## Data sources & limits

- **ip-api.com** free tier: ~45 requests/min per server IP, non-commercial. For
  higher volume or commercial use, switch to a paid plan or a provider with an
  API key (ipinfo.io, ipdata, etc.) inside `app/api/ip/route.ts`.
- Map tiles © OpenStreetMap contributors.
