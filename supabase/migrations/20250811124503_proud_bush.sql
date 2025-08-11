/*
  # Create agents showcase table

  1. New Tables
    - `agents_showcase`
      - `id` (uuid, primary key)
      - `name` (text, unique, required)
      - `description` (text, required)
      - `category` (text, required, constrained values)
      - `tags` (jsonb array, default empty)
      - `demo_url` (text, optional)
      - `status` (text, default 'coming_soon', constrained values)
      - `created_at` (timestamp, auto-set)
      - `updated_at` (timestamp, auto-updated)

  2. Security
    - Enable RLS on `agents_showcase` table
    - Add policies for public read/write access (no authentication required)

  3. Sample Data
    - Pre-populate with SMB-focused agents across 5 categories
    - Include live demo links where available
*/

-- Create agents_showcase table
CREATE TABLE IF NOT EXISTS agents_showcase (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  description text NOT NULL,
  category text NOT NULL CHECK (category IN ('sales', 'marketing', 'customer-service', 'hr', 'finance')),
  tags jsonb DEFAULT '[]'::jsonb,
  demo_url text,
  status text DEFAULT 'coming_soon' CHECK (status IN ('live', 'coming_soon', 'optional')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE agents_showcase ENABLE ROW LEVEL SECURITY;

-- Create policies for public access
CREATE POLICY "Anyone can read agents"
  ON agents_showcase
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can insert agents"
  ON agents_showcase
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can update agents"
  ON agents_showcase
  FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can delete agents"
  ON agents_showcase
  FOR DELETE
  TO anon, authenticated
  USING (true);

-- Create updated_at trigger function if it doesn't exist
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updating updated_at
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.triggers 
    WHERE trigger_name = 'update_agents_showcase_updated_at'
  ) THEN
    CREATE TRIGGER update_agents_showcase_updated_at
      BEFORE UPDATE ON agents_showcase
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  END IF;
END $$;

-- Insert sample data (using INSERT ... ON CONFLICT DO NOTHING with unique constraint)
INSERT INTO agents_showcase (name, description, category, tags, demo_url, status) VALUES
-- Sales agents
('AI SDR', 'Automate lead qualification, outreach, and sales pipeline management', 'sales', '["lead generation", "outreach", "sales automation"]', 'https://jazon.studio.lyzr.ai/', 'live'),
('ABM Strategy Builder', 'Create targeted account-based marketing strategies', 'sales', '["ABM", "strategy", "targeting"]', null, 'coming_soon'),
('ICP Generator', 'Generate ideal customer profiles for better targeting', 'sales', '["ICP", "targeting", "customer profiling"]', null, 'optional'),
('Inbound Lead Processing', 'Automatically process and qualify inbound leads', 'sales', '["lead processing", "qualification", "automation"]', null, 'coming_soon'),

-- Marketing agents
('Blog Post Writer', 'Generate SEO-optimized blog posts and articles', 'marketing', '["content", "SEO", "blogging"]', 'https://hitachi.ca.lyzr.app/', 'live'),
('E-book Generator', 'Create comprehensive e-books and whitepapers', 'marketing', '["ebook", "content", "lead magnets"]', 'https://hitachi-ebook.studio.lyzr.ai/', 'live'),
('Social Media Post Generator', 'Create engaging social media content across platforms', 'marketing', '["social media", "content", "engagement"]', null, 'live'),
('Web Copy Writer', 'Write compelling website copy and landing pages', 'marketing', '["copywriting", "web content", "conversion"]', null, 'live'),
('Veo3 Prompt Writer', 'Generate optimized prompts for video content creation', 'marketing', '["video", "prompts", "content creation"]', null, 'live'),
('AI Image Generator', 'Create custom images and graphics for marketing', 'marketing', '["images", "graphics", "visual content"]', null, 'live'),
('Newsletter Agent', 'Automate newsletter creation and distribution', 'marketing', '["newsletter", "email marketing", "automation"]', null, 'live'),

-- Customer Service agents
('Website Chat Agent', 'Provide 24/7 customer support through website chat', 'customer-service', '["chat", "support", "automation"]', null, 'live'),
('Customer Support Agent', 'Handle customer inquiries and support tickets', 'customer-service', '["support", "tickets", "customer service"]', 'https://nvidia-enterprise-ai-support.netlify.app/', 'live'),
('Customer Testimonials', 'Collect and manage customer testimonials and reviews', 'customer-service', '["testimonials", "reviews", "feedback"]', null, 'coming_soon'),

-- HR agents
('Employee Onboarding Agent', 'Streamline new employee onboarding process', 'hr', '["onboarding", "HR", "automation"]', null, 'coming_soon'),
('HR Helpdesk Agent', 'Answer employee HR questions and provide support', 'hr', '["HR", "helpdesk", "employee support"]', null, 'coming_soon'),
('Exit Interview Agent', 'Conduct structured exit interviews with departing employees', 'hr', '["exit interview", "feedback", "HR"]', null, 'coming_soon'),
('Performance Review Agent', 'Automate performance review processes and feedback', 'hr', '["performance", "reviews", "feedback"]', null, 'coming_soon'),
('ESAC Survey Agent', 'Conduct employee satisfaction and culture surveys', 'hr', '["surveys", "satisfaction", "culture"]', null, 'coming_soon'),

-- Finance agents
('Finance Analyst Agent', 'Analyze financial data and generate insights', 'finance', '["analysis", "finance", "reporting"]', 'https://master.d35xeqxyj1k3j9.amplifyapp.com/', 'live'),
('Accounts Receivable Agent', 'Manage accounts receivable and payment tracking', 'finance', '["AR", "payments", "finance"]', null, 'coming_soon')

ON CONFLICT (name) DO NOTHING;