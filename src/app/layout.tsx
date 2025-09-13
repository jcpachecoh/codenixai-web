import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import GlobalStructuredData from '@/components/seo/GlobalStructuredData';

const roboto = Roboto({
  variable: '--font-roboto',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    template: '%s | CodenixAI',
    default: 'CodenixAI - AI-Powered Software Development & Automation Solutions',
  },
  description: 'CodenixAI specializes in AI automation, custom software development, chatbots, RPA, e-commerce solutions, cloud DevOps, data analytics, UI/UX design, and technical training. Transform your business with cutting-edge AI technology.',
  keywords: [
    'AI automation',
    'custom software development',
    'chatbots',
    'RPA',
    'robotic process automation',
    'e-commerce development',
    'cloud DevOps',
    'data analytics',
    'UI UX design',
    'technical training',
    'artificial intelligence',
    'machine learning',
    'web development',
    'mobile app development',
    'digital transformation',
    'business automation',
    'software consulting',
    'AI copilots',
    'WhatsApp bots',
    'enterprise solutions'
  ],
  authors: [{ name: 'CodenixAI Team' }],
  creator: 'CodenixAI',
  publisher: 'CodenixAI',
  applicationName: 'CodenixAI',
  generator: 'Next.js',
  referrer: 'origin-when-cross-origin',
  metadataBase: new URL('https://codenixai.com'),
  alternates: {
    canonical: 'https://codenixai.com',
    languages: {
      'en-US': 'https://codenixai.com/en',
      'es-ES': 'https://codenixai.com/es',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['es_ES'],
    url: 'https://codenixai.com',
    title: 'CodenixAI - AI-Powered Software Development & Automation Solutions',
    description: 'Transform your business with AI automation, custom software, chatbots, RPA, and cutting-edge technology solutions. Expert development team specializing in digital transformation.',
    siteName: 'CodenixAI',
    images: [
      {
        url: '/logo.svg',
        width: 1200,
        height: 630,
        alt: 'CodenixAI - AI-Powered Software Development',
        type: 'image/svg+xml',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CodenixAI - AI-Powered Software Development & Automation',
    description: 'Transform your business with AI automation, custom software, chatbots, and cutting-edge technology solutions.',
    creator: '@codenixai',
    images: ['/logo.svg'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code', // Replace with actual verification code
    yandex: 'yandex-verification-code', // Replace with actual verification code
    other: {
      'msvalidate.01': 'bing-verification-code', // Replace with actual verification code
    },
  },
  category: 'technology',
  classification: 'AI Software Development, Business Automation, Digital Transformation',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#01A9FA" />
        <meta name="color-scheme" content="dark light" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <Analytics />
        <SpeedInsights />
      </head>
      <body className={`${roboto.variable} font-roboto antialiased`}>
        <GlobalStructuredData />
        {children}
      </body>
    </html>
  );
}
