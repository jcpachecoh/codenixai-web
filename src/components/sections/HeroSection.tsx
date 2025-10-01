'use client';
import { Variants } from 'framer-motion';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function HeroSection() {
  const t = useTranslations('hero');
  const pathname = usePathname();
  const locale = pathname.split('/')[1];

  // Optimized animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 15, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
  };

  const ctaVariants: Variants = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.3, ease: 'easeOut' },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden performance-optimized">
      {/* Modern Background with brand colors */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900">
        {/* Optimized gradient blobs */}
        <motion.div
          className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-30 blur-3xl will-change-transform"
          style={{
            background: 'radial-gradient(circle, #01A9FA 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.4, 0.3],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        <motion.div
          className="absolute top-1/3 -left-40 w-96 h-96 rounded-full opacity-25 blur-3xl will-change-transform"
          style={{
            background: 'radial-gradient(circle, #4E3BE7 0%, transparent 70%)',
          }}
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.25, 0.35, 0.25],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'linear',
            delay: 4,
          }}
        />
        <motion.div
          className="absolute bottom-20 right-1/4 w-80 h-80 rounded-full opacity-20 blur-3xl will-change-transform"
          style={{
            background: 'radial-gradient(circle, #F81EBD 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'linear',
            delay: 8,
          }}
        />
      </div>

      {/* Animated geometric shapes - reduced for performance */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full will-change-transform"
            style={{
              background: i % 3 === 0 ? '#01A9FA' : i % 3 === 1 ? '#4E3BE7' : '#F81EBD',
              top: `${20 + i * 15}%`,
              left: `${10 + i * 18}%`,
            }}
            animate={{
              y: [0, 20],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: 'linear',
              delay: i * 1.5,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          {/* Hero content */}
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="max-w-4xl mx-auto">
            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight"
            >
              <span className="block text-white mb-2">Build faster with</span>
              <span className="block gradient-text">
                {t('title').split('Build faster with ')[1] || 'AI-powered software'}
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              {t('subtitle')}
            </motion.p>

            {/* Strong CTAs */}
            <motion.div
              variants={ctaVariants}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href={`/${locale}/contact`}
                  className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-primary-blue via-primary-purple to-primary-pink rounded-full shadow-2xl hover:shadow-primary-blue/25 transition-all duration-300"
                >
                  <span>{t('ctaPrimary')}</span>
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href={`/${locale}/services`}
                  className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white border-2 border-primary-blue/50 rounded-full hover:bg-primary-blue/10 hover:border-primary-blue transition-all duration-300"
                >
                  <span>{t('ctaSecondary')}</span>
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </Link>
              </motion.div>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center gap-8 text-gray-400 text-base"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary-blue rounded-full"></div>
                <span>24/7 Support</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary-purple rounded-full"></div>
                <span>Enterprise Ready</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary-pink rounded-full"></div>
                <span>Scalable Solutions</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{
          y: [0, 10, 0],
          transition: {
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          },
        }}
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <motion.div
            className="w-1 h-3 bg-white/60 rounded-full mt-2"
            animate={{
              y: [0, 6, 0],
              transition: {
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              },
            }}
          />
        </div>
      </motion.div>
    </section>
  );
}
