import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Privacy Policy | Gumming4U Digital Marketing Agency",
  description:
    "Privacy Policy for Gumming4U Digital Marketing Agency. Learn how we collect, use, and protect your personal information.",
  robots: {
    index: true,
    follow: true,
  },
}

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        <p className="text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">1. Information We Collect</h2>
            <p className="mb-4">We collect information you provide directly to us, such as when you:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Fill out our contact form</li>
              <li>Subscribe to our newsletter</li>
              <li>Request a consultation</li>
              <li>Interact with our website</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">2. How We Use Your Information</h2>
            <p className="mb-4">We use the information we collect to:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Respond to your inquiries and provide customer service</li>
              <li>Send you marketing communications (with your consent)</li>
              <li>Improve our website and services</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">3. Information Sharing</h2>
            <p className="mb-4">
              We do not sell, trade, or otherwise transfer your personal information to third parties without your
              consent, except as described in this policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">4. Data Security</h2>
            <p className="mb-4">
              We implement appropriate security measures to protect your personal information against unauthorized
              access, alteration, disclosure, or destruction.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">5. Your Rights</h2>
            <p className="mb-4">You have the right to:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Opt-out of marketing communications</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">6. Contact Us</h2>
            <p className="mb-4">If you have any questions about this Privacy Policy, please contact us at:</p>
            <div className="bg-gray-100 p-4 rounded-lg">
              <p>
                <strong>Email:</strong> gumming4u@gmail.com
              </p>
              <p>
                <strong>Phone:</strong> +91 95510 77771
              </p>
              <p>
                <strong>Address:</strong> Chennai, Tamil Nadu, India
              </p>
            </div>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link href="/" className="text-blue-600 hover:text-blue-800">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
