import type { NextConfig } from 'next';

const isGitHubPages = process.env.CHIPATLAS_TARGET === 'github-pages';

const nextConfig: NextConfig = {
  ...(isGitHubPages
    ? {
        assetPrefix: '/chipatlas',
        trailingSlash: true,
      }
    : {}),
  env: {
    NEXT_PUBLIC_CHIPATLAS_BASE_PATH: isGitHubPages ? '/chipatlas' : '',
  },
};

export default nextConfig;
