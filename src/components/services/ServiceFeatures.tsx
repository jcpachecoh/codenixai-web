'use client';
import { motion, Variants } from 'framer-motion';
import { useTranslations } from 'next-intl';

interface ServiceData {
  namespace: string;
  slug: string;
  icon: React.ReactNode;
}

interface ServiceFeaturesProps {
  serviceData: ServiceData;
}

export default function ServiceFeatures({ serviceData }: ServiceFeaturesProps) {
  const t = useTranslations(serviceData.namespace);
  
  // Get features from translations
  const features = t.raw('features') as string[];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            What We <span className="gradient-text">Deliver</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Comprehensive solutions designed to transform your business operations
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
              className="group relative bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 hover:border-primary-blue/50 transition-all duration-300"
            >
              {/* Background glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary-blue/5 to-primary-purple/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative z-10">
                {/* Feature icon */}
                <div className="w-12 h-12 bg-gradient-to-r from-primary-blue to-primary-purple rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>

                {/* Feature text */}
                <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-primary-blue transition-colors duration-300">
                  {feature}
                </h3>

                {/* Feature description */}
                <p className="text-gray-400 leading-relaxed">
                  Advanced implementation with cutting-edge technology and best practices
                </p>

                {/* Decorative element */}
                <div className="absolute top-4 right-4 w-8 h-8 border border-primary-blue/20 rounded-lg rotate-45 group-hover:rotate-90 transition-transform duration-500" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-gray-300 mb-6">
            Ready to implement these powerful features in your business?
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-6 py-3 text-primary-blue border-2 border-primary-blue rounded-lg hover:bg-primary-blue hover:text-white transition-all duration-300"
          >
            <span>Explore Solutions</span>
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}