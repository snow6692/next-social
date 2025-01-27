import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "img.clerk.com",
        protocol: "https",
        pathname:
          "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yc0NPRTJuUmRhM21ENWM3T2JLUkJWMXl1VUkifQ",
      },
    ],
  },
};

export default nextConfig;
