import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import ServicesSection from '@/components/sections/ServicesSection';
import FeaturesSection from '@/components/sections/FeaturesSection';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'services' });

  return {
    title: 'CodenixAI - ' + t('title'),
    description: t('description'),
  };
}

export default function ServicesPage() {
  return (
    <div className="pt-24">
      <ServicesSection />
      <FeaturesSection />
    </div>
  );
}
