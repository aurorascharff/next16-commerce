import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  experimental: {
    inlineCss: true,
  },
  reactCompiler: true,
  typedRoutes: true,
};

module.exports = nextConfig;
