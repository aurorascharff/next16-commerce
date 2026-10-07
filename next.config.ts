import type { NextConfig } from 'next';

const exposeTestingApi = process.env.NEXT_TESTING_API === '1';

const nextConfig: NextConfig = {
  cacheComponents: true,
  experimental: {
    agentFeedback: true,
    exposeTestingApiInProductionBuild: exposeTestingApi,
    inlineCss: true,
    useOffline: true,
  },
  partialPrefetching: true,
  reactCompiler: true,
  typedRoutes: true,
};

export default nextConfig;
