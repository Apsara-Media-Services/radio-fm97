if (!process.env.NEXT_PUBLIC_WORDPRESS_API_URL) {
  throw new Error(`
    Please provide a valid WordPress instance URL.
    Add to your environment variables WORDPRESS_API_URL.
  `);
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      process.env.NEXT_PUBLIC_WORDPRESS_API_URL.match(/(http(?:s)?:\/\/)(.*)/)[2], // Valid WP Image domain.
      'api.ams.com.kh',
      'asset.ams.com.kh',
      'secure.gravatar.com',
    ],
  },
  output: 'standalone',
};

module.exports = nextConfig;
