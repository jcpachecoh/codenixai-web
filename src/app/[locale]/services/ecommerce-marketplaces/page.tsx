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
  const t = await getTranslations({ locale, namespace: 'services.ecommerceMarketplaces' });

  return {
    title: `${t('title')} - CodenixAI`,
    description: t('subtitle'),
    keywords: 'ecommerce, marketplace, online store, payment integration, Shopify',
  };
}

export default async function EcommerceMarketplacesPage({ params }: PageParams) {
  await params;
  
  const serviceData = {
    namespace: 'services.ecommerceMarketplaces',
    slug: 'ecommerce-marketplaces',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17M17 13v4a2 2 0 01-2 2H9a2 2 0 01-2-2v-4m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
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