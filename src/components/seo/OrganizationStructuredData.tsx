interface OrganizationStructuredDataProps {
  locale: string;
}

export default function OrganizationStructuredData({ locale }: OrganizationStructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "CodenixAI",
    "alternateName": "Codenix AI",
    "url": `https://codenixai.com/${locale}`,
    "logo": "https://codenixai.com/logo-codenix.svg",
    "description": "AI-powered software development company specializing in automation, custom software, and digital transformation solutions.",
    "foundingDate": "2024",
    "founder": {
      "@type": "Person",
      "name": "CodenixAI Team"
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+57-1-234-5678",
        "contactType": "Customer Service",
        "availableLanguage": ["en", "es"],
        "areaServed": "Worldwide"
      }
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Calle 97 70c-89",
      "addressLocality": "Bogotá",
      "addressCountry": "Colombia"
    },
    "sameAs": [
      "https://github.com/codenixai",
      "https://linkedin.com/company/codenixai",
      "https://twitter.com/codenixai"
    ],
    "knowsAbout": [
      "Artificial Intelligence",
      "Machine Learning",
      "Software Development",
      "Process Automation",
      "Cloud Computing",
      "Web Development"
    ],
    "serviceArea": {
      "@type": "Place",
      "name": "Worldwide"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "AI Software Development Services",
      "itemListElement": [
        {
          "@type": "OfferCatalog",
          "name": "AI & Automation",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "AI Chatbots & Copilots",
                "description": "Intelligent conversational interfaces for web and WhatsApp"
              }
            },
            {
              "@type": "Offer", 
              "itemOffered": {
                "@type": "Service",
                "name": "Process Automation & RPA",
                "description": "Automated workflows and robotic process automation"
              }
            }
          ]
        },
        {
          "@type": "OfferCatalog",
          "name": "Custom Software Development",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service", 
                "name": "Web Applications",
                "description": "Scalable web applications built with modern technologies"
              }
            }
          ]
        }
      ]
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}