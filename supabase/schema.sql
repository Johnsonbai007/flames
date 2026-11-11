-- ==============================================================================
-- FLAMES – Discover Your Love Connection
-- Supabase Database Schema & Row Level Security (RLS) Configuration
-- ==============================================================================

-- 1. Create table for storing FLAMES calculations in public schema
CREATE TABLE IF NOT EXISTS public.flames_results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    your_name TEXT NOT NULL,
    partner_name TEXT NOT NULL,
    flames_result TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Add index on created_at for fast retrieval
CREATE INDEX IF NOT EXISTS idx_flames_results_created_at 
ON public.flames_results (created_at DESC);

-- 3. Grant schema and table permissions to anon & authenticated roles
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON TABLE public.flames_results TO anon, authenticated;

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.flames_results ENABLE ROW LEVEL SECURITY;

-- 5. Policy: Allow visitors to insert new FLAMES results
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

-- 6. Policy: Allow visitors to read FLAMES results
DROP POLICY IF EXISTS "Allow public read access to flames_results" ON public.flames_results;
CREATE POLICY "Allow public read access to flames_results"
ON public.flames_results
FOR SELECT
TO anon, authenticated
USING (true);

-- 7. Notify PostgREST to immediately refresh the schema cache
NOTIFY pgrst, 'reload schema';
