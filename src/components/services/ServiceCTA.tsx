"use client";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface ServiceData {
  namespace: string;
  slug: string;
  icon: React.ReactNode;
}

interface ServiceCTAProps {
  serviceData: ServiceData;
}

export default function ServiceCTA({ serviceData }: ServiceCTAProps) {
  const t = useTranslations(serviceData.namespace);
  const tCommon = useTranslations("services.common");
  const pathname = usePathname();
  const locale = pathname.split("/")[1];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-primary-blue/10 via-primary-purple/10 to-primary-pink/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Service Icon */}
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-primary-blue to-primary-purple rounded-2xl text-white mb-8">
              {serviceData.icon}
            </div>

            {/* Headline */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {tCommon("title")}{" "}
              <span className="gradient-text">{t("title")}</span>
            </h2>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto">
              {tCommon("subtitle")}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={`/${locale}/contact`}
                  className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-primary-blue via-primary-purple to-primary-pink rounded-full shadow-2xl hover:shadow-primary-blue/25 transition-all duration-300"
                >
                  <span>{tCommon("ctaPrimary")}</span>
                  <svg
                    className="ml-2 w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={`/${locale}/contact`}
                  className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white border-2 border-primary-blue/50 rounded-full hover:bg-primary-blue/10 hover:border-primary-blue transition-all duration-300"
                >
                  <span>{tCommon("ctaSecondary")}</span>
                  <svg
                    className="ml-2 w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </Link>
              </motion.div>
            </div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto"
            >
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text mb-2">
                  24/7
                </div>
                <div className="text-gray-400">{tCommon("indicator_1")}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text mb-2">30+</div>
                <div className="text-gray-400">{tCommon("indicator_2")}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text mb-2">98%</div>
                <div className="text-gray-400">{tCommon("indicator_3")}</div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Additional services suggestion */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <p className="text-gray-400 mb-6">{tCommon("suggestion")}</p>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { name: "Custom Software", href: "custom-software" },
              { name: "Cloud & DevOps", href: "cloud-devops" },
              { name: "Data Analytics", href: "data-analytics" },
            ].map((service, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={`/${locale}/services/${service.href}`}
                  className="inline-block px-6 py-3 text-base font-medium text-gray-300 border border-gray-600 rounded-lg hover:border-primary-blue hover:text-primary-blue transition-all duration-300"
                >
                  {service.name}
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
