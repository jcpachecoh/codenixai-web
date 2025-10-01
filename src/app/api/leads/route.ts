import { NextRequest, NextResponse } from 'next/server';
import { LeadService } from '@/services/leadService';
import { SlackService } from '@/services/slackService';
import { z } from 'zod';

// Validation schema for lead data
const leadSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name too long'),
  email: z.string().email('Please enter a valid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(1000, 'Message too long'),
  phone: z.string().optional(),
  company: z.string().optional(),
  locale: z.string().optional(),
  source: z.string().optional(),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();

    // Validate data
    const validatedData = leadSchema.parse(body);

    // Extract UTM parameters from headers if not provided (for future use)
    // const userAgent = request.headers.get('user-agent') || '';
    // const referer = request.headers.get('referer') || '';

    // Create lead with additional metadata
    const leadData = {
      ...validatedData,
      source: validatedData.source || 'contact_form',
      // Add IP address for analytics (optional)
      // ip: request.ip || request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip'),
    };

    // Check if email already exists (optional - currently allowing duplicates)
    // const { exists, error: checkError } = await LeadService.emailExists(validatedData.email);
    // You can uncomment above and add logic to handle duplicate emails

    // Create the lead
    const { success, data, error } = await LeadService.createLead(leadData);

    if (!success || error) {
      return NextResponse.json({ success: false, error: error || 'Failed to create lead' }, { status: 500 });
    }

    // Send Slack notification (non-blocking)
    SlackService.sendNewLeadNotification(leadData).catch(slackError => {
      console.error('Failed to send Slack notification:', slackError);
      // Don't fail the API call if Slack notification fails
    });

    // Send success response
    return NextResponse.json({
      success: true,
      message: 'Lead created successfully',
      leadId: data?.id,
    });
  } catch (error) {
    console.error('API Error - Create Lead:', error);

    // Handle validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid data provided',
          details: error.issues.map(err => ({
            field: err.path.join('.'),
            message: err.message,
          })),
        },
        { status: 400 }
      );
    }

    // Handle other errors
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

// GET endpoint to retrieve leads (protected - you might want to add authentication)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = Math.min(parseInt(searchParams.get('limit') || '50'), 100);
    const offset = parseInt(searchParams.get('offset') || '0');

    // You should add authentication here
    // const session = await getServerSession(authOptions);
    // if (!session || !session.user?.isAdmin) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    const { data: leads, error } = await LeadService.getLeads(limit);

    if (error) {
      return NextResponse.json({ success: false, error: error || 'Failed to fetch leads' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      leads,
      pagination: {
        limit,
        offset,
        total: leads?.length || 0,
      },
    });
  } catch (error) {
    console.error('API Error - Get Leads:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
