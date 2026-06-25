import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import ViewTracker from "@/components/ViewTracker";
import {
  SITE_URL,
  SITE_NAME,
  ADSENSE_CLIENT,
  ADSENSE_ENABLED,
} from "@/lib/config";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "What's My IP? — Internet Connection & Network Diagnostics | WhatsMyIPv4",
    template: "%s | WhatsMyIPv4",
  },
  description:
    "What is my IP? Instantly see your public IPv4 and IPv6 address, location on a map, ISP, city, country and whether you're connected to a VPN or proxy. Free IP address lookup, no signup.",
  keywords: [
    "what is my ip",
    "what is my ip address",
    "my ip",
    "my ip address",
    "whatismyip",
    "what is my ipv4",
    "what is my ipv6",
    "ip address lookup",
    "find my ip",
    "ip location",
    "check my ip",
    "vpn check",
    "am i connected to a vpn",
    "ip address",
  ],
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME }],
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "What Is My IP Address? — IPv4, IPv6, Location & VPN Check",
    description:
      "Instantly find your public IP address, geolocation on a map, ISP and VPN/proxy status. Free, fast, no signup.",
  },
  twitter: {
    card: "summary_large_image",
    title: "What Is My IP Address? — IPv4, IPv6 & VPN Check",
    description:
      "See your public IP, location on a map, ISP and VPN status instantly.",
  },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: "#0b1020",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {ADSENSE_ENABLED && (
          <Script
            id="adsbygoogle-init"
            async
            strategy="afterInteractive"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
            crossOrigin="anonymous"
          />
        )}
        {/* Structured data: WebSite + Organization for rich results */}
        <Script
          id="ld-website"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: SITE_NAME,
              url: SITE_URL,
              description:
                "Free tool to find your public IPv4 and IPv6 address, location, ISP and VPN status.",
              potentialAction: {
                "@type": "SearchAction",
                target: `${SITE_URL}/?q={search_term_string}`,
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>
      <body>
        <ViewTracker />
        {children}
      </body>
    </html>
  );
}
