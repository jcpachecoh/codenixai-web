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
  const t = await getTranslations({ locale, namespace: 'services.cloudDevops' });

  return {
    title: `${t('title')} - CodenixAI`,
    description: t('subtitle'),
    keywords: 'cloud computing, DevOps, AWS, GCP, Azure, CI/CD, infrastructure',
  };
}

export default async function CloudDevopsPage({ params }: PageParams) {
  await params;
  
  const serviceData = {
    namespace: 'services.cloudDevops',
    slug: 'cloud-devops',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
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