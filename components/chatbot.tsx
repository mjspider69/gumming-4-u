"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { X, Send, MessageCircle, Bot, User } from "lucide-react"

interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

const botResponses = {
  greeting: [
    "Hello! I'm your digital marketing assistant from Gumming4U. I'm here to help you with all your digital marketing questions. How can I assist you today?",
    "Hi there! Welcome to Gumming4U - Chennai's fastest-growing digital marketing agency. What would you like to know about digital marketing?",
    "Hey! I'm here to help you understand how digital marketing can transform your business. What specific area interests you?",
  ],
  services: [
    "We offer comprehensive digital marketing services: 🎯 SEO & Content Marketing, 📱 Social Media Management, 💻 Website Development, 🛒 E-commerce Solutions, 📊 PPC Advertising, 📧 Email Marketing, 🤖 Marketing Automation, and 🎨 Brand Strategy. Which service would you like to know more about?",
    "Our expertise covers the full digital marketing spectrum: Search Engine Optimization, Pay-Per-Click advertising, Social Media Marketing, Web Development, Content Creation, E-commerce optimization, Email campaigns, and Marketing Automation. What's your biggest marketing challenge right now?",
  ],
  seo: [
    "SEO (Search Engine Optimization) helps your website rank higher on Google! 🚀 We optimize your content, improve site speed, build quality backlinks, and ensure your business appears when customers search for your services. Our SEO packages start from ₹20,000/month. Want to know how we can improve your rankings?",
    "Great question about SEO! We focus on: ✅ Keyword research & optimization, ✅ Technical SEO improvements, ✅ Content strategy, ✅ Local SEO for Chennai businesses, ✅ Link building campaigns. Most clients see results in 3-6 months. Shall I connect you with our SEO specialist?",
  ],
  socialmedia: [
    "Social Media Marketing is perfect for building brand awareness! 📱 We manage Instagram, Facebook, LinkedIn, Twitter, and YouTube. Our services include content creation, community management, paid advertising, and analytics. Packages start from ₹25,000/month. Which platforms are you most interested in?",
    "Social media is where your customers spend their time! We create engaging content, run targeted ads, manage your community, and track performance. We've helped businesses increase their social media engagement by 300%+. Want to see some examples of our work?",
  ],
  ppc: [
    "PPC (Pay-Per-Click) advertising gives you instant visibility! 💰 We run Google Ads, Facebook Ads, Instagram Ads, and LinkedIn campaigns. You only pay when someone clicks your ad. Our PPC management starts from ₹30,000/month + ad spend. What's your monthly advertising budget?",
    "PPC is perfect for immediate results! We create targeted campaigns, optimize for conversions, and provide detailed reporting. Our clients typically see 3-5x return on ad spend. We handle Google Ads, social media advertising, and remarketing campaigns. Ready to get started?",
  ],
  website: [
    "Website development is our specialty! 💻 We create responsive, fast-loading websites optimized for conversions. Our packages include: Basic websites (₹50,000), E-commerce stores (₹75,000+), and custom solutions. All websites are mobile-friendly and SEO-optimized. What type of website do you need?",
    "A professional website is crucial for credibility! We build modern, user-friendly websites with features like contact forms, booking systems, payment integration, and CMS. All our websites are designed to convert visitors into customers. Want to see our portfolio?",
  ],
  ecommerce: [
    "E-commerce is booming! 🛒 We set up complete online stores with payment gateways, inventory management, shipping integration, and mobile optimization. Our e-commerce solutions start from ₹75,000. We work with Shopify, WooCommerce, and custom platforms. What products do you want to sell online?",
    "Online selling is the future! We handle everything: store setup, product optimization, payment integration, shipping solutions, and digital marketing for your store. Our clients typically see 200%+ increase in online sales. Ready to take your business online?",
  ],
  content: [
    "Content is king in digital marketing! 👑 We create blog posts, social media content, videos, infographics, and website copy. Our content strategies improve SEO rankings and engage your audience. Content packages start from ₹15,000/month. What type of content does your business need?",
    "Quality content drives results! We research your audience, create valuable content, optimize for search engines, and distribute across channels. Our content has helped businesses increase website traffic by 400%+. Want to discuss your content strategy?",
  ],
  email: [
    "Email marketing has the highest ROI! 📧 We create automated email sequences, newsletters, promotional campaigns, and personalized messages. Our email marketing services start from ₹12,000/month. We use tools like Mailchimp, ConvertKit, and custom solutions. How large is your email list?",
    "Email marketing is incredibly effective! We design beautiful emails, set up automation workflows, segment your audience, and track performance. Our clients see 25-30% open rates on average. Ready to nurture your leads with email?",
  ],
  pricing: [
    "Our pricing is transparent and competitive! 💰 Social Media: ₹25,000/month, SEO: ₹20,000/month, PPC: ₹30,000/month, Websites: ₹50,000+, E-commerce: ₹75,000+. We also offer custom packages. All services include strategy, execution, and monthly reporting. Want a personalized quote?",
    "We offer flexible pricing based on your needs! Our packages are designed to deliver maximum ROI. We provide free consultations to understand your goals and recommend the best services. Most clients see positive results within 3 months. Shall I help you schedule a consultation?",
  ],
  results: [
    "Our results speak for themselves! 📈 We've helped clients achieve: 300% increase in website traffic, 200% boost in social media engagement, 400% improvement in lead generation, and 5x return on ad spend. We provide detailed monthly reports showing your progress. Want to see case studies?",
    "We're proud of our track record! Our clients typically see: Higher Google rankings, increased website conversions, more social media followers, better email open rates, and significant ROI improvements. We measure everything and optimize continuously. Ready to join our success stories?",
  ],
  process: [
    "Our process is simple and effective! 🎯 1) Free consultation to understand your goals, 2) Custom strategy development, 3) Implementation and execution, 4) Monitoring and optimization, 5) Monthly reporting and reviews. We're with you every step of the way. Want to start with a free consultation?",
    "We follow a proven methodology! First, we audit your current digital presence, then create a customized strategy, implement campaigns, track performance, and continuously optimize for better results. Our team provides regular updates and is always available for questions. Ready to begin?",
  ],
  contact: [
    "Ready to transform your business? 🚀 Contact us: 📧 Email: gumming4u@gmail.com, 📱 WhatsApp: +91 95510 77771, 📍 Location: Chennai, Tamil Nadu. We offer free consultations! You can also schedule a call directly through WhatsApp. How would you prefer to connect?",
    "Let's discuss your digital marketing needs! You can reach us via email at gumming4u@gmail.com or WhatsApp at +91 95510 77771. We're based in Chennai and serve clients across India. Our business hours are Monday-Friday 9 AM to 6 PM IST. What's the best way to contact you?",
  ],
  consultation: [
    "I'd love to help you schedule a free consultation! 📅 You can click our 'Schedule a Call' button which connects directly to WhatsApp (+91 95510 77771), or fill out our contact form. During the consultation, we'll analyze your current digital presence and provide personalized recommendations. Which option works better for you?",
    "Great choice! Our free consultations are comprehensive - we review your website, social media, competitors, and create a custom digital marketing strategy. You can schedule via WhatsApp (+91 95510 77771) or email us at gumming4u@gmail.com. When would be a good time for you?",
  ],
  whatsapp: [
    "You can reach us on WhatsApp at +91 95510 77771! 📱 Just click our 'Schedule a Call' button or send us a message directly. We respond quickly and can discuss your digital marketing needs in detail. WhatsApp is often the fastest way to get answers to your questions!",
    "WhatsApp is perfect for quick discussions! Our number is +91 95510 77771. You can send us messages, share your website, ask questions, or schedule a call. We're very responsive on WhatsApp and can provide immediate assistance. Ready to connect?",
  ],
  location: [
    "We're based in Chennai, Tamil Nadu - the heart of South India's business hub! 🏙️ While we're located in Chennai, we serve clients across India and internationally. Our local expertise helps us understand the Indian market better. Are you based in Chennai or elsewhere?",
    "Gumming4U is proudly Chennai-based! We understand the local market dynamics and have helped many Chennai businesses grow digitally. However, we work with clients nationwide through digital channels. Location is no barrier to great digital marketing! Where is your business located?",
  ],
  team: [
    "Our team consists of experienced digital marketing professionals! 👥 We have specialists in SEO, PPC, social media, web development, content creation, and analytics. Led by our Managing Director Aryaan Alam, we're passionate about delivering results. Want to know more about our expertise in any specific area?",
    "We're a young, dynamic team with diverse skills! Our experts stay updated with the latest digital marketing trends and tools. We believe in continuous learning and applying cutting-edge strategies for our clients. Each team member brings unique expertise to your projects. Interested in meeting the team?",
  ],
  default: [
    "That's a great question about digital marketing! 🤔 I'd love to provide you with detailed information. For the most comprehensive answer, I recommend connecting with our specialists who can give you personalized insights. Would you like to schedule a free consultation via WhatsApp (+91 95510 77771) or email (gumming4u@gmail.com)?",
    "Thanks for asking! Digital marketing has many nuances, and I want to make sure you get the most accurate information for your specific situation. Our experts can provide detailed guidance tailored to your business. Shall I help you connect with our team through WhatsApp or email?",
    "I appreciate your question! While I can provide general information, our digital marketing specialists can give you much more detailed and personalized advice. They can analyze your specific situation and provide actionable recommendations. Would you prefer to connect via WhatsApp (+91 95510 77771) or email?",
  ],
}

