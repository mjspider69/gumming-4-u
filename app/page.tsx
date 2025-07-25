
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CustomCursor } from "@/components/advanced-cursor"
import { Enhanced3DBackground } from "@/components/enhanced-3d-background"
import { ClientsSection } from "@/components/clients-section"
import { NewsletterSignup } from "@/components/newsletter-signup"
import { Navigation } from "@/components/navigation"
import { EditableText } from "@/components/editable-text"
import { EditableImage } from "@/components/editable-image"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden" style={{ cursor: "none" }}>
      <CustomCursor />
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-32 px-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="relative">
            <Badge className="bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-300 px-8 py-4 text-lg mb-12 rounded-full border border-emerald-500/30 backdrop-blur-sm">
              ✨ Welcome to G4U Digital Universe ✨
            </Badge>
            
            {/* From Ordinary to Extraordinary */}
            <div className="mb-12">
              <div className="flex items-center justify-center gap-8 mb-8">
                <span className="text-4xl md:text-6xl font-light text-gray-400 opacity-60">
                  FROM ORDINARY
                </span>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-1 bg-gradient-to-r from-gray-400 to-emerald-400 rounded-full mb-2"></div>
                  <span className="text-emerald-400 text-xl">✨</span>
                  <div className="w-12 h-1 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full mt-2"></div>
                </div>
                <span className="text-4xl md:text-6xl font-black bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                  TO EXTRAORDINARY
                </span>
              </div>
            </div>
            
            {/* Animated G4U Logo Text */}
            <div className="mb-8">
              <h1 className="text-8xl md:text-9xl font-black mb-4 bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent animate-pulse">
                G4U
              </h1>
              <div className="h-1 w-32 bg-gradient-to-r from-emerald-400 to-teal-400 mx-auto rounded-full animate-bounce"></div>
            </div>
            
            <h2 className="text-5xl md:text-7xl font-black mb-12 text-white">
              <EditableText 
                defaultText="DIGITAL MARKETING EXCELLENCE" 
                className="text-white"
              />
            </h2>
          </div>
          
          <p className="text-2xl text-gray-300 max-w-4xl mx-auto mb-16 leading-relaxed">
            <EditableText 
              defaultText="We elevate ordinary businesses into extraordinary brands through cutting-edge digital strategies, innovative design solutions, and data-driven marketing campaigns that deliver transformational results."
              className="text-gray-300"
            />
          </p>
          
          {/* Enhanced CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Button className="cursor-pointer bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-12 py-6 text-xl font-bold rounded-full shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 transform hover:scale-110 hover:-translate-y-2">
              🚀 Get Started Now
            </Button>
            <Button variant="outline" className="cursor-pointer border-2 border-white text-white px-12 py-6 text-xl font-bold rounded-full hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-110 hover:-translate-y-2 backdrop-blur-sm">
              👁️ View Portfolio
            </Button>
          </div>
          
          {/* Hidden Reveal Hint */}
          <div className="text-center">
            <p className="text-emerald-400 text-lg animate-pulse cursor-pointer">
              💫 Move your cursor around to discover hidden surprises 💫
            </p>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-4 h-4 bg-emerald-400 rounded-full animate-bounce opacity-60"></div>
          <div className="absolute top-40 right-20 w-6 h-6 bg-teal-400 rounded-full animate-ping opacity-40"></div>
          <div className="absolute bottom-20 left-1/4 w-3 h-3 bg-cyan-400 rounded-full animate-pulse opacity-70"></div>
          <div className="absolute top-1/3 right-1/3 w-5 h-5 bg-emerald-500 rounded-full animate-bounce opacity-50"></div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-32 px-16 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge className="bg-white/20 text-white px-6 py-3 text-sm mb-8 rounded-full">
                About G4U
              </Badge>
              <h2 className="text-5xl font-black mb-8">
                <EditableText 
                  defaultText="Crafting Digital Experiences That Matter"
                  className="text-white"
                />
              </h2>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                <EditableText 
                  defaultText="With over a decade of experience in digital marketing, we've helped hundreds of brands achieve their goals through innovative strategies and creative excellence."
                  className="text-gray-300"
                />
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h3 className="text-3xl font-bold text-white mb-2">500+</h3>
                  <p className="text-gray-400">Projects Completed</p>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-white mb-2">250+</h3>
                  <p className="text-gray-400">Happy Clients</p>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-white mb-2">98%</h3>
                  <p className="text-gray-400">Client Satisfaction</p>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-white mb-2">24/7</h3>
                  <p className="text-gray-400">Support Available</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <EditableImage
                src="/images/team-photo.jpg"
                alt="G4U Team"
                width={600}
                height={400}
                className="rounded-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-32 px-16 relative">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <Badge className="bg-white/20 text-white px-6 py-3 text-sm mb-8 rounded-full">
            Our Services
          </Badge>
          <h2 className="text-5xl font-black mb-8">
            <EditableText 
              defaultText="What We Do Best"
              className="text-white"
            />
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            <EditableText 
              defaultText="From brand strategy to digital execution, we offer comprehensive services to help your business thrive in the digital landscape."
              className="text-gray-300"
            />
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Digital Marketing",
              description: "Comprehensive digital marketing strategies that drive growth and engagement across all channels.",
              icon: "📱"
            },
            {
              title: "Brand Design",
              description: "Creative brand identity design that captures your essence and resonates with your audience.",
              icon: "🎨"
            },
            {
              title: "Web Development",
              description: "Modern, responsive websites that deliver exceptional user experiences and convert visitors.",
              icon: "💻"
            },
            {
              title: "Social Media",
              description: "Strategic social media management that builds communities and drives meaningful engagement.",
              icon: "📲"
            },
            {
              title: "SEO Optimization",
              description: "Advanced SEO strategies that improve your search rankings and organic visibility.",
              icon: "🔍"
            },
            {
              title: "Analytics & Insights",
              description: "Data-driven insights and analytics that inform strategy and measure success.",
              icon: "📊"
            }
          ].map((service, index) => (
            <Card key={`service-${index}`} className="bg-white/10 border-white/20 backdrop-blur-sm hover:bg-white/20 transition-all group">
              <CardContent className="p-8">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-white mb-4">{service.title}</h3>
                <p className="text-gray-300 leading-relaxed">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Clients Section */}
      <ClientsSection />

      {/* Newsletter Section */}
      <section className="py-32 px-16 relative">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-black mb-8">
            <EditableText 
              defaultText="Stay Updated with G4U"
              className="text-white"
            />
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            <EditableText 
              defaultText="Get the latest insights, tips, and updates from our digital marketing experts."
              className="text-gray-300"
            />
          </p>
          <NewsletterSignup />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-16 border-t border-white/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <EditableImage
                src="/images/gumming4u-logo.png"
                alt="G4U Logo"
                width={120}
                height={40}
                className="mb-4"
                style={{ width: 'auto', height: '40px' }}
              />
              <p className="text-gray-400">
                <EditableText 
                  defaultText="Transforming brands through innovative digital marketing solutions."
                  className="text-gray-400"
                />
              </p>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/services" className="hover:text-white transition-colors">Digital Marketing</Link></li>
                <li><Link href="/services" className="hover:text-white transition-colors">Brand Design</Link></li>
                <li><Link href="/services" className="hover:text-white transition-colors">Web Development</Link></li>
                <li><Link href="/services" className="hover:text-white transition-colors">Social Media</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="/portfolio" className="hover:text-white transition-colors">Portfolio</Link></li>
                <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">Connect</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Email</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/20 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 G4U Digital Marketing. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
