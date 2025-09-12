interface ServiceStructuredDataProps {
  serviceName: string;
  serviceDescription: string;
  slug: string;
  locale: string;
}

export default function ServiceStructuredData({ 
  serviceName, 
  serviceDescription, 
  slug, 
  locale 
}: ServiceStructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": serviceName,
    "description": serviceDescription,
    "provider": {
      "@type": "Organization",
      "name": "CodenixAI",
      "url": `https://codenixai.com/${locale}`,
      "logo": "https://codenixai.com/logo-codenix.svg",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+57-1-234-5678",
        "contactType": "Customer Service",
        "availableLanguage": ["en", "es"]
      }
    },
    "serviceType": serviceName,
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "priceRange": "Contact for pricing"
    },
    "areaServed": {
      "@type": "Country",
      "name": ["Colombia", "United States", "Global"]
    },
    "url": `https://codenixai.com/${locale}/services/${slug}`,
    "potentialAction": {
      "@type": "ContactAction",
      "target": `https://codenixai.com/${locale}/contact`
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}