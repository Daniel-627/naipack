import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Photos uploaded in the Sanity Studio are served from Sanity's image CDN.
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
};

export default nextConfig;
