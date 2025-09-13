export default function GlobalStructuredData() {
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "CodenixAI",
    "alternateName": ["Codenix AI", "Codenix"],
    "url": "https://codenixai.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://codenixai.com/logo.svg",
      "width": "400",
      "height": "400"
    },
    "description": "CodenixAI is a leading AI-powered software development company specializing in automation, custom software solutions, and digital transformation services.",
    "foundingDate": "2024",
    "industry": "Software Development",
    "numberOfEmployees": "10-50",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Calle 97 70c-89",
      "addressLocality": "Bogotá",
      "addressRegion": "Cundinamarca",
      "postalCode": "110221",
      "addressCountry": "CO"
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+57-1-234-5678",
        "contactType": "Customer Service",
        "availableLanguage": ["English", "Spanish"],
        "areaServed": "Worldwide",
        "hoursAvailable": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "09:00",
          "closes": "18:00",
          "timeZone": "America/Bogota"
        }
      }
    ],
    "sameAs": [
      "https://github.com/codenixai",
      "https://linkedin.com/company/codenixai",
      "https://twitter.com/codenixai"
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
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "AI Automation & Chatbots",
            "description": "Intelligent chatbots, AI copilots, and automated workflows for web and WhatsApp platforms",
            "provider": {
              "@type": "Organization",
              "name": "CodenixAI"
            },
            "areaServed": "Worldwide"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Custom Software Development",
            "description": "Scalable web applications, mobile apps, and enterprise software solutions",
            "provider": {
              "@type": "Organization", 
              "name": "CodenixAI"
            },
            "areaServed": "Worldwide"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "E-commerce & Marketplace Development",
            "description": "Online stores, marketplace platforms, and payment integration solutions",
            "provider": {
              "@type": "Organization",
              "name": "CodenixAI"
            },
            "areaServed": "Worldwide"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Cloud & DevOps Services",
            "description": "AWS/Azure deployment, CI/CD pipelines, and infrastructure automation",
            "provider": {
              "@type": "Organization",
              "name": "CodenixAI"
            },
            "areaServed": "Worldwide"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Data Analytics & Business Intelligence",
            "description": "Data visualization, machine learning models, and business intelligence solutions",
            "provider": {
              "@type": "Organization",
              "name": "CodenixAI"
            },
            "areaServed": "Worldwide"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "UI/UX Design & Branding",
            "description": "User experience design, interface development, and brand identity creation",
            "provider": {
              "@type": "Organization",
              "name": "CodenixAI"
            },
            "areaServed": "Worldwide"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Technical Training & Workshops",
            "description": "AI/ML training, software development workshops, and team skill development",
            "provider": {
              "@type": "Organization",
              "name": "CodenixAI"
            },
            "areaServed": "Worldwide"
          }
        }
      ]
    },
    "knowsAbout": [
      "Artificial Intelligence",
      "Machine Learning",
      "Software Development",
      "Process Automation",
      "Cloud Computing",
      "Web Development",
      "Mobile App Development",
      "Data Analytics",
      "User Experience Design",
      "DevOps",
      "E-commerce",
      "Digital Transformation"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "50",
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "CodenixAI",
    "alternateName": "Codenix AI",
    "url": "https://codenixai.com",
    "description": "AI-powered software development and automation solutions",
    "inLanguage": ["en", "es"],
    "isAccessibleForFree": true,
    "publisher": {
      "@type": "Organization",
      "name": "CodenixAI"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://codenixai.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteData) }}
      />
    </>
  );
}