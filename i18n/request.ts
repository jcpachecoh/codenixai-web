import { getRequestConfig } from 'next-intl/server';
import type { GetRequestConfigParams } from 'next-intl/server';
import { defaultLocale, locales } from '../next-intl.config';

// Define the function with explicit return type
export default getRequestConfig(async ({ requestLocale }: GetRequestConfigParams) => {
  // Ensure we have a string locale, not a Promise
  let resolvedLocale: string;

  // If requestLocale is valid, use it; otherwise use default
  if (typeof requestLocale === 'string' && locales.includes(requestLocale)) {
    resolvedLocale = requestLocale;
  } else {
    resolvedLocale = defaultLocale;
  }

  // Load messages for the determined locale
  const messages = (await import(`../locales/${resolvedLocale}.json`)).default;

  // Return a plain object with string locale and messages
  return {
    locale: resolvedLocale, // This is guaranteed to be a string
    messages,
  };
});
