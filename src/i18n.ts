import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales, defaultLocale } from '../next-intl.config';

export default getRequestConfig(async ({ locale }) => {
  // Ensure locale is a valid string
  const resolvedLocale: string = typeof locale === 'string' && locales.includes(locale) ? locale : defaultLocale;

  // Validate that the incoming locale is valid or redirect
  if (locale && !locales.includes(locale as unknown as string)) notFound();

  return {
    locale: resolvedLocale, // Guaranteed to be a string
    messages: (await import(`../src/locales/${resolvedLocale}.json`)).default,
  };
});
