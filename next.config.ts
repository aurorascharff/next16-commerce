import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    authInterrupts: true,
    clientSegmentCache: true,
    inlineCss: true,
    reactCompiler: true,
    staleTimes: {
      dynamic: 30,
    },
  },
  typedRoutes: true,
};

module.exports = nextConfig;
