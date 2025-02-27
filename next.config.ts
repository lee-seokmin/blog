import type { NextConfig } from "next";
import nextMDX from '@next/mdx';

const nextConfig: NextConfig = {
  content: [
    './app/**/*.{js, ts, jsx, tsx, mdx}',
    './pages/**/*.{js, ts, jsx, tsx, mdx}',
    './components/**/*.{js, ts, jsx, tsx, mdx}',
  ],
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  reactStrictMode: true,
  images: {
    unoptimized: true
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false };

    return config;
  },
};

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);
