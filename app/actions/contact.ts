"use server"

import { z } from "zod"

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  company: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

export async function submitContactForm(formData: FormData) {
  try {
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      company: formData.get("company") as string,
      message: formData.get("message") as string,
    }

    // Validate the data
    const validatedData = contactSchema.parse(data)

    // Here you would typically:
    // 1. Send email notification
    // 2. Save to database
    // 3. Send to CRM
    // 4. Send auto-reply to user

    // Simulate email sending
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // In production, you would use services like:
    // - Resend, SendGrid, or Nodemailer for emails
    // - Supabase, MongoDB, or PostgreSQL for database
    // - HubSpot, Salesforce for CRM integration

    console.log("Contact form submission:", validatedData)

    return {
      success: true,
      message: "Thank you for your message! We'll get back to you within 24 hours.",
    }
  } catch (error) {
    console.error("Contact form error:", error)

    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: error.errors[0].message,
      }
    }

    return {
      success: false,
      message: "Something went wrong. Please try again or email us directly at gumming4u@gmail.com",
    }
  }
}
