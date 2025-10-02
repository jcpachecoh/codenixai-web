import { Metadata } from 'next';
import JobDetailSection from '@/components/careers/JobDetailSection';

type PageParams = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const paramsObj = await params;
  const { slug } = paramsObj;

  // Fetch job data for metadata
  const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/jobs/${slug}`);
  const result = await response.json();

  if (!result.success || !result.data) {
    return {
      title: 'Job Not Found - CodenixAI',
      description: 'The requested job position could not be found.',
    };
  }

  const job = result.data;

  return {
    title: `${job.title} - CodenixAI Careers`,
    description: job.description.substring(0, 160) + '...',
    keywords: `${job.title}, ${job.department}, ${job.job_type}, ${job.location}, careers, jobs`,
  };
}

export default async function JobDetailPage({ params }: PageParams) {
  const { slug } = await params;

  return (
    <div className="pt-24">
      <JobDetailSection slug={slug} />
    </div>
  );
}
