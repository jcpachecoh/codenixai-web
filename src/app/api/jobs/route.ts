import { NextRequest, NextResponse } from 'next/server';
import { CareersService } from '@/services/careersService';
import { JobType, JobLevel, RemoteType } from '@/types/careers';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Parse query parameters
    const department = searchParams.get('department') || undefined;
    const job_type = (searchParams.get('job_type') as JobType) || undefined;
    const job_level = (searchParams.get('job_level') as JobLevel) || undefined;
    const remote_type = (searchParams.get('remote_type') as RemoteType) || undefined;
    const featured = searchParams.get('featured') ? searchParams.get('featured') === 'true' : undefined;
    const search = searchParams.get('search') || undefined;

    const { data, error } = await CareersService.getJobs({
      department,
      job_type,
      job_level,
      remote_type,
      featured,
      search,
    });

    if (error) {
      return NextResponse.json({ success: false, error }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error('API Error - Get Jobs:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
