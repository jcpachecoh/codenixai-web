'use client';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

export default function FeaturesSection() {
  const t = useTranslations('features');
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  // Features data
  const features = [
    {
      id: 'feature_1',
      title: t('feature_1_title'),
      description: t('feature_1_description'),
      icon: <TechnologyIcon />,
    },
    {
      id: 'feature_2',
      title: t('feature_2_title'),
      description: t('feature_2_description'),
      icon: <TeamIcon />,
    },
    {
      id: 'feature_3',
      title: t('feature_3_title'),
      description: t('feature_3_description'),
      icon: <TailoredIcon />,
    },
    {
      id: 'feature_4',
      title: t('feature_4_title'),
      description: t('feature_4_description'),
      icon: <SupportIcon />,
    },
  ];

  return (
    <section ref={sectionRef} id="features" className="section bg-dark-secondary relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-1/2 h-1/2 bg-accent-blue/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-1/2 h-1/2 bg-accent-purple/10 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">{t('title')}</span>
          </h2>
          <p className="text-xl text-trust-gray-300">{t('subtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="flex gap-5"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-accent-blue/20 to-accent-purple/20 flex items-center justify-center text-accent-blue">
                {feature.icon}
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-trust-gray-400">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 glass rounded-2xl p-8"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <CounterStat value={50} label="AI Projects" />
            <CounterStat value={98} label="Satisfied Clients" suffix="%" />
            <CounterStat value={24} label="Team Members" />
            <CounterStat value={5} label="Years Experience" plus="+" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Counter stat component with animation
function CounterStat({
  value,
  label,
  suffix = '',
  plus = '',
}: {
  value: number;
  label: string;
  suffix?: string;
  plus?: string;
}) {
  const counterRef = useRef(null);
  const isInView = useInView(counterRef, { once: true });

  return (
    <div ref={counterRef} className="flex flex-col items-center">
      <motion.div
        className="text-4xl font-bold mb-2 text-white flex items-center"
        initial={{ opacity: 0.5 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0.5 }}
      >
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <CountUp end={value} />
        </motion.span>
        {suffix && <span>{suffix}</span>}
        {plus && <span>{plus}</span>}
      </motion.div>
      <p className="text-trust-gray-400">{label}</p>
    </div>
  );
}

// Simple counter animation component
function CountUp({ end }: { end: number }) {
  const [count, setCount] = useState(0);
  const nodeRef = useRef(null);
  const isInView = useInView(nodeRef, { once: true });

  useEffect(() => {
    if (isInView) {
      let startTime: number;
      const duration = 2000; // 2 seconds

      const animateCount = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const currentCount = Math.floor(progress * end);

        setCount(currentCount);

        if (progress < 1) {
          requestAnimationFrame(animateCount);
        } else {
          setCount(end);
        }
      };

      requestAnimationFrame(animateCount);
    }
  }, [isInView, end]);

  return <span ref={nodeRef}>{count}</span>;
}

// Icon components
function TechnologyIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20 18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z" />
    </svg>
  );
}

function TeamIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
      <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
    </svg>
  );
}

function TailoredIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
      <path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z" />
    </svg>
  );
}

function SupportIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
      <path d="M11.5 2C6.81 2 3 5.81 3 10.5S6.81 19 11.5 19h.5v3c4.86-2.34 8-7 8-11.5C20 5.81 16.19 2 11.5 2zm1 14.5h-2v-2h2v2zm0-3.5h-2c0-3.25 3-3 3-5 0-1.1-.9-2-2-2s-2 .9-2 2h-2c0-2.21 1.79-4 4-4s4 1.79 4 4c0 2.5-3 2.75-3 5z" />
    </svg>
  );
}
