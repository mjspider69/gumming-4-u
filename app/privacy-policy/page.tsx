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
