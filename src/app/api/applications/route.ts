import { NextRequest, NextResponse } from 'next/server';
import { CareersService } from '@/services/careersService';
import { SlackService } from '@/services/slackService';
import { z } from 'zod';
import { ApplicationStatus } from '@/types/careers';

// Validation schema for job application data
const applicationSchema = z.object({
  job_id: z.string().uuid('Invalid job ID'),
  first_name: z.string().min(2, 'First name must be at least 2 characters').max(100, 'First name too long'),
  last_name: z.string().min(2, 'Last name must be at least 2 characters').max(100, 'Last name too long'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  linkedin_url: z.string().url('Please enter a valid LinkedIn URL').optional().or(z.literal('')),
  portfolio_url: z.string().url('Please enter a valid portfolio URL').optional().or(z.literal('')),
  resume_url: z.string().url('Please enter a valid resume URL').optional().or(z.literal('')),
  cover_letter: z.string().max(2000, 'Cover letter too long').optional(),
  experience_years: z.number().min(0).max(50).optional(),
  current_position: z.string().max(200, 'Current position too long').optional(),
  current_company: z.string().max(200, 'Current company too long').optional(),
  why_interested: z.string().max(1000, 'Response too long').optional(),
  availability_date: z.string().optional(),
  salary_expectation: z.number().min(0).optional(),
  source: z.string().optional(),
  locale: z.string().optional(),
  utm_source: z.string().optional(),
  utm_medium: z.string().optional(),
  utm_campaign: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();

    // Validate data
    const validatedData = applicationSchema.parse(body);

    // Add metadata
    const applicationData = {
      ...validatedData,
      source: validatedData.source || 'website',
      // Note: request.ip is not available in Next.js 13+, using headers instead
      ip_address: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || undefined,
      user_agent: request.headers.get('user-agent') || undefined,
    };

    // Submit the application
    const { success, data, error } = await CareersService.submitApplication(applicationData);

    if (!success || error) {
      return NextResponse.json({ success: false, error: error || 'Failed to submit application' }, { status: 500 });
    }

    // Send Slack notification for job applications (non-blocking)
    if (data) {
      SlackService.sendSimpleNotification(
        `🚀 *New Job Application!*\n\n` +
          `*Position:* ${body.job_title || 'Unknown'}\n` +
          `*Candidate:* ${validatedData.first_name} ${validatedData.last_name}\n` +
          `*Email:* ${validatedData.email}\n` +
          `*Experience:* ${validatedData.experience_years || 'Not specified'} years\n` +
          `*Current Role:* ${validatedData.current_position || 'Not specified'}\n` +
          `*Company:* ${validatedData.current_company || 'Not specified'}\n\n` +
          `📅 Applied at ${new Date().toLocaleString()}`
      ).catch(slackError => {
        console.error('Failed to send Slack notification:', slackError);
      });
    }

    // Send success response
    return NextResponse.json({
      success: true,
      message: 'Application submitted successfully',
      applicationId: data?.id,
    });
  } catch (error) {
    console.error('API Error - Submit Application:', error);

    // Handle validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          details: error.issues.map(err => ({
            field: err.path.join('.'),
            message: err.message,
          })),
        },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Parse query parameters for filtering applications (admin only)
    const job_id = searchParams.get('job_id') || undefined;
    const status = (searchParams.get('status') as ApplicationStatus) || undefined;
    const search = searchParams.get('search') || undefined;
    const date_from = searchParams.get('date_from') || undefined;
    const date_to = searchParams.get('date_to') || undefined;

    const { data, error } = await CareersService.getJobApplications({
      job_id,
      status,
      search,
      date_from,
      date_to,
    });

    if (error) {
      return NextResponse.json({ success: false, error }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error('API Error - Get Applications:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
