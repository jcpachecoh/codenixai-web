interface BreadcrumbStructuredDataProps {
  locale: string;
  currentPage?: string;
  currentPageTitle?: string;
}

export default function BreadcrumbStructuredData({ 
  locale, 
  currentPage = '',
  currentPageTitle = ''
}: BreadcrumbStructuredDataProps) {
  const baseUrl = 'https://codenixai.com';
  
  // Build breadcrumb list based on current page
  const breadcrumbItems: Array<{
    "@type": string;
    position: number;
    name: string;
    item: string;
  }> = [
    {
      "@type": "ListItem",
      "position": 1,
      "name": locale === 'en' ? "Home" : "Inicio",
      "item": `${baseUrl}/${locale}`
    }
  ];

  // Add breadcrumb items based on current page
  if (currentPage.includes('/services')) {
    breadcrumbItems.push({
      "@type": "ListItem",
      "position": 2,
      "name": locale === 'en' ? "Services" : "Servicios",
      "item": `${baseUrl}/${locale}/services`
    });

    // If it's a specific service page
    if (currentPage !== '/services' && currentPageTitle) {
      breadcrumbItems.push({
        "@type": "ListItem",
        "position": 3,
        "name": currentPageTitle,
        "item": `${baseUrl}/${locale}${currentPage}`
      });
    }
  } else if (currentPage === '/about') {
    breadcrumbItems.push({
      "@type": "ListItem",
      "position": 2,
      "name": locale === 'en' ? "About" : "Sobre Nosotros",
      "item": `${baseUrl}/${locale}/about`
    });
  } else if (currentPage === '/contact') {
    breadcrumbItems.push({
      "@type": "ListItem",
      "position": 2,
      "name": locale === 'en' ? "Contact" : "Contacto",
      "item": `${baseUrl}/${locale}/contact`
    });
  }

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbItems
  };

  // Also add navigation menu structure for sitelinks
  const navigationData = {
    "@context": "https://schema.org",
    "@type": "SiteNavigationElement",
    "name": locale === 'en' ? "Main Navigation" : "Navegación Principal",
    "url": `${baseUrl}/${locale}`,
    "hasPart": [
      {
        "@type": "SiteNavigationElement",
        "name": locale === 'en' ? "Services" : "Servicios",
        "url": `${baseUrl}/${locale}/services`,
        "description": locale === 'en' 
          ? "AI automation, custom software, and digital transformation services"
          : "Automatización IA, software personalizado y servicios de transformación digital"
      },
      {
        "@type": "SiteNavigationElement", 
        "name": locale === 'en' ? "About" : "Sobre Nosotros",
        "url": `${baseUrl}/${locale}/about`,
        "description": locale === 'en'
          ? "Learn about our company, mission, and expert team"
          : "Conoce nuestra empresa, misión y equipo experto"
      },
      {
        "@type": "SiteNavigationElement",
        "name": locale === 'en' ? "Contact" : "Contacto", 
        "url": `${baseUrl}/${locale}/contact`,
        "description": locale === 'en'
          ? "Get in touch for your next project consultation"
          : "Ponte en contacto para la consulta de tu próximo proyecto"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(navigationData) }}
      />
    </>
  );
}