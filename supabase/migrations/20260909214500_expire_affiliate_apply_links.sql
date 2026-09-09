-- Expire affiliate application links after seven days.

ALTER TABLE public.affiliate_apply_sessions
  ADD COLUMN IF NOT EXISTS expires_at timestamptz;

UPDATE public.affiliate_apply_sessions
SET expires_at = created_at + interval '7 days'
WHERE expires_at IS NULL;

ALTER TABLE public.affiliate_apply_sessions
  ALTER COLUMN expires_at SET DEFAULT (now() + interval '7 days'),
  ALTER COLUMN expires_at SET NOT NULL;

CREATE INDEX IF NOT EXISTS affiliate_apply_sessions_expires_at_idx
  ON public.affiliate_apply_sessions (expires_at);
