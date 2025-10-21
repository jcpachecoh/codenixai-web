-- Create leads table with comprehensive schema
CREATE TABLE IF NOT EXISTS leads (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Basic contact information
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  company text,
  message text NOT NULL,
  
  -- Lead management
  status text DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'proposal', 'closed', 'lost')),
  notes text,
  assigned_to uuid,
  priority integer DEFAULT 5 CHECK (priority >= 1 AND priority <= 10),
  
  -- Value tracking
  value numeric(10,2),
  currency text DEFAULT 'USD',
  
  -- Important dates
  follow_up_date timestamptz,
  last_contact_date timestamptz,
  conversion_date timestamptz,
  
  -- Source tracking
  locale text DEFAULT 'en',
  source text DEFAULT 'contact_form' CHECK (source IN (
    'contact_form', 
    'whatsapp_automation_form',
    'career_application',
    'newsletter',
    'referral',
    'social_media',
    'google_ads',
    'organic_search',
    'direct',
    'other'
  )),
  
  -- UTM tracking
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  utm_term text,
  
  -- Technical tracking
  ip_address inet,
  user_agent text,
  referrer text,
  
  -- Timestamps
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_source ON leads(source);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at);
CREATE INDEX IF NOT EXISTS idx_leads_assigned_to ON leads(assigned_to);
CREATE INDEX IF NOT EXISTS idx_leads_follow_up_date ON leads(follow_up_date);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_leads_updated_at 
  BEFORE UPDATE ON leads 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Create policies for RLS
-- Allow public to insert new leads (for contact forms)
CREATE POLICY "Public can insert leads" ON leads
  FOR INSERT TO anon
  WITH CHECK (true);

-- Allow authenticated users to view all leads
CREATE POLICY "Authenticated users can view leads" ON leads
  FOR SELECT TO authenticated
  USING (true);

-- Allow authenticated users to update leads
CREATE POLICY "Authenticated users can update leads" ON leads
  FOR UPDATE TO authenticated
  USING (true);

-- Allow service role to do everything
CREATE POLICY "Service role can do everything" ON leads
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Sample data (optional - remove in production)
INSERT INTO leads (name, email, phone, company, message, source, status) VALUES
  ('Juan Pérez', 'juan@example.com', '+52 555 123 4567', 'Tech Corp', 'Interesado en automatización de WhatsApp', 'whatsapp_automation_form', 'new'),
  ('María García', 'maria@example.com', '+52 555 987 6543', 'Marketing Plus', 'Necesito desarrollo de e-commerce', 'contact_form', 'contacted'),
  ('Carlos Rodriguez', 'carlos@example.com', NULL, 'StartupXYZ', 'Consulta sobre desarrollo de apps', 'organic_search', 'qualified')
ON CONFLICT (email) DO NOTHING;

-- Create a view for lead statistics
CREATE OR REPLACE VIEW lead_stats AS
SELECT 
  COUNT(*) as total_leads,
  COUNT(*) FILTER (WHERE status = 'new') as new_leads,
  COUNT(*) FILTER (WHERE status = 'contacted') as contacted_leads,
  COUNT(*) FILTER (WHERE status = 'qualified') as qualified_leads,
  COUNT(*) FILTER (WHERE status = 'closed') as closed_leads,
  COUNT(*) FILTER (WHERE status = 'lost') as lost_leads,
  COALESCE(SUM(value) FILTER (WHERE status = 'closed'), 0) as total_revenue,
  COALESCE(AVG(value) FILTER (WHERE value IS NOT NULL), 0) as avg_deal_value,
  CASE 
    WHEN COUNT(*) > 0 THEN 
      ROUND((COUNT(*) FILTER (WHERE status = 'closed')::decimal / COUNT(*)) * 100, 2)
    ELSE 0 
  END as conversion_rate
FROM leads;

-- Grant permissions on the view
GRANT SELECT ON lead_stats TO authenticated, service_role;