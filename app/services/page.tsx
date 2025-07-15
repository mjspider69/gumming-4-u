"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  Mail,
  Camera,
  Palette,
  Bot,
  Globe,
  Monitor,
  FileText,
  ShoppingCart,
  Grid3X3,
  CheckCircle,
  Phone,
  Instagram,
  Linkedin,
  Twitter,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Custom cursor component (same as other pages)
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

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {[
              { href: "/", label: "Home" },
              { href: "/about", label: "About" },
              { href: "/services", label: "Services", active: true },
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

export default function ServicesPage() {
  const services = [
    {
      icon: Globe,
      title: "Social Media Management",
      description: "Strategic social media campaigns that drive engagement and build communities across all platforms.",
      features: ["Content Strategy", "Community Management", "Paid Social Advertising", "Analytics & Reporting"],
      price: "Starting from ₹25,000/month",
    },
    {
      icon: Monitor,
      title: "Website Development",
      description: "Custom websites optimized for conversions and user experience with modern design principles.",
      features: ["Responsive Design", "SEO Optimization", "Performance Optimization", "CMS Integration"],
      price: "Starting from ₹50,000",
    },
    {
      icon: Camera,
      title: "Content Creation",
      description: "Professional photography, videography, and creative content production for your brand.",
      features: ["Photography", "Video Production", "Graphic Design", "Brand Assets"],
      price: "Starting from ₹15,000/project",
    },
    {
      icon: FileText,
      title: "SEO & Copywriting",
      description: "Search-optimized content that ranks and converts visitors into customers.",
      features: ["Keyword Research", "Content Writing", "Technical SEO", "Link Building"],
      price: "Starting from ₹20,000/month",
    },
    {
      icon: ShoppingCart,
      title: "E-commerce Solutions",
      description: "Complete online store setup and optimization for maximum sales and conversions.",
      features: ["Store Setup", "Product Optimization", "Payment Integration", "Inventory Management"],
      price: "Starting from ₹75,000",
    },
    {
      icon: Grid3X3,
      title: "PPC Advertising",
      description: "Data-driven paid advertising campaigns across Google, Facebook, and LinkedIn.",
      features: ["Campaign Strategy", "Ad Creation", "Bid Management", "Performance Tracking"],
      price: "Starting from ₹30,000/month",
    },
    {
      icon: Mail,
      title: "Email Marketing",
      description: "Automated email sequences that nurture leads and drive repeat business.",
      features: ["Email Automation", "List Building", "Template Design", "A/B Testing"],
      price: "Starting from ₹12,000/month",
    },
    {
      icon: Bot,
      title: "Marketing Automation",
      description: "AI-powered tools to streamline your marketing processes and improve ROI.",
      features: ["Workflow Automation", "Lead Scoring", "CRM Integration", "Analytics Dashboard"],
      price: "Starting from ₹35,000/month",
    },
    {
      icon: Palette,
      title: "Brand Strategy",
      description: "Complete brand identity development and strategic positioning in the market.",
      features: ["Brand Identity", "Logo Design", "Brand Guidelines", "Market Positioning"],
      price: "Starting from ₹40,000",
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white" style={{ cursor: "none" }}>
      <CustomCursor />
      <Navigation />

      {/* Hero Section */}
      <section className="pt-16 pb-24 px-16 bg-black">
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="bg-white/20 text-white px-4 py-2 text-sm mb-6">What We Do</Badge>
          <h1 className="text-6xl font-black mb-8">OUR SERVICES</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Comprehensive digital marketing solutions designed to elevate your brand and drive measurable growth across
            all channels.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 px-16 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className="bg-gray-800 border border-gray-700 hover:border-emerald-500/30 transition-all duration-500 group hover:scale-[1.02] hover:shadow-2xl hover:shadow-emerald-500/10"
              >
                <CardContent className="p-8">
                  <div className="w-16 h-16 mb-6 bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl flex items-center justify-center group-hover:from-emerald-600/20 group-hover:to-teal-600/20 transition-all duration-500">
                    <service.icon className="w-8 h-8 text-gray-400 group-hover:text-emerald-400 transition-colors duration-500" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-white group-hover:text-emerald-100 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 group-hover:text-gray-300 mb-6 leading-relaxed transition-colors duration-300">
                    {service.description}
                  </p>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-gray-400">
                        <CheckCircle className="w-4 h-4 text-emerald-400 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="border-t border-gray-700 pt-4">
                    <p className="text-emerald-400 font-semibold mb-4">{service.price}</p>
                    <Link href="/contact">
                      <Button className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white transition-all duration-300 hover:scale-105">
                        Get Started
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-16 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-black mb-8">Ready to Get Started?</h2>
          <p className="text-xl text-gray-400 mb-12">
            Let's discuss which services are right for your business and create a custom strategy that delivers results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600 px-8 py-4 text-lg font-semibold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-emerald-500/25"
              >
                Get Free Consultation <ArrowRight className="ml-2" />
              </Button>
            </Link>
            <Link href="/portfolio">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg font-semibold bg-transparent hover:scale-105 transition-all duration-300"
              >
                View Our Work
              </Button>
            </Link>
          </div>
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
