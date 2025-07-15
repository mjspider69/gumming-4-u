"use client"

import { Canvas } from "@react-three/fiber"
import { Suspense, useEffect, useState } from "react"
import { Environment, Float, Text3D, OrbitControls, Sphere, Box, Torus, Stars } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  Camera,
  Globe,
  Monitor,
  FileText,
  ShoppingCart,
  Grid3X3,
  Star,
  Instagram,
  Linkedin,
  Twitter,
  Mail,
  Phone,
  ChevronDown,
  Calendar,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { trackServiceInquiry } from "@/components/analytics"
import { Chatbot } from "@/components/chatbot"

// Custom cursor component with enhanced visibility and professional styling
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
      } else if (
        target.closest('[data-cursor="text"]') ||
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA"
      ) {
        setCursorVariant("text")
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

    const interactiveElements = document.querySelectorAll('button, a, [role="button"], input, textarea, [data-cursor]')
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
      case "text":
        return 25
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
          boxShadow: "0 0 25px rgba(16, 185, 129, 0.6), inset 0 0 15px rgba(16, 185, 129, 0.2)",
        }
      case "link":
        return {
          background: "rgba(255, 255, 255, 0.9)",
          border: "2px solid #3b82f6",
          boxShadow: "0 0 20px rgba(59, 130, 246, 0.5), inset 0 0 10px rgba(59, 130, 246, 0.2)",
        }
      case "text":
        return {
          background: "rgba(255, 255, 255, 0.85)",
          border: "1px solid #f59e0b",
          boxShadow: "0 0 15px rgba(245, 158, 11, 0.4)",
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
          boxShadow: "0 0 15px rgba(255, 255, 255, 0.4), 0 0 30px rgba(255, 255, 255, 0.2)",
        }
    }
  }

  const size = getCursorSize()
  const styles = getCursorStyles()

  return (
    <>
      {/* Main cursor with high visibility */}
      <div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] transition-all duration-200 ease-out"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          transform: `translate(${mousePosition.x - size / 2}px, ${mousePosition.y - size / 2}px) scale(${isClicking ? 0.85 : 1})`,
          ...styles,
          backdropFilter: "blur(1px)",
        }}
      />

      {/* Inner dot for precision */}
      <div
        className="fixed top-0 left-0 w-1 h-1 bg-black rounded-full pointer-events-none z-[9999] transition-all duration-100 ease-out"
        style={{
          transform: `translate(${mousePosition.x - 2}px, ${mousePosition.y - 2}px) scale(${isHovering ? 0 : 1})`,
          opacity: cursorVariant === "default" ? 0.8 : 0,
        }}
      />

      {/* Outer ring for enhanced visibility */}
      <div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9998] transition-all duration-300 ease-out"
        style={{
          width: `${size + 10}px`,
          height: `${size + 10}px`,
          transform: `translate(${mousePosition.x - (size + 10) / 2}px, ${mousePosition.y - (size + 10) / 2}px)`,
          border: "1px solid rgba(255, 255, 255, 0.2)",
          opacity: isHovering ? 0.6 : 0,
        }}
      />
    </>
  )
}

// 3D Scene Components
function FloatingElements() {
  return (
    <>
      <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={0.5} />

      <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
        <Sphere args={[0.4, 32, 32]} position={[-3, 2, -2]}>
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.1} />
        </Sphere>
      </Float>

      <Float speed={2} rotationIntensity={2} floatIntensity={1}>
        <Box args={[0.6, 0.6, 0.6]} position={[3, -1, -1]}>
          <meshStandardMaterial color="#000000" />
        </Box>
      </Float>

      <Float speed={1.8} rotationIntensity={1.5} floatIntensity={1.5}>
        <Torus args={[0.5, 0.2, 16, 32]} position={[2, 3, -3]}>
          <meshStandardMaterial color="#666666" />
        </Torus>
      </Float>
    </>
  )
}

function Hero3D() {
  return (
    <Float speed={1} rotationIntensity={0.5} floatIntensity={0.5}>
      <Text3D font="/fonts/Geist_Bold.json" size={0.6} height={0.1} position={[-1.5, 0, 0]}>
        G4U
        <meshStandardMaterial color="#ffffff" />
      </Text3D>
    </Float>
  )
}

