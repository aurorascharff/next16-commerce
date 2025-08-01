import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    authInterrupts: true,
    cacheComponents: true,
    inlineCss: true,
    reactCompiler: true,
  },
};

module.exports = nextConfig;
