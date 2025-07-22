
"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
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
  Users,
  Award,
  Briefcase,
  Heart,
  Coffee,
  Zap,
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
              { href: "/portfolio", label: "Portfolio" },
              { href: "/careers", label: "Careers", active: true },
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

export default function CareersPage() {
  const ourWork = [
    {
      category: "Posters & Graphics",
      items: [
        {
          title: "Brand Campaign Posters",
          description: "Creative poster designs for various brand campaigns and social media",
          image: "/placeholder.svg?height=300&width=400&text=Brand+Campaign+Posters"
        },
        {
          title: "Event Marketing Graphics",
          description: "Event promotion graphics and digital assets",
          image: "/placeholder.svg?height=300&width=400&text=Event+Graphics"
        },
        {
          title: "Product Launch Visuals",
          description: "Product showcase and launch campaign materials",
          image: "/placeholder.svg?height=300&width=400&text=Product+Launch"
        }
      ]
    },
    {
      category: "Websites & Digital Platforms",
      items: [
        {
          title: "E-commerce Platforms",
          description: "Custom e-commerce solutions with payment integration",
          image: "/placeholder.svg?height=300&width=400&text=E-commerce+Platform"
        },
        {
          title: "Corporate Websites",
          description: "Professional business websites with modern design",
          image: "/placeholder.svg?height=300&width=400&text=Corporate+Website"
        },
        {
          title: "Portfolio Websites",
          description: "Creative portfolio sites for artists and professionals",
          image: "/placeholder.svg?height=300&width=400&text=Portfolio+Website"
        }
      ]
    },
    {
      category: "Content Creation",
      items: [
        {
          title: "Social Media Content",
          description: "Engaging social media posts and story templates",
          image: "/placeholder.svg?height=300&width=400&text=Social+Media+Content"
        },
        {
          title: "Video Content",
          description: "Promotional videos and brand storytelling content",
          image: "/placeholder.svg?height=300&width=400&text=Video+Content"
        },
        {
          title: "Blog Articles & Copy",
          description: "SEO-optimized content and compelling copywriting",
          image: "/placeholder.svg?height=300&width=400&text=Content+Writing"
        }
      ]
    },
    {
      category: "Brand Identity & Marketing",
      items: [
        {
          title: "Logo Design & Branding",
          description: "Complete brand identity packages and logo designs",
          image: "/placeholder.svg?height=300&width=400&text=Logo+Design"
        },
        {
          title: "Marketing Campaigns",
          description: "Integrated marketing campaigns across multiple channels",
          image: "/placeholder.svg?height=300&width=400&text=Marketing+Campaign"
        },
        {
          title: "Digital Advertising",
          description: "PPC campaigns and social media advertising",
          image: "/placeholder.svg?height=300&width=400&text=Digital+Ads"
        }
      ]
    }
  ]

  const jobOpenings = [
    {
      title: "Digital Marketing Specialist",
      department: "Marketing",
      type: "Full-time",
      location: "Chennai, Tamil Nadu",
      description: "Join our team to create and execute innovative digital marketing strategies for our clients.",
      requirements: ["2+ years experience in digital marketing", "Knowledge of SEO/SEM", "Social media expertise"]
    },
    {
      title: "Graphic Designer",
      department: "Creative",
      type: "Full-time",
      location: "Chennai, Tamil Nadu",
      description: "Create stunning visual content for our diverse portfolio of clients across various industries.",
      requirements: ["Proficiency in Adobe Creative Suite", "Strong portfolio", "Creative thinking"]
    },
    {
      title: "Content Writer",
      department: "Content",
      type: "Full-time",
      location: "Chennai, Tamil Nadu",
      description: "Craft compelling content that drives engagement and conversions for our clients.",
      requirements: ["Excellent writing skills", "SEO knowledge", "Research abilities"]
    },
    {
      title: "Web Developer",
      department: "Development",
      type: "Full-time",
      location: "Chennai, Tamil Nadu",
      description: "Build beautiful, functional websites and web applications for our clients.",
      requirements: ["React/Next.js experience", "Backend development", "Database knowledge"]
    }
  ]

  const benefits = [
    {
      icon: <Heart className="w-8 h-8 text-white" />,
      title: "Health & Wellness",
      description: "Comprehensive health insurance and wellness programs"
    },
    {
      icon: <Coffee className="w-8 h-8 text-white" />,
      title: "Flexible Work",
      description: "Hybrid work options and flexible scheduling"
    },
    {
      icon: <Award className="w-8 h-8 text-white" />,
      title: "Career Growth",
      description: "Professional development and skill enhancement opportunities"
    },
    {
      icon: <Users className="w-8 h-8 text-white" />,
      title: "Team Culture",
      description: "Collaborative environment with creative freedom"
    }
  ]

  return (
    <div className="min-h-screen bg-black text-white" style={{ cursor: "none" }}>
      <CustomCursor />
      <Navigation />

      {/* Hero Section */}
      <section className="pt-20 pb-32 px-16 bg-black">
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="bg-white/20 text-white px-6 py-3 text-sm mb-8 rounded-full">Join Our Team</Badge>
          <h1 className="text-7xl font-black mb-12">CAREERS</h1>
          <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Be part of a dynamic team that creates extraordinary marketing experiences. Explore our work portfolio and discover exciting career opportunities.
          </p>
        </div>
      </section>

      {/* Our Work Portfolio Section */}
      <section className="py-32 px-16 bg-gray-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <Badge className="bg-white/20 text-white px-6 py-3 text-sm mb-8 rounded-full">Our Portfolio</Badge>
            <h2 className="text-6xl font-black mb-10">WHAT WE CREATE</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Explore the diverse range of work our team produces - from creative posters to comprehensive digital solutions.
            </p>
          </div>

          {ourWork.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-20">
              <h3 className="text-4xl font-bold mb-10 text-center">{category.category}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {category.items.map((item, itemIndex) => (
                  <Card
                    key={itemIndex}
                    className="bg-black/80 border border-gray-700 hover:border-white/50 transition-all duration-700 group hover:scale-105 hover:shadow-2xl hover:shadow-white/20 backdrop-blur-lg overflow-hidden"
                  >
                    <CardContent className="p-0">
                      <div className="relative overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.title}
                          width={400}
                          height={300}
                          className="w-full h-64 object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                      </div>
                      <div className="p-6">
                        <h4 className="text-xl font-bold mb-3 text-white">{item.title}</h4>
                        <p className="text-gray-400 leading-relaxed">{item.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Job Openings Section */}
      <section className="py-32 px-16 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <Badge className="bg-white/20 text-white px-6 py-3 text-sm mb-8 rounded-full">Open Positions</Badge>
            <h2 className="text-6xl font-black mb-10">JOIN OUR TEAM</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We're looking for talented individuals who share our passion for creating extraordinary marketing experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {jobOpenings.map((job, index) => (
              <Card
                key={index}
                className="bg-gray-900/60 border border-gray-700 hover:border-white/50 transition-all duration-700 group hover:scale-105 hover:shadow-2xl hover:shadow-white/20 backdrop-blur-lg"
              >
                <CardContent className="p-10">
                  <div className="flex items-center justify-between mb-6">
                    <Badge className="bg-white/10 text-white">{job.department}</Badge>
                    <span className="text-gray-400 text-sm">{job.type}</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white">{job.title}</h3>
                  <div className="flex items-center mb-6 text-gray-400">
                    <MapPin className="w-4 h-4 mr-2" />
                    {job.location}
                  </div>
                  <p className="text-gray-400 mb-6 leading-relaxed">{job.description}</p>
                  <div className="space-y-2 mb-8">
                    <h4 className="text-white font-semibold">Requirements:</h4>
                    {job.requirements.map((req, reqIndex) => (
                      <div key={reqIndex} className="flex items-center text-sm text-gray-400">
                        <Briefcase className="w-3 h-3 text-white mr-3 flex-shrink-0" />
                        {req}
                      </div>
                    ))}
                  </div>
                  <Link href="/contact">
                    <Button className="w-full bg-white text-black hover:bg-gray-200 transition-all duration-300 hover:scale-105 py-3 font-semibold">
                      Apply Now
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-32 px-16 bg-gray-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-6xl font-black mb-10">WHY GUMMING4U?</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We believe in taking care of our team members and creating an environment where creativity thrives.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card
                key={index}
                className="bg-black/80 border border-gray-700 hover:border-white/50 transition-all duration-700 group hover:scale-105 hover:shadow-2xl hover:shadow-white/20 backdrop-blur-lg text-center"
              >
                <CardContent className="p-10">
                  <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-gray-800 to-black rounded-2xl flex items-center justify-center group-hover:from-white/20 group-hover:to-gray-900/50 transition-all duration-700">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-white">{benefit.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-16 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-6xl font-black mb-10">Ready to Join Us?</h2>
          <p className="text-2xl text-gray-400 mb-16">
            Take the next step in your career and become part of our creative journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-white text-black hover:bg-gray-200 px-10 py-5 text-xl font-semibold hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-white/30"
              >
                Send Your Resume <ArrowRight className="ml-3 w-5 h-5" />
              </Button>
            </Link>
            <a
              href="mailto:gumming4u@gmail.com?subject=Career Inquiry&body=Hi Gumming4U team, I'm interested in career opportunities at your company."
            >
              <Button
                size="lg"
                variant="outline"
                className="border-3 border-white text-white hover:bg-white hover:text-black px-10 py-5 text-xl font-semibold bg-transparent hover:scale-105 transition-all duration-300"
              >
                <Mail className="mr-3 w-5 h-5" />
                Email Us
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
