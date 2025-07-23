
"use client"
import { useState, useEffect } from "react"
import type { Metadata } from "next"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Enhanced3DBackground } from "@/components/enhanced-3d-background"
import CustomCursor from "@/components/advanced-cursor"
import Navigation from "@/components/navigation"
import {
  ArrowRight,
  Calendar,
  Clock,
  User,
  Eye,
  Share2,
  BookOpen,
  TrendingUp,
  Mail,
  Phone,
  Globe,
  Instagram,
  Linkedin,
  Twitter,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Digital Marketing Blog | Latest SEO, PPC & Marketing Insights - Gumming4U",
  description: "Stay ahead with expert digital marketing insights, SEO strategies, PPC tips, and social media trends from Chennai's leading marketing agency. Read our latest blog posts and industry updates.",
  keywords: [
    "digital marketing blog",
    "SEO tips Chennai", 
    "PPC strategies",
    "social media marketing blog",
    "content marketing insights",
    "marketing trends 2024",
    "digital marketing news",
    "marketing automation blog",
    "brand strategy articles",
    "marketing case studies"
  ],
  openGraph: {
    title: "Digital Marketing Blog - Gumming4U",
    description: "Expert insights on digital marketing, SEO, PPC, and growth strategies",
    type: "website",
    images: ["/images/blog-og-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Marketing Blog - Gumming4U",
    description: "Expert insights on digital marketing, SEO, PPC, and growth strategies",
  },
}

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
              { href: "/portfolio", label: "Portfolio" },
              { href: "/careers", label: "Careers" },
              { href: "/blog", label: "Blog", active: true },
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

export default function Blog() {
  const featuredPost = {
    title: "The Complete Digital Marketing Strategy Guide for 2024",
    excerpt: "Discover the latest trends, tools, and tactics that successful businesses use to dominate their markets in 2024.",
    date: "February 15, 2024",
    category: "Strategy",
    readTime: "12 min read",
    views: "2.4k",
    image: "/placeholder.svg?height=400&width=600&text=Featured+Post",
    author: "Aryaan Alam"
  }

  const blogPosts = [
    {
      title: "10 SEO Strategies That Actually Work in 2024",
      excerpt: "Discover the latest SEO techniques that are driving results for businesses in Chennai and beyond. Learn from real case studies and proven methodologies.",
      date: "February 10, 2024",
      category: "SEO",
      readTime: "8 min read",
      views: "1.8k",
      image: "/placeholder.svg?height=300&width=400&text=SEO+Strategies",
      author: "Priya Sharma"
    },
    {
      title: "How to Maximize Your PPC ROI: A Complete Guide",
      excerpt: "Learn proven strategies to optimize your Google Ads campaigns and increase your return on investment with advanced targeting techniques.",
      date: "February 8, 2024",
      category: "PPC",
      readTime: "10 min read",
      views: "1.5k",
      image: "/placeholder.svg?height=300&width=400&text=PPC+Guide",
      author: "Michael Chen"
    },
    {
      title: "Social Media Marketing Trends for Chennai Businesses",
      excerpt: "Explore the latest social media trends and how local businesses can leverage them for growth in the competitive Chennai market.",
      date: "February 5, 2024",
      category: "Social Media",
      readTime: "6 min read",
      views: "1.2k",
      image: "/placeholder.svg?height=300&width=400&text=Social+Media+Trends",
      author: "Emma Rodriguez"
    },
    {
      title: "Content Marketing That Converts: Best Practices",
      excerpt: "Create compelling content that not only engages your audience but also drives conversions and builds lasting customer relationships.",
      date: "February 3, 2024",
      category: "Content Marketing",
      readTime: "9 min read",
      views: "980",
      image: "/placeholder.svg?height=300&width=400&text=Content+Marketing",
      author: "Sarah Johnson"
    },
    {
      title: "E-commerce Growth Strategies for 2024",
      excerpt: "Proven tactics to scale your online store, increase average order value, and build a loyal customer base in the competitive e-commerce landscape.",
      date: "January 30, 2024",
      category: "E-commerce",
      readTime: "11 min read",
      views: "1.3k",
      image: "/placeholder.svg?height=300&width=400&text=Ecommerce+Growth",
      author: "David Wilson"
    },
    {
      title: "Email Marketing Automation: Advanced Techniques",
      excerpt: "Master email marketing automation with advanced segmentation, personalization, and behavioral triggers that drive engagement.",
      date: "January 28, 2024",
      category: "Email Marketing",
      readTime: "7 min read",
      views: "890",
      image: "/placeholder.svg?height=300&width=400&text=Email+Automation",
      author: "Priya Sharma"
    }
  ]

  const categories = [
    { name: "All", count: 25, active: true },
    { name: "SEO", count: 8 },
    { name: "PPC", count: 6 },
    { name: "Social Media", count: 7 },
    { name: "Content Marketing", count: 4 },
  ]

  return (
    <div className="min-h-screen bg-black text-white" style={{ cursor: "none" }}>
      <Enhanced3DBackground />
      <CustomCursor />
      <Navigation />

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-6 md:px-16 bg-black">
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="bg-white/20 text-white px-6 py-3 text-sm mb-8 rounded-full">
            Digital Marketing Insights
          </Badge>
          <h1 className="text-4xl md:text-7xl font-black mb-8">MARKETING BLOG</h1>
          <p className="text-lg md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Stay ahead of the curve with our expert insights on digital marketing, SEO, PPC, and growth strategies.
          </p>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-16 px-6 md:px-16 bg-gray-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <Badge className="bg-white/20 text-white px-4 py-2 text-sm mb-4 rounded-full">
              Featured Article
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Latest Insights</h2>
          </div>
          
          <Card className="bg-black/80 border border-gray-700 hover:border-white/50 transition-all duration-700 group hover:scale-[1.02] hover:shadow-2xl hover:shadow-white/20 backdrop-blur-lg overflow-hidden">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative overflow-hidden h-64 lg:h-full">
                  <Image
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    width={600}
                    height={400}
                    className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent lg:bg-gradient-to-r"></div>
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-4 mb-6">
                    <Badge className="bg-white/10 text-white">{featuredPost.category}</Badge>
                    <div className="flex items-center text-sm text-gray-400 gap-4">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {featuredPost.readTime}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {featuredPost.views}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold mb-4 text-white group-hover:text-white transition-colors">
                    {featuredPost.title}
                  </h3>
                  <p className="text-gray-400 mb-6 leading-relaxed">{featuredPost.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-white font-semibold">{featuredPost.author}</p>
                        <p className="text-gray-400 text-sm">{featuredPost.date}</p>
                      </div>
                    </div>
                    <Button className="bg-white text-black hover:bg-gray-200 transition-all duration-300 hover:scale-105">
                      Read Article <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-8 px-6 md:px-16 bg-black/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category, index) => (
              <Badge
                key={index}
                className={`px-6 py-3 text-sm cursor-pointer transition-all duration-300 hover:scale-105 ${
                  category.active
                    ? "bg-white text-black"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                {category.name} ({category.count})
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 px-6 md:px-16 bg-gray-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <Card 
                key={index} 
                className="bg-black/80 border border-gray-700 hover:border-white/50 transition-all duration-700 group hover:scale-105 hover:shadow-2xl hover:shadow-white/20 backdrop-blur-lg overflow-hidden cursor-pointer"
              >
                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      width={400}
                      height={300}
                      className="w-full h-48 object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-white/10 text-white">{post.category}</Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <div className="flex items-center gap-2 text-white text-xs">
                        <Eye className="w-3 h-3" />
                        {post.views}
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4 text-sm text-gray-400">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {post.readTime}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {post.date}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-white group-hover:text-white transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-400 mb-4 leading-relaxed line-clamp-3">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-gray-400 text-sm">{post.author}</span>
                      </div>
                      <Button size="sm" variant="ghost" className="text-white hover:text-black hover:bg-white">
                        Read More <ArrowRight className="ml-1 w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 px-6 md:px-16 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-gray-900 to-black p-12 rounded-2xl border border-gray-700">
            <BookOpen className="w-16 h-16 text-white mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Stay Updated</h2>
            <p className="text-xl text-gray-300 mb-8">
              Get the latest digital marketing insights delivered to your inbox weekly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-white/10 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white"
              />
              <Button className="bg-white text-black hover:bg-gray-200 px-6 py-3 font-semibold">
                Subscribe
              </Button>
            </div>
            <p className="text-gray-400 text-sm mt-4">
              Join 1000+ marketers who trust our insights. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 md:px-16 bg-gray-900/30">
        <div className="max-w-4xl mx-auto text-center">
          <TrendingUp className="w-16 h-16 text-white mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Business?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Get personalized digital marketing strategies that deliver results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-white text-black hover:bg-gray-200 px-8 py-4 text-lg font-semibold hover:scale-105 transition-all duration-300"
              >
                Get Free Consultation <ArrowRight className="ml-2 w-5 h-5" />
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
