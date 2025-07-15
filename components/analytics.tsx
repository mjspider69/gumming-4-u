"use client"

import { useEffect } from "react"

declare global {
  interface Window {
    gtag: (...args: any[]) => void
    dataLayer: any[]
  }
}

export function Analytics() {
  useEffect(() => {
    // Google Analytics 4
    const GA_MEASUREMENT_ID = "G-XXXXXXXXXX" // Replace with your actual GA4 ID

    // Load Google Analytics
    const script1 = document.createElement("script")
    script1.async = true
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
    document.head.appendChild(script1)

    const script2 = document.createElement("script")
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GA_MEASUREMENT_ID}', {
        page_title: document.title,
        page_location: window.location.href,
      });
    `
    document.head.appendChild(script2)

    // Facebook Pixel (optional)
    const fbPixelId = "XXXXXXXXXX" // Replace with your Facebook Pixel ID
    const fbScript = document.createElement("script")
    fbScript.innerHTML = `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '${fbPixelId}');
      fbq('track', 'PageView');
    `
    document.head.appendChild(fbScript)

    return () => {
      // Cleanup scripts on unmount
      document.head.removeChild(script1)
      document.head.removeChild(script2)
      document.head.removeChild(fbScript)
    }
  }, [])

  return null
}

// Event tracking functions
export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, parameters)
  }
}

export const trackContactFormSubmit = () => {
  trackEvent("contact_form_submit", {
    event_category: "engagement",
    event_label: "contact_form",
  })
}

export const trackNewsletterSignup = () => {
  trackEvent("newsletter_signup", {
    event_category: "engagement",
    event_label: "newsletter",
  })
}

export const trackServiceInquiry = (service: string) => {
  trackEvent("service_inquiry", {
    event_category: "engagement",
    event_label: service,
  })
}