import type { Metadata } from "next"
import { Enhanced3DBackground } from "@/components/enhanced-3d-background"
import Navigation from "@/components/navigation"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, Lock, Eye, UserCheck, Mail, Phone, Globe, Instagram, Linkedin, Twitter } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Privacy Policy - Gumming4U Digital Marketing Agency",
  description: "Learn how Gumming4U protects your personal information and data. Our comprehensive privacy policy outlines our data collection, usage, and protection practices.",
  keywords: ["privacy policy", "data protection", "GDPR compliance", "data security", "digital marketing privacy"],
  robots: {
    index: true,
    follow: true,
  },
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-black text-white" style={{ cursor: "none" }}>
      <Enhanced3DBackground />
      <Navigation />

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-6 md:px-16 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="bg-white/20 text-white px-6 py-3 text-sm mb-8 rounded-full">
            Legal Information
          </Badge>
          <h1 className="text-4xl md:text-6xl font-black mb-8">PRIVACY POLICY</h1>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
            Your privacy is important to us. This policy explains how we collect, use, and protect your information.
          </p>
          <div className="flex items-center justify-center mt-8 text-gray-400">
            <span>Last updated: February 2024</span>
          </div>
        </div>
      </section>

      {/* Privacy Content */}
      <section className="py-16 px-6 md:px-16 bg-gray-900/30">
        <div className="max-w-4xl mx-auto">
          <div className="grid gap-8">
            {/* Information We Collect */}
            <Card className="bg-black/80 border border-gray-700 backdrop-blur-lg">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <UserCheck className="w-8 h-8 text-white mr-4" />
                  <h2 className="text-2xl font-bold text-white">Information We Collect</h2>
                </div>
                <div className="space-y-4 text-gray-300">
                  <h3 className="text-lg font-semibold text-white">Personal Information</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Name, email address, and phone number when you contact us</li>
                    <li>Company information for business inquiries</li>
                    <li>Communication preferences and marketing consent</li>
                    <li>Resume and professional information for job applications</li>
                  </ul>
                  
                  <h3 className="text-lg font-semibold text-white mt-6">Automatically Collected Information</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>IP address and browser information</li>
                    <li>Pages visited and time spent on our website</li>
                    <li>Referring websites and search terms</li>
                    <li>Device information and operating system</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* How We Use Information */}
            <Card className="bg-black/80 border border-gray-700 backdrop-blur-lg">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <Eye className="w-8 h-8 text-white mr-4" />
                  <h2 className="text-2xl font-bold text-white">How We Use Your Information</h2>
                </div>
                <div className="space-y-4 text-gray-300">
                  <ul className="list-disc list-inside space-y-2">
                    <li>To respond to your inquiries and provide requested services</li>
                    <li>To send marketing communications (with your consent)</li>
                    <li>To improve our website and user experience</li>
                    <li>To analyze website traffic and performance</li>
                    <li>To comply with legal obligations</li>
                    <li>To process job applications and recruitment</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Data Protection */}
            <Card className="bg-black/80 border border-gray-700 backdrop-blur-lg">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <Lock className="w-8 h-8 text-white mr-4" />
                  <h2 className="text-2xl font-bold text-white">Data Protection & Security</h2>
                </div>
                <div className="space-y-4 text-gray-300">
                  <p>We implement appropriate technical and organizational measures to protect your personal information:</p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>SSL encryption for data transmission</li>
                    <li>Secure servers and database protection</li>
                    <li>Limited access to personal information</li>
                    <li>Regular security assessments and updates</li>
                    <li>Employee training on data protection</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Your Rights */}
            <Card className="bg-black/80 border border-gray-700 backdrop-blur-lg">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <Shield className="w-8 h-8 text-white mr-4" />
                  <h2 className="text-2xl font-bold text-white">Your Rights</h2>
                </div>
                <div className="space-y-4 text-gray-300">
                  <p>You have the following rights regarding your personal information:</p>
                  <ul className="list-disc list-inside space-y-2">
                    <li><strong>Access:</strong> Request a copy of your personal information</li>
                    <li><strong>Rectification:</strong> Correct inaccurate or incomplete information</li>
                    <li><strong>Erasure:</strong> Request deletion of your personal information</li>
                    <li><strong>Portability:</strong> Receive your data in a structured format</li>
                    <li><strong>Objection:</strong> Object to processing of your personal information</li>
                    <li><strong>Withdrawal:</strong> Withdraw consent for marketing communications</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Cookies */}
            <Card className="bg-black/80 border border-gray-700 backdrop-blur-lg">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Cookies & Tracking</h2>
                <div className="space-y-4 text-gray-300">
                  <p>We use cookies and similar technologies to:</p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Remember your preferences and settings</li>
                    <li>Analyze website traffic and performance</li>
                    <li>Provide personalized content and advertisements</li>
                    <li>Improve user experience and functionality</li>
                  </ul>
                  <p className="mt-4">You can control cookie settings through your browser preferences.</p>
                </div>
              </CardContent>
            </Card>

            {/* Third Parties */}
            <Card className="bg-black/80 border border-gray-700 backdrop-blur-lg">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Third-Party Services</h2>
                <div className="space-y-4 text-gray-300">
                  <p>We may share information with trusted third-party service providers:</p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Analytics providers (Google Analytics)</li>
                    <li>Email marketing platforms</li>
                    <li>Customer relationship management systems</li>
                    <li>Social media platforms</li>
                    <li>Payment processors (for paid services)</li>
                  </ul>
                  <p className="mt-4">These providers are bound by strict confidentiality agreements.</p>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="bg-black/80 border border-gray-700 backdrop-blur-lg">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Contact Us</h2>
                <div className="space-y-4 text-gray-300">
                  <p>If you have questions about this privacy policy or want to exercise your rights, contact us:</p>
                  <div className="space-y-3 mt-4">
                    <p className="flex items-center">
                      <Mail className="w-5 h-5 mr-3 text-white" />
                      gumming4u@gmail.com
                    </p>
                    <p className="flex items-center">
                      <Phone className="w-5 h-5 mr-3 text-white" />
                      +91 95510 77771
                    </p>
                    <p className="flex items-center">
                      <Globe className="w-5 h-5 mr-3 text-white" />
                      Chennai, Tamil Nadu, India
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
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
