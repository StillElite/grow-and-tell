import type { NextConfig } from 'next';

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // If you want to export to static HTML (for GitHub Pages, etc), uncomment this:
  output: 'export',
  // Only needed for GitHub Pages (production build)
  basePath: isProd ? '/grow-and-tell' : '',
  trailingSlash: true,
  images: {
    unoptimized: true, // Required because GH Pages can't run the Next.js image server
  },
};

export default nextConfig;
