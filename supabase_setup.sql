-- FAQ Comments Table Setup
-- Run this in Supabase SQL Editor

-- Create the faq_comments table
CREATE TABLE IF NOT EXISTS public.faq_comments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nickname TEXT NOT NULL CHECK (char_length(nickname) >= 2 AND char_length(nickname) <= 50),
    message TEXT NOT NULL CHECK (char_length(message) >= 1 AND char_length(message) <= 500),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.faq_comments ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read comments
CREATE POLICY "Anyone can read comments"
ON public.faq_comments
FOR SELECT
TO public
USING (true);

-- Policy: Anyone can insert comments
CREATE POLICY "Anyone can insert comments"
ON public.faq_comments
FOR INSERT
TO public
WITH CHECK (true);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS faq_comments_created_at_idx 
ON public.faq_comments (created_at DESC);

-- Enable Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.faq_comments;

-- Grant permissions
GRANT SELECT, INSERT ON public.faq_comments TO anon, authenticated;
GRANT USAGE ON SEQUENCE IF EXISTS faq_comments_id_seq TO anon, authenticated;
