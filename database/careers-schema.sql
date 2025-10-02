-- Supabase SQL schema for careers and job applications
-- Run this in your Supabase SQL editor

-- Create enum for job types
CREATE TYPE job_type AS ENUM ('full-time', 'part-time', 'contract', 'internship');

-- Create enum for job levels
CREATE TYPE job_level AS ENUM ('entry', 'mid', 'senior', 'lead', 'manager', 'director');

-- Create enum for remote work options
CREATE TYPE remote_type AS ENUM ('remote', 'hybrid', 'onsite');

-- Create enum for application status
CREATE TYPE application_status AS ENUM ('new', 'reviewing', 'interview', 'rejected', 'hired');

-- Create jobs table
CREATE TABLE IF NOT EXISTS public.jobs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    slug VARCHAR(200) UNIQUE NOT NULL, -- URL-friendly version of title
    department VARCHAR(100) NOT NULL,
    job_type job_type NOT NULL DEFAULT 'full-time',
    job_level job_level NOT NULL DEFAULT 'mid',
    remote_type remote_type NOT NULL DEFAULT 'hybrid',
    location VARCHAR(200) NOT NULL,
    salary_min INTEGER,
    salary_max INTEGER,
    currency VARCHAR(3) DEFAULT 'USD',
    description TEXT NOT NULL,
    requirements TEXT NOT NULL,
    responsibilities TEXT NOT NULL,
    benefits TEXT,
    is_active BOOLEAN DEFAULT true,
    featured BOOLEAN DEFAULT false,
    applications_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create job_applications table
