"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { subscribeNewsletter } from "@/app/actions/newsletter"
import { trackNewsletterSignup } from "@/components/analytics"

export function NewsletterSignup() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData()
    formData.append("email", email)

    try {
      const result = await subscribeNewsletter(formData)

      if (result.success) {
        setStatus("success")
        setEmail("")
        trackNewsletterSignup()
      } else {
        setStatus("error")
      }

      setMessage(result.message)
    } catch (error) {
      setStatus("error")
      setMessage("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-gray-100 p-8 rounded-lg">
      <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
      <p className="text-gray-600 mb-6">
        Get the latest digital marketing insights, tips, and exclusive offers delivered to your inbox.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address"
          required
          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
        />
        <Button type="submit" disabled={isSubmitting} className="bg-black text-white hover:bg-gray-800 px-6 py-3">
          {isSubmitting ? "Subscribing..." : "Subscribe"}
        </Button>
      </form>

      {message && (
        <div className={`mt-4 text-sm ${status === "success" ? "text-green-600" : "text-red-600"}`}>{message}</div>
      )}
    </div>
  )
}
