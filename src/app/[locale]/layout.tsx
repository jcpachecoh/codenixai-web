import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';

import '../globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300","400","500","600","700"],
  variable: "--font-roboto",
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'CodenixAI - Next-Gen AI Solutions',
  description: 'Transforming ideas into intelligent software with cutting-edge AI technology',
  keywords: 'AI, artificial intelligence, software development, machine learning, NLP',
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // First await the entire params object before accessing its properties
  const { locale } = await Promise.resolve(params);
  // Load messages for the current locale
  let messages;
  try {
    messages = (await import(`../../locales/${locale}.json`)).default;
  } catch (error) {
    console.error(`Could not load messages for locale: ${locale}`, error);
    // Fallback to empty messages object
    messages = {};
  }

  return (
    <html lang={locale}>
      <body className={`${roboto.variable} font-roboto antialiased`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
