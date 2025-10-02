import { NextRequest, NextResponse } from 'next/server';
import { CareersService } from '@/services/careersService';

interface RouteParams {
  params: Promise<{ slug: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { slug } = await params;

    const { data, error } = await CareersService.getJobBySlug(slug);

    if (error) {
      return NextResponse.json({ success: false, error }, { status: 500 });
    }

    if (!data) {
      return NextResponse.json({ success: false, error: 'Job not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error('API Error - Get Job by Slug:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
