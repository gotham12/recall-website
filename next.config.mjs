/** @type {import('next').NextConfig} */
const repo = 'recall-website';
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? `/${repo}`;

const nextConfig = {
  output: 'export',
  basePath,
  assetPrefix: `${basePath}/`,
  trailingSlash: true,
  images: {
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
