"use client";
import { useState, useEffect } from "react";
import { Job, JobSearchParams } from "@/types/careers";
import JobCard from "@/components/careers/JobCard";
import JobFilters from "@/components/careers/JobFilters";
import { useTranslations } from "next-intl";

export default function CareersSection() {
  const [mounted, setMounted] = useState(false);

  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<JobSearchParams>({});
  const t = useTranslations("careers");
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
        if (value !== undefined && value !== null && value !== "") {
          queryParams.append(key, value.toString());
        }
      });

      const response = await fetch(`/api/jobs?${queryParams.toString()}`);
      const result = await response.json();

      if (result.success) {
        setJobs(result.data || []);
      } else {
        setError(result.error || "Failed to fetch jobs");
      }
    } catch (err) {
      console.error("Error fetching jobs:", err);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch jobs
  useEffect(() => {
    fetchJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {t("title_prefix")}
            </h1>
            <p className="text-xl text-trust-gray-400 mb-12 max-w-3xl mx-auto">
              {t("description")}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="careers" className="section relative">
      {/* Background elements */}

      <div className="container" style={{ position: "relative", zIndex: 10 }}>
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1
            style={{
              fontSize: "3rem",
              fontWeight: "bold",
              marginBottom: "1rem",
            }}
          >
            <span className="gradient-text">{t("title_prefix")}</span>
          </h1>
          <p
            style={{
              fontSize: "1.25rem",
              color: "#d4d4d4",
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            {t("description_large")}
          </p>
        </div>

        {/* Company Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 animate-fade-in-up">
          <div className="glass p-6 rounded-2xl text-center">
            <div className="text-accent-blue text-3xl mb-4">🚀</div>
            <h3 className="text-xl font-semibold text-white mb-2">
              {t("company_values.value_1_title")}
            </h3>
            <p className="text-trust-gray-400">
              {t("company_values.value_1_description")}
            </p>
          </div>
          <div className="glass p-6 rounded-2xl text-center">
            <div className="text-accent-blue text-3xl mb-4">🤝</div>
            <h3 className="text-xl font-semibold text-white mb-2">
              {t("company_values.value_2_title")}
            </h3>
            <p className="text-trust-gray-400">
              {t("company_values.value_2_description")}
            </p>
          </div>
          <div className="glass p-6 rounded-2xl text-center">
            <div className="text-accent-blue text-3xl mb-4">🌍</div>
            <h3 className="text-xl font-semibold text-white mb-2">
              {t("company_values.value_3_title")}
            </h3>
            <p className="text-trust-gray-400">
              {t("company_values.value_3_description")}
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
            {t("open_positions.title")}{" "}
            {jobs.length > 0 && (
              <span className="text-accent-blue">({jobs.length})</span>
            )}
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
                {t("open_positions.again")}
              </button>
            </div>
          )}

          {!loading && !error && jobs.length === 0 && (
            <div className="glass p-12 rounded-2xl text-center">
              <div className="text-accent-blue text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {t("open_positions.no_founds")}
              </h3>
              <p className="text-trust-gray-400 mb-6">
                {t("open_positions.try_filters")}
              </p>
              <button onClick={() => setFilters({})} className="btn-secondary">
                {t("open_positions.clear_filters")}
              </button>
            </div>
          )}

          {!loading && !error && jobs.length > 0 && (
            <div className="space-y-6">
              {jobs.map((job, index) => (
                <div
                  key={job.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <JobCard job={job} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Call to Action */}
        <div className="glass p-8 rounded-2xl text-center mt-16 animate-fade-in-up">
          <h3 className="text-2xl font-semibold text-white mb-4">
            {t("call_to_action.title")}
          </h3>
          <p className="text-trust-gray-400 mb-6 max-w-2xl mx-auto">
            {t("call_to_action.description")}
          </p>
          <a
            href="mailto:careers@codenixai.com?subject=General Application"
            className="btn-primary"
          >
            {t("call_to_action.bottom")}
          </a>
        </div>
      </div>
    </section>
  );
}
