export function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Gumming4U",
    alternateName: "Gumming4U Digital Marketing Agency",
    url: "https://gumming4u.com",
    logo: "https://gumming4u.com/images/gumming4u-logo.png",
    description:
      "Chennai's fastest-growing digital marketing agency specializing in SEO, PPC, social media marketing, and web development services.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Chennai",
      addressRegion: "Tamil Nadu",
      addressCountry: "IN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-95510-77771",
      contactType: "customer service",
      email: "gumming4u@gmail.com",
      availableLanguage: ["English", "Tamil"],
    },
    founder: {
      "@type": "Person",
      name: "Aryaan Alam",
    },
    foundingDate: "2023",
    sameAs: [
      "https://www.linkedin.com/company/gumming4u",
      "https://www.instagram.com/gumming4u",
      "https://twitter.com/gumming4u",
    ],
    serviceArea: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: "13.0827",
        longitude: "80.2707",
      },
      geoRadius: "50000",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Digital Marketing Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "SEO Services",
            description: "Search Engine Optimization to improve website rankings",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "PPC Advertising",
            description: "Pay-per-click advertising campaigns on Google and social media",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Social Media Marketing",
            description: "Strategic social media campaigns and management",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Web Development",
            description: "Custom website development and optimization",
          },
        },
      ],
    },
  }

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Gumming4U",
    image: "https://gumming4u.com/images/gumming4u-logo.png",
    telephone: "+91-95510-77771",
    email: "gumming4u@gmail.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Chennai",
      addressRegion: "Tamil Nadu",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "13.0827",
      longitude: "80.2707",
    },
    url: "https://gumming4u.com",
    openingHours: "Mo-Fr 09:00-18:00",
    priceRange: "$$",
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Gumming4U",
    url: "https://gumming4u.com",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://gumming4u.com/search?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
    </>
  )
}
