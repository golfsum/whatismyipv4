// ---------------------------------------------------------------------------
// Site-wide configuration. Edit these values after deploying.
// ---------------------------------------------------------------------------

// Your canonical production URL (no trailing slash). Update after you add a
// custom domain on Vercel. Used for SEO canonical tags, sitemap and robots.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://whatsmyipv4.com";

export const SITE_NAME = "WhatsMyIPv4";
export const SITE_TAGLINE = "Internet Diagnostics & Network Troubleshooting Toolkit";

// Public contact address shown on Contact/Privacy pages. Set up forwarding for
// this on your domain, or change it to any address you monitor.
export const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL || "contact@whatsmyipv4.com";

// Static "last updated" date for legal pages (update when you revise them).
export const LEGAL_UPDATED = "June 24, 2026";

// -------- Google AdSense --------
// 1. Sign up at https://adsense.google.com and get your publisher ID.
// 2. Replace the value below with "ca-pub-XXXXXXXXXXXXXXXX".
// 3. Update public/ads.txt with the same publisher number.
// Leaving it as the placeholder simply disables the ad scripts.
export const ADSENSE_CLIENT =
  process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "ca-pub-9338208326017502";

// Ad unit "slot" IDs created in your AdSense dashboard (Ads > By ad unit).
export const ADSENSE_SLOT_TOP =
  process.env.NEXT_PUBLIC_ADSENSE_SLOT_TOP || "5437263737";
export const ADSENSE_SLOT_BOTTOM =
  process.env.NEXT_PUBLIC_ADSENSE_SLOT_BOTTOM || "6072817859";

// Ads are enabled whenever a real publisher ID is present (i.e. not the
// all-zeros placeholder). Don't compare against your real ID here.
export const ADSENSE_ENABLED =
  /^ca-pub-\d{6,}$/.test(ADSENSE_CLIENT) &&
  ADSENSE_CLIENT !== "ca-pub-0000000000000000";

// -------- Admin dashboard (/admin) --------
// The dashboard reads server-only env vars (see README):
//   ADMIN_PASSWORD            -> required to view /admin
//   UPSTASH_REDIS_REST_URL    -> view storage (auto-added by Vercel KV/Upstash)
//   UPSTASH_REDIS_REST_TOKEN  -> view storage
//   ANALYTICS_SALT (optional) -> salt used when hashing visitor fingerprints
//   IGNORED_IPS (optional)    -> comma-separated IPs to exclude from view
//                                counts, e.g. your own IP "203.0.113.7, 2001:db8::1"
// These are intentionally NOT exposed here - they must stay server-side.
