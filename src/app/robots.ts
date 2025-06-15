// app/robots.ts
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://codenixai.com';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Uncomment to disallow specific paths
      // disallow: ['/admin/', '/private/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
    // Optional: Add crawl delay
    // crawlDelay: 1,
  };
}
