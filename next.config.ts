import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  cacheComponents: true,
  experimental: {
    clientSegmentCache: true,
    inlineCss: true,
    routerBFCache: true,
    staleTimes: {
      dynamic: 30,
    },
  },
  reactCompiler: true,
  typedRoutes: true,
};

module.exports = nextConfig;
