/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Cache-Control", value: "no-store, max-age=0" },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // Topic hubs moved from /category/* to /topics/*.
      { source: "/category/:slug", destination: "/topics/:slug", permanent: true },
    ];
  },
};

module.exports = nextConfig;
