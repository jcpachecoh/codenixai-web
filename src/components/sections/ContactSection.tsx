'use client';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import Link from 'next/link';

export default function ContactSection() {
  const t = useTranslations('contact');

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | 'success' | 'error'>(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorMessage('');

    try {
      // Get current locale from URL
      const locale = window.location.pathname.split('/')[1] || 'en';

      // Get UTM parameters from URL
      const urlParams = new URLSearchParams(window.location.search);
      const utmSource = urlParams.get('utm_source') || undefined;
      const utmMedium = urlParams.get('utm_medium') || undefined;
      const utmCampaign = urlParams.get('utm_campaign') || undefined;

      const leadData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        company: formData.company || undefined,
        message: formData.message,
        locale,
        source: 'contact_form',
        utmSource,
        utmMedium,
        utmCampaign,
      };

      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(leadData),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus('success');
        // Reset form after success
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          message: '',
        });

        // Clear success message after 5 seconds
        setTimeout(() => {
          setSubmitStatus(null);
        }, 5000);
      } else {
        setSubmitStatus('error');
        setErrorMessage(result.error || 'An error occurred while submitting your message.');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
      setErrorMessage('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-accent-blue/20 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-l from-accent-purple/20 to-transparent rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-primary-pink/10 to-transparent rounded-full blur-2xl animate-gentle-float" />
      </div>

      <div className="container relative z-10">
        {/* Header with visual elements */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-accent-blue to-accent-purple flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-4l-4 4v-4z"
                  />
                </svg>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold">
                <span className="gradient-text">Let&apos;s Build Together</span>
              </h2>
            </div>
          </div>
          <p className="text-xl text-trust-gray-300 max-w-3xl mx-auto">
            Ready to transform your ideas into reality? We&apos;re here to help you build the next generation of
            AI-powered solutions.
          </p>
        </div>

        {/* Contact Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 animate-fade-in-up">
          <div className="glass p-6 rounded-2xl text-center hover:scale-105 transition-transform duration-300">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-accent-blue to-accent-purple flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Quick Chat</h3>
            <p className="text-trust-gray-400 mb-4">Schedule a 15-minute discovery call</p>
            <Link
              href="https://calendly.com/juan-codenixai/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              Book Call
            </Link>
          </div>

          <div className="glass p-6 rounded-2xl text-center hover:scale-105 transition-transform duration-300">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-accent-purple to-primary-pink flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Email Us</h3>
            <p className="text-trust-gray-400 mb-4">Send us your project details</p>
            <Link href="mailto:sales@codenixai.com" className="btn-secondary">
              Send Email
            </Link>
          </div>

          <div className="glass p-6 rounded-2xl text-center hover:scale-105 transition-transform duration-300">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-primary-pink to-accent-blue flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Get Proposal</h3>
            <p className="text-trust-gray-400 mb-4">Receive a detailed project estimate</p>
            <button
              onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-secondary"
            >
              Start Project
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact form */}
          <div className="lg:col-span-2">
            <div id="contact-form" className="glass p-8 rounded-2xl animate-fade-in-up">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-accent-blue to-accent-purple flex items-center justify-center mr-4">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-white">Tell Us About Your Project</h3>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label htmlFor="name" className="block text-base font-medium text-trust-gray-300 mb-2">
                    {t('name_label')}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-dark/50 border border-trust-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-blue/50 focus:border-accent-blue/50 text-white"
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="email" className="block text-base font-medium text-trust-gray-300 mb-2">
                    {t('email_label')}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-dark/50 border border-trust-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-blue/50 focus:border-accent-blue/50 text-white"
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="phone" className="block text-base font-medium text-trust-gray-300 mb-2">
                    Phone (Optional)
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-dark/50 border border-trust-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-blue/50 focus:border-accent-blue/50 text-white"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="company" className="block text-base font-medium text-trust-gray-300 mb-2">
                    Company (Optional)
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-dark/50 border border-trust-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-blue/50 focus:border-accent-blue/50 text-white"
                    placeholder="Your company name"
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="message" className="block text-base font-medium text-trust-gray-300 mb-2">
                    {t('message_label')}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-dark/50 border border-trust-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-blue/50 focus:border-accent-blue/50 text-white resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                      Processing...
                    </span>
                  ) : (
                    t('submit_button')
                  )}
                </button>

                {submitStatus === 'success' && (
                  <div className="mt-4 p-4 bg-green-500/20 border border-green-500/30 rounded-lg text-green-400 text-center animate-fade-in">
                    <div className="flex items-center justify-center mb-2">
                      <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Success!
                    </div>
                    <p>
                      Thank you! Your message has been sent successfully. We&apos;ll get back to you within 24 hours.
                    </p>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="mt-4 p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 text-center animate-fade-in">
                    <div className="flex items-center justify-center mb-2">
                      <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Error
                    </div>
                    <p>{errorMessage || 'There was an error sending your message. Please try again.'}</p>
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="space-y-6 animate-fade-in-up">
            <div className="glass p-6 rounded-2xl">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-accent-blue to-accent-purple flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                Why Work With Us?
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white font-medium">Fast Response</h4>
                    <p className="text-trust-gray-400 text-sm">We respond within 2 hours during business days</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white font-medium">Expert Team</h4>
                    <p className="text-trust-gray-400 text-sm">5+ years experience in AI & software development</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white font-medium">Proven Results</h4>
                    <p className="text-trust-gray-400 text-sm">50+ successful projects delivered on time</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Work Preview */}
            <div className="glass p-6 rounded-2xl">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-accent-purple to-primary-pink flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                </div>
                Recent Success
              </h3>
              <div className="bg-dark/30 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-accent-blue to-accent-purple flex items-center justify-center">
                    <span className="text-white font-bold text-sm">AI</span>
                  </div>
                  <div>
                    <h4 className="text-white font-medium">E-commerce Automation</h4>
                    <p className="text-trust-gray-400 text-sm">AI-powered inventory management</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <div className="flex items-center text-green-400">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                      />
                    </svg>
                    40% efficiency increase
                  </div>
                  <span className="text-trust-gray-500">•</span>
                  <span className="text-trust-gray-400">Completed in 6 weeks</span>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="glass p-6 rounded-2xl">
              <h3 className="text-lg font-semibold text-white mb-4">Connect Directly</h3>
              <div className="space-y-3">
                <Link
                  href="mailto:sales@codenixai.com"
                  className="flex items-center space-x-3 text-trust-gray-300 hover:text-accent-blue transition-colors"
                >
                  <EmailIcon />
                  <span>sales@codenixai.com</span>
                </Link>
                <Link
                  href="tel:+573123456789"
                  className="flex items-center space-x-3 text-trust-gray-300 hover:text-accent-blue transition-colors"
                >
                  <PhoneIcon />
                  <span>+57 (312) 345-6789</span>
                </Link>
                <div className="flex items-center space-x-3 text-trust-gray-300">
                  <LocationIcon />
                  <span>Bogotá, Colombia</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 animate-fade-in-up">
          <div className="glass p-8 rounded-2xl max-w-4xl mx-auto">
            <h3 className="text-2xl font-semibold text-white mb-4">Ready to Get Started?</h3>
            <p className="text-trust-gray-300 mb-6 text-lg">
              Join 50+ companies that trust us with their AI transformation journey
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="https://calendly.com/juan-codenixai/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Schedule Free Consultation
              </Link>
              <Link href="mailto:sales@codenixai.com" className="btn-secondary">
                Send Project Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Icon components
function LocationIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
    </svg>
  );
}
