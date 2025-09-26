import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",  
  trailingSlash: true,
  assetPrefix: process.env.NODE_ENV === "production" ? "/portfolio" : "",
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
