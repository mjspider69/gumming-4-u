"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Mail, Phone, Globe, ArrowRight, Instagram, Linkedin, Twitter } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Custom cursor component (same as homepage)
function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [cursorVariant, setCursorVariant] = useState("default")

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    const handleMouseEnter = (e: Event) => {
      const target = e.target as HTMLElement
      setIsHovering(true)

      if (target.tagName === "BUTTON" || target.closest("button")) {
        setCursorVariant("button")
      } else if (target.tagName === "A" || target.closest("a")) {
        setCursorVariant("link")
      } else {
        setCursorVariant("hover")
      }
    }

    const handleMouseLeave = () => {
      setIsHovering(false)
      setCursorVariant("default")
    }

    document.addEventListener("mousemove", updateMousePosition)
    document.addEventListener("mousedown", handleMouseDown)
    document.addEventListener("mouseup", handleMouseUp)

    const interactiveElements = document.querySelectorAll('button, a, [role="button"]')
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter)
      el.addEventListener("mouseleave", handleMouseLeave)
    })

    return () => {
      document.removeEventListener("mousemove", updateMousePosition)
      document.removeEventListener("mousedown", handleMouseDown)
      document.removeEventListener("mouseup", handleMouseUp)
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter)
        el.removeEventListener("mouseleave", handleMouseLeave)
      })
    }
  }, [])

  const getCursorSize = () => {
    switch (cursorVariant) {
      case "button":
        return isClicking ? 45 : 40
      case "link":
        return 35
      case "hover":
        return 30
      default:
        return isClicking ? 20 : 16
    }
  }

  const getCursorStyles = () => {
    switch (cursorVariant) {
      case "button":
        return {
          background: "rgba(255, 255, 255, 0.95)",
          border: "2px solid #10b981",
          boxShadow: "0 0 25px rgba(16, 185, 129, 0.6)",
        }
      case "link":
        return {
          background: "rgba(255, 255, 255, 0.9)",
          border: "2px solid #3b82f6",
          boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)",
        }
      case "hover":
        return {
          background: "rgba(255, 255, 255, 0.8)",
          border: "2px solid #8b5cf6",
          boxShadow: "0 0 18px rgba(139, 92, 246, 0.4)",
        }
      default:
        return {
          background: "rgba(255, 255, 255, 0.95)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          boxShadow: "0 0 15px rgba(255, 255, 255, 0.4)",
        }
    }
  }

  const size = getCursorSize()
  const styles = getCursorStyles()

  return (
    <>
      <div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] transition-all duration-200 ease-out"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          transform: `translate(${mousePosition.x - size / 2}px, ${mousePosition.y - size / 2}px) scale(${isClicking ? 0.85 : 1})`,
          ...styles,
        }}
      />
      <div
        className="fixed top-0 left-0 w-1 h-1 bg-black rounded-full pointer-events-none z-[9999] transition-all duration-100 ease-out"
        style={{
          transform: `translate(${mousePosition.x - 2}px, ${mousePosition.y - 2}px) scale(${isHovering ? 0 : 1})`,
          opacity: cursorVariant === "default" ? 0.8 : 0,
        }}
      />
    </>
  )
}

