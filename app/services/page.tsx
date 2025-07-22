"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Enhanced3DBackground } from "@/components/enhanced-3d-background"
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
  Zap,
  Target,
  TrendingUp,
  Layers,
  Megaphone,
} from "lucide-react"
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
              { href: "/about", label: "About" },
              { href: "/services", label: "Services", active: true },
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

export default function ServicesPage() {
  const services = [
    {
      icon: Globe,
      title: "Social Media Management",
      description: "Strategic social media campaigns that drive engagement and build communities across all platforms.",
      features: ["Content Strategy", "Community Management", "Paid Social Advertising", "Analytics & Reporting"],
      vectorIcon: <Megaphone className="w-16 h-16 text-white mb-4" />,
    },
    {
      icon: Monitor,
      title: "Website Development",
      description: "Custom websites optimized for conversions and user experience with modern design principles.",
      features: ["Responsive Design", "SEO Optimization", "Performance Optimization", "CMS Integration"],
      vectorIcon: <Layers className="w-16 h-16 text-white mb-4" />,
    },
    {
      icon: Camera,
      title: "Content Creation",
      description: "Professional photography, videography, and creative content production for your brand.",
      features: ["Photography", "Video Production", "Graphic Design", "Brand Assets"],
      vectorIcon: <Camera className="w-16 h-16 text-white mb-4" />,
    },
    {
      icon: FileText,
      title: "SEO & Copywriting",
      description: "Search-optimized content that ranks and converts visitors into customers.",
      features: ["Keyword Research", "Content Writing", "Technical SEO", "Link Building"],
      vectorIcon: <TrendingUp className="w-16 h-16 text-white mb-4" />,
    },
    {
      icon: ShoppingCart,
      title: "E-commerce Solutions",
      description: "Complete online store setup and optimization for maximum sales and conversions.",
      features: ["Store Setup", "Product Optimization", "Payment Integration", "Inventory Management"],
      vectorIcon: <ShoppingCart className="w-16 h-16 text-white mb-4" />,
    },
    {
      icon: Grid3X3,
      title: "PPC Advertising",
      description: "Data-driven paid advertising campaigns across Google, Facebook, and LinkedIn.",
      features: ["Campaign Strategy", "Ad Creation", "Bid Management", "Performance Tracking"],
      vectorIcon: <Target className="w-16 h-16 text-white mb-4" />,
    },
    {
      icon: Mail,
      title: "Email Marketing",
      description: "Automated email sequences that nurture leads and drive repeat business.",
      features: ["Email Automation", "List Building", "Template Design", "A/B Testing"],
      vectorIcon: <Mail className="w-16 h-16 text-white mb-4" />,
    },
    {
      icon: Bot,
      title: "Marketing Automation",
      description: "AI-powered tools to streamline your marketing processes and improve ROI.",
      features: ["Workflow Automation", "Lead Scoring", "CRM Integration", "Analytics Dashboard"],
      vectorIcon: <Bot className="w-16 h-16 text-white mb-4" />,
    },
    {
      icon: Palette,
      title: "Brand Strategy",
      description: "Complete brand identity development and strategic positioning in the market.",
      features: ["Brand Identity", "Logo Design", "Brand Guidelines", "Market Positioning"],
      vectorIcon: <Zap className="w-16 h-16 text-white mb-4" />,
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white" style={{ cursor: "none" }}>
      <Enhanced3DBackground />
      <CustomCursor />
      <Navigation />

      {/* Hero Section */}
      <section className="pt-20 pb-32 px-16 bg-black">
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="bg-white/20 text-white px-6 py-3 text-sm mb-8 rounded-full">What We Do</Badge>
          <h1 className="text-7xl font-black mb-12">OUR SERVICES</h1>
          <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Comprehensive digital marketing solutions designed to elevate your brand and drive measurable growth across
            all channels.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-32 px-16 bg-gray-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {services.map((service, index) => (
              <Card
                key={index}
                className="bg-black/80 border border-gray-700 hover:border-white/50 transition-all duration-700 group hover:scale-105 hover:shadow-2xl hover:shadow-white/20 backdrop-blur-lg"
              >
                <CardContent className="p-10">
                  <div className="text-center mb-8">
                    {service.vectorIcon}
                  </div>
                  <div className="w-20 h-20 mb-8 bg-gradient-to-br from-gray-800 to-black rounded-2xl flex items-center justify-center group-hover:from-white/20 group-hover:to-gray-900/50 transition-all duration-700 shadow-lg mx-auto">
                    <service.icon className="w-10 h-10 text-gray-400 group-hover:text-white transition-colors duration-700" />
                  </div>
                  <h3 className="text-2xl font-bold mb-6 text-white group-hover:text-white transition-colors duration-500 text-center">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 group-hover:text-gray-300 mb-8 leading-relaxed transition-colors duration-500 text-center">
                    {service.description}
                  </p>
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-gray-400">
                        <CheckCircle className="w-4 h-4 text-white mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="border-t border-gray-700 pt-6">
                    <Link href="/contact">
                      <Button className="w-full bg-white text-black hover:bg-gray-200 transition-all duration-300 hover:scale-105 py-3 font-semibold">
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
      <section className="py-32 px-16 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-6xl font-black mb-10">Ready to Get Started?</h2>
          <p className="text-2xl text-gray-400 mb-16">
            Let's discuss which services are right for your business and create a custom strategy that delivers results.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-white text-black hover:bg-gray-200 px-10 py-5 text-xl font-semibold hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-white/30"
              >
                Get Free Consultation <ArrowRight className="ml-3 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/portfolio">
              <Button
                size="lg"
                variant="outline"
                className="border-3 border-white text-white hover:bg-white hover:text-black px-10 py-5 text-xl font-semibold bg-transparent hover:scale-105 transition-all duration-300"
              >
                View Our Work
              </Button>
            </Link>
          </div>
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