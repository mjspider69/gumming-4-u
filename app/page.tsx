
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
  Zap,
  Layers,
  Target,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { trackServiceInquiry } from "@/components/analytics"
import { Chatbot } from "@/components/chatbot"

// Enhanced Custom cursor with black/white theme
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
        return isClicking ? 50 : 45
      case "link":
        return 38
      case "text":
        return 28
      case "hover":
        return 35
      default:
        return isClicking ? 22 : 18
    }
  }

  const getCursorStyles = () => {
    switch (cursorVariant) {
      case "button":
        return {
          background: "rgba(255, 255, 255, 0.95)",
          border: "2px solid #000000",
          boxShadow: "0 0 30px rgba(255, 255, 255, 0.8), inset 0 0 15px rgba(0, 0, 0, 0.3)",
        }
      case "link":
        return {
          background: "rgba(0, 0, 0, 0.9)",
          border: "2px solid #ffffff",
          boxShadow: "0 0 25px rgba(0, 0, 0, 0.7), inset 0 0 10px rgba(255, 255, 255, 0.2)",
        }
      case "text":
        return {
          background: "rgba(255, 255, 255, 0.85)",
          border: "1px solid #000000",
          boxShadow: "0 0 20px rgba(255, 255, 255, 0.6)",
        }
      case "hover":
        return {
          background: "rgba(128, 128, 128, 0.8)",
          border: "2px solid #ffffff",
          boxShadow: "0 0 22px rgba(128, 128, 128, 0.5)",
        }
      default:
        return {
          background: "rgba(255, 255, 255, 0.95)",
          border: "1px solid rgba(0, 0, 0, 0.4)",
          boxShadow: "0 0 18px rgba(255, 255, 255, 0.5), 0 0 35px rgba(255, 255, 255, 0.3)",
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
          backdropFilter: "blur(2px)",
        }}
      />

      <div
        className="fixed top-0 left-0 w-1 h-1 bg-black rounded-full pointer-events-none z-[9999] transition-all duration-100 ease-out"
        style={{
          transform: `translate(${mousePosition.x - 2}px, ${mousePosition.y - 2}px) scale(${isHovering ? 0 : 1})`,
          opacity: cursorVariant === "default" ? 0.9 : 0,
        }}
      />

      <div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9998] transition-all duration-300 ease-out"
        style={{
          width: `${size + 12}px`,
          height: `${size + 12}px`,
          transform: `translate(${mousePosition.x - (size + 12) / 2}px, ${mousePosition.y - (size + 12) / 2}px)`,
          border: "1px solid rgba(0, 0, 0, 0.2)",
          opacity: isHovering ? 0.7 : 0,
        }}
      />
    </>
  )
}

// Enhanced 3D Scene Components with black/white theme
function FloatingElements() {
  return (
    <>
      <Stars radius={100} depth={50} count={5000} factor={6} saturation={0} fade speed={0.7} />

      <Float speed={2} rotationIntensity={1.5} floatIntensity={3}>
        <Sphere args={[0.5, 32, 32]} position={[-4, 3, -3]}>
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.15} roughness={0.1} metalness={0.8} />
        </Sphere>
      </Float>

      <Float speed={2.5} rotationIntensity={2.5} floatIntensity={2}>
        <Box args={[0.8, 0.8, 0.8]} position={[4, -2, -2]}>
          <meshStandardMaterial color="#000000" roughness={0.3} metalness={0.9} />
        </Box>
      </Float>

      <Float speed={2.2} rotationIntensity={2} floatIntensity={2.5}>
        <Torus args={[0.6, 0.25, 16, 32]} position={[3, 4, -4]}>
          <meshStandardMaterial color="#888888" roughness={0.2} metalness={0.7} />
        </Torus>
      </Float>
    </>
  )
}

function Hero3D() {
  return (
    <Float speed={1.5} rotationIntensity={0.8} floatIntensity={1}>
      <Text3D font="/fonts/Geist_Bold.json" size={0.8} height={0.15} position={[-2, 0, 0]}>
        G4U
        <meshStandardMaterial color="#ffffff" roughness={0.1} metalness={0.8} />
      </Text3D>
    </Float>
  )
}

