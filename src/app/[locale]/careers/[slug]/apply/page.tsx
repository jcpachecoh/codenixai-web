import { Metadata } from 'next';
import JobApplicationForm from '@/components/careers/JobApplicationForm';

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001';
    const response = await fetch(`${baseUrl}/api/jobs/${slug}`, {
      cache: 'no-store',
    });
    const result = await response.json();

    if (result.success && result.data) {
      const job = result.data;
      return {
        title: `Apply for ${job.title} - CodeNixAI Careers`,
        description: `Submit your application for the ${job.title} position at CodeNixAI. Join our team and help shape the future of AI development.`,
        openGraph: {
          title: `Apply for ${job.title} - CodeNixAI`,
          description: `Submit your application for the ${job.title} position at CodeNixAI.`,
          type: 'website',
        },
      };
    }
  } catch (error) {
    console.error('Error generating metadata:', error);
  }

  return {
    title: 'Apply for Position - CodeNixAI Careers',
    description: 'Submit your job application to join the CodeNixAI team',
  };
}

export default async function JobApplicationPage({ params }: PageProps) {
  const { slug } = await params;

  return (
    <div className="pt-24">
      <JobApplicationForm slug={slug} />
    </div>
  );
}
