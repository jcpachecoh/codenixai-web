'use client';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const t = useTranslations('footer');
  const pathname = usePathname();

  // Get the current locale from the pathname
  const locale = pathname.split('/')[1];

  // Social media links
  const socialLinks = [
    { href: 'https://twitter.com/codenixai', icon: 'twitter', label: 'Twitter' },
    { href: 'https://linkedin.com/company/codenixai', icon: 'linkedin', label: 'LinkedIn' },
    { href: 'https://github.com/codenixai', icon: 'github', label: 'GitHub' },
  ];

  return (
    <footer className="bg-dark-secondary py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <Link href={`/${locale}`} className="flex items-center mb-4">
              <span className="text-xl font-bold">
                <span className="gradient-text">Codenix</span>
                <span className="text-white">AI</span>
              </span>
            </Link>
            <p className="text-trust-gray-400 text-sm mb-4">
              Transforming ideas into intelligent software with cutting-edge AI technology
            </p>
            <div className="flex space-x-4">
              {socialLinks.map(link => (
                <a
                  key={link.icon}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="text-trust-gray-400 hover:text-accent-blue transition-colors duration-300"
                >
                  <SocialIcon type={link.icon} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href={`/${locale}`}
                  className="text-trust-gray-400 hover:text-accent-blue transition-colors duration-300 text-sm"
                >
                  {useTranslations('navigation')('home')}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/about`}
                  className="text-trust-gray-400 hover:text-accent-blue transition-colors duration-300 text-sm"
                >
                  {useTranslations('navigation')('about')}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/services`}
                  className="text-trust-gray-400 hover:text-accent-blue transition-colors duration-300 text-sm"
                >
                  {useTranslations('navigation')('services')}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/contact`}
                  className="text-trust-gray-400 hover:text-accent-blue transition-colors duration-300 text-sm"
                >
                  {useTranslations('navigation')('contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-medium mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-start space-x-2">
                <span className="text-accent-blue mt-1">
                  <EmailIcon />
                </span>
                <span className="text-trust-gray-400 text-sm">{useTranslations('contact')('email')}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-trust-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-trust-gray-500 text-sm mb-4 md:mb-0">{t('company')}</p>
          <div className="flex space-x-6">
            <Link
              href={`/${locale}/privacy`}
              className="text-trust-gray-500 hover:text-accent-blue transition-colors duration-300 text-sm"
            >
              {t('privacy')}
            </Link>
            <Link
              href={`/${locale}/terms`}
              className="text-trust-gray-500 hover:text-accent-blue transition-colors duration-300 text-sm"
            >
              {t('terms')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Icon components
function SocialIcon({ type }: { type: string }) {
  switch (type) {
    case 'twitter':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
          <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
        </svg>
      );
    case 'linkedin':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
          <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
        </svg>
      );
    case 'github':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
        </svg>
      );
    default:
      return null;
  }
}

function EmailIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
      <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
    </svg>
  );
}
