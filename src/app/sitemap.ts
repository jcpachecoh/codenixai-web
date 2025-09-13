import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://codenixai.com';
  const locales = ['en', 'es'];
  
  // Main pages
  const mainPages = [
    '',
    '/about',
    '/blog',
    '/contact',
    '/services',
  ];

  // Service pages
  const servicePages = [
    '/services/ai-automation',
    '/services/custom-software',
    '/services/ecommerce-marketplaces',
    '/services/cloud-devops',
    '/services/data-analytics',
    '/services/ui-ux-branding',
    '/services/training-workshops',
  ];

  // Blog posts
  const blogPosts = [
    '/blog/future-of-ai-software-development',
    '/blog/building-intelligent-chatbots',
    '/blog/rpa-business-automation',
    '/blog/ai-powered-web-development',
    '/blog/machine-learning-business-applications',
    '/blog/cloud-native-ai-deployment',
  ];

  const sitemap: MetadataRoute.Sitemap = [];

  // Add home page (no locale prefix)
  sitemap.push({
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 1,
  });

  // Add localized main pages
  locales.forEach(locale => {
    mainPages.forEach(page => {
      sitemap.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === '' ? 'daily' : 'monthly',
        priority: page === '' ? 0.9 : 0.8,
      });
    });
  });

  // Add localized service pages
  locales.forEach(locale => {
    servicePages.forEach(servicePage => {
      sitemap.push({
        url: `${baseUrl}/${locale}${servicePage}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    });
  });

  // Add localized blog posts
  locales.forEach(locale => {
    blogPosts.forEach(blogPost => {
      sitemap.push({
        url: `${baseUrl}/${locale}${blogPost}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.6,
      });
    });
  });

  return sitemap;
}
