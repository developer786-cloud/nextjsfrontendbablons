import type { NextConfig } from "next";

const legacySpaUrl = process.env.LEGACY_SPA_URL?.replace(/\/+$/, "");

const nextConfig: NextConfig = {
  async rewrites() {
    if (!legacySpaUrl) return { fallback: [] };
    return {
      fallback: [
        {
          source: "/:path*",
          destination: `${legacySpaUrl}/:path*`,
        },
      ],
    };
  },
};

export default nextConfig;
