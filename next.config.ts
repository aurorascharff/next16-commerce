import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  experimental: {
    agentFeedback: true,
    inlineCss: true,
    useOffline: true,
  },
  reactCompiler: true,
  typedRoutes: true,
};

export default nextConfig;