CREATE TABLE IF NOT EXISTS public.job_applications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    job_id UUID REFERENCES public.jobs(id) ON DELETE CASCADE,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    linkedin_url VARCHAR(500),
    portfolio_url VARCHAR(500),
    resume_url VARCHAR(500), -- For file uploads
    cover_letter TEXT,
    experience_years INTEGER,
    current_position VARCHAR(200),
    current_company VARCHAR(200),
    why_interested TEXT,
    availability_date DATE,
    salary_expectation INTEGER,
    status application_status DEFAULT 'new',
    source VARCHAR(50) DEFAULT 'website',
    locale VARCHAR(10) DEFAULT 'en',
    utm_source VARCHAR(100),
    utm_medium VARCHAR(100),
    utm_campaign VARCHAR(100),
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_jobs_slug ON public.jobs (slug);
CREATE INDEX IF NOT EXISTS idx_jobs_department ON public.jobs (department);
CREATE INDEX IF NOT EXISTS idx_jobs_job_type ON public.jobs (job_type);
CREATE INDEX IF NOT EXISTS idx_jobs_is_active ON public.jobs (is_active);
CREATE INDEX IF NOT EXISTS idx_jobs_featured ON public.jobs (featured);
CREATE INDEX IF NOT EXISTS idx_jobs_created_at ON public.jobs (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_job_applications_job_id ON public.job_applications (job_id);
CREATE INDEX IF NOT EXISTS idx_job_applications_email ON public.job_applications (email);
CREATE INDEX IF NOT EXISTS idx_job_applications_status ON public.job_applications (status);
CREATE INDEX IF NOT EXISTS idx_job_applications_created_at ON public.job_applications (created_at DESC);

-- Create updated_at triggers
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language plpgsql;

CREATE TRIGGER update_jobs_updated_at 
    BEFORE UPDATE ON public.jobs 
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_job_applications_updated_at 
    BEFORE UPDATE ON public.job_applications 
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Function to update applications count
CREATE OR REPLACE FUNCTION update_job_applications_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE public.jobs 
        SET applications_count = applications_count + 1 
        WHERE id = NEW.job_id;
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE public.jobs 
        SET applications_count = applications_count - 1 
        WHERE id = OLD.job_id;
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_applications_count
    AFTER INSERT OR DELETE ON public.job_applications
    FOR EACH ROW EXECUTE FUNCTION update_job_applications_count();

-- Enable Row Level Security (RLS)
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;

-- Create policies for jobs table
-- Allow anonymous users to read active jobs
CREATE POLICY "Allow anonymous read active jobs" ON public.jobs
    FOR SELECT
    TO anon
    USING (is_active = true);

-- Allow authenticated users to read all jobs
CREATE POLICY "Allow authenticated users read all jobs" ON public.jobs
    FOR SELECT
    TO authenticated
    USING (true);

-- Allow service role full access to jobs
CREATE POLICY "Allow service role full access to jobs" ON public.jobs
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- Create policies for job_applications table
-- Allow anonymous users to insert applications
CREATE POLICY "Allow anonymous insert applications" ON public.job_applications
    FOR INSERT
    TO anon
    WITH CHECK (true);

-- Allow authenticated users to read all applications
CREATE POLICY "Allow authenticated users read applications" ON public.job_applications
    FOR SELECT
    TO authenticated
    USING (true);

-- Allow service role full access to applications
CREATE POLICY "Allow service role full access to applications" ON public.job_applications
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon;
GRANT SELECT ON public.jobs TO anon;
GRANT INSERT ON public.job_applications TO anon;

GRANT USAGE ON SCHEMA public TO authenticated;
GRANT SELECT ON public.jobs TO authenticated;
GRANT ALL ON public.job_applications TO authenticated;

GRANT ALL ON public.jobs TO service_role;
GRANT ALL ON public.job_applications TO service_role;

-- Grant sequence permissions
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO anon;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO service_role;

-- Insert sample job postings
INSERT INTO public.jobs (title, slug, department, job_type, job_level, remote_type, location, salary_min, salary_max, description, requirements, responsibilities, benefits, featured) VALUES 
(
    'Senior AI Engineer',
    'senior-ai-engineer',
    'Engineering',
    'full-time',
    'senior',
    'remote',
    'Remote / Bogotá, Colombia',
    80000,
    120000,
    'Join our AI team to build cutting-edge machine learning solutions that help businesses automate and scale their operations. You''ll work with the latest AI technologies and frameworks to deliver impactful solutions.',
    '• 5+ years of experience in AI/ML development
• Strong proficiency in Python, TensorFlow, PyTorch
• Experience with cloud platforms (AWS, GCP, Azure)
• Knowledge of MLOps and model deployment
• Bachelor''s degree in Computer Science, AI, or related field
• Experience with LLMs and generative AI preferred',
    '• Design and implement AI/ML models and algorithms
• Collaborate with cross-functional teams to integrate AI solutions
• Optimize model performance and scalability
• Mentor junior developers and conduct code reviews
• Stay up-to-date with latest AI trends and technologies
• Participate in technical architecture decisions',
    '• Competitive salary and equity package
• Flexible work arrangements (remote/hybrid)
• Health, dental, and vision insurance
• Learning budget for courses and conferences
• Top-tier equipment and tools
• Collaborative and innovative work environment',
    true
),
(
    'Full Stack Developer',
    'full-stack-developer',
    'Engineering',
    'full-time',
    'mid',
    'hybrid',
    'Bogotá, Colombia',
    50000,
    75000,
    'We''re looking for a versatile Full Stack Developer to help build and maintain our web applications. You''ll work across the entire stack, from beautiful user interfaces to robust backend systems.',
    '• 3+ years of full-stack development experience
• Proficiency in React, Next.js, Node.js
• Experience with databases (PostgreSQL, MongoDB)
• Knowledge of cloud services and deployment
• Understanding of UI/UX principles
• Strong problem-solving skills',
    '• Develop and maintain web applications
• Build responsive and intuitive user interfaces
• Design and implement APIs and backend services
• Collaborate with designers and product managers
• Write clean, maintainable, and tested code
• Participate in agile development processes',
    '• Competitive salary
• Hybrid work model
• Professional development opportunities
• Health insurance
• Team events and company retreats
• Modern development tools and equipment',
    false
),
(
    'DevOps Engineer',
    'devops-engineer',
    'Engineering',
    'full-time',
    'mid',
    'remote',
    'Remote / Latin America',
    60000,
    90000,
    'Help us build and maintain scalable infrastructure that powers our AI applications. You''ll work with cutting-edge cloud technologies and automation tools to ensure our systems are reliable and performant.',
    '• 3+ years of DevOps/Infrastructure experience
• Strong knowledge of AWS/GCP/Azure
• Experience with Docker, Kubernetes
• Proficiency in Infrastructure as Code (Terraform, CloudFormation)
• Knowledge of CI/CD pipelines
• Experience with monitoring and logging tools',
    '• Design and maintain cloud infrastructure
• Implement CI/CD pipelines and automation
• Monitor system performance and reliability
• Manage containerized applications
• Ensure security best practices
• Collaborate with development teams',
    '• Competitive compensation
• Fully remote work
• Flexible hours across time zones
• Cloud certification support
• Learning and development budget
• Annual company meetup',
    false
);

-- Create a view for job listings with application counts
CREATE OR REPLACE VIEW public.job_listings AS
SELECT 
    j.*,
    COALESCE(app_counts.total_applications, 0) as total_applications,
    COALESCE(app_counts.new_applications, 0) as new_applications
FROM public.jobs j
LEFT JOIN (
    SELECT 
        job_id,
        COUNT(*) as total_applications,
        COUNT(*) FILTER (WHERE status = 'new') as new_applications
    FROM public.job_applications 
    GROUP BY job_id
) app_counts ON j.id = app_counts.job_id;

-- Grant access to the view
GRANT SELECT ON public.job_listings TO anon;
GRANT SELECT ON public.job_listings TO authenticated;
GRANT SELECT ON public.job_listings TO service_role;