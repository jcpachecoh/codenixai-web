import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from '../next-intl.config';

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always',
});

export const config = {
  // Skip static files and API routes
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\.svg|.*\.png|.*\.jpg|.*\.jpeg|.*\.gif).*)'],
};
