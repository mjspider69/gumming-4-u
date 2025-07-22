"use client"
import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Enhanced3DBackground } from "@/components/enhanced-3d-background"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import {
  ArrowRight,
  Mail,
  Phone,
  Globe,
  Instagram,
  Linkedin,
  Twitter,
  MapPin,
  Clock,
  Send,
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
      } else if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") {
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

    const interactiveElements = document.querySelectorAll('button, a, input, textarea, [role="button"]')
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
          border: "2px solid #000000",
          boxShadow: "0 0 25px rgba(255, 255, 255, 0.6)",
        }
      case "link":
        return {
          background: "rgba(0, 0, 0, 0.9)",
          border: "2px solid #ffffff",
          boxShadow: "0 0 20px rgba(0, 0, 0, 0.5)",
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
              { href: "/portfolio", label: "Portfolio" },
              { href: "/careers", label: "Careers" },
              { href: "/contact", label: "Contact", active: true },
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

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
    service: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Send email logic would go here
    const emailContent = `
      New Contact Form Submission:
      Name: ${formData.name}
      Email: ${formData.email}
      Phone: ${formData.phone}
      Company: ${formData.company}
      Service: ${formData.service}
      Message: ${formData.message}
    `

    // For now, we'll just show an alert
    alert("Thank you for your message! We'll get back to you soon.")

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      message: "",
      service: "",
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen bg-black text-white" style={{ cursor: "none" }}>
      <Enhanced3DBackground />
      <CustomCursor />
      <Navigation />

      {/* Hero Section */}
      <section className="pt-20 pb-32 px-16 bg-black">
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="bg-white/20 text-white px-6 py-3 text-sm mb-8 rounded-full">Get Started</Badge>
          <h1 className="text-7xl font-black mb-12">CONTACT US</h1>
          <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Ready to take your business to the next level? Contact us today for a free consultation and discover how we
            can transform your digital presence.
          </p>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="py-32 px-16 bg-gray-900/30">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Contact Form */}
          <div>
            <h2 className="text-4xl font-black mb-8">GET IN TOUCH</h2>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-white mb-3 font-semibold">Name *</label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="bg-black/60 border-gray-700 text-white placeholder-gray-400 focus:border-white"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-white mb-3 font-semibold">Email *</label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-black/60 border-gray-700 text-white placeholder-gray-400 focus:border-white"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-white mb-3 font-semibold">Phone</label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className="bg-black/60 border-gray-700 text-white placeholder-gray-400 focus:border-white"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
                <div>
                  <label htmlFor="company" className="block text-white mb-3 font-semibold">Company</label>
                  <Input
                    id="company"
                    name="company"
                    type="text"
                    value={formData.company}
                    onChange={handleChange}
                    className="bg-black/60 border-gray-700 text-white placeholder-gray-400 focus:border-white"
                    placeholder="Your Company"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="service" className="block text-white mb-3 font-semibold">Service Interested In</label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full bg-black/60 border border-gray-700 text-white p-3 rounded-lg focus:border-white focus:outline-none"
                >
                  <option value="">Select a Service</option>
                  <option value="social-media">Social Media Management</option>
                  <option value="website">Website Development</option>
                  <option value="content">Content Creation</option>
                  <option value="seo">SEO & Copywriting</option>
                  <option value="ecommerce">E-commerce Solutions</option>
                  <option value="ppc">PPC Advertising</option>
                  <option value="email">Email Marketing</option>
                  <option value="automation">Marketing Automation</option>
                  <option value="brand">Brand Strategy</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-white mb-3 font-semibold">Message *</label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  className="bg-black/60 border-gray-700 text-white placeholder-gray-400 focus:border-white resize-none"
                  placeholder="Tell us about your project and goals..."
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-white text-black hover:bg-gray-200 px-8 py-4 text-lg font-semibold hover:scale-105 transition-all duration-300"
              >
                <Send className="mr-3 w-5 h-5" />
                Send Message
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div>
            <h2 className="text-4xl font-black mb-8">REACH US</h2>
            <div className="space-y-8">
              <Card className="bg-black/80 border border-gray-700 backdrop-blur-lg">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <Mail className="w-8 h-8 text-white mr-4" />
                    <div>
                      <h3 className="text-xl font-bold text-white">Email</h3>
                      <p className="text-gray-400">Drop us a line anytime</p>
                    </div>
                  </div>
                  <p className="text-white font-semibold">gumming4u@gmail.com</p>
                </CardContent>
              </Card>

              <Card className="bg-black/80 border border-gray-700 backdrop-blur-lg">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <Phone className="w-8 h-8 text-white mr-4" />
                    <div>
                      <h3 className="text-xl font-bold text-white">Phone</h3>
                      <p className="text-gray-400">Give us a call</p>
                    </div>
                  </div>
                  <p className="text-white font-semibold">+91 95510 77771</p>
                </CardContent>
              </Card>

              <Card className="bg-black/80 border border-gray-700 backdrop-blur-lg">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <MapPin className="w-8 h-8 text-white mr-4" />
                    <div>
                      <h3 className="text-xl font-bold text-white">Location</h3>
                      <p className="text-gray-400">Come visit us</p>
                    </div>
                  </div>
                  <p className="text-white font-semibold">Chennai, Tamil Nadu, India</p>
                </CardContent>
              </Card>

              <Card className="bg-black/80 border border-gray-700 backdrop-blur-lg">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <Clock className="w-8 h-8 text-white mr-4" />
                    <div>
                      <h3 className="text-xl font-bold text-white">Business Hours</h3>
                      <p className="text-gray-400">When we're available</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-white">
                    <p><span className="font-semibold">Mon - Fri:</span> 9:00 AM - 6:00 PM IST</p>
                    <p><span className="font-semibold">Saturday:</span> 10:00 AM - 2:00 PM</p>
                    <p><span className="font-semibold">Sunday:</span> Closed</p>
                  </div>
                </CardContent>
              </Card>
            </div>
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