import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Terms & Conditions | Gumming4U Digital Marketing Agency",
  description: "Terms and Conditions for Gumming4U Digital Marketing Agency services.",
  robots: {
    index: true,
    follow: true,
  },
}

export default function TermsConditions() {
  return (
    <div className="min-h-screen bg-white py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Terms & Conditions</h1>
        <p className="text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
            <p className="mb-4">
              By accessing and using Gumming4U's services, you accept and agree to be bound by the terms and provision
              of this agreement.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">2. Services</h2>
            <p className="mb-4">Gumming4U provides digital marketing services including but not limited to:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Search Engine Optimization (SEO)</li>
              <li>Pay-Per-Click (PPC) Advertising</li>
              <li>Social Media Marketing</li>
              <li>Web Development</li>
              <li>Content Creation</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">3. Payment Terms</h2>
            <p className="mb-4">Payment terms will be specified in individual service agreements. Generally:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Invoices are due within 30 days of issue</li>
              <li>Late payments may incur additional charges</li>
              <li>Services may be suspended for non-payment</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">4. Intellectual Property</h2>
            <p className="mb-4">
              All content, designs, and materials created by Gumming4U remain our intellectual property until full
              payment is received.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">5. Limitation of Liability</h2>
            <p className="mb-4">
              Gumming4U shall not be liable for any indirect, incidental, special, consequential, or punitive damages.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">6. Contact Information</h2>
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
import { FileText, Scale, AlertCircle, CheckCircle, Mail, Phone, Globe, Instagram, Linkedin, Twitter } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Terms & Conditions - Gumming4U Digital Marketing Agency",
  description: "Read our terms and conditions for digital marketing services. Understand your rights and responsibilities when working with Gumming4U.",
  keywords: ["terms and conditions", "service agreement", "digital marketing terms", "legal terms", "service conditions"],
  robots: {
    index: true,
    follow: true,
  },
}

export default function TermsConditionsPage() {
  return (
    <div className="min-h-screen bg-black text-white" style={{ cursor: "none" }}>
      <Enhanced3DBackground />
      <Navigation />

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-6 md:px-16 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="bg-white/20 text-white px-6 py-3 text-sm mb-8 rounded-full">
            Legal Terms
          </Badge>
          <h1 className="text-4xl md:text-6xl font-black mb-8">TERMS & CONDITIONS</h1>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
            Please read these terms carefully before using our services. By engaging with Gumming4U, you agree to these terms.
          </p>
          <div className="flex items-center justify-center mt-8 text-gray-400">
            <span>Last updated: February 2024</span>
          </div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-16 px-6 md:px-16 bg-gray-900/30">
        <div className="max-w-4xl mx-auto">
          <div className="grid gap-8">
            {/* Agreement to Terms */}
            <Card className="bg-black/80 border border-gray-700 backdrop-blur-lg">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <CheckCircle className="w-8 h-8 text-white mr-4" />
                  <h2 className="text-2xl font-bold text-white">Agreement to Terms</h2>
                </div>
                <div className="space-y-4 text-gray-300">
                  <p>
                    By accessing and using Gumming4U's website and services, you accept and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.
                  </p>
                  <p>
                    These terms apply to all visitors, users, and others who access or use our services, whether as guests or registered clients.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Services Description */}
            <Card className="bg-black/80 border border-gray-700 backdrop-blur-lg">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <FileText className="w-8 h-8 text-white mr-4" />
                  <h2 className="text-2xl font-bold text-white">Our Services</h2>
                </div>
                <div className="space-y-4 text-gray-300">
                  <p>Gumming4U provides digital marketing services including but not limited to:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Search Engine Optimization (SEO)</li>
                    <li>Pay-Per-Click (PPC) Advertising</li>
                    <li>Social Media Marketing</li>
                    <li>Content Creation and Marketing</li>
                    <li>Website Development and Design</li>
                    <li>Email Marketing</li>
                    <li>Brand Strategy and Consulting</li>
                    <li>Marketing Automation</li>
                  </ul>
                  <p className="mt-4">
                    Service delivery timelines and specific deliverables will be outlined in individual service agreements or proposals.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Payment Terms */}
            <Card className="bg-black/80 border border-gray-700 backdrop-blur-lg">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Payment Terms</h2>
                <div className="space-y-4 text-gray-300">
                  <h3 className="text-lg font-semibold text-white">Payment Schedule</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Payment terms will be specified in individual service agreements</li>
                    <li>Monthly retainer services require advance payment</li>
                    <li>Project-based work may require 50% upfront payment</li>
                    <li>Final payment due upon project completion</li>
                  </ul>
                  
                  <h3 className="text-lg font-semibold text-white mt-6">Late Payments</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Late payment fees may apply after 30 days</li>
                    <li>Services may be suspended for overdue accounts</li>
                    <li>Client responsible for collection costs</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Client Responsibilities */}
            <Card className="bg-black/80 border border-gray-700 backdrop-blur-lg">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Client Responsibilities</h2>
                <div className="space-y-4 text-gray-300">
                  <p>To ensure successful service delivery, clients must:</p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Provide accurate and complete information</li>
                    <li>Grant necessary access to platforms and accounts</li>
                    <li>Respond to requests within reasonable timeframes</li>
                    <li>Provide feedback and approval in a timely manner</li>
                    <li>Comply with platform terms of service</li>
                    <li>Maintain up-to-date contact information</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Intellectual Property */}
            <Card className="bg-black/80 border border-gray-700 backdrop-blur-lg">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Intellectual Property</h2>
                <div className="space-y-4 text-gray-300">
                  <h3 className="text-lg font-semibold text-white">Client Content</h3>
                  <p>Clients retain ownership of their:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Brand logos and trademarks</li>
                    <li>Existing content and materials</li>
                    <li>Business information and data</li>
                  </ul>
                  
                  <h3 className="text-lg font-semibold text-white mt-6">Created Content</h3>
                  <p>Content created by Gumming4U becomes client property upon full payment, including:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Custom graphics and designs</li>
                    <li>Written content and copy</li>
                    <li>Website code and development</li>
                    <li>Campaign strategies and materials</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Performance & Results */}
            <Card className="bg-black/80 border border-gray-700 backdrop-blur-lg">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <AlertCircle className="w-8 h-8 text-white mr-4" />
                  <h2 className="text-2xl font-bold text-white">Performance & Results</h2>
                </div>
                <div className="space-y-4 text-gray-300">
                  <p><strong>No Guaranteed Results:</strong> While we strive for excellence, digital marketing results can vary based on numerous factors including market conditions, competition, and platform changes.</p>
                  
                  <p><strong>Best Efforts:</strong> We commit to providing services with professional skill and care, using industry best practices and proven methodologies.</p>
                  
                  <p><strong>Reporting:</strong> Regular performance reports will be provided as outlined in service agreements.</p>
                </div>
              </CardContent>
            </Card>

            {/* Termination */}
            <Card className="bg-black/80 border border-gray-700 backdrop-blur-lg">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Termination</h2>
                <div className="space-y-4 text-gray-300">
                  <h3 className="text-lg font-semibold text-white">By Client</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>30 days written notice for ongoing services</li>
                    <li>Payment due for completed work</li>
                    <li>No refund for prepaid services</li>
                  </ul>
                  
                  <h3 className="text-lg font-semibold text-white mt-6">By Gumming4U</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Immediate termination for non-payment</li>
                    <li>30 days notice for other reasons</li>
                    <li>Refund of unused prepaid amounts</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Limitation of Liability */}
            <Card className="bg-black/80 border border-gray-700 backdrop-blur-lg">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <Scale className="w-8 h-8 text-white mr-4" />
                  <h2 className="text-2xl font-bold text-white">Limitation of Liability</h2>
                </div>
                <div className="space-y-4 text-gray-300">
                  <p>
                    Gumming4U's liability is limited to the amount paid for services in the 12 months preceding any claim. We are not liable for:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Indirect, incidental, or consequential damages</li>
                    <li>Loss of profits or business opportunities</li>
                    <li>Third-party platform changes or restrictions</li>
                    <li>Data loss or security breaches beyond our control</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Governing Law */}
            <Card className="bg-black/80 border border-gray-700 backdrop-blur-lg">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Governing Law</h2>
                <div className="space-y-4 text-gray-300">
                  <p>
                    These terms are governed by the laws of India. Any disputes will be resolved through arbitration in Chennai, Tamil Nadu.
                  </p>
                  <p>
                    If any provision of these terms is found unenforceable, the remaining provisions remain in effect.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="bg-black/80 border border-gray-700 backdrop-blur-lg">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Questions About These Terms</h2>
                <div className="space-y-4 text-gray-300">
                  <p>If you have questions about these terms and conditions, please contact us:</p>
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
