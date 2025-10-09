"use client";
import { motion, Variants } from "framer-motion";
import { useTranslations } from "next-intl";

interface ServiceData {
  namespace: string;
  slug: string;
  icon: React.ReactNode;
}

interface ServiceOutcomesProps {
  serviceData: ServiceData;
}

export default function ServiceOutcomes({ serviceData }: ServiceOutcomesProps) {
  const t = useTranslations(serviceData.namespace);
  const to = useTranslations("services");

  // Get outcomes from translations
  const outcomes = t.raw("outcomes") as string[];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7 },
    },
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 right-20 w-96 h-96 bg-primary-pink/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {to("outcomes.title_1")}{" "}
            <span className="gradient-text">{to("outcomes.title_2")}</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {to("outcomes.subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Outcomes List */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6"
          >
            {outcomes.map((outcome, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex items-start space-x-4 group"
              >
                {/* Number indicator */}
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-primary-blue to-primary-purple rounded-full flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 transition-transform duration-300">
                  {index + 1}
                </div>

                {/* Outcome content */}
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-primary-blue transition-colors duration-300">
                    {outcome}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    Proven strategies and implementation that deliver tangible
                    business value
                  </p>
                </div>

                {/* Arrow indicator */}
                <div className="flex-shrink-0 text-primary-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Visual Element */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative w-full h-96 flex items-center justify-center">
              {/* Central circle */}
              <motion.div
                className="w-48 h-48 bg-gradient-to-r from-primary-blue to-primary-purple rounded-full flex items-center justify-center relative"
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <div className="w-32 h-32 bg-black rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-2xl">ROI</span>
                </div>

                {/* Floating indicators */}
                {outcomes.map((_, index) => (
                  <motion.div
                    key={index}
                    className="absolute w-4 h-4 bg-primary-pink rounded-full"
                    style={{
                      top: "50%",
                      left: "50%",
                      transformOrigin: `${60 + index * 20}px 0px`,
                    }}
                    animate={{
                      rotate: [0, 360],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      rotate: {
                        duration: 8 + index * 2,
                        repeat: Infinity,
                        ease: "linear",
                      },
                      scale: {
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.5,
                      },
                    }}
                  />
                ))}
              </motion.div>

              {/* Success metrics */}
              <motion.div
                className="absolute top-4 right-4 bg-green-500/20 backdrop-blur-sm rounded-lg p-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="text-green-400 text-base font-semibold">
                  {to("success_metrics.metric_1")}
                </div>
                <div className="text-green-300 text-2xl font-bold">98%</div>
              </motion.div>

              <motion.div
                className="absolute bottom-4 left-4 bg-blue-500/20 backdrop-blur-sm rounded-lg p-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                viewport={{ once: true }}
              >
                <div className="text-blue-400 text-base font-semibold">
                  {to("success_metrics.metric_2")}
                </div>
                <div className="text-blue-300 text-2xl font-bold">65%</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
