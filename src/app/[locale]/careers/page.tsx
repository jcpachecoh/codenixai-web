import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import CareersSection from '@/components/sections/CareersSection';

type PageParams = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const paramsObj = await params;
  const locale = paramsObj.locale;
  const t = await getTranslations({ locale, namespace: 'careers' });

  return {
    title: 'CodenixAI - ' + t('title'),
    description: t('subtitle'),
  };
}

export default async function CareersPage({ params }: PageParams) {
  await params;

  return (
    <div className="pt-24">
      <CareersSection />
    </div>
  );
}
