"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { X, CheckCircle } from "lucide-react"

interface GoogleFormProps {
  isOpen: boolean
  onClose: () => void
}

export function GoogleForm({ isOpen, onClose }: GoogleFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false)

  if (!isOpen) return null

  const handleSubmit = () => {
    // The form will be submitted to Google Forms
    setIsSubmitted(true)
    setTimeout(() => {
      onClose()
      setIsSubmitted(false)
    }, 2000)
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-gray-700 rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-4 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-lg">Get Your Free Digital Marketing Consultation</h3>
            <p className="text-sm opacity-90">Fill out this form and we'll get back to you within 24 hours</p>
          </div>
          <Button onClick={onClose} variant="ghost" size="sm" className="text-white hover:bg-white/20 p-1">
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Form Content */}
        <div className="p-6">
          {isSubmitted ? (
            <div className="text-center py-8">
              <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Thank You!</h3>
              <p className="text-gray-300">
                Your form has been submitted successfully. We'll contact you within 24 hours.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-gray-300 mb-6">
                Please fill out the form below to get started with your free digital marketing consultation. Our team
                will analyze your current digital presence and provide personalized recommendations.
              </p>

              {/* Embedded Google Form */}
              <iframe
                src="https://docs.google.com/forms/d/e/1FAIpQLSf_EXAMPLE_FORM_ID/viewform?embedded=true"
                width="100%"
                height="600"
                frameBorder="0"
                marginHeight={0}
                marginWidth={0}
                className="rounded-lg"
                title="Digital Marketing Consultation Form"
              >
                Loading…
              </iframe>

              {/* Alternative Contact Options */}
              <div className="mt-6 p-4 bg-gray-800 rounded-lg border border-gray-700">
                <h4 className="font-semibold text-white mb-3">Prefer to contact us directly?</h4>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="https://wa.me/919551077771?text=Hi%20Gumming4U!%20I%27d%20like%20to%20get%20a%20free%20digital%20marketing%20consultation."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white">WhatsApp Us</Button>
                  </a>
                  <a
                    href="mailto:gumming4u@gmail.com?subject=Free Digital Marketing Consultation Request&body=Hi Gumming4U Team,%0D%0A%0D%0AI'm interested in a free digital marketing consultation for my business.%0D%0A%0D%0APlease contact me to discuss further.%0D%0A%0D%0AThank you!"
                    className="flex-1"
                  >
                    <Button
                      variant="outline"
                      className="w-full border-gray-600 text-gray-300 hover:text-white hover:border-white bg-transparent"
                    >
                      Email Us
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
