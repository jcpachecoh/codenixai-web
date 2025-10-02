// Types for careers system

export type JobType = 'full-time' | 'part-time' | 'contract' | 'internship';
export type JobLevel = 'entry' | 'mid' | 'senior' | 'lead' | 'manager' | 'director';
export type RemoteType = 'remote' | 'hybrid' | 'onsite';
export type ApplicationStatus = 'new' | 'reviewing' | 'interview' | 'rejected' | 'hired';

export interface Job {
  id: string;
  title: string;
  slug: string;
  department: string;
  job_type: JobType;
  job_level: JobLevel;
  remote_type: RemoteType;
  location: string;
  salary_min?: number;
  salary_max?: number;
  currency: string;
  description: string;
  requirements: string;
  responsibilities: string;
  benefits?: string;
  is_active: boolean;
  featured: boolean;
  applications_count: number;
  created_at: string;
  updated_at: string;
}

export interface CreateJobApplicationData {
  job_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  linkedin_url?: string;
  portfolio_url?: string;
  resume_url?: string;
  cover_letter?: string;
  experience_years?: number;
  current_position?: string;
  current_company?: string;
  why_interested?: string;
  availability_date?: string;
  salary_expectation?: number;
  source?: string;
  locale?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
}

export interface JobApplication extends CreateJobApplicationData {
  id: string;
  status: ApplicationStatus;
  ip_address?: string;
  user_agent?: string;
  created_at: string;
  updated_at: string;
}

export interface JobWithApplications extends Job {
  total_applications: number;
  new_applications: number;
}

export interface JobSearchParams {
  department?: string;
  job_type?: JobType;
  job_level?: JobLevel;
  remote_type?: RemoteType;
  location?: string;
  featured?: boolean;
  search?: string; // Search in title, description, requirements
}

export interface JobApplicationSearchParams {
  job_id?: string;
  status?: ApplicationStatus;
  search?: string; // Search in name, email, current_company
  date_from?: string;
  date_to?: string;
}
