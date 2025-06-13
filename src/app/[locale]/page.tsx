import { getTranslations } from 'next-intl/server';

import { Metadata } from 'next';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import ServicesSection from '@/components/sections/ServicesSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import ContactSection from '@/components/sections/ContactSection';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  // In Next.js App Router, we need to await params in metadata functions
  const { locale } = await Promise.resolve(params);
  const t = await getTranslations({ locale, namespace: 'hero' });

  return {
    title: 'CodenixAI - ' + t('title'),
    description: t('subtitle'),
  };
}

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <FeaturesSection />
      <ContactSection />
    </>
  );
}
