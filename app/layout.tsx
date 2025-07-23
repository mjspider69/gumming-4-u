import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { StructuredData } from "@/components/structured-data"
import { Analytics } from "@/components/analytics"
import { Suspense } from "react"

const inter = Inter({ subsets: ["latin"] })

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#000000',
}

export const metadata: Metadata = {
  title: "Gumming4U - #1 Digital Marketing Agency in Chennai | SEO, PPC, Social Media Marketing",
  description:
    "🚀 Transform your business with Gumming4U - Chennai's fastest-growing digital marketing agency. Expert SEO services, PPC advertising, social media marketing & web development. 📈 Get your FREE marketing audit today! ✅ 200+ Happy Clients ✅ 5-Star Reviews",
  keywords: [
    "digital marketing agency",
    "digital marketing agency Chennai", 
    "best digital marketing agency",
    "SEO services Chennai",
    "PPC advertising Chennai",
    "social media marketing agency",
    "web development Chennai",
    "content marketing agency",
    "brand strategy consulting",
    "marketing automation services",
    "Gumming4U",
    "digital marketing company Chennai",
    "online marketing Chennai",
    "website development Chennai",
    "Google Ads management",
    "Facebook advertising agency",
    "Instagram marketing Chennai",
    "LinkedIn marketing services",
    "email marketing Chennai",
    "conversion optimization",
    "local SEO Chennai",
    "digital marketing consultant",
    "internet marketing agency",
    "performance marketing",
    "growth marketing agency",
    "digital advertising agency",
    "marketing agency near me",
    "top marketing agency Chennai"
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
        <meta name="geo.region" content="IN-TN" />
        <meta name="geo.placename" content="Chennai" />
        <meta name="geo.position" content="13.0827;80.2707" />
        <meta name="ICBM" content="13.0827, 80.2707" />
        <meta name="language" content="English" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />
        <meta name="coverage" content="worldwide" />
        <meta name="target" content="all" />
        <meta name="HandheldFriendly" content="true" />
        <meta name="MobileOptimized" content="width" />
        <meta name="audience" content="all" />
        <meta name="subject" content="Digital Marketing Services" />
        <meta name="abstract" content="Professional digital marketing agency in Chennai offering SEO, PPC, social media marketing and web development services" />
        <meta name="topic" content="Digital Marketing" />
        <meta name="summary" content="Gumming4U is Chennai's leading digital marketing agency providing comprehensive online marketing solutions" />
        <meta name="Classification" content="Business" />
        <meta name="designer" content="Gumming4U" />
        <meta name="reply-to" content="gumming4u@gmail.com" />
        <meta name="owner" content="Gumming4U" />
        <meta name="url" content="https://gumming4u.com" />
        <meta name="identifier-URL" content="https://gumming4u.com" />
        <meta name="directory" content="submission" />
        <meta name="category" content="Digital Marketing, SEO, PPC, Social Media Marketing" />
        <link rel="author" href="https://gumming4u.com/about" />

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
          <Enhanced3DBackground allowTextEdit={true}/>
          <ContentEditor />
          <Analytics />
          <StructuredData />
          <div className="relative z-10">
            {children}
          </div>
        </Suspense>
      </body>
    </html>
  )
}