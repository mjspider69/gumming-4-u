"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, CheckCircle, X, Mail, Phone, Globe, MapPin, Instagram, Linkedin, Twitter } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { submitContactForm } from "@/app/actions/contact"
import { trackContactFormSubmit } from "@/components/analytics"

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

    const interactiveElements = document.querySelectorAll('button, a, [role="button"], input, textarea')
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
          boxShadow: "0 0 25px rgba(16, 185, 129, 0.6)",
        }
      case "link":
        return {
          background: "rgba(255, 255, 255, 0.9)",
          border: "2px solid #3b82f6",
          boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)",
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
              { href: "/services", label: "Services" },
              { href: "/portfolio", label: "Portfolio" },
              { href: "/blog", label: "Insights" },
              { href: "/contact", label: "Contact", active: true },
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
        </div>
      </div>
    </nav>
  )
}

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "", phone: "", company: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [submitMessage, setSubmitMessage] = useState("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formDataObj = new FormData()
    Object.entries(formData).forEach(([key, value]) => {
      formDataObj.append(key, value)
    })

    try {
      const result = await submitContactForm(formDataObj)

      if (result.success) {
        setSubmitStatus("success")
        setFormData({ name: "", email: "", message: "", phone: "", company: "" })
        trackContactFormSubmit()
      } else {
        setSubmitStatus("error")
      }

      setSubmitMessage(result.message)
    } catch (error) {
      setSubmitStatus("error")
      setSubmitMessage("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white" style={{ cursor: "none" }}>
      <CustomCursor />
      <Navigation />

      {/* Hero Section */}
      <section className="pt-16 pb-24 px-16 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 text-sm mb-6 animate-pulse">
            Get Started
          </Badge>
          <h1 className="text-6xl font-black mb-8">LET'S TALK</h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Ready to take your business to the next level? Contact us today for a free consultation and discover how we
            can transform your digital presence.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-24 px-16 bg-gray-900">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className="bg-gray-800 p-8 rounded-lg shadow-xl border border-gray-700">
            <h2 className="text-3xl font-bold mb-8">Send us a message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-lg font-medium text-gray-300 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-lg font-medium text-gray-300 mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-lg font-medium text-gray-300 mb-2">
                    Your Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
                    placeholder="+91 9876543210"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-lg font-medium text-gray-300 mb-2">
                    Your Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
                    placeholder="Acme Corp"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-lg font-medium text-gray-300 mb-2">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
                  placeholder="Tell us about your project and how we can help..."
                  required
                ></textarea>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600 px-6 py-3 text-lg font-semibold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-emerald-500/25"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Send Message"} <ArrowRight className="ml-2" />
              </Button>

              {submitStatus === "success" && (
                <div className="rounded-md bg-green-900/50 p-4 border border-green-500">
                  <div className="flex">
                    <CheckCircle className="h-5 w-5 text-green-400 mr-3" />
                    <div>
                      <h3 className="text-sm font-medium text-green-300">Success!</h3>
                      <p className="mt-2 text-sm text-green-200">
                        {submitMessage || "Your message has been sent successfully."}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {submitStatus === "error" && (
                <div className="rounded-md bg-red-900/50 p-4 border border-red-500">
                  <div className="flex">
                    <X className="h-5 w-5 text-red-400 mr-3" />
                    <div>
                      <h3 className="text-sm font-medium text-red-300">Error!</h3>
                      <p className="mt-2 text-sm text-red-200">
                        {submitMessage || "Something went wrong. Please try again."}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold mb-8">Get in touch</h2>
              <p className="text-lg text-gray-400 mb-8">
                We're here to help you transform your business. Reach out to us through any of the channels below, and
                we'll get back to you within 24 hours.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-emerald-600 rounded-lg flex items-center justify-center">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Email</h3>
                  <p className="text-gray-400">gumming4u@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Phone</h3>
                  <p className="text-gray-400">+91 95510 77771</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Location</h3>
                  <p className="text-gray-400">Chennai, Tamil Nadu, India</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Business Hours</h3>
                  <p className="text-gray-400">Mon - Fri: 9:00 AM - 6:00 PM IST</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <h3 className="text-xl font-bold mb-4">Why Choose Gumming4U?</h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-emerald-400 mr-3" />
                  <span className="text-gray-300">Free initial consultation</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-emerald-400 mr-3" />
                  <span className="text-gray-300">24/7 customer support</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-emerald-400 mr-3" />
                  <span className="text-gray-300">Proven track record</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-emerald-400 mr-3" />
                  <span className="text-gray-300">Customized solutions</span>
                </li>
              </ul>
            </div>
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