function getBotResponse(userMessage: string): string {
  const message = userMessage.toLowerCase()

  // Greeting responses
  if (
    message.includes("hello") ||
    message.includes("hi") ||
    message.includes("hey") ||
    message.includes("good morning") ||
    message.includes("good afternoon")
  ) {
    return botResponses.greeting[Math.floor(Math.random() * botResponses.greeting.length)]
  }

  // SEO related queries
  if (
    message.includes("seo") ||
    message.includes("search engine") ||
    message.includes("google ranking") ||
    message.includes("organic traffic")
  ) {
    return botResponses.seo[Math.floor(Math.random() * botResponses.seo.length)]
  }

  // Social Media related queries
  if (
    message.includes("social media") ||
    message.includes("instagram") ||
    message.includes("facebook") ||
    message.includes("linkedin") ||
    message.includes("twitter")
  ) {
    return botResponses.socialmedia[Math.floor(Math.random() * botResponses.socialmedia.length)]
  }

  // PPC related queries
  if (
    message.includes("ppc") ||
    message.includes("google ads") ||
    message.includes("facebook ads") ||
    message.includes("paid advertising") ||
    message.includes("adwords")
  ) {
    return botResponses.ppc[Math.floor(Math.random() * botResponses.ppc.length)]
  }

  // Website related queries
  if (
    message.includes("website") ||
    message.includes("web development") ||
    message.includes("web design") ||
    message.includes("landing page")
  ) {
    return botResponses.website[Math.floor(Math.random() * botResponses.website.length)]
  }

  // E-commerce related queries
  if (
    message.includes("ecommerce") ||
    message.includes("e-commerce") ||
    message.includes("online store") ||
    message.includes("shopify") ||
    message.includes("woocommerce")
  ) {
    return botResponses.ecommerce[Math.floor(Math.random() * botResponses.ecommerce.length)]
  }

  // Content related queries
  if (
    message.includes("content") ||
    message.includes("blog") ||
    message.includes("copywriting") ||
    message.includes("video") ||
    message.includes("photography")
  ) {
    return botResponses.content[Math.floor(Math.random() * botResponses.content.length)]
  }

  // Email marketing queries
  if (
    message.includes("email") ||
    message.includes("newsletter") ||
    message.includes("email marketing") ||
    message.includes("automation")
  ) {
    return botResponses.email[Math.floor(Math.random() * botResponses.email.length)]
  }

  // Results and performance queries
  if (
    message.includes("results") ||
    message.includes("success") ||
    message.includes("case study") ||
    message.includes("portfolio") ||
    message.includes("examples")
  ) {
    return botResponses.results[Math.floor(Math.random() * botResponses.results.length)]
  }

  // Process related queries
  if (
    message.includes("process") ||
    message.includes("how do you work") ||
    message.includes("methodology") ||
    message.includes("approach")
  ) {
    return botResponses.process[Math.floor(Math.random() * botResponses.process.length)]
  }

  // WhatsApp related queries
  if (
    message.includes("whatsapp") ||
    message.includes("wa.me") ||
    message.includes("phone") ||
    message.includes("call")
  ) {
    return botResponses.whatsapp[Math.floor(Math.random() * botResponses.whatsapp.length)]
  }

  // Location related queries
  if (
    message.includes("location") ||
    message.includes("chennai") ||
    message.includes("where are you") ||
    message.includes("address")
  ) {
    return botResponses.location[Math.floor(Math.random() * botResponses.location.length)]
  }

  // Team related queries
  if (
    message.includes("team") ||
    message.includes("who are you") ||
    message.includes("about you") ||
    message.includes("experience")
  ) {
    return botResponses.team[Math.floor(Math.random() * botResponses.team.length)]
  }

  // General service queries
  if (
    message.includes("service") ||
    message.includes("what do you do") ||
    message.includes("offer") ||
    message.includes("help")
  ) {
    return botResponses.services[Math.floor(Math.random() * botResponses.services.length)]
  }

  // Pricing queries
  if (
    message.includes("price") ||
    message.includes("cost") ||
    message.includes("pricing") ||
    message.includes("quote") ||
    message.includes("budget")
  ) {
    return botResponses.pricing[Math.floor(Math.random() * botResponses.pricing.length)]
  }

  // Contact queries
  if (message.includes("contact") || message.includes("reach") || message.includes("get in touch")) {
    return botResponses.contact[Math.floor(Math.random() * botResponses.contact.length)]
  }

  // Consultation queries
  if (
    message.includes("consultation") ||
    message.includes("meeting") ||
    message.includes("schedule") ||
    message.includes("appointment")
  ) {
    return botResponses.consultation[Math.floor(Math.random() * botResponses.consultation.length)]
  }

  // Default response
  return botResponses.default[Math.floor(Math.random() * botResponses.default.length)]
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your digital marketing assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate bot typing delay
    setTimeout(
      () => {
        const botResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: getBotResponse(inputValue),
          sender: "bot",
          timestamp: new Date(),
        }

        setMessages((prev) => [...prev, botResponse])
        setIsTyping(false)

        if (
          !inputValue.toLowerCase().includes("whatsapp") &&
          !inputValue.toLowerCase().includes("email") &&
          !inputValue.toLowerCase().includes("contact")
        ) {
          setTimeout(() => {
            const followUpMessage: Message = {
              id: (Date.now() + 2).toString(),
              text: "💬 Ready to take the next step? Connect with us: \n📱 WhatsApp: +91 95510 77771 \n📧 Email: gumming4u@gmail.com \n\nOr ask me more questions about digital marketing!",
              sender: "bot",
              timestamp: new Date(),
            }
            setMessages((prev) => [...prev, followUpMessage])
          }, 3000)
        }
      },
      1000 + Math.random() * 1000,
    ) // Random delay between 1-2 seconds
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Chatbot Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-16 h-16 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 glow-effect border-2 border-white/20"
        >
          {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        </Button>
      </div>

      {/* Chatbot Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[500px] bg-gray-900 border border-gray-700 rounded-lg shadow-2xl z-50 flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold">Gumming4U Assistant</h3>
                <p className="text-xs opacity-90">Online now</p>
              </div>
            </div>
            <Button
              onClick={() => setIsOpen(false)}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20 p-1"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-800">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.sender === "user"
                      ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white"
                      : "bg-gray-700 text-gray-100"
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {message.sender === "bot" && <Bot className="w-4 h-4 mt-0.5 text-emerald-400 flex-shrink-0" />}
                    {message.sender === "user" && <User className="w-4 h-4 mt-0.5 text-white flex-shrink-0" />}
                    <p className="text-sm leading-relaxed">{message.text}</p>
                  </div>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-700 text-gray-100 p-3 rounded-lg max-w-[80%]">
                  <div className="flex items-center space-x-2">
                    <Bot className="w-4 h-4 text-emerald-400" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-700 bg-gray-900 rounded-b-lg">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-4 py-2 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
