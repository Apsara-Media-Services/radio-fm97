/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: [
      'api.ams.com.kh',
      'radio.amskh.co',
      'asset.ams.com.kh',
      'secure.gravatar.com',
    ],
  },
};

module.exports = nextConfig;
