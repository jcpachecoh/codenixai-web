import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import AboutSection from '@/components/sections/AboutSection';

type PageParams = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  // First await the entire params object before accessing its properties
  const paramsObj = await params;
  const locale = paramsObj.locale;
  const t = await getTranslations({ locale, namespace: 'about' });

  return {
    title: 'CodenixAI - ' + t('title'),
    description: t('description'),
  };
}

export default async function AboutPage({ params }: PageParams) {
  // Await params to satisfy the Promise constraint
  await params;
  
  return (
    <div className="pt-24">
      <AboutSection />
    </div>
  );
}
