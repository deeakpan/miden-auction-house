import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    // Allow importing WASM files
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
    };

    // Ensure WASM files from public directory are handled correctly
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
    };

    return config;
  },
};

export default nextConfig;
