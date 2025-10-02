import { supabase, supabaseAdmin } from '@/lib/supabase';

export interface CreateLeadData {
  name: string;
  email: string;
  message: string;
  phone?: string;
  company?: string;
  locale?: string;
  source?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
}

export interface Lead extends CreateLeadData {
  id: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export class LeadService {
  /**
   * Create a new lead in the database
   */
  static async createLead(leadData: CreateLeadData): Promise<{ success: boolean; data?: Lead; error?: string }> {
    try {
      // Use admin client for creating leads to bypass RLS issues
      const client = supabaseAdmin || supabase;

      if (!client) {
        console.warn('Supabase not configured. Lead data:', leadData);
        return {
          success: false,
          error: 'Database connection not configured. Please set up your Supabase environment variables.',
        };
      }

      const { data, error } = await client.from('leads').insert([leadData]).select().single();

      if (error) {
        console.error('Error creating lead:', error);
        return { success: false, error: error.message };
      }

      return { success: true, data: data as Lead };
    } catch (error: unknown) {
      console.error('Error creating lead:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return { success: false, error: errorMessage };
    }
  }

  /**
   * Get all leads with optional filters
   */
  static async getLeads(limit?: number): Promise<{ data: Lead[] | null; error: string | null }> {
    try {
      if (!supabase) {
        return { data: null, error: 'Database connection not configured' };
      }

      let query = supabase.from('leads').select('*').order('created_at', { ascending: false });

      if (limit) {
        query = query.limit(limit);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching leads:', error);
        return { data: null, error: error.message };
      }

      return { data: data as Lead[], error: null };
    } catch (error: unknown) {
      console.error('Error fetching leads:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return { data: null, error: errorMessage };
    }
  }

  /**
   * Update lead status
   */
  static async updateLeadStatus(id: string, status: string): Promise<{ success: boolean; error?: string }> {
    try {
      if (!supabase) {
        return { success: false, error: 'Database connection not configured' };
      }

      const { error } = await supabase
        .from('leads')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) {
        console.error('Error updating lead status:', error);
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error: unknown) {
      console.error('Error updating lead status:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return { success: false, error: errorMessage };
    }
  }

  /**
   * Check if email already exists
   */
  static async emailExists(email: string): Promise<{ exists: boolean; error?: string }> {
    try {
      if (!supabase) {
        return { exists: false, error: 'Database connection not configured' };
      }

      const { data, error } = await supabase.from('leads').select('id').eq('email', email).single();

      if (error && error.code !== 'PGRST116') {
        // PGRST116 is "not found" error
        console.error('Error checking email:', error);
        return { exists: false, error: error.message };
      }

      return { exists: !!data };
    } catch (error: unknown) {
      console.error('Error checking email:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return { exists: false, error: errorMessage };
    }
  }
}
