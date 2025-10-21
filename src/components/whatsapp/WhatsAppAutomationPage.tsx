"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  MessageSquare,
  Bot,
  Zap,
  Clock,
  TrendingUp,
  Users,
  Phone,
  Calendar,
} from "lucide-react";
import { useState } from "react";

const WhatsAppAutomationPage = () => {
  const t = useTranslations();
  const tcontact = useTranslations("contact");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | "success" | "error">(
    null
  );
  const [errorMessage, setErrorMessage] = useState("");
  const scrollToForm = () => {
    const formElement = document.getElementById("contact-form");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    }
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorMessage("");

    try {
      // Get current locale from URL
      const locale = window.location.pathname.split("/")[1] || "en";

      // Get UTM parameters from URL
      const urlParams = new URLSearchParams(window.location.search);
      const utmSource = urlParams.get("utm_source") || undefined;
      const utmMedium = urlParams.get("utm_medium") || undefined;
      const utmCampaign = urlParams.get("utm_campaign") || undefined;

      const leadData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        company: formData.company || undefined,
        message: formData.message,
        locale,
        source: "contact_form",
        utmSource,
        utmMedium,
        utmCampaign,
      };

      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(leadData),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus("success");
        // Reset form after success
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          message: "",
        });

        // Clear success message after 5 seconds
        setTimeout(() => {
          setSubmitStatus(null);
        }, 5000);
      } else {
        setSubmitStatus("error");
        setErrorMessage(
          result.error || "An error occurred while submitting your message."
        );
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus("error");
      setErrorMessage(
        "Network error. Please check your connection and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-12 bg-black text-white overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-green-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <MessageSquare className="w-4 h-4" />
                WhatsApp Business + IA
              </div>

              <h1 className="text-5xl md:text-7xl font-bold gradient-text mb-6 leading-tight">
                {t("whatsappAutomation.hero.title")}
              </h1>

              <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-8">
                {t("whatsappAutomation.hero.subtitle")}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={scrollToForm}
                  className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Calendar className="w-5 h-5" />
                  {t("whatsappAutomation.hero.ctaDemo")}
                </button>
                <button className="border border-gray-600 hover:border-gray-400 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2">
                  <Phone className="w-5 h-5" />
                  {t("whatsappAutomation.hero.ctaConsult")}
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Problems Section */}
        <section className="py-20 px-4 bg-gradient-to-r bg-black">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                {t("whatsappAutomation.problems.title")}
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { key: "pain1", icon: Clock },
                { key: "pain2", icon: TrendingUp },
                { key: "pain3", icon: Users },
                { key: "pain4", icon: Bot },
              ].map((item, index) => (
                <motion.div
                  key={item.key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-red-900/20 border border-red-500/30 rounded-xl p-6 text-center"
                >
                  <item.icon className="w-12 h-12 text-red-400 mx-auto mb-4" />
                  <p className="text-gray-300">
                    {t(`whatsappAutomation.problems.${item.key}`)}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Solution Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
                {t("whatsappAutomation.solution.title")}
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                {t("whatsappAutomation.solution.subtitle")}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  key: "feature1",
                  icon: Bot,
                  color: "from-blue-500 to-purple-500",
                },
                {
                  key: "feature2",
                  icon: Zap,
                  color: "from-green-500 to-blue-500",
                },
                {
                  key: "feature3",
                  icon: Clock,
                  color: "from-purple-500 to-pink-500",
                },
                {
                  key: "feature4",
                  icon: TrendingUp,
                  color: "from-orange-500 to-red-500",
                },
              ].map((item, index) => (
                <motion.div
                  key={item.key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl border border-gray-700/50 rounded-xl p-6 text-center hover:border-gray-600/50 transition-all duration-300"
                >
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center mx-auto mb-4`}
                  >
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-white font-medium">
                    {t(`whatsappAutomation.solution.${item.key}`)}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-gray-900/50 to-gray-800/50">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                {t("whatsappAutomation.useCases.title")}
              </h2>
              <p className="text-xl text-gray-300">
                {t("whatsappAutomation.useCases.subtitle")}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {["case1", "case2", "case3", "case4"].map((caseKey, index) => (
                <motion.div
                  key={caseKey}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl border border-gray-700/50 rounded-xl p-8 hover:border-gray-600/50 transition-all duration-300"
                >
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {t(`whatsappAutomation.useCases.${caseKey}.title`)}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {t(`whatsappAutomation.useCases.${caseKey}.description`)}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
                {t("whatsappAutomation.benefits.title")}
              </h2>
              <p className="text-xl text-gray-300">
                {t("whatsappAutomation.benefits.subtitle")}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {["benefit1", "benefit2", "benefit3", "benefit4"].map(
                (benefit, index) => (
                  <motion.div
                    key={benefit}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-gradient-to-br from-green-900/20 to-blue-900/20 border border-green-500/30 rounded-xl p-6 text-center"
                  >
                    <div className="text-3xl font-bold text-green-400 mb-2">
                      {t(`whatsappAutomation.benefits.${benefit}.title`)}
                    </div>
                    <p className="text-gray-300 text-sm">
                      {t(`whatsappAutomation.benefits.${benefit}.description`)}
                    </p>
                  </motion.div>
                )
              )}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-green-900/30 to-blue-900/30">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
                {t("whatsappAutomation.cta.title")}
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                {t("whatsappAutomation.cta.subtitle")}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={scrollToForm}
                  className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Calendar className="w-5 h-5" />
                  {t("whatsappAutomation.cta.ctaDemo")}
                </button>
                <button className="border border-gray-600 hover:border-gray-400 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2">
                  <Phone className="w-5 h-5" />
                  {t("whatsappAutomation.cta.ctaMeeting")}
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                {t("whatsappAutomation.faq.title")}
              </h2>
            </motion.div>

            <div className="space-y-6">
              {["q1", "q2", "q3", "q4"].map((q, index) => (
                <motion.div
                  key={q}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl border border-gray-700/50 rounded-xl p-6"
                >
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {t(`whatsappAutomation.faq.${q}.question`)}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {t(`whatsappAutomation.faq.${q}.answer`)}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form Section */}

        <section className="py-20 px-4 bg-gradient-to-r from-green-900/30 to-blue-900/30">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
                {t("whatsappAutomation.cta.title")}
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                {t("whatsappAutomation.cta.subtitle")}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={scrollToForm}
                  className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-green-500/50 hover:scale-105"
                >
                  <Calendar className="w-5 h-5" />
                  {t("whatsappAutomation.cta.ctaDemo")}
                </button>
                <button className="border-2 border-gray-600 hover:border-green-500 hover:bg-green-500/10 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105">
                  <Phone className="w-5 h-5" />
                  {t("whatsappAutomation.cta.ctaMeeting")}
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                {t("whatsappAutomation.faq.title")}
              </h2>
            </motion.div>

            <div className="space-y-6">
              {["q1", "q2", "q3", "q4"].map((q, index) => (
                <motion.div
                  key={q}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl border border-gray-700/50 rounded-xl p-6 hover:border-gray-600/70 transition-all duration-300"
                >
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {t(`whatsappAutomation.faq.${q}.question`)}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {t(`whatsappAutomation.faq.${q}.answer`)}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section
          id="contact-form"
          className="py-20 px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden"
        >
          {/* Decorative elements */}
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-blue-500/5 pointer-events-none"></div>
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="max-w-3xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
                {t("whatsappAutomation.contact.title")}
              </h2>
              <p className="text-xl text-gray-300">
                {t("whatsappAutomation.contact.subtitle")}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 md:p-10 shadow-2xl"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-semibold text-gray-200 mb-2 tracking-wide"
                    >
                      {tcontact("name_label")}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-900/60 border border-gray-700/70 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 text-white placeholder-gray-500 transition-all duration-300 hover:border-gray-600"
                      placeholder="Juan Pérez"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-gray-200 mb-2 tracking-wide"
                    >
                      {tcontact("email_label")}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-900/60 border border-gray-700/70 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 text-white placeholder-gray-500 transition-all duration-300 hover:border-gray-600"
                      placeholder="juan@empresa.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-semibold text-gray-200 mb-2 tracking-wide"
                    >
                      {tcontact("phone_label")}
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-900/60 border border-gray-700/70 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 text-white placeholder-gray-500 transition-all duration-300 hover:border-gray-600"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="company"
                      className="block text-sm font-semibold text-gray-200 mb-2 tracking-wide"
                    >
                      {tcontact("company_label")}
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-900/60 border border-gray-700/70 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 text-white placeholder-gray-500 transition-all duration-300 hover:border-gray-600"
                      placeholder={t("company_placeholder")}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-gray-200 mb-2 tracking-wide"
                  >
                    {tcontact("message_label")}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-gray-900/60 border border-gray-700/70 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 text-white placeholder-gray-500 resize-none transition-all duration-300 hover:border-gray-600"
                    placeholder="Cuéntanos sobre tu proyecto..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-green-500/50 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-3">
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      <span className="text-lg">Enviando...</span>
                    </span>
                  ) : (
                    <>
                      <span className="text-lg">
                        {tcontact("submit_button")}
                      </span>
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </>
                  )}
                </button>

                {submitStatus === "success" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-6 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-2 border-green-500/40 rounded-xl text-green-300 text-center shadow-lg"
                  >
                    <div className="flex items-center justify-center mb-3">
                      <div className="bg-green-500/20 p-2 rounded-full">
                        <svg
                          className="w-8 h-8 text-green-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                    </div>
                    <h4 className="text-xl font-bold text-green-300 mb-2">
                      ¡Mensaje Enviado!
                    </h4>
                    <p className="text-gray-300">
                      Thank you! Your message has been sent successfully.
                      We&apos;ll get back to you within 24 hours.
                    </p>
                  </motion.div>
                )}

                {submitStatus === "error" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-6 bg-gradient-to-r from-red-500/20 to-orange-500/20 border-2 border-red-500/40 rounded-xl text-red-300 text-center shadow-lg"
                  >
                    <div className="flex items-center justify-center mb-3">
                      <div className="bg-red-500/20 p-2 rounded-full">
                        <svg
                          className="w-8 h-8 text-red-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </div>
                    </div>
                    <h4 className="text-xl font-bold text-red-300 mb-2">
                      Error al Enviar
                    </h4>
                    <p className="text-gray-300">
                      {errorMessage ||
                        "There was an error sending your message. Please try again."}
                    </p>
                  </motion.div>
                )}
              </form>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default WhatsAppAutomationPage;
