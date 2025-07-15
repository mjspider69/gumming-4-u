"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, CheckCircle, Mail, Phone, Globe, Calendar, MessageCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Custom cursor component (same as other pages)
function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [cursorVariant, setCursorVariant] = useState("default")

  // ... (same cursor logic as other pages)

  return (
    <>
      <div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] transition-all duration-200 ease-out"
        style={{
          width: `16px`,
          height: `16px`,
          transform: `translate(${mousePosition.x - 8}px, ${mousePosition.y - 8}px)`,
          background: "rgba(255, 255, 255, 0.95)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          boxShadow: "0 0 15px rgba(255, 255, 255, 0.4)",
        }}
      />
    </>
  )
}

// Navigation Component
function Navigation() {
  return (
    <nav className="bg-black/95 backdrop-blur-xl border-b border-gray-800/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center group">
            <div className="relative">
              <Image
                src="/images/gumming4u-logo.png"
                alt="Gumming4U - Digital Marketing Agency"
                width={100}
                height={40}
                className="transition-all duration-300 group-hover:scale-105"
              />
            </div>
          </Link>

          <div className="hidden lg:flex items-center space-x-8">
            {[
              { href: "/", label: "Home" },
              { href: "/about", label: "About" },
              { href: "/services", label: "Services" },
              { href: "/portfolio", label: "Portfolio" },
              { href: "/blog", label: "Insights" },
              { href: "/contact", label: "Contact" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-medium text-sm tracking-wide transition-all duration-300 relative group text-gray-300 hover:text-white"
              >
                {item.label}
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-400 to-teal-400 transition-all duration-300 group-hover:w-full"></div>
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center">
            <a
              href="https://wa.me/919551077771?text=Hi%20Gumming4U!%20I%27d%20like%20to%20schedule%20a%20call%20to%20discuss%20my%20digital%20marketing%20needs."
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-300 hover:scale-105">
                Schedule a Call
                <ArrowRight className="ml-2 w-3 h-3" />
              </Button>
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default function InquiryPage() {
  return (
    <div className="min-h-screen bg-black text-white" style={{ cursor: "none" }}>
      <CustomCursor />
      <Navigation />

      {/* Hero Section */}
      <section className="pt-16 pb-24 px-16 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 text-sm mb-6 animate-pulse">
            Free Consultation
          </Badge>
          <h1 className="text-6xl font-black mb-8">GET YOUR FREE DIGITAL MARKETING AUDIT</h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Fill out our comprehensive form below to receive a detailed analysis of your current digital presence and
            personalized recommendations for growth.
          </p>
        </div>
      </section>

      {/* Google Form Section */}
      <section className="py-24 px-16 bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-800 p-8 rounded-lg shadow-xl border border-gray-700">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Digital Marketing Consultation Form</h2>
              <p className="text-gray-300">
                Please fill out this form and we'll get back to you within 24 hours with a comprehensive digital
                marketing strategy tailored to your business.
              </p>
            </div>

            {/* Google Form Embed */}
            <div className="bg-white rounded-lg overflow-hidden">
              <iframe
                src="https://docs.google.com/forms/d/e/1FAIpQLSf_YOUR_ACTUAL_FORM_ID_HERE/viewform?embedded=true"
                width="100%"
                height="800"
                frameBorder="0"
                marginHeight={0}
                marginWidth={0}
                title="Digital Marketing Consultation Form"
                className="w-full"
              >
                Loading…
              </iframe>
            </div>

            {/* Alternative Contact Methods */}
            <div className="mt-8 p-6 bg-gray-700 rounded-lg border border-gray-600">
              <h3 className="text-xl font-bold mb-4 text-center">Prefer Direct Contact?</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <a
                  href="https://wa.me/919551077771?text=Hi%20Gumming4U!%20I%27d%20like%20to%20get%20a%20free%20digital%20marketing%20consultation%20for%20my%20business."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg font-semibold flex items-center justify-center">
                    <MessageCircle className="mr-2 w-5 h-5" />
                    WhatsApp: +91 95510 77771
                  </Button>
                </a>
                <a href="mailto:gumming4u@gmail.com?subject=Free Digital Marketing Consultation Request&body=Hi Gumming4U Team,%0D%0A%0D%0AI'm interested in a free digital marketing consultation for my business.%0D%0A%0D%0APlease contact me to discuss my requirements.%0D%0A%0D%0AThank you!">
                  <Button
                    variant="outline"
                    className="w-full border-gray-500 text-gray-300 hover:text-white hover:border-white py-3 text-lg font-semibold flex items-center justify-center bg-transparent"
                  >
                    <Mail className="mr-2 w-5 h-5" />
                    Email Us
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Get Section */}
      <section className="py-24 px-16 bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-8">WHAT YOU'LL GET</h2>
            <p className="text-xl text-gray-400">
              Our comprehensive consultation includes everything you need to understand your digital marketing potential
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Website Audit",
                description: "Complete analysis of your website's performance, SEO, and user experience",
                icon: Globe,
              },
              {
                title: "Competitor Analysis",
                description: "Detailed review of your competitors' digital marketing strategies",
                icon: CheckCircle,
              },
              {
                title: "Social Media Review",
                description: "Assessment of your current social media presence and engagement",
                icon: MessageCircle,
              },
              {
                title: "SEO Opportunities",
                description: "Identification of keyword opportunities and ranking potential",
                icon: ArrowRight,
              },
              {
                title: "Custom Strategy",
                description: "Personalized digital marketing roadmap for your business goals",
                icon: Calendar,
              },
              {
                title: "ROI Projections",
                description: "Expected returns and growth projections from our recommended strategies",
                icon: CheckCircle,
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-emerald-500/30 transition-all duration-300 hover:scale-105"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Details Footer */}
      <footer className="bg-gray-900 text-white border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="text-center md:text-left">
              <h3 className="text-lg font-bold mb-4 text-emerald-400">Contact Us</h3>
              <div className="space-y-2">
                <p className="flex items-center justify-center md:justify-start text-gray-300">
                  <Mail className="w-4 h-4 mr-2 text-emerald-400" />
                  gumming4u@gmail.com
                </p>
                <p className="flex items-center justify-center md:justify-start text-gray-300">
                  <Phone className="w-4 h-4 mr-2 text-emerald-400" />
                  +91 95510 77771
                </p>
                <p className="flex items-center justify-center md:justify-start text-gray-300">
                  <Globe className="w-4 h-4 mr-2 text-emerald-400" />
                  Chennai, Tamil Nadu, India
                </p>
              </div>
            </div>

            <div className="text-center">
              <h3 className="text-lg font-bold mb-4 text-blue-400">Business Hours</h3>
              <div className="space-y-2 text-gray-300">
                <p>Monday - Friday</p>
                <p className="text-emerald-400 font-semibold">9:00 AM - 6:00 PM IST</p>
                <p>Saturday: 10:00 AM - 2:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>

            <div className="text-center md:text-right">
              <h3 className="text-lg font-bold mb-4 text-purple-400">Response Time</h3>
              <div className="space-y-2 text-gray-300">
                <p className="text-emerald-400 font-semibold">Within 24 Hours</p>
                <p>WhatsApp: Immediate</p>
                <p>Email: Same Day</p>
                <p>Form: Next Business Day</p>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <Image
                src="/images/gumming4u-logo.png"
                alt="Gumming4U"
                width={80}
                height={32}
                className="filter invert mr-4"
              />
              <p className="text-gray-400 text-sm">Looking for the extra in the ordinary.</p>
            </div>
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm text-gray-400">
              <Link href="/privacy-policy" className="hover:text-emerald-400 transition-colors duration-300">
                Privacy Policy
              </Link>
              <Link href="/terms-conditions" className="hover:text-emerald-400 transition-colors duration-300">
                Terms & Conditions
              </Link>
              <p>© {new Date().getFullYear()} Gumming4U. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
