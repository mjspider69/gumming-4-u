"use client"
import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Enhanced3DBackground } from "@/components/enhanced-3d-background"
import { Card, CardContent } from "@/components/ui/card"
import {
  ArrowRight,
  Mail,
  Phone,
  Globe,
  Instagram,
  Linkedin,
  Twitter,
  ExternalLink,
  Calendar,
  Users,
  Award,
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
              { href: "/services", label: "Services" },
              { href: "/portfolio", label: "Portfolio", active: true },
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

export default function PortfolioPage() {
  const executives = [
    {
      name: "Aryaan Alam",
      role: "Managing Director",
      department: "Leadership & Strategy",
      image: "/placeholder.svg?height=400&width=300&text=Aryaan+Alam+MD",
      bio: "Visionary leader driving Gumming4U's strategic direction and innovation in digital marketing.",
      specialties: ["Strategic Planning", "Client Relations", "Business Development"]
    },
    {
      name: "Sarah Johnson",
      role: "Creative Director",
      department: "Creative & Design",
      image: "/placeholder.svg?height=400&width=300&text=Sarah+Johnson+CD",
      bio: "Award-winning creative director with 10+ years of experience in brand storytelling.",
      specialties: ["Brand Identity", "Creative Strategy", "Visual Design"]
    },
    {
      name: "Michael Chen",
      role: "Head of Digital Strategy",
      department: "Digital Marketing",
      image: "/placeholder.svg?height=400&width=300&text=Michael+Chen+HDS",
      bio: "Data-driven strategist specializing in performance marketing and ROI optimization.",
      specialties: ["PPC Management", "Analytics", "Conversion Optimization"]
    },
    {
      name: "Priya Sharma",
      role: "Head of Content",
      department: "Content & SEO",
      image: "/placeholder.svg?height=400&width=300&text=Priya+Sharma+HC",
      bio: "Content strategist with expertise in SEO and organic growth strategies.",
      specialties: ["Content Strategy", "SEO", "Copywriting"]
    },
    {
      name: "David Wilson",
      role: "Technical Director",
      department: "Development & Tech",
      image: "/placeholder.svg?height=400&width=300&text=David+Wilson+TD",
      bio: "Full-stack developer and technical architect behind our digital solutions.",
      specialties: ["Web Development", "E-commerce", "Technical SEO"]
    },
    {
      name: "Emma Rodriguez",
      role: "Head of Social Media",
      department: "Social & Community",
      image: "/placeholder.svg?height=400&width=300&text=Emma+Rodriguez+HSM",
      bio: "Social media expert with a passion for building engaged online communities.",
      specialties: ["Social Strategy", "Community Management", "Influencer Relations"]
    }
  ]

  const portfolioItems = [
    {
      title: "E-commerce Revolution",
      category: "E-commerce Development",
      description: "Complete digital transformation for a fashion retailer resulting in 300% sales increase.",
      image: "/placeholder.svg?height=400&width=600&text=E-commerce+Project",
      results: ["300% Sales Increase", "50% Conversion Rate Improvement", "40% Reduced Cart Abandonment"]
    },
    {
      title: "Tech Startup Growth",
      category: "Digital Marketing Campaign",
      description: "Comprehensive marketing strategy that took a SaaS startup from 0 to 100K users.",
      image: "/placeholder.svg?height=400&width=600&text=Tech+Startup+Growth",
      results: ["100K+ Users Acquired", "200% ROI on Ad Spend", "85% User Retention Rate"]
    },
    {
      title: "Restaurant Chain Expansion",
      category: "Brand Strategy & Social Media",
      description: "Multi-channel brand campaign that helped expand restaurant presence nationwide.",
      image: "/placeholder.svg?height=400&width=600&text=Restaurant+Campaign",
      results: ["25 New Locations", "150% Social Engagement", "60% Brand Awareness Increase"]
    },
    {
      title: "Healthcare Digital Transformation",
      category: "Website & SEO",
      description: "Modern website design and SEO strategy for healthcare provider network.",
      image: "/placeholder.svg?height=400&width=600&text=Healthcare+Website",
      results: ["500% Organic Traffic Growth", "40% More Appointments", "90% Patient Satisfaction"]
    },
    {
      title: "B2B Lead Generation",
      category: "PPC & Content Marketing",
      description: "Targeted campaign generating high-quality leads for manufacturing company.",
      image: "/placeholder.svg?height=400&width=600&text=B2B+Lead+Generation",
      results: ["400% Lead Quality Improvement", "60% Cost Per Lead Reduction", "250% ROI Achievement"]
    },
    {
      title: "Non-Profit Awareness Campaign",
      category: "Social Impact Marketing",
      description: "Emotional storytelling campaign that increased donations and volunteer engagement.",
      image: "/placeholder.svg?height=400&width=600&text=Non+Profit+Campaign",
      results: ["180% Donation Increase", "300% Volunteer Sign-ups", "50M+ Impressions Generated"]
    }
  ]

  return (
    <div className="min-h-screen bg-black text-white" style={{ cursor: "none" }}>
      <Enhanced3DBackground />
      <CustomCursor />
      <Navigation />

      {/* Hero Section */}
      <section className="pt-20 pb-32 px-16 bg-black">
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="bg-white/20 text-white px-6 py-3 text-sm mb-8 rounded-full">Our Work</Badge>
          <h1 className="text-7xl font-black mb-12">PORTFOLIO</h1>
          <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Discover our exceptional work and meet the brilliant minds behind Gumming4U's success stories.
          </p>
        </div>
      </section>

      {/* Executive Team Section */}
      <section className="py-32 px-16 bg-gray-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <Badge className="bg-white/20 text-white px-6 py-3 text-sm mb-8 rounded-full">Leadership Team</Badge>
            <h2 className="text-6xl font-black mb-10">MEET THE EXECUTIVES</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our department heads and senior leadership team driving innovation and excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {executives.map((executive, index) => (
              <Card
                key={index}
                className="bg-black/80 border border-gray-700 hover:border-white/50 transition-all duration-700 group hover:scale-105 hover:shadow-2xl hover:shadow-white/20 backdrop-blur-lg overflow-hidden"
              >
                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    <Image
                      src={executive.image}
                      alt={`${executive.name} - ${executive.role}`}
                      width={300}
                      height={400}
                      className="w-full h-80 object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-xl font-bold">{executive.name}</h3>
                      <p className="text-gray-300 text-sm">{executive.role}</p>
                    </div>
                  </div>
                  <div className="p-8">
                    <Badge className="bg-white/10 text-white mb-4">{executive.department}</Badge>
                    <p className="text-gray-400 mb-6 leading-relaxed">{executive.bio}</p>
                    <div className="space-y-2">
                      <h4 className="text-white font-semibold mb-3">Specialties:</h4>
                      {executive.specialties.map((specialty, idx) => (
                        <div key={idx} className="flex items-center text-sm text-gray-400">
                          <Award className="w-3 h-3 text-white mr-2" />
                          {specialty}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Projects Section */}
      <section className="py-32 px-16 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <Badge className="bg-white/20 text-white px-6 py-3 text-sm mb-8 rounded-full">Case Studies</Badge>
            <h2 className="text-6xl font-black mb-10">OUR WORK</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Transformative digital marketing campaigns that drive exceptional results for our clients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {portfolioItems.map((item, index) => (
              <Card
                key={index}
                className="bg-gray-900/60 border border-gray-700 hover:border-white/50 transition-all duration-700 group hover:scale-105 hover:shadow-2xl hover:shadow-white/20 backdrop-blur-lg overflow-hidden cursor-pointer"
              >
                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={600}
                      height={400}
                      className="w-full h-64 object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                    <div className="absolute top-4 right-4">
                      <ExternalLink className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                  </div>
                  <div className="p-8">
                    <Badge className="bg-white/10 text-white mb-4">{item.category}</Badge>
                    <h3 className="text-2xl font-bold mb-4 text-white">{item.title}</h3>
                    <p className="text-gray-400 mb-6 leading-relaxed">{item.description}</p>
                    <div className="space-y-3">
                      <h4 className="text-white font-semibold mb-3">Key Results:</h4>
                      {item.results.map((result, idx) => (
                        <div key={idx} className="flex items-center text-sm text-gray-400">
                          <Award className="w-3 h-3 text-white mr-2 flex-shrink-0" />
                          {result}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-20">
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-white text-black hover:bg-gray-200 px-10 py-5 text-xl font-semibold hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-white/30"
              >
                Start Your Project <ArrowRight className="ml-3 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-16 bg-gray-900/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-6xl font-black mb-10">Ready to Join Our Success Stories?</h2>
          <p className="text-2xl text-gray-400 mb-16">
            Let's create extraordinary results for your business together.
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
            <a
              href="https://wa.me/919551077771?text=Hi%20Gumming4U!%20I%27d%20like%20to%20discuss%20my%20project%20requirements."
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                variant="outline"
                className="border-3 border-white text-white hover:bg-white hover:text-black px-10 py-5 text-xl font-semibold bg-transparent hover:scale-105 transition-all duration-300"
              >
                <Calendar className="mr-3 w-5 h-5" />
                Schedule Meeting
              </Button>
            </a>
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