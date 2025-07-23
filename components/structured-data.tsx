import Script from "next/script"

interface StructuredDataProps {
  type?: "Organization" | "WebSite" | "LocalBusiness" | "Article" | "Service"
  data?: any
}

export function StructuredData({ type = "Organization", data = {} }: StructuredDataProps) {
  const getStructuredData = () => {
    const baseData = {
      "@context": "https://schema.org",
      "@type": type,
    }

    switch (type) {
      case "Organization":
        return {
          ...baseData,
          name: "Gumming4U",
          alternateName: "Gumming4U Digital Marketing Agency",
          description: "Leading digital marketing agency in Chennai specializing in SEO, PPC, social media marketing, and web development",
          url: "https://gumming4u.com",
          logo: "https://gumming4u.com/images/gumming4u-logo.png",
          contactPoint: {
            "@type": "ContactPoint",
            telephone: "+91-95510-77771",
            contactType: "customer service",
            email: "gumming4u@gmail.com",
            availableLanguage: ["English", "Tamil", "Hindi"]
          },
          address: {
            "@type": "PostalAddress",
            addressLocality: "Chennai",
            addressRegion: "Tamil Nadu",
            addressCountry: "IN"
          },
          sameAs: [
            "https://instagram.com/gumming4u",
            "https://linkedin.com/company/gumming4u",
            "https://twitter.com/gumming4u"
          ],
          foundingDate: "2023",
          founder: {
            "@type": "Person",
            name: "Aryaan Alam"
          },
          numberOfEmployees: "10-20",
          ...data
        }

      case "LocalBusiness":
        return {
          ...baseData,
          "@type": "ProfessionalService",
          name: "Gumming4U",
          description: "Digital marketing agency in Chennai offering SEO, PPC, social media marketing, and web development services",
          url: "https://gumming4u.com",
          telephone: "+91-95510-77771",
          email: "gumming4u@gmail.com",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Chennai",
            addressRegion: "Tamil Nadu",
            addressCountry: "IN"
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: "13.0827",
            longitude: "80.2707"
          },
          openingHours: [
            "Mo-Fr 09:00-18:00",
            "Sa 10:00-14:00"
          ],
          priceRange: "$$",
          areaServed: {
            "@type": "State",
            name: "Tamil Nadu"
          },
          serviceArea: {
            "@type": "GeoCircle",
            geoMidpoint: {
              "@type": "GeoCoordinates",
              latitude: "13.0827",
              longitude: "80.2707"
            },
            geoRadius: "50"
          },
          ...data
        }

      case "WebSite":
        return {
          ...baseData,
          name: "Gumming4U",
          url: "https://gumming4u.com",
          description: "Digital marketing agency specializing in SEO, PPC, social media marketing, and web development",
          publisher: {
            "@type": "Organization",
            name: "Gumming4U"
          },
          potentialAction: {
            "@type": "SearchAction",
            target: "https://gumming4u.com/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
          },
          ...data
        }

      case "Service":
        return {
          ...baseData,
          name: data.name || "Digital Marketing Services",
          description: data.description || "Comprehensive digital marketing solutions",
          provider: {
            "@type": "Organization",
            name: "Gumming4U",
            url: "https://gumming4u.com"
          },
          areaServed: {
            "@type": "Country",
            name: "India"
          },
          serviceType: data.serviceType || "Digital Marketing",
          ...data
        }

      default:
        return { ...baseData, ...data }
    }
  }

  return (
    <Script
      id={`structured-data-${type.toLowerCase()}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(getStructuredData()),
      }}
    />
  )
}

// Multiple structured data types for the homepage
export function HomePageStructuredData() {
  return (
    <>
      <StructuredData type="Organization" />
      <StructuredData type="LocalBusiness" />
      <StructuredData type="WebSite" />
      <StructuredData 
        type="Service" 
        data={{
          name: "SEO Services Chennai",
          description: "Professional search engine optimization services to improve your website's visibility and ranking",
          serviceType: "Search Engine Optimization"
        }}
      />
      <StructuredData 
        type="Service" 
        data={{
          name: "PPC Advertising Chennai",
          description: "Pay-per-click advertising management for Google Ads, Facebook Ads, and other platforms",
          serviceType: "Pay Per Click Advertising"
        }}
      />
    </>
  )
}