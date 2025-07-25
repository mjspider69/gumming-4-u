import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { StructuredData } from "@/components/structured-data"
import { Analytics } from "@/components/analytics"
import { Enhanced3DBackground } from "@/components/enhanced-3d-background"
import { ContentEditor } from "@/components/content-editor"
import { Chatbot } from "@/components/chatbot"
import { Suspense } from "react"

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
})

export const metadata: Metadata = {
  title: {
    default: "G4U Digital Marketing - Transform Your Brand with Expert Digital Solutions",
    template: "%s | G4U Digital Marketing"
  },
  description: "Leading digital marketing agency specializing in brand transformation, web development, SEO, social media marketing, and creative design solutions. Drive growth with G4U.",
  keywords: ["digital marketing", "brand design", "web development", "SEO", "social media marketing", "G4U", "digital agency"],
  authors: [{ name: "G4U Digital Marketing" }],
  creator: "G4U Digital Marketing",
  publisher: "G4U Digital Marketing",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://80d2dfd0-c0bf-4211-a4fd-d46966556e47-00-2v719qtwsrwvu.sisko.replit.dev'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "G4U Digital Marketing - Transform Your Brand",
    description: "Leading digital marketing agency specializing in brand transformation and digital solutions.",
    url: 'https://80d2dfd0-c0bf-4211-a4fd-d46966556e47-00-2v719qtwsrwvu.sisko.replit.dev',
    siteName: 'G4U Digital Marketing',
    images: [
      {
        url: '/images/gumming4u-logo.png',
        width: 1200,
        height: 630,
        alt: 'G4U Digital Marketing',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'G4U Digital Marketing - Transform Your Brand',
    description: 'Leading digital marketing agency specializing in brand transformation and digital solutions.',
    images: ['/images/gumming4u-logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
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
          <Chatbot />
          <div className="relative z-10">
            {children}
          </div>
        </Suspense>
      </body>
    </html>
  )
}