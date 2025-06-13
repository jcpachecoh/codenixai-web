import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import AboutSection from '@/components/sections/AboutSection';

export async function generateMetadata({
  params
}: {
  params: { locale: string };
}): Promise<Metadata> {
  // First await the entire params object before accessing its properties
  const { locale } = await Promise.resolve(params);
  const t = await getTranslations({ locale, namespace: 'about' });
  
  return {
    title: 'CodenixAI - ' + t('title'),
    description: t('description'),
  };
}

export default function AboutPage() {
  return (
    <div className="pt-24">
      <AboutSection />
    </div>
  );
}
