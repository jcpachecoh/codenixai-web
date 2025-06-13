'use client';
import { useTranslations } from 'next-intl';
import { motion, useInView, easeInOut } from 'framer-motion';
import { useRef } from 'react';

export default function AboutSection() {
  const t = useTranslations('about');
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: easeInOut },
    },
  };

  return (
    <section ref={sectionRef} id="about" className="section relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-0 w-1/3 h-1/3 bg-accent-purple/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-1/3 h-1/3 bg-accent-blue/10 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">{t('title')}</span>
          </h2>
          <p className="text-xl text-trust-gray-300">{t('subtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* About content */}
          <motion.div variants={containerVariants} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
            <motion.p variants={itemVariants} className="text-trust-gray-300 mb-6">
              {t('description')}
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <motion.div variants={itemVariants} className="glass p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-3 text-accent-blue">{t('vision_title')}</h3>
                <p className="text-trust-gray-400">{t('vision_description')}</p>
              </motion.div>

              <motion.div variants={itemVariants} className="glass p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-3 text-accent-purple">{t('mission_title')}</h3>
                <p className="text-trust-gray-400">{t('mission_description')}</p>
              </motion.div>
            </div>

            {/* Tech stack */}
            <motion.div variants={itemVariants}>
              <h3 className="text-xl font-semibold mb-4">Our Tech Stack</h3>
              <div className="flex flex-wrap gap-4">
                <TechBadge name="TensorFlow" />
                <TechBadge name="PyTorch" />
                <TechBadge name="React" />
                <TechBadge name="Next.js" />
                <TechBadge name="Python" />
                <TechBadge name="Node.js" />
              </div>
            </motion.div>
          </motion.div>

          {/* About illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative h-[400px] lg:h-[500px] flex items-center justify-center"
          >
            <div className="relative w-full h-full">
              {/* Abstract tech visualization */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 50,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  className="w-64 h-64 md:w-80 md:h-80 border border-accent-blue/30 rounded-full"
                />

                <motion.div
                  animate={{
                    rotate: -360,
                  }}
                  transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  className="absolute w-48 h-48 md:w-64 md:h-64 border border-accent-purple/30 rounded-full"
                />

                <motion.div
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  className="absolute w-32 h-32 md:w-48 md:h-48 border border-accent-blue/30 rounded-full"
                />

                {/* Nodes */}
                {Array.from({ length: 8 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-3 h-3 bg-accent-blue rounded-full"
                    style={{
                      top: `${30 + Math.random() * 40}%`,
                      left: `${30 + Math.random() * 40}%`,
                    }}
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.7, 1, 0.7],
                    }}
                    transition={{
                      duration: 2 + Math.random() * 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                ))}

                {/* Center element */}
                <motion.div
                  className="absolute w-16 h-16 bg-gradient-to-r from-accent-blue to-accent-purple rounded-full flex items-center justify-center"
                  animate={{
                    boxShadow: [
                      '0 0 10px rgba(0, 212, 255, 0.5)',
                      '0 0 20px rgba(0, 212, 255, 0.7)',
                      '0 0 10px rgba(0, 212, 255, 0.5)',
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <span className="text-white font-bold">AI</span>
                </motion.div>
              </div>

              {/* Floating cards */}
              <motion.div
                className="absolute top-10 right-10 glass p-3 rounded-lg w-40 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                <div className="text-accent-blue font-semibold mb-1">Innovation</div>
                <div className="text-xs text-trust-gray-400">Pushing the boundaries of AI</div>
              </motion.div>

              <motion.div
                className="absolute bottom-10 left-10 glass p-3 rounded-lg w-40 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 1, duration: 0.8 }}
              >
                <div className="text-accent-purple font-semibold mb-1">Excellence</div>
                <div className="text-xs text-trust-gray-400">Committed to quality</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Tech badge component
function TechBadge({ name }: { name: string }) {
  return <div className="px-4 py-2 glass rounded-full text-sm">{name}</div>;
}
