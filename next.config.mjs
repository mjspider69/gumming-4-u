
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
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '80d2dfd0-c0bf-4211-a4fd-d46966556e47-00-2v719qtwsrwvu.sisko.replit.dev',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/**',
      },
    ],
    domains: ['80d2dfd0-c0bf-4211-a4fd-d46966556e47-00-2v719qtwsrwvu.sisko.replit.dev'],
    formats: ['image/webp', 'image/avif'],
  },
  allowedDevOrigins: ['80d2dfd0-c0bf-4211-a4fd-d46966556e47-00-2v719qtwsrwvu.sisko.replit.dev'],
  trailingSlash: false,
  poweredByHeader: false,
  compress: true,
  experimental: {
    optimizeCss: true,
  },
  env: {
    CUSTOM_KEY: 'G4U_DIGITAL_MARKETING',
  },
}

export default nextConfig
