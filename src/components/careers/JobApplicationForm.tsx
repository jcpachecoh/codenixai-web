'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Job } from '@/types/careers';

interface JobApplicationFormProps {
  slug: string;
}

export default function JobApplicationForm({ slug }: JobApplicationFormProps) {
  const [mounted, setMounted] = useState(false);
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    cover_letter: '',
    resume_url: '',
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const fetchJob = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/jobs/${slug}`);
      const result = await response.json();
      if (result.success && result.data) {
        setJob(result.data);
      } else {
        setError(result.error || 'Job not found');
      }
    } catch (err) {
      console.error('Error fetching job:', err);
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (mounted) {
      fetchJob();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug, mounted]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!job) return;

    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          job_id: job.id,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSuccess(true);
      } else {
        setError(result.error || 'Failed to submit application');
      }
    } catch (err) {
      console.error('Error submitting application:', err);
      setError('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (!mounted) {
    return (
      <div className="section flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-blue"></div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="section flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-blue"></div>
      </div>
    );
  }

  if (error && !job) {
    return (
      <div className="section">
        <div className="container">
          <div className="glass p-12 rounded-2xl text-center">
            <h1 className="text-2xl font-bold text-white mb-4">Job Not Found</h1>
            <p className="text-trust-gray-400 mb-6">{error}</p>
            <Link href="/careers" className="btn-primary">
              View All Jobs
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <section className="section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass p-12 rounded-2xl text-center max-w-2xl mx-auto"
          >
            <div className="text-green-400 text-5xl mb-6">✓</div>
            <h1 className="text-3xl font-bold text-white mb-4">Application Submitted!</h1>
            <p className="text-trust-gray-300 mb-6">
              Thank you for your interest in the {job?.title} position. We&apos;ll review your application and get back
              to you soon.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href={`/careers/${slug}`} className="btn-secondary">
                Back to Job
              </Link>
              <Link href="/careers" className="btn-primary">
                View All Jobs
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <Link href="/careers" className="text-trust-gray-400 hover:text-accent-blue">
            Careers
          </Link>
          <span className="text-trust-gray-600 mx-2">/</span>
          <Link href={`/careers/${slug}`} className="text-trust-gray-400 hover:text-accent-blue">
            {job?.title}
          </Link>
          <span className="text-trust-gray-600 mx-2">/</span>
          <span className="text-white">Apply</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
              <div className="glass p-8 rounded-2xl">
                <h1 className="text-3xl font-bold text-white mb-2">Apply for {job?.title}</h1>
                <p className="text-trust-gray-300 mb-8">
                  We&apos;re excited to learn more about you. Please fill out the form below to submit your application.
                </p>

                {error && (
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6">
                    <p className="text-red-400">{error}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-trust-gray-800/50 border border-trust-gray-700 rounded-lg text-white placeholder-trust-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-blue focus:border-transparent"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-trust-gray-800/50 border border-trust-gray-700 rounded-lg text-white placeholder-trust-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-blue focus:border-transparent"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-white mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-trust-gray-800/50 border border-trust-gray-700 rounded-lg text-white placeholder-trust-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-blue focus:border-transparent"
                        placeholder="Enter your phone number"
                      />
                    </div>

                    <div>
                      <label htmlFor="location" className="block text-sm font-medium text-white mb-2">
                        Location
                      </label>
                      <input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-trust-gray-800/50 border border-trust-gray-700 rounded-lg text-white placeholder-trust-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-blue focus:border-transparent"
                        placeholder="City, State/Country"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="resume_url" className="block text-sm font-medium text-white mb-2">
                      LinkedIn Profile or Resume URL
                    </label>
                    <input
                      type="url"
                      id="resume_url"
                      name="resume_url"
                      value={formData.resume_url}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-trust-gray-800/50 border border-trust-gray-700 rounded-lg text-white placeholder-trust-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-blue focus:border-transparent"
                      placeholder="https://your-resume-link.com"
                    />
                    <p className="text-sm text-trust-gray-400 mt-1">
                      Link to your resume on Google Drive, Dropbox, or your portfolio website
                    </p>
                  </div>

                  <div>
                    <label htmlFor="cover_letter" className="block text-sm font-medium text-white mb-2">
                      Cover Letter *
                    </label>
                    <textarea
                      id="cover_letter"
                      name="cover_letter"
                      value={formData.cover_letter}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 bg-trust-gray-800/50 border border-trust-gray-700 rounded-lg text-white placeholder-trust-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-blue focus:border-transparent resize-none"
                      placeholder="Tell us why you're interested in this position and why you'd be a great fit..."
                    />
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {submitting ? 'Submitting...' : 'Submit Application'}
                    </button>
                    <Link href={`/careers/${slug}`} className="btn-secondary">
                      Cancel
                    </Link>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>

          <div className="space-y-6">
            {job && (
              <div className="glass p-6 rounded-2xl">
                <h3 className="text-lg font-semibold text-white mb-4">Position Details</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-trust-gray-400">Title:</span>
                    <span className="text-white">{job.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-trust-gray-400">Department:</span>
                    <span className="text-white">{job.department}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-trust-gray-400">Location:</span>
                    <span className="text-white">{job.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-trust-gray-400">Type:</span>
                    <span className="text-white">{job.job_type}</span>
                  </div>
                  {job.salary_min && job.salary_max && (
                    <div className="flex justify-between">
                      <span className="text-trust-gray-400">Salary:</span>
                      <span className="text-white">
                        ${job.salary_min.toLocaleString()} - ${job.salary_max.toLocaleString()}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="glass p-6 rounded-2xl">
              <h3 className="text-lg font-semibold text-white mb-4">Application Tips</h3>
              <ul className="space-y-2 text-sm text-trust-gray-300">
                <li>• Be specific about your relevant experience</li>
                <li>• Highlight achievements with quantifiable results</li>
                <li>• Show enthusiasm for the role and company</li>
                <li>• Keep your cover letter concise but impactful</li>
                <li>• Ensure your resume link is accessible</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
