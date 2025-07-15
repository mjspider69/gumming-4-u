import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { StructuredData } from "@/components/structured-data"
import { Analytics } from "@/components/analytics"
import { Suspense } from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Gumming4U - Digital Marketing Agency in Chennai | SEO, PPC, Social Media",
  description:
    "Transform your business with Gumming4U, Chennai's fastest-growing digital marketing agency. Expert SEO, PPC, social media marketing, and web development services. Get your free marketing audit today!",
  keywords: [
    "digital marketing agency Chennai",
    "SEO services Chennai",
    "PPC advertising",
    "social media marketing",
    "web development",
    "content creation",
    "brand strategy",
    "marketing automation",
    "Gumming4U",
    "digital marketing Tamil Nadu",
    "online marketing Chennai",
    "website development Chennai",
    "Google Ads management",
    "Facebook advertising",
    "Instagram marketing",
    "LinkedIn marketing",
    "email marketing",
    "conversion optimization",
    "local SEO Chennai",
  ],
  authors: [{ name: "Gumming4U Team" }],
  creator: "Gumming4U",
  publisher: "Gumming4U",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://gumming4u.com",
    title: "Gumming4U - Digital Marketing Agency in Chennai",
    description:
      "Transform your business with data-driven digital marketing strategies. Chennai's fastest-growing agency specializing in SEO, PPC, and social media marketing.",
    siteName: "Gumming4U",
    images: [
      {
        url: "https://gumming4u.com/images/gumming4u-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Gumming4U Digital Marketing Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gumming4U - Digital Marketing Agency in Chennai",
    description:
      "Transform your business with data-driven digital marketing strategies. Get your free marketing audit today!",
    creator: "@gumming4u",
    images: ["https://gumming4u.com/images/gumming4u-twitter-card.jpg"],
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
    other: {
      "facebook-domain-verification": "your-facebook-verification-code",
    },
  },
  alternates: {
    canonical: "https://gumming4u.com",
    languages: {
      "en-US": "https://gumming4u.com",
      "ta-IN": "https://gumming4u.com/ta",
    },
  },
  category: "Digital Marketing",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="canonical" href="https://gumming4u.com" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta name="format-detection" content="telephone=no" />

        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />

        {/* DNS prefetch for performance */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
      </head>
      <body className={inter.className}>
        <Suspense fallback={null}>
          {children}
          <StructuredData />
          <Analytics />
        </Suspense>
      </body>
    </html>
  )
}
