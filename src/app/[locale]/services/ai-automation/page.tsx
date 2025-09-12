import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import ServiceHero from '@/components/services/ServiceHero';
import ServiceFeatures from '@/components/services/ServiceFeatures';
import ServiceOutcomes from '@/components/services/ServiceOutcomes';
import ServiceProcess from '@/components/services/ServiceProcess';
import ServiceCTA from '@/components/services/ServiceCTA';
import ServiceStructuredData from '@/components/seo/ServiceStructuredData';

type PageParams = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const paramsObj = await params;
  const locale = paramsObj.locale;
  const t = await getTranslations({ locale, namespace: 'services.aiAutomation' });

  return {
    title: `${t('title')} - CodenixAI`,
    description: t('subtitle'),
    keywords: 'AI automation, chatbots, process automation, RPA, artificial intelligence',
    openGraph: {
      title: `${t('title')} - CodenixAI`,
      description: t('subtitle'),
      url: `https://codenixai.com/${locale}/services/ai-automation`,
      siteName: 'CodenixAI',
      images: [
        {
          url: 'https://codenixai.com/og-ai-automation.jpg',
          width: 1200,
          height: 630,
          alt: t('title'),
        },
      ],
      locale: locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${t('title')} - CodenixAI`,
      description: t('subtitle'),
      images: ['https://codenixai.com/og-ai-automation.jpg'],
    },
    alternates: {
      canonical: `https://codenixai.com/${locale}/services/ai-automation`,
      languages: {
        'en': 'https://codenixai.com/en/services/ai-automation',
        'es': 'https://codenixai.com/es/services/ai-automation',
      },
    },
  };
}

export default async function AIAutomationPage({ params }: PageParams) {
  const paramsObj = await params;
  const locale = paramsObj.locale;
  const t = await getTranslations({ locale, namespace: 'services.aiAutomation' });
  
  const serviceData = {
    namespace: 'services.aiAutomation',
    slug: 'ai-automation',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    )
  };

  return (
    <div className="bg-black min-h-screen">
      <ServiceStructuredData
        serviceName={t('title')}
        serviceDescription={t('subtitle')}
        slug="ai-automation"
        locale={locale}
      />
      <ServiceHero serviceData={serviceData} />
      <ServiceFeatures serviceData={serviceData} />
      <ServiceOutcomes serviceData={serviceData} />
      <ServiceProcess serviceData={serviceData} />
      <ServiceCTA serviceData={serviceData} />
    </div>
  );
}