import { supabase, supabaseAdmin } from "@/lib/supabase";
import {
  CreateLeadData,
  UpdateLeadData,
  Lead,
  LeadQueryOptions,
  LeadStats,
  PaginatedLeads,
  LeadStatus,
} from "@/types/leads";

export class LeadService {
  /**
   * Create a new lead in the database
   */
  static async createLead(
    leadData: CreateLeadData
  ): Promise<{ success: boolean; data?: Lead; error?: string }> {
    try {
      console.log("Creating lead with data:", leadData);

      // Validate required fields
      if (
        !leadData.name?.trim() ||
        !leadData.email?.trim() ||
        !leadData.message?.trim()
      ) {
        return {
          success: false,
          error: "Faltan campos requeridos (nombre, email, mensaje).",
        };
      }

      // Use admin client for creating leads to bypass RLS
      const client = supabaseAdmin || supabase;

      if (!client) {
        console.error(
          "Supabase not configured. Missing environment variables."
        );
        return {
          success: false,
          error:
            "Base de datos no configurada. Por favor contacta al administrador.",
        };
      }

      // Prepare data for insertion
      const insertData = {
        name: leadData.name.trim(),
        email: leadData.email.trim().toLowerCase(),
        message: leadData.message.trim(),
        phone: leadData.phone?.trim() || null,
        company: leadData.company?.trim() || null,
        locale: leadData.locale || "en",
        source: leadData.source || "contact_form",
        utm_source: leadData.utm_source || null,
        utm_medium: leadData.utm_medium || null,
        utm_campaign: leadData.utm_campaign || null,
        utm_content: leadData.utm_content || null,
        utm_term: leadData.utm_term || null,
        ip_address: leadData.ip_address || null,
        user_agent: leadData.user_agent || null,
        referrer: leadData.referrer || null,
        status: "new" as LeadStatus,
        priority: 5, // Default medium priority
      };

      const { data, error } = await client
        .from("leads")
        .insert([insertData])
        .select()
        .single();

      if (error) {
        console.error("Supabase error creating lead:", error);

        // Handle specific Supabase errors
        if (error.code === "23505") {
          return {
            success: false,
            error: "Este email ya existe en nuestro sistema.",
          };
        } else if (error.code === "PGRST301") {
          return {
            success: false,
            error: "Error de permisos en la base de datos.",
          };
        } else {
          return {
            success: false,
            error: `Error de base de datos: ${error.message}`,
          };
        }
      }

      console.log("Lead created successfully:", data);
      return { success: true, data: data as Lead };
    } catch (error: unknown) {
      console.error("Unexpected error creating lead:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Error desconocido";
      return { success: false, error: `Error inesperado: ${errorMessage}` };
    }
  }

  /**
   * Get leads with pagination and filtering
   */
  static async getLeads(
    options: LeadQueryOptions = {}
  ): Promise<{ success: boolean; data?: PaginatedLeads; error?: string }> {
    try {
      const client = supabase;

      if (!client) {
        return {
          success: false,
          error: "Base de datos no configurada.",
        };
      }

      const {
        limit = 50,
        offset = 0,
        orderBy = "created_at",
        orderDirection = "desc",
        filters = {},
      } = options;

      // Build the query
      let query = client.from("leads").select("*", { count: "exact" });

      // Apply filters
      if (filters.status && filters.status.length > 0) {
        query = query.in("status", filters.status);
      }

      if (filters.source && filters.source.length > 0) {
        query = query.in("source", filters.source);
      }

      if (filters.dateFrom) {
        query = query.gte("created_at", filters.dateFrom);
      }

      if (filters.dateTo) {
        query = query.lte("created_at", filters.dateTo);
      }

      if (filters.search) {
        query = query.or(
          `name.ilike.%${filters.search}%,email.ilike.%${filters.search}%,company.ilike.%${filters.search}%`
        );
      }

      if (filters.assignedTo) {
        query = query.eq("assigned_to", filters.assignedTo);
      }

      if (filters.minValue !== undefined) {
        query = query.gte("value", filters.minValue);
      }

      if (filters.maxValue !== undefined) {
        query = query.lte("value", filters.maxValue);
      }

      // Apply ordering and pagination
      query = query
        .order(orderBy, { ascending: orderDirection === "asc" })
        .range(offset, offset + limit - 1);

      const { data, error, count } = await query;

      if (error) {
        console.error("Error fetching leads:", error);
        return { success: false, error: error.message };
      }

      const totalPages = Math.ceil((count || 0) / limit);
      const currentPage = Math.floor(offset / limit) + 1;

      return {
        success: true,
        data: {
          data: data as Lead[],
          total: count || 0,
          page: currentPage,
          limit,
          totalPages,
        },
      };
    } catch (error: unknown) {
      console.error("Error fetching leads:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Error desconocido";
      return { success: false, error: errorMessage };
    }
  }

  /**
   * Get a single lead by ID
   */
  static async getLeadById(
    id: string
  ): Promise<{ success: boolean; data?: Lead; error?: string }> {
    try {
      const client = supabase;

      if (!client) {
        return { success: false, error: "Base de datos no configurada." };
      }

      const { data, error } = await client
        .from("leads")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        if (error.code === "PGRST116") {
          return { success: false, error: "Lead no encontrado." };
        }
        console.error("Error fetching lead:", error);
        return { success: false, error: error.message };
      }

      return { success: true, data: data as Lead };
    } catch (error: unknown) {
      console.error("Error fetching lead:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Error desconocido";
      return { success: false, error: errorMessage };
    }
  }

  /**
   * Update a lead
   */
  static async updateLead(
    id: string,
    updateData: UpdateLeadData
  ): Promise<{ success: boolean; data?: Lead; error?: string }> {
    try {
      const client = supabase;

      if (!client) {
        return { success: false, error: "Base de datos no configurada." };
      }

      // Prepare update data
      const updatedData = {
        ...updateData,
        updated_at: new Date().toISOString(),
      };

      // Remove undefined values
      Object.keys(updatedData).forEach((key) => {
        if (updatedData[key as keyof typeof updatedData] === undefined) {
          delete updatedData[key as keyof typeof updatedData];
        }
      });

      const { data, error } = await client
        .from("leads")
        .update(updatedData)
        .eq("id", id)
        .select()
        .single();

      if (error) {
        console.error("Error updating lead:", error);
        return { success: false, error: error.message };
      }

      return { success: true, data: data as Lead };
    } catch (error: unknown) {
      console.error("Error updating lead:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Error desconocido";
      return { success: false, error: errorMessage };
    }
  }

  /**
   * Delete a lead
   */
  static async deleteLead(
    id: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const client = supabase;

      if (!client) {
        return { success: false, error: "Base de datos no configurada." };
      }

      const { error } = await client.from("leads").delete().eq("id", id);

      if (error) {
        console.error("Error deleting lead:", error);
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error: unknown) {
      console.error("Error deleting lead:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Error desconocido";
      return { success: false, error: errorMessage };
    }
  }

  /**
   * Update lead status
   */
  static async updateLeadStatus(
    id: string,
    status: LeadStatus,
    notes?: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const updateData: UpdateLeadData = {
        status,
        notes,
      };

      // Set specific dates based on status
      if (status === "contacted") {
        updateData.last_contact_date = new Date().toISOString();
      } else if (status === "closed") {
        updateData.conversion_date = new Date().toISOString();
      }

      const result = await this.updateLead(id, updateData);
      return { success: result.success, error: result.error };
    } catch (error: unknown) {
      console.error("Error updating lead status:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Error desconocido";
      return { success: false, error: errorMessage };
    }
  }

  /**
   * Get lead statistics
   */
  static async getLeadStats(): Promise<{
    success: boolean;
    data?: LeadStats;
    error?: string;
  }> {
    try {
      const client = supabase;

      if (!client) {
        return { success: false, error: "Base de datos no configurada." };
      }

      // Get basic counts by status
      const { data: statusCounts, error: statusError } = await client
        .from("leads")
        .select("status")
        .not("status", "is", null);

      if (statusError) {
        console.error("Error fetching status counts:", statusError);
        return { success: false, error: statusError.message };
      }

      // Get value statistics
      const { data: valueStats, error: valueError } = await client
        .from("leads")
        .select("value, status")
        .not("value", "is", null);

      if (valueError) {
        console.error("Error fetching value stats:", valueError);
        return { success: false, error: valueError.message };
      }

      // Calculate statistics
      const total = statusCounts.length;
      const statusGroups = statusCounts.reduce((acc, lead) => {
        acc[lead.status] = (acc[lead.status] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const totalValue = valueStats.reduce(
        (sum, lead) => sum + (lead.value || 0),
        0
      );
      const averageValue =
        valueStats.length > 0 ? totalValue / valueStats.length : 0;
      const closedCount = statusGroups.closed || 0;
      const conversionRate = total > 0 ? (closedCount / total) * 100 : 0;

      const stats: LeadStats = {
        total,
        new: statusGroups.new || 0,
        contacted: statusGroups.contacted || 0,
        qualified: statusGroups.qualified || 0,
        closed: closedCount,
        lost: statusGroups.lost || 0,
        totalValue,
        averageValue,
        conversionRate,
      };

      return { success: true, data: stats };
    } catch (error: unknown) {
      console.error("Error fetching lead stats:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Error desconocido";
      return { success: false, error: errorMessage };
    }
  }

  /**
   * Check if email already exists
   */
  static async emailExists(
    email: string
  ): Promise<{ exists: boolean; error?: string }> {
    try {
      const client = supabase;

      if (!client) {
        return { exists: false, error: "Base de datos no configurada." };
      }

      const { data, error } = await client
        .from("leads")
        .select("id")
        .eq("email", email.toLowerCase())
        .maybeSingle();

      if (error && error.code !== "PGRST116") {
        console.error("Error checking email:", error);
        return { exists: false, error: error.message };
      }

      return { exists: !!data };
    } catch (error: unknown) {
      console.error("Error checking email:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Error desconocido";
      return { exists: false, error: errorMessage };
    }
  }

  /**
   * Bulk update leads
   */
  static async bulkUpdateLeads(
    ids: string[],
    updateData: UpdateLeadData
  ): Promise<{ success: boolean; data?: Lead[]; error?: string }> {
    try {
      const client = supabase;

      if (!client) {
        return { success: false, error: "Base de datos no configurada." };
      }

      const updatedData = {
        ...updateData,
        updated_at: new Date().toISOString(),
      };

      const { data, error } = await client
        .from("leads")
        .update(updatedData)
        .in("id", ids)
        .select();

      if (error) {
        console.error("Error bulk updating leads:", error);
        return { success: false, error: error.message };
      }

      return { success: true, data: data as Lead[] };
    } catch (error: unknown) {
      console.error("Error bulk updating leads:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Error desconocido";
      return { success: false, error: errorMessage };
    }
  }
}
