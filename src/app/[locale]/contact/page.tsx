import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import ContactSection from '@/components/sections/ContactSection';

type PageParams = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  // First await the entire params object before accessing its properties
  const paramsObj = await params;
  const locale = paramsObj.locale;
  const t = await getTranslations({ locale, namespace: 'contact' });

  return {
    title: 'CodenixAI - ' + t('title'),
    description: t('subtitle'),
  };
}

export default async function ContactPage({ params }: PageParams) {
  // Await params to satisfy the Promise constraint
  await params;
  
  return (
    <div className="pt-24">
      <ContactSection />
    </div>
  );
}
