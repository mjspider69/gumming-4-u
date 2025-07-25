
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CustomCursor } from "@/components/advanced-cursor"
import { Enhanced3DBackground } from "@/components/enhanced-3d-background"
import { HiddenImageReveal, TriggerText } from "@/components/hidden-image-reveal"
import { ClientsSection } from "@/components/clients-section"
import { NewsletterSignup } from "@/components/newsletter-signup"
import { Navigation } from "@/components/navigation"
import { EditableText } from "@/components/editable-text"
import { EditableImage } from "@/components/editable-image"
import { Chatbot } from "@/components/chatbot"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden" style={{ cursor: "none" }}>
      <CustomCursor />
      <Enhanced3DBackground variant="complex" showText={false} />
      <Navigation />
      <Chatbot />
      
      {/* Hero Section with Hidden Image Reveal */}
      <section className="pt-20 pb-32 px-16 relative z-10">
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="bg-white/20 text-white px-6 py-3 text-sm mb-8 rounded-full backdrop-blur-sm border border-white/30">
            Welcome to G4U - The Future of Digital Marketing
          </Badge>
          
          <HiddenImageReveal 
            hiddenImageSrc="/images/team-photo.jpg" 
            hiddenImageAlt="G4U Team Excellence"
            triggerWord="DIGITAL"
            className="mb-12"
          >
            <h1 className="text-8xl font-black mb-12 leading-tight">
              <span className="bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent">
                EXTRAORDINARY
              </span>
              <br />
              <TriggerText className="text-transparent bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-400 bg-clip-text hover:from-white hover:to-white transition-all duration-500">
                DIGITAL
              </TriggerText>
              <br />
              <span className="bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent">
                MARKETING
              </span>
            </h1>
          </HiddenImageReveal>

          <HiddenImageReveal 
            hiddenImageSrc="/images/header-design.png" 
            hiddenImageAlt="Digital Marketing Excellence"
            triggerWord="transform"
          >
            <p className="text-3xl text-gray-300 max-w-5xl mx-auto mb-16 leading-relaxed">
              We <TriggerText className="text-emerald-400 hover:text-white">transform</TriggerText> brands with cutting-edge <TriggerText className="text-teal-400 hover:text-white">digital strategies</TriggerText>, innovative design solutions, and data-driven marketing campaigns that deliver <TriggerText className="text-emerald-300 hover:text-white">exceptional results</TriggerText>.
            </p>
          </HiddenImageReveal>

          <div className="flex gap-8 justify-center">
            <Button className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-10 py-6 text-xl font-bold rounded-xl hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-emerald-500/25">
              Start Your Journey
            </Button>
            <Button variant="outline" className="border-2 border-white text-white px-10 py-6 text-xl font-bold rounded-xl hover:bg-white hover:text-black transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-white/25">
              View Our Work
            </Button>
          </div>
        </div>
      </section>

      {/* About Section with Enhanced Effects */}
      <section className="py-32 px-16 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <Badge className="bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-300 px-8 py-4 text-base mb-10 rounded-full backdrop-blur-sm border border-emerald-500/30">
                About G4U - Digital Excellence
              </Badge>
              
              <HiddenImageReveal 
                hiddenImageSrc="/images/gumming4u-logo.png" 
                hiddenImageAlt="G4U Brand Identity"
                triggerWord="Digital"
              >
                <h2 className="text-6xl font-black mb-10 leading-tight">
                  Crafting <TriggerText className="text-emerald-400 hover:text-white">Digital</TriggerText> Experiences That <TriggerText className="text-teal-400 hover:text-white">Matter</TriggerText>
                </h2>
              </HiddenImageReveal>

              <p className="text-2xl text-gray-300 mb-12 leading-relaxed">
                With over a decade of experience in digital marketing, we've helped hundreds of brands achieve their goals through innovative strategies and creative excellence that sets new industry standards.
              </p>

              <div className="grid grid-cols-2 gap-10">
                {[
                  { number: "500+", label: "Projects Completed", color: "emerald" },
                  { number: "250+", label: "Happy Clients", color: "teal" },
                  { number: "98%", label: "Client Satisfaction", color: "emerald" },
                  { number: "24/7", label: "Support Available", color: "teal" }
                ].map((stat, index) => (
                  <div key={index} className="group hover:scale-110 transition-all duration-300">
                    <h3 className={`text-4xl font-bold mb-3 bg-gradient-to-r ${
                      stat.color === 'emerald' 
                        ? 'from-emerald-400 to-emerald-300' 
                        : 'from-teal-400 to-teal-300'
                    } bg-clip-text text-transparent group-hover:from-white group-hover:to-white transition-all duration-300`}>
                      {stat.number}
                    </h3>
                    <p className="text-gray-400 group-hover:text-gray-200 transition-colors duration-300">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <EditableImage
                src="/images/team-photo.jpg"
                alt="G4U Team Excellence"
                width={700}
                height={500}
                className="rounded-3xl relative z-10 group-hover:scale-105 transition-all duration-500 shadow-2xl"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-3xl z-20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section with Enhanced Cards */}
      <section className="py-32 px-16 relative z-10">
        <div className="max-w-7xl mx-auto text-center mb-20">
          <Badge className="bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-300 px-8 py-4 text-base mb-10 rounded-full backdrop-blur-sm border border-emerald-500/30">
            Our Premium Services
          </Badge>
          
          <h2 className="text-6xl font-black mb-10">
            <span className="bg-gradient-to-r from-white via-emerald-400 to-teal-400 bg-clip-text text-transparent">
              What We Do Best
            </span>
          </h2>
          
          <p className="text-2xl text-gray-300 max-w-4xl mx-auto">
            From brand strategy to digital execution, we offer comprehensive services to help your business thrive in the digital landscape with unprecedented results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {[
            {
              title: "Digital Marketing",
              description: "Comprehensive digital marketing strategies that drive exponential growth and engagement across all channels with measurable ROI.",
              icon: "📱",
              color: "emerald"
            },
            {
              title: "Brand Design",
              description: "Creative brand identity design that captures your essence and resonates deeply with your target audience worldwide.",
              icon: "🎨",
              color: "teal"
            },
            {
              title: "Web Development",
              description: "Modern, responsive websites that deliver exceptional user experiences and convert visitors into loyal customers.",
              icon: "💻",
              color: "emerald"
            },
            {
              title: "Social Media",
              description: "Strategic social media management that builds thriving communities and drives meaningful engagement at scale.",
              icon: "📲",
              color: "teal"
            },
            {
              title: "SEO Optimization",
              description: "Advanced SEO strategies that dramatically improve your search rankings and organic visibility globally.",
              icon: "🔍",
              color: "emerald"
            },
            {
              title: "Analytics & Insights",
              description: "Data-driven insights and comprehensive analytics that inform strategy and measure success with precision.",
              icon: "📊",
              color: "teal"
            }
          ].map((service, index) => (
            <Card key={`service-${index}`} className="bg-gradient-to-br from-white/5 to-white/10 border-white/20 backdrop-blur-sm hover:from-white/10 hover:to-white/20 transition-all duration-500 group hover:scale-105 hover:shadow-2xl">
              <CardContent className="p-10">
                <div className={`text-6xl mb-6 group-hover:scale-125 transition-all duration-300 ${
                  service.color === 'emerald' ? 'filter hue-rotate-90' : 'filter hue-rotate-180'
                }`}>
                  {service.icon}
                </div>
                <h3 className={`text-2xl font-bold mb-6 bg-gradient-to-r ${
                  service.color === 'emerald' 
                    ? 'from-emerald-400 to-emerald-300' 
                    : 'from-teal-400 to-teal-300'
                } bg-clip-text text-transparent group-hover:from-white group-hover:to-white transition-all duration-300`}>
                  {service.title}
                </h3>
                <p className="text-gray-300 leading-relaxed text-lg group-hover:text-white transition-colors duration-300">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Enhanced Clients Section */}
      <ClientsSection />

      {/* Newsletter Section */}
      <section className="py-32 px-16 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <Badge className="bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-300 px-8 py-4 text-base mb-10 rounded-full backdrop-blur-sm border border-emerald-500/30">
            Stay Connected
          </Badge>
          
          <h2 className="text-5xl font-black mb-10">
            <span className="bg-gradient-to-r from-white via-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Stay Updated with G4U
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 mb-16 leading-relaxed">
            Get the latest insights, tips, and exclusive updates from our digital marketing experts delivered directly to your inbox.
          </p>
          <NewsletterSignup />
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="py-20 px-16 border-t border-white/20 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <EditableImage
                src="/images/gumming4u-logo.png"
                alt="G4U Logo"
                width={150}
                height={50}
                className="mb-6 hover:scale-110 transition-all duration-300"
                style={{ width: 'auto', height: '50px' }}
              />
              <p className="text-gray-400 text-lg leading-relaxed">
                Transforming brands through innovative digital marketing solutions that drive extraordinary results and sustainable growth.
              </p>
            </div>
            
            {[
              {
                title: "Services",
                links: [
                  { name: "Digital Marketing", href: "/services" },
                  { name: "Brand Design", href: "/services" },
                  { name: "Web Development", href: "/services" },
                  { name: "Social Media", href: "/services" }
                ]
              },
              {
                title: "Company",
                links: [
                  { name: "About", href: "/about" },
                  { name: "Portfolio", href: "/portfolio" },
                  { name: "Blog", href: "/blog" },
                  { name: "Contact", href: "/contact" }
                ]
              },
              {
                title: "Connect",
                links: [
                  { name: "Instagram", href: "#" },
                  { name: "LinkedIn", href: "#" },
                  { name: "Twitter", href: "#" },
                  { name: "Email", href: "mailto:gumming4u@gmail.com" }
                ]
              }
            ].map((section, index) => (
              <div key={index}>
                <h3 className="text-white font-bold mb-6 text-lg">{section.title}</h3>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link 
                        href={link.href} 
                        className="text-gray-400 hover:text-white transition-colors duration-300 hover:translate-x-2 inline-block text-base"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="border-t border-white/20 mt-16 pt-10 text-center text-gray-400">
            <p className="text-lg">
              &copy; 2024 G4U Digital Marketing. All rights reserved. | 
              <span className="text-emerald-400 hover:text-white transition-colors duration-300 ml-2">
                Crafted with Excellence
              </span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
