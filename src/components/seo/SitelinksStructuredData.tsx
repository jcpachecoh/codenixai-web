interface SitelinksStructuredDataProps {
  locale: string;
}

export default function SitelinksStructuredData({ locale }: SitelinksStructuredDataProps) {
  const baseUrl = 'https://codenixai.com';
  
  const sitelinksData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "CodenixAI",
    "alternateName": "Codenix AI",
    "url": `${baseUrl}/${locale}`,
    "description": "AI-powered software development and automation solutions",
    "inLanguage": locale,
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${baseUrl}/${locale}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    },
    "mainEntity": {
      "@type": "Organization",
      "name": "CodenixAI",
      "url": `${baseUrl}/${locale}`,
      "sameAs": [
        "https://github.com/codenixai",
        "https://linkedin.com/company/codenixai",
        "https://twitter.com/codenixai",
        "https://instagram.com/codenixai"
      ]
    },
    "hasPart": [
      {
        "@type": "WebPage",
        "name": locale === 'en' ? "AI & Automation Services" : "Servicios de IA y Automatización",
        "url": `${baseUrl}/${locale}/services/ai-automation`,
        "description": locale === 'en' 
          ? "AI chatbots, automation workflows, and intelligent process optimization"
          : "Chatbots de IA, flujos de automatización y optimización inteligente de procesos",
        "isPartOf": {
          "@type": "WebSite",
          "url": `${baseUrl}/${locale}`
        }
      },
      {
        "@type": "WebPage", 
        "name": locale === 'en' ? "Custom Software Development" : "Desarrollo de Software a Medida",
        "url": `${baseUrl}/${locale}/services/custom-software`,
        "description": locale === 'en'
          ? "Scalable web applications, mobile apps, and enterprise solutions"
          : "Aplicaciones web escalables, apps móviles y soluciones empresariales",
        "isPartOf": {
          "@type": "WebSite",
          "url": `${baseUrl}/${locale}`
        }
      },
      {
        "@type": "WebPage",
        "name": locale === 'en' ? "E-commerce & Marketplaces" : "E-commerce y Marketplaces", 
        "url": `${baseUrl}/${locale}/services/ecommerce-marketplaces`,
        "description": locale === 'en'
          ? "Online stores, marketplace platforms, and payment integration"
          : "Tiendas online, plataformas de marketplace e integración de pagos",
        "isPartOf": {
          "@type": "WebSite",
          "url": `${baseUrl}/${locale}`
        }
      },
      {
        "@type": "WebPage",
        "name": locale === 'en' ? "Cloud & DevOps" : "Cloud y DevOps",
        "url": `${baseUrl}/${locale}/services/cloud-devops`, 
        "description": locale === 'en'
          ? "AWS/Azure deployment, CI/CD pipelines, and infrastructure automation"
          : "Despliegue AWS/Azure, pipelines CI/CD y automatización de infraestructura",
        "isPartOf": {
          "@type": "WebSite",
          "url": `${baseUrl}/${locale}`
        }
      },
      {
        "@type": "WebPage",
        "name": locale === 'en' ? "Data Analytics" : "Analítica de Datos",
        "url": `${baseUrl}/${locale}/services/data-analytics`,
        "description": locale === 'en'
          ? "Business intelligence, data visualization, and machine learning models"
          : "Inteligencia de negocios, visualización de datos y modelos de machine learning",
        "isPartOf": {
          "@type": "WebSite",
          "url": `${baseUrl}/${locale}`
        }
      },
      {
        "@type": "WebPage",
        "name": locale === 'en' ? "About Us" : "Sobre Nosotros",
        "url": `${baseUrl}/${locale}/about`,
        "description": locale === 'en'
          ? "Learn about CodenixAI's mission, vision, and expert team"
          : "Conoce la misión, visión y equipo experto de CodenixAI",
        "isPartOf": {
          "@type": "WebSite",
          "url": `${baseUrl}/${locale}`
        }
      },
      {
        "@type": "WebPage",
        "name": locale === 'en' ? "Book a Call" : "Reserva una Llamada",
        "url": `${baseUrl}/${locale}/contact`,
        "description": locale === 'en'
          ? "Get in touch with our team for your next project"
          : "Ponte en contacto con nuestro equipo para tu próximo proyecto",
        "isPartOf": {
          "@type": "WebSite",
          "url": `${baseUrl}/${locale}`
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(sitelinksData) }}
    />
  );
}