// Enhanced Navigation Component
function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isWorkDropdownOpen, setIsWorkDropdownOpen] = useState(false)

  return (
    <nav className="bg-black/98 backdrop-blur-xl border-b border-gray-800/70 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center group">
            <div className="relative">
              <Image
                src="/images/gumming4u-logo.png"
                alt="Gumming4U - Digital Marketing Agency"
                width={120}
                height={48}
                className="transition-all duration-300 group-hover:scale-105 filter brightness-0 invert"
              />
            </div>
          </Link>

          <div className="hidden lg:flex items-center space-x-12">
            <Link
              href="/"
              className="text-gray-300 hover:text-white font-medium text-base tracking-wide transition-all duration-300 relative group"
            >
              Home
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></div>
            </Link>

            <Link
              href="/about"
              className="text-gray-300 hover:text-white font-medium text-base tracking-wide transition-all duration-300 relative group"
            >
              About
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></div>
            </Link>

            <div className="relative">
              <button
                onClick={() => setIsWorkDropdownOpen(!isWorkDropdownOpen)}
                className="text-gray-300 hover:text-white font-medium text-base tracking-wide transition-all duration-300 relative group flex items-center"
              >
                Work
                <ChevronDown className="ml-1 w-4 h-4" />
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></div>
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
                    href="/careers"
                    className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-800 transition-all duration-300 rounded-b-lg"
                    onClick={() => setIsWorkDropdownOpen(false)}
                  >
                    Careers
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/contact"
              className="text-gray-300 hover:text-white font-medium text-base tracking-wide transition-all duration-300 relative group"
            >
              Contact
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></div>
            </Link>
          </div>

          <div className="hidden lg:flex items-center">
            <a
              href="https://wa.me/919551077771?text=Hi%20Gumming4U!%20I%27d%20like%20to%20schedule%20a%20call%20to%20discuss%20my%20digital%20marketing%20needs."
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                className="border-2 border-white text-white hover:text-black hover:bg-white bg-transparent px-6 py-2 text-base font-medium rounded-full transition-all duration-300 hover:scale-105 flex items-center shadow-lg hover:shadow-white/25"
              >
                <Calendar className="mr-2 w-4 h-4" />
                Schedule a Call
              </Button>
            </a>
          </div>

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

        {isMenuOpen && (
          <div className="lg:hidden transition-all duration-300 overflow-hidden">
            <div className="pt-4 pb-3 space-y-1">
              {[
                { href: "/", label: "Home" },
                { href: "/about", label: "About" },
                { href: "/portfolio", label: "Portfolio" },
                { href: "/services", label: "Services" },
                { href: "/careers", label: "Careers" },
                { href: "/contact", label: "Contact" },
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
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default function Component() {
  const [showTeamImage, setShowTeamImage] = useState(false)

  const services = [
    {
      icon: Globe,
      title: "Social Media",
      subtitle: "Management",
      description: "Strategic social media campaigns that drive engagement and build communities",
      vector: <Zap className="w-12 h-12 text-white" />,
    },
    {
      icon: Monitor,
      title: "Website",
      subtitle: "Development",
      description: "Custom websites optimized for conversions and user experience",
      vector: <Layers className="w-12 h-12 text-white" />,
    },
    {
      icon: Camera,
      title: "Content",
      subtitle: "Creation",
      description: "Professional photography, videography, and creative content production",
      vector: <Target className="w-12 h-12 text-white" />,
    },
    {
      icon: FileText,
      title: "SEO &",
      subtitle: "Copywriting",
      description: "Search-optimized content that ranks and converts visitors into customers",
      vector: <Grid3X3 className="w-12 h-12 text-white" />,
    },
    {
      icon: ShoppingCart,
      title: "E-commerce",
      subtitle: "Solutions",
      description: "Complete online store setup and optimization for maximum sales",
      vector: <ShoppingCart className="w-12 h-12 text-white" />,
    },
    {
      icon: Grid3X3,
      title: "PPC",
      subtitle: "Advertising",
      description: "Data-driven paid advertising campaigns across Google, Facebook, and LinkedIn",
      vector: <Monitor className="w-12 h-12 text-white" />,
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
    },
    {
      name: "Michael Chen",
      company: "GreenTech Innovations",
      role: "Marketing Director",
      content:
        "The team's expertise in both traditional and digital marketing helped us reach new markets and increase our revenue by 200%.",
      rating: 5,
    },
    {
      name: "Priya Sharma",
      company: "Fashion Forward",
      role: "Founder",
      content:
        "Professional, creative, and results-driven. Gumming4U's e-commerce optimization strategies doubled our online sales.",
      rating: 5,
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden" style={{ cursor: "none" }}>
      <CustomCursor />
      <Navigation />
      <Chatbot />

      {/* Full-Width Hero Section */}
      <section className="min-h-screen bg-black relative overflow-hidden">
        {/* 3D Background */}
        <div className="absolute inset-0 z-0">
          <Canvas camera={{ position: [0, 0, 8], fov: 75 }}>
            <Suspense fallback={null}>
              <Environment preset="night" />
              <ambientLight intensity={0.4} />
              <pointLight position={[5, 5, 5]} intensity={0.8} />
              <Hero3D />
              <FloatingElements />
              <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
            </Suspense>
          </Canvas>
        </div>

        {/* Content Container */}
        <div className="relative z-10 flex items-center justify-center min-h-screen px-16">
          <div className="max-w-7xl mx-auto text-center">
            {/* Main Heading with Team Image Reveal */}
            <div className="relative mb-12 min-h-[600px] flex items-center justify-center">
              {/* Background Image Area - Invisible but hover-sensitive */}
              <div
                className="absolute inset-0 w-full h-full cursor-pointer"
                onMouseEnter={() => setShowTeamImage(true)}
                onMouseLeave={() => setShowTeamImage(false)}
                style={{ zIndex: 1 }}
              />

              {/* Main Heading */}
              <h1 
                className="text-8xl font-black leading-tight mb-8 transition-all duration-700 ease-out relative z-10 pointer-events-none"
                style={{ opacity: showTeamImage ? 0.15 : 1 }}
                data-cursor="text"
              >
                LOOKING FOR
                <br />
                THE{" "}
                <span className="text-gray-400 hover:text-white transition-colors duration-500">
                  EXTRA
                </span>
                <br />
                IN THE <span className="text-gray-400">ORDINARY</span>
              </h1>

              {/* Team Image Reveal - Positioned behind text */}
              <div
                className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ease-out pointer-events-none ${
                  showTeamImage ? "opacity-90 scale-100" : "opacity-0 scale-95"
                }`}
                style={{ zIndex: 2 }}
              >
                <div className="relative w-full h-full max-w-4xl max-h-96">
                  <Image
                    src="/images/team-photo.jpg"
                    alt="Gumming4U Team - The Creative Minds Behind Extraordinary Marketing"
                    fill
                    className="object-cover rounded-2xl shadow-2xl filter grayscale hover:grayscale-0 transition-all duration-700 border-4 border-white/30"
                    style={{ 
                      mixBlendMode: 'overlay',
                      filter: 'grayscale(100%) contrast(1.1) brightness(0.7)'
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent rounded-2xl"></div>
                  <div className="absolute bottom-6 left-6 text-white z-10">
                    <h3 className="text-2xl font-bold opacity-80">The G4U Creative Team</h3>
                    <p className="text-gray-300 opacity-70">Where extraordinary ideas come to life</p>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-3xl mb-10 font-light">We don't market. We make movements.</p>

            <p className="text-xl mb-16 text-gray-300 leading-relaxed max-w-4xl mx-auto">
              Transform your business with data-driven digital marketing strategies that deliver measurable results.
              From SEO to social media, we're your growth partners in the digital revolution.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-white text-black hover:bg-gray-200 px-10 py-5 text-xl font-semibold hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-white/30"
                  onClick={() => trackServiceInquiry("free_audit")}
                >
                  Get Free Marketing Audit <ArrowRight className="ml-3 w-5 h-5" />
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
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="py-24 px-16 bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-black/80 p-8 rounded-2xl shadow-2xl hover:shadow-white/10 transition-all duration-500 border border-gray-800 hover:scale-105 hover:border-white/30 backdrop-blur-lg">
            <div className="text-5xl font-black text-white mb-3">50+</div>
            <p className="text-gray-400">Happy Clients</p>
          </div>
          <div className="bg-black/80 p-8 rounded-2xl shadow-2xl hover:shadow-white/10 transition-all duration-500 border border-gray-800 hover:scale-105 hover:border-white/30 backdrop-blur-lg">
            <div className="text-5xl font-black text-white mb-3">200+</div>
            <p className="text-gray-400">Projects Completed</p>
          </div>
          <div className="bg-black/80 p-8 rounded-2xl shadow-2xl hover:shadow-white/10 transition-all duration-500 border border-gray-800 hover:scale-105 hover:border-white/30 backdrop-blur-lg">
            <div className="text-5xl font-black text-white mb-3">300%</div>
            <p className="text-gray-400">Average ROI Increase</p>
          </div>
          <div className="bg-black/80 p-8 rounded-2xl shadow-2xl hover:shadow-white/10 transition-all duration-500 border border-gray-800 hover:scale-105 hover:border-white/30 backdrop-blur-lg">
            <div className="text-5xl font-black text-white mb-3">24/7</div>
            <p className="text-gray-400">Support Available</p>
          </div>
        </div>
      </section>

      {/* Enhanced Services Preview Section */}
      <section className="py-32 px-16 bg-black relative">
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <Badge className="bg-white/20 text-white px-6 py-3 text-sm mb-8 rounded-full">What We Do</Badge>
            <h2 className="text-7xl font-black mb-10">OUR SERVICES</h2>
            <p className="text-2xl text-gray-300 max-w-4xl mx-auto">
              Comprehensive digital marketing solutions designed to elevate your brand and drive measurable growth
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Link key={index} href="/services">
                <div className="bg-gray-900/60 border border-gray-700/50 hover:border-white/50 backdrop-blur-lg transition-all duration-700 group cursor-pointer hover:scale-105 hover:shadow-2xl hover:shadow-white/20 p-10 text-center relative overflow-hidden rounded-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  <div className="relative z-10">
                    <div className="w-20 h-20 mx-auto mb-8 bg-gradient-to-br from-gray-800 to-black rounded-2xl flex items-center justify-center group-hover:from-white/20 group-hover:to-gray-900/50 transition-all duration-700 shadow-lg">
                      <service.icon className="w-10 h-10 text-gray-400 group-hover:text-white transition-colors duration-700" />
                    </div>
                    <div className="mb-6">
                      {service.vector}
                    </div>
                    <h3 className="text-xl font-bold mb-6 text-white group-hover:text-white transition-colors duration-500">
                      {service.title}
                      {service.subtitle && (
                        <>
                          <br />
                          <span className="text-gray-400 group-hover:text-gray-300">{service.subtitle}</span>
                        </>
                      )}
                    </h3>
                    <p className="text-sm text-gray-400 group-hover:text-gray-300 leading-relaxed transition-colors duration-500">
                      {service.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-20">
            <Link href="/services">
              <Button
                size="lg"
                className="bg-white text-black hover:bg-gray-200 px-10 py-5 text-xl font-semibold hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-white/30"
              >
                View All Services <ArrowRight className="ml-3 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials Section */}
      <section className="py-32 px-16 bg-gray-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <Badge className="bg-white/20 text-white px-6 py-3 text-sm mb-8 rounded-full">
              Client Love
            </Badge>
            <h2 className="text-7xl font-black mb-10">TESTIMONIALS</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-black/80 to-gray-900/60 border border-gray-700 hover:shadow-2xl hover:shadow-white/10 transition-all duration-500 hover:scale-105 p-10 rounded-2xl backdrop-blur-lg hover:border-white/30"
              >
                <div className="flex mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-white fill-current" />
                  ))}
                </div>
                <blockquote className="text-lg italic mb-8 font-light">"{testimonial.content}"</blockquote>
                <div className="pt-6 border-t border-gray-700">
                  <p className="font-bold text-white">{testimonial.name}</p>
                  <p className="text-gray-400 text-sm">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-32 px-16 bg-black">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-6xl font-black mb-10">Ready to Transform Your Business?</h2>
          <p className="text-2xl text-gray-400 mb-16">
            Let's discuss how we can help you achieve extraordinary growth through strategic digital marketing.
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
                View Case Studies
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
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
