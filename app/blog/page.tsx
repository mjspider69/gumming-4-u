import type { Metadata } from "next"
import { Badge } from "@/components/ui/badge"
import Navigation from "@/components/navigation"
import CustomCursor from "@/components/custom-cursor"
import { Enhanced3DBackground } from "@/components/enhanced-3d-background"

export const metadata: Metadata = {
  title: "Digital Marketing Blog | Gumming4U - Latest SEO, PPC & Marketing Tips",
  description: "Stay updated with the latest digital marketing trends, SEO tips, PPC strategies, and social media insights from Chennai's leading marketing agency - Gumming4U.",
  keywords: ["digital marketing blog", "SEO tips", "PPC strategies", "social media marketing", "content marketing", "marketing trends"],
}

export default function Blog() {
  const blogPosts = [
    {
      title: "10 SEO Strategies That Actually Work in 2024",
      excerpt: "Discover the latest SEO techniques that are driving results for businesses in Chennai and beyond.",
      date: "January 15, 2024",
      category: "SEO",
      readTime: "5 min read"
    },
    {
      title: "How to Maximize Your PPC ROI: A Complete Guide",
      excerpt: "Learn proven strategies to optimize your Google Ads campaigns and increase your return on investment.",
      date: "January 10, 2024",
      category: "PPC",
      readTime: "8 min read"
    },
    {
      title: "Social Media Marketing Trends for Chennai Businesses",
      excerpt: "Explore the latest social media trends and how local businesses can leverage them for growth.",
      date: "January 5, 2024",
      category: "Social Media",
      readTime: "6 min read"
    }
  ]

  return (
    <div className="min-h-screen bg-black text-white" style={{ cursor: "none" }}>
      <Enhanced3DBackground />
      <CustomCursor />
      <Navigation />

      {/* Hero Section */}
      <section className="pt-20 pb-32 px-16 bg-black">
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="bg-white/20 text-white px-6 py-3 text-sm mb-8 rounded-full">
            Digital Marketing Insights
          </Badge>
          <h1 className="text-7xl font-black mb-12">MARKETING BLOG</h1>
          <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Stay ahead of the curve with our expert insights on digital marketing, SEO, PPC, and growth strategies.
          </p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-24 px-16 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {blogPosts.map((post, index) => (
              <div key={index} className="bg-black p-8 rounded-lg border border-gray-800 hover:border-white transition-colors duration-300">
                <div className="mb-4">
                  <span className="text-sm text-gray-400">{post.category}</span>
                  <span className="text-gray-600 mx-2">•</span>
                  <span className="text-sm text-gray-400">{post.readTime}</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 hover:text-gray-300 transition-colors">{post.title}</h3>
                <p className="text-gray-400 mb-6">{post.excerpt}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{post.date}</span>
                  <button className="text-white hover:text-gray-300 transition-colors">Read More →</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-16 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">Ready to Transform Your Business?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Get personalized digital marketing strategies that deliver results.
          </p>
          <button className="bg-white text-black px-12 py-4 rounded-full font-bold text-lg hover:bg-gray-200 transition-colors">
            Get Free Consultation
          </button>
        </div>
      </section>
    </div>
  )
}