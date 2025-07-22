/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
    ]
  },
  images: {
    domains: ['localhost', '80d2dfd0-c0bf-4211-a4fd-d46966556e47-00-2v719qtwsrwvu.sisko.replit.dev'],
  },
  trailingSlash: false,
  poweredByHeader: false,
  compress: true,
  optimizeFonts: true,
  swcMinify: true,
}

export default nextConfig