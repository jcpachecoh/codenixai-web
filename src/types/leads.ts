// Types for the leads system

export type LeadStatus =
  | "new"
  | "contacted"
  | "qualified"
  | "proposal"
  | "closed"
  | "lost";
export type LeadSource =
  | "contact_form"
  | "whatsapp_automation_form"
  | "career_application"
  | "newsletter"
  | "referral"
  | "social_media"
  | "google_ads"
  | "organic_search"
  | "direct"
  | "other";

export interface CreateLeadData {
  name: string;
  email: string;
  message: string;
  phone?: string;
  company?: string;
  locale?: string;
  source?: LeadSource;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  ip_address?: string;
  user_agent?: string;
  referrer?: string;
}

export interface UpdateLeadData {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  message?: string;
  status?: LeadStatus;
  notes?: string;
  assigned_to?: string;
  priority?: number;
  value?: number;
  currency?: string;
  follow_up_date?: string;
  last_contact_date?: string;
  conversion_date?: string;
}

export interface Lead extends CreateLeadData {
  id: string;
  status: LeadStatus;
  notes?: string;
  assigned_to?: string;
  priority: number;
  value?: number;
  currency?: string;
  follow_up_date?: string;
  last_contact_date?: string;
  conversion_date?: string;
  created_at: string;
  updated_at: string;
}

export interface LeadFilters {
  status?: LeadStatus[];
  source?: LeadSource[];
  dateFrom?: string;
  dateTo?: string;
  search?: string;
  assignedTo?: string;
  minValue?: number;
  maxValue?: number;
}

export interface LeadQueryOptions {
  limit?: number;
  offset?: number;
  orderBy?: keyof Lead;
  orderDirection?: "asc" | "desc";
  filters?: LeadFilters;
}

export interface LeadStats {
  total: number;
  new: number;
  contacted: number;
  qualified: number;
  closed: number;
  lost: number;
  totalValue: number;
  averageValue: number;
  conversionRate: number;
}

export interface PaginatedLeads {
  data: Lead[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
