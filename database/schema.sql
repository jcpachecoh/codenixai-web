-- Supabase SQL schema for leads table
-- Run this in your Supabase SQL editor

-- Create enum for lead status
CREATE TYPE lead_status AS ENUM ('new', 'contacted', 'qualified', 'converted', 'closed');

-- Create leads table
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    company VARCHAR(200),
    message TEXT NOT NULL,
    source VARCHAR(50) DEFAULT 'contact_form',
    status lead_status DEFAULT 'new',
    locale VARCHAR(10) DEFAULT 'en',
    utm_source VARCHAR(100),
    utm_medium VARCHAR(100),
    utm_campaign VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_leads_email ON public.leads (email);
CREATE INDEX IF NOT EXISTS idx_leads_status ON public.leads (status);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_source ON public.leads (source);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language plpgsql;

CREATE TRIGGER update_leads_updated_at 
    BEFORE UPDATE ON public.leads 
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Create policies for RLS
-- Allow anonymous users to insert leads (for contact form)
CREATE POLICY "Allow anonymous insert" ON public.leads
    FOR INSERT
    TO anon
    WITH CHECK (true);

-- Allow authenticated users to read their own leads (if you add user authentication later)
CREATE POLICY "Users can read their own leads" ON public.leads
    FOR SELECT
    TO authenticated
    USING (true); -- You can modify this based on your auth logic

-- Allow service role to do everything (for admin operations)
CREATE POLICY "Service role can do everything" ON public.leads
    TO service_role
    USING (true)
    WITH CHECK (true);

-- Grant necessary permissions
GRANT INSERT ON public.leads TO anon;
GRANT ALL ON public.leads TO authenticated;
GRANT ALL ON public.leads TO service_role;

-- Optional: Create a view for lead analytics
CREATE OR REPLACE VIEW public.lead_analytics AS
SELECT 
    DATE_TRUNC('day', created_at) as date,
    COUNT(*) as total_leads,
    COUNT(*) FILTER (WHERE status = 'new') as new_leads,
    COUNT(*) FILTER (WHERE status = 'contacted') as contacted_leads,
    COUNT(*) FILTER (WHERE status = 'qualified') as qualified_leads,
    COUNT(*) FILTER (WHERE status = 'converted') as converted_leads,
    source,
    locale
FROM public.leads 
GROUP BY DATE_TRUNC('day', created_at), source, locale
ORDER BY date DESC;

-- Grant access to the view
GRANT SELECT ON public.lead_analytics TO authenticated;
GRANT SELECT ON public.lead_analytics TO service_role;