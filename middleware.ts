import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './next-intl.config';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware({
  locales: ['en', 'es'], // Match next-intl.config.js
  defaultLocale: 'en',
});

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for static files and API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/_vercel') ||
    pathname.includes('.') ||
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml' ||
    pathname === '/favicon.ico' ||
    pathname.endsWith('.svg') ||
    pathname.endsWith('.png') ||
    pathname.endsWith('.jpg') ||
    pathname.endsWith('.jpeg') ||
    pathname.endsWith('.gif') ||
    pathname.endsWith('.ico') ||
    pathname.endsWith('.webp') ||
    pathname.endsWith('.css') ||
    pathname.endsWith('.js') ||
    pathname.endsWith('.json') ||
    pathname.match(/\.(svg|png|jpg|jpeg|gif|ico|webp|css|js|json|woff|woff2|ttf|eot)$/i)
  ) {
    return NextResponse.next();
  }

  // Additional check: if pathname contains any file extension, skip
  if (/\.[a-zA-Z0-9]+$/.test(pathname)) {
    return NextResponse.next();
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    // Enable a redirect to a matching locale at the root
    '/',

    // Set a cookie to remember the previous locale for
    // all requests that have a locale prefix
    '/(en|es)/:path*',

    // Enable redirects that add missing locales
    // Exclude static files, API routes, and Next.js internals
    '/((?!_next|_vercel|api|robots\\.txt|sitemap\\.xml|favicon\\.ico|.*\\.).*)$',
  ], // Must include supported locales
};
