import { getTranslations } from 'next-intl/server';

import { Metadata } from 'next';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import ServicesSection from '@/components/sections/ServicesSection';
import PortfolioCarousel from '@/components/sections/PortfolioCarousel';
import FeaturesSection from '@/components/sections/FeaturesSection';
import ContactSection from '@/components/sections/ContactSection';
import OrganizationStructuredData from '@/components/seo/OrganizationStructuredData';
import SitelinksStructuredData from '@/components/seo/SitelinksStructuredData';

type PageParams = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  // First await the entire params object before accessing its properties
  const paramsObj = await params;
  const locale = paramsObj.locale;
  const t = await getTranslations({ locale, namespace: 'hero' });

  const title = 'CodenixAI - ' + t('title');
  const description = t('subtitle');
  const url = `https://codenixai.com/${locale}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    keywords: 'AI automation, custom software, chatbots, RPA, web development, digital transformation, machine learning, artificial intelligence',
    authors: [{ name: 'CodenixAI Team' }],
    openGraph: {
      type: 'website',
      locale: locale,
      url: url,
      title: title,
      description: description,
      siteName: 'CodenixAI',
      images: [
        {
          url: 'https://codenixai.com/logo.svg',
          width: 800,
          height: 600,
          alt: 'CodenixAI Logo',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      images: ['https://codenixai.com/logo.svg'],
      creator: '@codenixai',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function Home({ params }: PageParams) {
  // Await params to satisfy the Promise constraint
  const paramsObj = await params;
  const locale = paramsObj.locale;
  
  return (
    <>
      <OrganizationStructuredData locale={locale} />
      <SitelinksStructuredData locale={locale} />
      <HeroSection />
      <PortfolioCarousel />
      <AboutSection />
      <ServicesSection />
      <FeaturesSection />
      <ContactSection />
    </>
  );
}
