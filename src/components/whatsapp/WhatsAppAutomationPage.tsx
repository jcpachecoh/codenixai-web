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
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    whatsapp: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setSubmitStatus("success");
      setFormData({ name: "", company: "", whatsapp: "", message: "" });
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToForm = () => {
    const formElement = document.getElementById("contact-form");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
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
        <section className="py-20 px-4 bg-gradient-to-r from-red-900/20 to-orange-900/20">
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
        <section
          id="contact-form"
          className="py-20 px-4 bg-gradient-to-r from-gray-900/50 to-gray-800/50"
        >
          <div className="max-w-4xl mx-auto">
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

            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl border border-gray-700/50 rounded-xl p-8"
            >
              {submitStatus === "success" && (
                <div className="bg-green-900/20 border border-green-500/30 rounded-xl p-4 mb-6 text-green-400 text-center">
                  {t("whatsappAutomation.contact.successMessage")}
                </div>
              )}

              {submitStatus === "error" && (
                <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-4 mb-6 text-red-400 text-center">
                  {t("whatsappAutomation.contact.errorMessage")}
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-white font-medium mb-2">
                    {t("whatsappAutomation.contact.nameLabel")}
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-green-500 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-white font-medium mb-2">
                    {t("whatsappAutomation.contact.companyLabel")}
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-green-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-white font-medium mb-2">
                  {t("whatsappAutomation.contact.whatsappLabel")}
                </label>
                <input
                  type="tel"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-green-500 focus:outline-none transition-colors"
                />
              </div>

              <div className="mb-6">
                <label className="block text-white font-medium mb-2">
                  {t("whatsappAutomation.contact.messageLabel")}
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-green-500 focus:outline-none transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Calendar className="w-5 h-5" />
                    {t("whatsappAutomation.contact.submitButton")}
                  </>
                )}
              </button>
            </motion.form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default WhatsAppAutomationPage;
