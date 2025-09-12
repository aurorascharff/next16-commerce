import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    authInterrupts: true,
    inlineCss: true,
    ppr: true,
    reactCompiler: true,
    staleTimes: {
      dynamic: 30,
    },
    useCache: true,
  },
  typedRoutes: true,
};

module.exports = nextConfig;
