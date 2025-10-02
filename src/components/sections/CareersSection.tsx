'use client';
import { useState, useEffect } from 'react';
import { Job, JobSearchParams } from '@/types/careers';
import JobCard from '@/components/careers/JobCard';
import JobFilters from '@/components/careers/JobFilters';

export default function CareersSection() {
  const [mounted, setMounted] = useState(false);

  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<JobSearchParams>({});

  // Handle hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError(null);

      const queryParams = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          queryParams.append(key, value.toString());
        }
      });

      const response = await fetch(`/api/jobs?${queryParams.toString()}`);
      const result = await response.json();

      if (result.success) {
        setJobs(result.data || []);
      } else {
        setError(result.error || 'Failed to fetch jobs');
      }
    } catch (err) {
      console.error('Error fetching jobs:', err);
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch jobs
  useEffect(() => {
    fetchJobs();
  }, [filters]);

  const handleFilterChange = (newFilters: JobSearchParams) => {
    setFilters(newFilters);
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <section className="section">
        <div className="container">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Join Our Team</h1>
            <p className="text-xl text-trust-gray-400 mb-12 max-w-3xl mx-auto">
              Build the future of AI-powered software development with us.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="careers" className="section relative">
      {/* Background elements */}

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            <span className="gradient-text">Join Our Team</span>
          </h1>
          <p style={{ fontSize: '1.25rem', color: '#d4d4d4', maxWidth: '600px', margin: '0 auto' }}>
            Build the future of AI-powered software development with us. We&apos;re looking for passionate individuals
            who want to make a difference.
          </p>
        </div>

        {/* Company Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 animate-fade-in-up">
          <div className="glass p-6 rounded-2xl text-center">
            <div className="text-accent-blue text-3xl mb-4">🚀</div>
            <h3 className="text-xl font-semibold text-white mb-2">Innovation First</h3>
            <p className="text-trust-gray-400">
              We push boundaries and embrace cutting-edge technologies to solve complex problems.
            </p>
          </div>
          <div className="glass p-6 rounded-2xl text-center">
            <div className="text-accent-blue text-3xl mb-4">🤝</div>
            <h3 className="text-xl font-semibold text-white mb-2">Collaborative Culture</h3>
            <p className="text-trust-gray-400">
              We believe in teamwork, knowledge sharing, and supporting each other&apos;s growth.
            </p>
          </div>
          <div className="glass p-6 rounded-2xl text-center">
            <div className="text-accent-blue text-3xl mb-4">🌍</div>
            <h3 className="text-xl font-semibold text-white mb-2">Remote-First</h3>
            <p className="text-trust-gray-400">
              Work from anywhere while maintaining work-life balance and flexibility.
            </p>
          </div>
        </div>

        {/* Job Filters */}
        <div className="mb-8 animate-fade-in-up">
          <JobFilters onFilterChange={handleFilterChange} />
        </div>

        {/* Jobs Section */}
        <div className="animate-fade-in-up">
          <h2 className="text-2xl font-bold text-white mb-8">
            Open Positions {jobs.length > 0 && <span className="text-accent-blue">({jobs.length})</span>}
          </h2>

          {loading && (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-blue"></div>
            </div>
          )}

          {error && (
            <div className="glass p-6 rounded-2xl text-center text-red-400 mb-8">
              <p>{error}</p>
              <button onClick={fetchJobs} className="btn-secondary mt-4">
                Try Again
              </button>
            </div>
          )}

          {!loading && !error && jobs.length === 0 && (
            <div className="glass p-12 rounded-2xl text-center">
              <div className="text-accent-blue text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-white mb-2">No positions found</h3>
              <p className="text-trust-gray-400 mb-6">
                Try adjusting your filters or check back later for new opportunities.
              </p>
              <button onClick={() => setFilters({})} className="btn-secondary">
                Clear Filters
              </button>
            </div>
          )}

          {!loading && !error && jobs.length > 0 && (
            <div className="space-y-6">
              {jobs.map((job, index) => (
                <div key={job.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <JobCard job={job} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Call to Action */}
        <div className="glass p-8 rounded-2xl text-center mt-16 animate-fade-in-up">
          <h3 className="text-2xl font-semibold text-white mb-4">Don&apos;t see the perfect role?</h3>
          <p className="text-trust-gray-400 mb-6 max-w-2xl mx-auto">
            We&apos;re always looking for talented individuals to join our team. Send us your resume and let us know how
            you&apos;d like to contribute to our mission.
          </p>
          <a href="mailto:careers@codenixai.com?subject=General Application" className="btn-primary">
            Send General Application
          </a>
        </div>
      </div>
    </section>
  );
}
