/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.NEXT_PUBLIC_WORDPRESS_API_URL,
      },
      {
        protocol: 'https',
        hostname: 'api.ams.com.kh',
      },
      {
        protocol: 'https',
        hostname: 'radio.amskh.co',
      },
      {
        protocol: 'https',
        hostname: 'asset.ams.com.kh',
      },
      {
        protocol: 'https',
        hostname: 'secure.gravatar.com',
      },
      {
        protocol: 'https',
        hostname: 'fm97.amskh.co',
      },
      {
        protocol: 'https',
        hostname: 'fm97.ams.com.kh',
      },
    ].filter(Boolean),
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