// Navigation Component (same as homepage but smaller logo)
function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

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

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {[
              { href: "/", label: "Home" },
              { href: "/about", label: "About", active: true },
              { href: "/services", label: "Services" },
              { href: "/portfolio", label: "Portfolio" },
              { href: "/blog", label: "Insights" },
              { href: "/contact", label: "Contact" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`font-medium text-sm tracking-wide transition-all duration-300 relative group ${
                  item.active ? "text-emerald-400" : "text-gray-300 hover:text-white"
                }`}
              >
                {item.label}
                <div
                  className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-emerald-400 to-teal-400 transition-all duration-300 ${
                    item.active ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                ></div>
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

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white" style={{ cursor: "none" }}>
      <CustomCursor />
      <Navigation />

      {/* Hero Section */}
      <section className="pt-16 pb-24 px-16 bg-black">
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 text-sm mb-6">
            Our Story
          </Badge>
          <h1 className="text-6xl font-black mb-8">WHO WE ARE</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Founded by Aryaan Alam in 2023, Gumming4U is a creative rebellion against conventional marketing. We build
            brands where creativity meets inclusivity.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 px-16 bg-gray-900">
        <div className="max-w-7xl mx-auto grid grid-cols-2 gap-24 items-start">
          <div>
            <h2 className="text-4xl font-black mb-8">Our Mission</h2>
            <p className="text-xl leading-relaxed text-gray-300 mb-8">
              Our mission is clear: to transform ordinary ideas into extraordinary outcomes through strategic digital
              marketing, cutting-edge technology, and a relentless focus on client success.
            </p>
            <p className="text-lg leading-relaxed text-gray-400 mb-8">
              We believe that every business, regardless of size, deserves access to world-class marketing strategies
              that drive real, measurable results. Our team combines creativity with data-driven insights to create
              campaigns that not only look great but deliver exceptional ROI.
            </p>
            <div className="mt-8">
              <Image
                src="/placeholder.svg?height=300&width=500&text=Gumming4U+Creative+Workspace"
                alt="Gumming4U Creative Workspace - Where Innovation Happens"
                width={500}
                height={300}
                className="rounded-lg shadow-lg filter grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
          </div>

          <div className="space-y-12">
            <div className="bg-gray-800 p-8 rounded-lg border border-gray-700">
              <h3 className="text-3xl font-black mb-6">LEADERSHIP TEAM</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-bold mb-2">Managing Director</h4>
                  <p className="text-lg font-semibold text-emerald-400">Aryaan Alam</p>
                  <p className="text-gray-400 mt-2">
                    Visionary leader with a passion for transforming businesses through innovative digital marketing
                    strategies.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-8 rounded-lg border border-gray-700">
              <h4 className="text-2xl font-bold mb-4">GET IN TOUCH</h4>
              <div className="space-y-3">
                <p className="text-lg flex items-center">
                  <Mail className="w-5 h-5 mr-3 text-emerald-400" /> gumming4u@gmail.com
                </p>
                <p className="text-lg flex items-center">
                  <Phone className="w-5 h-5 mr-3 text-emerald-400" /> +91 95510 77771
                </p>
                <p className="text-lg flex items-center">
                  <Globe className="w-5 h-5 mr-3 text-emerald-400" /> Chennai, Tamil Nadu
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-8 rounded-lg border border-gray-700">
              <h4 className="text-2xl font-bold mb-4">OUR VALUES</h4>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  <span>Creativity meets inclusivity</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  <span>Data-driven strategies</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  <span>Measurable results</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  <span>Client success first</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-16 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-black mb-8">Ready to Work With Us?</h2>
          <p className="text-xl text-gray-400 mb-12">
            Let's discuss how we can help transform your business with our proven digital marketing strategies.
          </p>
          <Link href="/contact">
            <Button
              size="lg"
              className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600 px-8 py-4 text-lg font-semibold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-emerald-500/25"
            >
              Get Started Today <ArrowRight className="ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Contact Details Footer */}
      <footer className="bg-gray-900 text-white border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Contact Information */}
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
              <h3 className="text-lg font-bold mb-4 text-blue-400">Follow Us</h3>
              <div className="flex justify-center space-x-4">
                <a
                  href="https://instagram.com/gumming4u"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/25"
                >
                  <Instagram className="w-5 h-5 text-white" />
                </a>
                <a
                  href="https://linkedin.com/company/gumming4u"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25"
                >
                  <Linkedin className="w-5 h-5 text-white" />
                </a>
                <a
                  href="https://twitter.com/gumming4u"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 hover:shadow-lg hover:shadow-blue-400/25"
                >
                  <Twitter className="w-5 h-5 text-white" />
                </a>
              </div>
            </div>

            <div className="text-center md:text-right">
              <h3 className="text-lg font-bold mb-4 text-purple-400">Business Hours</h3>
              <div className="space-y-2 text-gray-300">
                <p>Monday - Friday</p>
                <p className="text-emerald-400 font-semibold">9:00 AM - 6:00 PM IST</p>
                <p>Saturday: 10:00 AM - 2:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
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
