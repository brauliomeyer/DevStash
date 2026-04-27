import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/DevStash",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
