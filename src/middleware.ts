import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from '../next-intl.config';
import { NextRequest } from 'next/server';

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always',
});

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Skip middleware for sitemap.xml
  if (pathname.endsWith('/sitemap.xml')) {
    return;
  }
  
  return intlMiddleware(request);
}

export const config = {
  // Skip static files, API routes, and sitemap.xml
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap\.xml|.*\.svg|.*\.png|.*\.jpg|.*\.jpeg|.*\.gif).*)',
  ],
};
