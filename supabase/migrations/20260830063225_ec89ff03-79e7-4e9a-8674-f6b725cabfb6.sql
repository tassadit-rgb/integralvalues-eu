ALTER TABLE public.affiliate_applications
  ADD COLUMN IF NOT EXISTS screening jsonb NOT NULL DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS screening_outcome text NOT NULL DEFAULT 'unknown';