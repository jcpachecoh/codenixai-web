import { NextRequest, NextResponse } from "next/server";
import { LeadService } from "@/services/leadService";
import { SlackService } from "@/services/slackService";
import { CreateLeadData } from "@/types/leads";
import { z } from "zod";

// Validation schema for lead data
const leadSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name too long"),
  email: z.string().email("Please enter a valid email address"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message too long"),
  phone: z.string().optional(),
  company: z.string().optional(),
  locale: z.string().optional(),
  source: z
    .enum([
      "contact_form",
      "whatsapp_automation_form",
      "career_application",
      "newsletter",
      "referral",
      "social_media",
      "google_ads",
      "organic_search",
      "direct",
      "other",
    ])
    .optional(),
  utm_source: z.string().optional(),
  utm_medium: z.string().optional(),
  utm_campaign: z.string().optional(),
  utm_content: z.string().optional(),
  utm_term: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();

    // Validate data
    const validatedData = leadSchema.parse(body);

    console.log("API - Validated Lead Data:", validatedData);

    // Extract additional metadata
    const userAgent = request.headers.get("user-agent") || undefined;
    const referer = request.headers.get("referer") || undefined;
    const forwarded = request.headers.get("x-forwarded-for") || undefined;
    const realIp = request.headers.get("x-real-ip") || undefined;
    const ipAddress = forwarded || realIp || undefined;

    // Create lead with additional metadata
    const leadData: CreateLeadData = {
      ...validatedData,
      source: validatedData.source || "contact_form",
      ip_address: ipAddress,
      user_agent: userAgent,
      referrer: referer,
    };

    console.log("API - Final lead data:", leadData);

    // Create the lead
    const { success, data, error } = await LeadService.createLead(leadData);

    if (!success || error) {
      console.error("API - Lead creation failed:", error);
      return NextResponse.json(
        { success: false, error: error || "Failed to create lead" },
        { status: 500 }
      );
    }

    console.log("API - Lead created successfully:", data?.id);

    // Send Slack notification (non-blocking)
    SlackService.sendNewLeadNotification(leadData).catch((slackError) => {
      console.error("Failed to send Slack notification:", slackError);
      // Don't fail the API call if Slack notification fails
    });

    // Send success response
    return NextResponse.json({
      success: true,
      message: "Lead created successfully",
      leadId: data?.id,
    });
  } catch (error) {
    console.error("API Error - Create Lead:", error);

    // Handle validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid data provided",
          details: error.issues.map((err) => ({
            field: err.path.join("."),
            message: err.message,
          })),
        },
        { status: 400 }
      );
    }

    // Handle other errors
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve leads (protected - you might want to add authentication)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = Math.min(parseInt(searchParams.get("limit") || "50"), 100);
    const offset = parseInt(searchParams.get("offset") || "0");

    // You should add authentication here
    // const session = await getServerSession(authOptions);
    // if (!session || !session.user?.isAdmin) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    const { success, data, error } = await LeadService.getLeads({
      limit,
      offset,
    });

    if (!success || error) {
      return NextResponse.json(
        { success: false, error: error || "Failed to fetch leads" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      ...data,
    });
  } catch (error) {
    console.error("API Error - Get Leads:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
