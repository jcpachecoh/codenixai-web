import { supabase, supabaseAdmin } from '@/lib/supabase';
import {
  Job,
  JobApplication,
  CreateJobApplicationData,
  JobSearchParams,
  JobApplicationSearchParams,
  JobWithApplications,
} from '@/types/careers';

export class CareersService {
  /**
   * Get all active jobs with optional filtering
   */
  static async getJobs(params?: JobSearchParams): Promise<{ data: Job[] | null; error: string | null }> {
    try {
      if (!supabase) {
        return { data: null, error: 'Database connection not configured' };
      }

      let query = supabase
        .from('jobs')
        .select('*')
        .eq('is_active', true)
        .order('featured', { ascending: false })
        .order('created_at', { ascending: false });

      // Apply filters
      if (params?.department) {
        query = query.eq('department', params.department);
      }
      if (params?.job_type) {
        query = query.eq('job_type', params.job_type);
      }
      if (params?.job_level) {
        query = query.eq('job_level', params.job_level);
      }
      if (params?.remote_type) {
        query = query.eq('remote_type', params.remote_type);
      }
      if (params?.featured !== undefined) {
        query = query.eq('featured', params.featured);
      }
      if (params?.search) {
        query = query.or(
          `title.ilike.%${params.search}%,description.ilike.%${params.search}%,requirements.ilike.%${params.search}%`
        );
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching jobs:', error);
        return { data: null, error: error.message };
      }

      return { data: data as Job[], error: null };
    } catch (error: unknown) {
      console.error('Error fetching jobs:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return { data: null, error: errorMessage };
    }
  }

  /**
   * Get a single job by slug
   */
  static async getJobBySlug(slug: string): Promise<{ data: Job | null; error: string | null }> {
    try {
      if (!supabase) {
        return { data: null, error: 'Database connection not configured' };
      }

      const { data, error } = await supabase.from('jobs').select('*').eq('slug', slug).eq('is_active', true).single();

      if (error) {
        console.error('Error fetching job:', error);
        return { data: null, error: error.message };
      }

      return { data: data as Job, error: null };
    } catch (error: unknown) {
      console.error('Error fetching job:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return { data: null, error: errorMessage };
    }
  }

  /**
   * Get unique departments for filtering
   */
  static async getDepartments(): Promise<{ data: string[] | null; error: string | null }> {
    try {
      if (!supabase) {
        return { data: null, error: 'Database connection not configured' };
      }

      const { data, error } = await supabase.from('jobs').select('department').eq('is_active', true);

      if (error) {
        console.error('Error fetching departments:', error);
        return { data: null, error: error.message };
      }

      const departments = [...new Set(data.map(item => item.department))].sort();
      return { data: departments, error: null };
    } catch (error: unknown) {
      console.error('Error fetching departments:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return { data: null, error: errorMessage };
    }
  }

  /**
   * Submit a job application
   */
  static async submitApplication(
    applicationData: CreateJobApplicationData
  ): Promise<{ success: boolean; data?: JobApplication; error?: string }> {
    try {
      // Use admin client for creating applications to bypass RLS issues
      const client = supabaseAdmin || supabase;

      if (!client) {
        console.warn('Supabase not configured. Application data:', applicationData);
        return {
          success: false,
          error: 'Database connection not configured. Please set up your Supabase environment variables.',
        };
      }

      const { data, error } = await client.from('job_applications').insert([applicationData]).select().single();

      if (error) {
        console.error('Error creating job application:', error);
        return { success: false, error: error.message };
      }

      return { success: true, data: data as JobApplication };
    } catch (error: unknown) {
      console.error('Error creating job application:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return { success: false, error: errorMessage };
    }
  }

  /**
   * Get job applications (admin only)
   */
  static async getJobApplications(
    params?: JobApplicationSearchParams
  ): Promise<{ data: JobApplication[] | null; error: string | null }> {
    try {
      const client = supabaseAdmin || supabase;

      if (!client) {
        return { data: null, error: 'Database connection not configured' };
      }

      let query = client
        .from('job_applications')
        .select(
          `
          *,
          job:jobs(title, department)
        `
        )
        .order('created_at', { ascending: false });

      // Apply filters
      if (params?.job_id) {
        query = query.eq('job_id', params.job_id);
      }
      if (params?.status) {
        query = query.eq('status', params.status);
      }
      if (params?.date_from) {
        query = query.gte('created_at', params.date_from);
      }
      if (params?.date_to) {
        query = query.lte('created_at', params.date_to);
      }
      if (params?.search) {
        query = query.or(
          `first_name.ilike.%${params.search}%,last_name.ilike.%${params.search}%,email.ilike.%${params.search}%,current_company.ilike.%${params.search}%`
        );
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching job applications:', error);
        return { data: null, error: error.message };
      }

      return { data: data as JobApplication[], error: null };
    } catch (error: unknown) {
      console.error('Error fetching job applications:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return { data: null, error: errorMessage };
    }
  }

  /**
   * Update job application status (admin only)
   */
  static async updateApplicationStatus(id: string, status: string): Promise<{ success: boolean; error?: string }> {
    try {
      const client = supabaseAdmin || supabase;

      if (!client) {
        return { success: false, error: 'Database connection not configured' };
      }

      const { error } = await client
        .from('job_applications')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) {
        console.error('Error updating application status:', error);
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error: unknown) {
      console.error('Error updating application status:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return { success: false, error: errorMessage };
    }
  }

  /**
   * Get jobs with application statistics (admin only)
   */
  static async getJobsWithStats(): Promise<{ data: JobWithApplications[] | null; error: string | null }> {
    try {
      const client = supabaseAdmin || supabase;

      if (!client) {
        return { data: null, error: 'Database connection not configured' };
      }

      const { data, error } = await client.from('job_listings').select('*').order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching jobs with stats:', error);
        return { data: null, error: error.message };
      }

      return { data: data as JobWithApplications[], error: null };
    } catch (error: unknown) {
      console.error('Error fetching jobs with stats:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return { data: null, error: errorMessage };
    }
  }
}
