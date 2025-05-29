import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    inlineCss: true,
    ppr: true,
    reactCompiler: true,
    staleTimes: {
      dynamic: 30,
    },
    useCache: true,
  },
};

module.exports = nextConfig;
