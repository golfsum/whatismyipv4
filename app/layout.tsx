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
      "What Is My IPv4 Address? Check Your Public IP | WhatsMyIPv4",
    template: "%s | WhatsMyIPv4",
  },
  description:
    "Check your public IPv4 address instantly. See your current IP, IPv6 address, ISP, approximate location, and VPN or proxy status with free network diagnostic tools.",
  keywords: [
    "what is my ipv4 address",
    "what is my ipv4",
    "check ipv4 address",
    "find my ipv4",
    "current ipv4",
    "public ipv4 address",
    "what is my ip",
    "what is my ip address",
    "my ip",
    "my ip address",
    "whatismyip",
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
    title: "What Is My IPv4 Address? Check Your Public IP",
    description:
      "Instantly check your public IPv4 and IPv6 address, ISP, approximate location and VPN/proxy status. Free, fast and no signup.",
  },
  twitter: {
    card: "summary_large_image",
    title: "What Is My IPv4 Address? Check Your Public IP",
    description:
      "See your current public IPv4, IPv6, ISP, approximate location and VPN status instantly.",
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
                "Free tool to check your public IPv4 and IPv6 address, ISP, approximate location and VPN status.",
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
