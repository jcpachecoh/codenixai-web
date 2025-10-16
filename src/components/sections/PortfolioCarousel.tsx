"use client";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState, useMemo } from "react";

interface Project {
  id: number;
  name: string;
  description: string;
  image: string;
  technologies: string[];
  category: string;
  url: string;
  features: string[];
}

export default function PortfolioCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const t = useTranslations("portfolioCarousel");

  const projects: Project[] = useMemo(
    () => [
      {
        id: 1,
        name: t("projects.inmuebli.name"),
        description: t("projects.inmuebli.description"),
        image: "/inmuebli-logo.png",
        technologies: ["Next.js", "AI/ML", "PostgreSQL", "Maps API"],
        category: t("projects.inmuebli.category"),
        url: "https://inmuebli.io",
        features: t.raw("projects.inmuebli.features") as string[],
      },
      {
        id: 2,
        name: t("projects.emprendyup.name"),
        description: t("projects.emprendyup.description"),
        image: "/emprendy-logo.png",
        technologies: ["React", "Node.js", "MongoDB", "WebRTC"],
        category: t("projects.emprendyup.category"),
        url: "https://emprendyup.com",
        features: t.raw("projects.emprendyup.features") as string[],
      },
      {
        id: 3,
        name: t("projects.ecommerce.name"),
        description: t("projects.ecommerce.description"),
        image: "/projects/commerce-screenshot.jpg",
        technologies: ["Python", "TensorFlow", "Redis", "Stripe"],
        category: t("projects.ecommerce.category"),
        url: "#",
        features: t.raw("projects.ecommerce.features") as string[],
      },
    ],
    [t]
  );

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % projects.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-64 h-64 bg-primary-blue/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-primary-purple/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {t("title_prefix")}{" "}
            <span className="gradient-text"> {t("title_highlight")}</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative max-w-6xl mx-auto">
          <motion.div
            className="relative h-[550px] rounded-2xl overflow-hidden"
            key={currentSlide}
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
              {/* Project Image */}
              <div className="relative flex items-center justify-center bg-transparent to-primary-purple/20 p-8">
                <motion.div
                  className="relative w-full h-full flex items-center justify-center"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative w-full flex items-center justify-center">
                    <div className="relative w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] flex items-center justify-center">
                      <Image
                        src={projects[currentSlide].image}
                        alt={projects[currentSlide].name}
                        fill
                        className="object-contain rounded-xl"
                      />
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Project Details */}
              <div className="bg-gray-900/80 backdrop-blur-sm p-8 lg:p-12 flex flex-col justify-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div className="mb-4">
                    <span className="px-3 py-1 bg-primary-blue/20 text-primary-blue text-base rounded-full">
                      {projects[currentSlide].category}
                    </span>
                  </div>

                  <h3 className="text-3xl font-bold text-white mb-4">
                    {projects[currentSlide].name}
                  </h3>

                  <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                    {projects[currentSlide].description}
                  </p>

                  {/* Features */}
                  <div className="mb-8">
                    <h4 className="text-white font-semibold mb-3">
                      Key Features:
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {projects[currentSlide].features.map((feature, index) => (
                        <div
                          key={index}
                          className="flex items-center text-gray-300 text-base"
                        >
                          <div className="w-1.5 h-1.5 bg-primary-blue rounded-full mr-2" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Technologies */}
                  <div className="mb-8">
                    <h4 className="text-white font-semibold mb-3">
                      {t("technologies")}:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {projects[currentSlide].technologies.map(
                        (tech, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-gray-800 text-gray-300 text-base rounded-lg border border-gray-700"
                          >
                            {tech}
                          </span>
                        )
                      )}
                    </div>
                  </div>

                  {/* CTA */}
                  {projects[currentSlide].url !== "#" && (
                    <motion.a
                      href={projects[currentSlide].url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary-blue to-primary-purple text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {t("ctaPrimary")}
                      <svg
                        className="ml-2 w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </motion.a>
                  )}
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Navigation */}
          <div className="absolute top-1/2 -translate-y-1/2 left-4 lg:-left-12">
            <motion.button
              onClick={prevSlide}
              className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
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
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </motion.button>
          </div>

          <div className="absolute top-1/2 -translate-y-1/2 right-4 lg:-right-12">
            <motion.button
              onClick={nextSlide}
              className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
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
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </motion.button>
          </div>

          {/* Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-primary-blue"
                    : "bg-gray-600 hover:bg-gray-500"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
