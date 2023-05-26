/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      process.env.WORDPRESS_API_URL.match(/(http(?:s)?:\/\/)(.*)/)[2], // Valid WP Image domain.
      'api.ams.com.kh',
      'asset.ams.com.kh',
      'secure.gravatar.com',
    ],
  },
};

module.exports = nextConfig;