// Professional Navigation Component - Updated to match the design
function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isWorkDropdownOpen, setIsWorkDropdownOpen] = useState(false)

  return (
    <nav className="bg-black/95 backdrop-blur-xl border-b border-gray-800/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <Link href="/" className="flex items-center group">
            <div className="relative">
              <Image
                src="/images/gumming4u-logo.png"
                alt="Gumming4U - Digital Marketing Agency"
                width={120}
                height={48}
                className="transition-all duration-300 group-hover:scale-105"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-12">
            <Link
              href="/"
              className="text-gray-300 hover:text-white font-medium text-base tracking-wide transition-all duration-300 relative group"
            >
              Home
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-400 to-teal-400 transition-all duration-300 group-hover:w-full"></div>
            </Link>

            <Link
              href="/about"
              className="text-gray-300 hover:text-white font-medium text-base tracking-wide transition-all duration-300 relative group"
            >
              About
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-400 to-teal-400 transition-all duration-300 group-hover:w-full"></div>
            </Link>

            <div className="relative">
              <button
                onClick={() => setIsWorkDropdownOpen(!isWorkDropdownOpen)}
                className="text-gray-300 hover:text-white font-medium text-base tracking-wide transition-all duration-300 relative group flex items-center"
              >
                Work
                <ChevronDown className="ml-1 w-4 h-4" />
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-400 to-teal-400 transition-all duration-300 group-hover:w-full"></div>
              </button>

              {isWorkDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-gray-900 border border-gray-700 rounded-lg shadow-xl z-50">
                  <Link
                    href="/portfolio"
                    className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-800 transition-all duration-300"
                    onClick={() => setIsWorkDropdownOpen(false)}
                  >
                    Portfolio
                  </Link>
                  <Link
                    href="/services"
                    className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-800 transition-all duration-300"
                    onClick={() => setIsWorkDropdownOpen(false)}
                  >
                    Services
                  </Link>
                  <Link
                    href="/blog"
                    className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-800 transition-all duration-300 rounded-b-lg"
                    onClick={() => setIsWorkDropdownOpen(false)}
                  >
                    Case Studies
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/contact"
              className="text-gray-300 hover:text-white font-medium text-base tracking-wide transition-all duration-300 relative group"
            >
              Contact
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-400 to-teal-400 transition-all duration-300 group-hover:w-full"></div>
            </Link>

            <Link
              href="/careers"
              className="text-gray-300 hover:text-white font-medium text-base tracking-wide transition-all duration-300 relative group"
            >
              Careers
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-400 to-teal-400 transition-all duration-300 group-hover:w-full"></div>
            </Link>

            <Link
              href="/refer"
              className="text-gray-300 hover:text-white font-medium text-base tracking-wide transition-all duration-300 relative group"
            >
              Refer Us & Win
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-400 to-teal-400 transition-all duration-300 group-hover:w-full"></div>
            </Link>
          </div>

          {/* Schedule a Call Button */}
          <div className="hidden lg:flex items-center">
            <a
              href="https://wa.me/919551077771?text=Hi%20Gumming4U!%20I%27d%20like%20to%20schedule%20a%20call%20to%20discuss%20my%20digital%20marketing%20needs."
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                className="border-2 border-gray-400 text-gray-300 hover:text-white hover:border-white bg-transparent px-6 py-2 text-base font-medium rounded-full transition-all duration-300 hover:scale-105 flex items-center"
              >
                <Calendar className="mr-2 w-4 h-4" />
                Schedule a Call
              </Button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden relative w-8 h-8 flex items-center justify-center rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-all duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <div className="relative w-5 h-5">
              <span
                className={`absolute top-1 left-0 w-5 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? "rotate-45 top-2" : ""}`}
              ></span>
              <span
                className={`absolute top-2 left-0 w-5 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? "opacity-0" : ""}`}
              ></span>
              <span
                className={`absolute top-3 left-0 w-5 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? "-rotate-45 top-2" : ""}`}
              ></span>
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`lg:hidden transition-all duration-300 overflow-hidden ${isMenuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"}`}
        >
          <div className="pt-4 pb-3 space-y-1">
            {[
              { href: "/", label: "Home" },
              { href: "/about", label: "About" },
              { href: "/portfolio", label: "Portfolio" },
              { href: "/services", label: "Services" },
              { href: "/blog", label: "Case Studies" },
              { href: "/contact", label: "Contact" },
              { href: "/careers", label: "Careers" },
              { href: "/refer", label: "Refer Us & Win" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800/30 rounded-lg transition-all duration-300 font-medium text-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-3">
              <a
                href="https://wa.me/919551077771?text=Hi%20Gumming4U!%20I%27d%20like%20to%20schedule%20a%20call%20to%20discuss%20my%20digital%20marketing%20needs."
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  onClick={() => setIsMenuOpen(false)}
                  variant="outline"
                  className="w-full border-2 border-gray-400 text-gray-300 hover:text-white hover:border-white bg-transparent py-2 font-medium rounded-full transition-all duration-300 text-sm flex items-center justify-center"
                >
                  <Calendar className="mr-2 w-4 h-4" />
                  Schedule a Call
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default function Component() {
  const [showHiddenImage, setShowHiddenImage] = useState(false)

  const services = [
    {
      icon: Globe,
      title: "Social Media",
      subtitle: "Management",
      description: "Strategic social media campaigns that drive engagement and build communities",
    },
    {
      icon: Monitor,
      title: "Website",
      subtitle: "Development",
      description: "Custom websites optimized for conversions and user experience",
    },
    {
      icon: Camera,
      title: "Content",
      subtitle: "Creation",
      description: "Professional photography, videography, and creative content production",
    },
    {
      icon: FileText,
      title: "SEO &",
      subtitle: "Copywriting",
      description: "Search-optimized content that ranks and converts visitors into customers",
    },
    {
      icon: ShoppingCart,
      title: "E-commerce",
      subtitle: "Solutions",
      description: "Complete online store setup and optimization for maximum sales",
    },
    {
      icon: Grid3X3,
      title: "PPC",
      subtitle: "Advertising",
      description: "Data-driven paid advertising campaigns across Google, Facebook, and LinkedIn",
    },
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      company: "TechStart Solutions",
      role: "CEO",
      content:
        "Gumming4U transformed our digital presence completely. Their strategic approach and creative execution delivered results beyond our expectations.",
      rating: 5,
      image: "/placeholder.svg?height=80&width=80&text=Sarah+J",
    },
    {
      name: "Michael Chen",
      company: "GreenTech Innovations",
      role: "Marketing Director",
      content:
        "The team's expertise in both traditional and digital marketing helped us reach new markets and increase our revenue by 200%.",
      rating: 5,
      image: "/placeholder.svg?height=80&width=80&text=Michael+C",
    },
    {
      name: "Priya Sharma",
      company: "Fashion Forward",
      role: "Founder",
      content:
        "Professional, creative, and results-driven. Gumming4U's e-commerce optimization strategies doubled our online sales.",
      rating: 5,
      image: "/placeholder.svg?height=80&width=80&text=Priya+S",
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden" style={{ cursor: "none" }}>
      <CustomCursor />
      <Navigation />
      <Chatbot />

      {/* Hero Section */}
      <section className="min-h-screen flex">
        {/* Left Side - Text Content */}
        <div className="w-1/2 bg-gray-900 text-white flex flex-col justify-center px-16 relative">
          <div className="absolute inset-0 z-0 opacity-20">
            <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
              <Suspense fallback={null}>
                <Environment preset="night" />
                <ambientLight intensity={0.3} />
                <pointLight position={[5, 5, 5]} />
                <Hero3D />
                <FloatingElements />
                <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.3} />
              </Suspense>
            </Canvas>
          </div>

          <div className="relative z-10">
            <div className="relative">
              <h1 className="text-7xl font-black leading-tight mb-8">
                LOOKING FOR
                <br />
                THE{" "}
                <span
                  className="text-gray-400 relative cursor-pointer hover:text-white transition-colors duration-300"
                  data-cursor="text"
                  onMouseEnter={() => setShowHiddenImage(true)}
                  onMouseLeave={() => setShowHiddenImage(false)}
                >
                  EXTRA
                </span>
                <br />
                IN THE <span className="text-gray-400">ORDINARY</span>
              </h1>

              {/* Hidden Reveal Image */}
              <div
                className={`absolute top-0 left-0 w-full h-full pointer-events-none transition-all duration-700 ease-out ${
                  showHiddenImage ? "opacity-30 scale-100" : "opacity-0 scale-95"
                }`}
                style={{
                  transform: `scale(${showHiddenImage ? 1 : 0.95})`,
                  filter: "grayscale(100%) contrast(1.2)",
                  zIndex: -1,
                }}
              >
                <Image
                  src="/images/hidden-reveal.png"
                  alt="Hidden reveal - Gumming4U branding"
                  width={600}
                  height={400}
                  className="w-full h-full object-contain mix-blend-overlay"
                />
              </div>
            </div>

            <p className="text-2xl mb-8 font-light">We don't market. We make movements.</p>

            <p className="text-lg mb-12 text-gray-300 leading-relaxed">
              Transform your business with data-driven digital marketing strategies that deliver measurable results.
              From SEO to social media, we're your growth partners.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600 px-8 py-4 text-lg font-semibold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-emerald-500/25"
                  onClick={() => trackServiceInquiry("free_audit")}
                >
                  Get Free Marketing Audit <ArrowRight className="ml-2" />
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
        </div>

        {/* Right Side - Image */}
        <div className="w-1/2 bg-gray-800 flex items-center justify-center relative">
          <div className="absolute inset-0 z-0 opacity-10">
            <Canvas camera={{ position: [0, 0, 8] }}>
              <Suspense fallback={null}>
                <Environment preset="studio" />
                <ambientLight intensity={0.5} />
                <FloatingElements />
              </Suspense>
            </Canvas>
          </div>
          <Image
            src="/placeholder.svg?height=600&width=500&text=Digital+Marketing+Professional"
            alt="Digital Marketing Professional - Gumming4U Team"
            width={500}
            height={600}
            className="relative z-10 rounded-lg shadow-2xl filter grayscale"
            priority
          />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-16 bg-gray-900">
        <div className="max-w-7xl mx-auto grid grid-cols-4 gap-8 text-center">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-700 hover:scale-105">
            <div className="text-4xl font-black text-emerald-600 mb-2">50+</div>
            <p className="text-gray-400">Happy Clients</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-700 hover:scale-105">
            <div className="text-4xl font-black text-blue-600 mb-2">200+</div>
            <p className="text-gray-400">Projects Completed</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-700 hover:scale-105">
            <div className="text-4xl font-black text-purple-600 mb-2">300%</div>
            <p className="text-gray-400">Average ROI Increase</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-700 hover:scale-105">
            <div className="text-4xl font-black text-orange-600 mb-2">24/7</div>
            <p className="text-gray-400">Support Available</p>
          </div>
        </div>
      </section>

      {/* Services Preview Section */}
      <section className="py-24 px-16 bg-black text-white relative">
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="bg-white/20 text-white px-4 py-2 text-sm mb-6">What We Do</Badge>
            <h2 className="text-6xl font-black mb-8">OUR SERVICES</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Comprehensive digital marketing solutions designed to elevate your brand and drive measurable growth
            </p>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {services.map((service, index) => (
              <Link key={index} href="/services">
                <div className="bg-gray-900/50 border border-gray-700/50 hover:border-emerald-500/30 backdrop-blur-sm transition-all duration-500 group cursor-pointer hover:scale-[1.02] hover:shadow-2xl hover:shadow-emerald-500/10 p-8 text-center relative overflow-hidden rounded-lg">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl flex items-center justify-center group-hover:from-emerald-600/20 group-hover:to-teal-600/20 transition-all duration-500">
                      <service.icon className="w-8 h-8 text-gray-400 group-hover:text-emerald-400 transition-colors duration-500" />
                    </div>
                    <h3 className="text-lg font-bold mb-4 text-white group-hover:text-emerald-100 transition-colors duration-300">
                      {service.title}
                      {service.subtitle && (
                        <>
                          <br />
                          <span className="text-gray-400 group-hover:text-emerald-300">{service.subtitle}</span>
                        </>
                      )}
                    </h3>
                    <p className="text-sm text-gray-400 group-hover:text-gray-300 leading-relaxed transition-colors duration-300">
                      {service.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link href="/services">
              <Button
                size="lg"
                className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600 px-8 py-4 text-lg font-semibold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-emerald-500/25"
              >
                View All Services <ArrowRight className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-16 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-2 text-sm mb-6">
              Client Love
            </Badge>
            <h2 className="text-6xl font-black mb-8">TESTIMONIALS</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 hover:shadow-xl transition-all duration-300 hover:scale-105 p-8 rounded-lg"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-lg italic mb-6 font-cardo">"{testimonial.content}"</blockquote>
                <div className="flex items-center">
                  <Image
                    src={testimonial.image || "/placeholder.svg"}
                    alt={`${testimonial.name} - ${testimonial.company}`}
                    width={50}
                    height={50}
                    className="rounded-full mr-4 filter grayscale hover:grayscale-0 transition-all duration-300"
                  />
                  <div>
                    <p className="font-bold">{testimonial.name}</p>
                    <p className="text-gray-400 text-sm">
                      {testimonial.role}, {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-16 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-black mb-8">Ready to Transform Your Business?</h2>
          <p className="text-xl text-gray-400 mb-12">
            Let's discuss how we can help you achieve extraordinary growth through strategic digital marketing.
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
                View Case Studies
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
