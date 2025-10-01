-- Fix RLS policies for leads table
-- Run this if you're having permission issues

-- First, drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Allow anonymous insert" ON public.leads;
DROP POLICY IF EXISTS "Users can read their own leads" ON public.leads;
DROP POLICY IF EXISTS "Service role can do everything" ON public.leads;

-- Recreate policies with proper permissions
-- Allow anonymous users to insert leads (for contact form submissions)
CREATE POLICY "Enable insert for anonymous users" ON public.leads
    FOR INSERT
    TO anon
    WITH CHECK (true);

-- Allow authenticated users full access (for admin dashboard)
CREATE POLICY "Enable all for authenticated users" ON public.leads
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Allow service role full access (for server-side operations)
CREATE POLICY "Enable all for service role" ON public.leads
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- Ensure proper grants are in place
GRANT USAGE ON SCHEMA public TO anon;
GRANT INSERT ON public.leads TO anon;
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON public.leads TO authenticated;
GRANT ALL ON public.leads TO service_role;

-- Grant sequence permissions (for UUID generation)
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO anon;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO service_role;