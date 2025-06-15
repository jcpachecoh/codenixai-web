import { MetadataRoute } from 'next';
import { locales } from '../../next-intl.config';

const BASE_URL = 'https://codenixai.com';
const pages = ['', 'about', 'contact', 'services'];

export default function sitemap(): MetadataRoute.Sitemap {
  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Add static pages for each locale
  for (const locale of locales) {
    for (const page of pages) {
      const path = page ? `/${page}` : '';
      const url = `/${locale}${path}`.replace('//', '/');
      
      sitemapEntries.push({
        url: `${BASE_URL}${url}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: page === '' ? 1 : 0.8,
        alternates: {
          languages: locales.reduce((acc, loc) => ({
            ...acc,
            [loc]: `${BASE_URL}/${loc}${path}`.replace('//', '/')
          }), {})
        }
      });
    }
  }

  // Add root URL which will redirect to default locale
  sitemapEntries.push({
    url: BASE_URL,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 1,
  });

  return sitemapEntries;
}
