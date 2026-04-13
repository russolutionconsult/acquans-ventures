-- ============================================================
-- Acquans Ventures: project_messages table + storage bucket
-- Run this in the Supabase SQL Editor
-- ============================================================

-- 1. Create table
CREATE TABLE IF NOT EXISTS public.project_messages (
  id            uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  quote_id      uuid NOT NULL REFERENCES public.quotes(id) ON DELETE CASCADE,
  id_from       uuid NOT NULL,
  id_to         uuid,
  message       text NOT NULL,
  sender_name   text NOT NULL,
  sender_role   text NOT NULL CHECK (sender_role IN ('admin', 'client')),
  attachment_url  text,
  attachment_name text,
  timestamp     timestamptz DEFAULT now() NOT NULL
);

-- 2. Index for fast retrieval by project
CREATE INDEX IF NOT EXISTS idx_project_messages_quote_id ON public.project_messages(quote_id);

-- 3. Enable Row Level Security
ALTER TABLE public.project_messages ENABLE ROW LEVEL SECURITY;

-- 4. Allow authenticated users to read messages for their own projects
CREATE POLICY "Users can read their project messages"
  ON public.project_messages FOR SELECT
  USING (
    auth.uid() = id_from OR auth.uid() = id_to
    OR EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('admin', 'staff')
    )
  );

-- 5. Allow authenticated users to insert messages
CREATE POLICY "Authenticated users can insert messages"
  ON public.project_messages FOR INSERT
  WITH CHECK (auth.uid() = id_from);

-- 6. Enable Realtime for this table
ALTER PUBLICATION supabase_realtime ADD TABLE public.project_messages;

-- 7. Storage bucket for message attachments (run in SQL Editor)
INSERT INTO storage.buckets (id, name, public)
VALUES ('message-attachments', 'message-attachments', true)
ON CONFLICT (id) DO NOTHING;

-- 8. Storage RLS: allow authenticated users to upload
CREATE POLICY "Authenticated users can upload attachments"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'message-attachments' AND auth.role() = 'authenticated');

-- 9. Storage RLS: allow public read of attachments
CREATE POLICY "Public read of message attachments"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'message-attachments');
