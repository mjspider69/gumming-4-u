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
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '80d2dfd0-c0bf-4211-a4fd-d46966556e47-00-2v719qtwsrwvu.sisko.replit.dev',
        pathname: '/**',
      },
    ],
  },
  allowedDevOrigins: ['80d2dfd0-c0bf-4211-a4fd-d46966556e47-00-2v719qtwsrwvu.sisko.replit.dev'],
  trailingSlash: false,
  poweredByHeader: false,
  compress: true,
}

export default nextConfig