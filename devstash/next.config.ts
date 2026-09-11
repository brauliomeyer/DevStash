import type { NextConfig } from "next";

const isGitHubPagesBuild = process.env.GITHUB_ACTIONS === "true";
const repoBasePath = isGitHubPagesBuild ? "/DevStash" : "";

const nextConfig: NextConfig = {
  output: "export",
  basePath: repoBasePath,

  images: {
    unoptimized: true,
  },

  allowedDevOrigins: ["192.168.1.131"],
};

export default nextConfig;
