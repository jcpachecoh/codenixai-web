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
  const t = await getTranslations({ locale, namespace: 'services.trainingWorkshops' });

  return {
    title: `${t('title')} - CodenixAI`,
    description: t('subtitle'),
    keywords: 'training, workshops, team enablement, AI training, coding bootcamp, upskilling',
  };
}

export default async function TrainingWorkshopsPage({ params }: PageParams) {
  await params;
  
  const serviceData = {
    namespace: 'services.trainingWorkshops',
    slug: 'training-workshops',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
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