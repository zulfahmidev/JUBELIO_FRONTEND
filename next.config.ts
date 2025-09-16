import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.dummyjson.com",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1"
      },
      {
        protocol: "http",
        hostname: "localhost"
      }
    ],
  },
};

export default nextConfig;
