import Link from 'next/link';
import { Job } from '@/types/careers';

interface JobCardProps {
  job: Job;
}

export default function JobCard({ job }: JobCardProps) {
  const formatSalary = (min?: number, max?: number, currency = 'USD') => {
    if (!min && !max) return null;

    const format = (amount: number) => {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(amount);
    };

    if (min && max) {
      return `${format(min)} - ${format(max)}`;
    }
    return format(min || max || 0);
  };

  const getJobTypeColor = (type: string) => {
    switch (type) {
      case 'full-time':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'part-time':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'contract':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'internship':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      default:
        return 'bg-trust-gray-700/20 text-trust-gray-400 border-trust-gray-600/30';
    }
  };

  const getRemoteTypeIcon = (type: string) => {
    switch (type) {
      case 'remote':
        return '🌍';
      case 'hybrid':
        return '🏢';
      case 'onsite':
        return '🏛️';
      default:
        return '📍';
    }
  };

  return (
    <div className="glass p-6 rounded-2xl hover:bg-white/[0.02] transition-all duration-300 group">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <h3 className="text-xl font-semibold text-white group-hover:text-accent-blue transition-colors">
              {job.title}
            </h3>
            {job.featured && (
              <span className="bg-accent-blue/20 text-accent-blue text-xs font-medium px-2 py-1 rounded-full border border-accent-blue/30">
                ✨ Featured
              </span>
            )}
            <span className={`text-xs font-medium px-2 py-1 rounded-full border ${getJobTypeColor(job.job_type)}`}>
              {job.job_type.replace('-', ' ').toUpperCase()}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-trust-gray-400 mb-4">
            <span className="flex items-center gap-1">🏢 {job.department}</span>
            <span className="flex items-center gap-1">
              {getRemoteTypeIcon(job.remote_type)} {job.location}
            </span>
            <span className="flex items-center gap-1">
              📊 {job.job_level.charAt(0).toUpperCase() + job.job_level.slice(1)} Level
            </span>
            {formatSalary(job.salary_min, job.salary_max, job.currency) && (
              <span className="flex items-center gap-1">
                💰 {formatSalary(job.salary_min, job.salary_max, job.currency)}
              </span>
            )}
          </div>

          <p className="text-trust-gray-300 leading-relaxed line-clamp-2">{job.description}</p>

          <div className="flex flex-wrap items-center gap-2 mt-4">
            <span className="text-xs text-trust-gray-500">
              📅 Posted {new Date(job.created_at).toLocaleDateString()}
            </span>
            {job.applications_count > 0 && (
              <span className="text-xs text-trust-gray-500">
                👥 {job.applications_count} applicant{job.applications_count !== 1 ? 's' : ''}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 lg:flex-col xl:flex-row">
          <Link href={`/careers/${job.slug}`} className="btn-secondary text-center">
            View Details
          </Link>
          <Link href={`/careers/${job.slug}/apply`} className="btn-primary text-center">
            Apply Now
          </Link>
        </div>
      </div>
    </div>
  );
}
