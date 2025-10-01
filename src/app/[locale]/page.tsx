import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import HeroSection from '@/components/sections/HeroSection';
import OrganizationStructuredData from '@/components/seo/OrganizationStructuredData';
import SitelinksStructuredData from '@/components/seo/SitelinksStructuredData';

// Lazy load non-critical sections for better performance
const AboutSection = dynamic(() => import('@/components/sections/AboutSection'), {
  loading: () => (
    <div className="min-h-[400px] flex items-center justify-center">
      <div className="animate-pulse text-gray-400">Loading...</div>
    </div>
  ),
});

const ServicesSection = dynamic(() => import('@/components/sections/ServicesSection'), {
  loading: () => (
    <div className="min-h-[500px] flex items-center justify-center">
      <div className="animate-pulse text-gray-400">Loading...</div>
    </div>
  ),
});

const PortfolioCarousel = dynamic(() => import('@/components/sections/PortfolioCarousel'), {
  loading: () => (
    <div className="min-h-[400px] flex items-center justify-center">
      <div className="animate-pulse text-gray-400">Loading...</div>
    </div>
  ),
});

const FeaturesSection = dynamic(() => import('@/components/sections/FeaturesSection'), {
  loading: () => (
    <div className="min-h-[600px] flex items-center justify-center">
      <div className="animate-pulse text-gray-400">Loading...</div>
    </div>
  ),
});

const ContactSection = dynamic(() => import('@/components/sections/ContactSection'), {
  loading: () => (
    <div className="min-h-[500px] flex items-center justify-center">
      <div className="animate-pulse text-gray-400">Loading...</div>
    </div>
  ),
});

type PageParams = {
  params: Promise<{ locale: string }>;
};

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
    keywords:
      'AI automation, custom software, chatbots, RPA, web development, digital transformation, machine learning, artificial intelligence',
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
