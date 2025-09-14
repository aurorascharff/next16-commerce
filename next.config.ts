import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    authInterrupts: true,
    cacheComponents: true,
    inlineCss: true,
    ppr: true,
    reactCompiler: true,
    staleTimes: {
      dynamic: 30,
    },
  },
  typedRoutes: true,
};

module.exports = nextConfig;
