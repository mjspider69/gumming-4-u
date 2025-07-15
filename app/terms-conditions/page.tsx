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
