"use server"

import { z } from "zod"

const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
})

export async function subscribeNewsletter(formData: FormData) {
  try {
    const email = formData.get("email") as string

    const validatedData = newsletterSchema.parse({ email })

    // Simulate newsletter subscription
    await new Promise((resolve) => setTimeout(resolve, 800))

    // In production, integrate with:
    // - Mailchimp, ConvertKit, or Klaviyo
    // - Your email marketing platform

    console.log("Newsletter subscription:", validatedData.email)

    return {
      success: true,
      message: "Successfully subscribed to our newsletter!",
    }
  } catch (error) {
    console.error("Newsletter subscription error:", error)

    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: error.errors[0].message,
      }
    }

    return {
      success: false,
      message: "Subscription failed. Please try again.",
    }
  }
}
