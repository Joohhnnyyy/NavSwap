import type { NextConfig } from "next";
import path from "node:path";

const LOADER = path.resolve(__dirname, 'src/visual-edits/component-tagger-loader.js');

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
  // outputFileTracingRoot: path.resolve(__dirname, '../../'),
  typescript: {
    ignoreBuildErrors: true,
  },
  // eslint: {
  //   ignoreDuringBuilds: true,
  // },
  // turbopack: {
  //   rules: {
  //     "*.{jsx,tsx}": {
  //       loaders: [LOADER]
  //     }
  //   }
  // }
  async rewrites() {
    return [
      {
        source: '/api/proxy/gateway/:path*',
        destination: 'http://ec2-52-89-235-59.us-west-2.compute.amazonaws.com:3000/:path*',
      },
      {
        source: '/api/proxy/recommendation/:path*',
        destination: 'http://ec2-52-89-235-59.us-west-2.compute.amazonaws.com:3002/:path*',
      },
    ];
  },
};

export default nextConfig;
// Orchids restart: 1769758937722
