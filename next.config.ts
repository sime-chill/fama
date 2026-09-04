import type { NextConfig } from 'next';

const isGitHubPages = process.env.FAMA_TARGET === 'github-pages';

const nextConfig: NextConfig = {
  ...(isGitHubPages
    ? {
        assetPrefix: '/fama',
        trailingSlash: true,
      }
    : {}),
  env: {
    NEXT_PUBLIC_FAMA_BASE_PATH: isGitHubPages ? '/fama' : '',
  },
};

export default nextConfig;
