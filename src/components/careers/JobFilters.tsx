'use client';
import { useState, useEffect } from 'react';
import { JobSearchParams, JobType, JobLevel, RemoteType } from '@/types/careers';

interface JobFiltersProps {
  onFilterChange: (filters: JobSearchParams) => void;
}

export default function JobFilters({ onFilterChange }: JobFiltersProps) {
  const [filters, setFilters] = useState<JobSearchParams>({});
  const [departments, setDepartments] = useState<string[]>([]);

  // Fetch departments on component mount
  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      // For now, we'll use static departments. You can create an API endpoint later
      setDepartments(['Engineering', 'Design', 'Product', 'Marketing', 'Sales', 'Operations']);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  const handleFilterChange = (key: keyof JobSearchParams, value: string | boolean | undefined) => {
    const newFilters = {
      ...filters,
      [key]: value === '' ? undefined : value,
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    setFilters({});
    onFilterChange({});
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== undefined && value !== '' && value !== null);

  return (
    <div className="glass p-6 rounded-2xl">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search */}
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search jobs by title, description, or requirements..."
            value={filters.search || ''}
            onChange={e => handleFilterChange('search', e.target.value)}
            className="w-full px-4 py-2 bg-dark/50 border border-trust-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-blue/50 focus:border-accent-blue/50 text-white placeholder-trust-gray-500"
          />
        </div>

        {/* Department Filter */}
        <div className="min-w-[180px]">
          <select
            value={filters.department || ''}
            onChange={e => handleFilterChange('department', e.target.value)}
            className="w-full px-4 py-2 bg-dark/50 border border-trust-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-blue/50 focus:border-accent-blue/50 text-white"
          >
            <option value="">All Departments</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>

        {/* Job Type Filter */}
        <div className="min-w-[150px]">
          <select
            value={filters.job_type || ''}
            onChange={e => handleFilterChange('job_type', e.target.value as JobType)}
            className="w-full px-4 py-2 bg-dark/50 border border-trust-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-blue/50 focus:border-accent-blue/50 text-white"
          >
            <option value="">All Types</option>
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
            <option value="contract">Contract</option>
            <option value="internship">Internship</option>
          </select>
        </div>

        {/* Job Level Filter */}
        <div className="min-w-[140px]">
          <select
            value={filters.job_level || ''}
            onChange={e => handleFilterChange('job_level', e.target.value as JobLevel)}
            className="w-full px-4 py-2 bg-dark/50 border border-trust-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-blue/50 focus:border-accent-blue/50 text-white"
          >
            <option value="">All Levels</option>
            <option value="entry">Entry</option>
            <option value="mid">Mid</option>
            <option value="senior">Senior</option>
            <option value="lead">Lead</option>
            <option value="manager">Manager</option>
            <option value="director">Director</option>
          </select>
        </div>

        {/* Remote Type Filter */}
        <div className="min-w-[130px]">
          <select
            value={filters.remote_type || ''}
            onChange={e => handleFilterChange('remote_type', e.target.value as RemoteType)}
            className="w-full px-4 py-2 bg-dark/50 border border-trust-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-blue/50 focus:border-accent-blue/50 text-white"
          >
            <option value="">All Locations</option>
            <option value="remote">Remote</option>
            <option value="hybrid">Hybrid</option>
            <option value="onsite">On-site</option>
          </select>
        </div>

        {/* Featured Toggle */}
        <div className="flex items-center">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={filters.featured === true}
              onChange={e => handleFilterChange('featured', e.target.checked || undefined)}
              className="sr-only"
            />
            <div
              className={`relative w-11 h-6 rounded-full transition-colors ${
                filters.featured ? 'bg-accent-blue' : 'bg-trust-gray-700'
              }`}
            >
              <div
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                  filters.featured ? 'translate-x-5' : 'translate-x-0'
                }`}
              ></div>
            </div>
            <span className="ml-2 text-sm text-trust-gray-300">Featured</span>
          </label>
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="px-4 py-2 text-trust-gray-400 hover:text-white transition-colors border border-trust-gray-700 hover:border-trust-gray-600 rounded-lg"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
}
