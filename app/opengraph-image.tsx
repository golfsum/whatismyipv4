import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "What Is My IP Address - IPv4, IPv6, Location & VPN Check";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(900px 500px at 50% 0%, #1a2546 0%, #0b1020 60%)",
          color: "#e8edf7",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 34, letterSpacing: 6, color: "#9aa8c7" }}>
          WHATISMYIPV4
        </div>
        <div
          style={{
            fontSize: 84,
            fontWeight: 800,
            marginTop: 16,
            textAlign: "center",
          }}
        >
          What Is My IP Address?
        </div>
        <div
          style={{
            fontSize: 34,
            marginTop: 18,
            color: "#9aa8c7",
            textAlign: "center",
          }}
        >
          IPv4 · IPv6 · Location on a map · VPN check
        </div>
      </div>
    ),
    { ...size }
  );
}
