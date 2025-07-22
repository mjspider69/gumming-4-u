"use client"
import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Enhanced3DBackground } from "@/components/enhanced-3d-background"
import { CheckCircle, Mail, Phone, Globe, ArrowRight, Instagram, Linkedin, Twitter } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Custom cursor component 
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
          border: "2px solid #000000",
          boxShadow: "0 0 25px rgba(255, 255, 255, 0.6)",
        }
      case "link":
        return {
          background: "rgba(0, 0, 0, 0.9)",
          border: "2px solid #ffffff",
          boxShadow: "0 0 20px rgba(0, 0, 0, 0.5)",
        }
      case "hover":
        return {
          background: "rgba(128, 128, 128, 0.8)",
          border: "2px solid #ffffff",
          boxShadow: "0 0 18px rgba(128, 128, 128, 0.4)",
        }
      default:
        return {
          background: "rgba(255, 255, 255, 0.95)",
          border: "1px solid rgba(0, 0, 0, 0.3)",
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

// Navigation Component 
function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-black/98 backdrop-blur-xl border-b border-gray-800/70 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center group">
            <div className="relative">
              <Image
                src="/images/gumming4u-logo.png"
                alt="Gumming4U - Digital Marketing Agency"
                width={100}
                height={40}
                className="transition-all duration-300 group-hover:scale-105 filter brightness-0 invert"
              />
            </div>
          </Link>

          <div className="hidden lg:flex items-center space-x-8">
            {[
              { href: "/", label: "Home" },
              { href: "/about", label: "About", active: true },
              { href: "/services", label: "Services" },
              { href: "/portfolio", label: "Portfolio" },
              { href: "/careers", label: "Careers" },
              { href: "/contact", label: "Contact" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`font-medium text-sm tracking-wide transition-all duration-300 relative group ${
                  item.active ? "text-white" : "text-gray-300 hover:text-white"
                }`}
              >
                {item.label}
                <div
                  className={`absolute bottom-0 left-0 h-0.5 bg-white transition-all duration-300 ${
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
              <Button className="bg-white text-black hover:bg-gray-200 px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-300 hover:scale-105">
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
      <Enhanced3DBackground />
      <CustomCursor />
      <Navigation />

      {/* Hero Section */}
      <section className="pt-20 pb-32 px-16 bg-black">
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="bg-white/20 text-white px-6 py-3 text-sm mb-8 rounded-full">
            Our Story
          </Badge>
          <h1 className="text-7xl font-black mb-12">WHO WE ARE</h1>
          <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Founded by Aryaan Alam in 2023, Gumming4U is a creative rebellion against conventional marketing. We build
            brands where creativity meets inclusivity.
          </p>
        </div>
      </section>

      {/* Main Content with Enhanced Photo Sections */}
      <section className="py-32 px-16 bg-gray-900/30">
        <div className="max-w-7xl mx-auto">
          {/* Managing Director Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
            <div className="space-y-8">
              <h2 className="text-5xl font-black mb-8">LEADERSHIP</h2>
              <div className="bg-black/60 p-10 rounded-2xl border border-gray-700 backdrop-blur-lg">
                <h3 className="text-3xl font-bold mb-4 text-white">Managing Director</h3>
                <h4 className="text-2xl font-semibold text-white mb-6">Aryaan Alam</h4>
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  Visionary leader with a passion for transforming businesses through innovative digital marketing
                  strategies. With years of experience in the digital landscape, Aryaan leads our team with creativity,
                  strategic thinking, and an unwavering commitment to client success.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-white mr-3" />
                    <span>Strategic Digital Marketing Expert</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-white mr-3" />
                    <span>Creative Brand Strategist</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-white mr-3" />
                    <span>Results-Driven Leader</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <Image
                  src="/placeholder.svg?height=600&width=500&text=Aryaan+Alam+Managing+Director"
                  alt="Aryaan Alam - Managing Director, Gumming4U"
                  width={500}
                  height={600}
                  className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-2xl font-bold">Aryaan Alam</h3>
                  <p className="text-gray-300">Managing Director</p>
                </div>
              </div>
            </div>
          </div>

          {/* Company Story & Photo Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <Image
                  src="/placeholder.svg?height=500&width=600&text=Gumming4U+Creative+Workspace"
                  alt="Gumming4U Creative Workspace - Where Innovation Happens"
                  width={600}
                  height={500}
                  className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-xl font-bold">Our Creative Hub</h3>
                  <p className="text-gray-300">Where extraordinary ideas come to life</p>
                </div>
              </div>
            </div>
            <div className="space-y-8 order-1 lg:order-2">
              <h2 className="text-5xl font-black mb-8">OUR MISSION</h2>
              <div className="bg-black/60 p-10 rounded-2xl border border-gray-700 backdrop-blur-lg">
                <p className="text-xl leading-relaxed text-gray-300 mb-8">
                  Our mission is clear: to transform ordinary ideas into extraordinary outcomes through strategic digital
                  marketing, cutting-edge technology, and a relentless focus on client success.
                </p>
                <p className="text-lg leading-relaxed text-gray-400 mb-8">
                  We believe that every business, regardless of size, deserves access to world-class marketing strategies
                  that drive real, measurable results. Our team combines creativity with data-driven insights to create
                  campaigns that not only look great but deliver exceptional ROI.
                </p>

                <h4 className="text-2xl font-bold mb-6 text-white">OUR VALUES</h4>
                <ul className="space-y-4">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-white mr-3" />
                    <span>Creativity meets inclusivity</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-white mr-3" />
                    <span>Data-driven strategies</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-white mr-3" />
                    <span>Measurable results</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-white mr-3" />
                    <span>Client success first</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="mt-32 text-center">
            <div className="bg-black/60 p-12 rounded-2xl border border-gray-700 backdrop-blur-lg max-w-2xl mx-auto">
              <h4 className="text-3xl font-bold mb-8 text-white">GET IN TOUCH</h4>
              <div className="space-y-6">
                <p className="text-xl flex items-center justify-center">
                  <Mail className="w-6 h-6 mr-4 text-white" /> gumming4u@gmail.com
                </p>
                <p className="text-xl flex items-center justify-center">
                  <Phone className="w-6 h-6 mr-4 text-white" /> +91 95510 77771
                </p>
                <p className="text-xl flex items-center justify-center">
                  <Globe className="w-6 h-6 mr-4 text-white" /> Chennai, Tamil Nadu
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-16 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-6xl font-black mb-10">Ready to Work With Us?</h2>
          <p className="text-2xl text-gray-400 mb-16">
            Let's discuss how we can help transform your business with our proven digital marketing strategies.
          </p>
          <Link href="/contact">
            <Button
              size="lg"
              className="bg-white text-black hover:bg-gray-200 px-10 py-5 text-xl font-semibold hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-white/30"
            >
              Get Started Today <ArrowRight className="ml-3 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900/50 text-white border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold mb-6 text-white">Contact Us</h3>
              <div className="space-y-3">
                <p className="flex items-center justify-center md:justify-start text-gray-300">
                  <Mail className="w-5 h-5 mr-3 text-white" />
                  gumming4u@gmail.com
                </p>
                <p className="flex items-center justify-center md:justify-start text-gray-300">
                  <Phone className="w-5 h-5 mr-3 text-white" />
                  +91 95510 77771
                </p>
                <p className="flex items-center justify-center md:justify-start text-gray-300">
                  <Globe className="w-5 h-5 mr-3 text-white" />
                  Chennai, Tamil Nadu, India
                </p>
              </div>
            </div>

            <div className="text-center">
              <h3 className="text-xl font-bold mb-6 text-white">Follow Us</h3>
              <div className="flex justify-center space-x-6">
                <a
                  href="https://instagram.com/gumming4u"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 hover:shadow-lg hover:shadow-white/25"
                >
                  <Instagram className="w-6 h-6" />
                </a>
                <a
                  href="https://linkedin.com/company/gumming4u"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 hover:shadow-lg hover:shadow-white/25"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
                <a
                  href="https://twitter.com/gumming4u"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 hover:shadow-lg hover:shadow-white/25"
                >
                  <Twitter className="w-6 h-6" />
                </a>
              </div>
            </div>

            <div className="text-center md:text-right">
              <h3 className="text-xl font-bold mb-6 text-white">Business Hours</h3>
              <div className="space-y-3 text-gray-300">
                <p>Monday - Friday</p>
                <p className="text-white font-semibold">9:00 AM - 6:00 PM IST</p>
                <p>Saturday: 10:00 AM - 2:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <Image
                src="/images/gumming4u-logo.png"
                alt="Gumming4U"
                width={100}
                height={40}
                className="filter brightness-0 invert mr-4"
              />
              <p className="text-gray-400">Looking for the extra in the ordinary.</p>
            </div>
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-8 text-gray-400">
              <Link href="/privacy-policy" className="hover:text-white transition-colors duration-300">
                Privacy Policy
              </Link>
              <Link href="/terms-conditions" className="hover:text-white transition-colors duration-300">
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