/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      // NextJS <Image> component needs to whitelist domains for src={}
      'lh3.googleusercontent.com',
      'pbs.twimg.com',
      'images.unsplash.com',
      'logos-world.net',
    ],
  },

  async redirects() {
    return [
      {
        // this will match `/english(default)/something` being requested
        source: '/blog/:slug',
        destination: 'https://v2.maferland.com/blog/:slug',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
