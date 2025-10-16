"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Job } from "@/types/careers";

interface JobDetailSectionProps {
  slug: string;
}

export default function JobDetailSection({ slug }: JobDetailSectionProps) {
  const [mounted, setMounted] = useState(false);
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const fetchJob = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`/api/jobs/${slug}`);
      const result = await response.json();
      if (result.success && result.data) {
        setJob(result.data);
      } else {
        setError(result.error || "Job not found");
      }
    } catch (err) {
      console.error("Error fetching job:", err);
      setError("Network error. Please try again.");
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

  if (error || !job) {
    return (
      <div className="section">
        <div className="container">
          <div className="glass p-12 rounded-2xl text-center">
            <h1 className="text-2xl font-bold text-white mb-4">
              Job Not Found
            </h1>
            <p className="text-trust-gray-400 mb-6">{error}</p>
            <Link href="/careers" className="btn-primary">
              View All Jobs
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Link
            href="/careers"
            className="text-trust-gray-400 hover:text-accent-blue"
          >
            Careers
          </Link>
          <span className="text-trust-gray-600 mx-2">/</span>
          <span className="text-white">{job.title}</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass p-8 rounded-2xl mb-8"
        >
          <h1 className="text-3xl font-bold text-white mb-4">{job.title}</h1>
          <div className="flex gap-6 text-sm text-trust-gray-300 mb-6">
            <span>🏢 {job.department}</span>
            <span>📍 {job.location}</span>
            <span>💼 {job.job_type}</span>
          </div>
          <Link href={`/careers/${job.slug}/apply`} className="btn-primary">
            Apply Now
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="glass p-6 rounded-2xl">
              <h2 className="text-xl font-semibold text-white mb-4">
                About This Role
              </h2>
              <p className="text-trust-gray-300">{job.description}</p>
            </div>

            <div className="glass p-6 rounded-2xl">
              <h2 className="text-xl font-semibold text-white mb-4">
                Requirements
              </h2>
              <div className="text-trust-gray-300 whitespace-pre-line">
                {job.requirements}
              </div>
            </div>

            <div className="glass p-6 rounded-2xl">
              <h2 className="text-xl font-semibold text-white mb-4">
                Responsibilities
              </h2>
              <div className="text-trust-gray-300 whitespace-pre-line">
                {job.responsibilities}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="glass p-6 rounded-2xl text-center">
              <h3 className="text-lg font-semibold text-white mb-3">
                Ready to Apply?
              </h3>
              <Link
                href={`/careers/${job.slug}/apply`}
                className="btn-primary w-full"
              >
                Apply Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
