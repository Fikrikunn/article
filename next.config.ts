/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['s3.sellerpintar.com', 'yourcdn.com'],
  },
  typescript: {
    // Temporarily bypass type checking during build
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
