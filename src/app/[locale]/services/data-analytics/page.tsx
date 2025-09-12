import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import ServiceHero from '@/components/services/ServiceHero';
import ServiceFeatures from '@/components/services/ServiceFeatures';
import ServiceOutcomes from '@/components/services/ServiceOutcomes';
import ServiceProcess from '@/components/services/ServiceProcess';
import ServiceCTA from '@/components/services/ServiceCTA';

type PageParams = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const paramsObj = await params;
  const locale = paramsObj.locale;
  const t = await getTranslations({ locale, namespace: 'services.dataAnalytics' });

  return {
    title: `${t('title')} - CodenixAI`,
    description: t('subtitle'),
    keywords: 'data analytics, business intelligence, data pipelines, machine learning, dashboards',
  };
}

export default async function DataAnalyticsPage({ params }: PageParams) {
  await params;
  
  const serviceData = {
    namespace: 'services.dataAnalytics',
    slug: 'data-analytics',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    )
  };

  return (
    <div className="bg-black min-h-screen">
      <ServiceHero serviceData={serviceData} />
      <ServiceFeatures serviceData={serviceData} />
      <ServiceOutcomes serviceData={serviceData} />
      <ServiceProcess serviceData={serviceData} />
      <ServiceCTA serviceData={serviceData} />
    </div>
  );
}