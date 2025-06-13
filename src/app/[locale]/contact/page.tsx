import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import ContactSection from '@/components/sections/ContactSection';

export async function generateMetadata({
  params
}: {
  params: { locale: string };
}): Promise<Metadata> {
  // First await the entire params object before accessing its properties
  const { locale } = await Promise.resolve(params);
  const t = await getTranslations({ locale, namespace: 'contact' });

  return {
    title: 'CodenixAI - ' + t('title'),
    description: t('subtitle'),
  };
}

export default function ContactPage() {
  return (
    <div className="pt-24">
      <ContactSection />
    </div>
  );
}
