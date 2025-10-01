export interface Database {
  public: {
    Tables: {
      leads: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone?: string;
          company?: string;
          message: string;
          source: string;
          status: 'new' | 'contacted' | 'qualified' | 'converted' | 'closed';
          created_at: string;
          updated_at: string;
          locale?: string;
          utm_source?: string;
          utm_medium?: string;
          utm_campaign?: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          phone?: string;
          company?: string;
          message: string;
          source?: string;
          status?: 'new' | 'contacted' | 'qualified' | 'converted' | 'closed';
          created_at?: string;
          updated_at?: string;
          locale?: string;
          utm_source?: string;
          utm_medium?: string;
          utm_campaign?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          phone?: string;
          company?: string;
          message?: string;
          source?: string;
          status?: 'new' | 'contacted' | 'qualified' | 'converted' | 'closed';
          created_at?: string;
          updated_at?: string;
          locale?: string;
          utm_source?: string;
          utm_medium?: string;
          utm_campaign?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      lead_status: 'new' | 'contacted' | 'qualified' | 'converted' | 'closed';
    };
  };
}

// Helper types for easier usage
export type Lead = Database['public']['Tables']['leads']['Row'];
export type LeadInsert = Database['public']['Tables']['leads']['Insert'];
export type LeadUpdate = Database['public']['Tables']['leads']['Update'];
export type LeadStatus = Database['public']['Enums']['lead_status'];
