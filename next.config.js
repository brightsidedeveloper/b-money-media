const withPWA = require("next-pwa")

/** @type {import('next').NextConfig} */
const nextConfig = withPWA({
  experimental: {
    serverActions: true,
    serverComponentsExternalPackages: ["mongoose"],
  },
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
      {
        protocol: "https",
        hostname: "images.clerk.dev",
      },
      {
        protocol: "https",
        hostname: "uploadthing.com",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
    ],
  },
})

module.exports = nextConfig
