import type { NextConfig } from 'next';

const isProduction = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // If you want to export to static HTML (for GitHub Pages, etc), uncomment this:
  // output: 'export',
  // assetPrefix: '/product-list-cart/',
  // basePath: '/product-list-cart',
  trailingSlash: true,
};

export default nextConfig;
