-- ==============================================================================
-- FLAMES – Discover Your Love Connection
-- Supabase Database Schema & Row Level Security (RLS) Configuration
-- ==============================================================================

-- 1. Create table for storing FLAMES calculations
CREATE TABLE IF NOT EXISTS public.flames_results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    your_name TEXT NOT NULL,
    partner_name TEXT NOT NULL,
    flames_result TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Add index on created_at for fast retrieval of recent calculations
CREATE INDEX IF NOT EXISTS idx_flames_results_created_at 
ON public.flames_results (created_at DESC);

-- Add table comment
COMMENT ON TABLE public.flames_results IS 'Stores FLAMES love connection test results between couples.';

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.flames_results ENABLE ROW LEVEL SECURITY;

-- 3. Policy: Allow anonymous and authenticated visitors to save new FLAMES results
DROP POLICY IF EXISTS "Allow public inserts to flames_results" ON public.flames_results;
CREATE POLICY "Allow public inserts to flames_results"
ON public.flames_results
FOR INSERT
TO anon, authenticated
WITH CHECK (
    char_length(trim(your_name)) > 0 AND
    char_length(trim(partner_name)) > 0 AND
    char_length(trim(flames_result)) > 0
);

-- 4. Policy: Allow public read access to recent FLAMES results
DROP POLICY IF EXISTS "Allow public read access to flames_results" ON public.flames_results;
CREATE POLICY "Allow public read access to flames_results"
ON public.flames_results
FOR SELECT
TO anon, authenticated
USING (true);

-- 5. Policies: Prevent arbitrary public updates or deletes
-- Only service role / administrators can update or delete calculations
DROP POLICY IF EXISTS "Prevent public updates" ON public.flames_results;
DROP POLICY IF EXISTS "Prevent public deletes" ON public.flames_results;

-- Verification query (run to check table existence and column types):
-- SELECT column_name, data_type, is_nullable FROM information_schema.columns WHERE table_name = 'flames_results';
